"use client";

import { MEASUREMENTS, SIZE_ROWS, formatRange, getRow, type Unit } from "@/lib/size-chart";

interface SizeDiagramProps {
  size: string | null;
  unit: Unit;
}

/** Horizontal scale of the silhouette per size, so the figure visibly grows. */
const SCALE: Record<string, number> = { XS: 0.9, S: 0.95, M: 1, L: 1.05, XL: 1.1 };

// Marker height (y in the 200×300 viewBox) for each measurement.
const MARKER_Y = { bust: 112, waist: 168, hip: 222 } as const;
const MARKER_HALF_WIDTH = { bust: 58, waist: 44, hip: 60 } as const;

/**
 * Concept: a line-art torso with bust / waist / hip markers that follow the
 * selected size. A placeholder silhouette — a real illustration would replace it.
 */
export default function SizeDiagram({ size, unit }: SizeDiagramProps) {
  const row = getRow(size);
  const scale = (size && SCALE[size]) || 1;

  return (
    <div className="grid grid-cols-[minmax(0,9.5rem)_1fr] items-center gap-5">
      <svg viewBox="0 0 200 300" role="img" aria-label={row ? `Body diagram for size ${row.size}` : "Body diagram"} className="w-full">
        <g
          style={{
            transformOrigin: "100px 150px",
            transform: `scaleX(${scale})`,
            transition: "transform 500ms cubic-bezier(0.34, 1.4, 0.64, 1)",
          }}
        >
          <circle cx="100" cy="34" r="17" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" />
          <path
            d="M100 56 C88 56 80 61 68 70 C54 78 50 92 51 108 C53 132 62 148 63 168 C63 190 49 206 47 232 C46 252 53 268 57 288 L143 288 C147 268 154 252 153 232 C151 206 137 190 137 168 C138 148 147 132 149 108 C150 92 146 78 132 70 C120 61 112 56 100 56 Z"
            fill="#faf9f5"
            stroke="#141413"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>

        {MEASUREMENTS.map(({ key, label }) => {
          const y = MARKER_Y[key];
          const half = MARKER_HALF_WIDTH[key] * scale;
          return (
            <g key={key} style={{ transition: "opacity 300ms" }} opacity={row ? 1 : 0.35}>
              <line x1={100 - half} x2={100 + half} y1={y} y2={y} stroke="#c96442" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx={100 - half} cy={y} r="3.5" fill="#c96442" />
              <circle cx={100 + half} cy={y} r="3.5" fill="#c96442" />
              <title>{label}</title>
            </g>
          );
        })}
      </svg>

      <div>
        <p className="font-serif text-[2rem] leading-none text-near-black">{row ? row.size : "—"}</p>
        <p className="mt-1 font-sans text-[0.85rem] text-olive-gray">{row ? `AU ${row.au}` : `${SIZE_ROWS.length} sizes`}</p>
        <dl className="mt-4 space-y-2.5">
          {MEASUREMENTS.map(({ key, label }) => (
            <div key={key} className="flex items-baseline justify-between gap-3 border-b border-near-black/[0.07] pb-2">
              <dt className="flex items-center gap-2 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-stone-gray">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {label}
              </dt>
              <dd className="font-sans text-[0.95rem] font-medium text-near-black">
                {row ? formatRange(row[key], unit) : "—"}
                <span className="ml-0.5 text-[0.72rem] font-normal text-stone-gray">{unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
