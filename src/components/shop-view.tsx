"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FiltersPanel, SortBar, type FilterBrand } from "@/components/filters";
import { ProductGrid, type CardProduct } from "@/components/product-card";
import { CategoryIcon } from "@/components/icons";
import { Breadcrumbs, EmptyState, Pagination } from "@/components/ui";
import { applyFilters, type ShopItem, type SortKey } from "@/lib/filters";
import { toFa } from "@/lib/utils";

export const PER_PAGE = 24;

export type ShopViewProps = {
  title: string;
  description?: string;
  crumbs: { title: string; href?: string }[];
  items: ShopItem[];
  brands: { slug: string; name: string }[];
  basePath: string;
  subcats?: { slug: string; title: string; icon: string; href: string }[];
  banner?: { image: string; title: string; desc: string; theme?: "dark" | "light" };
  defaultSort?: SortKey;
  /** `/search` keeps its `q` param and lets the grid do the matching. */
  useQuery?: boolean;
  emptyTitle?: string;
  emptyDesc?: string;
};

type Query = Record<string, string>;

function computeListing({ items, brands, basePath, defaultSort = "popular", useQuery }: ShopViewProps, sp: Query) {
  const facets: FilterBrand[] = brands
    .map((b) => ({ slug: b.slug, name: b.name, count: items.filter((p) => p.brandSlug === b.slug).length }))
    .filter((b) => b.count > 0);

  const maxPrice = items.reduce((max, p) => Math.max(max, p.price), 1000000);
  const brandName = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug;

  const page = Math.max(1, Number(sp.page ?? 1));
  const filtered = applyFilters(items, {
    brands: (sp.brands ?? "").split(",").filter(Boolean),
    min: Number(sp.min ?? 0),
    max: sp.max ? Number(sp.max) : undefined,
    rating: Number(sp.rating ?? 0) || undefined,
    onlyAvailable: sp.available === "1",
    onlyDiscount: sp.discount === "1",
    query: useQuery ? sp.q : undefined,
    sort: (sp.sort as SortKey) ?? defaultSort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems: CardProduct[] = filtered
    .slice((current - 1) * PER_PAGE, current * PER_PAGE)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      image: p.image,
      price: p.price,
      oldPrice: p.oldPrice,
      rating: p.rating,
      reviewCount: p.reviewCount,
      stock: p.stock,
      brandName: brandName(p.brandSlug),
      brandSlug: p.brandSlug,
      isNew: p.isNew,
      isBestseller: p.isBestseller,
      shortDesc: p.shortDesc,
    }));

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (k === "page" || !v) continue;
    qs.set(k, v);
  }
  const sep = basePath.includes("?") ? "&" : "?";
  const baseHref = qs.toString() ? `${basePath}${sep}${qs.toString()}` : basePath;

  return { facets, maxPrice, filtered, pageItems, totalPages, current, baseHref };
}

/**
 * Listing shell (banner + filters + sort bar + grid + pagination). Pure presentation: the query
 * is passed in rather than read from the URL, so the same markup can be prerendered (fallback,
 * empty query) and hydrated (live query) without `useSearchParams` leaking into the fallback —
 * which would otherwise cancel the static render of the whole page.
 */
function ListingView(props: ShopViewProps, sp: Query) {
  const {
    title,
    description,
    crumbs,
    banner,
    subcats = [],
    defaultSort = "popular",
    emptyTitle = "محصولی با این فیلترها پیدا نشد",
    emptyDesc = "می‌توانید فیلترها را حذف کنید یا دسته‌بندی دیگری را بررسی کنید. همچنین می‌توانید از جستجوی بالای صفحه استفاده کنید.",
  } = props;
  const { facets, maxPrice, filtered, pageItems, totalPages, current, baseHref } = computeListing(props, sp);

  return (
    <div className="container-x py-4">
      <Breadcrumbs items={crumbs} />

      {banner && (
        <div className="relative mb-4 overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/6] w-full sm:aspect-[5/1]">
            <Image src={banner.image} alt={banner.title} fill sizes="100vw" className="object-cover" priority />
            <div
              className={
                banner.theme === "light"
                  ? "absolute inset-0 bg-gradient-to-l from-transparent to-white/85"
                  : "absolute inset-0 bg-gradient-to-l from-transparent to-ink-900/85"
              }
            />
            <div
              className={`absolute inset-y-0 right-0 flex max-w-[540px] flex-col justify-center gap-2 p-5 sm:p-8 ${
                banner.theme === "light" ? "text-ink-900" : "text-white"
              }`}
            >
              <h2 className="text-[17px] leading-8 sm:text-[24px]">{banner.title}</h2>
              <p
                className={`text-[12px] leading-7 sm:text-[13px] ${
                  banner.theme === "light" ? "text-ink-700" : "text-white/75"
                }`}
              >
                {banner.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="mb-4">
        <h1 className="text-[20px] md:text-[24px]">{title}</h1>
        {description && <p className="mt-2 max-w-4xl text-[13px] leading-8 text-ink-500">{description}</p>}
      </header>

      {subcats.length > 0 && (
        <nav aria-label="زیر دسته‌ها" className="rail mb-4 flex gap-2 overflow-x-auto pb-1">
          {subcats.map((s) => (
            <Link key={s.slug} href={s.href} className="chip shrink-0 gap-2 py-2">
              <CategoryIcon slug={s.slug} size={15} />
              {s.title}
            </Link>
          ))}
        </nav>
      )}

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <FiltersPanel brands={facets} maxPrice={maxPrice} query={sp} />
        <div className="min-w-0">
          <SortBar total={filtered.length} defaultSort={defaultSort} query={sp} />
          {pageItems.length === 0 ? (
            <EmptyState
              title={emptyTitle}
              desc={emptyDesc}
              action={
                <Link href={props.basePath} className="btn btn-primary">
                  حذف فیلترها
                </Link>
              }
            />
          ) : (
            <>
              <p className="num mb-3 text-[12px] text-ink-500 md:hidden">{toFa(filtered.length)} کالا یافت شد</p>
              <ProductGrid items={pageItems} />
              <Pagination page={current} totalPages={totalPages} baseHref={baseHref} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive listing. Filter/sort/page state lives in the URL query string and is read on the
 * client, which is what lets every listing page be prerendered to a static file on Cloudflare
 * Pages while `/shop?brands=x&sort=cheap` still works, stays linkable and keeps the back button.
 */
export function ShopView(props: ShopViewProps) {
  const params = useSearchParams();
  const sp = useMemo(() => {
    const out: Query = {};
    params.forEach((value, key) => {
      if (!(key in out)) out[key] = value;
    });
    return out;
  }, [params]);

  return ListingView(props, sp);
}

/**
 * The same view with an empty query — used as the Suspense fallback so the prerendered HTML of
 * every listing page contains the real product grid (SEO + no skeleton flash) instead of a
 * placeholder. On hydration it renders nothing extra; `ShopView` simply takes over.
 */
export function ShopViewInitial(props: ShopViewProps) {
  return ListingView(props, {});
}
