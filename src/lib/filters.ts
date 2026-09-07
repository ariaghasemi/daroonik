/**
 * Pure catalog helpers (filtering / sorting / searching).
 *
 * This module is intentionally free of any database or server-only import so it can be
 * used from client components as well — that is what lets the storefront render fully
 * on a static host (Cloudflare Pages) while still using the database when one exists.
 */

export type SortKey = "popular" | "newest" | "cheap" | "expensive" | "rating" | "discount";

export type FilterableProduct = {
  id: number;
  slug: string;
  name: string;
  brandSlug: string;
  categorySlug: string;
  rootSlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  sold: number;
  stock: number;
  image: string;
  shortDesc: string;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured?: boolean;
};

export type FilterOptions = {
  root?: string;
  category?: string;
  brands?: string[];
  min?: number;
  max?: number;
  rating?: number;
  onlyAvailable?: boolean;
  onlyDiscount?: boolean;
  query?: string;
  sort?: SortKey;
};

export function applyFilters<T extends FilterableProduct>(list: T[], o: FilterOptions): T[] {
  let out = [...list];
  if (o.root) out = out.filter((p) => p.rootSlug === o.root);
  if (o.category) out = out.filter((p) => p.categorySlug === o.category);
  if (o.brands?.length) out = out.filter((p) => o.brands!.includes(p.brandSlug));
  if (o.min != null) out = out.filter((p) => p.price >= o.min!);
  if (o.max != null) out = out.filter((p) => p.price <= o.max!);
  if (o.rating) out = out.filter((p) => p.rating >= o.rating!);
  if (o.onlyAvailable) out = out.filter((p) => p.stock > 0);
  if (o.onlyDiscount) out = out.filter((p) => !!p.oldPrice && p.oldPrice > p.price);
  if (o.query) {
    const q = o.query.trim();
    if (q) out = out.filter((p) => `${p.name} ${p.shortDesc} ${p.brandSlug}`.includes(q));
  }
  switch (o.sort) {
    case "newest":
      out.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
      break;
    case "cheap":
      out.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      out.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      out.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      out.sort(
        (a, b) =>
          (b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0) -
          (a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0),
      );
      break;
    default:
      out.sort((a, b) => b.sold - a.sold);
  }
  return out;
}

/** What a shop/listing grid needs per product: card fields + everything the filters sort on. */
export type ShopItem = FilterableProduct & { brandName: string };

export function toShopItems<T extends FilterableProduct>(
  products: T[],
  brands: { slug: string; name: string }[],
): ShopItem[] {
  const nameOf = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug;
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brandSlug: p.brandSlug,
    categorySlug: p.categorySlug,
    rootSlug: p.rootSlug,
    price: p.price,
    oldPrice: p.oldPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    sold: p.sold,
    stock: p.stock,
    image: p.image,
    shortDesc: p.shortDesc,
    isNew: p.isNew,
    isBestseller: p.isBestseller,
    brandName: nameOf(p.brandSlug),
  }));
}

/** Slim brand list (slug + name) that listing pages hand to the client grid. */
export function brandOptions(brands: { slug: string; name: string }[]) {
  return brands.map((b) => ({ slug: b.slug, name: b.name }));
}

export type SearchIndexEntry =
  | { kind: "product"; slug: string; title: string; href: string; price: number; image: string }
  | { kind: "category"; slug: string; title: string; href: string; parentSlug: string | null }
  | { kind: "brand"; slug: string; title: string; href: string; nameEn: string }
  | { kind: "post"; slug: string; title: string; href: string };

export type SearchIndex = {
  products: { slug: string; name: string; image: string; price: number; brandSlug: string }[];
  categories: { slug: string; title: string; parentSlug: string | null }[];
  brands: { slug: string; name: string; nameEn: string }[];
  posts: { slug: string; title: string; excerpt: string }[];
};

export type SearchResults = {
  products: SearchIndex["products"];
  categories: SearchIndex["categories"];
  brands: SearchIndex["brands"];
  posts: SearchIndex["posts"];
};

/** Case-insensitive substring search across the lightweight index shipped to the client. */
export function searchIndex(index: SearchIndex, raw: string): SearchResults {
  const term = raw.trim();
  const empty: SearchResults = { products: [], categories: [], brands: [], posts: [] };
  if (!term) return empty;
  const lower = term.toLowerCase();
  return {
    products: index.products.filter((p) => `${p.name} ${p.brandSlug}`.includes(term)).slice(0, 12),
    categories: index.categories.filter((c) => c.title.includes(term)).slice(0, 6),
    brands: index.brands
      .filter((b) => b.name.includes(term) || b.nameEn.toLowerCase().includes(lower))
      .slice(0, 6),
    posts: index.posts.filter((p) => `${p.title} ${p.excerpt}`.includes(term)).slice(0, 5),
  };
}
