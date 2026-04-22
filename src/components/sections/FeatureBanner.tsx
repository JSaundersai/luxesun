"use client";

import Image from "next/image";

export default function FeatureBanner() {
  return (
    <section id="feature" className="bg-near-black py-24 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="py-10">
          <p className="section-eyebrow">UPF 50+ Technology</p>
          <h2 className="font-serif text-[2.5rem] font-medium leading-[1.2] text-ivory mb-4">
            Sun Protection
            <br />
            Woven Into Every Fibre
          </h2>
          <p className="font-sans text-[1.05rem] leading-relaxed text-warm-silver max-w-xl mb-8">
            Every Luxe Sun top is built with tightly woven, lab-tested UPF 50+
            fabrics that block 98% of harmful UV rays. Combined with 4-way
            stretch, moisture-wicking technology, and cooling ventilation zones —
            your skin stays protected without sacrificing performance or style.
          </p>
          <a href="#products" className="btn-primary">
            Shop All Tops
          </a>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] bg-dark-surface rounded-very-round overflow-hidden">
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
          <div className="absolute inset-0 flex items-center justify-center text-olive-gray font-sans text-sm">
            Lifestyle Image
          </div>
        </div>
      </div>
    </section>
  );
}
