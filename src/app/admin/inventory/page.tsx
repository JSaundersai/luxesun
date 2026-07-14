"use client";

import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";
import { useProducts } from "@/context/ProductsProvider";
import { SIZES } from "@/lib/placeholder-data";

const LOW = 5;

export default function AdminInventoryPage() {
  const { products, updateProduct, resetProducts } = useProducts();

  const setStock = (id: string, size: string, value: string) => {
    const qty = Math.max(0, parseInt(value) || 0);
    const product = products.find((p) => p.id === id);
    if (!product) return;
    updateProduct(id, { stock: { ...(product.stock ?? {}), [size]: qty } });
  };

  const totalUnits = products.reduce(
    (s, p) => s + Object.values(p.stock ?? {}).reduce((a, b) => a + b, 0),
    0
  );
  const lowCount = products.reduce(
    (s, p) => s + Object.values(p.stock ?? {}).filter((v) => v > 0 && v <= LOW).length,
    0
  );
  const outCount = products.reduce(
    (s, p) => s + Object.values(p.stock ?? {}).filter((v) => v === 0).length,
    0
  );

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Inventory</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">
            {totalUnits} units on hand · <span className="text-terracotta">{lowCount} low</span> · <span className="text-stone-gray">{outCount} sold out</span>. Edits save instantly.
          </p>
        </div>
        <button
          onClick={() => { if (confirm("Reset catalog + stock to demo defaults?")) resetProducts(); }}
          className="btn-secondary"
        >
          Reset Demo Data
        </button>
      </div>

      <div className="border border-border-cream bg-white overflow-x-auto">
        <table className="w-full border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-border-cream text-left">
              <th className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3">Product</th>
              <th className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3">SKU</th>
              {SIZES.map((s) => (
                <th key={s} className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-3 py-3 text-center">{s}</th>
              ))}
              <th className="font-sans text-[0.62rem] font-medium tracking-[0.1em] uppercase text-stone-gray px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const total = Object.values(p.stock ?? {}).reduce((a, b) => a + b, 0);
              return (
                <tr key={p.id} className="border-b border-border-cream last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-12 bg-warm-sand overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="font-sans text-[0.84rem] text-near-black">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans text-[0.78rem] text-stone-gray whitespace-nowrap">{p.sku}</td>
                  {SIZES.map((size) => {
                    const qty = p.stock?.[size] ?? 0;
                    const state = qty === 0 ? "out" : qty <= LOW ? "low" : "ok";
                    return (
                      <td key={size} className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min={0}
                          value={qty}
                          onChange={(e) => setStock(p.id, size, e.target.value)}
                          className={`w-14 text-center border px-2 py-1.5 font-sans text-[0.82rem] focus:outline-none focus:border-near-black ${
                            state === "out"
                              ? "border-stone-gray/40 bg-stone-gray/10 text-stone-gray"
                              : state === "low"
                              ? "border-terracotta/50 bg-terracotta/5 text-terracotta"
                              : "border-border-warm bg-white text-near-black"
                          }`}
                        />
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center font-sans text-[0.85rem] text-near-black font-medium">{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-5 mt-4 font-sans text-[0.72rem] text-stone-gray">
        <span className="flex items-center gap-2"><span className="w-3 h-3 border border-terracotta/50 bg-terracotta/5 inline-block" /> Low (≤{LOW})</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 border border-stone-gray/40 bg-stone-gray/10 inline-block" /> Sold out</span>
      </div>
    </AdminShell>
  );
}
