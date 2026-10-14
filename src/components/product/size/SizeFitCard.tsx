"use client";

import { MEASUREMENTS, formatRange, getRow, type Unit } from "@/lib/size-chart";
import UnitToggle from "@/components/product/size/UnitToggle";

interface SizeFitCardProps {
  size: string | null;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
  stock?: Record<string, number>;
  /** e.g. "Model is 176cm and wears a size S." */
  modelInfo?: string;
  /** e.g. "Cropped, body-skimming fit. Size up for a relaxed feel." */
  fitNote?: string;
}

/**
 * Live fit details for the selected size: AU size, bust / waist / hip, stock
 * and the model note. Content swaps in place and is announced politely.
 */
export default function SizeFitCard({ size, unit, onUnitChange, stock, modelInfo, fitNote }: SizeFitCardProps) {
  const row = getRow(size);
  const units = size ? stock?.[size] : undefined;

  return (
    <div className="rounded-card bg-white/60 p-4 ring-1 ring-inset ring-near-black/[0.05]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-stone-gray">Body measurements</p>
        <UnitToggle value={unit} onChange={onUnitChange} />
      </div>

      <div aria-live="polite">
        {row ? (
          <div key={row.size} className="animate-soft-in motion-reduce:animate-none">
            <p className="mb-3 font-serif text-[1.5rem] leading-none text-near-black">
              {row.size}
              <span className="ml-2 font-sans text-[0.9rem] text-olive-gray">AU {row.au}</span>
            </p>

            <dl className="grid grid-cols-3 gap-2">
              {MEASUREMENTS.map(({ key, label }) => (
                <div key={key} className="rounded-[14px] bg-ivory p-3 ring-1 ring-inset ring-near-black/[0.05]">
                  <dt className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-stone-gray">{label}</dt>
                  <dd className="mt-1 font-sans text-[0.95rem] font-medium leading-tight text-near-black">
                    {formatRange(row[key], unit)}
                    <span className="ml-0.5 text-[0.72rem] font-normal text-stone-gray">{unit}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-3 list-none space-y-1 font-sans text-[0.85rem] leading-snug text-olive-gray">
              {units !== undefined && units > 0 && units <= 5 && (
                <li className="text-terracotta">Only {units} left in {row.size}</li>
              )}
              {units === 0 && <li className="text-terracotta">{row.size} is sold out — we can email you when it’s back</li>}
              {modelInfo && <li>{modelInfo}</li>}
              {fitNote && <li>{fitNote}</li>}
            </ul>
          </div>
        ) : (
          <p className="py-2 font-sans text-[0.9rem] text-olive-gray">
            Choose a size to see the bust, waist and hip it fits.
          </p>
        )}
      </div>
    </div>
  );
}
