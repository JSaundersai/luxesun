import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroVideo from "@/components/sections/HeroVideo";
import ValuesStrip from "@/components/sections/ValuesStrip";
import Categories from "@/components/sections/Categories";
import EditorialBanner from "@/components/sections/EditorialBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeatureBanner from "@/components/sections/FeatureBanner";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

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
      <main className="pt-0">
        <HeroVideo />
        <ValuesStrip />
        <Categories />
        <EditorialBanner />
        <FeaturedProducts />
        <FeatureBanner />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
