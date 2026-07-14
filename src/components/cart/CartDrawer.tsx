"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-near-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[420px] bg-parchment shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-cream">
          <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.15em] uppercase text-near-black">
            Your Cart ({count})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-olive-gray hover:text-near-black transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-2xl text-near-black mb-2">
              Your cart is empty
            </p>
            <p className="font-sans text-[0.9rem] text-stone-gray mb-6">
              Add something sun-ready to get started.
            </p>
            <button onClick={closeCart} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={item.lineId} className="flex gap-4">
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 bg-warm-sand overflow-hidden shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="font-sans text-[0.85rem] font-medium text-near-black no-underline hover:text-terracotta"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        aria-label="Remove item"
                        className="text-stone-gray hover:text-near-black shrink-0"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div className="font-sans text-[0.72rem] text-stone-gray mt-1">
                      {item.color} · {item.size}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border-warm">
                        <button
                          onClick={() => updateQty(item.lineId, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-near-black hover:bg-warm-sand"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-sans text-[0.85rem]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.lineId, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-near-black hover:bg-warm-sand"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-sans text-[0.85rem] text-near-black">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border-cream px-6 py-5 space-y-4">
              <div className="flex justify-between font-sans text-near-black">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <p className="font-sans text-[0.75rem] text-stone-gray">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full text-center block"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-secondary w-full text-center block"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
