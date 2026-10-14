import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Remove the default top padding when the page renders its own full-bleed hero. */
  flush?: boolean;
  /**
   * Mobile app-style page (e.g. the PDP): content starts at the very top of the
   * screen under the page's own floating controls, and the global mobile
   * controls are hidden. Desktop keeps the standard bar.
   */
  mobileOverlay?: boolean;
  /** Reserve space under the footer for a fixed mobile bottom bar (PDP Add to Cart). */
  bottomBarSpacer?: boolean;
}

/**
 * Standard page shell: fixed Navbar, padded main content, and Footer.
 * Below lg the nav is a row of floating 44px controls, so pages only need to
 * clear that strip (plus the safe-area inset on notched / punch-hole screens).
 */
export default function PageLayout({
  children,
  flush = false,
  mobileOverlay = false,
  bottomBarSpacer = false,
}: PageLayoutProps) {
  const padding = mobileOverlay
    ? "pt-0 lg:pt-[82px]"
    : flush
      ? "pt-[calc(env(safe-area-inset-top)+4.25rem)] lg:pt-[82px]"
      : "pt-[calc(env(safe-area-inset-top)+4.5rem)] lg:pt-[89px]";

  return (
    <>
      <Navbar mobileControls={!mobileOverlay} />
      <main className={padding}>{children}</main>
      <Footer />
      {bottomBarSpacer && (
        <div aria-hidden="true" className="h-[calc(env(safe-area-inset-bottom)+5.25rem)] bg-near-black lg:hidden" />
      )}
    </>
  );
}
