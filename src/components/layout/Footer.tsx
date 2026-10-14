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

const accountLinks = [
  { label: "Sign In", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Partner Portal", href: "/partners" },
  { label: "Admin", href: "/admin" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const linkGroups = [
  { heading: "Shop", links: shopLinks },
  { heading: "Company", links: companyLinks },
  { heading: "Support", links: supportLinks },
  { heading: "Account", links: accountLinks },
];

export default function Footer() {
  return (
    <footer className="bg-near-black px-5 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-12 text-warm-silver sm:px-8 lg:px-6 lg:pb-10 lg:pt-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Mobile / Fold: brand + accordions */}
        <div className="lg:hidden">
          <div className="mb-3 font-serif text-[1.75rem] font-medium tracking-[0.08em] text-ivory">Luxe Sun</div>
          <p className="mb-8 max-w-[320px] text-[0.88rem] leading-relaxed text-warm-silver/70">
            Certified UPF 50+ sun-protective activewear for beach volleyball,
            running and every sun sport.
          </p>

          <div className="border-t border-dark-surface">
            {linkGroups.map((group) => (
              <details key={group.heading} className="group border-b border-dark-surface">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-sans text-[0.95rem] font-medium text-ivory [&::-webkit-details-marker]:hidden">
                  {group.heading}
                  <svg
                    className="h-4 w-4 text-warm-silver/70 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <ul className="list-none pb-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-[44px] items-center text-[0.92rem] text-warm-silver/75 no-underline transition-colors hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mb-16 hidden grid-cols-5 gap-10 lg:grid">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-medium text-ivory mb-4 tracking-[0.08em]">
              Luxe Sun
            </div>
            <p className="text-[0.82rem] leading-relaxed text-warm-silver/70 max-w-[280px]">
              Certified UPF 50+ sun-protective activewear for beach volleyball,
              running and every sun sport.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.heading}>
              <div className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-ivory mb-4">
                {group.heading}
              </div>
              <ul className="list-none space-y-2.5">
                {group.links.map((link) => (
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
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start gap-5 text-[0.75rem] text-stone-gray lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:border-t lg:border-dark-surface lg:pt-6">
          <div className="flex gap-2 lg:order-2 lg:gap-6">
            {["Instagram", "TikTok", "Pinterest"].map((network) => (
              <a
                key={network}
                href="#"
                className="inline-flex min-h-[40px] items-center rounded-full px-4 text-[0.8rem] text-warm-silver/80 no-underline ring-1 ring-inset ring-dark-surface transition-colors hover:text-ivory lg:min-h-0 lg:px-0 lg:text-[0.75rem] lg:text-warm-silver/70 lg:ring-0"
              >
                {network}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 lg:order-1 lg:flex-row lg:items-center lg:gap-4">
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
        </div>
      </div>
    </footer>
  );
}
