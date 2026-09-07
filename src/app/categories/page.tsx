import Link from "next/link";
import type { Metadata } from "next";
import { CategoryIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";
import { getCategoryTree, getProducts } from "@/lib/store";
import { toFa } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "دسته‌بندی محصولات",
  description: "همه دسته‌بندی‌های فروشگاه دارونیک؛ مکمل ورزشی، ویتامین، مراقبت پوست و مو، بهداشت دهان، تجهیزات پزشکی و مادر و کودک.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const [tree, products] = await Promise.all([getCategoryTree(), getProducts()]);
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "دسته‌بندی محصولات" }]} />
      <h1 className="text-[22px]">دسته‌بندی محصولات دارونیک</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        ساختار دسته‌بندی دارونیک بر اساس نیازهای واقعی مشتریان داروخانه طراحی شده است؛ هر دسته اصلی شامل چند زیردسته
        تخصصی است تا سریع‌تر به محصول موردنظر برسید.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tree.map((root) => (
          <section key={root.slug} className="card p-4">
            <Link href={`/category/${root.slug}`} className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <CategoryIcon slug={root.slug} size={24} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-[15px] font-black">{root.title}</span>
                <span className="num block text-[11px] text-ink-300">
                  {toFa(products.filter((p) => p.rootSlug === root.slug).length)} کالا
                </span>
              </span>
            </Link>
            <p className="mt-3 line-clamp-3 text-[12px] leading-7 text-ink-500">{root.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {root.children.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${root.slug}/${c.slug}`} className="chip gap-1.5">
                    <CategoryIcon slug={c.slug} size={14} />
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
