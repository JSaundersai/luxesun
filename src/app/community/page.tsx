import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Community — Luxe Sun",
  description: "Luxe Sun community events, run clubs, and outdoor sessions near you.",
};

const events = [
  {
    date: "Sat 22 Mar",
    title: "Sunrise Beach Run Club",
    location: "Bondi Beach, Sydney",
    body: "A 5km social run followed by coffee and stretch. All paces welcome.",
  },
  {
    date: "Sun 6 Apr",
    title: "Rooftop Flow + Sun Safety Workshop",
    location: "South Bank, Brisbane",
    body: "Morning yoga flow and a short talk on protecting your skin outdoors.",
  },
  {
    date: "Sat 19 Apr",
    title: "Beach Volleyball Meetup",
    location: "St Kilda, Melbourne",
    body: "Casual games, good vibes, and a Luxe Sun kit giveaway.",
  },
];

export default function CommunityPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Get Involved"
        title="Community Events"
        description="We're building a community of people who love moving outdoors. Come join a session near you."
        image="/placeholders/cat-athletic.jpg"
      />

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[820px] mx-auto space-y-5">
          {events.map((e) => (
            <div
              key={e.title}
              className="border border-border-cream bg-ivory p-6 md:p-8 flex flex-col sm:flex-row gap-5 sm:items-center"
            >
              <div className="sm:w-28 shrink-0">
                <span className="font-sans text-[0.7rem] font-medium tracking-[0.15em] uppercase text-terracotta">
                  {e.date}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-[1.5rem] text-near-black leading-tight mb-1">
                  {e.title}
                </h3>
                <p className="font-sans text-[0.8rem] tracking-[0.06em] uppercase text-stone-gray mb-2">
                  {e.location}
                </p>
                <p className="font-sans text-[0.92rem] leading-relaxed text-olive-gray">
                  {e.body}
                </p>
              </div>
              <button className="btn-secondary whitespace-nowrap self-start sm:self-center">
                RSVP
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
