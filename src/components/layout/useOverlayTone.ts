"use client";

import { useEffect, useState } from "react";

/** Perceived luminance (0–1) of a CSS `rgb()/rgba()` string, or null if transparent. */
function luminanceOf(color: string): number | null {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b, a = "1"] = match[1].split(/[ ,/]+/).filter(Boolean);
  if (parseFloat(a) < 0.5) return null;
  return (0.2126 * parseFloat(r) + 0.7152 * parseFloat(g) + 0.0722 * parseFloat(b)) / 255;
}

/** True when the first opaque background found behind the point is dark. */
function isDarkBehind(x: number, y: number): boolean {
  let el: Element | null = document.elementFromPoint(x, y);
  while (el) {
    const lum = luminanceOf(getComputedStyle(el).backgroundColor);
    if (lum !== null) return lum < 0.35;
    el = el.parentElement;
  }
  return false;
}

/**
 * Drives the floating mobile controls:
 *  - `overHero`: a full-bleed photo hero (any element marked `data-nav-overlay`)
 *    is still behind the controls, so they switch to light glass.
 *  - `overDark`: the content directly under the control strip is dark, so the
 *    scroll-edge backdrop should tint dark instead of parchment.
 *  - `scrolled`: the page has scrolled at all (wordmark fade).
 */
export function useOverlayTone(stripHeight = 72) {
  const [overHero, setOverHero] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>("[data-nav-overlay]");
      setOverHero(Boolean(hero) && hero!.getBoundingClientRect().bottom > stripHeight);
      setScrolled(window.scrollY > 24);
      // Fixed header ignores pointer events, so this samples the page beneath it.
      setOverDark(isDarkBehind(window.innerWidth / 2, Math.min(stripHeight, window.innerHeight - 1)));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Client-rendered pages (e.g. the PDP) mount their hero after hydration.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [stripHeight]);

  return { overHero, overDark, scrolled };
}
