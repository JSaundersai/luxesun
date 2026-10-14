"use client";

import "./glass-lab.css";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import GlassSurface, { MATERIAL_LABELS, type GlassMaterial } from "@/components/lab/GlassSurface";
import PhotoStage from "@/components/lab/PhotoStage";
import { useIsChromium } from "@/components/lab/useIsChromium";
import FindMySizeSheet from "@/components/product/size/FindMySizeSheet";
import GlassSizeSlider from "@/components/product/size/GlassSizeSlider";
import SizeDiagram from "@/components/product/size/SizeDiagram";
import SizeFitCard from "@/components/product/size/SizeFitCard";
import UnitToggle from "@/components/product/size/UnitToggle";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { SIZES } from "@/lib/placeholder-data";
import type { Unit } from "@/lib/size-chart";

/* ─────────────────────────────── shared bits ─────────────────────────────── */

const BACKDROPS = [
  { id: "beach", label: "Beach", src: "/placeholders/hero-sun.jpg" },
  { id: "trail", label: "Trail", src: "/placeholders/cat-longsleeves.jpg" },
  { id: "park", label: "Park", src: "/placeholders/feature-lifestyle.jpg" },
  { id: "warm", label: "Warm", src: "/placeholders/menu-best-seller.jpg" },
] as const;
type BackdropId = (typeof BACKDROPS)[number]["id"];

const MATERIALS: GlassMaterial[] = ["current", "refined", "refraction"];

// Sample product data so the size options show every state.
const DEMO_STOCK: Record<string, number> = { XS: 12, S: 20, M: 3, L: 0, XL: 4 };
const DEMO_MODEL = "Model is 176cm and wears a size S.";
const DEMO_FIT = "Cropped, body-skimming fit with thumbholes. Size up for a relaxed feel.";

function ChipRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar flex gap-2 overflow-x-auto">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          className={`chip ${value === option.id ? "chip-active" : ""}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="mb-5">
      <p className="section-eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-serif text-[2.1rem] font-medium leading-[1.05] text-near-black">{title}</h2>
      <p className="mt-2 max-w-[560px] font-sans text-[0.95rem] leading-relaxed text-olive-gray">{children}</p>
    </header>
  );
}

/* ───────────────────────────── 1 · button materials ───────────────────────── */

function MaterialTile({ material, backdropSrc }: { material: GlassMaterial; backdropSrc: string }) {
  const isChromium = useIsChromium();
  const note =
    material === "current"
      ? "Live on the site today."
      : material === "refined"
        ? "Layered frosted glass: gradient rim, specular sheen, tinted shadow. Identical in every browser."
        : isChromium
          ? "The photo bends at the glass edge. You’re on Chromium, so this is the real effect."
          : "Chromium only. This browser shows the Refined fallback, which is what iPhones get.";

  return (
    <figure>
      <figcaption className="mb-2 px-1">
        <span className="font-sans text-[0.95rem] font-medium text-near-black">{MATERIAL_LABELS[material]}</span>
        <span className="mt-0.5 block font-sans text-[0.82rem] leading-snug text-olive-gray">{note}</span>
      </figcaption>

      <PhotoStage src={backdropSrc} alt="" heightClass="h-[300px]">
        <div className="pointer-events-auto absolute left-3 top-3 flex gap-2">
          <GlassSurface material={material} tone="clear" aria-label="Menu" className="h-11 w-11">
            <MenuIcon />
          </GlassSurface>
          <GlassSurface material={material} tone="clear" aria-label="Search" className="h-11 w-11">
            <SearchIcon />
          </GlassSurface>
        </div>

        <div className="pointer-events-auto absolute right-3 top-3">
          <GlassSurface material={material} tone="ivory" aria-label="Bag" indicator className="h-11 w-11">
            <BagIcon />
          </GlassSurface>
        </div>

        <div className="pointer-events-auto absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
          <GlassSurface material={material} tone="clear" className="h-12 px-5 font-sans text-[0.92rem] font-medium">
            Shop the range
          </GlassSurface>
          <GlassSurface material={material} tone="ink" className="h-12 px-6 font-sans text-[0.92rem] font-medium">
            Add to Cart
          </GlassSurface>
        </div>
      </PhotoStage>
    </figure>
  );
}

