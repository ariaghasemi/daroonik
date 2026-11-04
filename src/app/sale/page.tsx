import type { Metadata } from "next";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "تخفیف‌ها و پیشنهادهای ویژه",
  description:
    "جدیدترین تخفیف‌های داروخانه آنلاین دارونیک روی مکمل‌ها، ویتامین‌ها، محصولات مراقبت پوست و مو و تجهیزات پزشکی. فرصت خرید با قیمت کمتر.",
  alternates: { canonical: "/sale" },
};

export default async function SalePage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <ShopViewSection
      title="تخفیف‌ها و پیشنهادهای ویژه"
      description="در این صفحه همه کالاهای دارای تخفیف دارونیک را می‌بینید. موجودی پیشنهادهای شگفت‌انگیز محدود است و قیمت‌ها پس از پایان کمپین به حالت عادی بازمی‌گردند."
      crumbs={[{ title: "تخفیف‌ها" }]}
      items={toShopItems(
        products.filter((p) => p.oldPrice && p.oldPrice > p.price),
        brands,
      )}
      brands={brandOptions(brands)}
      basePath="/sale"
      defaultSort="discount"
      banner={{
        image: "/images/hero-sports.webp",
        title: "هفته سلامت دارونیک؛ تا ۴۰٪ تخفیف",
        desc: "روی مکمل‌های ورزشی، ویتامین‌ها، مراقبت پوست و تجهیزات پزشکی منتخب",
      }}
    />
  );
}
