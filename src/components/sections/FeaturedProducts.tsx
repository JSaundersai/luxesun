"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/context/ProductsProvider";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

type ProductTab = "new" | "bestsellers";

const tabs: { id: ProductTab; label: string }[] = [
  { id: "new", label: "New Arrivals" },
  { id: "bestsellers", label: "Best Sellers" },
];

export default function FeaturedProducts() {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState<ProductTab>("new");
  const railRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) =>
    activeTab === "new"
      ? product.badge === "New"
      : product.badge === "Bestseller"
  );
  const displayProducts = (filteredProducts.length > 0
    ? filteredProducts
    : products
  ).slice(0, 8);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeTab]);

  const moveRail = (direction: number) => {
    railRef.current?.scrollBy({
      left: direction * (railRef.current.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <section id="products" className="overflow-hidden bg-ivory px-6 py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Header and tabs */}
        <FadeIn className="mb-12 md:mb-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[580px]">
              <p className="section-eyebrow">The Range</p>
              <h2 className="section-title mb-4">Built for the Sun</h2>
              <p className="section-desc">
                Certified UPF 50+ sleeves, crops, shirts and base layers —
                engineered to keep you cool and covered through every sun sport.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Featured products"
              className="flex w-fit gap-6 border-b border-border-warm"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="featured-product-rail"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                      isActive ? "text-near-black" : "text-stone-gray hover:text-near-black"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-0 bottom-[-1px] h-px bg-near-black transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Large, left-aligned product rail */}
        <div
          ref={railRef}
          id="featured-product-rail"
          role="tabpanel"
          aria-label={tabs.find((tab) => tab.id === activeTab)?.label}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:gap-5 md:mx-0 md:px-0"
        >
          {displayProducts.map((product, i) => (
            <FadeIn
              key={product.id}
              delay={i * 100}
              className="min-w-[72vw] snap-start sm:min-w-[42vw] md:min-w-[31vw] lg:min-w-[34vw]"
            >
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-stone-gray">
            {displayProducts.length} styles
          </span>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => moveRail(-1)}
                className="flex h-10 w-10 items-center justify-center border border-border-warm text-near-black transition-colors duration-300 hover:border-near-black hover:bg-near-black hover:text-ivory"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5m7 7l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => moveRail(1)}
                className="flex h-10 w-10 items-center justify-center border border-border-warm text-near-black transition-colors duration-300 hover:border-near-black hover:bg-near-black hover:text-ivory"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link href="/collections" className="btn-secondary">
              Shop All Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
