"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/context/CartProvider";
import { useAuth, Order } from "@/context/AuthProvider";
import { useAnalytics, Influencer } from "@/context/AnalyticsProvider";
import { useProducts } from "@/context/ProductsProvider";
import { useEmails } from "@/context/EmailsProvider";

const SHIPPING_THRESHOLD = 150;

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard", detail: "3–5 business days", price: 10 },
  { id: "express", label: "Express", detail: "1–2 business days", price: 20 },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { addOrder: recordOrder, getInfluencerByCode } = useAnalytics();
  const { decrementStock } = useProducts();
  const { logEmail } = useEmails();

  const defaultAddress = user?.addresses.find((a) => a.isDefault) ?? user?.addresses[0];

  const [form, setForm] = useState({
    email: user?.email ?? "",
    name: defaultAddress?.name ?? user?.name ?? "",
    line1: defaultAddress?.line1 ?? "",
    line2: defaultAddress?.line2 ?? "",
    city: defaultAddress?.city ?? "",
    state: defaultAddress?.state ?? "",
    postcode: defaultAddress?.postcode ?? "",
    country: defaultAddress?.country ?? "Australia",
    phone: defaultAddress?.phone ?? "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [delivery, setDelivery] = useState("standard");
  const [errors, setErrors] = useState<string[]>([]);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Discount code
  const [codeInput, setCodeInput] = useState("");
  const [applied, setApplied] = useState<Influencer | null>(null);
  const [codeMsg, setCodeMsg] = useState("");

  const deliveryOpt = DELIVERY_OPTIONS.find((d) => d.id === delivery)!;
  const discount = applied ? Math.round((subtotal * applied.discountRate) / 100) : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : deliveryOpt.price;
  const total = discountedSubtotal + shipping;
  const gst = total / 11; // AU GST is 10% and prices are GST-inclusive

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const applyCode = () => {
    const found = getInfluencerByCode(codeInput);
    if (found) {
      setApplied(found);
      setCodeMsg(`Code applied — ${found.discountRate}% off`);
    } else {
      setApplied(null);
      setCodeMsg("That code isn’t valid.");
    }
  };

  const placeOrder = () => {
    const required: [string, string][] = [
      ["email", "Email"],
      ["name", "Full name"],
      ["line1", "Address"],
      ["city", "City"],
      ["state", "State"],
      ["postcode", "Postcode"],
      ["card", "Card number"],
      ["expiry", "Expiry"],
      ["cvc", "CVC"],
    ];
    const missing = required
      .filter(([k]) => !form[k as keyof typeof form]?.toString().trim())
      .map(([, label]) => label);
    if (missing.length) {
      setErrors(missing);
      return;
    }

    const cogs = items.reduce((s, i) => s + i.cost * i.qty, 0);

    const order: Order = {
      id: `LS-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      discount,
      cogs,
      total,
      status: "Processing",
      email: form.email,
      shipTo: `${form.line1}, ${form.city} ${form.state} ${form.postcode}`,
      discountCode: applied?.code,
      influencerId: applied?.id,
    };

    recordOrder(order); // global analytics store
    addOrder(order); // account order history if signed in

    // Decrement on-hand inventory for each line item.
    items.forEach((i) => decrementStock(i.productId, i.size, i.qty));

    // Log the order confirmation email to the sent-email store.
    logEmail("order_confirmation", form.email, {
      id: order.id,
      name: form.name,
      items: items.map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
      subtotal,
      shipping,
      discount,
      total,
      shipTo: order.shipTo,
    });

    clearCart();
    setPlacedOrder(order);
    window.scrollTo({ top: 0 });
  };

  // Confirmation screen
  if (placedOrder) {
    return (
      <PageLayout>
        <div className="max-w-[720px] mx-auto px-6 py-20 md:py-28 text-center min-h-[60vh]">
          <div className="w-16 h-16 rounded-full bg-terracotta/15 flex items-center justify-center mx-auto mb-6">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c96442" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-medium text-near-black mb-3">
            Thank you for your order
          </h1>
          <p className="font-sans text-[0.95rem] text-stone-gray mb-2">
            Order <span className="text-near-black font-medium">{placedOrder.id}</span> is confirmed.
          </p>
          <p className="font-sans text-[0.9rem] text-stone-gray mb-10">
            A confirmation has been sent to {placedOrder.email}.
          </p>

          <div className="border border-border-cream text-left p-6 mb-10">
            <div className="space-y-4">
              {placedOrder.items.map((item) => (
                <div key={item.lineId} className="flex gap-4">
                  <div className="relative w-14 h-16 bg-warm-sand overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-sans text-[0.85rem] text-near-black">{item.name}</div>
                    <div className="font-sans text-[0.72rem] text-stone-gray">
                      {item.color} · {item.size} · Qty {item.qty}
                    </div>
                  </div>
                  <div className="font-sans text-[0.85rem] text-near-black">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            {placedOrder.discount > 0 && (
              <div className="border-t border-border-cream mt-5 pt-4 flex justify-between font-sans text-[0.85rem] text-terracotta">
                <span>Discount ({placedOrder.discountCode})</span>
                <span>−${placedOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-border-cream mt-3 pt-4 flex justify-between font-sans text-near-black font-medium">
              <span>Total</span>
              <span>${placedOrder.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-sans text-[0.78rem] text-stone-gray mt-1">
              <span>GST included (10%)</span>
              <span>${(placedOrder.total / 11).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/collections" className="btn-primary">Continue Shopping</Link>
            {user && <Link href="/account" className="btn-secondary">View Orders</Link>}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-[720px] mx-auto px-6 py-24 text-center min-h-[55vh]">
          <h1 className="font-serif text-[2.4rem] font-medium text-near-black mb-4">
            Your cart is empty
          </h1>
          <p className="font-sans text-[0.95rem] text-stone-gray mb-8">
            Add a few sun-ready styles before checking out.
          </p>
          <Link href="/collections" className="btn-primary">Shop the Range</Link>
        </div>
      </PageLayout>
    );
  }

  const inputCls =
    "w-full border border-border-warm bg-white px-4 py-3 font-sans text-[0.95rem] focus:outline-none focus:border-near-black transition-colors";
  const labelCls =
    "block font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-stone-gray mb-2";

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-medium text-near-black mb-2">
          Checkout
        </h1>
        <p className="font-sans text-[0.82rem] text-stone-gray mb-10">
          Demo checkout — no real payment is taken.
        </p>

        {errors.length > 0 && (
          <div className="border border-terracotta/40 bg-terracotta/5 text-terracotta px-5 py-3 mb-8 font-sans text-[0.85rem]">
            Please complete: {errors.join(", ")}.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-12">
            {!user && (
              <p className="font-sans text-[0.85rem] text-stone-gray -mb-6">
                Have an account?{" "}
                <Link href="/account" className="text-terracotta underline underline-offset-2">
                  Sign in
                </Link>{" "}
                for faster checkout.
              </p>
            )}

            {/* Contact */}
            <section>
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
                Contact
              </h2>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@example.com" />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Full name</label>
                  <input value={form.name} onChange={set("name")} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address</label>
                  <input value={form.line1} onChange={set("line1")} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Apartment, suite (optional)</label>
                  <input value={form.line2} onChange={set("line2")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input value={form.city} onChange={set("city")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <input value={form.state} onChange={set("state")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Postcode</label>
                  <input value={form.postcode} onChange={set("postcode")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Country</label>
                  <input value={form.country} onChange={set("country")} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Phone (optional)</label>
                  <input value={form.phone} onChange={set("phone")} className={inputCls} />
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
                Delivery
              </h2>
              <div className="space-y-3">
                {DELIVERY_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between border px-5 py-4 cursor-pointer transition-colors ${
                      delivery === opt.id ? "border-near-black" : "border-border-warm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === opt.id}
                        onChange={() => setDelivery(opt.id)}
                        className="accent-terracotta"
                      />
                      <div>
                        <div className="font-sans text-[0.9rem] text-near-black">{opt.label}</div>
                        <div className="font-sans text-[0.78rem] text-stone-gray">{opt.detail}</div>
                      </div>
                    </div>
                    <span className="font-sans text-[0.9rem] text-near-black">
                      {discountedSubtotal >= SHIPPING_THRESHOLD ? "Free" : `$${opt.price.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
                Payment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Card number</label>
                  <input value={form.card} onChange={set("card")} className={inputCls} placeholder="4242 4242 4242 4242" />
                </div>
                <div>
                  <label className={labelCls}>Expiry</label>
                  <input value={form.expiry} onChange={set("expiry")} className={inputCls} placeholder="MM/YY" />
                </div>
                <div>
                  <label className={labelCls}>CVC</label>
                  <input value={form.cvc} onChange={set("cvc")} className={inputCls} placeholder="123" />
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="border border-border-cream p-7 h-fit lg:sticky lg:top-28">
            <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6 max-h-[240px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.lineId} className="flex gap-3">
                  <div className="relative w-14 h-16 bg-warm-sand overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[0.82rem] text-near-black truncate">{item.name}</div>
                    <div className="font-sans text-[0.7rem] text-stone-gray">
                      {item.color} · {item.size} · Qty {item.qty}
                    </div>
                  </div>
                  <div className="font-sans text-[0.82rem] text-near-black">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Discount code */}
            <div className="border-t border-border-cream pt-4 mb-4">
              <label className={labelCls}>Discount code</label>
              <div className="flex gap-2">
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className={`${inputCls} py-2`}
                  placeholder="e.g. MAYA15"
                />
                <button
                  onClick={applyCode}
                  className="shrink-0 px-4 border border-near-black font-sans text-[0.75rem] tracking-[0.08em] uppercase hover:bg-near-black hover:text-ivory transition-colors"
                >
                  Apply
                </button>
              </div>
              {codeMsg && (
                <p className={`mt-2 font-sans text-[0.78rem] ${applied ? "text-terracotta" : "text-stone-gray"}`}>
                  {codeMsg}
                </p>
              )}
            </div>

            <div className="space-y-3 text-[0.9rem] text-olive-gray border-t border-border-cream pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-terracotta">
                  <span>Discount ({applied?.code})</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-border-cream mt-4 pt-4 font-sans text-near-black font-medium text-[1rem]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-sans text-[0.75rem] text-stone-gray mt-1">
              <span>GST included (10%)</span>
              <span>${gst.toFixed(2)}</span>
            </div>
            <button onClick={placeOrder} className="btn-primary w-full text-center mt-6">
              Place Order
            </button>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
