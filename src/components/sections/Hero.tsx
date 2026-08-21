"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-near-black">
      {/* Background image */}
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

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-near-black/70 via-near-black/10 to-near-black/30" />

      {/* Content */}
      <div className="relative z-[2] px-6 pb-24 pt-32 max-w-[1400px] mx-auto w-full">
        <FadeIn>
          <div className="max-w-[650px]">
            <p className="font-sans text-[0.7rem] font-medium tracking-[0.35em] uppercase text-warm-silver/80 mb-6">
              Certified UPF 50+ Sun Protection
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5rem] font-medium leading-[1.0] text-ivory mb-8">
              Play Longer.
              <br />
              Stay Covered.
            </h1>
            <p className="font-sans text-[1rem] font-light leading-[1.7] text-warm-silver/80 mb-12 max-w-[440px]">
              Sun-protective sleeves, crops, shirts and base layers engineered
              for beach volleyball, running and every sun sport. UPF 50+
              coverage that moves the way you do.
            </p>
            <div className="flex gap-5 flex-wrap">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full bg-ivory px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-near-black no-underline cursor-pointer transition-all duration-300 hover:bg-warm-sand"
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
