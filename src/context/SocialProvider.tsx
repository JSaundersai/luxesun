"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type SocialPlatform = "instagram" | "facebook";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  productId?: string;
  image: string;
  caption: string;
  hashtags: string;
  scheduledFor?: string;
  status: "draft" | "scheduled" | "posted";
  createdAt: string;
}

const KEY = "luxe_social_posts_v1";

interface SocialContextValue {
  posts: SocialPost[];
  ready: boolean;
  addPost: (data: Omit<SocialPost, "id" | "createdAt">) => void;
  updatePost: (id: string, data: Partial<SocialPost>) => void;
  deletePost: (id: string) => void;
}

const SocialContext = createContext<SocialContextValue | null>(null);

export function SocialProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPosts(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(posts));
  }, [posts, ready]);

  const addPost = useCallback((data: Omit<SocialPost, "id" | "createdAt">) => {
    setPosts((prev) => [
      { ...data, id: `sp-${Date.now()}`, createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updatePost = useCallback((id: string, data: Partial<SocialPost>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <SocialContext.Provider value={{ posts, ready, addPost, updatePost, deletePost }}>
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("useSocial must be used within SocialProvider");
  return ctx;
}
