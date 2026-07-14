"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function FeatureBanner() {
  return (
    <section id="feature" className="bg-near-black py-28 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <FadeIn>
          <div className="relative aspect-[4/5] bg-dark-surface overflow-hidden">
            <Image
              src="/placeholders/feature-lifestyle.jpg"
              alt="Woman training outdoors in Luxe Sun UPF top"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </FadeIn>

        {/* Text */}
        <FadeIn delay={200}>
          <div className="py-10">
            <p className="section-eyebrow">UPF 50+ Technology</p>
            <h2 className="font-serif text-[3rem] lg:text-[3.5rem] font-medium leading-[1.05] text-ivory mb-6">
              Sun Protection
              <br />
              Woven Into Every
              <br />
              Fibre
            </h2>
            <p className="font-sans text-[1rem] leading-[1.8] text-warm-silver/70 max-w-md mb-10">
              Every Luxe Sun piece is built with tightly woven, independently
              certified UPF 50+ fabric that blocks 98% of harmful UV rays.
              Combined with four-way stretch, moisture-wicking cooling zones and
              flatlock seams for chafe-free, all-day wear.
            </p>
            <a
              href="#products"
              className="inline-block bg-ivory text-near-black font-sans text-[0.8rem] font-medium tracking-[0.15em] uppercase px-10 py-4 cursor-pointer transition-all duration-300 hover:bg-warm-sand"
            >
              Shop the Range
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
