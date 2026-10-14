"use client";

import { useEffect, useState } from "react";

/**
 * True in Chromium-based browsers where `backdrop-filter: url(#svg)` renders
 * (Chrome, Edge, Samsung Internet, Chrome on Android). Safari, and every
 * browser on iOS including Chrome (CriOS), uses WebKit and ignores it.
 * Resolved after mount so server and first client render match.
 */
export function useIsChromium(): boolean {
  const [isChromium, setIsChromium] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsChromium(/Chrome\/|Chromium\//.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua));
  }, []);

  return isChromium;
}
