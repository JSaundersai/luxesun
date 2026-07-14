import Image from "next/image";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Our Founder — Luxe Sun",
  description: "Meet the founder behind Luxe Sun and the vision for sun-protective activewear.",
};

export default function FounderPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="About Us" title="Our Founder" />

      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] bg-warm-sand overflow-hidden order-1 md:order-none">
            <Image
              src="/placeholders/cat-studio.jpg"
              alt="Luxe Sun founder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="section-eyebrow">A Note From The Founder</p>
            <h2 className="font-serif text-[2rem] md:text-[2.6rem] font-medium leading-tight text-near-black mb-6">
              &ldquo;I wanted protection that felt like a second skin.&rdquo;
            </h2>
            <div className="space-y-5 font-sans text-[1rem] leading-[1.8] text-olive-gray">
              <p>
                After years spent training and competing outdoors, I kept
                running into the same problem — nothing on the market protected
                my skin without feeling like a compromise.
              </p>
              <p>
                Luxe Sun is the answer I wished I&apos;d had: activewear that&apos;s
                genuinely beautiful, genuinely high-performance, and quietly
                protects you from the one thing every outdoor athlete
                overlooks.
              </p>
              <p className="font-serif text-[1.2rem] text-near-black italic">
                — Founder &amp; Creative Director
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
