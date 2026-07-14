"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "./ProductsProvider";

export interface CartItem {
  lineId: string;
  productId: string;
  handle: string;
  name: string;
  price: number;
  cost: number;
  image: string;
  color: string;
  size: string;
  qty: number;
}

interface AddOptions {
  color?: string;
  size?: string;
  qty?: number;
}

const STORAGE_KEY = "luxe_cart_v1";

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, opts?: AddOptions) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product, opts: AddOptions = {}) => {
    const color = opts.color ?? product.colors[0]?.name ?? "Default";
    const size = opts.size ?? "One Size";
    const qty = opts.qty ?? 1;
    const lineId = `${product.id}::${color}::${size}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, qty: i.qty + qty } : i
        );
      }
      const item: CartItem = {
        lineId,
        productId: product.id,
        handle: product.name
          .toLowerCase()
          .replace(/\+/g, " plus ")
          .replace(/&/g, " and ")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
        name: product.name,
        price: product.price,
        cost: product.cost ?? Math.round(product.price * 0.42),
        image: product.image,
        color,
        size,
        qty,
      };
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (lineId: string) =>
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));

  const updateQty = (lineId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(lineId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
