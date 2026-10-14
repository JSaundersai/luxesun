"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function EditorialBanner() {
  return (
    // Mobile: inset rounded card on parchment. Desktop: full-bleed banner.
    <section className="bg-parchment px-3 pb-3 sm:px-6 sm:pb-6 lg:p-0">
      <div className="relative isolate flex min-h-[64svh] items-end overflow-hidden rounded-sheet bg-near-black sm:min-h-[56svh] lg:min-h-[80vh] lg:items-center lg:rounded-none">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholders/cat-longsleeves.jpg"
            alt="Runner in a Luxe Sun long-sleeve on a mountain trail"
            fill
            className="object-cover opacity-75 lg:opacity-40"
            sizes="(max-width: 1023px) 100vw, 100vw"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-near-black/85 via-near-black/25 to-transparent lg:bg-gradient-to-r lg:from-near-black/70 lg:via-near-black/30 lg:to-transparent" />

        {/* Content */}
        <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-6 py-8 sm:px-8 sm:py-10 lg:px-6 lg:py-20">
          <FadeIn>
            <div className="max-w-[550px]">
              <p className="mb-6 hidden font-sans text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-silver/70 lg:block">
                Built For The Sun
              </p>
              <h2 className="mb-3 font-serif text-[2.3rem] font-medium leading-[1.05] text-ivory sm:text-[2.8rem] lg:mb-6 lg:text-[4rem]">
                Coverage That Keeps Up With Your Sport
              </h2>
              <p className="mb-6 max-w-[440px] font-sans text-[0.98rem] leading-[1.55] text-warm-silver/90 lg:mb-10 lg:text-[1rem] lg:font-light lg:leading-[1.7] lg:text-warm-silver/80">
                From the first serve to the final sprint — sleeves, crops, shirts
                and base layers that keep you cool, covered and moving.
              </p>
              <a href="#products" className="btn-pill-light lg:hidden">
                Shop the collection
              </a>
              <a
                href="#products"
                className="hidden cursor-pointer items-center justify-center rounded-full bg-ivory px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-near-black no-underline transition-all duration-300 hover:bg-warm-sand lg:inline-flex"
              >
                Shop the Collection
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
