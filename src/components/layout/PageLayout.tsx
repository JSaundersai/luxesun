import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Remove the default top padding when the page renders its own full-bleed hero. */
  flush?: boolean;
}

/**
 * Standard page shell: fixed Navbar, padded main content, and Footer.
 * Use `flush` for pages that open with an edge-to-edge hero image.
 */
export default function PageLayout({ children, flush = false }: PageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className={flush ? "pt-[73px]" : "pt-[73px] md:pt-[89px]"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
