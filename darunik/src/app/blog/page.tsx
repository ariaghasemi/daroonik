import Image from "@/components/site-image";
import Link from "next/link";
import type { Metadata } from "next";
import { BlogIcon } from "@/components/icons";
import { Breadcrumbs, SectionHeader } from "@/components/ui";
import { getPosts } from "@/lib/store";
import { BLOG_CATEGORIES } from "@/data/posts";
import { toFa } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "مجله سلامت | مقالات آموزشی دارو، مکمل و مراقبت پوست",
  description:
    "مجله سلامت دارونیک؛ مقالات آموزشی درباره مکمل‌های ورزشی، ویتامین‌ها، مراقبت پوست و مو، سلامت خانواده و تجهیزات پزشکی به زبان ساده.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "مجله سلامت" }]} />
      <h1 className="text-[22px]">مجله سلامت دارونیک</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        در مجله سلامت دارونیک، مطالب آموزشی درباره انتخاب و مصرف درست مکمل‌ها، مراقبت از پوست و مو، سلامت کودکان و
        استفاده صحیح از تجهیزات پزشکی خانگی منتشر می‌شود. همه مطالب با نگاه آموزشی نوشته شده‌اند و جایگزین توصیه پزشک
        نیستند.
      </p>

      <nav aria-label="دسته‌بندی مقالات" className="rail mt-4 flex gap-2 overflow-x-auto pb-1">
        {BLOG_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}`} className="chip shrink-0 gap-2 py-2">
            <BlogIcon slug={c.slug} size={15} />
            {c.title}
          </Link>
        ))}
      </nav>

      <article className="card mt-5 grid overflow-hidden md:grid-cols-2">
        <Link href={`/blog/${featured.slug}`} className="relative aspect-[16/9] md:aspect-auto">
          <Image src={featured.cover} alt={featured.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
        </Link>
        <div className="p-5">
          <span className="badge gap-1.5 bg-brand-50 text-brand-700">
            <BlogIcon slug={featured.categorySlug} size={14} />
            {featured.categoryTitle}
          </span>
          <h2 className="mt-3 text-[19px] leading-9">
            <Link href={`/blog/${featured.slug}`} className="hover:text-brand-600">{featured.title}</Link>
          </h2>
          <p className="mt-3 text-[13px] leading-8 text-ink-500">{featured.excerpt}</p>
          <div className="num mt-4 flex items-center gap-3 text-[11.5px] text-ink-300">
            <span>{featured.author}</span>
            <span>· {featured.publishedAt}</span>
            <span>· {toFa(featured.readMinutes)} دقیقه</span>
          </div>
        </div>
      </article>

      <div className="mt-6">
        <SectionHeader title="تازه‌ترین مقالات" subtitle="راهنماهای کاربردی برای انتخاب و مصرف درست محصولات سلامت" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <article key={post.slug} className="card group overflow-hidden">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/9]">
                  <Image src={post.cover} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-black text-brand-700">
                    {post.categoryTitle}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-[14px] leading-7 group-hover:text-brand-600">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-7 text-ink-500">{post.excerpt}</p>
                  <div className="num mt-3 flex items-center gap-2 text-[11px] text-ink-300">
                    <span>{post.publishedAt}</span>
                    <span>· {toFa(post.readMinutes)} دقیقه مطالعه</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
