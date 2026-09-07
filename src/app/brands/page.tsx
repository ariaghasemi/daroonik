import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";
import { getBrands, getProducts } from "@/lib/store";
import { toFa } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "برندها",
  description: "فهرست برندهای نمونه فروشگاه دارونیک در حوزه مکمل، ویتامین، مراقبت پوست و مو و تجهیزات پزشکی.",
  alternates: { canonical: "/brands" },
};

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "برندها" }]} />
      <h1 className="text-[22px]">برندهای فروشگاه دارونیک</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        برندهای زیر برای این نمونه‌کار طراحی شده‌اند و واقعی نیستند؛ هدف، نمایش ساختار صفحه برند و ارتباط آن با
        محصولات فروشگاه است.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {brands.map((b) => (
          <Link key={b.slug} href={`/brand/${b.slug}`} className="card p-5 transition hover:shadow-[var(--shadow-pop)]">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-[18px] font-black">{b.name}</span>
              <span className="text-[11px] tracking-[0.2em] text-ink-300">{b.nameEn.toUpperCase()}</span>
            </div>
            <p className="mt-3 line-clamp-3 text-[12.5px] leading-7 text-ink-500">{b.description}</p>
            <div className="mt-4 flex items-center justify-between text-[12px] font-bold">
              <span className="num text-ink-500">
                {toFa(products.filter((p) => p.brandSlug === b.slug).length)} کالا
              </span>
              <span className="flex items-center gap-1 text-brand-600">
                مشاهده محصولات
                <ChevronLeft size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
