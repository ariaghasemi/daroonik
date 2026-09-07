import { asc, eq, sql } from "drizzle-orm";
import { hasDatabase, getDb } from "@/db";
import { brands, categories, messages, orders, posts, products, reviews } from "@/db/schema";
import { BRANDS, CATEGORIES, PRODUCTS, REVIEWS, type SeedProduct } from "@/data/catalog";
import { POSTS, type SeedPost } from "@/data/posts";
import type { SearchIndex } from "@/lib/filters";

export type { FilterOptions, FilterableProduct, SortKey } from "@/lib/filters";
export { applyFilters, searchIndex } from "@/lib/filters";

export type Product = SeedProduct & { id: number };
export type Category = (typeof CATEGORIES)[number];
export type Brand = (typeof BRANDS)[number];
export type Post = SeedPost;
export type Review = {
  author: string;
  rating: number;
  title: string;
  body: string;
  pros: string[];
  cons: string[];
  verified: boolean;
  productSlug: string;
};

let seedPromise: Promise<void> | null = null;

/** Creates the tables' content on first use. A no-op when no database is configured. */
export async function ensureSeeded(): Promise<void> {
  const db = getDb();
  if (!db) return;
  if (!seedPromise) {
    seedPromise = (async () => {
      await db.transaction(async (tx) => {
        const [{ count }] = await tx
          .select({ count: sql<number>`count(*)::int` })
          .from(products);
        if (Number(count) > 0) return;

        await tx.insert(brands).values(BRANDS).onConflictDoNothing();
        await tx.insert(categories).values(CATEGORIES).onConflictDoNothing();
        await tx
          .insert(products)
          .values(
            PRODUCTS.map((p) => ({
              slug: p.slug,
              name: p.name,
              brandSlug: p.brandSlug,
              categorySlug: p.categorySlug,
              rootSlug: p.rootSlug,
              price: p.price,
              oldPrice: p.oldPrice ?? null,
              rating: p.rating,
              reviewCount: p.reviewCount,
              sold: p.sold,
              stock: p.stock,
              image: p.image,
              shortDesc: p.shortDesc,
              description: p.description,
              specs: p.specs,
              variants: p.variants,
              usage: p.usage,
              warning: p.warning,
              faq: p.faq,
              isNew: p.isNew,
              isBestseller: p.isBestseller,
              isFeatured: p.isFeatured,
              tags: p.tags,
            })),
          )
          .onConflictDoNothing();
        await tx.insert(reviews).values(REVIEWS).onConflictDoNothing();
        await tx.insert(posts).values(POSTS).onConflictDoNothing();
      });
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

/* ------------------------- read helpers (DB first, static fallback) ------------------------- */

/** Wraps a DB read: falls back to the bundled catalog when there is no DB / the query fails. */
async function readWithFallback<T extends unknown[]>(
  run: (db: NonNullable<ReturnType<typeof getDb>>) => Promise<T>,
  fallback: () => T,
): Promise<T> {
  const db = getDb();
  if (!db) return fallback();
  try {
    await ensureSeeded();
    const rows = await run(db);
    if (!rows.length) throw new Error("empty table");
    return rows;
  } catch {
    return fallback();
  }
}

export async function getProducts(): Promise<Product[]> {
  return readWithFallback<Product[]>(
    async (db) => {
      const rows = await db.select().from(products).orderBy(asc(products.id));
      return rows.map((r) => ({
        ...r,
        oldPrice: r.oldPrice ?? undefined,
        description: r.description ?? [],
        specs: r.specs ?? [],
        variants: r.variants ?? [],
        faq: r.faq ?? [],
        tags: r.tags ?? [],
      })) as Product[];
    },
    () => PRODUCTS.map((p, i) => ({ ...p, id: i + 1 })),
  );
}

export async function getCategories(): Promise<Category[]> {
  return readWithFallback<Category[]>(
    async (db) => await db.select().from(categories).orderBy(asc(categories.sort)),
    () => CATEGORIES,
  );
}

export async function getBrands(): Promise<Brand[]> {
  return readWithFallback<Brand[]>(
    async (db) => await db.select().from(brands).orderBy(asc(brands.id)),
    () => BRANDS,
  );
}

export async function getPosts(): Promise<Post[]> {
  return readWithFallback<Post[]>(
    async (db) => await db.select().from(posts).orderBy(asc(posts.id)),
    () => POSTS,
  );
}

export async function getReviews(productSlug: string): Promise<Review[]> {
  return readWithFallback<Review[]>(
    async (db) => {
      const rows = await db.select().from(reviews).where(eq(reviews.productSlug, productSlug));
      return rows.map((r) => ({
        author: r.author,
        rating: r.rating,
        title: r.title,
        body: r.body,
        pros: r.pros ?? [],
        cons: r.cons ?? [],
        verified: r.verified,
        productSlug: r.productSlug,
      }));
    },
    () => REVIEWS.filter((r) => r.productSlug === productSlug),
  );
}

/* ------------------------- derived selectors ------------------------- */

export async function getCategoryTree() {
  const cats = await getCategories();
  const roots = cats.filter((c) => !c.parentSlug);
  return roots.map((root) => ({
    ...root,
    children: cats.filter((c) => c.parentSlug === root.slug),
  }));
}

export async function findCategory(slug: string) {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) ?? null;
}

export async function getProductBySlug(slug: string) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPostBySlug(slug: string) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

/**
 * Compact, client-safe lookup table used by the header live search and the /search page.
 * Only the fields needed for matching + rendering a suggestion are shipped to the browser.
 */
export async function getSearchIndex(): Promise<SearchIndex> {
  const [ps, cs, bs, postsList] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getPosts(),
  ]);
  return {
    products: ps.map((p) => ({
      slug: p.slug,
      name: p.name,
      image: p.image,
      price: p.price,
      brandSlug: p.brandSlug,
    })),
    categories: cs.map((c) => ({ slug: c.slug, title: c.title, parentSlug: c.parentSlug })),
    brands: bs.map((b) => ({ slug: b.slug, name: b.name, nameEn: b.nameEn })),
    posts: postsList.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt })),
  };
}

/* ------------------------- writes (best effort: demo mode just answers OK) ------------------------- */

export type NewOrder = Omit<typeof orders.$inferInsert, "id" | "code" | "createdAt">;

export async function createOrder(input: NewOrder) {
  const code = `DRN-${Math.floor(100000 + Math.random() * 899999)}`;
  const db = getDb();
  if (db) {
    try {
      const [row] = await db.insert(orders).values({ ...input, code }).returning();
      return row;
    } catch {
      /* falls through to demo mode */
    }
  }
  return { ...input, code, id: 0, createdAt: new Date(), status: "در حال پردازش" } as typeof orders.$inferSelect;
}

export async function listOrders() {
  const db = getDb();
  if (!db) return [];
  try {
    await ensureSeeded();
    return await db.select().from(orders).orderBy(asc(orders.id));
  } catch {
    return [];
  }
}

export async function getOrderByCode(code: string) {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db.select().from(orders).where(eq(orders.code, code));
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function saveMessage(input: typeof messages.$inferInsert): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db.insert(messages).values(input);
    return true;
  } catch {
    return false;
  }
}

/** `true` when the deployment has a real Postgres attached (drives the UI copy). */
export function isPersisted() {
  return hasDatabase;
}
