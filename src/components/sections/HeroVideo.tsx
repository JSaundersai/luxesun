"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

interface HeroVideoProps {
  /** Milliseconds to hold the still image before revealing the video. */
  startDelayMs?: number;
}

/**
 * Video variant of the hero. Plays a muted, golden-hour beach clip once and
 * freezes on the final frame. Falls back to the still image for reduced-motion
 * users and while the clip buffers. The homepage supplies a five-second delay;
 * the /index-video comparison page keeps the default immediate start.
 */
export default function HeroVideo({ startDelayMs = 0 }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(startDelayMs <= 0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect the user's reduced-motion preference — fall back to the still image.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Count only visible time so a background tab does not unexpectedly start media.
  useEffect(() => {
    if (reducedMotion || startDelayMs <= 0) {
      setVideoStarted(!reducedMotion && startDelayMs <= 0);
      return;
    }

    let remainingMs = startDelayMs;
    let timer: number | null = null;
    let timerStartedAt = 0;

    const clearTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
        remainingMs = Math.max(0, remainingMs - (Date.now() - timerStartedAt));
      }
    };

    const startTimer = () => {
      if (remainingMs <= 0) {
        setVideoStarted(true);
        return;
      }
      if (document.visibilityState !== "visible" || timer !== null) return;

      timerStartedAt = Date.now();
      timer = window.setTimeout(() => {
        timer = null;
        remainingMs = 0;
        setVideoStarted(true);
      }, remainingMs);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startTimer();
      } else {
        clearTimer();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    startTimer();

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, startDelayMs]);

  // Some browsers need an explicit play() even with the autoPlay attribute.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion || !videoStarted) return;
    if (v.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setVideoReady(true);
    }
    v.play().catch(() => {});
  }, [reducedMotion, videoReady, videoStarted]);

  return (
    <section
      data-nav-overlay
      className="relative isolate flex h-[60svh] min-h-[480px] max-h-[640px] items-end overflow-hidden rounded-b-sheet bg-near-black sm:h-[58svh] sm:max-h-[720px] lg:h-auto lg:max-h-none lg:min-h-[100vh] lg:rounded-none"
    >
      {/* Background image — instant poster, fallback, and LCP element */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholders/hero-sun.jpg"
          alt="Woman in UPF 50+ sun-protective activewear on a beach volleyball court at golden hour"
          fill
          className="object-cover object-[72%_center] lg:object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Background video — preloads behind the still, then reveals once the delay and buffer are ready */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
            videoReady && videoStarted ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={videoStarted}
          muted
          playsInline
          preload="auto"
          poster="/placeholders/hero-sun.jpg"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        >
          <source src="/hero-beach.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay — bottom + left gradients keep the headline readable; a soft
          top fade keeps the floating mobile controls legible on bright sky. */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-near-black/75 via-near-black/10 to-near-black/30 lg:from-near-black/70" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-near-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-6 lg:pb-24 lg:pt-32">
        <FadeIn>
          <div className="max-w-[650px]">
            <p className="mb-6 hidden font-sans text-[0.7rem] font-medium uppercase tracking-[0.35em] text-ivory/90 [text-shadow:0_1px_16px_rgba(20,20,19,0.55)] lg:block">
              Certified UPF 50+ Sun Protection
            </p>
            <h1 className="mb-3 font-serif text-[2.75rem] font-medium leading-[1.0] text-ivory sm:text-[3.4rem] lg:mb-8 lg:text-[5rem]">
              Play Longer.
              <br />
              Stay Covered.
            </h1>
            {/* Mobile: short, app-style subtitle */}
            <p className="mb-6 max-w-[320px] font-sans text-[1.02rem] leading-[1.45] text-ivory/90 [text-shadow:0_1px_16px_rgba(20,20,19,0.55)] sm:max-w-[420px] lg:hidden">
              Certified UPF 50+ layers for the court, the trail and every sun sport.
            </p>
            <p className="mb-12 hidden max-w-[440px] font-sans text-[1rem] font-light leading-[1.7] text-ivory/95 [text-shadow:0_1px_16px_rgba(20,20,19,0.55)] lg:block">
              Sun-protective sleeves, crops, shirts and base layers engineered
              for beach volleyball, running and every sun sport. UPF 50+
              coverage that moves the way you do.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#products" className="btn-pill-light min-w-[180px] lg:hidden">
                Shop the range
              </a>
              <a
                href="#products"
                className="hidden cursor-pointer items-center justify-center rounded-full bg-ivory px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-near-black no-underline transition-all duration-300 hover:bg-warm-sand lg:inline-flex"
              >
                Shop the Range
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-[2] hidden -translate-x-1/2 lg:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-ivory/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
