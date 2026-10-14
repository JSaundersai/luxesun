"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GlassButton from "@/components/ui/GlassButton";
import ScrollEdge from "@/components/ui/ScrollEdge";
import { ArrowLeftIcon, BagIcon, HeartIcon, ShareIcon } from "@/components/ui/icons";
import { useCart } from "@/context/CartProvider";
import { useOverlayTone } from "@/components/layout/useOverlayTone";

interface ProductTopBarProps {
  productName: string;
  saved: boolean;
  onToggleSave: () => void;
  /** Where "back" goes when the PDP was opened directly (no history). */
  fallbackHref: string;
}

/**
 * Floating PDP controls for phones / Fold / tablet (below lg): back on the
 * left; share, wishlist and bag on the right.
 */
export default function ProductTopBar({ productName, saved, onToggleSave, fallbackHref }: ProductTopBarProps) {
  const router = useRouter();
  const { count, openCart } = useCart();
  // The gallery is marked data-nav-overlay; once it scrolls away, fade in the edge.
  const { overHero, overDark, scrolled } = useOverlayTone();
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${productName} — Luxe Sun`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Share sheet dismissed or clipboard blocked — nothing to do. */
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.875rem,env(safe-area-inset-top))] sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))] lg:hidden">
      <ScrollEdge visible={scrolled && !overHero} dark={overDark} />
      <div className="relative flex h-11 items-center justify-between">
        <GlassButton tone="dark" label="Go back" onClick={goBack}>
          <ArrowLeftIcon />
        </GlassButton>

        <div className="flex items-center gap-2">
          <GlassButton tone="dark" label={`Share ${productName}`} onClick={share}>
            <ShareIcon />
          </GlassButton>
          <GlassButton
            tone="dark"
            label={saved ? "Remove from wishlist" : "Save to wishlist"}
            pressed={saved}
            onClick={onToggleSave}
            className={saved ? "text-terracotta" : ""}
          >
            <HeartIcon filled={saved} />
          </GlassButton>
          <GlassButton
            tone="dark"
            label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
            indicator={count > 0}
            onClick={openCart}
          >
            <BagIcon />
          </GlassButton>
        </div>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-near-black px-4 py-2 font-sans text-[0.8rem] text-ivory transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "Link copied" : ""}
      </p>
    </header>
  );
}
