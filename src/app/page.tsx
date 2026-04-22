import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ValuesStrip from "@/components/sections/ValuesStrip";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeatureBanner from "@/components/sections/FeatureBanner";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <ValuesStrip />
        <Categories />
        <FeaturedProducts />
        <FeatureBanner />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
