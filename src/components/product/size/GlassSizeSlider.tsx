"use client";

import { useId } from "react";

interface GlassSizeSliderProps {
  sizes: readonly string[];
  value: string | null;
  onChange: (size: string) => void;
  /** On-hand units per size; 0 renders as sold out. */
  stock?: Record<string, number>;
  className?: string;
}

/**
 * Size picker as a single glass track with a thumb that glides to the chosen
 * size. Built on native radio inputs, so arrow keys, screen readers and form
 * semantics come for free.
 */
export default function GlassSizeSlider({ sizes, value, onChange, stock, className = "" }: GlassSizeSliderProps) {
  const name = useId();
  const count = sizes.length;
  const selectedIndex = value === null ? -1 : sizes.indexOf(value);

  return (
    <div
      role="radiogroup"
      aria-label="Size"
      className={`relative grid h-[54px] rounded-full bg-white/55 p-1 shadow-[inset_0_1px_3px_rgba(20,20,19,0.07),0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-inset ring-near-black/[0.06] backdrop-blur-xl ${className}`}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {/* Thumb — one cell wide, moved by whole multiples of its own width. */}
      {selectedIndex >= 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-gradient-to-b from-dark-surface to-near-black shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_18px_-4px_rgba(20,20,19,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none"
          style={{
            width: `calc((100% - 0.5rem) / ${count})`,
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
      )}

      {sizes.map((size, index) => {
        const units = stock?.[size];
        const soldOut = units === 0;
        const selected = index === selectedIndex;

        return (
          <label key={size} className="relative z-10 flex cursor-pointer items-center justify-center">
            <input
              type="radio"
              name={name}
              value={size}
              checked={selected}
              onChange={() => onChange(size)}
              className="peer sr-only"
            />
            <span
              className={`flex h-full w-full items-center justify-center rounded-full font-sans text-[0.98rem] transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-parchment ${
                selected
                  ? "font-medium text-ivory"
                  : soldOut
                    ? "text-stone-gray/60 line-through"
                    : "text-near-black"
              }`}
            >
              {size}
              {soldOut && <span className="sr-only"> (sold out)</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
