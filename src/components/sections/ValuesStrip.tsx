const values = [
  {
    title: "Certified UPF 50+",
    desc: "Independently tested to block 98% of UV rays",
  },
  {
    title: "Cooling Tech",
    desc: "Stays up to 2\u00b0C cooler so you play longer",
  },
  {
    title: "Moisture-Wicking",
    desc: "Lightweight, breathable, quick-drying fabric",
  },
  {
    title: "Built For Sun Sports",
    desc: "Beach volleyball, running \u0026 everything outdoors",
  },
];

/**
 * Brand promises. Mobile: a 2×2 (Fold/tablet: 4-up) grid of soft rounded
 * cards below the product grid. Desktop: the full-width strip that tucks up
 * under the hero.
 */
export default function ValuesStrip() {
  return (
    <div className="relative z-[3] bg-parchment px-5 pb-12 sm:px-8 lg:-mt-20 lg:border-y lg:border-border-cream lg:bg-ivory lg:px-6 lg:py-6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:gap-10">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-card bg-ivory p-4 ring-1 ring-inset ring-near-black/[0.05] lg:rounded-none lg:bg-transparent lg:p-0 lg:ring-0"
          >
            <div className="mb-1.5 font-sans text-[0.8rem] font-medium text-near-black lg:mb-2 lg:text-[0.75rem] lg:uppercase lg:tracking-[0.12em]">
              {v.title}
            </div>
            <div className="font-sans text-[0.8rem] leading-relaxed text-stone-gray">
              {v.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
