import type { Metadata } from "next";
import { WishlistView } from "@/components/account-client";
import { getBrands, getProducts } from "@/lib/store";

export const metadata: Metadata = { title: "علاقه‌مندی‌ها", robots: { index: false, follow: false } };

export default async function WishlistPage() {
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
    brandSlug: p.brandSlug,
    isNew: p.isNew,
    isBestseller: p.isBestseller,
  }));
  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">علاقه‌مندی‌های من</h1>
      <WishlistView products={items} />
    </div>
  );
}
