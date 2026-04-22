#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://api.bfl.ai';
const DEFAULT_WIDTH = 1536;
const DEFAULT_HEIGHT = 1024;
const DEFAULT_OUTPUT = 'jpeg';
const DEFAULT_TIMEOUT_MS = 180000;
const POLL_INTERVAL_MS = 3000;

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const sanitizeFileName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-_.]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'bfl-image';

const usage = () => {
  console.log(
    'Usage: BFL_API_KEY=... npm run bfl:generate -- --prompt "your prompt" [--out public/placeholders/name.jpg] [--width 1536] [--height 1024] [--format jpeg]'
  );
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {
    prompt: '',
    out: '',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    format: DEFAULT_OUTPUT,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    const next = args[i + 1];
    if (arg === '--prompt' && next) {
      parsed.prompt = next;
      i += 1;
    } else if (arg === '--out' && next) {
      parsed.out = next;
      i += 1;
    } else if (arg === '--width' && next) {
      parsed.width = parseInteger(next, DEFAULT_WIDTH);
      i += 1;
    } else if (arg === '--height' && next) {
      parsed.height = parseInteger(next, DEFAULT_HEIGHT);
      i += 1;
    } else if (arg === '--format' && next) {
      const normalized = String(next).toLowerCase();
      parsed.format = ['jpeg', 'png', 'webp'].includes(normalized) ? normalized : DEFAULT_OUTPUT;
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      usage();
      process.exit(0);
    }
  }

  return parsed;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureAbsoluteOutputPath = (providedPath, format) => {
  const fallbackName = `placeholder-${Date.now()}.${format}`;
  const target = providedPath || `public/placeholders/${fallbackName}`;
  return path.isAbsolute(target) ? target : path.resolve(process.cwd(), target);
};

const downloadToFile = async (url, outputPath) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image (${response.status}) from ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buffer);
};

const postGeneration = async (apiKey, payload) => {
  const response = await fetch(`${API_BASE}/v1/flux-2-pro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`BFL generation failed (${response.status}): ${JSON.stringify(json)}`);
  }

  if (!json.id) {
    throw new Error(`BFL generation response missing task id: ${JSON.stringify(json)}`);
  }

  return json;
};

const getResult = async (apiKey, id) => {
  const url = new URL(`${API_BASE}/v1/get_result`);
  url.searchParams.set('id', id);

  const response = await fetch(url, {
    headers: {
      'x-key': apiKey,
    },
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 404 && json && json.status === 'Task not found') {
      return json;
    }
    throw new Error(`BFL get_result failed (${response.status}): ${JSON.stringify(json)}`);
  }

  return json;
};

const extractImageUrl = (result) => {
  if (!result || typeof result !== 'object') return '';

  const candidateKeys = ['sample', 'image', 'url', 'image_url'];
  for (const key of candidateKeys) {
    if (typeof result[key] === 'string' && result[key].startsWith('http')) {
      return result[key];
    }
  }

  if (Array.isArray(result.images) && result.images.length > 0) {
    const first = result.images[0];
    if (typeof first === 'string' && first.startsWith('http')) return first;
    if (first && typeof first === 'object') {
      for (const key of candidateKeys) {
        if (typeof first[key] === 'string' && first[key].startsWith('http')) {
          return first[key];
        }
      }
    }
  }

  return '';
};

const main = async () => {
  const apiKey = process.env.BFL_API_KEY;
  if (!apiKey) {
    throw new Error('Missing BFL_API_KEY environment variable');
  }

  const args = parseArgs();
  if (!args.prompt) {
    usage();
    throw new Error('Missing --prompt');
  }

  const outputPath = ensureAbsoluteOutputPath(args.out, args.format);

  console.log('Submitting generation task to BFL...');
  const submit = await postGeneration(apiKey, {
    prompt: args.prompt,
    width: args.width,
    height: args.height,
    output_format: args.format,
  });

  const taskId = submit.id;
  console.log(`Task submitted: ${taskId}`);

  const started = Date.now();
  let lastStatus = '';
  while (Date.now() - started < DEFAULT_TIMEOUT_MS) {
    const resultPayload = await getResult(apiKey, taskId);
    const status = resultPayload.status;

    if (status !== lastStatus) {
      console.log(`Status: ${status}`);
      lastStatus = status;
    }

    if (status === 'Ready') {
      const imageUrl = extractImageUrl(resultPayload.result);
      if (!imageUrl) {
        throw new Error(`Result is Ready but no image URL found: ${JSON.stringify(resultPayload.result)}`);
      }

      await downloadToFile(imageUrl, outputPath);
      console.log(`Saved image to: ${outputPath}`);
      return;
    }

    if (status === 'Error' || status === 'Content Moderated' || status === 'Request Moderated') {
      throw new Error(`Generation ended with status '${status}': ${JSON.stringify(resultPayload)}`);
    }

    await wait(POLL_INTERVAL_MS);
  }

  throw new Error('Timed out waiting for generation result');
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
