"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceholderProduct, getProductHandle } from "@/lib/placeholder-data";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { HeartIcon } from "@/components/ui/icons";

interface Props {
  product: PlaceholderProduct;
}

/**
 * Product tile. On touch screens it follows the mobile shop reference: rounded
 * image card, frosted wishlist heart, name + price. Hover-capable devices also
 * get the back-view swap and the Quick Add bar.
 */
export default function ProductCard({ product }: Props) {
  const isSale = product.badge === "Sale";
  const hasBack = Boolean(product.backImage);
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle(product.id);
  };

  return (
    <Link href={`/products/${getProductHandle(product)}`} className="group block no-underline text-inherit cursor-pointer">
      {/* Image */}
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-card bg-mist lg:mb-5 lg:rounded-none lg:bg-warm-sand">
        {/* Front */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            hasBack
              ? "[@media(hover:hover)]:group-hover:opacity-0"
              : "[@media(hover:hover)]:group-hover:scale-[1.03]"
          }`}
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Back (revealed on hover, pointer devices only) */}
        {hasBack && (
          <Image
            src={product.backImage as string}
            alt={`${product.name} — back view`}
            fill
            className="object-cover opacity-0 transition-opacity duration-700 ease-out [@media(hover:hover)]:group-hover:opacity-100"
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        {/* Quick shop overlay — hover devices only */}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-full p-4 transition-transform duration-500 ease-out group-hover:translate-y-0 [@media(hover:hover)]:block">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-ivory text-near-black font-sans text-[0.72rem] font-medium tracking-[0.12em] uppercase py-3 cursor-pointer transition-colors duration-300 hover:bg-near-black hover:text-ivory"
          >
            Quick Add
          </button>
        </div>

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/45 ring-1 ring-inset ring-white/50 backdrop-blur-md transition-[transform,color] duration-200 active:scale-90 lg:right-3 lg:top-3 ${
            saved ? "text-terracotta" : "text-white"
          }`}
        >
          <HeartIcon filled={saved} className="h-[18px] w-[18px] drop-shadow-[0_1px_2px_rgba(20,20,19,0.25)]" />
        </button>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute left-2 top-2 z-10 rounded-full px-2.5 py-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.12em] lg:left-3 lg:top-3 ${
              isSale ? "bg-near-black text-ivory" : "bg-ivory/85 text-near-black backdrop-blur-md"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-0.5 lg:px-0">
        <div className="mb-0.5 font-sans text-[0.95rem] font-medium leading-snug text-near-black transition-colors duration-300 lg:mb-1 lg:text-[0.85rem] [@media(hover:hover)]:group-hover:text-terracotta">
          {product.name}
        </div>
        <div className="mb-2 hidden font-sans text-[0.78rem] text-stone-gray lg:block">
          {product.subCategory}
        </div>
        <div className="font-sans text-[0.88rem] text-olive-gray lg:text-[0.85rem] lg:text-near-black">
          ${product.price}
          {product.originalPrice && (
            <span className="line-through text-stone-gray font-normal ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color swatches — desktop */}
        <div className="mt-3 hidden gap-1.5 lg:flex">
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
