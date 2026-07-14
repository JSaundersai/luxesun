"use client";

import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAnalytics, Influencer } from "@/context/AnalyticsProvider";
import { useEmails } from "@/context/EmailsProvider";

const money = (n: number) => `$${n.toFixed(2)}`;

const inputCls =
  "w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.9rem] focus:outline-none focus:border-near-black transition-colors";
const labelCls =
  "block font-sans text-[0.68rem] font-medium tracking-[0.1em] uppercase text-stone-gray mb-1.5";

interface FormState {
  name: string;
  email: string;
  code: string;
  discountRate: string;
  commissionRate: string;
  payDay: string;
  status: "active" | "paused";
}

function emptyForm(): FormState {
  return { name: "", email: "", code: "", discountRate: "10", commissionRate: "10", payDay: "1", status: "active" };
}

function nextPayDate(payDay: number): string {
  const now = new Date();
  let d = new Date(now.getFullYear(), now.getMonth(), payDay);
  if (d <= now) d = new Date(now.getFullYear(), now.getMonth() + 1, payDay);
  return d.toLocaleDateString("en-AU", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminInfluencersPage() {
  const {
    influencers,
    orders,
    payouts,
    addInfluencer,
    updateInfluencer,
    deleteInfluencer,
    recordPayout,
  } = useAnalytics();
  const { logEmail } = useEmails();

  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [k]: value };
      if ((k === "name" || k === "discountRate") && !editingId) {
        const base = (k === "name" ? value : f.name).split(" ")[0].toUpperCase().replace(/[^A-Z0-9]/g, "");
        const pct = k === "discountRate" ? value : f.discountRate;
        if (base) next.code = `${base}${pct}`;
      }
      return next;
    });
  };

  const openNew = () => { setForm(emptyForm()); setEditingId(null); setOpen(true); setError(""); };
  const openEdit = (inf: Influencer) => {
    setForm({
      name: inf.name, email: inf.email, code: inf.code,
      discountRate: String(inf.discountRate), commissionRate: String(inf.commissionRate),
      payDay: String(inf.payDay), status: inf.status,
    });
    setEditingId(inf.id); setOpen(true); setError("");
  };

  const save = () => {
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.code.trim()) return setError("A discount code is required.");
    const dup = influencers.find(
      (i) => i.code.toLowerCase() === form.code.trim().toLowerCase() && i.id !== editingId
    );
    if (dup) return setError("That code is already in use.");

    const payload = {
      name: form.name.trim(), email: form.email.trim(), code: form.code.trim().toUpperCase(),
      discountRate: parseFloat(form.discountRate) || 0,
      commissionRate: parseFloat(form.commissionRate) || 0,
      payDay: Math.min(28, Math.max(1, parseInt(form.payDay) || 1)),
      status: form.status,
    };
    if (editingId) updateInfluencer(editingId, payload);
    else {
      addInfluencer(payload);
      if (payload.email) {
        logEmail("influencer_welcome", payload.email, {
          name: payload.name, code: payload.code,
          discountRate: payload.discountRate, commissionRate: payload.commissionRate,
        });
      }
    }
    setOpen(false);
  };

  const rows = useMemo(() => {
    return influencers.map((inf) => {
      const attributed = orders.filter((o) => o.influencerId === inf.id);
      const netSales = attributed.reduce((s, o) => s + (o.subtotal - (o.discount || 0)), 0);
      const cogs = attributed.reduce((s, o) => s + (o.cogs || 0), 0);
      const earned = (netSales * inf.commissionRate) / 100;
      const paid = payouts.filter((p) => p.influencerId === inf.id).reduce((s, p) => s + p.amount, 0);
      const owed = Math.max(0, earned - paid);
      return { inf, orders: attributed.length, netSales, cogs, earned, paid, owed, payDate: nextPayDate(inf.payDay) };
    });
  }, [influencers, orders, payouts]);

  const pay = (inf: Influencer, owed: number) => {
    if (owed <= 0) return;
    const period = `to ${new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}`;
    recordPayout({ influencerId: inf.id, amount: owed, period });
    if (inf.email) {
      logEmail("influencer_payout", inf.email, { name: inf.name, amount: owed, period });
    }
  };

  const influencerName = (id: string) => influencers.find((i) => i.id === id)?.name ?? "—";

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Influencers</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">
            Custom discount codes, attributed sales, commission and payout ledger.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">+ Add Influencer</button>
      </div>

      {open && (
        <div className="border border-border-warm bg-white p-6 mb-10">
          <h2 className="font-sans text-[0.85rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
            {editingId ? "Edit Influencer" : "New Influencer"}
          </h2>
          {error && (
            <div className="border border-terracotta/40 bg-terracotta/5 text-terracotta px-4 py-2 mb-5 font-sans text-[0.85rem]">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Name</label><input value={form.name} onChange={set("name")} className={inputCls} placeholder="Maya Rivera" /></div>
            <div><label className={labelCls}>Email</label><input value={form.email} onChange={set("email")} className={inputCls} placeholder="maya@creator.com" /></div>
            <div><label className={labelCls}>Discount code</label><input value={form.code} onChange={set("code")} className={inputCls} placeholder="MAYA15" /></div>
            <div><label className={labelCls}>Status</label>
              <select value={form.status} onChange={set("status")} className={inputCls}>
                <option value="active">Active</option><option value="paused">Paused</option>
              </select>
            </div>
            <div><label className={labelCls}>Fan discount (%)</label><input value={form.discountRate} onChange={set("discountRate")} className={inputCls} inputMode="decimal" /></div>
            <div><label className={labelCls}>Commission (%)</label><input value={form.commissionRate} onChange={set("commissionRate")} className={inputCls} inputMode="decimal" /></div>
            <div><label className={labelCls}>Payout day of month (1–28)</label><input value={form.payDay} onChange={set("payDay")} className={inputCls} inputMode="numeric" /></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={save} className="btn-primary">{editingId ? "Save Changes" : "Create Influencer"}</button>
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
          </div>
          {!editingId && (
            <p className="font-sans text-[0.72rem] text-stone-gray mt-3">A welcome email with their code is logged automatically.</p>
          )}
        </div>
      )}

      {influencers.length === 0 ? (
        <div className="border border-border-cream bg-white p-12 text-center">
          <p className="font-serif text-2xl text-near-black mb-2">No influencers yet</p>
          <p className="font-sans text-[0.9rem] text-stone-gray mb-6">Add a creator and give them a code to start tracking attributed sales.</p>
          <button onClick={openNew} className="btn-primary">+ Add Influencer</button>
        </div>
      ) : (
        <div className="border border-border-cream bg-white overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-border-cream text-left">
                {["Influencer", "Code", "Disc/Comm", "Orders", "Sales", "Earned", "Paid", "Owed", "Next Payout", ""].map((h, i) => (
                  <th key={i} className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-3 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ inf, orders: cnt, netSales, earned, paid, owed, payDate }) => (
                <tr key={inf.id} className="border-b border-border-cream last:border-0">
                  <td className="px-3 py-3">
                    <div className="font-sans text-[0.85rem] text-near-black">{inf.name}</div>
                    <div className="font-sans text-[0.72rem] text-stone-gray">{inf.email || "—"}</div>
                  </td>
                  <td className="px-3 py-3"><span className="font-sans text-[0.78rem] tracking-[0.05em] bg-warm-sand px-2 py-1 text-near-black">{inf.code}</span></td>
                  <td className="px-3 py-3 font-sans text-[0.8rem] text-olive-gray">{inf.discountRate}% / {inf.commissionRate}%</td>
                  <td className="px-3 py-3 font-sans text-[0.82rem] text-near-black">{cnt}</td>
                  <td className="px-3 py-3 font-sans text-[0.82rem] text-near-black">{money(netSales)}</td>
                  <td className="px-3 py-3 font-sans text-[0.82rem] text-olive-gray">{money(earned)}</td>
                  <td className="px-3 py-3 font-sans text-[0.82rem] text-olive-gray">{money(paid)}</td>
                  <td className="px-3 py-3 font-sans text-[0.82rem] text-terracotta font-medium">{money(owed)}</td>
                  <td className="px-3 py-3 font-sans text-[0.78rem] text-olive-gray whitespace-nowrap">{payDate}</td>
                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => pay(inf, owed)}
                      disabled={owed <= 0}
                      className={`font-sans text-[0.72rem] tracking-[0.08em] uppercase mr-3 ${owed > 0 ? "text-olive-gray hover:text-near-black" : "text-stone-gray/40 cursor-not-allowed"}`}
                    >
                      Pay
                    </button>
                    <button onClick={() => openEdit(inf)} className="font-sans text-[0.72rem] tracking-[0.08em] uppercase text-near-black hover:text-terracotta mr-3">Edit</button>
                    <button
                      onClick={() => { if (confirm(`Remove ${inf.name}?`)) deleteInfluencer(inf.id); }}
                      className="font-sans text-[0.72rem] tracking-[0.08em] uppercase text-stone-gray hover:text-terracotta"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payout history */}
      {payouts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-4">
            Payout History ({payouts.length})
          </h2>
          <div className="border border-border-cream bg-white overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-border-cream text-left">
                  {["Date", "Influencer", "Period", "Amount"].map((h, i) => (
                    <th key={i} className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b border-border-cream last:border-0">
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-olive-gray whitespace-nowrap">
                      {new Date(p.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">{influencerName(p.influencerId)}</td>
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-stone-gray">{p.period}</td>
                    <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">{money(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
