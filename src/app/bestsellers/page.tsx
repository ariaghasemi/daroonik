import type { Metadata } from "next";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "پرفروش‌ترین محصولات",
  description:
    "پرفروش‌ترین محصولات داروخانه آنلاین دارونیک بر اساس خرید مشتریان؛ انتخابی مطمئن برای خرید آنلاین.",
  alternates: { canonical: "/bestsellers" },
};

export default async function BestsellersPage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <ShopViewSection
      title="پرفروش‌ترین محصولات"
      description="این فهرست بر اساس تعداد فروش محصولات در فروشگاه مرتب شده است؛ اگر در انتخاب تردید دارید، از این صفحه شروع کنید."
      crumbs={[{ title: "پرفروش‌ترین‌ها" }]}
      items={toShopItems(
        products.filter((p) => p.isBestseller || p.sold > 700),
        brands,
      )}
      brands={brandOptions(brands)}
      basePath="/bestsellers"
      defaultSort="popular"
    />
  );
}
