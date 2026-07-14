"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAnalytics } from "@/context/AnalyticsProvider";

const money = (n: number) => `$${n.toFixed(2)}`;

interface StoredUser {
  id: string;
  name: string;
  email: string;
  addresses?: unknown[];
}

export default function AdminCustomersPage() {
  const { orders } = useAnalytics();
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    try {
      setUsers(JSON.parse(localStorage.getItem("luxe_users_v1") || "[]"));
    } catch {
      setUsers([]);
    }
  }, []);

  const rows = useMemo(() => {
    // Aggregate order stats by email.
    const byEmail = new Map<
      string,
      { orders: number; spend: number; last: string }
    >();
    orders.forEach((o) => {
      const key = o.email.toLowerCase();
      const cur = byEmail.get(key) || { orders: 0, spend: 0, last: o.date };
      cur.orders += 1;
      cur.spend += o.total;
      if (o.date > cur.last) cur.last = o.date;
      byEmail.set(key, cur);
    });

    // Registered users first, then guest emails that ordered but aren't registered.
    const registeredEmails = new Set(users.map((u) => u.email.toLowerCase()));
    const registered = users.map((u) => {
      const stats = byEmail.get(u.email.toLowerCase());
      return {
        name: u.name,
        email: u.email,
        registered: true,
        orders: stats?.orders ?? 0,
        spend: stats?.spend ?? 0,
        last: stats?.last,
      };
    });
    const guests = Array.from(byEmail.entries())
      .filter(([email]) => !registeredEmails.has(email))
      .map(([email, stats]) => ({
        name: "Guest",
        email,
        registered: false,
        orders: stats.orders,
        spend: stats.spend,
        last: stats.last,
      }));

    return [...registered, ...guests].sort((a, b) => b.spend - a.spend);
  }, [orders, users]);

  const registeredCount = users.length;
  const totalSpend = rows.reduce((s, r) => s + r.spend, 0);

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Customers</h1>
        <p className="font-sans text-[0.85rem] text-stone-gray">
          {registeredCount} registered · {rows.length} total with orders · {money(totalSpend)} lifetime revenue.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="border border-border-cream bg-white p-12 text-center">
          <p className="font-serif text-2xl text-near-black mb-2">No customers yet</p>
          <p className="font-sans text-[0.9rem] text-stone-gray">
            Registered accounts and anyone who places an order will show up here.
          </p>
        </div>
      ) : (
        <div className="border border-border-cream bg-white overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border-cream text-left">
                {["Customer", "Email", "Type", "Orders", "Lifetime Spend", "Last Order"].map((h, i) => (
                  <th key={i} className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-b border-border-cream last:border-0">
                  <td className="px-4 py-3 font-sans text-[0.85rem] text-near-black">{r.name}</td>
                  <td className="px-4 py-3 font-sans text-[0.8rem] text-olive-gray">{r.email}</td>
                  <td className="px-4 py-3">
                    <span className={`font-sans text-[0.62rem] tracking-[0.08em] uppercase px-2 py-1 ${r.registered ? "bg-olive-gray/20 text-olive-gray" : "bg-warm-sand text-stone-gray"}`}>
                      {r.registered ? "Registered" : "Guest"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">{r.orders}</td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">{money(r.spend)}</td>
                  <td className="px-4 py-3 font-sans text-[0.8rem] text-stone-gray">
                    {r.last ? new Date(r.last).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
