import type { Metadata } from "next";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getCategoryTree, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "فروشگاه محصولات سلامت و دارویی",
  description:
    "همه محصولات دارونیک در یک صفحه؛ مکمل ورزشی، ویتامین، مراقبت پوست و مو، بهداشت دهان و دندان، تجهیزات پزشکی و مادر و کودک با امکان فیلتر بر اساس برند، قیمت و امتیاز.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const [products, brands, tree] = await Promise.all([getProducts(), getBrands(), getCategoryTree()]);
  return (
    <ShopViewSection
      title="فروشگاه دارونیک"
      description="بیش از ۵۰ محصول نمونه در هفت دسته تخصصی سلامت. با استفاده از فیلترهای کناری می‌توانید بر اساس برند، محدوده قیمت، امتیاز کاربران، موجودی و تخفیف، محصول موردنظر خود را سریع‌تر پیدا کنید."
      crumbs={[{ title: "فروشگاه" }]}
      items={toShopItems(products, brands)}
      brands={brandOptions(brands)}
      basePath="/shop"
      subcats={tree.map((t) => ({ slug: t.slug, title: t.title, icon: t.icon, href: `/category/${t.slug}` }))}
    />
  );
}
