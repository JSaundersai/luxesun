"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  placeholderProducts,
  PlaceholderProduct,
  normalizeProduct,
  slugify,
} from "@/lib/placeholder-data";

export type Product = PlaceholderProduct;

const STORAGE_KEY = "luxe_products_v1";

const seed = () => placeholderProducts.map(normalizeProduct);

interface ProductsContextValue {
  products: Product[];
  /** True once the store has hydrated from localStorage. */
  ready: boolean;
  getProductByHandle: (handle: string) => Product | undefined;
  addProduct: (data: Omit<Product, "id">) => Product;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  /** Reduce on-hand stock for a product/size (used when an order is placed). */
  decrementStock: (id: string, size: string, qty: number) => void;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage (seed on first run). Normalize so older payloads
  // gain any newly-added fields (stock, sku, cost, care…).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        setProducts(parsed.map(normalizeProduct));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed()));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // Persist on change (after hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      /* ignore */
    }
  }, [products, ready]);

  const getProductByHandle = (handle: string) =>
    products.find((p) => slugify(p.name) === handle);

  const addProduct = (data: Omit<Product, "id">) => {
    const product: Product = normalizeProduct({ ...data, id: `p-${Date.now()}` });
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const decrementStock = (id: string, size: string, qty: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const stock = { ...(p.stock ?? {}) };
        stock[size] = Math.max(0, (stock[size] ?? 0) - qty);
        return { ...p, stock };
      })
    );
  };

  const resetProducts = () => {
    setProducts(seed());
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        ready,
        getProductByHandle,
        addProduct,
        updateProduct,
        deleteProduct,
        decrementStock,
        resetProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
