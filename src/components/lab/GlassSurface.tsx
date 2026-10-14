"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import RefractionLayer from "@/components/lab/RefractionLayer";
import { useIsChromium } from "@/components/lab/useIsChromium";

export type GlassMaterial = "current" | "refined" | "refraction";
export type GlassTone = "clear" | "ivory" | "ink";

interface GlassSurfaceProps extends HTMLAttributes<HTMLElement> {
  material: GlassMaterial;
  tone?: GlassTone;
  /** Render as a button (default) or a plain container for bars and groups. */
  as?: "button" | "div";
  /** Small dot in the corner (e.g. items in the bag). */
  indicator?: boolean;
  /** Extra classes for the inner content wrapper (e.g. "w-full justify-between"). */
  contentClassName?: string;
  children?: ReactNode;
}

/**
 * One glass skin, three materials:
 *  - current: what is live on the site today (.glass-light / .glass-dark)
 *  - refined: layered frosted glass, identical in every browser
 *  - refraction: bends the photo behind it at the edge (Chromium); other
 *    browsers automatically get "refined"
 */
export default function GlassSurface({
  material,
  tone = "clear",
  as = "button",
  indicator = false,
  contentClassName = "",
  className = "",
  children,
  ...rest
}: GlassSurfaceProps) {
  const isChromium = useIsChromium();
  const effective: GlassMaterial = material === "refraction" && !isChromium ? "refined" : material;

  const skin =
    effective === "current"
      ? `transition-transform active:scale-95 ${
          tone === "clear" ? "glass-light" : tone === "ivory" ? "glass-dark" : "bg-near-black text-ivory"
        }`
      : `gl gl-${effective} gl-${tone}`;

  const Tag = as as ElementType;
  const buttonProps = as === "button" ? { type: "button" } : {};

  return (
    <Tag
      {...buttonProps}
      {...rest}
      className={`relative inline-flex cursor-pointer items-center justify-center rounded-full no-underline ${skin} ${className}`}
    >
      {effective === "refraction" && <RefractionLayer />}
      <span className={`gl-content inline-flex items-center justify-center gap-2 ${contentClassName}`}>{children}</span>
      {indicator && (
        <span
          aria-hidden="true"
          className={`absolute right-[9px] top-[9px] z-[3] h-2 w-2 rounded-full ring-2 ${
            tone === "ivory" ? "bg-terracotta ring-ivory" : "bg-ivory ring-near-black/20"
          }`}
        />
      )}
    </Tag>
  );
}

export const MATERIAL_LABELS: Record<GlassMaterial, string> = {
  current: "Current",
  refined: "Refined",
  refraction: "Refraction",
};
