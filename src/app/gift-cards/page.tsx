"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

const amounts = [50, 100, 150, 200, 250];

export default function GiftCardsPage() {
  const [selected, setSelected] = useState(100);

  return (
    <PageLayout>
      <PageHero
        eyebrow="The Perfect Gift"
        title="Gift Cards"
        description="Give the gift of sun-protected style. Digital gift cards are delivered by email and never expire."
      />

      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[560px] mx-auto">
          <div className="aspect-[16/9] bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center mb-10">
            <span className="font-serif text-[2rem] text-ivory tracking-[0.1em]">
              Luxe Sun
            </span>
          </div>

          <div className="mb-6">
            <div className="font-sans text-[0.72rem] font-medium tracking-[0.12em] uppercase text-stone-gray mb-3">
              Amount
            </div>
            <div className="flex flex-wrap gap-2.5">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setSelected(a)}
                  className={`min-w-[72px] py-3 px-4 font-sans text-[0.9rem] border transition-all ${
                    selected === a
                      ? "bg-near-black text-ivory border-near-black"
                      : "border-border-warm text-near-black hover:border-near-black"
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Recipient name"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <input
              type="email"
              placeholder="Recipient email"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <textarea
              rows={3}
              placeholder="Add a personal message (optional)"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <button type="button" className="btn-primary w-full text-center">
              Add ${selected} Gift Card to Cart
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
