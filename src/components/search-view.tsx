"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ShopView, ShopViewInitial, type ShopViewProps } from "@/components/shop-view";
import { searchIndex, type SearchIndex, type ShopItem } from "@/lib/filters";
import { toFa } from "@/lib/utils";

type SearchProps = {
  items: ShopItem[];
  brands: { slug: string; name: string }[];
  index: SearchIndex;
};

function chipsFor(index: SearchIndex, q: string) {
  const extra = searchIndex(index, q);
  if (!q || (extra.categories.length === 0 && extra.brands.length === 0 && extra.posts.length === 0)) return null;
  return (
    <div className="container-x pt-4">
      <div className="card flex flex-wrap items-center gap-2 p-3">
        <span className="text-[12px] font-bold text-ink-500">نتایج مرتبط:</span>
        {extra.categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.parentSlug ? c.parentSlug + "/" : ""}${c.slug}`} className="chip">
            دسته: {c.title}
          </Link>
        ))}
        {extra.brands.map((b) => (
          <Link key={b.slug} href={`/brand/${b.slug}`} className="chip">
            برند: {b.name}
          </Link>
        ))}
        {extra.posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="chip">
            مقاله: {p.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function shopProps({ items, brands }: SearchProps, q: string): ShopViewProps {
  const scoped = q ? items.filter((p) => `${p.name} ${p.shortDesc} ${p.brandSlug}`.includes(q)) : [];
  return {
    title: q ? `نتایج جستجو برای «${q}»` : "جستجو در فروشگاه",
    description: q
      ? `${toFa(scoped.length)} محصول مرتبط با عبارت «${q}» پیدا شد. می‌توانید نتایج را با فیلترهای کناری محدودتر کنید.`
      : "برای شروع، عبارت موردنظر خود را در نوار جستجوی بالای صفحه وارد کنید؛ مثلاً «مولتی ویتامین»، «ضد آفتاب» یا «فشارسنج».",
    crumbs: [{ title: "جستجو" }],
    items: q ? items : [],
    brands,
    basePath: `/search?q=${encodeURIComponent(q)}`,
    useQuery: true,
    emptyTitle: q ? "محصولی با این عبارت پیدا نشد" : "هنوز عبارتی وارد نکرده‌اید",
    emptyDesc: q
      ? "می‌توانید املای عبارت را کوتاه‌تر کنید یا از فیلترهای برند استفاده کنید."
      : "برای شروع، عبارت موردنظر خود را در نوار جستجوی بالای صفحه وارد کنید.",
  };
}

/** `/search?q=…` — matched on the client against the preloaded index, so search works with no API. */
export function SearchView({ items, brands, index }: SearchProps) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const chips = useMemo(() => chipsFor(index, q), [index, q]);
  return (
    <>
      {chips}
      <ShopView {...shopProps({ items, brands, index }, q)} />
    </>
  );
}

/**
 * Same UI without a query — the prerendered fallback, so `/search` ships real markup.
 * Deliberately hook-free (`ShopViewInitial`): a fallback that read the URL would cancel the
 * static render of the whole page.
 */
export function SearchInitial(props: SearchProps) {
  return <ShopViewInitial {...shopProps(props, "")} />;
}
