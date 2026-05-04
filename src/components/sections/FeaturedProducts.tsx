"use client";

import ProductCard from "@/components/product/ProductCard";
import { placeholderProducts } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function FeaturedProducts() {
  const displayProducts = placeholderProducts.slice(0, 8);

  return (
    <section id="products" className="py-28 px-6 bg-ivory">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="section-eyebrow">Bestsellers</p>
          <h2 className="section-title">Most Loved This Season</h2>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {displayProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
