"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/animations/FadeIn";
import { slugify, SIZES } from "@/lib/placeholder-data";
import { useProducts } from "@/context/ProductsProvider";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { useAnalytics } from "@/context/AnalyticsProvider";
import { useReviews } from "@/context/ReviewsProvider";

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span style={{ fontSize: size }} className="text-terracotta leading-none tracking-[1px]" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= Math.round(value) ? "text-terracotta" : "text-border-warm"}>★</span>
      ))}
    </span>
  );
}

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { products, getProductByHandle, ready } = useProducts();
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const { trackProductView } = useAnalytics();
  const { forProduct, summary, addReview } = useReviews();
  const product = getProductByHandle(handle);

  useEffect(() => {
    if (handle) trackProductView(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [notified, setNotified] = useState(false);

  // review form
  const [rvName, setRvName] = useState("");
  const [rvRating, setRvRating] = useState(5);
  const [rvTitle, setRvTitle] = useState("");
  const [rvBody, setRvBody] = useState("");
  const [rvDone, setRvDone] = useState(false);

  if (!product) {
    return (
      <PageLayout>
        <div className="px-6 py-32 min-h-[50vh] text-center">
          <h1 className="font-serif text-4xl mb-4">{ready ? "Product Not Found" : "Loading…"}</h1>
          {ready && (
            <Link href="/collections" className="text-terracotta underline">Continue shopping</Link>
          )}
        </div>
      </PageLayout>
    );
  }

  const gallery = [product.image, product.backImage, ...(product.images ?? [])].filter(
    (src): src is string => Boolean(src)
  );
  const galleryLabels = ["Front", "Back"];

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const inWishlist = wishlist.has(product.id);
  const reviews = forProduct(product.id);
  const { average, count, distribution } = summary(product.id);

  const stockFor = (size: string) => product.stock?.[size] ?? 0;
  const selectedStock = activeSize ? stockFor(activeSize) : null;
  const soldOutSelected = activeSize !== null && selectedStock === 0;

  const handleAddToCart = () => {
    if (!activeSize) {
      setSizeError(true);
      return;
    }
    if (stockFor(activeSize) === 0) return;
    addItem(product, {
      color: product.colors[activeColor]?.name,
      size: activeSize,
    });
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rvName.trim() || !rvBody.trim()) return;
    addReview({
      productId: product.id,
      author: rvName.trim(),
      rating: rvRating,
      title: rvTitle.trim() || "Review",
      body: rvBody.trim(),
      verified: false,
    });
    setRvName(""); setRvTitle(""); setRvBody(""); setRvRating(5);
    setRvDone(true);
  };

  const features = product.features ?? [
    "Certified UPF 50+ — blocks 98% of UVA/UVB rays",
    "Cooling, moisture-wicking four-way stretch fabric",
    "Flatlock seams for chafe-free, all-day wear",
    "Designed and tested in Australia",
  ];

  const inStock = Object.values(product.stock ?? {}).some((v) => v > 0);
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: gallery,
    description: product.description ?? `${product.name} — certified UPF 50+ sun-protective activewear.`,
    category: product.category,
    brand: { "@type": "Brand", name: "Luxe Sun" },
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: product.price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average.toFixed(1),
            reviewCount: count,
          },
        }
      : {}),
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="font-sans text-[0.72rem] tracking-[0.08em] uppercase text-stone-gray mb-8">
          <Link href="/" className="hover:text-near-black no-underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${slugify(product.category)}`} className="hover:text-near-black no-underline">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-near-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            {gallery.length > 1 && (
              <div className="flex flex-row md:flex-col gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onMouseEnter={() => setActiveImage(i)}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View ${galleryLabels[i] ?? `image ${i + 1}`}`}
                    className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden bg-warm-sand transition-all ${
                      activeImage === i ? "ring-2 ring-terracotta ring-offset-2" : "ring-1 ring-border-warm hover:ring-near-black"
                    }`}
                  >
                    <Image src={src} alt={`${product.name} ${galleryLabels[i] ?? ""}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="relative flex-1 aspect-[3/4] bg-warm-sand overflow-hidden">
              <Image
                src={gallery[activeImage] ?? product.image}
                alt={`${product.name} — ${galleryLabels[activeImage] ?? "view"}`}
                fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-ivory font-sans text-[0.65rem] font-medium px-3 py-1 tracking-[0.1em] uppercase ${product.badge === "Sale" ? "bg-near-black" : "bg-terracotta"}`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:pt-4">
            <p className="section-eyebrow">{product.subCategory}</p>
            <h1 className="font-serif text-[2.2rem] md:text-[2.8rem] font-medium leading-tight text-near-black mb-3">{product.name}</h1>

            {count > 0 && (
              <a href="#reviews" className="flex items-center gap-2 mb-3 no-underline">
                <Stars value={average} />
                <span className="font-sans text-[0.8rem] text-stone-gray">{average.toFixed(1)} · {count} review{count === 1 ? "" : "s"}</span>
              </a>
            )}

            <div className="font-sans text-[1.1rem] text-near-black mb-8">
              ${product.price}
              {product.originalPrice && (
                <span className="line-through text-stone-gray font-normal ml-3">${product.originalPrice}</span>
              )}
            </div>

            {/* Colours */}
            <div className="mb-8">
              <div className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-stone-gray mb-3">
                Colour — <span className="text-near-black">{product.colors[activeColor]?.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    aria-label={color.name}
                    title={color.name}
                    onClick={() => setActiveColor(i)}
                    className={`w-7 h-7 rounded-full border transition-all ${activeColor === i ? "ring-2 ring-terracotta ring-offset-2 border-transparent" : "border-border-warm"}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-stone-gray">
                  Size {sizeError && <span className="text-terracotta ml-2 normal-case tracking-normal">Please select a size</span>}
                </span>
                <Link href="/size-guide" className="font-sans text-[0.72rem] tracking-[0.08em] uppercase text-terracotta no-underline hover:text-near-black">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SIZES.map((size) => {
                  const out = stockFor(size) === 0;
                  const selected = activeSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => { setActiveSize(size); setSizeError(false); setNotified(false); }}
                      className={`min-w-[52px] py-2.5 px-3 font-sans text-[0.8rem] border transition-all relative ${
                        selected ? "bg-near-black text-ivory border-near-black"
                        : out ? "border-border-cream text-stone-gray/50 line-through"
                        : "border-border-warm text-near-black hover:border-near-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {activeSize && !soldOutSelected && selectedStock !== null && selectedStock <= 5 && (
                <p className="font-sans text-[0.78rem] text-terracotta mt-2">Only {selectedStock} left in {activeSize}</p>
              )}
            </div>

            {soldOutSelected ? (
              <div className="mb-4">
                <button disabled className="btn-primary w-full text-center opacity-50 cursor-not-allowed mb-3">Sold Out</button>
                {notified ? (
                  <p className="font-sans text-[0.82rem] text-terracotta text-center">Thanks — we&apos;ll email you when {activeSize} is back.</p>
                ) : (
                  <button onClick={() => setNotified(true)} className="btn-secondary w-full text-center">Notify me when back in stock</button>
                )}
              </div>
            ) : (
              <button onClick={handleAddToCart} className="btn-primary w-full text-center mb-4">Add to Cart</button>
            )}

            <button onClick={() => wishlist.toggle(product.id)} className="btn-secondary w-full text-center mb-8">
              {inWishlist ? "♥ Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <div className="space-y-4 border-t border-border-cream pt-8 text-[0.9rem] text-olive-gray leading-relaxed">
              <p>
                {product.description ??
                  `Engineered with certified UPF 50+ sun protection and premium performance fabric, the ${product.name} is built to move with you — from the sand to the start line. Breathable, quick-drying and designed to outlast long days in the sun.`}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-gray">
                {features.map((f) => <li key={f}>{f}</li>)}
              </ul>

              {/* Rich detail rows */}
              <dl className="border-t border-border-cream pt-5 space-y-3 text-[0.85rem]">
                {product.fabric && (
                  <div><dt className="font-sans text-[0.68rem] tracking-[0.12em] uppercase text-stone-gray mb-1">Fabric</dt><dd className="text-near-black">{product.fabric}</dd></div>
                )}
                {product.fit && (
                  <div><dt className="font-sans text-[0.68rem] tracking-[0.12em] uppercase text-stone-gray mb-1">Fit</dt><dd className="text-near-black">{product.fit}</dd></div>
                )}
                {product.care && product.care.length > 0 && (
                  <div><dt className="font-sans text-[0.68rem] tracking-[0.12em] uppercase text-stone-gray mb-1">Care</dt><dd className="text-near-black">{product.care.join(" · ")}</dd></div>
                )}
                {product.modelInfo && (
                  <div><dt className="font-sans text-[0.68rem] tracking-[0.12em] uppercase text-stone-gray mb-1">Model</dt><dd className="text-near-black">{product.modelInfo}</dd></div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section id="reviews" className="mt-20 border-t border-border-cream pt-14 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Summary + form */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-[2rem] font-medium text-near-black mb-4">Reviews</h2>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-[2.4rem] leading-none text-near-black">{average.toFixed(1)}</span>
                <div>
                  <Stars value={average} size={16} />
                  <div className="font-sans text-[0.78rem] text-stone-gray mt-1">{count} review{count === 1 ? "" : "s"}</div>
                </div>
              </div>
              {count > 0 && (
                <div className="space-y-1.5 mt-4 mb-8">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 font-sans text-[0.75rem] text-stone-gray">
                      <span className="w-3">{star}</span>
                      <span className="text-terracotta">★</span>
                      <div className="flex-1 h-1.5 bg-warm-sand rounded overflow-hidden">
                        <div className="h-full bg-terracotta/70" style={{ width: `${count ? (distribution[star] / count) * 100 : 0}%` }} />
                      </div>
                      <span className="w-5 text-right">{distribution[star]}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border border-border-cream p-5">
                <h3 className="font-sans text-[0.8rem] font-medium tracking-[0.1em] uppercase text-near-black mb-4">Write a Review</h3>
                {rvDone ? (
                  <p className="font-sans text-[0.85rem] text-terracotta">Thanks for your review!</p>
                ) : (
                  <form onSubmit={submitReview} className="space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button type="button" key={n} onClick={() => setRvRating(n)} className={`text-xl ${n <= rvRating ? "text-terracotta" : "text-border-warm"}`} aria-label={`${n} stars`}>★</button>
                      ))}
                    </div>
                    <input value={rvName} onChange={(e) => setRvName(e.target.value)} placeholder="Your name" className="w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.88rem] focus:outline-none focus:border-near-black" />
                    <input value={rvTitle} onChange={(e) => setRvTitle(e.target.value)} placeholder="Title (optional)" className="w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.88rem] focus:outline-none focus:border-near-black" />
                    <textarea value={rvBody} onChange={(e) => setRvBody(e.target.value)} placeholder="What did you think?" rows={3} className="w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.88rem] focus:outline-none focus:border-near-black" />
                    <button type="submit" className="btn-primary w-full">Submit Review</button>
                  </form>
                )}
              </div>
            </div>

            {/* Review list */}
            <div className="lg:col-span-2">
              {reviews.length === 0 ? (
                <p className="font-sans text-[0.9rem] text-stone-gray">No reviews yet — be the first to share your thoughts.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((r) => (
                    <div key={r.id} className="border-b border-border-cream pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <Stars value={r.rating} />
                        <span className="font-sans text-[0.74rem] text-stone-gray">
                          {new Date(r.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <h4 className="font-sans text-[0.95rem] font-medium text-near-black">{r.title}</h4>
                      <p className="font-sans text-[0.88rem] text-olive-gray leading-relaxed mt-1">{r.body}</p>
                      <p className="font-sans text-[0.76rem] text-stone-gray mt-2">
                        {r.author}{r.verified && <span className="text-olive-gray"> · Verified buyer</span>}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-[2rem] font-medium text-near-black mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 100}><ProductCard product={p} /></FadeIn>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
