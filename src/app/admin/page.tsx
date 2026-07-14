"use client";

import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAnalytics } from "@/context/AnalyticsProvider";
import { useProducts } from "@/context/ProductsProvider";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
  { label: "All time", days: 3650 },
];

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-border-cream bg-white p-5">
      <div className="font-sans text-[0.62rem] font-medium tracking-[0.16em] uppercase text-stone-gray mb-2">{label}</div>
      <div className="font-serif text-[1.9rem] leading-none text-near-black">{value}</div>
      {sub && <div className="font-sans text-[0.72rem] text-olive-gray mt-2">{sub}</div>}
    </div>
  );
}

export default function AdminOverviewPage() {
  const { orders, influencers, metrics, signupCount, seedDemo, resetAnalytics } = useAnalytics();
  const { products } = useProducts();
  const [rangeDays, setRangeDays] = useState(30);

  const stats = useMemo(() => {
    const cutoff = Date.now() - rangeDays * 86400000;
    const inRange = orders.filter((o) => new Date(o.date).getTime() >= cutoff);

    // Refunded orders are tracked separately and excluded from sales/profit.
    const refunded = inRange.filter((o) => o.status === "Refunded");
    const active = inRange.filter((o) => o.status !== "Refunded");
    const refunds = refunded.reduce((s, o) => s + o.total, 0);

    const grossSales = active.reduce((s, o) => s + o.subtotal, 0);
    const discounts = active.reduce((s, o) => s + (o.discount || 0), 0);
    const shipping = active.reduce((s, o) => s + o.shipping, 0);
    const cogs = active.reduce((s, o) => s + (o.cogs || 0), 0);
    const revenue = active.reduce((s, o) => s + o.total, 0);
    const gst = revenue / 11;
    const netSales = grossSales - discounts;

    const infMap = new Map(influencers.map((i) => [i.id, i]));
    const commissions = active.reduce((s, o) => {
      if (!o.influencerId) return s;
      const inf = infMap.get(o.influencerId);
      if (!inf) return s;
      return s + ((o.subtotal - (o.discount || 0)) * inf.commissionRate) / 100;
    }, 0);

    const grossProfit = netSales - cogs;
    const netProfit = grossProfit - commissions;
    const aov = active.length ? netSales / active.length : 0;
    const conversion = metrics.views ? (active.length / metrics.views) * 100 : 0;

    // Repeat-customer rate across all-time orders (by email).
    const ordersByEmail = new Map<string, number>();
    orders.filter((o) => o.status !== "Refunded").forEach((o) => {
      const k = o.email.toLowerCase();
      ordersByEmail.set(k, (ordersByEmail.get(k) || 0) + 1);
    });
    const totalCustomers = ordersByEmail.size;
    const repeatCustomers = Array.from(ordersByEmail.values()).filter((n) => n > 1).length;
    const repeatRate = totalCustomers ? (repeatCustomers / totalCustomers) * 100 : 0;

    // Sales series across the selected range (capped at 30 bars for readability).
    const barDays = Math.min(rangeDays, 30);
    const days: { label: string; value: number }[] = [];
    for (let d = barDays - 1; d >= 0; d--) {
      const day = new Date();
      day.setDate(day.getDate() - d);
      const key = day.toISOString().slice(0, 10);
      const value = active.filter((o) => o.date.slice(0, 10) === key).reduce((s, o) => s + o.total, 0);
      days.push({ label: day.toLocaleDateString("en-US", { day: "numeric" }), value });
    }

    const prodRev = new Map<string, number>();
    active.forEach((o) => o.items.forEach((it) => prodRev.set(it.name, (prodRev.get(it.name) || 0) + it.price * it.qty)));
    const topProducts = Array.from(prodRev.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return {
      count: active.length, grossSales, discounts, shipping, cogs, revenue, gst, netSales,
      commissions, grossProfit, netProfit, aov, conversion, refunds, refundedCount: refunded.length,
      repeatRate, days, topProducts,
    };
  }, [orders, influencers, metrics.views, rangeDays]);

  const maxDay = Math.max(1, ...stats.days.map((d) => d.value));
  const maxProd = Math.max(1, ...stats.topProducts.map((p) => p[1]));

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Overview</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">Store performance (demo data).</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { if (confirm("Clear all order/analytics data?")) resetAnalytics(); }} className="btn-secondary">Clear Data</button>
          <button onClick={() => seedDemo(products)} className="btn-primary">Generate Sample Data</button>
        </div>
      </div>

      {/* Range selector */}
      <div className="flex gap-2 mb-8">
        {RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => setRangeDays(r.days)}
            className={`px-4 py-2 font-sans text-[0.75rem] tracking-[0.08em] uppercase border transition-colors ${
              rangeDays === r.days ? "bg-near-black text-ivory border-near-black" : "border-border-warm text-near-black hover:border-near-black"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="border border-border-cream bg-white p-12 text-center">
          <p className="font-serif text-2xl text-near-black mb-2">No sales data yet</p>
          <p className="font-sans text-[0.9rem] text-stone-gray mb-6">
            Place an order on the storefront, or generate sample data to populate the dashboard.
          </p>
          <button onClick={() => seedDemo(products)} className="btn-primary">Generate Sample Data</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KpiCard label="Total Sales" value={money(stats.revenue)} sub={`${stats.count} orders`} />
            <KpiCard label="Gross Profit" value={money(stats.grossProfit)} sub={`after ${money(stats.cogs)} COGS`} />
            <KpiCard label="Avg Order Value" value={money(stats.aov)} sub="net of discounts" />
            <KpiCard label="Store Views" value={metrics.views.toLocaleString()} sub="sessions" />
            <KpiCard label="Conversion Rate" value={`${stats.conversion.toFixed(1)}%`} sub="orders ÷ views" />
            <KpiCard label="Repeat Customers" value={`${stats.repeatRate.toFixed(0)}%`} sub="ordered more than once" />
            <KpiCard label="New Signups" value={signupCount.toLocaleString()} sub="registered customers" />
            <KpiCard label="Refunds" value={money(stats.refunds)} sub={`${stats.refundedCount} refunded`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 border border-border-cream bg-white p-6">
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-6">
                Sales — Last {Math.min(rangeDays, 30)} Days
              </h2>
              <div className="flex items-end gap-2 h-44">
                {stats.days.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-full bg-terracotta/80 hover:bg-terracotta transition-colors rounded-t" style={{ height: `${(d.value / maxDay) * 100}%` }} title={money(d.value)} />
                    <span className="font-sans text-[0.55rem] text-stone-gray mt-2">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border-cream bg-white p-6">
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-6">Profit &amp; Cashflow</h2>
              <dl className="space-y-3 font-sans text-[0.88rem]">
                <div className="flex justify-between"><dt className="text-olive-gray">Gross sales</dt><dd className="text-near-black">{money(stats.grossSales)}</dd></div>
                <div className="flex justify-between"><dt className="text-olive-gray">Discounts</dt><dd className="text-terracotta">−{money(stats.discounts)}</dd></div>
                <div className="flex justify-between"><dt className="text-olive-gray">Shipping</dt><dd className="text-near-black">+{money(stats.shipping)}</dd></div>
                <div className="flex justify-between border-t border-border-cream pt-3"><dt className="text-olive-gray">Net revenue</dt><dd className="text-near-black font-medium">{money(stats.revenue)}</dd></div>
                <div className="flex justify-between"><dt className="text-olive-gray">GST included</dt><dd className="text-stone-gray">{money(stats.gst)}</dd></div>
                <div className="flex justify-between"><dt className="text-olive-gray">Cost of goods</dt><dd className="text-terracotta">−{money(stats.cogs)}</dd></div>
                <div className="flex justify-between"><dt className="text-olive-gray">Commissions</dt><dd className="text-terracotta">−{money(stats.commissions)}</dd></div>
                <div className="flex justify-between border-t border-near-black/20 pt-3"><dt className="text-near-black font-medium">Net profit</dt><dd className="text-near-black font-medium">{money(stats.netProfit)}</dd></div>
              </dl>
            </div>
          </div>

          <div className="border border-border-cream bg-white p-6">
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-6">Top Products by Revenue</h2>
            {stats.topProducts.length === 0 ? (
              <p className="font-sans text-[0.88rem] text-stone-gray">No sales in this range.</p>
            ) : (
              <div className="space-y-4">
                {stats.topProducts.map(([name, rev]) => (
                  <div key={name}>
                    <div className="flex justify-between font-sans text-[0.82rem] mb-1">
                      <span className="text-near-black">{name}</span>
                      <span className="text-olive-gray">{money(rev)}</span>
                    </div>
                    <div className="h-2 bg-warm-sand rounded overflow-hidden">
                      <div className="h-full bg-olive-gray" style={{ width: `${(rev / maxProd) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AdminShell>
  );
}
