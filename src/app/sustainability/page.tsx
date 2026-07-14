import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Sustainability — Luxe Sun",
  description: "How Luxe Sun approaches responsible materials, ethical production, and longevity.",
};

const pillars = [
  {
    title: "Responsible Fabrics",
    body: "We prioritise recycled and low-impact performance yarns without compromising UPF protection or durability.",
  },
  {
    title: "Made to Last",
    body: "Longevity is our first sustainability lever. Pieces are built to survive seasons, not trends.",
  },
  {
    title: "Ethical Production",
    body: "We partner with factories that meet fair-labour standards and share our quality expectations.",
  },
  {
    title: "Less Waste",
    body: "Considered cutting, recyclable packaging, and a repair-first mindset to keep product out of landfill.",
  },
];

export default function SustainabilityPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Empowering a Healthier You"
        title="Sustainability"
        description="Protecting your skin shouldn't cost the planet. Here's how we're working to do better, honestly and transparently."
        image="/placeholders/cat-longsleeves.jpg"
      />

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="border border-border-cream p-8 bg-ivory">
              <h3 className="font-serif text-[1.6rem] text-near-black mb-3">
                {p.title}
              </h3>
              <p className="font-sans text-[0.95rem] leading-relaxed text-olive-gray">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <p className="max-w-[640px] mx-auto text-center font-sans text-[0.95rem] leading-[1.8] text-stone-gray mt-14">
          We&apos;re early on this journey and we won&apos;t pretend otherwise. Our
          commitment is to keep improving, measure honestly, and share our
          progress as we go.
        </p>
      </section>
    </PageLayout>
  );
}
