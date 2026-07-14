"use client";

import { useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth, Address } from "@/context/AuthProvider";
import { useEmails } from "@/context/EmailsProvider";
import { slugify } from "@/lib/placeholder-data";

const inputCls =
  "w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors";
const labelCls =
  "block font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-stone-gray mb-2";

function AuthForms() {
  const { login, register } = useAuth();
  const { logEmail } = useEmails();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res =
      mode === "login" ? login(email, password) : register(name, email, password);
    if (!res.ok) setError(res.error ?? "Something went wrong.");
    else if (mode === "register")
      logEmail("welcome", email.trim().toLowerCase(), { name, email });
  };

  return (
    <div className="max-w-[460px] mx-auto px-6 py-16 md:py-24 min-h-[55vh]">
      <div className="flex border border-border-warm mb-8">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setError("");
            }}
            className={`flex-1 py-3 font-sans text-[0.75rem] tracking-[0.12em] uppercase transition-colors ${
              mode === m ? "bg-near-black text-ivory" : "text-near-black hover:bg-warm-sand"
            }`}
          >
            {m === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <h1 className="font-serif text-[2.2rem] font-medium text-near-black mb-2 text-center">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="font-sans text-[0.9rem] text-stone-gray text-center mb-8">
        {mode === "login"
          ? "Sign in to view orders and saved details."
          : "Save your details for faster checkout."}
      </p>

      {error && (
        <div className="border border-terracotta/40 bg-terracotta/5 text-terracotta px-4 py-3 mb-6 font-sans text-[0.85rem]">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={submit}>
        {mode === "register" && (
          <div>
            <label className={labelCls}>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jordan Ellis" />
          </div>
        )}
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-primary w-full text-center">
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-10">
        <Link href="/" className="font-sans text-[0.8rem] text-stone-gray no-underline hover:text-near-black">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

const EMPTY_ADDRESS: Omit<Address, "id"> = {
  label: "Home",
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postcode: "",
  country: "Australia",
  phone: "",
  isDefault: false,
};

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<Address, "id">;
  onSave: (a: Omit<Address, "id">) => void;
  onCancel: () => void;
}) {
  const [a, setA] = useState(initial);
  const set = (k: keyof typeof a) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setA((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="border border-border-cream p-6 bg-ivory">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Label</label>
          <input value={a.label} onChange={set("label")} className={inputCls} placeholder="Home / Work" />
        </div>
        <div>
          <label className={labelCls}>Full name</label>
          <input value={a.name} onChange={set("name")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address</label>
          <input value={a.line1} onChange={set("line1")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>City</label>
          <input value={a.city} onChange={set("city")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>State</label>
          <input value={a.state} onChange={set("state")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Postcode</label>
          <input value={a.postcode} onChange={set("postcode")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <input value={a.country} onChange={set("country")} className={inputCls} />
        </div>
      </div>
      <label className="flex items-center gap-2 mt-4 font-sans text-[0.85rem] text-near-black">
        <input
          type="checkbox"
          checked={!!a.isDefault}
          onChange={(e) => setA((prev) => ({ ...prev, isDefault: e.target.checked }))}
          className="accent-terracotta"
        />
        Set as default
      </label>
      <div className="flex gap-3 mt-5">
        <button onClick={() => onSave(a)} className="btn-primary">Save Address</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, logout, updateProfile, addAddress, deleteAddress, updateAddress } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [addingAddress, setAddingAddress] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-14 md:py-20 min-h-[55vh]">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-medium text-near-black">
            Hi, {user.name.split(" ")[0]}
          </h1>
          <p className="font-sans text-[0.9rem] text-stone-gray">{user.email}</p>
        </div>
        <button onClick={logout} className="btn-secondary">Sign Out</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Profile */}
        <section className="border border-border-cream p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black">
              Account Details
            </h2>
            {!editingProfile && (
              <button onClick={() => setEditingProfile(true)} className="font-sans text-[0.75rem] tracking-[0.08em] uppercase text-terracotta hover:text-near-black">
                Edit
              </button>
            )}
          </div>
          {editingProfile ? (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    updateProfile({ name, email });
                    setEditingProfile(false);
                  }}
                  className="btn-primary"
                >
                  Save
                </button>
                <button onClick={() => setEditingProfile(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="font-sans text-[0.9rem] text-olive-gray space-y-1">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          )}
        </section>

        {/* Addresses */}
        <section className="border border-border-cream p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black">
              Saved Addresses
            </h2>
            {!addingAddress && (
              <button onClick={() => setAddingAddress(true)} className="font-sans text-[0.75rem] tracking-[0.08em] uppercase text-terracotta hover:text-near-black">
                + Add
              </button>
            )}
          </div>

          {addingAddress && (
            <div className="mb-6">
              <AddressForm
                initial={EMPTY_ADDRESS}
                onSave={(a) => {
                  addAddress(a);
                  setAddingAddress(false);
                }}
                onCancel={() => setAddingAddress(false)}
              />
            </div>
          )}

          {user.addresses.length === 0 && !addingAddress ? (
            <p className="font-sans text-[0.9rem] text-stone-gray">
              No saved addresses yet.
            </p>
          ) : (
            <div className="space-y-4">
              {user.addresses.map((a) => (
                <div key={a.id} className="border border-border-cream p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-[0.8rem] font-medium text-near-black">
                      {a.label}
                      {a.isDefault && (
                        <span className="ml-2 text-[0.65rem] tracking-[0.1em] uppercase text-terracotta">Default</span>
                      )}
                    </span>
                    <div className="flex gap-3">
                      {!a.isDefault && (
                        <button
                          onClick={() => updateAddress(a.id, { isDefault: true })}
                          className="font-sans text-[0.72rem] uppercase tracking-[0.08em] text-stone-gray hover:text-near-black"
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteAddress(a.id)}
                        className="font-sans text-[0.72rem] uppercase tracking-[0.08em] text-stone-gray hover:text-terracotta"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-sans text-[0.85rem] text-olive-gray">
                    {a.name}, {a.line1}, {a.city} {a.state} {a.postcode}, {a.country}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Orders */}
      <section className="border border-border-cream p-7 mt-10">
        <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
          Order History
        </h2>
        {user.orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-sans text-[0.9rem] text-stone-gray mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Link href="/collections" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {user.orders.map((o) => (
              <div key={o.id} className="border border-border-cream p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <span className="font-sans text-[0.85rem] font-medium text-near-black">{o.id}</span>
                    <span className="font-sans text-[0.78rem] text-stone-gray ml-3">
                      {new Date(o.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-terracotta">
                    {o.status}
                  </span>
                </div>
                <div className="font-sans text-[0.82rem] text-olive-gray">
                  {o.items.reduce((n, i) => n + i.qty, 0)} item(s) · ${o.total.toFixed(2)}
                  <span className="text-stone-gray"> · incl. ${(o.total / 11).toFixed(2)} GST</span>
                </div>
                <div className="mt-3 space-y-1.5">
                  {o.items.map((i) => (
                    <div key={i.lineId} className="flex items-center justify-between gap-3">
                      <span className="font-sans text-[0.8rem] text-near-black">
                        {i.name} <span className="text-stone-gray">· {i.size}</span>
                      </span>
                      <Link
                        href={`/products/${i.handle || slugify(i.name)}#reviews`}
                        className="font-sans text-[0.72rem] tracking-[0.06em] uppercase text-terracotta hover:text-near-black no-underline whitespace-nowrap"
                      >
                        Write a review
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function AccountPage() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <PageLayout>
        <div className="min-h-[55vh] flex items-center justify-center">
          <p className="font-sans text-stone-gray">Loading…</p>
        </div>
      </PageLayout>
    );
  }

  return <PageLayout>{user ? <Dashboard /> : <AuthForms />}</PageLayout>;
}
