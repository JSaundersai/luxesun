"use client";

import Image from "next/image";
import { placeholderCategories } from "@/lib/placeholder-data";

export default function Categories() {
  return (
    <section id="collections" className="py-24 px-6 bg-parchment">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">Collections</p>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-desc mx-auto">
            From sunrise yoga to sunset runs — find your perfect fit for every
            movement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderCategories.map((cat) => (
            <div
              key={cat.title}
              className="relative rounded-very-round overflow-hidden aspect-[3/4] cursor-pointer bg-dark-surface group"
            >
              {/* Gradient placeholder — replaced by image when available */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-transform duration-500 group-hover:scale-105`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="font-serif text-[1.6rem] font-medium text-ivory mb-1">
                  {cat.title}
                </div>
                <div className="font-sans text-[0.8rem] text-warm-silver tracking-wide">
                  {cat.count} styles
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
