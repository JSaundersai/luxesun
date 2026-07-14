import type { MetadataRoute } from "next";
import { placeholderProducts, slugify } from "@/lib/placeholder-data";
import { collections } from "@/lib/collections";

const SITE = "https://luxesun.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/collections",
    "/about",
    "/about/founder",
    "/sustainability",
    "/blog",
    "/faq",
    "/shipping",
    "/returns",
    "/size-guide",
    "/contact",
    "/find-a-store",
    "/gift-cards",
    "/ambassador",
    "/community",
    "/partners",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = placeholderProducts.map((p) => ({
    url: `${SITE}/products/${slugify(p.name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${SITE}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
