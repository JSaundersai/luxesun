import type { Metadata } from "next";

// Internal device-check tool — keep it out of search results.
export const metadata: Metadata = {
  title: "Viewport check",
  robots: { index: false, follow: false },
};

export default function ViewportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
