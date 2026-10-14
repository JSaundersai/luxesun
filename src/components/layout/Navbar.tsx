"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { useAnalytics } from "@/context/AnalyticsProvider";
import GlassButton from "@/components/ui/GlassButton";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import MobileMenu from "@/components/layout/MobileMenu";
import ScrollEdge from "@/components/ui/ScrollEdge";
import { useOverlayTone } from "@/components/layout/useOverlayTone";
import {
  activityItems,
  collectionMenuItems,
  featureTiles,
  shopByItems,
  shopForItems,
  type MenuItem,
} from "@/components/layout/navData";

type DesktopMenu = "shop-all" | "collection" | "sales";

interface NavbarProps {
  /**
   * Render the floating mobile controls (menu / search / bag). Pages with their
   * own mobile toolbar, like the PDP, turn this off.
   */
  mobileControls?: boolean;
}

function MenuColumn({
  heading,
  items,
  onNavigate,
}: {
  heading: string;
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="mb-5 font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-stone-gray">
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar({ mobileControls = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DesktopMenu | null>(null);
  const { count, openCart } = useCart();
  const { trackView } = useAnalytics();
  const { overHero, overDark, scrolled } = useOverlayTone();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tone = overHero ? "light" : "dark";

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    document.getElementById("mobile-menu-trigger")?.focus();
  }, []);

  const openDesktopMenu = (menu: DesktopMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const handleMenuKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    menu: DesktopMenu,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpenMenu(null);
      event.currentTarget.focus();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpenMenu(menu);
    }
  };

  const menuButtonClass =
    "flex items-center gap-1.5 border-none bg-transparent font-sans text-[0.78rem] uppercase tracking-[0.12em] text-olive-gray transition-colors duration-200 hover:text-near-black";

  const bagLabel = `Bag, ${count} ${count === 1 ? "item" : "items"}`;

  return (
    <>
      {/* ── Mobile + Fold + tablet (below lg): floating frosted controls ── */}
      {mobileControls && (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.875rem,env(safe-area-inset-top))] sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))] lg:hidden">
          <ScrollEdge visible={scrolled && !overHero} dark={overDark} />
          <div className="relative flex h-11 items-center justify-between">
            <div className="flex items-center gap-2">
              <GlassButton
                id="mobile-menu-trigger"
                tone={tone}
                label="Open menu"
                expanded={mobileOpen}
                controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </GlassButton>
              <GlassButton tone={tone} label="Search" href="/search">
                <SearchIcon />
              </GlassButton>
            </div>

            <Link
              href="/"
              aria-hidden={scrolled}
              tabIndex={scrolled ? -1 : undefined}
              className={`absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center font-serif text-[1.35rem] font-medium tracking-[0.14em] no-underline transition-[opacity,color] duration-300 ${
                tone === "light" ? "text-ivory [text-shadow:0_1px_12px_rgba(20,20,19,0.35)]" : "text-near-black"
              } ${scrolled ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}
            >
              Luxe Sun
            </Link>

            <GlassButton tone={tone} label={bagLabel} indicator={count > 0} onClick={openCart}>
              <BagIcon />
            </GlassButton>
          </div>
        </header>
      )}

      <MobileMenu open={mobileOpen} onClose={closeMobileMenu} cartCount={count} onOpenCart={openCart} />

      {/* ── Desktop (lg+): full bar with mega menus ── */}
      <nav
        aria-label="Primary navigation"
        className="fixed left-0 right-0 top-0 z-50 hidden border-b border-border-cream bg-parchment lg:block"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <Link
            href="/"
            onClick={closeMenus}
            className="font-serif text-[1.6rem] font-medium tracking-[0.12em] text-near-black no-underline"
          >
            Luxe Sun
          </Link>

          <ul className="absolute left-1/2 flex -translate-x-1/2 list-none items-center gap-10">
            <li
              className="static"
              onMouseEnter={() => openDesktopMenu("shop-all")}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === "shop-all"}
                aria-controls="shop-all-menu"
                onClick={() => setOpenMenu("shop-all")}
                onKeyDown={(event) => handleMenuKeyDown(event, "shop-all")}
                className={`${menuButtonClass} cursor-pointer`}
              >
                Shop All
                <Chevron open={openMenu === "shop-all"} />
              </button>
            </li>

            <li
              className="static"
              onMouseEnter={() => openDesktopMenu("collection")}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === "collection"}
                aria-controls="collection-menu"
                onClick={() => setOpenMenu("collection")}
                onKeyDown={(event) => handleMenuKeyDown(event, "collection")}
                className={`${menuButtonClass} cursor-pointer`}
              >
                Collection
                <Chevron open={openMenu === "collection"} />
              </button>
            </li>

            <li
              className="static"
              onMouseEnter={() => openDesktopMenu("sales")}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === "sales"}
                aria-controls="sales-menu"
                onClick={() => setOpenMenu("sales")}
                onKeyDown={(event) => handleMenuKeyDown(event, "sales")}
                className={`${menuButtonClass} cursor-pointer`}
              >
                Sales
                <Chevron open={openMenu === "sales"} />
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-5">
            <Link
              href="/search"
              aria-label="Search"
              className="text-olive-gray transition-colors duration-200 hover:text-near-black"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="text-olive-gray transition-colors duration-200 hover:text-near-black"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative text-olive-gray transition-colors duration-200 hover:text-near-black"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracotta px-1 font-sans text-[0.6rem] font-medium leading-none text-ivory">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {openMenu === "shop-all" && (
          <div
            id="shop-all-menu"
            className="absolute left-0 right-0 top-full border-b border-border-cream bg-white shadow-whisper"
            onMouseEnter={() => openDesktopMenu("shop-all")}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className="mx-auto grid min-h-[48vh] max-w-[1400px] grid-cols-12 gap-10 px-6 py-9">
              <div className="col-span-6 grid grid-cols-3 content-start gap-8">
                <MenuColumn heading="Shop By" items={shopByItems} onNavigate={closeMenus} />
                <MenuColumn heading="Activities" items={activityItems} onNavigate={closeMenus} />
                <MenuColumn heading="Shop For" items={shopForItems} onNavigate={closeMenus} />
                <Link
                  href="/collections"
                  onClick={closeMenus}
                  className="col-span-3 mt-3 inline-flex items-center gap-3 border-t border-border-cream pt-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-near-black no-underline transition-colors hover:text-terracotta"
                >
                  Shop the full range
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="col-span-6 grid grid-cols-2 gap-4">
                {featureTiles.map((tile) => (
                  <Link
                    key={tile.href}
                    href={tile.href}
                    onClick={closeMenus}
                    className="group relative block h-full overflow-hidden no-underline"
                  >
                    <div className="relative h-full min-h-[36vh] w-full overflow-hidden bg-warm-sand">
                      <Image
                        src={tile.image}
                        alt={tile.title}
                        fill
                        sizes="40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-near-black/55 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="mb-1.5 block font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ivory/80">
                        {tile.eyebrow}
                      </span>
                      <span className="block font-serif text-[1.5rem] leading-tight text-ivory">
                        {tile.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {openMenu === "collection" && (
          <div
            id="collection-menu"
            className="absolute left-0 right-0 top-full border-b border-border-cream bg-white shadow-whisper"
            onMouseEnter={() => openDesktopMenu("collection")}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-7 px-6 py-5">
              <div className="col-span-8 grid grid-cols-5 gap-2">
                {collectionMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="group flex flex-col border border-border-cream px-3 py-3 font-sans text-near-black no-underline transition-colors duration-200 hover:border-near-black hover:bg-parchment"
                  >
                    <span className="flex items-start justify-between gap-2 text-[0.72rem] font-medium uppercase leading-tight tracking-[0.1em]">
                      <span>{item.label}</span>
                      <span className="shrink-0 text-stone-gray transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </span>
                    <span className="mt-2 font-sans text-[0.68rem] font-normal normal-case leading-snug tracking-normal text-stone-gray">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="col-span-4 border-l border-border-cream pl-6">
                <p className="mb-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-stone-gray">
                  The collection edit
                </p>
                <h2 className="mb-1 font-serif text-[1.5rem] leading-tight text-near-black">
                  Coverage for every kind of day.
                </h2>
                <p className="max-w-[310px] font-sans text-[0.78rem] leading-relaxed text-stone-gray">
                  Explore the newest drops, everyday activewear, easy leisure layers, and limited-time sales.
                </p>
              </div>
            </div>
          </div>
        )}

        {openMenu === "sales" && (
          <div
            id="sales-menu"
            className="absolute left-0 right-0 top-full border-b border-border-cream bg-white shadow-whisper"
            onMouseEnter={() => openDesktopMenu("sales")}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-7">
              <div>
                <p className="mb-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-terracotta">
                  Limited edit
                </p>
                <h2 className="mb-1 font-serif text-[1.7rem] leading-tight text-near-black">
                  Sun protection, marked down.
                </h2>
                <p className="font-sans text-[0.82rem] leading-relaxed text-stone-gray">
                  Shop limited-time markdowns on select sun-protective styles.
                </p>
              </div>
              <Link
                href="/collections/sale"
                onClick={closeMenus}
                className="btn-secondary shrink-0"
              >
                Shop sales
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
