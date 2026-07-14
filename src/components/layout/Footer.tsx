import Link from "next/link";

const shopLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/bestsellers" },
  { label: "Sleeves", href: "/collections/sleeves" },
  { label: "Crop Tops", href: "/collections/crop-tops" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Gift Cards", href: "/gift-cards" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Our Founder", href: "/about/founder" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Ambassador Program", href: "/ambassador" },
  { label: "Community", href: "/community" },
  { label: "Journal", href: "/blog" },
];

const supportLinks = [
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Find a Store", href: "/find-a-store" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-near-black text-warm-silver pt-16 pb-10 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl font-medium text-ivory mb-4 tracking-[0.08em]">
              Luxe Sun
            </div>
            <p className="text-[0.82rem] leading-relaxed text-warm-silver/70 max-w-[280px]">
              Certified UPF 50+ sun-protective activewear for beach volleyball,
              running and every sun sport.
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

          {/* Account */}
          <div>
            <div className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ivory mb-4">
              Account
            </div>
            <ul className="list-none space-y-2.5">
              <li>
                <Link href="/account" className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory">
                  Partner Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[0.82rem] text-warm-silver/70 no-underline transition-colors hover:text-ivory">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-surface pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-stone-gray">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>&copy; 2026 Luxe Sun. All rights reserved.</span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-stone-gray no-underline transition-colors hover:text-ivory"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]">
              Instagram
            </a>
            <a href="#" className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]">
              TikTok
            </a>
            <a href="#" className="text-warm-silver/70 no-underline transition-colors hover:text-ivory text-[0.75rem]">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
