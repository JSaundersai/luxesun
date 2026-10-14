"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GlassButton from "@/components/ui/GlassButton";
import { ArrowRightIcon, BagIcon, ChevronDownIcon, CloseIcon, HeartIcon, UserIcon } from "@/components/ui/icons";
import {
  featureTiles,
  mobileMenuGroups,
  mobilePrimaryLinks,
  mobileUtilityLinks,
} from "@/components/layout/navData";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

/**
 * Full-screen mobile menu sheet (below lg). Large serif primary links, a
 * swipeable rail of feature tiles, and chip-style accordion groups.
 */
export default function MobileMenu({ open, onClose, cartCount, onOpenCart }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, move focus into the sheet and close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // Staggered entrance for the primary links.
  const reveal = (index: number) => ({
    className: `transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    }`,
    style: { transitionDelay: open ? `${90 + index * 45}ms` : "0ms" },
  });
  const tilesMotion = reveal(mobilePrimaryLinks.length);

  return (
    <div
      id="mobile-menu"
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      tabIndex={-1}
      className={`fixed inset-0 z-[55] flex flex-col bg-parchment outline-none transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Top row mirrors the floating controls so the close button sits under the thumb. */}
      <div className="pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.875rem,env(safe-area-inset-top))] sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))]">
        <div className="relative flex h-11 items-center justify-between">
          <GlassButton tone="dark" label="Close menu" onClick={onClose}>
            <CloseIcon />
          </GlassButton>
          <Link
            href="/"
            onClick={onClose}
            className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center font-serif text-[1.35rem] font-medium tracking-[0.14em] text-near-black no-underline"
          >
            Luxe Sun
          </Link>
          <GlassButton
            tone="dark"
            label={`Bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            indicator={cartCount > 0}
            onClick={() => {
              onClose();
              onOpenCart();
            }}
          >
            <BagIcon />
          </GlassButton>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-8 sm:px-8">
        <nav aria-label="Mobile primary">
          <ul className="list-none">
            {mobilePrimaryLinks.map((item, i) => {
              const motion = reveal(i);
              return (
                <li key={item.href} className={motion.className} style={motion.style}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-near-black/[0.07] py-3 font-serif text-[2.35rem] font-medium leading-[1.15] text-near-black no-underline sm:text-[2.75rem]"
                  >
                    {item.label}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-near-black ring-1 ring-inset ring-near-black/[0.06] transition-transform duration-300 group-active:translate-x-1">
                      <ArrowRightIcon />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Feature tiles */}
        <div
          style={tilesMotion.style}
          className={`${tilesMotion.className} no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8`}
        >
          {featureTiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              onClick={onClose}
              className="relative block aspect-[4/5] w-[64%] shrink-0 snap-start overflow-hidden rounded-card bg-warm-sand no-underline sm:w-[42%]"
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 639px) 64vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-near-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="mb-1 block font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ivory/80">
                  {tile.eyebrow}
                </span>
                <span className="block font-serif text-[1.45rem] leading-tight text-ivory">{tile.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Accordion groups — sub-links render as chips */}
        <div className="mt-6">
          {mobileMenuGroups.map((group) => (
            <details key={group.heading} className="group border-b border-near-black/[0.07]">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-sans text-[1rem] font-medium text-near-black [&::-webkit-details-marker]:hidden">
                {group.heading}
                <ChevronDownIcon className="h-4 w-4 text-stone-gray transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="flex flex-wrap gap-2 pb-5">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onClose} className="chip no-underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Account shortcuts */}
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 rounded-card bg-white px-4 py-4 font-sans text-[0.92rem] font-medium text-near-black no-underline ring-1 ring-inset ring-near-black/[0.05]"
          >
            <UserIcon className="h-5 w-5 text-olive-gray" />
            Account
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 rounded-card bg-white px-4 py-4 font-sans text-[0.92rem] font-medium text-near-black no-underline ring-1 ring-inset ring-near-black/[0.05]"
          >
            <HeartIcon className="h-5 w-5 text-olive-gray" />
            Wishlist
          </Link>
        </div>

        <ul className="mt-6 flex list-none flex-wrap gap-x-5 gap-y-2">
          {mobileUtilityLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center font-sans text-[0.88rem] text-olive-gray no-underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
