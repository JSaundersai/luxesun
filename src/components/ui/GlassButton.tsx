"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface GlassButtonProps {
  /** "light" = frosted white on photography, "dark" = frosted ivory on page. */
  tone: "light" | "dark";
  label: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
  /** Small dot in the corner, e.g. items in the bag. */
  indicator?: boolean;
  id?: string;
  className?: string;
}

/** 44px frosted circular icon control used across the mobile UI. */
export default function GlassButton({
  tone,
  label,
  children,
  href,
  onClick,
  pressed,
  expanded,
  controls,
  indicator,
  id,
  className = "",
}: GlassButtonProps) {
  const classes = `pointer-events-auto relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full no-underline transition-[background-color,color,box-shadow,transform] duration-300 active:scale-95 ${
    tone === "light" ? "glass-light" : "glass-dark"
  } ${className}`;

  const dot = indicator ? (
    <span
      aria-hidden="true"
      className={`absolute right-[9px] top-[9px] h-2 w-2 rounded-full ring-2 ${
        tone === "light" ? "bg-ivory ring-near-black/20" : "bg-terracotta ring-ivory"
      }`}
    />
  ) : null;

  if (href) {
    return (
      <Link id={id} href={href} aria-label={label} className={classes}>
        {children}
        {dot}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={classes}
    >
      {children}
      {dot}
    </button>
  );
}
