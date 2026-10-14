"use client";

import Image from "next/image";
import Link from "next/link";
import { placeholderCategories } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function Categories() {
  return (
    <section
      id="collections"
      className="overflow-hidden bg-parchment px-5 pb-14 pt-2 sm:px-8 lg:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Mobile header — matches "Trending now" */}
        <div className="mb-4 flex items-end justify-between lg:hidden">
          <h2 className="font-serif text-[2rem] font-medium leading-none text-near-black sm:text-[2.4rem]">
            Shop by Sport
          </h2>
          <Link
            href="/collections"
            className="inline-flex min-h-[44px] items-center font-sans text-[0.95rem] text-near-black no-underline"
          >
            View all
          </Link>
        </div>

        <FadeIn className="mb-10 hidden max-w-[560px] lg:block">
          <p className="section-eyebrow">Shop by sport</p>
          <h2 className="section-title mb-4">Move in the sun.</h2>
          <p className="section-desc">
            Purpose-built coverage for the court, the trail and every outdoor
            session in between.
          </p>
        </FadeIn>

        {/* Swipe rail on phones / Fold, three-card grid on desktop. */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-5 px-5 sm:-mx-8 sm:scroll-px-8 sm:gap-3 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4 lg:overflow-visible lg:px-0">
          {placeholderCategories.map((cat, i) => (
            <FadeIn
              key={cat.title}
              delay={i * 150}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto"
            >
              <Link
                href={`/collections/${cat.slug}`}
                aria-label={`Shop ${cat.title}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sheet bg-dark-surface lg:rounded-none"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
                  sizes="(max-width: 639px) 78vw, (max-width: 1023px) 44vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6 lg:p-9">
                  <span className="mb-3 hidden font-sans text-[0.62rem] font-medium uppercase tracking-[0.24em] text-warm-silver/80 lg:block">
                    0{i + 1} / Luxe Sun
                  </span>
                  <h3 className="mb-2 font-serif text-[2.2rem] font-medium leading-[0.95] sm:text-[2.4rem] lg:mb-3 lg:text-[3.2rem]">
                    {cat.title}
                  </h3>
                  {cat.subtitle && (
                    <p className="mb-4 max-w-[320px] font-sans text-[0.85rem] leading-[1.5] text-warm-silver/90 lg:mb-5">
                      {cat.subtitle}
                    </p>
                  )}
                  {/* Mobile: compact sentence-case pill */}
                  <span className="btn-pill-light min-h-[44px] px-5 text-[0.88rem] lg:hidden">
                    Shop now
                  </span>
                  <span className="hidden min-h-[48px] items-center gap-3 rounded-full bg-ivory px-6 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] text-near-black transition-all duration-300 group-hover:gap-4 lg:inline-flex">
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
