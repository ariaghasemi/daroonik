import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { getProducts } from "@/lib/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "پرفروش‌ترین محصولات",
  description: "پرفروش‌ترین محصولات داروخانه آنلاین دارونیک بر اساس خرید مشتریان؛ انتخابی مطمئن برای خرید آنلاین.",
  alternates: { canonical: "/bestsellers" },
};

export default async function BestsellersPage() {
  const products = await getProducts();
  return (
    <ShopView
      title="پرفروش‌ترین محصولات"
      description="این فهرست بر اساس تعداد فروش محصولات در فروشگاه مرتب شده است؛ اگر در انتخاب تردید دارید، از این صفحه شروع کنید."
      crumbs={[{ title: "پرفروش‌ترین‌ها" }]}
      products={products.filter((p) => p.isBestseller || p.sold > 700)}
      defaultSort="popular"
      basePath="/bestsellers"
    />
  );
}
