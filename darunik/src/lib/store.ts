import { BRANDS, CATEGORIES, PRODUCTS, REVIEWS, type SeedProduct } from "@/data/catalog";
import { POSTS, type SeedPost } from "@/data/posts";
import { normalizeSearch } from "@/lib/utils";

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

// This cPanel build is a self-contained portfolio; it does not access a database.
export const getProducts = async (): Promise<Product[]> => PRODUCTS.map((p, i) => ({ ...p, id: i + 1 }));
export const getCategories = async (): Promise<Category[]> => CATEGORIES;
export const getBrands = async (): Promise<Brand[]> => BRANDS;
export const getPosts = async (): Promise<Post[]> => POSTS;
export const getReviews = async (slug: string): Promise<Review[]> => REVIEWS.filter((r) => r.productSlug === slug);

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

export type SortKey = "popular" | "newest" | "cheap" | "expensive" | "rating" | "discount";

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

export function applyFilters(list: Product[], o: FilterOptions): Product[] {
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
    const q = normalizeSearch(o.query);
    if (q) out = out.filter((p) => normalizeSearch(`${p.name} ${p.shortDesc} ${p.brandSlug}`).includes(q));
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

export async function searchEverything(q: string) {
  const term = q.trim();
  const [allProducts, cats, brandList, postList] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getPosts(),
  ]);
  if (!term) return { products: [], categories: [], brands: [], posts: [] };
  return {
    products: allProducts.filter((p) => `${p.name} ${p.shortDesc}`.includes(term)).slice(0, 12),
    categories: cats.filter((c) => c.title.includes(term)).slice(0, 6),
    brands: brandList
      .filter((b) => b.name.includes(term) || b.nameEn.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 6),
    posts: postList.filter((p) => `${p.title} ${p.excerpt}`.includes(term)).slice(0, 5),
  };
}
