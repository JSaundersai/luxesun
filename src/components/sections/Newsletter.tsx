"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function Newsletter() {
  return (
    <section id="about" className="py-28 px-6 bg-ivory border-t border-border-cream">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="section-eyebrow">Stay Connected</p>
          <h2 className="font-serif text-[2.4rem] font-medium leading-[1.15] text-near-black mb-5">
            Join the Luxe Sun Community
          </h2>
          <p className="font-sans text-[0.95rem] leading-[1.7] text-olive-gray mb-10">
            Be the first to know about new drops, exclusive offers, and
            sun-soaked inspiration.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 border border-border-warm bg-white font-sans text-[0.88rem] text-near-black outline-none transition-all duration-300 placeholder:text-stone-gray focus:border-near-black"
            />
            <button
              type="submit"
              className="inline-block bg-near-black text-ivory font-sans text-[0.8rem] font-medium tracking-[0.15em] uppercase px-10 py-3.5 cursor-pointer transition-all duration-300 hover:bg-dark-surface"
            >
              Subscribe
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}
