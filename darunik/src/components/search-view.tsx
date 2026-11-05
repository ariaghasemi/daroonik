"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShopView } from "@/components/shop-view";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/data/catalog";
import { POSTS } from "@/data/posts";
import { normalizeSearch, toFa } from "@/lib/utils";

export function SearchView() {
  const q = (useSearchParams().get("q") ?? "").trim();
  const term = normalizeSearch(q);
  const matches = (text: string) => normalizeSearch(text).includes(term);
  const products = term ? PRODUCTS.map((p, i) => ({ ...p, id: i + 1 })).filter((p) => matches(`${p.name} ${p.shortDesc} ${p.brandSlug}`)) : [];
  const categories = term ? CATEGORIES.filter((c) => matches(c.title)).slice(0, 6) : [];
  const brands = term ? BRANDS.filter((b) => matches(b.name) || matches(b.nameEn)).slice(0, 6) : [];
  const posts = term ? POSTS.filter((p) => matches(`${p.title} ${p.excerpt}`)).slice(0, 5) : [];

  return (
    <>
      {(categories.length > 0 || brands.length > 0 || posts.length > 0) && (
        <div className="container-x pt-4">
          <div className="card flex flex-wrap items-center gap-2 p-3">
            <span className="text-[12px] font-bold text-ink-500">نتایج مرتبط:</span>
            {categories.map((c) => <Link key={c.slug} href={`/category/${c.parentSlug ? c.parentSlug + "/" : ""}${c.slug}`} className="chip">دسته: {c.title}</Link>)}
            {brands.map((b) => <Link key={b.slug} href={`/brand/${b.slug}`} className="chip">برند: {b.name}</Link>)}
            {posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="chip">مقاله: {p.title}</Link>)}
          </div>
        </div>
      )}
      <ShopView
        title={q ? `نتایج جستجو برای «${q}»` : "جستجو در فروشگاه"}
        description={q ? `${toFa(products.length)} محصول مرتبط با عبارت «${q}» پیدا شد.` : "برای شروع، عبارت موردنظر خود را در نوار جستجوی بالای صفحه وارد کنید."}
        crumbs={[{ title: "جستجو" }]}
        products={products}
        basePath="/search"
      />
    </>
  );
}
