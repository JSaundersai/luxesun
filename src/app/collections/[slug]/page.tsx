"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { placeholderProducts, athleticSubCategories, studioSubCategories } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";
import { useState } from "react";

const collectionData: Record<string, { title: string; description: string; subCategories: string[] }> = {
  athletic: {
    title: "Athletic",
    description: "Performance-driven sun protection for the active athlete. Engineered for high-intensity movement.",
    subCategories: athleticSubCategories,
  },
  studio: {
    title: "Studio",
    description: "Casual, fashion-forward pieces for everyday wear. From studio to street with effortless style.",
    subCategories: studioSubCategories,
  },
};

const subCategoryImages: Record<string, string> = {
  "New Arrivals": "/placeholders/product-crop-top.jpg",
  "Beach Volleyball": "/placeholders/product-rashguard.jpg",
  "Running": "/placeholders/product-longsleeve.jpg",
  "Racket Sports": "/placeholders/product-tank.jpg",
  "Cycling": "/placeholders/product-hoodie.jpg",
  "Equestrian": "/placeholders/product-jacket.jpg",
  "Accessories": "/placeholders/product-wrap.jpg",
  "Daily Wear": "/placeholders/product-halter.jpg",
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = collectionData[slug];
  
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  if (!collection) {
    return (
      <>
        <Navbar initialScrolled />
        <main className="pt-32 px-6 min-h-screen">
          <div className="max-w-[1400px] mx-auto text-center">
            <h1 className="font-serif text-4xl mb-4">Collection Not Found</h1>
            <a href="/" className="text-terracotta underline">Return Home</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const filteredProducts = placeholderProducts.filter((product) => {
    if (product.category !== collection.title) return false;
    if (!activeSubCategory) return true;
    if (activeSubCategory === "New Arrivals") return product.badge === "New";
    return product.subCategory === activeSubCategory;
  });

  const handleSubCategoryClick = (sub: string) => {
    if (activeSubCategory === sub) {
      setActiveSubCategory(null);
    } else {
      setActiveSubCategory(sub);
    }
  };

  return (
      <>
        <Navbar initialScrolled />
        <main className="pt-24 md:pt-32">
        {/* Collection Header with inline subcategories */}
        <section className="px-6 pb-4">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                {/* Title and description */}
                <div className="md:max-w-[400px]">
                  <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] font-medium text-near-black mb-4">
                    {collection.title}
                  </h1>
                  <p className="font-sans text-[0.95rem] text-stone-gray leading-relaxed">
                    {collection.description}
                  </p>
                </div>
                
                {/* Subcategories - inline horizontally */}
                <div className="flex flex-wrap gap-4 md:gap-5 md:pt-4">
                  {collection.subCategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubCategoryClick(sub)}
                      className={`group flex flex-col items-center gap-2 cursor-pointer min-w-[70px] transition-all duration-300 ${
                        activeSubCategory === sub ? 'scale-105' : ''
                      }`}
                    >
                      <div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm transition-all duration-300 ${
                          activeSubCategory === sub 
                            ? 'ring-2 ring-terracotta ring-offset-2' 
                            : 'ring-2 ring-border-cream group-hover:ring-terracotta'
                        }`}
                      >
                        <Image
                          src={subCategoryImages[sub] || "/placeholders/product-crop-top.jpg"}
                          alt={sub}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={`font-sans text-[0.6rem] md:text-[0.7rem] font-medium tracking-[0.08em] uppercase text-center transition-colors max-w-[80px] leading-tight ${
                        activeSubCategory === sub ? 'text-terracotta' : 'text-near-black group-hover:text-terracotta'
                      }`}>
                        {sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Products */}
        <section className="px-6 py-12 bg-ivory border-t border-border-cream">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn className="text-center mb-10">
              <p className="section-eyebrow">{activeSubCategory || "All Products"}</p>
              <div className="flex items-center justify-center gap-4">
                <h2 className="section-title">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "style" : "styles"} found
                </h2>
                {activeSubCategory && (
                  <button
                    onClick={() => setActiveSubCategory(null)}
                    className="text-[0.75rem] text-terracotta font-sans tracking-[0.1em] uppercase underline underline-offset-4 hover:text-near-black transition-colors cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product, i) => (
                <FadeIn key={product.id} delay={i * 100}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
