"use client";

import Image from "@/components/site-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/data/catalog";
import { POSTS } from "@/data/posts";
import { useCart } from "@/components/cart-context";
import {
  Cart as CartIcon,
  CategoryIcon,
  ChevronLeft,
  Close,
  Flame,
  Heart,
  Home,
  Icon,
  Menu,
  Search as SearchIcon,
  Tag,
  User,
} from "@/components/icons";
import { Logo } from "@/components/ui";
import { cx, formatPrice, normalizeSearch, toFa, SITE } from "@/lib/utils";

export type NavCategory = {
  slug: string;
  title: string;
  icon: string;
  children: { slug: string; title: string; icon: string }[];
};

type Suggestion = {
  products: { slug: string; name: string; image: string; price: number }[];
  categories: { slug: string; title: string; parentSlug: string | null }[];
  brands: { slug: string; name: string }[];
  posts: { slug: string; title: string }[];
};

const POPULAR = ["مولتی ویتامین", "پروتئین", "ضد آفتاب", "فشارسنج", "کلاژن", "شامپو ضدشوره"];

export function Header({ tree, brands }: { tree: NavCategory[]; brands: { slug: string; name: string }[] }) {
  const router = useRouter();
  const { count, wishlist, setDrawerOpen, subtotal } = useCart();
  const [openMega, setOpenMega] = useState(false);
  const [activeRoot, setActiveRoot] = useState(tree[0]?.slug ?? "");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const sug = useMemo<Suggestion | null>(() => {
    const term = normalizeSearch(q);
    if (!term) return null;
    const matches = (text: string) => normalizeSearch(text).includes(term);
    return {
      products: PRODUCTS.filter((p) => matches(`${p.name} ${p.shortDesc}`)).slice(0, 6),
      categories: CATEGORIES.filter((c) => matches(c.title)).slice(0, 6),
      brands: BRANDS.filter((b) => matches(b.name) || matches(b.nameEn)).slice(0, 6),
      posts: POSTS.filter((p) => matches(`${p.title} ${p.excerpt}`)).slice(0, 5),
    };
  }, [q]);
  const loading = false;
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocus(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
  }, [mobileMenu]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setFocus(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  const active = tree.find((t) => t.slug === activeRoot) ?? tree[0];

  return (
    <>
      {/* top strip */}
      <div className="hidden bg-ink-900 text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-[12px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-bold">
              <Icon name="phone" size={14} />
              پشتیبانی: <span className="num">{SITE.phone}</span>
            </span>
            <Link href="/shipping" className="text-white/70 hover:text-white">
              شرایط ارسال
            </Link>
            <Link href="/faq" className="text-white/70 hover:text-white">
              سؤالات متداول
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/account/orders" className="text-white/70 hover:text-white">
              پیگیری سفارش
            </Link>
            <Link href="/blog" className="text-white/70 hover:text-white">
              مجله سلامت
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white">
              درباره دارونیک
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container-x flex h-[62px] items-center gap-1.5 sm:gap-3 lg:h-[76px] lg:gap-5">
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line lg:hidden"
            onClick={() => setMobileMenu(true)}
            aria-label="باز کردن منو"
          >
            <Menu size={20} className="text-ink-700" />
          </button>

          <Link href="/" aria-label="صفحه اصلی دارونیک" className="shrink-0">
            <Logo />
          </Link>

          {/* search */}
          <div ref={boxRef} className="relative min-w-0 flex-1">
            <form onSubmit={submit} role="search" className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                type="search"
                aria-label="جستجوی محصولات"
                placeholder="نام محصول، برند یا بیماری موردنظر را جستجو کنید..."
                className="h-11 w-full rounded-xl border border-line bg-surface pr-9 pl-10 sm:pr-11 sm:pl-24 text-[13px] font-medium outline-none transition focus:border-brand-400 focus:bg-white focus:shadow-[0_0_0_3px_var(--color-brand-50)]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                <SearchIcon size={18} />
              </span>
              <button type="submit" className="btn btn-primary absolute left-1.5 top-1.5 h-8 px-2 text-[12px] sm:px-4" aria-label="جستجو">
                <SearchIcon size={16} className="sm:hidden" />
                <span className="hidden sm:inline">جستجو</span>
              </button>
            </form>

            {focus && (
              <div className="animate-fade absolute inset-x-0 top-[52px] z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-pop)]">
                {!q.trim() && (
                  <div>
                    <p className="mb-2 text-[12px] font-bold text-ink-500">جستجوهای پرتکرار</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((s) => (
                        <button key={s} onClick={() => setQ(s)} className="chip" type="button">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {q.trim() && loading && (
                  <div className="space-y-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="skeleton h-12 rounded-xl" />
                    ))}
                  </div>
                )}
                {q.trim() && !loading && sug && (
                  <div className="space-y-3">
                    {sug.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sug.categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/category/${c.parentSlug ? `${c.parentSlug}/${c.slug}` : c.slug}`}
                            onClick={() => setFocus(false)}
                            className="chip"
                          >
                            دسته: {c.title}
                          </Link>
                        ))}
                        {sug.brands.map((b) => (
                          <Link key={b.slug} href={`/brand/${b.slug}`} onClick={() => setFocus(false)} className="chip">
                            برند: {b.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    {sug.products.length > 0 ? (
                      <ul className="divide-y divide-line">
                        {sug.products.slice(0, 6).map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/product/${p.slug}`}
                              onClick={() => setFocus(false)}
                              className="flex items-center gap-3 rounded-xl p-2 hover:bg-surface"
                            >
                              <Image src={p.image} alt={p.name} width={44} height={44} className="h-11 w-11 rounded-lg object-contain" />
                              <span className="line-clamp-1 flex-1 text-[13px] font-bold">{p.name}</span>
                              <span className="num shrink-0 text-[12px] font-bold text-ink-500">
                                {formatPrice(p.price)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-3 text-center text-[13px] text-ink-500">نتیجه‌ای یافت نشد.</p>
                    )}
                    {sug.posts.length > 0 && (
                      <div className="rounded-xl bg-surface p-3">
                        <p className="mb-2 text-[12px] font-bold text-ink-500">از مجله سلامت</p>
                        <ul className="space-y-1">
                          {sug.posts.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/blog/${p.slug}`}
                                onClick={() => setFocus(false)}
                                className="flex items-center gap-1 text-[12px] font-bold hover:text-brand-600"
                              >
                                <ChevronLeft size={12} className="text-brand-400" />
                                {p.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link
                      href={`/search?q=${encodeURIComponent(q)}`}
                      onClick={() => setFocus(false)}
                      className="btn btn-soft w-full justify-center"
                    >
                      مشاهده همه نتایج «{q}»
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              className="hidden h-11 items-center gap-2 rounded-xl border border-line px-3 text-[13px] font-bold hover:border-brand-300 hover:text-brand-600 lg:flex"
            >
              <User size={18} />
              ورود | ثبت‌نام
            </Link>
            <Link
              href="/account/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative hidden h-11 w-11 items-center justify-center rounded-xl border border-line hover:border-brand-300 md:flex"
            >
              <Heart size={18} className="text-ink-700" />
              {wishlist.length > 0 && (
                <span className="num absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sale-500 px-1 text-[10px] font-black text-white">
                  {toFa(wishlist.length)}
                </span>
              )}
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-xl bg-brand-500 px-3 text-white transition hover:bg-brand-600"
              aria-label={`سبد خرید، ${count} کالا`}
            >
              <CartIcon size={20} strokeWidth={1.7} />
              {subtotal > 0 && (
                <span className="num hidden text-[12px] font-black lg:inline">{formatPrice(subtotal)}</span>
              )}
              {count > 0 && (
                <span className="num absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] font-black text-white">
                  {toFa(count)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* nav row */}
        <nav
          className="container-x hidden h-11 items-center gap-6 border-t border-line text-[13px] font-bold lg:flex"
          onMouseLeave={() => setOpenMega(false)}
        >
          <button
            className={cx(
              "flex h-full items-center gap-2 border-b-2 px-1 transition",
              openMega ? "border-brand-500 text-brand-600" : "border-transparent",
            )}
            onMouseEnter={() => setOpenMega(true)}
            onClick={() => setOpenMega((v) => !v)}
            aria-expanded={openMega}
          >
            <Menu size={17} />
            دسته‌بندی محصولات
          </button>
          <Link href="/bestsellers" className="hover:text-brand-600">پرفروش‌ترین‌ها</Link>
          <Link href="/sale" className="text-sale-500 hover:text-sale-600">تخفیف‌ها و پیشنهاد ویژه</Link>
          <Link href="/new" className="hover:text-brand-600">جدیدترین‌ها</Link>
          <Link href="/brands" className="hover:text-brand-600">برندها</Link>
          <Link href="/category/medical-devices" className="hover:text-brand-600">تجهیزات پزشکی</Link>
          <Link href="/blog" className="hover:text-brand-600">مجله سلامت</Link>
          <Link href="/contact" className="mr-auto text-ink-500 hover:text-brand-600">تماس با ما</Link>

          {openMega && (
            <div
              className="animate-fade absolute inset-x-0 top-full z-40 border-t border-line bg-white shadow-[var(--shadow-pop)]"
              onMouseLeave={() => setOpenMega(false)}
            >
              <div className="container-x grid grid-cols-[240px_1fr] gap-0 py-4">
                <ul className="border-l border-line pl-3">
                  {tree.map((root) => (
                    <li key={root.slug}>
                      <Link
                        href={`/category/${root.slug}`}
                        onMouseEnter={() => setActiveRoot(root.slug)}
                        onClick={() => setOpenMega(false)}
                        className={cx(
                          "flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] transition",
                          activeRoot === root.slug ? "bg-brand-50 text-brand-700" : "hover:bg-surface",
                        )}
                      >
                        <CategoryIcon slug={root.slug} size={18} className="shrink-0" />
                        {root.title}
                        <ChevronLeft size={14} className="mr-auto text-ink-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-[1fr_260px] gap-4 pr-5">
                  <div>
                    <Link
                      href={`/category/${active.slug}`}
                      onClick={() => setOpenMega(false)}
                      className="mb-3 inline-flex items-center gap-2 text-[14px] font-black text-brand-700"
                    >
                      {active.title}
                      <span className="text-[11px] font-bold text-ink-300">مشاهده همه</span>
                    </Link>
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
                      {active.children.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/category/${active.slug}/${c.slug}`}
                            onClick={() => setOpenMega(false)}
                            className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] font-medium text-ink-700 hover:bg-surface hover:text-brand-600"
                          >
                            <CategoryIcon slug={c.slug} size={16} className="shrink-0 text-ink-300" />
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 border-t border-line pt-3">
                      <p className="mb-2 text-[12px] font-bold text-ink-500">برندهای پرطرفدار</p>
                      <div className="flex flex-wrap gap-2">
                        {brands.slice(0, 7).map((b) => (
                          <Link key={b.slug} href={`/brand/${b.slug}`} onClick={() => setOpenMega(false)} className="chip">
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/sale"
                    onClick={() => setOpenMega(false)}
                    className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white"
                  >
                    <div>
                      <p className="text-[13px] font-black">هفته سلامت دارونیک</p>
                      <p className="mt-1 text-[11px] leading-6 text-white/80">
                        تا ۴۰٪ تخفیف روی مکمل‌ها، مراقبت پوست و تجهیزات پزشکی
                      </p>
                    </div>
                    <span className="mt-3 w-fit rounded-lg bg-white px-3 py-1.5 text-[11px] font-black text-brand-700">
                      مشاهده پیشنهادها
                    </span>
                    <span className="pointer-events-none absolute -left-6 -bottom-8 h-28 w-28 rounded-full bg-white/10" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* mobile drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink-900/45" onClick={() => setMobileMenu(false)} />
          <aside className="animate-fade absolute inset-y-0 right-0 flex w-[86vw] max-w-[340px] flex-col bg-white">
            <div className="flex items-center justify-between border-b border-line p-4">
              <Logo size="sm" withTag={false} />
              <button onClick={() => setMobileMenu(false)} aria-label="بستن منو" className="btn btn-ghost px-2.5 py-2">
                <Close size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Link href="/account" onClick={() => setMobileMenu(false)} className="btn btn-soft mb-4 w-full justify-center">
                ورود یا ثبت‌نام
              </Link>
              <p className="mb-2 text-[12px] font-bold text-ink-500">دسته‌بندی محصولات</p>
              <ul className="space-y-1">
                {tree.map((root) => (
                  <li key={root.slug}>
                    <details className="rounded-xl border border-line">
                      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-3 text-[13px] font-bold">
                        <CategoryIcon slug={root.slug} size={18} className="text-brand-600" />
                        {root.title}
                        <Icon name="chevronDown" size={15} className="mr-auto text-ink-300" />
                      </summary>
                      <ul className="border-t border-line p-2">
                        <li>
                          <Link
                            href={`/category/${root.slug}`}
                            onClick={() => setMobileMenu(false)}
                            className="block rounded-lg px-3 py-2 text-[12px] font-bold text-brand-600"
                          >
                            مشاهده همه {root.title}
                          </Link>
                        </li>
                        {root.children.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/category/${root.slug}/${c.slug}`}
                              onClick={() => setMobileMenu(false)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-ink-700"
                            >
                              <CategoryIcon slug={c.slug} size={15} className="text-ink-300" />
                              {c.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-line pt-4 text-[13px] font-bold">
                {[
                  ["/sale", "تخفیف‌ها و پیشنهاد ویژه"],
                  ["/bestsellers", "پرفروش‌ترین‌ها"],
                  ["/new", "جدیدترین محصولات"],
                  ["/brands", "برندها"],
                  ["/blog", "مجله سلامت"],
                  ["/about", "درباره ما"],
                  ["/contact", "تماس با ما"],
                  ["/faq", "سؤالات متداول"],
                ].map(([href, title]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenu(false)}
                    className="block rounded-lg px-2 py-2.5 hover:bg-surface"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* mobile bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-[70] flex h-[58px] items-center justify-around border-t border-line bg-white/95 backdrop-blur lg:hidden">
        {[
          { href: "/", label: "خانه", Ico: Home },
          { href: "/shop", label: "فروشگاه", Ico: Tag },
          { href: "/sale", label: "تخفیف‌ها", Ico: Flame },
          { href: "/account/wishlist", label: "علاقه‌مندی", Ico: Heart },
          { href: "/account", label: "حساب من", Ico: User },
        ].map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="flex flex-col items-center gap-1 px-2 text-[10px] font-bold text-ink-500 transition hover:text-brand-600"
          >
            <i.Ico size={19} />
            {i.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
