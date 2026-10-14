import type { Metadata } from "next";

// Internal design review page — keep it out of search results.
export const metadata: Metadata = {
  title: "Glass lab",
  robots: { index: false, follow: false },
};

export default function GlassLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
