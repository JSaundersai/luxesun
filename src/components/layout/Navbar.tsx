"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Shop Tops", href: "#collections" },
  { label: "All Styles", href: "#products" },
  { label: "Sun Protection", href: "#feature" },
  { label: "Our Story", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md border-b border-border-cream">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[1.8rem] font-medium text-near-black tracking-[0.08em] no-underline"
        >
          Luxe Sun
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 items-center list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[0.94rem] text-olive-gray no-underline transition-colors hover:text-near-black"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#products"
              className="font-sans text-[0.94rem] font-medium text-ivory bg-gold px-5 py-2 rounded-comfortable no-underline transition-colors hover:bg-gold-dark"
            >
              New Arrivals
            </a>
          </li>
        </ul>

        {/* Icons + hamburger */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            aria-label="Search"
            className="text-olive-gray hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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
            className="text-olive-gray hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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
            className="relative text-olive-gray hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              0
            </span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Menu"
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`block w-[22px] h-[2px] bg-near-black rounded transition-transform ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-near-black rounded transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-near-black rounded transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
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
              className="block font-sans text-base text-olive-gray no-underline hover:text-near-black"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#products"
            className="block w-full text-center btn-primary"
            onClick={() => setMobileOpen(false)}
          >
            New Arrivals
          </a>
        </div>
      )}
    </nav>
  );
}
