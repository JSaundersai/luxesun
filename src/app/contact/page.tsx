import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contact — Luxe Sun",
  description: "Get in touch with the Luxe Sun team.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="We're Here to Help"
        title="Contact Us"
        description="Questions about sizing, orders, or anything else? Send us a message and we'll get back to you within 1–2 business days."
      />

      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <textarea
              rows={6}
              placeholder="How can we help?"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors"
            />
            <button type="button" className="btn-primary w-full text-center">
              Send Message
            </button>
          </form>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-[0.72rem] font-medium tracking-[0.15em] uppercase text-stone-gray mb-2">
                Customer Care
              </h3>
              <p className="font-sans text-[0.95rem] text-olive-gray">
                hello@luxesun.com
                <br />
                Mon–Fri · 9am–5pm AEST
              </p>
            </div>
            <div>
              <h3 className="font-sans text-[0.72rem] font-medium tracking-[0.15em] uppercase text-stone-gray mb-2">
                Wholesale &amp; Press
              </h3>
              <p className="font-sans text-[0.95rem] text-olive-gray">
                partnerships@luxesun.com
              </p>
            </div>
            <div>
              <h3 className="font-sans text-[0.72rem] font-medium tracking-[0.15em] uppercase text-stone-gray mb-2">
                Follow
              </h3>
              <p className="font-sans text-[0.95rem] text-olive-gray">
                Instagram · TikTok · Pinterest
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
