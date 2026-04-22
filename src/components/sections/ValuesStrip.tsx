const values = [
  {
    icon: "\u2600",
    title: "UPF 50+ Rated",
    desc: "Lab-tested to block 98% of UV rays in every garment",
  },
  {
    icon: "\u2618",
    title: "Sustainable Fabrics",
    desc: "Recycled nylon & organic blends in every piece",
  },
  {
    icon: "\u2744",
    title: "Cooling Technology",
    desc: "Moisture-wicking fabric that keeps you cool in heat",
  },
  {
    icon: "\u2665",
    title: "Women-Owned",
    desc: "Designed by women who train outdoors, for women who train outdoors",
  },
];

export default function ValuesStrip() {
  return (
    <div className="bg-ivory border-y border-border-cream py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {values.map((v) => (
          <div key={v.title}>
            <div className="text-2xl mb-3 text-gold">{v.icon}</div>
            <div className="font-serif text-lg font-medium text-near-black mb-1.5">
              {v.title}
            </div>
            <div className="font-sans text-[0.82rem] text-stone-gray leading-snug">
              {v.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
