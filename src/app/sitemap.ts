import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS, BRANDS } from "@/data/catalog";
import { POSTS, BLOG_CATEGORIES } from "@/data/posts";
import { SITE } from "@/lib/utils";

// force-static: the sitemap is built from the catalog, so it can also be prerendered by `npm run build:pages`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/shop", "/categories", "/brands", "/sale", "/new", "/bestsellers", "/blog", "/about", "/contact", "/faq", "/terms", "/privacy", "/shipping"];
  return [
    ...statics.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/category/${c.parentSlug ? `${c.parentSlug}/${c.slug}` : c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...BRANDS.map((b) => ({
      url: `${SITE.url}/brand/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...BLOG_CATEGORIES.map((c) => ({
      url: `${SITE.url}/blog/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
