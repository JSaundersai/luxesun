import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import InfoSection from "@/components/layout/InfoSection";

export const metadata: Metadata = {
  title: "Shipping — Luxe Sun",
  description: "Luxe Sun shipping options, delivery times, and costs.",
};

export default function ShippingPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Support" title="Shipping" />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto">
          <InfoSection heading="Delivery Times">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Australia Standard: 3–7 business days</li>
              <li>Australia Express: 1–3 business days</li>
              <li>International Standard: 7–14 business days</li>
              <li>International Express: 5–9 business days</li>
            </ul>
          </InfoSection>

          <InfoSection heading="Shipping Costs">
            <p>
              Free standard shipping on all Australian orders over $75. Orders
              under $75 are charged a flat $9.95. Express and international
              rates are calculated at checkout based on your location.
            </p>
          </InfoSection>

          <InfoSection heading="Order Processing">
            <p>
              Orders are processed within 1–2 business days. You&apos;ll receive
              a confirmation email with tracking as soon as your order ships.
            </p>
          </InfoSection>

          <InfoSection heading="Duties & Taxes">
            <p>
              International orders may be subject to import duties and taxes
              levied by the destination country. These are the
              responsibility of the customer and are not included in the order
              total.
            </p>
          </InfoSection>
        </div>
      </section>
    </PageLayout>
  );
}
