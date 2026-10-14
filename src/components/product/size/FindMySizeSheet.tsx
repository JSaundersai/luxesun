"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import UnitToggle from "@/components/product/size/UnitToggle";
import {
  MEASUREMENTS,
  SIZE_ROWS,
  formatRange,
  recommendSize,
  toCm,
  type Measurement,
  type Unit,
} from "@/lib/size-chart";

interface FindMySizeSheetProps {
  open: boolean;
  onClose: () => void;
  /** Currently selected size, highlighted in the chart. */
  value: string | null;
  onSelect: (size: string) => void;
  stock?: Record<string, number>;
}

const EXIT_MS = 260;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

/**
 * Bottom sheet that keeps the shopper on the product page: type your
 * measurements for a suggested size, or tap any row of the chart to pick it.
 */
export default function FindMySizeSheet({ open, onClose, value, onSelect, stock }: FindMySizeSheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [entered, setEntered] = useState(false);
  const [unit, setUnit] = useState<Unit>("cm");
  const [inputs, setInputs] = useState<Record<Measurement, string>>({ bust: "", waist: "", hip: "" });

  const recommendation = useMemo(() => {
    const parsed: Partial<Record<Measurement, number>> = {};
    for (const { key } of MEASUREMENTS) {
      const number = parseFloat(inputs[key]);
      if (Number.isFinite(number) && number > 0) parsed[key] = toCm(number, unit);
    }
    return recommendSize(parsed);
  }, [inputs, unit]);

  const requestClose = () => {
    setEntered(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(onClose, EXIT_MS);
  };

  const choose = (size: string) => {
    onSelect(size);
    requestClose();
  };

  // Enter animation, scroll lock, focus handling.
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setEntered(true));
    panelRef.current?.focus();

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      trigger?.focus?.();
    };
  }, [open]);

  // Escape closes; Tab stays inside the sheet.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // requestClose only touches refs/state setters and the latest onClose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  if (!open) return null;

  const setInput = (key: Measurement, next: string) =>
    setInputs((prev) => ({ ...prev, [key]: next.replace(/[^0-9.,]/g, "").replace(",", ".") }));

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close size finder"
        tabIndex={-1}
        onClick={requestClose}
        className={`absolute inset-0 h-full w-full rounded-none bg-near-black/45 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[90svh] w-full max-w-[560px] flex-col rounded-t-sheet bg-parchment/85 shadow-sheet outline-none backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-[260ms] ease-out motion-reduce:transition-none ${
          entered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-near-black/20" aria-hidden="true" />

        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-3 sm:px-7">
          <h2 id={titleId} className="font-serif text-[1.75rem] font-medium leading-none text-near-black">
            Find your size
          </h2>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-near-black/[0.06] text-near-black transition-transform active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:px-7">
          {/* Measurements → suggestion */}
          <section aria-label="Your measurements">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-sans text-[0.95rem] text-olive-gray">Add one or more measurements.</p>
              <UnitToggle value={unit} onChange={setUnit} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {MEASUREMENTS.map(({ key, label, hint }) => (
                <label key={key} className="block">
                  <span className="mb-1 block font-sans text-[0.72rem] uppercase tracking-[0.14em] text-stone-gray">{label}</span>
                  <span className="relative block">
                    <input
                      type="text"
                      inputMode="decimal"
                      enterKeyHint="done"
                      autoComplete="off"
                      aria-describedby={`${titleId}-${key}`}
                      value={inputs[key]}
                      onChange={(event) => setInput(key, event.target.value)}
                      placeholder="—"
                      className="h-12 w-full rounded-[14px] border-0 bg-white pl-3 pr-9 font-sans text-[1rem] text-near-black ring-1 ring-inset ring-near-black/[0.08] placeholder:text-stone-gray focus:outline-none focus:ring-2 focus:ring-near-black"
                    />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-sans text-[0.75rem] text-stone-gray">
                      {unit}
                    </span>
                  </span>
                  <span id={`${titleId}-${key}`} className="sr-only">
                    {hint}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 font-sans text-[0.78rem] leading-snug text-stone-gray">
              Bust: fullest part of your chest · Waist: narrowest point · Hip: fullest part of your hips.
            </p>

            <div aria-live="polite" className="mt-4">
              {recommendation ? (
                <div className="animate-soft-in rounded-card bg-near-black p-4 text-ivory motion-reduce:animate-none">
                  <p className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-warm-silver">We suggest</p>
                  <p className="mt-1 font-serif text-[2.4rem] leading-none">{recommendation.size}</p>
                  <p className="mt-2 font-sans text-[0.88rem] leading-snug text-warm-silver">
                    {recommendation.outOfRange
                      ? "One of your measurements is outside our standard range — message us and we’ll help you find a fit."
                      : recommendation.isBetween
                        ? `Your measurements sit between ${recommendation.sizes.join(" and ")}. Our fabric has four-way stretch: take ${recommendation.sizes[0]} for a compressive fit, ${recommendation.size} for a relaxed one.`
                        : "Matches your measurements. Our fabric has four-way stretch, so it moves with you."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recommendation.sizes
                      .slice()
                      .reverse()
                      .map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => choose(size)}
                          className={`min-h-[44px] rounded-full px-5 font-sans text-[0.92rem] font-medium transition-transform active:scale-95 ${
                            size === recommendation.size ? "bg-ivory text-near-black" : "bg-white/10 text-ivory ring-1 ring-inset ring-white/25"
                          }`}
                        >
                          Select {size}
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                <p className="rounded-card bg-white/60 px-4 py-3 font-sans text-[0.88rem] text-olive-gray ring-1 ring-inset ring-near-black/[0.05]">
                  Your suggested size appears here.
                </p>
              )}
            </div>
          </section>

          {/* Full chart — every row is a button */}
          <section aria-label="Size chart" className="mt-6">
            <h3 className="mb-2 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-stone-gray">Or pick from the chart</h3>
            <div className="mb-1 grid grid-cols-[2.6rem_2.2rem_1fr_1fr_1fr] gap-x-2 px-3 font-sans text-[0.68rem] uppercase tracking-[0.12em] text-stone-gray" aria-hidden="true">
              <span>Size</span>
              <span>AU</span>
              <span>Bust</span>
              <span>Waist</span>
              <span>Hip</span>
            </div>
            <ul className="list-none space-y-1.5">
              {SIZE_ROWS.map((row) => {
                const selected = value === row.size;
                const suggested = recommendation?.size === row.size;
                const soldOut = stock?.[row.size] === 0;
                return (
                  <li key={row.size}>
                    <button
                      type="button"
                      onClick={() => choose(row.size)}
                      aria-pressed={selected}
                      className={`grid min-h-[52px] w-full grid-cols-[2.6rem_2.2rem_1fr_1fr_1fr] items-center gap-x-2 rounded-[14px] px-3 text-left font-sans text-[0.85rem] transition-colors duration-200 ${
                        selected
                          ? "bg-near-black text-ivory"
                          : suggested
                            ? "bg-white text-near-black ring-2 ring-near-black"
                            : "bg-white/70 text-olive-gray ring-1 ring-inset ring-near-black/[0.06]"
                      }`}
                    >
                      <span className={`font-serif text-[1.3rem] leading-none ${selected ? "text-ivory" : "text-near-black"} ${soldOut ? "line-through opacity-60" : ""}`}>
                        {row.size}
                        {soldOut && <span className="sr-only"> (sold out)</span>}
                      </span>
                      <span>{row.au}</span>
                      <span>{formatRange(row.bust, unit)}</span>
                      <span>{formatRange(row.waist, unit)}</span>
                      <span>{formatRange(row.hip, unit)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 font-sans text-[0.8rem] leading-snug text-stone-gray">
              Body measurements, not garment measurements. Between sizes? Take your usual size for a compressive fit, or size up for a relaxed one.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
