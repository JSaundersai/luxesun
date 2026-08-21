"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

interface HeroVideoProps {
  /** Milliseconds to hold the still image before mounting the video. */
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
    v.play().catch(() => {});
  }, [reducedMotion, videoStarted]);

  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-near-black">
      {/* Background image — instant poster, fallback, and LCP element */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholders/hero-sun.jpg"
          alt="Woman in UPF 50+ sun-protective activewear on a beach volleyball court at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Background video — mounts after the optional delay, then fades in once it can play */}
      {!reducedMotion && videoStarted && (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
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

      {/* Overlay — bottom + left gradients keep the headline readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-near-black/70 via-near-black/10 to-near-black/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-near-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-[2] px-6 pb-24 pt-32 max-w-[1400px] mx-auto w-full">
        <FadeIn>
          <div className="max-w-[650px]">
            <p className="font-sans text-[0.7rem] font-medium tracking-[0.35em] uppercase text-ivory/90 mb-6 [text-shadow:0_1px_16px_rgba(20,20,19,0.55)]">
              Certified UPF 50+ Sun Protection
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5rem] font-medium leading-[1.0] text-ivory mb-8">
              Play Longer.
              <br />
              Stay Covered.
            </h1>
            <p className="font-sans text-[1rem] font-light leading-[1.7] text-ivory/95 mb-12 max-w-[440px] [text-shadow:0_1px_16px_rgba(20,20,19,0.55)]">
              Sun-protective sleeves, crops, shirts and base layers engineered
              for beach volleyball, running and every sun sport. UPF 50+
              coverage that moves the way you do.
            </p>
            <div className="flex gap-5 flex-wrap">
              <a
                href="#products"
                className="inline-block bg-ivory text-near-black font-sans text-[0.8rem] font-medium tracking-[0.15em] uppercase px-10 py-4 cursor-pointer transition-all duration-300 hover:bg-warm-sand"
              >
                Shop the Range
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-ivory/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
