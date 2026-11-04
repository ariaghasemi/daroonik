import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchInitial, SearchView } from "@/components/search-view";
import { getBrands, getProducts, getSearchIndex } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";

export const metadata: Metadata = {
  title: "جستجوی محصولات",
  description: "جستجو در میان محصولات، برندها، دسته‌بندی‌ها و مقالات مجله سلامت دارونیک.",
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const [products, brands, index] = await Promise.all([getProducts(), getBrands(), getSearchIndex()]);
  const view = { items: toShopItems(products, brands), brands: brandOptions(brands), index };
  return (
    <Suspense fallback={<SearchInitial {...view} />}>
      <SearchView {...view} />
    </Suspense>
  );
}
