import HeroVideo from "@/components/sections/HeroVideo";
import ValuesStrip from "@/components/sections/ValuesStrip";
import Categories from "@/components/sections/Categories";
import EditorialBanner from "@/components/sections/EditorialBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeatureBanner from "@/components/sections/FeatureBanner";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

/**
 * Homepage section stack, shared by "/" and the "/index-video" comparison page.
 *
 * Below lg the order follows the mobile shop reference — hero card, then
 * products straight away — using flex `order`. Desktop keeps document order.
 */
export default function HomeSections({ startDelayMs }: { startDelayMs?: number }) {
  return (
    <main className="flex flex-col pt-0 lg:block">
      <div className="order-1">
        <HeroVideo startDelayMs={startDelayMs} />
      </div>
      <div className="order-3 lg:relative lg:z-[3]">
        <ValuesStrip />
      </div>
      <div className="order-4">
        <Categories />
      </div>
      <div className="order-5">
        <EditorialBanner />
      </div>
      <div className="order-2">
        <FeaturedProducts />
      </div>
      <div className="order-6">
        <FeatureBanner />
      </div>
      <div className="order-7">
        <Testimonials />
      </div>
      <div className="order-8">
        <Newsletter />
      </div>
    </main>
  );
}
