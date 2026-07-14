"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Influencers", href: "/admin/influencers" },
  { label: "Emails", href: "/admin/emails" },
  { label: "Social", href: "/admin/social" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-near-black text-ivory">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-[1.3rem] tracking-[0.1em]">Luxe Sun</span>
            <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-warm-silver/70 border-l border-warm-silver/30 pl-4">
              Admin
            </span>
          </div>
          <Link
            href="/"
            className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-warm-silver/80 hover:text-ivory no-underline"
          >
            View Store →
          </Link>
        </div>
        <nav className="border-t border-warm-silver/15">
          <div className="max-w-[1200px] mx-auto px-6 flex gap-6 overflow-x-auto">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 font-sans text-[0.76rem] tracking-[0.1em] uppercase no-underline border-b-2 whitespace-nowrap transition-colors ${
                    active
                      ? "text-ivory border-terracotta"
                      : "text-warm-silver/70 border-transparent hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
