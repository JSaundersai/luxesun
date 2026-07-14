import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Find a Store — Luxe Sun",
  description: "Find Luxe Sun stockists and flagship stores near you.",
};

const stores = [
  {
    name: "Luxe Sun Bondi",
    address: "112 Campbell Parade, Bondi Beach NSW 2026",
    hours: "Mon–Sun · 9am–6pm",
  },
  {
    name: "Luxe Sun South Bank",
    address: "Shop 14, Little Stanley St, South Brisbane QLD 4101",
    hours: "Mon–Sat · 10am–6pm · Sun 10am–4pm",
  },
  {
    name: "Luxe Sun St Kilda",
    address: "88 Acland St, St Kilda VIC 3182",
    hours: "Mon–Sun · 10am–6pm",
  },
];

export default function FindStorePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Visit Us"
        title="Find a Store"
        description="Come try Luxe Sun in person. Enter your postcode or browse our flagship locations below."
      />

      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[720px] mx-auto">
          {/* Search frame */}
          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Enter postcode or suburb"
              className="w-full border border-border-warm bg-white px-5 py-4 font-sans text-[1rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !px-6 !py-2.5">
              Search
            </button>
          </div>

          <div className="space-y-5">
            {stores.map((s) => (
              <div key={s.name} className="border border-border-cream bg-ivory p-6">
                <h3 className="font-serif text-[1.5rem] text-near-black mb-2">
                  {s.name}
                </h3>
                <p className="font-sans text-[0.92rem] text-olive-gray mb-1">
                  {s.address}
                </p>
                <p className="font-sans text-[0.82rem] text-stone-gray">
                  {s.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
