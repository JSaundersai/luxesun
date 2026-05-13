"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const shopByItems = [
  { label: "Crop Tops", href: "/collections/active?filter=crop-tops" },
  { label: "Tops", href: "/collections/active?filter=tops" },
  { label: "Sleeves", href: "/collections/active?filter=sleeves" },
  { label: "Shoulder Wraps", href: "/collections/active?filter=shoulder-wraps" },
  { label: "UV Hoodies", href: "/collections/active?filter=uv-hoodies" },
  { label: "Accessories", href: "/collections/active?filter=accessories" },
];

const genderItems = [
  { label: "Women's", href: "/collections/athletic?gender=womens" },
  { label: "Men's", href: "/collections/athletic?gender=mens" },
];

const activityItems = [
  { label: "Beach", href: "/collections/active?activity=beach" },
  { label: "Beach Volleyball", href: "/collections/active?activity=beach-volleyball" },
  { label: "Golf", href: "/collections/active?activity=golf" },
  { label: "Running", href: "/collections/active?activity=running" },
  { label: "Equestrian", href: "/collections/active?activity=equestrian" },
  { label: "Racket Sports", href: "/collections/active?activity=racket-sports" },
];

interface NavbarProps {
  initialScrolled?: boolean;
}

export default function Navbar({ initialScrolled = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(initialScrolled);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const useDarkText = scrolled || initialScrolled || shopOpen;

  const textColor = useDarkText
    ? "text-olive-gray hover:text-near-black"
    : "text-ivory/80 hover:text-ivory";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useDarkText
          ? "bg-parchment/95 backdrop-blur-md border-b border-border-cream"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-[1.6rem] font-medium tracking-[0.12em] no-underline transition-colors duration-500 ${
            useDarkText ? "text-near-black" : "text-ivory"
          }`}
        >
          Luxe Sun
        </Link>

        <ul className="hidden md:flex gap-10 items-center list-none absolute left-1/2 -translate-x-1/2">
          {/* Shop — mega menu trigger */}
          <li
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className={`font-sans text-[0.78rem] tracking-[0.12em] uppercase bg-transparent border-none cursor-pointer transition-colors duration-500 flex items-center gap-1.5 ${textColor}`}
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

            {shopOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5">
                <div className="bg-parchment border border-border-cream shadow-whisper px-10 py-8 min-w-[480px]">
                  <div className="flex gap-12">
                    <div>
                      <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-4">
                        Shop By
                      </div>
                      <ul className="list-none space-y-3">
                        {shopByItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="font-sans text-[0.82rem] text-near-black no-underline transition-colors duration-300 hover:text-terracotta"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-4">
                        Activities
                      </div>
                      <ul className="list-none space-y-3">
                        {activityItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="font-sans text-[0.82rem] text-near-black no-underline transition-colors duration-300 hover:text-terracotta"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-stone-gray mb-4">
                        For
                      </div>
                      <ul className="list-none space-y-3">
                        {genderItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="font-sans text-[0.82rem] text-near-black no-underline transition-colors duration-300 hover:text-terracotta"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/#products"
              className={`font-sans text-[0.78rem] tracking-[0.12em] uppercase no-underline transition-colors duration-500 ${textColor}`}
            >
              Collections
            </Link>
          </li>
          <li>
            <a
              href="/#feature"
              className={`font-sans text-[0.78rem] tracking-[0.12em] uppercase no-underline transition-colors duration-500 ${textColor}`}
            >
              About
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className={`transition-colors duration-500 bg-transparent border-none cursor-pointer ${textColor}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            aria-label="Account"
            className={`hidden sm:block transition-colors duration-500 bg-transparent border-none cursor-pointer ${textColor}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <button
            aria-label="Cart"
            className={`relative transition-colors duration-500 bg-transparent border-none cursor-pointer ${textColor}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>

          <button
            aria-label="Menu"
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                useDarkText ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                useDarkText ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                useDarkText ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-cream bg-parchment px-6 py-6 space-y-3">
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
            For
          </div>
          {genderItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-sans text-sm text-olive-gray no-underline hover:text-near-black pl-3"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border-cream pt-3 mt-3">
            <Link
              href="/#products"
              className="block font-sans text-sm tracking-[0.08em] uppercase text-olive-gray no-underline hover:text-near-black"
              onClick={() => setMobileOpen(false)}
            >
              Collections
            </Link>
          </div>
          <div>
            <a
              href="/#feature"
              className="block font-sans text-sm tracking-[0.08em] uppercase text-olive-gray no-underline hover:text-near-black"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
