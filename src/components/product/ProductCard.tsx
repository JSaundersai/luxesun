"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceholderProduct, getProductHandle } from "@/lib/placeholder-data";
import { useCart } from "@/context/CartProvider";

interface Props {
  product: PlaceholderProduct;
}

export default function ProductCard({ product }: Props) {
  const isSale = product.badge === "Sale";
  const hasBack = Boolean(product.backImage);
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/products/${getProductHandle(product)}`} className="group block no-underline text-inherit cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-warm-sand overflow-hidden mb-5">
        {/* Front */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            hasBack
              ? "group-hover:opacity-0"
              : "group-hover:scale-[1.03]"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Back (revealed on hover) */}
        {hasBack && (
          <Image
            src={product.backImage as string}
            alt={`${product.name} — back view`}
            fill
            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        {/* Quick shop overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-ivory text-near-black font-sans text-[0.72rem] font-medium tracking-[0.12em] uppercase py-3 cursor-pointer transition-colors duration-300 hover:bg-near-black hover:text-ivory"
          >
            Quick Add
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 text-ivory font-sans text-[0.65rem] font-medium px-3 py-1 tracking-[0.1em] uppercase ${
              isSale ? "bg-near-black" : "bg-terracotta"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="font-sans text-[0.85rem] font-medium text-near-black mb-1 group-hover:text-terracotta transition-colors duration-300">
          {product.name}
        </div>
        <div className="font-sans text-[0.78rem] text-stone-gray mb-2">
          {product.subCategory}
        </div>
        <div className="font-sans text-[0.85rem] text-near-black">
          ${product.price}
          {product.originalPrice && (
            <span className="line-through text-stone-gray font-normal ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5 mt-3">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="w-3 h-3 rounded-full border border-border-warm"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
