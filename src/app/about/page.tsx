import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Our Story — Luxe Sun",
  description: "The story behind Luxe Sun: sun-protective activewear made to empower a healthier, outdoor life.",
};

const values = [
  {
    title: "Protection First",
    body: "Every piece is UPF 50+ certified and tested to hold its rating wash after wash.",
  },
  {
    title: "Designed to Move",
    body: "Premium performance fabrics built for real movement — studio, court, trail, and water.",
  },
  {
    title: "Made to Last",
    body: "Considered construction and durable materials that outlast the trend cycle.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="About Us"
        title="Sun Protection, Made Beautiful"
        description="Luxe Sun was born from a simple belief: staying protected outdoors should never mean sacrificing style or performance."
        image="/placeholders/feature-lifestyle.jpg"
      />

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="section-eyebrow">Our Brand</p>
          <h2 className="font-serif text-[2.2rem] md:text-[2.8rem] font-medium leading-tight text-near-black mb-6">
            UPF 50+ activewear engineered for the outdoor rotation
          </h2>
          <div className="space-y-5 font-sans text-[1rem] leading-[1.8] text-olive-gray">
            <p>
              We started Luxe Sun because we were tired of choosing between sun
              safety and looking good. Rash guards felt like surf-shop
              afterthoughts, and sunscreen alone was never enough for a full day
              outdoors.
            </p>
            <p>
              So we built activewear that does both — premium performance fabric
              with certified UPF 50+ protection, designed to move from a sunrise
              yoga flow to a sunset run without missing a beat.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="border border-border-cream p-8 bg-ivory">
              <h3 className="font-serif text-[1.5rem] text-near-black mb-3">
                {v.title}
              </h3>
              <p className="font-sans text-[0.92rem] leading-relaxed text-olive-gray">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-links */}
      <section className="px-6 pb-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Our Founder", href: "/about/founder", image: "/placeholders/cat-studio.jpg" },
            { title: "Sustainability", href: "/sustainability", image: "/placeholders/cat-longsleeves.jpg" },
            { title: "Community", href: "/community", image: "/placeholders/cat-athletic.jpg" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative block aspect-[3/2] overflow-hidden bg-warm-sand no-underline"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-near-black/35" />
              <span className="absolute inset-0 flex items-center justify-center font-serif text-[1.5rem] text-ivory">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
