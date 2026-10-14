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
      <div className="mx-auto max-w-[900px] px-5 pb-8 pt-4 sm:px-8 lg:px-6 lg:pt-14">
        <label htmlFor="site-search" className="block font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-stone-gray mb-4">
          Search
        </label>
        <div className="relative">
          <input
            id="site-search"
            type="search"
            enterKeyHint="search"
            placeholder="Search for products..."
            className="w-full rounded-full border border-border-warm bg-white px-6 py-4 pr-12 font-sans text-[1rem] text-near-black placeholder:text-stone-gray focus:outline-none focus:border-near-black transition-colors lg:rounded-none lg:px-5"
          />
          <svg
            className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-gray"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
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
          <div className="flex flex-wrap gap-2">
            {popularTerms.map((term) => (
              <Link key={term} href="/collections" className="chip no-underline hover:ring-near-black">
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested products */}
      <section className="px-5 pb-20 sm:px-8 lg:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-6">
            Popular Right Now
          </div>
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
