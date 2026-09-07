import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";
import { BRANDS } from "@/data/catalog";

export const revalidate = 3600;
// Every brand page is prerendered from the catalog (required for a static host such as Cloudflare Pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = (await getBrands()).find((b) => b.slug === slug);
  if (!brand) return { title: "برند یافت نشد" };
  return {
    title: `محصولات برند ${brand.name}`,
    description: `خرید اینترنتی محصولات برند ${brand.name} (${brand.nameEn}) در داروخانه آنلاین دارونیک با ارسال سریع و تضمین اصالت کالا.`,
    alternates: { canonical: `/brand/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, brands, products] = await Promise.all([params, getBrands(), getProducts()]);
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  return (
    <ShopViewSection
      title={`محصولات برند ${brand.name}`}
      description={brand.description}
      crumbs={[{ title: "برندها", href: "/brands" }, { title: brand.name }]}
      items={toShopItems(
        products.filter((p) => p.brandSlug === slug),
        brands,
      )}
      brands={brandOptions(brands)}
      basePath={`/brand/${slug}`}
    />
  );
}
