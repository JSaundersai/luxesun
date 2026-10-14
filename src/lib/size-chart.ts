/**
 * Single source of truth for the Luxe Sun body-measurement chart.
 * Used by the /size-guide page and the PDP size selectors, so they can't drift.
 * All stored values are centimetres; use the helpers to display inches.
 */

export type SizeLabel = "XS" | "S" | "M" | "L" | "XL";
export type Unit = "cm" | "in";
export type Measurement = "bust" | "waist" | "hip";
export type Range = readonly [number, number];

export interface SizeRow {
  size: SizeLabel;
  /** Australian dress size. */
  au: string;
  bust: Range;
  waist: Range;
  hip: Range;
}

export const SIZE_ROWS: readonly SizeRow[] = [
  { size: "XS", au: "6", bust: [78, 82], waist: [60, 64], hip: [86, 90] },
  { size: "S", au: "8", bust: [83, 87], waist: [65, 69], hip: [91, 95] },
  { size: "M", au: "10", bust: [88, 92], waist: [70, 74], hip: [96, 100] },
  { size: "L", au: "12", bust: [93, 97], waist: [75, 79], hip: [101, 105] },
  { size: "XL", au: "14", bust: [98, 103], waist: [80, 85], hip: [106, 111] },
];

export const MEASUREMENTS: { key: Measurement; label: string; hint: string }[] = [
  { key: "bust", label: "Bust", hint: "Around the fullest part of your chest" },
  { key: "waist", label: "Waist", hint: "Around the narrowest part of your waist" },
  { key: "hip", label: "Hip", hint: "Around the fullest part of your hips" },
];

export const getRow = (size: string | null | undefined): SizeRow | undefined =>
  SIZE_ROWS.find((row) => row.size === size);

const CM_PER_INCH = 2.54;

/** One decimal for inches (trailing .0 dropped), whole numbers for cm. */
export function formatValue(cm: number, unit: Unit): string {
  if (unit === "cm") return String(cm);
  return String(Math.round((cm / CM_PER_INCH) * 10) / 10);
}

export function formatRange(range: Range, unit: Unit): string {
  return `${formatValue(range[0], unit)}–${formatValue(range[1], unit)}`;
}

/** Convert a value typed by the shopper (in their unit) to centimetres. */
export function toCm(value: number, unit: Unit): number {
  return unit === "cm" ? value : value * CM_PER_INCH;
}

export interface Recommendation {
  /** The size we suggest — the largest size any measurement points to. */
  size: SizeLabel;
  /** Every size the measurements point to, smallest first. */
  sizes: SizeLabel[];
  /** True when measurements land in different sizes. */
  isBetween: boolean;
  /** True when a measurement sits well outside the chart. */
  outOfRange: boolean;
}

const distanceToRange = (value: number, [lo, hi]: Range) =>
  value < lo ? lo - value : value > hi ? value - hi : 0;

/**
 * Recommend a size from body measurements in centimetres. Missing measurements
 * are ignored. Each measurement maps to its nearest size (ties go larger); the
 * suggestion is the largest of those, which is the standard "size up to your
 * biggest measurement" rule.
 */
export function recommendSize(input: Partial<Record<Measurement, number>>): Recommendation | null {
  const indices: number[] = [];
  let outOfRange = false;

  for (const { key } of MEASUREMENTS) {
    const value = input[key];
    if (value === undefined || !Number.isFinite(value) || value <= 0) continue;

    let best = 0;
    let bestDistance = Infinity;
    SIZE_ROWS.forEach((row, index) => {
      const distance = distanceToRange(value, row[key]);
      // `<=` so an exact tie resolves to the larger size.
      if (distance <= bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    if (bestDistance > 3) outOfRange = true;
    indices.push(best);
  }

  if (indices.length === 0) return null;

  const unique = Array.from(new Set(indices)).sort((a, b) => a - b);
  return {
    size: SIZE_ROWS[unique[unique.length - 1]].size,
    sizes: unique.map((i) => SIZE_ROWS[i].size),
    isBetween: unique.length > 1,
    outOfRange,
  };
}
