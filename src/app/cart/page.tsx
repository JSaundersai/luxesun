"use client";

import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/context/CartProvider";

const SHIPPING_THRESHOLD = 150;
const SHIPPING_FLAT = 10;

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  const shipping =
    items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 min-h-[55vh]">
        <h1 className="font-serif text-[2.6rem] md:text-[3.2rem] font-medium text-near-black mb-10">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="border border-border-cream bg-ivory py-20 px-6 text-center max-w-2xl">
            <p className="font-serif text-2xl text-near-black mb-3">
              Your cart is empty
            </p>
            <p className="font-sans text-[0.95rem] text-stone-gray mb-8">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link href="/collections" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.lineId}
                  className="flex gap-5 border-b border-border-cream pb-6"
                >
                  <Link
                    href={`/products/${item.handle}`}
                    className="relative w-24 h-32 bg-warm-sand overflow-hidden shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <Link
                        href={`/products/${item.handle}`}
                        className="font-serif text-[1.2rem] text-near-black no-underline hover:text-terracotta"
                      >
                        {item.name}
                      </Link>
                      <span className="font-sans text-[0.95rem] text-near-black">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                    <div className="font-sans text-[0.8rem] text-stone-gray mt-1">
                      {item.color} · {item.size}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border-warm">
                        <button
                          onClick={() => updateQty(item.lineId, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center text-near-black hover:bg-warm-sand"
                        >
                          −
                        </button>
                        <span className="w-9 text-center font-sans text-[0.9rem]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.lineId, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center text-near-black hover:bg-warm-sand"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="font-sans text-[0.78rem] tracking-[0.08em] uppercase text-stone-gray hover:text-terracotta transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="border border-border-cream p-7 h-fit">
              <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-[0.9rem] text-olive-gray">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[0.78rem] text-stone-gray">
                    Free shipping on orders over ${SHIPPING_THRESHOLD}.
                  </p>
                )}
              </div>
              <div className="flex justify-between border-t border-border-cream mt-6 pt-4 font-sans text-near-black font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="btn-primary w-full text-center block mt-6"
              >
                Checkout
              </Link>
              <Link
                href="/collections"
                className="block text-center mt-4 font-sans text-[0.8rem] tracking-[0.08em] uppercase text-stone-gray hover:text-near-black no-underline"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
