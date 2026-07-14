import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import InfoSection from "@/components/layout/InfoSection";

export const metadata: Metadata = {
  title: "Privacy Policy — Luxe Sun",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto">
          <p className="font-sans text-[0.82rem] text-stone-gray mb-10">
            Last updated: March 2026
          </p>

          <InfoSection heading="Information We Collect">
            <p>
              We collect information you provide directly — such as your name,
              email, shipping address, and payment details — as well as data
              gathered automatically when you browse, like device and usage
              information. This is placeholder copy for the demo site.
            </p>
          </InfoSection>

          <InfoSection heading="How We Use It">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process and fulfil your orders</li>
              <li>To provide customer support</li>
              <li>To send updates and marketing (with your consent)</li>
              <li>To improve our products and website experience</li>
            </ul>
          </InfoSection>

          <InfoSection heading="Cookies">
            <p>
              We use cookies to remember your preferences, keep your cart, and
              understand how the site is used. You can control cookies through
              your browser settings.
            </p>
          </InfoSection>

          <InfoSection heading="Your Rights">
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting hello@luxesun.com.
            </p>
          </InfoSection>
        </div>
      </section>
    </PageLayout>
  );
}
