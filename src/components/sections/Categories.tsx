"use client";

import Image from "next/image";
import Link from "next/link";
import { placeholderCategories } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function Categories() {
  return (
    <section
      id="collections"
      className="overflow-hidden bg-parchment px-6 py-12 md:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <FadeIn className="mb-8 max-w-[560px] md:mb-10">
          <p className="section-eyebrow">Shop by sport</p>
          <h2 className="section-title mb-4">Move in the sun.</h2>
          <p className="section-desc">
            Purpose-built coverage for the court, the trail and every outdoor
            session in between.
          </p>
        </FadeIn>

        {/* The contained rail becomes a three-card grid once there is room. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {placeholderCategories.map((cat, i) => (
            <FadeIn
              key={cat.title}
              delay={i * 150}
              className="min-w-[82vw] snap-start sm:min-w-[60vw] md:min-w-0"
            >
              <Link
                href={`/collections/${cat.slug}`}
                aria-label={`Shop ${cat.title}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-dark-surface"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 639px) 82vw, (max-width: 1023px) 50vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-8 md:p-9">
                  <span className="mb-3 block font-sans text-[0.62rem] font-medium uppercase tracking-[0.24em] text-warm-silver/80">
                    0{i + 1} / Luxe Sun
                  </span>
                  <h3 className="mb-3 font-serif text-[2.7rem] font-medium leading-[0.95] sm:text-[3.2rem] md:text-[2.7rem] lg:text-[3.2rem]">
                    {cat.title}
                  </h3>
                  {cat.subtitle && (
                    <p className="mb-5 max-w-[320px] font-sans text-[0.85rem] leading-[1.55] text-warm-silver/90">
                      {cat.subtitle}
                    </p>
                  )}
                  <span className="inline-flex min-h-[48px] items-center gap-3 bg-ivory px-5 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 group-hover:gap-4">
                    Shop now
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
