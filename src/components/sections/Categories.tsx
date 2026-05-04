"use client";

import Image from "next/image";
import Link from "next/link";
import { placeholderCategories } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function Categories() {
  return (
    <section id="collections" className="py-20 px-6 bg-parchment">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          {placeholderCategories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 150}>
              <Link
                href={`/collections/${cat.title.toLowerCase()}`}
                className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-dark-surface group block w-full"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/30 to-transparent" />

                {/* Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
                  <div className="font-serif text-[3rem] md:text-[3.5rem] font-medium text-ivory mb-3">
                    {cat.title}
                  </div>
                  {cat.subtitle && (
                    <div className="font-sans text-[0.9rem] text-warm-silver/90 mb-5 max-w-[320px]">
                      {cat.subtitle}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-2 text-ivory font-sans text-[0.75rem] font-medium tracking-[0.12em] uppercase group-hover:gap-3 transition-all duration-300">
                    <span>Shop Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
