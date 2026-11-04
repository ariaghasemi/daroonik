import { BasePathImage } from "@/components/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroSlider, Countdown } from "@/components/home-client";
import { ProductCard, ProductGrid, ProductRail, type CardProduct } from "@/components/product-card";
import { CategoryIcon, ChevronLeft, CreditCard, Gift, Package, ShieldCheck, Stethoscope, Truck } from "@/components/icons";
import { SectionHeader, TrustRow } from "@/components/ui";
import { getBrands, getCategoryTree, getPosts, getProducts, applyFilters } from "@/lib/store";
import { discountPercent, toFa } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "دارونیک | داروخانه آنلاین و فروشگاه اینترنتی محصولات سلامت",
  description:
    "خرید اینترنتی مکمل ورزشی، ویتامین، محصولات مراقبت پوست و مو، تجهیزات پزشکی و کالای مادر و کودک با ارسال سریع، قیمت مناسب و تضمین اصالت کالا در داروخانه آنلاین دارونیک.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [products, brands, tree, posts] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategoryTree(),
    getPosts(),
  ]);

  const brandName = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? "";
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

  const bestSellers = applyFilters(products, { sort: "popular" }).slice(0, 12).map(toCard);
  const deals = applyFilters(products, { onlyDiscount: true, sort: "discount" }).slice(0, 10).map(toCard);
  const sports = applyFilters(products, { root: "sports-supplements", sort: "popular" }).slice(0, 10).map(toCard);
  const skin = applyFilters(products, { root: "skin-care", sort: "popular" }).slice(0, 10).map(toCard);
  const beauty = applyFilters(products, { root: "hair-care", sort: "popular" })
    .concat(applyFilters(products, { root: "oral-care", sort: "popular" }))
    .slice(0, 10)
    .map(toCard);
  const devices = applyFilters(products, { root: "medical-devices", sort: "popular" }).slice(0, 10).map(toCard);
  const fresh = applyFilters(products, { sort: "newest" }).slice(0, 8).map(toCard);
  const discounted = applyFilters(products, { onlyDiscount: true, sort: "popular" }).slice(10, 18).map(toCard);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8).map(toCard);

  const popularCats = tree.flatMap((t) => t.children).slice(0, 12);

  return (
    <div className="container-x space-y-10 py-4 lg:py-6">
      {/* HERO */}
      <section className="grid gap-3 lg:grid-cols-[1fr_300px]">
        <HeroSlider />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <Link
            href="/category/medical-devices"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#16324f] to-[#0b1c2d] p-4 text-white"
          >
            <div className="relative z-10">
              <p className="text-[13px] font-black">تجهیزات پزشکی خانگی</p>
              <p className="mt-1 text-[11px] leading-6 text-white/70">فشارسنج، گلوکومتر و نبولایزر</p>
            </div>
            <span className="relative z-10 mt-3 w-fit rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-bold">
              خرید با گارانتی
            </span>
            <BasePathImage
              src="/images/banner-devices.webp"
              alt="تجهیزات پزشکی خانگی"
              fill
              sizes="300px"
              className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          <Link
            href="/category/mom-baby"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#fdece2] p-4 text-ink-900"
          >
            <div className="relative z-10">
              <p className="text-[13px] font-black">دنیای مادر و کودک</p>
              <p className="mt-1 text-[11px] leading-6 text-ink-700">محصولات ملایم مخصوص پوست نوزاد</p>
            </div>
            <span className="relative z-10 mt-3 w-fit rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-brand-700">
              مشاهده محصولات
            </span>
            <BasePathImage
              src="/images/banner-mom.webp"
              alt="محصولات مادر و کودک"
              fill
              sizes="300px"
              className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      <TrustRow />

      {/* CATEGORIES */}
      <section aria-labelledby="cats-title">
        <SectionHeader title="دسته‌بندی‌های محبوب" subtitle="سریع‌ترین مسیر رسیدن به محصول موردنیاز شما" href="/categories" />
        <div className="card grid grid-cols-3 gap-2 p-4 sm:grid-cols-4 lg:grid-cols-6">
          {popularCats.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.parentSlug}/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl p-2 text-center transition hover:bg-surface"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-100 group-hover:text-brand-700">
                <CategoryIcon slug={c.slug} size={26} strokeWidth={1.5} />
              </span>
              <span className="text-[11.5px] font-bold leading-5">{c.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* DEALS */}
      <section aria-labelledby="deals-title" className="overflow-hidden rounded-2xl bg-gradient-to-l from-[#c62422] to-[#8f1512]">
        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-stretch">
          <div className="flex shrink-0 flex-row items-center justify-between gap-3 lg:w-[190px] lg:flex-col lg:items-start lg:justify-center">
            <div>
              <h2 id="deals-title" className="text-[18px] text-white">
                پیشنهاد شگفت‌انگیز
              </h2>
              <p className="mt-1 text-[11px] text-white/70">تخفیف‌های روزانه با موجودی محدود</p>
            </div>
            <Countdown hours={8} />
            <Link href="/sale" className="hidden w-full justify-center rounded-xl bg-white/15 py-2 text-[12px] font-bold text-white hover:bg-white/25 lg:flex">
              مشاهده همه پیشنهادها
            </Link>
          </div>
          <div className="min-w-0 flex-1 rounded-xl bg-white/95 p-3">
            <ProductRail items={deals} />
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section aria-labelledby="best-title">
        <SectionHeader title="پرفروش‌ترین محصولات" subtitle="انتخاب هزاران مشتری دارونیک در ماه گذشته" href="/bestsellers" />
        <div className="card p-4">
          <ProductRail items={bestSellers} />
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="grid gap-3 md:grid-cols-3">
        <Link
          href="/category/sports-supplements/protein"
          className="group relative flex min-h-[170px] flex-col justify-center overflow-hidden rounded-2xl bg-[#07301f] p-5 text-white md:col-span-2"
        >
          <BasePathImage
            src="/images/hero-sports.webp"
            alt="بنر مکمل‌های ورزشی"
            fill
            sizes="(max-width:768px) 100vw, 60vw"
            className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative z-10 max-w-[320px]">
            <span className="num rounded-lg bg-sale-500 px-2 py-1 text-[11px] font-black">تا {toFa(35)}٪ تخفیف</span>
            <h3 className="mt-3 text-[19px] leading-8">هفته پروتئین و ریکاوری</h3>
            <p className="mt-1 text-[12px] leading-7 text-white/75">
              روی پروتئین وی، کراتین و آمینواسیدهای منتخب برندهای نوتری‌لایف و پیورفیت
            </p>
            <span className="mt-3 inline-block rounded-lg bg-white px-3 py-1.5 text-[12px] font-black text-brand-700">
              خرید کنید
            </span>
          </div>
        </Link>
        <Link
          href="/category/skin-care/sunscreen"
          className="group relative flex min-h-[170px] flex-col justify-center overflow-hidden rounded-2xl bg-[#fdf1ec] p-5"
        >
          <BasePathImage
            src="/images/hero-skincare.webp"
            alt="بنر ضدآفتاب و مراقبت پوست"
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative z-10">
            <span className="rounded-lg bg-brand-500 px-2 py-1 text-[11px] font-black text-white">مراقبت روزانه</span>
            <h3 className="mt-3 text-[17px] leading-7">ضدآفتاب مناسب هر نوع پوست</h3>
            <p className="mt-1 text-[12px] leading-7 text-ink-700">راهنمای انتخاب SPF و بافت مناسب</p>
          </div>
        </Link>
      </section>

      {/* SPORTS */}
      <CategorySection
        title="مکمل‌های ورزشی"
        subtitle="پروتئین، کراتین، آمینواسید و مکمل‌های پیش از تمرین"
        href="/category/sports-supplements"
        items={sports}
        chips={tree.find((t) => t.slug === "sports-supplements")?.children ?? []}
      />

      {/* SKIN */}
      <CategorySection
        title="محصولات مراقبت پوست"
        subtitle="ضدآفتاب، سرم، مرطوب‌کننده و پاک‌کننده‌های تخصصی"
        href="/category/skin-care"
        items={skin}
        chips={tree.find((t) => t.slug === "skin-care")?.children ?? []}
      />

      {/* FEATURED SELECTION */}
      <section aria-labelledby="featured-title">
        <SectionHeader title="پیشنهادهای ویژه دارونیک" subtitle="منتخب کارشناسان ما برای این هفته" href="/shop?sort=popular" accent="gold" />
        <ProductGrid items={featured} />
      </section>

      {/* BEAUTY */}
      <CategorySection
        title="آرایشی، بهداشتی و مراقبت مو"
        subtitle="شامپو، سرم مو، خمیردندان و دهان‌شویه"
        href="/category/hair-care"
        items={beauty}
        chips={tree.find((t) => t.slug === "hair-care")?.children ?? []}
      />

      {/* DEVICES */}
      <CategorySection
        title="تجهیزات پزشکی خانگی"
        subtitle="پایش سلامت در منزل با دستگاه‌های دارای گارانتی"
        href="/category/medical-devices"
        items={devices}
        chips={tree.find((t) => t.slug === "medical-devices")?.children ?? []}
      />

      {/* BRANDS */}
      <section aria-labelledby="brands-title">
        <SectionHeader title="برندهای محبوب" subtitle="۱۰ برند نمونه در حوزه سلامت و زیبایی" href="/brands" />
        <div className="card grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/brand/${b.slug}`}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-line p-4 transition hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="font-[family-name:var(--font-display)] text-[15px] font-black">{b.name}</span>
              <span className="text-[10px] tracking-widest text-ink-300">{b.nameEn.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW + DISCOUNTED */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="جدیدترین محصولات" subtitle="تازه‌ترین کالاهای اضافه‌شده به فروشگاه" href="/new" />
          <div className="card p-3">
            <div className="grid grid-cols-2 gap-2">
              {fresh.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <SectionHeader title="محصولات دارای تخفیف" subtitle="فرصت خرید با قیمت کمتر" href="/sale" accent="sale" />
          <div className="card p-3">
            <div className="grid grid-cols-2 gap-2">
              {discounted.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section aria-labelledby="blog-title">
        <SectionHeader title="مجله سلامت دارونیک" subtitle="مقالات آموزشی درباره مکمل، پوست، مو و سلامت خانواده" href="/blog" />
        <div className="grid gap-3 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug} className="card group overflow-hidden">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/9]">
                  <BasePathImage
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-black text-brand-700">
                    {post.categoryTitle}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-[14px] leading-7 group-hover:text-brand-600">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-7 text-ink-500">{post.excerpt}</p>
                  <div className="num mt-3 flex items-center gap-3 text-[11px] text-ink-300">
                    <span>{post.publishedAt}</span>
                    <span>· {toFa(post.readMinutes)} دقیقه مطالعه</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="card mt-3 grid gap-2 p-4 md:grid-cols-2">
          <h3 className="text-[14px] md:col-span-2">مقالات آموزشی پرمخاطب</h3>
          {posts.slice(3, 9).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-[12.5px] font-medium text-ink-700 hover:bg-surface hover:text-brand-600"
            >
              <ChevronLeft size={13} className="shrink-0 text-brand-400" />
              <span className="line-clamp-1">{post.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="card p-5" aria-labelledby="why-title">
        <h2 id="why-title" className="mb-4 text-[18px]">
          چرا از دارونیک خرید کنیم؟
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Ico: ShieldCheck, t: "تأمین از مسیر رسمی", d: "همه کالاها با شرایط استاندارد نگهداری و تاریخ انقضای معتبر ارسال می‌شوند." },
            { Ico: Stethoscope, t: "مشاوره داروساز", d: "پیش از خرید می‌توانید درباره تداخل، دوز و انتخاب محصول سؤال بپرسید." },
            { Ico: Truck, t: "ارسال سریع کشوری", d: "ارسال فوری درون‌شهری و پست پیشتاز به تمام استان‌ها." },
            { Ico: CreditCard, t: "پرداخت امن", d: "پرداخت اینترنتی، در محل و کیف پول با تجربه‌ای ساده و سریع." },
            { Ico: Gift, t: "باشگاه مشتریان", d: "با هر خرید امتیاز بگیرید و در خریدهای بعدی تخفیف دریافت کنید." },
            { Ico: Package, t: "بسته‌بندی ایمن", d: "بسته‌بندی ضدضربه و محرمانه برای اقلام بهداشتی." },
          ].map((i) => (
            <div key={i.t} className="flex gap-3 rounded-xl border border-line p-4 transition hover:border-brand-200 hover:bg-brand-50/40">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <i.Ico size={20} strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-[13.5px] font-bold">{i.t}</span>
                <span className="mt-1 block text-[12px] leading-7 text-ink-500">{i.d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="card p-5">
        <h2 className="text-[17px]">فروشگاه اینترنتی داروخانه دارونیک؛ خرید آنلاین محصولات سلامت</h2>
        <div className="prose-fa mt-3 max-w-none">
          <p>
            دارونیک یک نمونه‌کار طراحی فروشگاه اینترنتی در حوزه سلامت است که ساختار یک داروخانه آنلاین حرفه‌ای را
            شبیه‌سازی می‌کند؛ از دسته‌بندی دقیق محصولات و فیلترهای پیشرفته تا صفحه محصول کامل، سبد خرید، تسویه حساب و
            پنل کاربری. در این فروشگاه بیش از ۵۰ محصول نمونه در هفت دسته اصلی شامل مکمل‌های ورزشی، ویتامین‌ها،
            مراقبت پوست، مراقبت مو، بهداشت دهان و دندان، تجهیزات پزشکی و مادر و کودک تعریف شده است.
          </p>
          <p>
            برای انتخاب بهتر می‌توانید از <Link href="/shop">صفحه فروشگاه</Link> با فیلتر برند، محدوده قیمت، امتیاز و
            موجودی استفاده کنید، در <Link href="/sale">صفحه تخفیف‌ها</Link> پیشنهادهای ویژه را ببینید و در{" "}
            <Link href="/blog">مجله سلامت</Link> مقالات آموزشی درباره زمان مصرف مکمل‌ها، روتین مراقبت پوست و
            اندازه‌گیری صحیح فشار خون را مطالعه کنید.
          </p>
        </div>
      </section>
    </div>
  );
}

function CategorySection({
  title,
  subtitle,
  href,
  items,
  chips,
}: {
  title: string;
  subtitle: string;
  href: string;
  items: CardProduct[];
  chips: { slug: string; title: string; parentSlug: string | null }[];
}) {
  return (
    <section>
      <SectionHeader title={title} subtitle={subtitle} href={href} />
      <div className="card p-4">
        {chips.length > 0 && (
          <div className="rail mb-3 flex gap-2 overflow-x-auto pb-1">
            {chips.map((c) => (
              <Link key={c.slug} href={`/category/${c.parentSlug}/${c.slug}`} className="chip shrink-0 gap-1.5">
                <CategoryIcon slug={c.slug} size={14} />
                {c.title}
              </Link>
            ))}
          </div>
        )}
        <ProductRail items={items} />
      </div>
    </section>
  );
}
