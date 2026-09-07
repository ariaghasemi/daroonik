import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/store";
import { searchIndex } from "@/lib/filters";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const result = searchIndex(await getSearchIndex(), q);
  return NextResponse.json({
    products: result.products.map((p) => ({ slug: p.slug, name: p.name, image: p.image, price: p.price })),
    categories: result.categories.map((c) => ({ slug: c.slug, title: c.title, parentSlug: c.parentSlug })),
    brands: result.brands.map((b) => ({ slug: b.slug, name: b.name })),
    posts: result.posts.map((p) => ({ slug: p.slug, title: p.title })),
  });
}
