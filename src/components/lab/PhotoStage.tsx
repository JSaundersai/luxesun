"use client";

import Image from "next/image";
import type { ReactNode } from "react";

interface PhotoStageProps {
  src: string;
  alt: string;
  /** Tailwind height class, e.g. "h-[300px]". */
  heightClass?: string;
  /** Glass controls laid over the photo. They stay put while the photo scrolls. */
  children: ReactNode;
}

/**
 * A rounded photo that can be swiped sideways underneath fixed overlay content,
 * so you can watch glass react to whatever passes behind it.
 */
export default function PhotoStage({ src, alt, heightClass = "h-[300px]", children }: PhotoStageProps) {
  return (
    <div className={`relative overflow-hidden rounded-sheet bg-dark-surface ${heightClass}`}>
      <div className="no-scrollbar absolute inset-0 overflow-x-auto overscroll-x-contain">
        <div className="relative h-full w-[150%]">
          <Image src={src} alt={alt} fill sizes="(max-width: 640px) 150vw, 1100px" className="object-cover object-[50%_18%]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0">{children}</div>
    </div>
  );
}
