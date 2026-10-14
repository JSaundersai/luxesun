"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Build a displacement map for a rounded rectangle: neutral grey in the middle,
 * and at the rim a vector that makes the filter sample from further inside, so
 * the photo behind appears to bend and stretch at the glass edge.
 * Channel encoding for feDisplacementMap: R = x shift, G = y shift, 128 = none.
 */
function buildDisplacementMap(w: number, h: number, radius: number, bezel: number): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const halfX = w / 2 - radius;
  const halfY = h / 2 - radius;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;

      // Signed distance to the rounded rectangle (negative inside).
      const qx = Math.abs(px) - halfX;
      const qy = Math.abs(py) - halfY;
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const distance = outside + Math.min(Math.max(qx, qy), 0) - radius;
      const inset = -distance; // how far inside the edge this pixel is

      // Outward normal at the nearest edge point.
      let nx: number;
      let ny: number;
      if (outside > 0) {
        nx = (Math.sign(px) * ox) / outside;
        ny = (Math.sign(py) * oy) / outside;
      } else if (qx > qy) {
        nx = Math.sign(px);
        ny = 0;
      } else {
        nx = 0;
        ny = Math.sign(py);
      }

      // 0 deep inside → 1 at the rim, eased so the centre stays undistorted.
      const t = Math.min(Math.max(1 - inset / bezel, 0), 1);
      const strength = t * t * (3 - 2 * t);

      const i = (y * w + x) * 4;
      image.data[i] = 128 + 127 * -nx * strength; // sample inward
      image.data[i + 1] = 128 + 127 * -ny * strength;
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

interface RefractionLayerProps {
  /** Multiplies how far the edge bends the backdrop. 1 = default. */
  strength?: number;
  /** Extra blur on top of the bend, in px. */
  blur?: number;
  saturate?: number;
  brightness?: number;
}

/**
 * Backdrop layer that bends what is behind it using an SVG displacement filter
 * inside `backdrop-filter`. Chromium only — render it conditionally (see
 * GlassSurface). Fills its parent and inherits the parent's border radius.
 */
export default function RefractionLayer({
  strength = 1,
  blur = 0.6,
  saturate = 1.35,
  brightness = 1.05,
}: RefractionLayerProps) {
  const filterId = `gl-${useId().replace(/:/g, "")}`;
  const layerRef = useRef<HTMLSpanElement>(null);
  const [map, setMap] = useState<{ url: string; w: number; h: number; scale: number } | null>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const update = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (!w || !h) return;

      const smallest = Math.min(w, h);
      const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
      const bezel = Math.max(8, Math.min(24, smallest * 0.42));
      const url = buildDisplacementMap(w, h, radius, bezel);
      // Peak shift ≈ scale / 2. Keep it under ~half the bezel so the mapping never
      // folds back on itself (that is what causes vertical streaking).
      if (url) setMap({ url, w, h, scale: bezel * 0.95 * strength });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [strength]);

  const tail = `blur(${blur}px) saturate(${saturate}) brightness(${brightness})`;
  const backdropFilter = map ? `url(#${filterId}) ${tail}` : `blur(8px) saturate(${saturate}) brightness(${brightness})`;

  return (
    <>
      <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
        {map && (
          <filter
            id={filterId}
            x={0}
            y={0}
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.url} x={0} y={0} width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={map.scale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        )}
      </svg>
      <span ref={layerRef} aria-hidden="true" className="gl-layer" style={{ backdropFilter }} />
    </>
  );
}