/* ─────────────────────────── 2 · shape & motion ───────────────────────────── */

function ShapeDemo({ backdropSrc }: { backdropSrc: string }) {
  const [material, setMaterial] = useState<GlassMaterial>("refined");
  const [saved, setSaved] = useState(false);
  const options = MATERIALS.map((id) => ({ id, label: MATERIAL_LABELS[id] }));

  return (
    <div>
      <div className="mb-3">
        <ChipRow label="Glass material for this demo" options={options} value={material} onChange={setMaterial} />
      </div>

      <PhotoStage src={backdropSrc} alt="" heightClass="h-[460px]">
        {/* Header: grouped capsule + wordmark + bag */}
        <div className="pointer-events-auto absolute inset-x-3 top-3 flex items-center justify-between">
          <GlassSurface as="div" material={material} tone="clear" className="h-11 cursor-default p-0" contentClassName="gap-0">
            <button type="button" aria-label="Menu" className="flex h-11 w-12 items-center justify-center rounded-full transition-colors active:bg-white/20">
              <MenuIcon />
            </button>
            <span aria-hidden="true" className="h-5 w-px bg-white/40" />
            <button type="button" aria-label="Search" className="flex h-11 w-12 items-center justify-center rounded-full transition-colors active:bg-white/20">
              <SearchIcon />
            </button>
          </GlassSurface>

          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-serif text-[1.3rem] font-medium tracking-[0.14em] text-ivory [text-shadow:0_1px_14px_rgba(20,20,19,0.7),0_0_2px_rgba(20,20,19,0.35)]">
            Luxe Sun
          </span>

          <div className="flex gap-2">
            <GlassSurface
              material={material}
              tone="clear"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
              className="h-11 w-11"
            >
              <HeartIcon filled={saved} className={`h-5 w-5 transition-colors ${saved ? "text-terracotta" : ""}`} />
            </GlassSurface>
            <GlassSurface material={material} tone="clear" aria-label="Bag" indicator className="h-11 w-11">
              <BagIcon />
            </GlassSurface>
          </div>
        </div>

        {/* Floating purchase bar */}
        <div className="pointer-events-auto absolute inset-x-3 bottom-3">
          <GlassSurface
            as="div"
            material={material}
            tone="clear"
            className="h-[68px] w-full cursor-default pl-5 pr-2"
            contentClassName="w-full justify-between"
          >
            <div className="text-left">
              <p className="font-sans text-[0.66rem] uppercase tracking-[0.14em] text-white/75">Price</p>
              <p className="font-sans text-[1.3rem] font-medium leading-tight">$88.00</p>
            </div>
            <GlassSurface material={material === "current" ? "current" : "refined"} tone="ink" className="h-[52px] px-8 font-sans text-[1rem] font-medium">
              Add to Cart
            </GlassSurface>
          </GlassSurface>
        </div>
      </PhotoStage>
      <p className="mt-2 px-1 font-sans text-[0.82rem] leading-snug text-olive-gray">
        Menu and search merge into one capsule, the buttons squish when pressed, and Add to Cart floats as a glass bar instead of an edge-to-edge strip.
      </p>
    </div>
  );
}

/* ─────────────────────────────── 3 · size options ─────────────────────────── */

function VariantCard({
  code,
  title,
  blurb,
  tags,
  recommended = false,
  children,
}: {
  code: string;
  title: string;
  blurb: string;
  tags: string[];
  recommended?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`rounded-sheet p-5 ring-1 ring-inset ${recommended ? "bg-ivory ring-near-black" : "bg-ivory ring-near-black/[0.06]"}`}>
      <header className="mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-near-black font-sans text-[0.78rem] font-medium text-ivory">{code}</span>
          <h3 className="font-sans text-[1rem] font-medium text-near-black">{title}</h3>
          {recommended && (
            <span className="ml-auto rounded-full bg-terracotta px-2.5 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ivory">
              My pick
            </span>
          )}
        </div>
        <p className="mt-2 font-sans text-[0.88rem] leading-snug text-olive-gray">{blurb}</p>
        <ul className="mt-2 flex list-none flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full bg-near-black/[0.06] px-2.5 py-1 font-sans text-[0.7rem] text-olive-gray">
              {tag}
            </li>
          ))}
        </ul>
      </header>
      {children}
    </article>
  );
}

