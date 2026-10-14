import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSections from "@/components/sections/HomeSections";

/**
 * Comparison page: identical to the homepage but with the video hero variant.
 * Lets us A/B the video treatment against the current image hero at "/".
 */
export const metadata = {
  robots: { index: false, follow: false },
};

export default function IndexVideo() {
  return (
    <>
      <Navbar />
      <HomeSections />
      <Footer />
    </>
  );
}
