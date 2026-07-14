"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Order } from "./AuthProvider";
import { CartItem } from "./CartProvider";
import { Product } from "./ProductsProvider";
import { slugify } from "@/lib/placeholder-data";

export interface Influencer {
  id: string;
  name: string;
  email: string;
  code: string;
  /** % discount the influencer's code gives their fans. */
  discountRate: number;
  /** % commission the influencer earns on attributed sales. */
  commissionRate: number;
  /** Day of month (1-28) payouts are issued. */
  payDay: number;
  status: "active" | "paused";
  createdAt: string;
}

export interface Payout {
  id: string;
  influencerId: string;
  amount: number;
  /** Human label for the period covered, e.g. "1–30 Jun 2026". */
  period: string;
  note?: string;
  date: string;
}

interface Metrics {
  views: number;
  productViews: Record<string, number>;
}

const ORDERS_KEY = "luxe_orders_v1";
const INFLUENCERS_KEY = "luxe_influencers_v1";
const METRICS_KEY = "luxe_metrics_v1";
const USERS_KEY = "luxe_users_v1";
const PAYOUTS_KEY = "luxe_payouts_v1";

interface AnalyticsContextValue {
  orders: Order[];
  influencers: Influencer[];
  payouts: Payout[];
  metrics: Metrics;
  ready: boolean;
  signupCount: number;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: string) => void;
  trackView: () => void;
  trackProductView: (handle: string) => void;
  addInfluencer: (data: Omit<Influencer, "id" | "createdAt">) => void;
  updateInfluencer: (id: string, data: Partial<Influencer>) => void;
  deleteInfluencer: (id: string) => void;
  getInfluencerByCode: (code: string) => Influencer | undefined;
  recordPayout: (data: Omit<Payout, "id" | "date">) => void;
  seedDemo: (products: Product[]) => void;
  resetAnalytics: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ views: 0, productViews: {} });
  const [signupCount, setSignupCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrders(read<Order[]>(ORDERS_KEY, []));
    setInfluencers(read<Influencer[]>(INFLUENCERS_KEY, []));
    setPayouts(read<Payout[]>(PAYOUTS_KEY, []));
    setMetrics(read<Metrics>(METRICS_KEY, { views: 0, productViews: {} }));
    setSignupCount(read<unknown[]>(USERS_KEY, []).length);
    setReady(true);
  }, []);

  // Persist
  useEffect(() => {
    if (ready) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(influencers));
  }, [influencers, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(PAYOUTS_KEY, JSON.stringify(payouts));
  }, [payouts, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
  }, [metrics, ready]);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
    // refresh signup count in case a guest just registered during checkout
    setSignupCount(read<unknown[]>(USERS_KEY, []).length);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const trackView = useCallback(() => {
    setMetrics((m) => ({ ...m, views: m.views + 1 }));
  }, []);

  const trackProductView = useCallback((handle: string) => {
    setMetrics((m) => ({
      ...m,
      productViews: {
        ...m.productViews,
        [handle]: (m.productViews[handle] || 0) + 1,
      },
    }));
  }, []);

  const addInfluencer = (data: Omit<Influencer, "id" | "createdAt">) =>
    setInfluencers((prev) => [
      { ...data, id: `inf-${Date.now()}`, createdAt: new Date().toISOString() },
      ...prev,
    ]);

  const updateInfluencer = (id: string, data: Partial<Influencer>) =>
    setInfluencers((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));

  const deleteInfluencer = (id: string) =>
    setInfluencers((prev) => prev.filter((i) => i.id !== id));

  const getInfluencerByCode = (code: string) =>
    influencers.find(
      (i) => i.status === "active" && i.code.toLowerCase() === code.trim().toLowerCase()
    );

  const recordPayout = (data: Omit<Payout, "id" | "date">) =>
    setPayouts((prev) => [
      { ...data, id: `pay-${Date.now()}`, date: new Date().toISOString() },
      ...prev,
    ]);

  const seedDemo = (products: Product[]) => {
    if (products.length === 0) return;

    // Ensure a couple of demo influencers exist
    let inf = influencers;
    if (inf.length === 0) {
      inf = [
        {
          id: "inf-demo-1",
          name: "Maya Rivera",
          email: "maya@creator.com",
          code: "MAYA15",
          discountRate: 15,
          commissionRate: 12,
          payDay: 1,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "inf-demo-2",
          name: "Coastal Run Club",
          email: "hello@coastalrun.co",
          code: "COASTAL10",
          discountRate: 10,
          commissionRate: 10,
          payDay: 15,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ];
      setInfluencers(inf);
    }

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = <T,>(arr: T[]): T => arr[rand(0, arr.length - 1)];
    const sizes = ["XS", "S", "M", "L", "XL"];
    const newOrders: Order[] = [];

    for (let d = 29; d >= 0; d--) {
      const perDay = rand(0, 4); // some days have no sales
      for (let n = 0; n < perDay; n++) {
        const date = new Date();
        date.setDate(date.getDate() - d);
        date.setHours(rand(8, 21), rand(0, 59), 0, 0);

        const lineCount = rand(1, 3);
        const items: CartItem[] = [];
        for (let l = 0; l < lineCount; l++) {
          const p = pick(products);
          const qty = rand(1, 2);
          items.push({
            lineId: `${p.id}-${l}-${Math.random()}`,
            productId: p.id,
            handle: slugify(p.name),
            name: p.name,
            price: p.price,
            cost: p.cost ?? Math.round(p.price * 0.42),
            image: p.image,
            color: p.colors[0]?.name ?? "Default",
            size: pick(sizes),
            qty,
          });
        }
        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
        const cogs = items.reduce((s, i) => s + i.cost * i.qty, 0);

        // ~30% of orders attributed to an influencer code
        const useCode = Math.random() < 0.3 && inf.length > 0;
        const influencer = useCode ? pick(inf) : undefined;
        const discount = influencer
          ? Math.round((subtotal * influencer.discountRate) / 100)
          : 0;
        const shipping = subtotal - discount >= 150 ? 0 : 10;

        newOrders.push({
          id: `LS-${date.getTime().toString().slice(-8)}-${n}`,
          date: date.toISOString(),
          items,
          subtotal,
          shipping,
          discount,
          cogs,
          total: subtotal - discount + shipping,
          status: "Fulfilled",
          email: `customer${rand(1, 400)}@example.com`,
          discountCode: influencer?.code,
          influencerId: influencer?.id,
        });
      }
    }

    setOrders((prev) => [...newOrders, ...prev]);
    setMetrics((m) => ({
      views: m.views + rand(2200, 3200),
      productViews: m.productViews,
    }));
    setSignupCount((c) => c + rand(60, 120));
  };

  const resetAnalytics = () => {
    setOrders([]);
    setPayouts([]);
    setMetrics({ views: 0, productViews: {} });
    setSignupCount(read<unknown[]>(USERS_KEY, []).length);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        orders,
        influencers,
        payouts,
        metrics,
        ready,
        signupCount,
        addOrder,
        updateOrderStatus,
        trackView,
        trackProductView,
        addInfluencer,
        updateInfluencer,
        deleteInfluencer,
        getInfluencerByCode,
        recordPayout,
        seedDemo,
        resetAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error("useAnalytics must be used within AnalyticsProvider");
  return ctx;
}