/** The pills exactly as they are on the product page today. */
function CurrentPills({ value, onChange }: { value: string | null; onChange: (size: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => {
        const out = DEMO_STOCK[size] === 0;
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            aria-pressed={selected}
            aria-label={out ? `${size}, sold out` : size}
            onClick={() => onChange(size)}
            className={`h-11 min-w-[3.4rem] rounded-full px-4 font-sans text-[0.92rem] transition-colors ${
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
  );
}

function FindMySizeButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn-pill-outline min-h-[48px] w-full">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9.5 14.5 21 21 14.5 9.5 3 3 9.5Z" />
        <path d="m7 9 2 2M10 6l1.5 1.5M10 12l2 2M13 15l1.5 1.5" />
      </svg>
      Not sure? Find my size
    </button>
  );
}

function SizeOptions() {
  const [sizeA, setSizeA] = useState<string | null>(null);
  const [sizeB, setSizeB] = useState<string | null>("S");
  const [sizeC, setSizeC] = useState<string | null>(null);
  const [sizeD, setSizeD] = useState<string | null>("M");
  const [sizeE, setSizeE] = useState<string | null>("S");
  const [unitB, setUnitB] = useState<Unit>("cm");
  const [unitD, setUnitD] = useState<Unit>("cm");
  const [unitE, setUnitE] = useState<Unit>("cm");
  const [sheet, setSheet] = useState<"C" | "E" | null>(null);

  return (
    <div className="space-y-4">
      <VariantCard code="A" title="Current pills" tags={["Live today"]} blurb="Five pills and a link that leaves the page for a separate table.">
        <CurrentPills value={sizeA} onChange={setSizeA} />
      </VariantCard>

      <VariantCard
        code="B"
        title="Glass slider + live fit card"
        tags={["Small effort", "Uses data you have"]}
        blurb="One glass track, a thumb that glides to the chosen size, and a card that shows that size’s bust, waist, hip, stock and the model note."
      >
        <div className="space-y-3">
          <GlassSizeSlider sizes={SIZES} value={sizeB} onChange={setSizeB} stock={DEMO_STOCK} />
          <SizeFitCard size={sizeB} unit={unitB} onUnitChange={setUnitB} stock={DEMO_STOCK} modelInfo={DEMO_MODEL} fitNote={DEMO_FIT} />
        </div>
      </VariantCard>

      <VariantCard
        code="C"
        title="“Find my size” sheet"
        tags={["Medium effort", "Stays on the product page"]}
        blurb="Keep the pills, add a button that opens a glass sheet. Type your measurements for a suggestion, or tap a chart row to pick it."
      >
        <div className="space-y-3">
          <CurrentPills value={sizeC} onChange={setSizeC} />
          <FindMySizeButton onClick={() => setSheet("C")} />
        </div>
      </VariantCard>

      <VariantCard
        code="D"
        title="Measurement diagram (concept)"
        tags={["Needs an illustrator", "Most visual"]}
        blurb="A figure that grows with the size, with bust, waist and hip markers. The silhouette here is a placeholder."
      >
        <div className="space-y-4">
          <GlassSizeSlider sizes={SIZES} value={sizeD} onChange={setSizeD} stock={DEMO_STOCK} />
          <div className="flex justify-end">
            <UnitToggle value={unitD} onChange={setUnitD} />
          </div>
          <SizeDiagram size={sizeD} unit={unitD} />
        </div>
      </VariantCard>

      <VariantCard
        code="E"
        title="Slider + fit card + Find my size"
        tags={["B and C together", "Recommended"]}
        recommended
        blurb="Quick for people who know their size, with the fit card for the curious and the sheet for anyone unsure."
      >
        <div className="space-y-3">
          <GlassSizeSlider sizes={SIZES} value={sizeE} onChange={setSizeE} stock={DEMO_STOCK} />
          <SizeFitCard size={sizeE} unit={unitE} onUnitChange={setUnitE} stock={DEMO_STOCK} modelInfo={DEMO_MODEL} fitNote={DEMO_FIT} />
          <FindMySizeButton onClick={() => setSheet("E")} />
        </div>
      </VariantCard>

      <FindMySizeSheet
        open={sheet !== null}
        onClose={() => setSheet(null)}
        value={sheet === "C" ? sizeC : sizeE}
        onSelect={(size) => (sheet === "C" ? setSizeC(size) : setSizeE(size))}
        stock={DEMO_STOCK}
      />
    </div>
  );
}

/* ───────────────────────────────── page ───────────────────────────────────── */

export default function GlassLabPage() {
  const isChromium = useIsChromium();
  const [backdrop, setBackdrop] = useState<BackdropId>("beach");
  const [viewport, setViewport] = useState<string>("");
  const backdropSrc = BACKDROPS.find((b) => b.id === backdrop)!.src;

  useEffect(() => {
    const measure = () => setViewport(`${window.innerWidth} × ${window.innerHeight}`);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main className="min-h-[100svh] bg-parchment pb-[calc(env(safe-area-inset-bottom)+4rem)]">
      <div className="mx-auto max-w-[760px] px-5 pt-[calc(env(safe-area-inset-top)+1.25rem)] sm:px-8">
        <Link href="/" className="font-serif text-[1.3rem] font-medium tracking-[0.14em] text-near-black no-underline">
          Luxe Sun
        </Link>
        <h1 className="mt-5 font-serif text-[2.8rem] font-medium leading-[1] text-near-black">Glass lab</h1>
        <p className="mt-3 max-w-[560px] font-sans text-[1rem] leading-relaxed text-olive-gray">
          Swipe any photo sideways to slide it under the glass. Everything below is live and uses your real size chart.
        </p>
        <dl className="mt-4 flex flex-wrap gap-2 font-sans text-[0.78rem]">
          <div className="rounded-full bg-white px-3 py-1.5 ring-1 ring-inset ring-near-black/[0.06]">
            <dt className="inline text-stone-gray">Viewport </dt>
            <dd className="inline font-medium text-near-black">{viewport || "…"}</dd>
          </div>
          <div className="rounded-full bg-white px-3 py-1.5 ring-1 ring-inset ring-near-black/[0.06]">
            <dt className="inline text-stone-gray">Refraction </dt>
            <dd className="inline font-medium text-near-black">{isChromium ? "on (Chromium)" : "falls back to Refined"}</dd>
          </div>
        </dl>
      </div>

      {/* Photo switcher stays in reach while you scroll */}
      <div className="sticky top-0 z-30 mt-5 border-y border-near-black/[0.06] bg-parchment/85 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[760px] items-center gap-3 px-5 sm:px-8">
          <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-stone-gray">Photo</span>
          <ChipRow label="Photo behind the glass" options={BACKDROPS} value={backdrop} onChange={setBackdrop} />
        </div>
      </div>

      <div className="mx-auto max-w-[760px] space-y-14 px-5 pt-8 sm:px-8">
        <section aria-labelledby="materials-heading">
          <SectionHeading eyebrow="1 · Button material" title="Three kinds of glass">
            The same buttons in three materials. Try each photo, especially Trail (dark) and Beach (bright), and slide the photo under the controls.
          </SectionHeading>
          <h3 id="materials-heading" className="sr-only">
            Button materials
          </h3>
          <div className="space-y-6">
            {MATERIALS.map((material) => (
              <MaterialTile key={material} material={material} backdropSrc={backdropSrc} />
            ))}
          </div>
        </section>

        <section aria-labelledby="shape-heading">
          <SectionHeading eyebrow="2 · Shape and motion" title="Capsules and a floating bar">
            Works with any material above. Press and hold a button to feel the squish.
          </SectionHeading>
          <h3 id="shape-heading" className="sr-only">
            Shape and motion
          </h3>
          <ShapeDemo backdropSrc={backdropSrc} />
        </section>

        <section aria-labelledby="size-heading">
          <SectionHeading eyebrow="3 · Size selection" title="Beyond five buttons">
            Five ways to choose a size. Each one is interactive and uses sample stock: M is low, L is sold out.
          </SectionHeading>
          <h3 id="size-heading" className="sr-only">
            Size selection options
          </h3>
          <SizeOptions />
        </section>
      </div>
    </main>
  );
}
