import { BasePathImage } from "@/components/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert, BlogIcon, ChevronDown, Phone, Stethoscope } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";
import { getPostBySlug, getPosts } from "@/lib/store";
import { POSTS } from "@/data/posts";
import { SITE, toFa } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "مقاله یافت نشد" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.cover],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPostBySlug(slug), getPosts()]);
  if (!post) notFound();

  const related = post.related
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const headings = post.blocks.filter((b) => b.type === "h2");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [`${SITE.url}${post.cover}`],
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "دارونیک" },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container-x py-4">
      <Breadcrumbs
        items={[
          { title: "مجله سلامت", href: "/blog" },
          { title: post.categoryTitle, href: `/blog/category/${post.categorySlug}` },
          { title: post.title },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <article className="card overflow-hidden">
          <div className="relative aspect-[16/8]">
            <BasePathImage src={post.cover} alt={post.title} fill sizes="(max-width:1024px) 100vw, 800px" priority className="object-cover" />
          </div>
          <div className="p-5 md:p-7">
            <span className="badge gap-1.5 bg-brand-50 text-brand-700">
              <BlogIcon slug={post.categorySlug} size={14} />
              {post.categoryTitle}
            </span>
            <h1 className="mt-3 text-[22px] leading-10 md:text-[26px]">{post.title}</h1>
            <div className="num mt-3 flex flex-wrap items-center gap-3 border-b border-line pb-4 text-[11.5px] text-ink-300">
              <span>{post.author}</span>
              <span>· {post.publishedAt}</span>
              <span>· {toFa(post.readMinutes)} دقیقه مطالعه</span>
            </div>

            {headings.length > 2 && (
              <nav aria-label="فهرست مطالب" className="mt-5 rounded-2xl bg-surface p-4">
                <p className="mb-2 text-[13px] font-black">فهرست مطالب</p>
                <ul className="space-y-1.5">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a href={`#h-${i}`} className="text-[12.5px] font-medium text-ink-700 hover:text-brand-600">
                        {toFa(i + 1)}. {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="prose-fa mt-5 max-w-none">
              {post.blocks.map((b, i) => {
                if (b.type === "h2") {
                  const idx = headings.indexOf(b);
                  return (
                    <h2 key={i} id={`h-${idx}`}>
                      {b.text}
                    </h2>
                  );
                }
                if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "ul")
                  return (
                    <ul key={i}>
                      {(b.items ?? []).map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  );
                if (b.type === "note")
                  return (
                    <p key={i} className="flex gap-2 rounded-2xl border-r-4 border-gold-400 bg-[#fffaf0] p-4 text-[13px] leading-8">
                      <Alert size={18} className="mt-1.5 shrink-0 text-gold-400" />
                      <span>{b.text}</span>
                    </p>
                  );
                return <p key={i} dangerouslySetInnerHTML={{ __html: b.text ?? "" }} />;
              })}
            </div>

            <section className="mt-8">
              <h2 className="text-[17px]">سؤالات متداول</h2>
              <ul className="mt-3 space-y-2">
                {post.faq.map((f, i) => (
                  <li key={i} className="overflow-hidden rounded-xl border border-line">
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[13px] font-bold">
                        {f.q}
                        <ChevronDown size={16} className="shrink-0 text-brand-500" />
                      </summary>
                      <p className="border-t border-line px-4 py-3 text-[13px] leading-8 text-ink-700">{f.a}</p>
                    </details>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-surface p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Stethoscope size={22} strokeWidth={1.5} />
              </span>
              <p className="text-[12.5px] leading-7 text-ink-500">
                نویسنده: <strong className="text-ink-900">{post.author}</strong> — محتوای این مقاله آموزشی است و
                جایگزین تشخیص یا تجویز پزشک نیست.
              </p>
            </div>
          </div>
        </article>

        <aside className="space-y-3">
          <div className="card p-4">
            <h2 className="mb-3 text-[15px]">مطالب مرتبط</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="flex gap-2">
                    <BasePathImage src={r.cover} alt={r.title} width={64} height={48} className="h-12 w-16 rounded-lg object-cover" />
                    <span className="line-clamp-2 text-[12.5px] font-bold leading-6 hover:text-brand-600">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
            <h2 className="text-[15px] text-white">مشاوره رایگان با داروساز</h2>
            <p className="mt-2 text-[12px] leading-7 text-white/75">
              اگر در انتخاب محصول مناسب تردید دارید، پیش از خرید با کارشناسان دارونیک تماس بگیرید.
            </p>
            <Link href="/contact" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[12px] font-black text-brand-700">
              <Phone size={14} />
              تماس با ما
            </Link>
          </div>
        </aside>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
