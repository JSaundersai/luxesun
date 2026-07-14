"use client";

import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/animations/FadeIn";
import { useWishlist } from "@/context/WishlistProvider";
import { useProducts } from "@/context/ProductsProvider";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const { products } = useProducts();

  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <PageLayout>
      <PageHero
        eyebrow="Saved"
        title="Wishlist"
        description="Keep track of the styles you love — save them here and shop when you're ready."
      />
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 min-h-[35vh]">
        {saved.length === 0 ? (
          <div className="border border-border-cream bg-ivory py-20 px-6 text-center">
            <p className="font-serif text-2xl text-near-black mb-3">
              Your wishlist is empty
            </p>
            <p className="font-sans text-[0.95rem] text-stone-gray mb-8">
              Tap “Add to Wishlist” on any product to save it here.
            </p>
            <Link href="/collections" className="btn-primary">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {saved.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
