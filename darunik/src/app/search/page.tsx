import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search-view";

export const metadata: Metadata = {
  title: "جستجوی محصولات",
  description: "جستجو در محصولات، برندها، دسته‌بندی‌ها و مقالات دارونیک.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <Suspense fallback={<div className="container-x py-8"><div className="skeleton h-80 rounded-2xl" /></div>}><SearchView /></Suspense>;
}
