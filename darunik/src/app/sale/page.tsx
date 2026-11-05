import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { getProducts } from "@/lib/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "تخفیف‌ها و پیشنهادهای ویژه",
  description:
    "جدیدترین تخفیف‌های داروخانه آنلاین دارونیک روی مکمل‌ها، ویتامین‌ها، محصولات مراقبت پوست و مو و تجهیزات پزشکی. فرصت خرید با قیمت کمتر.",
  alternates: { canonical: "/sale" },
};

export default async function SalePage() {
  const products = await getProducts();
  const discounted = products.filter((p) => p.oldPrice && p.oldPrice > p.price);
  return (
    <ShopView
      title="تخفیف‌ها و پیشنهادهای ویژه"
      description="در این صفحه همه کالاهای دارای تخفیف دارونیک را می‌بینید. موجودی پیشنهادهای شگفت‌انگیز محدود است و قیمت‌ها پس از پایان کمپین به حالت عادی بازمی‌گردند."
      crumbs={[{ title: "تخفیف‌ها" }]}
      products={discounted}
      defaultSort="discount"
      basePath="/sale"
      banner={{
        image: "/images/hero-sports.webp",
        title: "هفته سلامت دارونیک؛ تا ۴۰٪ تخفیف",
        desc: "روی مکمل‌های ورزشی، ویتامین‌ها، مراقبت پوست و تجهیزات پزشکی منتخب",
      }}
    />
  );
}
