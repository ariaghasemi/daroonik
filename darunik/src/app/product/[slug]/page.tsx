import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product-view";
import { ProductRail, type CardProduct } from "@/components/product-card";
import { Breadcrumbs, SectionHeader } from "@/components/ui";
import { getBrands, getCategories, getProductBySlug, getProducts, getReviews } from "@/lib/store";
import { PRODUCTS } from "@/data/catalog";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "محصول یافت نشد" };
  return {
    title: `خرید ${p.name} | قیمت و مشخصات`,
    description: `${p.shortDesc} خرید اینترنتی ${p.name} با تضمین اصالت کالا و ارسال سریع از داروخانه آنلاین دارونیک.`.slice(0, 180),
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      type: "website",
      title: p.name,
      description: p.shortDesc,
      images: [p.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, products, brands, cats, reviews] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getBrands(),
    getCategories(),
    getReviews(slug),
  ]);
  if (!product) notFound();

  const brand = brands.find((b) => b.slug === product.brandSlug);
  const leaf = cats.find((c) => c.slug === product.categorySlug);
  const root = cats.find((c) => c.slug === product.rootSlug);
  const brandName = (s: string) => brands.find((b) => b.slug === s)?.name ?? s;

  const toCard = (p: (typeof products)[number]): CardProduct => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    price: p.price,
    oldPrice: p.oldPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    brandName: brandName(p.brandSlug),
    brandSlug: p.brandSlug,
    isNew: p.isNew,
    isBestseller: p.isBestseller,
  });

  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 10);
  const similar = products
    .filter((p) => p.rootSlug === product.rootSlug && p.categorySlug !== product.categorySlug)
    .slice(0, 10);
  const complementary = products
    .filter((p) => p.brandSlug === product.brandSlug && p.slug !== product.slug)
    .concat(products.filter((p) => p.rootSlug !== product.rootSlug).slice(0, 6))
    .slice(0, 10);

  const rootBanner: Record<string, string> = {
    "sports-supplements": "/images/hero-sports.webp",
    vitamins: "/images/hero-vitamins.webp",
    "skin-care": "/images/hero-skincare.webp",
    "hair-care": "/images/hero-skincare.webp",
    "oral-care": "/images/hero-vitamins.webp",
    "medical-devices": "/images/banner-devices.webp",
    "mom-baby": "/images/banner-mom.webp",
  };

  const gallery = [product.image, leaf?.image ?? product.image, rootBanner[product.rootSlug] ?? product.image];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${SITE.url}${product.image}`],
    description: product.shortDesc,
    sku: product.slug,
    brand: { "@type": "Brand", name: brand?.name ?? "" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.price * 10,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE.url },
      { "@type": "ListItem", position: 2, name: root?.title ?? "", item: `${SITE.url}/category/${product.rootSlug}` },
      {
        "@type": "ListItem",
        position: 3,
        name: leaf?.title ?? "",
        item: `${SITE.url}/category/${product.rootSlug}/${product.categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: `${SITE.url}/product/${product.slug}` },
    ],
  };

  return (
    <div className="container-x space-y-6 py-4">
      <Breadcrumbs
        items={[
          { title: root?.title ?? "", href: `/category/${product.rootSlug}` },
          { title: leaf?.title ?? "", href: `/category/${product.rootSlug}/${product.categorySlug}` },
          { title: product.name },
        ]}
      />

      <ProductView
        p={{
          slug: product.slug,
          name: product.name,
          brandName: brand?.name ?? "",
          brandSlug: product.brandSlug,
          image: product.image,
          gallery,
          price: product.price,
          oldPrice: product.oldPrice,
          rating: product.rating,
          reviewCount: product.reviewCount,
          stock: product.stock,
          sold: product.sold,
          shortDesc: product.shortDesc,
          description: product.description,
          specs: product.specs,
          variants: product.variants,
          usage: product.usage,
          warning: product.warning,
          faq: product.faq,
          isNew: product.isNew,
          isBestseller: product.isBestseller,
        }}
        reviews={reviews}
      />

      <section>
        <SectionHeader title="محصولات مرتبط" subtitle={`سایر کالاهای دسته ${leaf?.title ?? ""}`} href={`/category/${product.rootSlug}/${product.categorySlug}`} />
        <div className="card p-4">
          <ProductRail items={related.map(toCard)} />
        </div>
      </section>

      <section>
        <SectionHeader title="محصولات مشابه" subtitle={`گزینه‌های دیگر در ${root?.title ?? ""}`} href={`/category/${product.rootSlug}`} />
        <div className="card p-4">
          <ProductRail items={similar.map(toCard)} />
        </div>
      </section>

      <section>
        <SectionHeader title="مکمل این خرید" subtitle="کالاهایی که معمولاً همراه این محصول خریداری می‌شوند" href="/shop" />
        <div className="card p-4">
          <ProductRail items={complementary.map(toCard)} />
        </div>
      </section>

      <section className="card p-5">
        <h2 className="text-[16px]">راهنمای خرید {leaf?.title ?? ""}</h2>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          پیش از خرید، مشخصات فنی، روش مصرف و هشدارهای محصول را مطالعه کنید. اگر درباره انتخاب بین چند محصول تردید
          دارید، مقالات <Link href="/blog" className="font-bold text-brand-600">مجله سلامت</Link> یا مشاوره داروسازان
          دارونیک می‌تواند کمک‌کننده باشد. همچنین می‌توانید محصولات این دسته را در صفحه{" "}
          <Link href={`/category/${product.rootSlug}/${product.categorySlug}`} className="font-bold text-brand-600">
            {leaf?.title ?? ""}
          </Link>{" "}
          مقایسه کنید.
        </p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
