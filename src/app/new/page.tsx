import type { Metadata } from "next";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "جدیدترین محصولات",
  description:
    "تازه‌ترین محصولات اضافه‌شده به فروشگاه اینترنتی دارونیک؛ مکمل، ویتامین، محصولات پوست و مو و تجهیزات پزشکی.",
  alternates: { canonical: "/new" },
};

export default async function NewPage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <ShopViewSection
      title="جدیدترین محصولات"
      description="محصولاتی که به‌تازگی به سبد کالاهای دارونیک اضافه شده‌اند؛ از مکمل‌های تازه‌وارد تا محصولات مراقبتی جدید."
      crumbs={[{ title: "جدیدترین محصولات" }]}
      items={toShopItems(products, brands)}
      brands={brandOptions(brands)}
      basePath="/new"
      defaultSort="newest"
    />
  );
}
