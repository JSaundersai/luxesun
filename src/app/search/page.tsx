import Link from "next/link";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/product/ProductCard";
import { bestsellerProducts, placeholderProducts } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Search — Luxe Sun",
};

const popularTerms = [
  "Arm Sleeves",
  "Crop Tops",
  "Sun Shirts",
  "Base Layers",
  "Beach Volleyball",
  "New Arrivals",
];

export default function SearchPage() {
  const suggestions =
    bestsellerProducts.length > 0
      ? bestsellerProducts.slice(0, 4)
      : placeholderProducts.slice(0, 4);

  return (
    <PageLayout>
      <div className="max-w-[900px] mx-auto px-6 pt-14 pb-8">
        <label className="block font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-stone-gray mb-4">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full border border-border-warm bg-white px-5 py-4 pr-12 font-sans text-[1rem] text-near-black placeholder:text-stone-gray focus:outline-none focus:border-near-black transition-colors"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-gray"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Popular searches */}
        <div className="mt-8">
          <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-4">
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2.5">
            {popularTerms.map((term) => (
              <Link
                key={term}
                href="/collections"
                className="font-sans text-[0.82rem] text-near-black no-underline border border-border-warm px-4 py-2 hover:border-near-black transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested products */}
      <section className="px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-6">
            Popular Right Now
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
