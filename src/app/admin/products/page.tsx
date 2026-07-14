"use client";

import { useState } from "react";
import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";
import { useProducts, Product } from "@/context/ProductsProvider";
import { productTypes, sports, ProductColor } from "@/lib/placeholder-data";

const inputCls =
  "w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.9rem] focus:outline-none focus:border-near-black transition-colors";
const labelCls =
  "block font-sans text-[0.68rem] font-medium tracking-[0.1em] uppercase text-stone-gray mb-1.5";

const BADGES = ["", "New", "Bestseller", "Sale"];

interface FormState {
  name: string;
  category: string;
  subCategory: string;
  price: string;
  cost: string;
  originalPrice: string;
  badge: string;
  image: string;
  backImage: string;
  colors: ProductColor[];
}

function emptyForm(): FormState {
  return {
    name: "",
    category: productTypes[0],
    subCategory: sports[0],
    price: "",
    cost: "",
    originalPrice: "",
    badge: "",
    image: "",
    backImage: "",
    colors: [{ name: "Black", hex: "#141413" }],
  };
}

function productToForm(p: Product): FormState {
  return {
    name: p.name,
    category: p.category,
    subCategory: p.subCategory,
    price: String(p.price),
    cost: p.cost != null ? String(p.cost) : "",
    originalPrice: p.originalPrice ? String(p.originalPrice) : "",
    badge: p.badge ?? "",
    image: p.image,
    backImage: p.backImage ?? "",
    colors: p.colors.length ? p.colors : [{ name: "Black", hex: "#141413" }],
  };
}

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts, ready } =
    useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [error, setError] = useState("");

  const openNew = () => {
    setForm(emptyForm());
    setEditingId(null);
    setIsNew(true);
    setError("");
  };

  const openEdit = (p: Product) => {
    setForm(productToForm(p));
    setEditingId(p.id);
    setIsNew(false);
    setError("");
  };

  const closeEditor = () => {
    setEditingId(null);
    setIsNew(false);
  };

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const setColor = (i: number, key: keyof ProductColor, value: string) =>
    setForm((f) => ({
      ...f,
      colors: f.colors.map((c, idx) => (idx === i ? { ...c, [key]: value } : c)),
    }));

  const addColorRow = () =>
    setForm((f) => ({ ...f, colors: [...f.colors, { name: "", hex: "#cccccc" }] }));
  const removeColorRow = (i: number) =>
    setForm((f) => ({ ...f, colors: f.colors.filter((_, idx) => idx !== i) }));

  const save = () => {
    if (!form.name.trim()) return setError("Name is required.");
    const price = parseFloat(form.price);
    if (isNaN(price)) return setError("A valid price is required.");
    const colors = form.colors.filter((c) => c.name.trim());
    if (colors.length === 0) return setError("Add at least one colour.");

    const payload = {
      name: form.name.trim(),
      category: form.category,
      subCategory: form.subCategory,
      price,
      cost: form.cost ? parseFloat(form.cost) : undefined,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      badge: form.badge || undefined,
      image: form.image.trim() || "/placeholders/products/ace-crop-front.jpg",
      backImage: form.backImage.trim() || undefined,
      colors,
    };

    if (isNew) addProduct(payload);
    else if (editingId) updateProduct(editingId, payload);
    closeEditor();
  };

  const editorOpen = isNew || editingId !== null;

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Products</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">
            {products.length} product{products.length === 1 ? "" : "s"} · changes save
            instantly to the storefront (demo store).
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (confirm("Reset the catalog to the original demo products?"))
                resetProducts();
            }}
            className="btn-secondary"
          >
            Reset Demo Data
          </button>
          <button onClick={openNew} className="btn-primary">+ Add Product</button>
        </div>
      </div>

      {editorOpen && (
        <div className="border border-border-warm bg-white p-6 mb-10">
          <h2 className="font-sans text-[0.85rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
            {isNew ? "New Product" : "Edit Product"}
          </h2>

          {error && (
            <div className="border border-terracotta/40 bg-terracotta/5 text-terracotta px-4 py-2 mb-5 font-sans text-[0.85rem]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Name</label>
              <input value={form.name} onChange={set("name")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category (type)</label>
              <select value={form.category} onChange={set("category")} className={inputCls}>
                {productTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sport</label>
              <select value={form.subCategory} onChange={set("subCategory")} className={inputCls}>
                {sports.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Price ($)</label>
              <input value={form.price} onChange={set("price")} className={inputCls} inputMode="decimal" />
            </div>
            <div>
              <label className={labelCls}>Unit cost / COGS ($)</label>
              <input value={form.cost} onChange={set("cost")} className={inputCls} inputMode="decimal" placeholder="e.g. 34" />
            </div>
            <div>
              <label className={labelCls}>Original Price ($, optional)</label>
              <input value={form.originalPrice} onChange={set("originalPrice")} className={inputCls} inputMode="decimal" />
            </div>
            <div>
              <label className={labelCls}>Badge</label>
              <select value={form.badge} onChange={set("badge")} className={inputCls}>
                {BADGES.map((b) => (
                  <option key={b} value={b}>{b || "None"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Front image URL</label>
              <input value={form.image} onChange={set("image")} className={inputCls} placeholder="/placeholders/products/…" />
            </div>
            <div>
              <label className={labelCls}>Back image URL (optional)</label>
              <input value={form.backImage} onChange={set("backImage")} className={inputCls} placeholder="/placeholders/products/…" />
            </div>
          </div>

          <div className="mt-5">
            <label className={labelCls}>Colours</label>
            <div className="space-y-2">
              {form.colors.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => setColor(i, "hex", e.target.value)}
                    className="w-10 h-10 border border-border-warm bg-white cursor-pointer"
                    aria-label="Colour swatch"
                  />
                  <input
                    value={c.name}
                    onChange={(e) => setColor(i, "name", e.target.value)}
                    className={inputCls}
                    placeholder="Colour name"
                  />
                  <input
                    value={c.hex}
                    onChange={(e) => setColor(i, "hex", e.target.value)}
                    className={`${inputCls} max-w-[120px]`}
                    placeholder="#141413"
                  />
                  <button
                    onClick={() => removeColorRow(i)}
                    aria-label="Remove colour"
                    className="text-stone-gray hover:text-terracotta shrink-0 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addColorRow}
              className="mt-3 font-sans text-[0.75rem] tracking-[0.08em] uppercase text-terracotta hover:text-near-black"
            >
              + Add Colour
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={save} className="btn-primary">
              {isNew ? "Create Product" : "Save Changes"}
            </button>
            <button onClick={closeEditor} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="border border-border-cream bg-white overflow-x-auto">
        <table className="w-full border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-border-cream text-left">
              {["", "Product", "Category", "Price", "Cost", "Margin", "Badge", ""].map((h, i) => (
                <th key={i} className="font-sans text-[0.65rem] font-medium tracking-[0.12em] uppercase text-stone-gray px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ready && products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center font-sans text-stone-gray">
                  No products. Add one to get started.
                </td>
              </tr>
            )}
            {products.map((p) => {
              const cost = p.cost ?? Math.round(p.price * 0.42);
              const margin = p.price > 0 ? Math.round(((p.price - cost) / p.price) * 100) : 0;
              return (
                <tr key={p.id} className="border-b border-border-cream last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-14 bg-warm-sand overflow-hidden">
                      <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans text-[0.88rem] text-near-black">{p.name}</td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-olive-gray">{p.category}</td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-near-black">
                    ${p.price}
                    {p.originalPrice && (
                      <span className="line-through text-stone-gray ml-1">${p.originalPrice}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-olive-gray">${cost}</td>
                  <td className="px-4 py-3 font-sans text-[0.82rem] text-olive-gray">{margin}%</td>
                  <td className="px-4 py-3">
                    {p.badge && (
                      <span className="font-sans text-[0.62rem] tracking-[0.1em] uppercase text-terracotta">
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(p)}
                      className="font-sans text-[0.75rem] tracking-[0.08em] uppercase text-near-black hover:text-terracotta mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                      }}
                      className="font-sans text-[0.75rem] tracking-[0.08em] uppercase text-stone-gray hover:text-terracotta"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
