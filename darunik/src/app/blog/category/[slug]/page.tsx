import Image from "@/components/site-image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIcon } from "@/components/icons";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { getPosts } from "@/lib/store";
import { BLOG_CATEGORIES } from "@/data/posts";
import { toFa } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "دسته یافت نشد" };
  return {
    title: `مقالات ${cat.title} | مجله سلامت`,
    description: `مجموعه مقالات آموزشی مجله سلامت دارونیک در دسته ${cat.title}.`,
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = (await getPosts()).filter((p) => p.categorySlug === slug);

  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "مجله سلامت", href: "/blog" }, { title: cat.title }]} />
      <h1 className="flex items-center gap-2 text-[22px]">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <BlogIcon slug={cat.slug} size={20} />
        </span>
        مقالات دسته {cat.title}
      </h1>
      <div className="mt-5">
        {posts.length === 0 ? (
          <EmptyState
            title="فعلاً مقاله‌ای در این دسته منتشر نشده"
            desc="می‌توانید سایر دسته‌های مجله سلامت را بررسی کنید."
            action={<Link href="/blog" className="btn btn-primary">بازگشت به مجله</Link>}
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="card group overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/9]">
                    <Image src={post.cover} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h2 className="line-clamp-2 text-[14px] leading-7 group-hover:text-brand-600">{post.title}</h2>
                    <p className="mt-2 line-clamp-2 text-[12px] leading-7 text-ink-500">{post.excerpt}</p>
                    <span className="num mt-3 block text-[11px] text-ink-300">{post.publishedAt} · {toFa(post.readMinutes)} دقیقه</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
