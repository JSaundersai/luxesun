import type { MetadataRoute } from "next";

const SITE = "https://luxesun.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/checkout", "/cart", "/viewport"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
