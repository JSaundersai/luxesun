"use client";

import { useState, Fragment } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAnalytics } from "@/context/AnalyticsProvider";
import { useEmails } from "@/context/EmailsProvider";

const money = (n: number) => `$${n.toFixed(2)}`;

const STATUSES = ["Processing", "Fulfilled", "Shipped", "Delivered", "Refunded"];

const statusColor: Record<string, string> = {
  Processing: "bg-warm-sand text-near-black",
  Fulfilled: "bg-olive-gray/20 text-olive-gray",
  Shipped: "bg-terracotta/15 text-terracotta",
  Delivered: "bg-olive-gray/25 text-near-black",
  Refunded: "bg-stone-gray/20 text-stone-gray",
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, seedDemo } = useAnalytics();
  const { logEmail } = useEmails();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const changeStatus = (orderId: string, status: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    updateOrderStatus(orderId, status);

    // Fire the matching customer email.
    if (status === "Shipped") {
      logEmail("shipping_confirmation", order.email, {
        id: order.id,
        items: order.items.map((i) => ({ name: i.name, qty: i.qty, price: i.price, size: i.size, color: i.color })),
        tracking: `AU${Math.floor(Math.random() * 1e10)}`,
        carrier: "Australia Post",
      });
    } else if (status === "Delivered") {
      logEmail("delivery_confirmation", order.email, { id: order.id });
      if (order.items[0]) {
        logEmail("review_request", order.email, {
          product: order.items[0].name,
          handle: order.items[0].handle,
        });
      }
    } else if (status === "Refunded") {
      logEmail("refund_confirmation", order.email, { id: order.id, amount: order.total });
    }
  };

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Orders</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">
            {orders.length} order{orders.length === 1 ? "" : "s"} · status changes email the customer automatically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border-warm bg-white px-3 py-2 font-sans text-[0.85rem]"
          >
            {["All", ...STATUSES].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="border border-border-cream bg-white p-12 text-center">
          <p className="font-serif text-2xl text-near-black mb-2">No orders yet</p>
          <p className="font-sans text-[0.9rem] text-stone-gray mb-6">
            Orders placed on the storefront appear here. Generate sample data to explore.
          </p>
          <button onClick={() => seedDemo([])} className="btn-secondary">Generate Sample Data</button>
          <p className="font-sans text-[0.72rem] text-stone-gray mt-3">
            (Tip: seed from the Overview tab so orders include product line items.)
          </p>
        </div>
      ) : (
        <div className="border border-border-cream bg-white overflow-x-auto">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr className="border-b border-border-cream text-left">
                {["Order", "Date", "Customer", "Items", "Total", "GST", "Status", ""].map((h, i) => (
                  <th key={i} className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <Fragment key={o.id}>
                  <tr className="border-b border-border-cream last:border-0">
                    <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black whitespace-nowrap">{o.id}</td>
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-olive-gray whitespace-nowrap">
                      {new Date(o.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-olive-gray max-w-[180px] truncate">{o.email}</td>
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-olive-gray">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                    <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">{money(o.total)}</td>
                    <td className="px-4 py-3 font-sans text-[0.8rem] text-stone-gray">{money(o.total / 11)}</td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-[0.62rem] tracking-[0.08em] uppercase px-2 py-1 ${statusColor[o.status] || "bg-warm-sand text-near-black"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                        className="font-sans text-[0.74rem] tracking-[0.08em] uppercase text-near-black hover:text-terracotta"
                      >
                        {expanded === o.id ? "Close" : "View"}
                      </button>
                    </td>
                  </tr>
                  {expanded === o.id && (
                    <tr className="bg-parchment/60">
                      <td colSpan={8} className="px-4 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <div className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-stone-gray mb-3">Line items</div>
                            <div className="space-y-2">
                              {o.items.map((i) => (
                                <div key={i.lineId} className="flex justify-between font-sans text-[0.82rem]">
                                  <span className="text-near-black">{i.name} <span className="text-stone-gray">· {i.color} · {i.size} · Qty {i.qty}</span></span>
                                  <span className="text-near-black">{money(i.price * i.qty)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-border-cream space-y-1 font-sans text-[0.82rem] max-w-[280px]">
                              <div className="flex justify-between text-olive-gray"><span>Subtotal</span><span>{money(o.subtotal)}</span></div>
                              {o.discount > 0 && <div className="flex justify-between text-terracotta"><span>Discount {o.discountCode ? `(${o.discountCode})` : ""}</span><span>−{money(o.discount)}</span></div>}
                              <div className="flex justify-between text-olive-gray"><span>Shipping</span><span>{o.shipping === 0 ? "Free" : money(o.shipping)}</span></div>
                              <div className="flex justify-between text-near-black font-medium"><span>Total</span><span>{money(o.total)}</span></div>
                              <div className="flex justify-between text-stone-gray text-[0.75rem]"><span>GST incl.</span><span>{money(o.total / 11)}</span></div>
                            </div>
                          </div>
                          <div>
                            <div className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-stone-gray mb-3">Ship to</div>
                            <p className="font-sans text-[0.82rem] text-near-black mb-4">{o.shipTo || "—"}</p>
                            <div className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-stone-gray mb-2">Update status</div>
                            <select
                              value={o.status}
                              onChange={(e) => changeStatus(o.id, e.target.value)}
                              className="w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.85rem]"
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <p className="font-sans text-[0.7rem] text-stone-gray mt-2">
                              Shipped/Delivered/Refunded trigger a customer email.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
