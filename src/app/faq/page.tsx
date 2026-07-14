import Link from "next/link";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "FAQs — Luxe Sun",
  description: "Answers to common questions about Luxe Sun products, orders, shipping, and returns.",
};

const faqs = [
  {
    q: "What does UPF 50+ mean?",
    a: "UPF (Ultraviolet Protection Factor) measures how much UV radiation a fabric blocks. A UPF 50+ rating means the fabric blocks at least 98% of UV rays — the highest rating available.",
  },
  {
    q: "Does the sun protection wash out?",
    a: "No. Our UPF protection is built into the fabric structure, not applied as a coating, so it holds its rating through repeated washing and wear.",
  },
  {
    q: "How do I find my size?",
    a: "Check our detailed Size Guide for measurements and fit notes. If you're between sizes, we recommend sizing up for a relaxed fit.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping is 3–7 business days within Australia, and 7–14 business days internationally. Express options are available at checkout.",
  },
  {
    q: "What is your returns policy?",
    a: "We offer free returns within 30 days on unworn items with tags attached. See our Returns page for full details.",
  },
  {
    q: "How do I care for my Luxe Sun pieces?",
    a: "Machine wash cold on a gentle cycle and hang to dry. Avoid fabric softeners and tumble drying to preserve the fabric's performance and UPF rating.",
  },
];

export default function FaqPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        description="Everything you need to know about our products, orders, and policies."
      />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto divide-y divide-border-cream">
          {faqs.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-[1.25rem] text-near-black">
                {item.q}
                <span className="ml-4 text-terracotta transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="font-sans text-[0.95rem] leading-[1.8] text-olive-gray mt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="text-center font-sans text-[0.95rem] text-stone-gray mt-12">
          Still have questions?{" "}
          <Link href="/contact" className="text-terracotta underline underline-offset-2">
            Get in touch
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}
