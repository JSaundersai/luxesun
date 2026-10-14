"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/product/ProductCard";
import ProductTopBar from "@/components/product/ProductTopBar";
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
  const [activeSlide, setActiveSlide] = useState(0);
  const sizesRef = useRef<HTMLDivElement>(null);

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
      // On mobile the button lives in the bottom bar — bring the sizes into view.
      sizesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (stockFor(activeSize) === 0) return;
    addItem(product, {
      color: product.colors[activeColor]?.name,
      size: activeSize,
    });
  };

  const onGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setActiveSlide(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  };

  const description =
    product.description ??
    `Engineered with certified UPF 50+ sun protection and premium performance fabric, the ${product.name} is built to move with you — from the sand to the start line. Breathable, quick-drying and designed to outlast long days in the sun.`;

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
    <PageLayout mobileOverlay bottomBarSpacer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductTopBar
        productName={product.name}
        saved={inWishlist}
        onToggleSave={() => wishlist.toggle(product.id)}
        fallbackHref={`/collections/${slugify(product.category)}`}
      />
      <div className="mx-auto max-w-[1400px] lg:px-6 lg:py-14">
        {/* Breadcrumb (desktop) */}
        <nav aria-label="Breadcrumb" className="mb-8 hidden font-sans text-[0.72rem] uppercase tracking-[0.08em] text-stone-gray lg:block">
          <Link href="/" className="hover:text-near-black no-underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${slugify(product.category)}`} className="hover:text-near-black no-underline">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-near-black">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Mobile / Fold gallery — full-bleed swipe (2-up on the open Fold) */}
          <div data-nav-overlay className="relative lg:hidden">
            <div
              onScroll={onGalleryScroll}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${product.name} images`}
              className="no-scrollbar flex h-[66svh] min-h-[440px] max-h-[780px] snap-x snap-mandatory overflow-x-auto bg-mist sm:h-[62svh]"
            >
              {gallery.map((src, i) => (
                <div
                  key={src + i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${gallery.length}`}
                  className="relative h-full w-full shrink-0 snap-start sm:w-1/2"
                >
                  <Image
                    src={src}
                    alt={`${product.name} — ${galleryLabels[i] ?? `view ${i + 1}`}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 639px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>

            {product.badge && (
              <span className="absolute left-4 top-[calc(max(0.875rem,env(safe-area-inset-top))+3.5rem)] rounded-full bg-ivory/85 px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em] text-near-black backdrop-blur-md sm:left-8">
                {product.badge}
              </span>
            )}

            {gallery.length > 1 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-14 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
                {gallery.map((src, i) => (
                  <span
                    key={src + i}
                    className={`h-1.5 rounded-full bg-white shadow-[0_0_0_1px_rgba(20,20,19,0.08)] transition-all duration-300 ${
                      activeSlide === i ? "w-5 opacity-100" : "w-1.5 opacity-60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop gallery */}
          <div className="hidden gap-4 lg:flex lg:flex-row">
            {gallery.length > 1 && (
              <div className="flex flex-col gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onMouseEnter={() => setActiveImage(i)}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View ${galleryLabels[i] ?? `image ${i + 1}`}`}
                    className={`relative h-24 w-20 overflow-hidden rounded-[10px] bg-warm-sand transition-all ${
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
                fill sizes="45vw" className="object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-ivory font-sans text-[0.65rem] font-medium px-3 py-1 tracking-[0.1em] uppercase ${product.badge === "Sale" ? "bg-near-black" : "bg-terracotta"}`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details — frosted bottom sheet on mobile, plain column on desktop */}
          <div className="relative z-10 -mt-10 rounded-t-sheet bg-parchment/90 px-5 pb-10 pt-7 shadow-sheet backdrop-blur-2xl sm:px-8 sm:pt-8 lg:mt-0 lg:rounded-none lg:bg-transparent lg:p-0 lg:pt-4 lg:shadow-none lg:backdrop-blur-none">
            <p className="section-eyebrow hidden lg:block">{product.subCategory}</p>
            <div className="flex items-start justify-between gap-4">
              <h1 className="mb-3 font-serif text-[2.35rem] font-medium leading-[1.05] text-near-black sm:text-[2.6rem] lg:text-[2.8rem] lg:leading-tight">{product.name}</h1>
              {count > 0 && (
                <a
                  href="#reviews"
                  aria-label={`Rated ${average.toFixed(1)} out of 5 from ${count} review${count === 1 ? "" : "s"}`}
                  className="mt-2 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-sans text-[0.9rem] font-medium text-near-black no-underline ring-1 ring-inset ring-near-black/[0.06] lg:hidden"
                >
                  <span className="text-[#e5a23a]" aria-hidden="true">★</span>
                  {average.toFixed(1)}
                </a>
              )}
            </div>

            {count > 0 && (
              <a href="#reviews" className="mb-3 hidden items-center gap-2 no-underline lg:flex">
                <Stars value={average} />
                <span className="font-sans text-[0.8rem] text-stone-gray">{average.toFixed(1)} · {count} review{count === 1 ? "" : "s"}</span>
              </a>
            )}

            {/* Mobile: description sits right under the title, as in the reference */}
            <p className="mb-7 font-sans text-[1rem] leading-[1.6] text-olive-gray lg:hidden">{description}</p>

            <div className="mb-8 hidden font-sans text-[1.1rem] text-near-black lg:block">
              ${product.price}
              {product.originalPrice && (
                <span className="line-through text-stone-gray font-normal ml-3">${product.originalPrice}</span>
              )}
            </div>

            {/* Colours */}
            <div className="mb-7 lg:mb-8">
              <div className="mb-3 font-sans text-[0.72rem] uppercase tracking-[0.12em] text-stone-gray">
                Colour — <span className="text-near-black">{product.colors[activeColor]?.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    type="button"
                    aria-label={color.name}
                    aria-pressed={activeColor === i}
                    title={color.name}
                    onClick={() => setActiveColor(i)}
                    className={`h-9 w-9 rounded-full border transition-all lg:h-7 lg:w-7 ${activeColor === i ? "ring-2 ring-near-black ring-offset-2 ring-offset-parchment border-transparent lg:ring-terracotta" : "border-border-warm"}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div ref={sizesRef} className="mb-6 scroll-mt-24">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-sans text-[0.72rem] uppercase tracking-[0.12em] text-stone-gray">
                  Size {sizeError && <span className="ml-2 normal-case tracking-normal text-terracotta" role="alert">Please select a size</span>}
                </span>
                <Link href="/size-guide" className="inline-flex min-h-[44px] items-center font-sans text-[0.72rem] uppercase tracking-[0.08em] text-terracotta no-underline hover:text-near-black lg:min-h-0">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const out = stockFor(size) === 0;
                  const selected = activeSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selected}
                      aria-label={out ? `${size}, sold out` : size}
                      onClick={() => { setActiveSize(size); setSizeError(false); setNotified(false); }}
                      className={`h-11 min-w-[3.4rem] rounded-full px-4 font-sans text-[0.92rem] transition-colors lg:h-auto lg:min-w-[52px] lg:px-3 lg:py-2.5 lg:text-[0.8rem] ${
                        selected
                          ? "bg-near-black text-ivory"
                          : out
                            ? "bg-white/50 text-stone-gray/60 line-through ring-1 ring-inset ring-near-black/[0.04]"
                            : "bg-white text-near-black ring-1 ring-inset ring-near-black/[0.08] hover:ring-near-black"
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
              {soldOutSelected && notified && (
                <p className="mt-2 font-sans text-[0.82rem] text-terracotta lg:hidden">Thanks — we&apos;ll email you when {activeSize} is back.</p>
              )}
            </div>

            {/* Desktop purchase buttons (mobile uses the sticky bar below) */}
            <div className="hidden lg:block">
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
            </div>

            <div className="space-y-4 border-t border-border-cream pt-7 text-[0.9rem] leading-relaxed text-olive-gray lg:pt-8">
              <p className="hidden lg:block">{description}</p>
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
        <section id="reviews" className="mx-5 mt-2 scroll-mt-20 border-t border-border-cream pt-10 sm:mx-8 lg:mx-0 lg:mt-20 lg:scroll-mt-28 lg:pt-14">
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

              <div className="rounded-card border border-border-cream bg-ivory p-5 lg:rounded-none lg:bg-transparent">
                <h3 className="font-sans text-[0.8rem] font-medium tracking-[0.1em] uppercase text-near-black mb-4">Write a Review</h3>
                {rvDone ? (
                  <p className="font-sans text-[0.85rem] text-terracotta">Thanks for your review!</p>
                ) : (
                  <form onSubmit={submitReview} className="space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button type="button" key={n} onClick={() => setRvRating(n)} className={`flex h-11 w-9 items-center justify-center text-xl lg:h-auto lg:w-auto ${n <= rvRating ? "text-terracotta" : "text-border-warm"}`} aria-label={`${n} stars`}>★</button>
                      ))}
                    </div>
                    <input value={rvName} onChange={(e) => setRvName(e.target.value)} placeholder="Your name" aria-label="Your name" className="w-full rounded-[12px] border border-border-warm bg-white px-4 py-3 font-sans text-[1rem] focus:outline-none focus:border-near-black lg:rounded-none lg:px-3 lg:py-2 lg:text-[0.88rem]" />
                    <input value={rvTitle} onChange={(e) => setRvTitle(e.target.value)} placeholder="Title (optional)" aria-label="Review title" className="w-full rounded-[12px] border border-border-warm bg-white px-4 py-3 font-sans text-[1rem] focus:outline-none focus:border-near-black lg:rounded-none lg:px-3 lg:py-2 lg:text-[0.88rem]" />
                    <textarea value={rvBody} onChange={(e) => setRvBody(e.target.value)} placeholder="What did you think?" aria-label="Your review" rows={3} className="w-full rounded-[12px] border border-border-warm bg-white px-4 py-3 font-sans text-[1rem] focus:outline-none focus:border-near-black lg:rounded-none lg:px-3 lg:py-2 lg:text-[0.88rem]" />
                    <button type="submit" className="btn-pill w-full lg:hidden">Submit review</button>
                    <button type="submit" className="btn-primary hidden w-full lg:block">Submit Review</button>
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
          <section className="mt-14 px-5 sm:px-8 lg:mt-20 lg:px-0">
            <h2 className="mb-5 font-serif text-[2rem] font-medium text-near-black lg:mb-8 lg:text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 100}><ProductCard product={p} /></FadeIn>
              ))}
            </div>
          </section>
        )}
        <div className="h-14 lg:hidden" aria-hidden="true" />
      </div>

      {/* Mobile / Fold sticky purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-near-black/[0.06] bg-parchment/85 pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-3 backdrop-blur-xl backdrop-saturate-150 sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))] lg:hidden">
        <div className="mx-auto flex max-w-[720px] items-center gap-5">
          <div className="shrink-0">
            <div className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-stone-gray">Price</div>
            <div className="font-sans text-[1.5rem] font-medium leading-tight text-near-black">
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="ml-2 text-[0.85rem] font-normal text-stone-gray line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
          {soldOutSelected ? (
            <button
              type="button"
              onClick={() => setNotified(true)}
              disabled={notified}
              className="btn-pill min-h-[56px] flex-1 text-[1rem] disabled:opacity-60"
            >
              {notified ? "We'll email you" : `Notify me — ${activeSize}`}
            </button>
          ) : (
            <button type="button" onClick={handleAddToCart} className="btn-pill min-h-[56px] flex-1 text-[1rem]">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
