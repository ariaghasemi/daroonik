import type { Metadata } from "next";
import { CompareView } from "@/components/account-client";
import { getBrands, getProducts } from "@/lib/store";

export const metadata: Metadata = { title: "لیست مقایسه", robots: { index: false, follow: false } };

export default async function ComparePage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    price: p.price,
    oldPrice: p.oldPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    brandName: brands.find((b) => b.slug === p.brandSlug)?.name ?? "",
    brand: brands.find((b) => b.slug === p.brandSlug)?.name ?? "",
    brandSlug: p.brandSlug,
    isNew: p.isNew,
    isBestseller: p.isBestseller,
    specs: p.specs,
  }));
  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">مقایسه محصولات</h1>
      <CompareView products={items} />
    </div>
  );
}
