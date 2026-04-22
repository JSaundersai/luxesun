import Link from "next/link";

const shopLinks = [
  { label: "New Arrivals", href: "#" },
  { label: "Bestsellers", href: "#" },
  { label: "Tanks & Crop Tops", href: "#" },
  { label: "Long Sleeves", href: "#" },
  { label: "Rash Guards", href: "#" },
  { label: "Jackets & Cover-Ups", href: "#" },
  { label: "Hoodies", href: "#" },
];

const companyLinks = [
  { label: "Our Story", href: "#" },
  { label: "UPF Technology", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Press", href: "#" },
];

const supportLinks = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-near-black text-warm-silver pt-20 pb-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-medium text-ivory mb-4">
              Luxe Sun
            </div>
            <p className="text-[0.88rem] leading-relaxed text-warm-silver max-w-[300px]">
              Women&apos;s athletic tops engineered with UPF 50+ sun protection.
              Train under the sun, not in fear of it.
            </p>
          </div>

          {/* Shop */}
          <div>
            <div className="font-sans text-[0.78rem] font-medium tracking-[0.15em] uppercase text-ivory mb-5">
              Shop
            </div>
            <ul className="list-none space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.88rem] text-warm-silver no-underline transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-sans text-[0.78rem] font-medium tracking-[0.15em] uppercase text-ivory mb-5">
              Company
            </div>
            <ul className="list-none space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.88rem] text-warm-silver no-underline transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="font-sans text-[0.78rem] font-medium tracking-[0.15em] uppercase text-ivory mb-5">
              Support
            </div>
            <ul className="list-none space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.88rem] text-warm-silver no-underline transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-surface pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.8rem] text-stone-gray">
          <span>&copy; 2026 Luxe Sun. All rights reserved.</span>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-warm-silver no-underline transition-colors hover:text-gold text-[0.85rem]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-warm-silver no-underline transition-colors hover:text-gold text-[0.85rem]"
            >
              TikTok
            </a>
            <a
              href="#"
              className="text-warm-silver no-underline transition-colors hover:text-gold text-[0.85rem]"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
