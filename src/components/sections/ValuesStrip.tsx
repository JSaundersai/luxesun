const values = [
  {
    title: "UPF 50+ Rated",
    desc: "Lab-tested to block 98% of UV rays",
  },
  {
    title: "Sustainable Fabrics",
    desc: "Recycled nylon \u0026 organic blends",
  },
  {
    title: "Cooling Tech",
    desc: "Moisture-wicking performance",
  },
  {
    title: "Women-Owned",
    desc: "Designed by women, for women",
  },
];

export default function ValuesStrip() {
  return (
    <div className="bg-ivory border-y border-border-cream py-12 px-6">
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
