import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { getProducts } from "@/lib/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "جدیدترین محصولات",
  description: "تازه‌ترین محصولات اضافه‌شده به فروشگاه اینترنتی دارونیک؛ مکمل، ویتامین، محصولات پوست و مو و تجهیزات پزشکی.",
  alternates: { canonical: "/new" },
};

export default async function NewPage() {
  const products = await getProducts();
  return (
    <ShopView
      title="جدیدترین محصولات"
      description="محصولاتی که به‌تازگی به سبد کالاهای دارونیک اضافه شده‌اند؛ از مکمل‌های تازه‌وارد تا محصولات مراقبتی جدید."
      crumbs={[{ title: "جدیدترین محصولات" }]}
      products={products}
      defaultSort="newest"
      basePath="/new"
    />
  );
}
