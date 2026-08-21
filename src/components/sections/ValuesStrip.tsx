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

export default function ValuesStrip() {
  return (
    <div className="relative z-[3] -mt-20 bg-ivory border-y border-border-cream px-6 py-6 md:-mt-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {values.map((v) => (
          <div key={v.title} className="text-center lg:text-left">
            <div className="font-sans text-[0.75rem] font-medium tracking-[0.12em] uppercase text-near-black mb-2">
              {v.title}
            </div>
            <div className="font-sans text-[0.8rem] text-stone-gray leading-relaxed">
              {v.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
