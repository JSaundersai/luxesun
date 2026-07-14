import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import InfoSection from "@/components/layout/InfoSection";

export const metadata: Metadata = {
  title: "Terms of Service — Luxe Sun",
};

export default function TermsPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Legal" title="Terms of Service" />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto">
          <p className="font-sans text-[0.82rem] text-stone-gray mb-10">
            Last updated: March 2026
          </p>

          <InfoSection heading="1. Overview">
            <p>
              By accessing and using this website, you accept and agree to be
              bound by these Terms of Service. This is placeholder legal copy
              for the Luxe Sun demo site and should be replaced with reviewed
              terms before launch.
            </p>
          </InfoSection>

          <InfoSection heading="2. Products & Pricing">
            <p>
              All prices are listed in AUD and are subject to change without
              notice. We reserve the right to correct any errors in pricing or
              product information.
            </p>
          </InfoSection>

          <InfoSection heading="3. Orders">
            <p>
              We reserve the right to refuse or cancel any order at our
              discretion, including in cases of suspected fraud or stock
              availability issues.
            </p>
          </InfoSection>

          <InfoSection heading="4. Intellectual Property">
            <p>
              All content on this site — including imagery, text, and branding —
              is the property of Luxe Sun and may not be reproduced without
              permission.
            </p>
          </InfoSection>

          <InfoSection heading="5. Contact">
            <p>Questions about these terms can be directed to hello@luxesun.com.</p>
          </InfoSection>
        </div>
      </section>
    </PageLayout>
  );
}
