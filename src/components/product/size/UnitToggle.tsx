"use client";

import type { Unit } from "@/lib/size-chart";

interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

const UNITS: Unit[] = ["cm", "in"];

/** Compact cm / in switch. */
export default function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div role="group" aria-label="Measurement unit" className="inline-flex rounded-full bg-near-black/[0.06] p-0.5">
      {UNITS.map((unit) => (
        <button
          key={unit}
          type="button"
          aria-pressed={value === unit}
          onClick={() => onChange(unit)}
          className={`min-h-[32px] min-w-[44px] rounded-full px-3 font-sans text-[0.8rem] transition-colors duration-200 ${
            value === unit ? "bg-near-black font-medium text-ivory" : "text-olive-gray"
          }`}
        >
          {unit}
        </button>
      ))}
    </div>
  );
}
