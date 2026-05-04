"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Shop", href: "#collections" },
  { label: "Collections", href: "#products" },
  { label: "About", href: "#feature" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-md border-b border-border-cream"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-[1.6rem] font-medium tracking-[0.12em] no-underline transition-colors duration-500 ${
            scrolled ? "text-near-black" : "text-ivory"
          }`}
        >
          Luxe Sun
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-10 items-center list-none absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-sans text-[0.78rem] tracking-[0.12em] uppercase no-underline transition-colors duration-500 hover:opacity-70 ${
                  scrolled ? "text-olive-gray hover:text-near-black" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons + hamburger */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            aria-label="Search"
            className={`transition-colors duration-500 bg-transparent border-none cursor-pointer ${
              scrolled ? "text-olive-gray hover:text-near-black" : "text-ivory/80 hover:text-ivory"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Account */}
          <button
            aria-label="Account"
            className={`hidden sm:block transition-colors duration-500 bg-transparent border-none cursor-pointer ${
              scrolled ? "text-olive-gray hover:text-near-black" : "text-ivory/80 hover:text-ivory"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart */}
          <button
            aria-label="Cart"
            className={`relative transition-colors duration-500 bg-transparent border-none cursor-pointer ${
              scrolled ? "text-olive-gray hover:text-near-black" : "text-ivory/80 hover:text-ivory"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Menu"
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                scrolled ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                scrolled ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] rounded transition-all duration-300 ${
                scrolled ? "bg-near-black" : "bg-ivory"
              } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-cream bg-parchment px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-sans text-sm tracking-[0.08em] uppercase text-olive-gray no-underline hover:text-near-black"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
