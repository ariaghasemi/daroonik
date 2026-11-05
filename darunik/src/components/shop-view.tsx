"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "@/components/site-image";
import Link from "next/link";
import { FiltersPanel, SortBar, type FilterBrand } from "@/components/filters";
import { ProductGrid, type CardProduct } from "@/components/product-card";
import { CategoryIcon } from "@/components/icons";
import { Breadcrumbs, EmptyState, Pagination } from "@/components/ui";
import { applyFilters, type Product, type SortKey } from "@/lib/store";
import { BRANDS } from "@/data/catalog";
import { toFa } from "@/lib/utils";

export type SP = Record<string, string | string[] | undefined>;

const PER_PAGE = 24;

function str(sp: SP, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

function ShopViewContent({
  title,
  description,
  crumbs,
  products,
  basePath,
  defaultSort = "popular",
  subcats = [],
  banner,
}: {
  title: string;
  description?: string;
  crumbs: { title: string; href?: string }[];
  products: Product[];
  basePath: string;
  defaultSort?: SortKey;
  subcats?: { slug: string; title: string; icon: string; href: string }[];
  banner?: { image: string; title: string; desc: string; theme?: "dark" | "light" };
}) {
  const allBrands = BRANDS;
  const params = useSearchParams();
  const searchParams: SP = Object.fromEntries(params.entries());
  const brandName = (slug: string) => allBrands.find((b) => b.slug === slug)?.name ?? slug;

  const maxPrice = Math.max(...products.map((p) => p.price), 1000000);
  const facets: FilterBrand[] = allBrands
    .map((b) => ({
      slug: b.slug,
      name: b.name,
      count: products.filter((p) => p.brandSlug === b.slug).length,
    }))
    .filter((b) => b.count > 0);

  const page = Math.max(1, Number(str(searchParams, "page") ?? 1));
  const filtered = applyFilters(products, {
    brands: (str(searchParams, "brands") ?? "").split(",").filter(Boolean),
    min: Number(str(searchParams, "min") ?? 0),
    max: str(searchParams, "max") ? Number(str(searchParams, "max")) : undefined,
    rating: Number(str(searchParams, "rating") ?? 0) || undefined,
    onlyAvailable: str(searchParams, "available") === "1",
    onlyDiscount: str(searchParams, "discount") === "1",
    query: str(searchParams, "q"),
    sort: (str(searchParams, "sort") as SortKey) ?? defaultSort,
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
    }));

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (k === "page" || !v) continue;
    qs.set(k, Array.isArray(v) ? v[0] : v);
  }
  const sep = basePath.includes("?") ? "&" : "?";
  const baseHref = qs.toString() ? `${basePath}${sep}${qs.toString()}` : basePath;

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
              <p className={`text-[12px] leading-7 sm:text-[13px] ${banner.theme === "light" ? "text-ink-700" : "text-white/75"}`}>
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

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <FiltersPanel brands={facets} maxPrice={maxPrice} />
        <div className="min-w-0">
          <SortBar total={filtered.length} defaultSort={defaultSort} />
          {pageItems.length === 0 ? (
            <EmptyState
              title="محصولی با این فیلترها پیدا نشد"
              desc="می‌توانید فیلترها را حذف کنید یا دسته‌بندی دیگری را بررسی کنید. همچنین می‌توانید از جستجوی بالای صفحه استفاده کنید."
              action={
                <Link href={basePath} className="btn btn-primary">
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

export function ShopView(props: Parameters<typeof ShopViewContent>[0]) {
  return (
    <Suspense fallback={<div className="container-x py-8"><div className="skeleton h-80 rounded-2xl" /></div>}>
      <ShopViewContent {...props} />
    </Suspense>
  );
}
