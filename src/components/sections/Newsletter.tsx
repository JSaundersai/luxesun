"use client";

export default function Newsletter() {
  return (
    <section id="about" className="py-24 px-6 bg-parchment">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="section-eyebrow">Stay Golden</p>
        <h2 className="section-title">Join the Luxe Sun Community</h2>
        <p className="section-desc mx-auto">
          Be the first to know about new drops, exclusive offers, and
          sun-soaked inspiration. Plus, get 15% off your first order.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto mt-8"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 border border-border-warm rounded-comfortable bg-white font-sans text-[0.9rem] text-near-black outline-none transition-colors placeholder:text-stone-gray focus:border-gold"
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
