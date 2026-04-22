import ProductCard from "@/components/product/ProductCard";
import { placeholderProducts } from "@/lib/placeholder-data";

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-24 px-6 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">Bestsellers</p>
          <h2 className="section-title">Most Loved This Season</h2>
          <p className="section-desc mx-auto">
            Our community&apos;s top picks — tried, tested, and obsessed over.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholderProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
