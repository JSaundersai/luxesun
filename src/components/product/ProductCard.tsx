"use client";

import Image from "next/image";
import { PlaceholderProduct } from "@/lib/placeholder-data";

interface Props {
  product: PlaceholderProduct;
}

export default function ProductCard({ product }: Props) {
  const isSale = product.badge === "Sale";

  return (
    <div className="bg-ivory border border-border-cream rounded-generous overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-whisper hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-warm-sand overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Placeholder text when image is missing */}
        <div className="absolute inset-0 flex items-center justify-center text-stone-gray font-sans text-sm">
          Product Image
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-ivory font-sans text-[0.7rem] font-medium px-2.5 py-1 rounded-[6px] tracking-wide uppercase ${
              isSale ? "bg-near-black" : "bg-gold"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-5">
        <div className="font-serif text-[1.15rem] font-medium text-near-black mb-1">
          {product.name}
        </div>
        <div className="font-sans text-[0.78rem] text-stone-gray mb-2.5">
          {product.category}
        </div>
        <div className="font-sans text-[0.95rem] font-medium text-near-black">
          ${product.price}
          {product.originalPrice && (
            <span className="line-through text-stone-gray font-normal ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-border-warm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
