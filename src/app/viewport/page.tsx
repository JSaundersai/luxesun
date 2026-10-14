"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Device probe: open on a real phone (e.g. Galaxy Z Fold folded + unfolded,
 * iPhone Pro / Pro Max) to read the exact CSS viewport the site lays out in.
 * Updates live on resize, rotation and fold/unfold.
 */

type Reading = {
  cssWidth: number;
  cssHeight: number;
  visualWidth: number;
  visualHeight: number;
  screenWidth: number;
  screenHeight: number;
  dpr: number;
  orientation: string;
  hover: boolean;
  coarse: boolean;
  safe: { top: number; right: number; bottom: number; left: number };
  userAgent: string;
};

// Reference sizes we design against (portrait, CSS px).
const targets = [
  { name: "iPhone 16/17/18 Pro", w: 402, h: 874 },
  { name: "iPhone 16/17/18 Pro Max", w: 440, h: 956 },
  { name: "Galaxy Z Fold 7/8 — closed", w: 412, h: 960 },
  { name: "Galaxy Z Fold 7/8 — open", w: 750, h: 832 },
];

function tierFor(width: number) {
  if (width < 640) return "Phone (2-column grid)";
  if (width < 1024) return "Fold open / tablet (3-column grid, mobile nav)";
  return "Desktop (full nav)";
}

export default function ViewportPage() {
  const safeRef = useRef<HTMLDivElement>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const measure = () => {
      const safeStyle = safeRef.current ? getComputedStyle(safeRef.current) : null;
      const px = (value?: string) => Math.round(parseFloat(value ?? "0") || 0);
      setReading({
        cssWidth: window.innerWidth,
        cssHeight: window.innerHeight,
        visualWidth: Math.round(window.visualViewport?.width ?? window.innerWidth),
        visualHeight: Math.round(window.visualViewport?.height ?? window.innerHeight),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        dpr: window.devicePixelRatio,
        orientation: window.screen.orientation?.type ?? (window.innerWidth > window.innerHeight ? "landscape" : "portrait"),
        hover: window.matchMedia("(hover: hover)").matches,
        coarse: window.matchMedia("(pointer: coarse)").matches,
        safe: {
          top: px(safeStyle?.paddingTop),
          right: px(safeStyle?.paddingRight),
          bottom: px(safeStyle?.paddingBottom),
          left: px(safeStyle?.paddingLeft),
        },
        userAgent: navigator.userAgent,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    window.screen.orientation?.addEventListener?.("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
      window.screen.orientation?.removeEventListener?.("change", measure);
    };
  }, []);

  const summary = reading
    ? [
        `CSS viewport: ${reading.cssWidth} × ${reading.cssHeight}`,
        `Visible (visualViewport): ${reading.visualWidth} × ${reading.visualHeight}`,
        `Screen: ${reading.screenWidth} × ${reading.screenHeight}`,
        `Device pixel ratio: ${reading.dpr}`,
        `Physical px: ${Math.round(reading.screenWidth * reading.dpr)} × ${Math.round(reading.screenHeight * reading.dpr)}`,
        `Orientation: ${reading.orientation}`,
        `Safe area (t/r/b/l): ${reading.safe.top}/${reading.safe.right}/${reading.safe.bottom}/${reading.safe.left}`,
        `Touch: ${reading.coarse ? "yes" : "no"} · Hover: ${reading.hover ? "yes" : "no"}`,
        `Layout tier: ${tierFor(reading.cssWidth)}`,
        `UA: ${reading.userAgent}`,
      ].join("\n")
    : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the user can screenshot instead */
    }
  };

  return (
    <main className="min-h-[100svh] bg-parchment px-5 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)] sm:px-8">
      {/* Hidden probe that resolves env(safe-area-inset-*) into pixels */}
      <div
        ref={safeRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]"
      />

      <div className="mx-auto max-w-[640px]">
        <Link href="/" className="font-serif text-[1.35rem] font-medium tracking-[0.14em] text-near-black no-underline">
          Luxe Sun
        </Link>
        <h1 className="mt-6 font-serif text-[2.4rem] font-medium leading-[1.05] text-near-black">Viewport check</h1>
        <p className="mt-2 font-sans text-[0.95rem] leading-relaxed text-olive-gray">
          Open this page on the phone, then fold, unfold or rotate it. Tap copy (or screenshot) and send the numbers over.
        </p>

        {reading ? (
          <>
            <div className="mt-6 rounded-sheet bg-near-black p-6 text-ivory">
              <div className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-warm-silver">CSS viewport</div>
              <div className="mt-1 font-serif text-[3.2rem] font-medium leading-none">
                {reading.cssWidth} × {reading.cssHeight}
              </div>
              <div className="mt-3 font-sans text-[0.9rem] text-warm-silver">{tierFor(reading.cssWidth)}</div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2.5">
              {[
                ["Visible area", `${reading.visualWidth} × ${reading.visualHeight}`],
                ["Pixel ratio", String(reading.dpr)],
                ["Screen", `${reading.screenWidth} × ${reading.screenHeight}`],
                ["Physical px", `${Math.round(reading.screenWidth * reading.dpr)} × ${Math.round(reading.screenHeight * reading.dpr)}`],
                ["Orientation", reading.orientation.replace("-primary", "").replace("-secondary", "")],
                ["Safe area t/r/b/l", `${reading.safe.top}/${reading.safe.right}/${reading.safe.bottom}/${reading.safe.left}`],
                ["Touch", reading.coarse ? "Yes" : "No"],
                ["Hover", reading.hover ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-card bg-ivory p-4 ring-1 ring-inset ring-near-black/[0.05]">
                  <dt className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-stone-gray">{label}</dt>
                  <dd className="mt-1 font-sans text-[1.05rem] font-medium text-near-black">{value}</dd>
                </div>
              ))}
            </dl>

            <button type="button" onClick={copy} className="btn-pill mt-5 w-full">
              {copied ? "Copied" : "Copy details"}
            </button>

            <h2 className="mt-10 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-stone-gray">
              Design targets
            </h2>
            <ul className="mt-3 list-none space-y-2">
              {targets.map((t) => {
                const match = reading.cssWidth === t.w || reading.cssWidth === t.h;
                return (
                  <li
                    key={t.name}
                    className={`flex items-center justify-between rounded-card px-4 py-3 font-sans text-[0.9rem] ${
                      match ? "bg-near-black text-ivory" : "bg-white text-near-black ring-1 ring-inset ring-near-black/[0.05]"
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className={match ? "text-ivory" : "text-stone-gray"}>
                      {t.w} × {t.h}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 break-words font-mono text-[0.7rem] leading-relaxed text-stone-gray">{reading.userAgent}</p>
          </>
        ) : (
          <p className="mt-6 font-sans text-[0.95rem] text-stone-gray">Measuring…</p>
        )}
      </div>
    </main>
  );
}
