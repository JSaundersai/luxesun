import { placeholderTestimonials } from "@/lib/placeholder-data";

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">Community</p>
          <h2 className="section-title">What Our Girls Say</h2>
          <p className="section-desc mx-auto">
            Real reviews from women who live in Luxe Sun.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-ivory border border-border-cream rounded-generous p-8"
            >
              <div className="text-gold text-base mb-4 tracking-widest">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p className="font-serif text-[1.1rem] italic leading-relaxed text-charcoal-warm mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="font-sans text-[0.85rem] font-medium text-near-black">
                {t.author}
              </div>
              <div className="font-sans text-[0.78rem] text-stone-gray">
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
