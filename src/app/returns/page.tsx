import Link from "next/link";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import InfoSection from "@/components/layout/InfoSection";

export const metadata: Metadata = {
  title: "Returns & Exchanges — Luxe Sun",
  description: "Luxe Sun returns and exchanges policy.",
};

export default function ReturnsPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Support" title="Returns & Exchanges" />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto">
          <InfoSection heading="Our Policy">
            <p>
              We offer free returns within 30 days of delivery. Items must be
              unworn, unwashed, and have all original tags attached. Sale items
              are eligible for exchange or store credit only.
            </p>
          </InfoSection>

          <InfoSection heading="How to Return">
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Start your return through our online returns portal.</li>
              <li>Print your prepaid return label.</li>
              <li>Drop your parcel at any post office.</li>
              <li>
                Refunds are processed within 5 business days of us receiving
                your return.
              </li>
            </ol>
          </InfoSection>

          <InfoSection heading="Exchanges">
            <p>
              Need a different size or colour? The fastest way is to place a new
              order and return the original for a refund. This ensures your new
              piece isn&apos;t held up while your return is in transit.
            </p>
          </InfoSection>

          <div className="mt-4">
            <Link href="/account" className="btn-primary">
              Start a Return
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
