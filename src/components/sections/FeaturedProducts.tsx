"use client";

import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/context/ProductsProvider";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const displayProducts = products.slice(0, 8);

  return (
    <section id="products" className="py-28 px-6 bg-ivory">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="section-eyebrow">The Range</p>
          <h2 className="section-title">Built for the Sun</h2>
          <p className="section-desc mx-auto">
            Certified UPF 50+ sleeves, crops, shirts and base layers — engineered
            to keep you cool and covered through every sun sport.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {displayProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/collections" className="btn-secondary">
            Shop All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
