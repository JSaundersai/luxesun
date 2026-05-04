import { placeholderTestimonials } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function Testimonials() {
  return (
    <section className="py-28 px-6 bg-parchment">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="section-eyebrow">Community</p>
          <h2 className="section-title">What Our Girls Say</h2>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderTestimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="bg-ivory border border-border-cream p-10">
                <div className="text-terracotta text-sm mb-6 tracking-widest">
                  ★★★★★
                </div>
                <p className="font-serif text-[1.15rem] italic leading-[1.7] text-charcoal-warm mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-sans text-[0.82rem] font-medium text-near-black">
                  {t.author}
                </div>
                <div className="font-sans text-[0.75rem] text-stone-gray tracking-wide">
                  {t.role}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
