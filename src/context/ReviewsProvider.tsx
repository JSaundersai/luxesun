"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

const KEY = "luxe_reviews_v1";

const SEED: Review[] = [
  { id: "r1", productId: "1", author: "Sarah M.", rating: 5, title: "Zero burn all tournament", body: "Six hours on the sand and not a hint of sunburn. It never rode up once — genuinely the best sun top I've owned.", date: "2026-06-28T02:00:00.000Z", verified: true },
  { id: "r2", productId: "1", author: "Priya R.", rating: 4, title: "Love it, sizing runs snug", body: "Gorgeous colour and so comfortable. I'd size up if you want a relaxed fit — the S was quite fitted on me.", date: "2026-06-20T02:00:00.000Z", verified: true },
  { id: "r3", productId: "2", author: "Mia L.", rating: 5, title: "My go-to run crop", body: "Seamless, breathable and stays put on long runs. Bought a second in black.", date: "2026-07-01T02:00:00.000Z", verified: true },
  { id: "r4", productId: "3", author: "Jess K.", rating: 5, title: "Stylish enough to wear off court", body: "Finally sun protection that doesn't look like a rash guard. Cooling fabric is legit.", date: "2026-06-15T02:00:00.000Z", verified: true },
  { id: "r5", productId: "5", author: "Toni B.", rating: 4, title: "Grippers actually work", body: "Stay up through dives and don't cut off circulation. Wish they came in more colours.", date: "2026-06-10T02:00:00.000Z", verified: true },
];

interface ReviewSummary {
  count: number;
  average: number;
  distribution: Record<number, number>;
}

interface ReviewsContextValue {
  reviews: Review[];
  ready: boolean;
  addReview: (data: Omit<Review, "id" | "date">) => void;
  forProduct: (productId: string) => Review[];
  summary: (productId: string) => ReviewSummary;
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setReviews(JSON.parse(raw));
      else localStorage.setItem(KEY, JSON.stringify(SEED));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(reviews));
  }, [reviews, ready]);

  const addReview = useCallback((data: Omit<Review, "id" | "date">) => {
    setReviews((prev) => [
      { ...data, id: `r-${Date.now()}`, date: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const forProduct = useCallback(
    (productId: string) => reviews.filter((r) => r.productId === productId),
    [reviews]
  );

  const summary = useCallback(
    (productId: string): ReviewSummary => {
      const list = reviews.filter((r) => r.productId === productId);
      const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      list.forEach((r) => (distribution[r.rating] = (distribution[r.rating] || 0) + 1));
      const average = list.length
        ? list.reduce((s, r) => s + r.rating, 0) / list.length
        : 0;
      return { count: list.length, average, distribution };
    },
    [reviews]
  );

  return (
    <ReviewsContext.Provider value={{ reviews, ready, addReview, forProduct, summary }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}
