import { placeholderTestimonials } from "@/lib/placeholder-data";
import FadeIn from "@/components/animations/FadeIn";

export default function Testimonials() {
  return (
    <section className="bg-parchment px-5 py-14 sm:px-8 sm:py-16 lg:px-6 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <FadeIn className="mb-6 lg:mb-16 lg:text-center">
          <p className="section-eyebrow">Community</p>
          <h2 className="font-serif text-[2rem] font-medium leading-[1.1] text-near-black sm:text-[2.4rem] lg:mb-5 lg:text-[3.2rem]">
            What Our Girls Say
          </h2>
        </FadeIn>

        {/* Swipe rail on phones / Fold, three-up grid on desktop */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-5 px-5 sm:-mx-8 sm:scroll-px-8 sm:gap-3 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
          {placeholderTestimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 150} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <figure className="flex h-full flex-col rounded-sheet bg-ivory p-6 ring-1 ring-inset ring-near-black/[0.05] lg:rounded-none lg:border lg:border-border-cream lg:p-10 lg:ring-0">
                <div className="mb-4 text-sm tracking-widest text-terracotta lg:mb-6" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="mb-6 flex-1 font-serif text-[1.15rem] italic leading-[1.6] text-charcoal-warm lg:mb-8 lg:leading-[1.7]">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="font-sans text-[0.85rem] font-medium text-near-black">{t.author}</div>
                  <div className="font-sans text-[0.75rem] tracking-wide text-stone-gray">{t.role}</div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
