"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
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
  { label: "Sales", href: "/collections/sale" },
];

const collectionMenuItems = [
  {
    label: "New Arrivals",
    description: "Fresh from the studio",
    href: "/collections/new-arrivals",
  },
  {
    label: "Best Sellers",
    description: "Most-loved sun layers",
    href: "/collections/bestsellers",
  },
  {
    label: "Activewear",
    description: "Made to move outside",
    href: "/collections/activewear",
  },
  {
    label: "Leisurewear",
    description: "Easy off-court comfort",
    href: "/collections/leisurewear",
  },
  {
    label: "Sales",
    description: "Last chance, less",
    href: "/collections/sale",
  },
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

type MenuItem = { label: string; href: string };
type DesktopMenu = "shop-all" | "collection" | "sales";

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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DesktopMenu | null>(null);
  const { count, openCart } = useCart();
  const { trackView } = useAnalytics();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed left-0 right-0 top-0 z-50 border-b border-border-cream bg-parchment"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={closeMenus}
          className="font-serif text-[1.6rem] font-medium tracking-[0.12em] text-near-black no-underline"
        >
          Luxe Sun
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 list-none items-center gap-10 md:flex">
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
            className="hidden text-olive-gray transition-colors duration-200 hover:text-near-black sm:block"
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

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={`block h-[2px] w-[22px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-[22px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-[22px] rounded bg-near-black transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {openMenu === "shop-all" && (
        <div
          id="shop-all-menu"
          className="absolute left-0 right-0 top-full hidden border-b border-border-cream bg-white shadow-whisper md:block"
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
                      sizes="(max-width: 1024px) 40vw, 40vw"
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
          className="absolute left-0 right-0 top-full hidden border-b border-border-cream bg-white shadow-whisper md:block"
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
          className="absolute left-0 right-0 top-full hidden border-b border-border-cream bg-white shadow-whisper md:block"
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

      {mobileOpen && (
        <div
          id="mobile-menu"
          aria-label="Mobile menu"
          className="max-h-[80vh] space-y-3 overflow-y-auto border-t border-border-cream bg-parchment px-6 py-6 md:hidden"
        >
          <div className="mb-3 border-b border-border-cream pb-3 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-near-black">
            Shop All
          </div>

          <div className="mb-2 pt-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone-gray">
            Shop By
          </div>
          {shopByItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="block pl-3 font-sans text-sm text-olive-gray no-underline transition-colors hover:text-near-black"
            >
              {item.label}
            </Link>
          ))}

          <div className="mb-2 pt-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone-gray">
            Activities
          </div>
          {activityItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="block pl-3 font-sans text-sm text-olive-gray no-underline transition-colors hover:text-near-black"
            >
              {item.label}
            </Link>
          ))}

          <div className="mb-2 pt-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone-gray">
            Shop For
          </div>
          {shopForItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="block pl-3 font-sans text-sm text-olive-gray no-underline transition-colors hover:text-near-black"
            >
              {item.label}
            </Link>
          ))}

          <div className="mb-2 mt-5 border-t border-border-cream pt-5 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-near-black">
            Collection
          </div>
          {collectionMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="block pl-3 font-sans text-sm text-olive-gray no-underline transition-colors hover:text-near-black"
            >
              {item.label}
            </Link>
          ))}

          <div className="mb-2 mt-5 border-t border-border-cream pt-5 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-near-black">
            Sales
          </div>
          <p className="pl-3 font-sans text-sm leading-relaxed text-stone-gray">
            Limited-time markdowns on select sun-protective styles.
          </p>
          <Link
            href="/collections/sale"
            onClick={closeMenus}
            className="block pl-3 pt-1 font-sans text-sm font-medium text-terracotta no-underline"
          >
            Shop sales →
          </Link>
        </div>
      )}
    </nav>
  );
}
