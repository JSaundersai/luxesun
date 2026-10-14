"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function FeatureBanner() {
  return (
    <section id="feature" className="bg-near-black px-5 py-14 sm:px-8 sm:py-16 lg:px-6 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-16">
        {/* Image */}
        <FadeIn>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sheet bg-dark-surface lg:rounded-none">
            <Image
              src="/placeholders/feature-lifestyle.jpg"
              alt="Woman training outdoors in Luxe Sun UPF top"
              fill
              className="object-cover"
              sizes="(max-width: 639px) 100vw, 50vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </FadeIn>

        {/* Text */}
        <FadeIn delay={200}>
          <div className="lg:py-10">
            <p className="section-eyebrow">UPF 50+ Technology</p>
            <h2 className="mb-5 font-serif text-[2.4rem] font-medium leading-[1.05] text-ivory sm:text-[2.6rem] lg:mb-6 lg:text-[3.5rem]">
              Sun Protection
              <br className="hidden lg:block" /> Woven Into Every
              <br className="hidden lg:block" /> Fibre
            </h2>
            <p className="mb-8 max-w-md font-sans text-[0.98rem] leading-[1.7] text-warm-silver/75 lg:mb-10 lg:text-[1rem] lg:leading-[1.8] lg:text-warm-silver/70">
              Every Luxe Sun piece is built with tightly woven, independently
              certified UPF 50+ fabric that blocks 98% of harmful UV rays.
              Combined with four-way stretch, moisture-wicking cooling zones and
              flatlock seams for chafe-free, all-day wear.
            </p>
            <a href="#products" className="btn-pill-light lg:hidden">
              Shop the range
            </a>
            <a
              href="#products"
              className="hidden cursor-pointer items-center justify-center rounded-full bg-ivory px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-near-black no-underline transition-all duration-300 hover:bg-warm-sand lg:inline-flex"
            >
              Shop the Range
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
