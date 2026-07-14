"use client";

import { useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useAnalytics, Influencer } from "@/context/AnalyticsProvider";

const money = (n: number) => `$${n.toFixed(2)}`;

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border-cream bg-white p-5">
      <div className="font-sans text-[0.62rem] font-medium tracking-[0.16em] uppercase text-stone-gray mb-2">{label}</div>
      <div className={`font-serif text-[1.8rem] leading-none ${accent ? "text-terracotta" : "text-near-black"}`}>{value}</div>
    </div>
  );
}

export default function PartnersPage() {
  const { influencers, orders, payouts } = useAnalytics();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [me, setMe] = useState<Influencer | null>(null);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    const found = influencers.find(
      (i) => i.code.toLowerCase() === q || i.email.toLowerCase() === q
    );
    if (found) { setMe(found); setError(""); }
    else setError("We couldn't find a partner with that code or email.");
  };

  const stats = useMemo(() => {
    if (!me) return null;
    const attributed = orders.filter((o) => o.influencerId === me.id);
    const netSales = attributed.reduce((s, o) => s + (o.subtotal - (o.discount || 0)), 0);
    const earned = (netSales * me.commissionRate) / 100;
    const myPayouts = payouts.filter((p) => p.influencerId === me.id);
    const paid = myPayouts.reduce((s, p) => s + p.amount, 0);
    const owed = Math.max(0, earned - paid);
    return { attributed, netSales, earned, paid, owed, myPayouts };
  }, [me, orders, payouts]);

  if (!me || !stats) {
    return (
      <PageLayout>
        <div className="max-w-[460px] mx-auto px-6 py-20 md:py-28 min-h-[55vh]">
          <p className="section-eyebrow text-center">Partner Program</p>
          <h1 className="font-serif text-[2.4rem] font-medium text-near-black mb-3 text-center">Creator Portal</h1>
          <p className="font-sans text-[0.9rem] text-stone-gray text-center mb-8">
            Sign in with your discount code or email to see your sales and earnings.
          </p>
          {error && (
            <div className="border border-terracotta/40 bg-terracotta/5 text-terracotta px-4 py-2 mb-5 font-sans text-[0.85rem]">{error}</div>
          )}
          <form onSubmit={login} className="space-y-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Your code (e.g. MAYA15) or email"
              className="w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black"
            />
            <button type="submit" className="btn-primary w-full">View my dashboard</button>
          </form>
          <p className="font-sans text-[0.76rem] text-stone-gray text-center mt-6">
            Not a partner yet? <a href="/ambassador" className="text-terracotta underline underline-offset-2">Apply here.</a>
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-[1000px] mx-auto px-6 py-14 md:py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-eyebrow">Partner Dashboard</p>
            <h1 className="font-serif text-[2.4rem] font-medium text-near-black">Welcome, {me.name}</h1>
          </div>
          <button onClick={() => { setMe(null); setQuery(""); }} className="btn-secondary">Sign out</button>
        </div>

        {/* Code card */}
        <div className="border border-border-cream bg-near-black text-ivory p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-sans text-[0.65rem] tracking-[0.16em] uppercase text-warm-silver/70 mb-2">Your code — {me.discountRate}% off for fans</div>
            <div className="font-serif text-[2rem] tracking-[0.15em]">{me.code}</div>
          </div>
          <div className="text-right">
            <div className="font-sans text-[0.65rem] tracking-[0.16em] uppercase text-warm-silver/70 mb-2">You earn</div>
            <div className="font-serif text-[2rem]">{me.commissionRate}%</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <Stat label="Attributed Sales" value={money(stats.netSales)} />
          <Stat label="Orders" value={String(stats.attributed.length)} />
          <Stat label="Earned" value={money(stats.earned)} />
          <Stat label="Paid" value={money(stats.paid)} />
          <Stat label="Owed" value={money(stats.owed)} accent />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent orders */}
          <div>
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-4">Recent Sales</h2>
            {stats.attributed.length === 0 ? (
              <p className="font-sans text-[0.88rem] text-stone-gray">No attributed sales yet. Share your code to get started!</p>
            ) : (
              <div className="border border-border-cream bg-white divide-y divide-border-cream max-h-[360px] overflow-y-auto">
                {stats.attributed.slice(0, 30).map((o) => (
                  <div key={o.id} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <div className="font-sans text-[0.82rem] text-near-black">{o.id}</div>
                      <div className="font-sans text-[0.72rem] text-stone-gray">
                        {new Date(o.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-sans text-[0.82rem] text-near-black">{money(o.subtotal - (o.discount || 0))}</div>
                      <div className="font-sans text-[0.72rem] text-terracotta">+{money(((o.subtotal - (o.discount || 0)) * me.commissionRate) / 100)} comm.</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payout history + assets */}
          <div>
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-4">Payout History</h2>
            {stats.myPayouts.length === 0 ? (
              <p className="font-sans text-[0.88rem] text-stone-gray mb-8">No payouts yet. Payouts are issued on the {me.payDay}{me.payDay === 1 ? "st" : "th"} of each month.</p>
            ) : (
              <div className="border border-border-cream bg-white divide-y divide-border-cream mb-8">
                {stats.myPayouts.map((p) => (
                  <div key={p.id} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <div className="font-sans text-[0.82rem] text-near-black">{money(p.amount)}</div>
                      <div className="font-sans text-[0.72rem] text-stone-gray">{p.period}</div>
                    </div>
                    <div className="font-sans text-[0.72rem] text-stone-gray">
                      {new Date(p.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-4">Your Assets</h2>
            <div className="border border-border-cream bg-white p-5 space-y-3">
              <p className="font-sans text-[0.82rem] text-olive-gray">Ready-to-post caption:</p>
              <p className="font-sans text-[0.85rem] text-near-black bg-parchment/60 p-3 leading-relaxed">
                ☀️ My go-to sun-protective activewear from @luxesun — certified UPF 50+ and made to move. Use code <strong>{me.code}</strong> for {me.discountRate}% off. #luxesun #upf50
              </p>
              <a href="/collections" className="btn-secondary inline-block">Browse products to feature</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
