import Link from "next/link";

const shopLinks = [
  { label: "New Arrivals", href: "#" },
  { label: "Bestsellers", href: "#" },
  { label: "Tanks \u0026 Crops", href: "#" },
  { label: "Long Sleeves", href: "#" },
  { label: "Rash Guards", href: "#" },
  { label: "Jackets", href: "#" },
];

const companyLinks = [
  { label: "Our Story", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Careers", href: "#" },
];

const supportLinks = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-near-black text-warm-silver pt-16 pb-10 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl font-medium text-ivory mb-4 tracking-[0.08em]">
              Luxe Sun
            </div>
            <p className="text-[0.82rem] leading-relaxed text-warm-silver/70 max-w-[280px]">
              Women&apos;s athletic tops engineered with UPF 50+ sun protection.
            </p>
          </div>

          {/* Shop */}
          <div>
            <div className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ivory mb-4">
              Shop
            </div>
            <ul className="list-none space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ivory mb-4">
              Company
            </div>
            <ul className="list-none space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ivory mb-4">
              Support
            </div>
            <ul className="list-none space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-surface pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-stone-gray">
          <span>&copy; 2026 Luxe Sun. All rights reserved.</span>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]"
            >
              TikTok
            </a>
            <a
              href="#"
              className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
