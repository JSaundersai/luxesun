"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { useEffect } from "react";
import { useAnalytics } from "@/context/AnalyticsProvider";

const shopByItems = [
  { label: "Sleeves", href: "/collections/sleeves" },
  { label: "Crop Tops", href: "/collections/crop-tops" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Base Layers", href: "/collections/base-layers" },
];

const activityItems = [
  { label: "Beach Volleyball", href: "/collections/beach-volleyball" },
  { label: "Running", href: "/collections/running" },
  { label: "Tennis & Golf", href: "/collections/tennis-and-golf" },
];

const shopForItems = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/bestsellers" },
  { label: "Sale", href: "/collections/sale" },
];

const collectionsItems = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/bestsellers" },
  { label: "Beach Volleyball", href: "/collections/beach-volleyball" },
  { label: "Run & Train", href: "/collections/running" },
  { label: "Shop All", href: "/collections" },
];

const featureTiles = [
  {
    eyebrow: "New In",
    title: "The Latest Collection",
    image: "/placeholders/menu-latest-collection.jpg",
    href: "/collections/new-arrivals",
  },
  {
    eyebrow: "Most Loved",
    title: "Best Sellers",
    image: "/placeholders/menu-best-seller.jpg",
    href: "/collections/bestsellers",
  },
];

function MenuColumn({
  heading,
  items,
  onNavigate,
}: {
  heading: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="font-sans text-[0.62rem] font-medium tracking-[0.22em] uppercase text-stone-gray mb-5">
        {heading}
      </div>
      <ul className="list-none space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="font-sans text-[0.9rem] text-near-black no-underline transition-colors duration-200 hover:text-terracotta"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const { count, openCart } = useCart();
  const { trackView } = useAnalytics();

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("luxe_session_view")) {
        sessionStorage.setItem("luxe_session_view", "1");
        trackView();
      }
    } catch {
      trackView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeMenus = () => {
    setShopOpen(false);
    setCollectionsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment border-b border-border-cream">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="font-serif text-[1.6rem] font-medium tracking-[0.12em] no-underline text-near-black"
        >
          Luxe Sun
        </Link>

        {/* Primary nav */}
        <ul className="hidden md:flex gap-10 items-center list-none absolute left-1/2 -translate-x-1/2">
          {/* Shop — mega menu trigger */}
          <li
            className="static"
            onMouseEnter={() => {
              setShopOpen(true);
              setCollectionsOpen(false);
            }}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className="font-sans text-[0.78rem] tracking-[0.12em] uppercase bg-transparent border-none cursor-pointer flex items-center gap-1.5 text-olive-gray hover:text-near-black transition-colors duration-200"
            >
              Shop
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${shopOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega menu — ~half screen, white */}
            {shopOpen && (
              <div className="absolute left-0 right-0 top-full pt-5 flex justify-start">
                <div
                  className="bg-white border border-border-cream shadow-whisper flex overflow-hidden"
                  style={{ width: "min(50vw, 900px)", minWidth: 720 }}
                >
                  {/* Category columns */}
                  <div className="flex-1 grid grid-cols-3 gap-10 px-10 py-9">
                    <MenuColumn heading="Shop By" items={shopByItems} onNavigate={closeMenus} />
                    <MenuColumn heading="Activities" items={activityItems} onNavigate={closeMenus} />
                    <MenuColumn heading="Featured" items={shopForItems} onNavigate={closeMenus} />
                  </div>

                  {/* Feature tiles */}
                  <div className="w-[40%] min-w-[260px] grid grid-cols-2 gap-3 items-stretch bg-parchment/60 p-4 border-l border-border-cream">
                    {featureTiles.map((tile) => (
                      <Link
                        key={tile.href}
                        href={tile.href}
                        onClick={closeMenus}
                        className="group relative block h-full overflow-hidden no-underline"
                      >
                        <div className="relative h-full min-h-[300px] w-full overflow-hidden bg-warm-sand">
                          <Image
                            src={tile.image}
                            alt={tile.title}
                            fill
                            sizes="(max-width: 1024px) 30vw, 220px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-near-black/55 via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="block font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ivory/80 mb-1">
                            {tile.eyebrow}
                          </span>
                          <span className="block font-serif text-[1.05rem] leading-tight text-ivory">
                            {tile.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Collections — small dropdown */}
          <li
            className="relative"
            onMouseEnter={() => {
              setCollectionsOpen(true);
              setShopOpen(false);
            }}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              className="font-sans text-[0.78rem] tracking-[0.12em] uppercase bg-transparent border-none cursor-pointer flex items-center gap-1.5 text-olive-gray hover:text-near-black transition-colors duration-200"
            >
              Collections
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${collectionsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {collectionsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5">
                <div className="bg-white border border-border-cream shadow-whisper py-4 min-w-[180px]">
                  <ul className="list-none">
                    {collectionsItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenus}
                          className="block font-sans text-[0.85rem] text-near-black no-underline px-6 py-2.5 transition-colors duration-200 hover:bg-parchment hover:text-terracotta"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Account + Cart */}
        <div className="flex items-center gap-5">
          <Link
            href="/search"
            aria-label="Search"
            className="text-olive-gray hover:text-near-black transition-colors duration-200"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:block text-olive-gray hover:text-near-black transition-colors duration-200"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative text-olive-gray hover:text-near-black transition-colors duration-200"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-terracotta text-ivory font-sans text-[0.6rem] font-medium leading-none">
                {count}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-[22px] h-[2px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-[22px] h-[2px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-cream bg-parchment px-6 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-near-black font-medium mb-2">
            Shop By
          </div>
          {shopByItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-sans text-sm text-olive-gray no-underline hover:text-near-black pl-3"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-near-black font-medium mb-2 pt-3">
            Activities
          </div>
          {activityItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-sans text-sm text-olive-gray no-underline hover:text-near-black pl-3"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-near-black font-medium mb-2 pt-3">
            Featured
          </div>
          {shopForItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-sans text-sm text-olive-gray no-underline hover:text-near-black pl-3"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border-cream pt-3 mt-3 font-sans text-[0.78rem] tracking-[0.12em] uppercase text-near-black font-medium mb-2">
            Collections
          </div>
          {collectionsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-sans text-sm text-olive-gray no-underline hover:text-near-black pl-3"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
