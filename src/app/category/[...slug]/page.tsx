import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopViewSection } from "@/components/shop-view-section";
import { getBrands, getCategories, getProducts } from "@/lib/store";
import { brandOptions, toShopItems } from "@/lib/filters";
import { CATEGORIES } from "@/data/catalog";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;
// Every category path is prerendered from the catalog (required for a static host such as Cloudflare Pages).
export const dynamicParams = false;

export function generateStaticParams() {
  const roots = CATEGORIES.filter((c) => !c.parentSlug).map((c) => ({ slug: [c.slug] }));
  const children = CATEGORIES.filter((c) => c.parentSlug).map((c) => ({ slug: [c.parentSlug as string, c.slug] }));
  return [...roots, ...children];
}

const BANNERS: Record<string, { image: string; theme: "dark" | "light" }> = {
  "sports-supplements": { image: "/images/hero-sports.webp", theme: "dark" },
  vitamins: { image: "/images/hero-vitamins.webp", theme: "light" },
  "skin-care": { image: "/images/hero-skincare.webp", theme: "light" },
  "hair-care": { image: "/images/hero-skincare.webp", theme: "light" },
  "oral-care": { image: "/images/hero-vitamins.webp", theme: "light" },
  "medical-devices": { image: "/images/banner-devices.webp", theme: "dark" },
  "mom-baby": { image: "/images/banner-mom.webp", theme: "light" },
};

async function resolve(slugs: string[]) {
  const cats = await getCategories();
  const leafSlug = slugs[slugs.length - 1];
  const cat = cats.find((c) => c.slug === leafSlug);
  if (!cat) return null;
  const root = cat.parentSlug ? cats.find((c) => c.slug === cat.parentSlug) ?? cat : cat;
  return { cat, root, children: cats.filter((c) => c.parentSlug === cat.slug) };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = await resolve(slug);
  if (!found) return { title: "دسته‌بندی یافت نشد" };
  const path = found.cat.parentSlug ? `${found.cat.parentSlug}/${found.cat.slug}` : found.cat.slug;
  return {
    title: `خرید ${found.cat.title} | قیمت و مشخصات`,
    description: found.cat.description.slice(0, 175),
    alternates: { canonical: `/category/${path}` },
    openGraph: {
      title: `خرید اینترنتی ${found.cat.title} از دارونیک`,
      description: found.cat.description.slice(0, 175),
      images: [found.cat.image],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const found = await resolve(slug);
  if (!found) notFound();
  const { cat, root, children } = found;
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const scoped = cat.parentSlug
    ? products.filter((p) => p.categorySlug === cat.slug)
    : products.filter((p) => p.rootSlug === cat.slug);

  const path = cat.parentSlug ? `${cat.parentSlug}/${cat.slug}` : cat.slug;
  const crumbs = cat.parentSlug
    ? [
        { title: "دسته‌بندی‌ها", href: "/categories" },
        { title: root.title, href: `/category/${root.slug}` },
        { title: cat.title },
      ]
    : [{ title: "دسته‌بندی‌ها", href: "/categories" }, { title: cat.title }];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE.url },
      { "@type": "ListItem", position: 2, name: root.title, item: `${SITE.url}/category/${root.slug}` },
      ...(cat.parentSlug
        ? [{ "@type": "ListItem", position: 3, name: cat.title, item: `${SITE.url}/category/${path}` }]
        : []),
    ],
  };

  const banner = BANNERS[root.slug];

  return (
    <>
      <ShopViewSection
        title={`خرید ${cat.title}`}
        description={cat.description}
        crumbs={crumbs}
        items={toShopItems(scoped, brands)}
        brands={brandOptions(brands)}
        basePath={`/category/${path}`}
        subcats={children.map((c) => ({
          slug: c.slug,
          title: c.title,
          icon: c.icon,
          href: `/category/${cat.slug}/${c.slug}`,
        }))}
        banner={
          banner
            ? {
                image: banner.image,
                theme: banner.theme,
                title: `${cat.title} در دارونیک`,
                desc: "تضمین اصالت کالا، ارسال سریع سراسری و امکان مشاوره رایگان با داروساز پیش از خرید",
              }
            : undefined
        }
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
