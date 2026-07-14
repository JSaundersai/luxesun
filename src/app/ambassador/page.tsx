import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Ambassador Program — Luxe Sun",
  description: "Join the Luxe Sun Ambassador Program — for athletes, coaches, and creators who live outdoors.",
};

const perks = [
  { title: "Early Access", body: "Be first to wear and test every new drop before it launches." },
  { title: "Commission", body: "Earn on every sale through your personal referral code." },
  { title: "Community", body: "Join a crew of like-minded athletes, coaches, and creators." },
  { title: "Product", body: "Seasonal kit to keep you protected and repping the brand." },
];

export default function AmbassadorPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Join The Movement"
        title="Ambassador Program"
        description="We're looking for people who live outdoors and inspire others to move. If that's you, we'd love to have you on the team."
        image="/placeholders/cat-athletic.jpg"
      />

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p) => (
            <div key={p.title} className="border border-border-cream p-6 bg-ivory">
              <h3 className="font-serif text-[1.3rem] text-near-black mb-2">
                {p.title}
              </h3>
              <p className="font-sans text-[0.88rem] leading-relaxed text-olive-gray">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Application form frame */}
        <div className="max-w-[560px] mx-auto mt-16">
          <h2 className="font-serif text-[2rem] font-medium text-near-black mb-6 text-center">
            Apply Now
          </h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <input
              type="text"
              placeholder="Instagram / TikTok handle"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <textarea
              rows={4}
              placeholder="Tell us how you move..."
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <button type="button" className="btn-terracotta w-full text-center">
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
