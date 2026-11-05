"use client";

import Image from "@/components/site-image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { Alert, Check, ChevronDown, Compare, Heart, HeartFilled, Minus, Plus, ShieldCheck } from "@/components/icons";
import { Price, Stars } from "@/components/ui";
import { cx, discountPercent, formatPrice, toFa, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export type ProductViewData = {
  slug: string;
  name: string;
  brandName: string;
  brandSlug: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  shortDesc: string;
  description: string[];
  specs: { label: string; value: string }[];
  variants: { label: string; options: string[] }[];
  usage: string;
  warning: string;
  faq: { q: string; a: string }[];
  isNew: boolean;
  isBestseller: boolean;
};

export function ProductView({
  p,
  reviews,
}: {
  p: ProductViewData;
  reviews: { author: string; rating: number; title: string; body: string; pros: string[]; cons: string[]; verified: boolean }[];
}) {
  const { add, toggleWish, toggleCompare, wishlist, compare } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(p.variants.map((v) => [v.label, v.options[0]])),
  );
  const [tab, setTab] = useState<"desc" | "specs" | "reviews" | "faq">("desc");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const off = discountPercent(p.price, p.oldPrice);
  const variantText = p.variants.map((v) => `${v.label}: ${selected[v.label]}`).join(" | ");

  function addToCart() {
    add(
      {
        slug: p.slug,
        name: p.name,
        image: p.image,
        price: p.price,
        oldPrice: p.oldPrice ?? undefined,
        brand: p.brandName,
        stock: p.stock,
        variant: variantText || undefined,
      },
      qty,
    );
  }

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: star === 5 ? 62 : star === 4 ? 24 : star === 3 ? 9 : star === 2 ? 3 : 2,
  }));

  return (
    <div className="space-y-4">
      <div className="card grid gap-5 p-4 lg:grid-cols-[380px_1fr_300px] lg:p-5">
        {/* gallery */}
        <div>
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-2xl bg-white">
            <Image
              src={p.gallery[imgIndex]}
              alt={`${p.name} - تصویر ${toFa(imgIndex + 1)}`}
              fill
              priority
              sizes="(max-width:1024px) 90vw, 360px"
              className="object-contain"
            />
            {off > 0 && (
              <span className="num absolute right-3 top-3 rounded-lg bg-sale-500 px-2 py-1 text-[12px] font-black text-white">
                {toFa(off)}٪ تخفیف
              </span>
            )}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {p.gallery.map((g, i) => (
              <button
                key={g + i}
                onClick={() => setImgIndex(i)}
                aria-label={`نمایش تصویر ${toFa(i + 1)}`}
                className={cx(
                  "relative h-16 w-16 overflow-hidden rounded-xl border bg-white transition",
                  i === imgIndex ? "border-brand-500" : "border-line hover:border-brand-300",
                )}
              >
                <Image src={g} alt="" fill sizes="64px" className="object-contain" />
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <button
              onClick={() => toggleWish(p.slug)}
              className={cx("chip gap-1.5", wishlist.includes(p.slug) && "chip-active")}
              aria-pressed={wishlist.includes(p.slug)}
            >
              {wishlist.includes(p.slug) ? <HeartFilled size={14} /> : <Heart size={14} />}
              افزودن به علاقه‌مندی‌ها
            </button>
            <button
              onClick={() => toggleCompare(p.slug)}
              className={cx("chip gap-1.5", compare.includes(p.slug) && "chip-active")}
              aria-pressed={compare.includes(p.slug)}
            >
              <Compare size={14} />
              مقایسه
            </button>
          </div>
        </div>

        {/* info */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/brand/${p.brandSlug}`} className="text-[12px] font-bold text-brand-600">
              {p.brandName}
            </Link>
            {p.isBestseller && <span className="badge bg-amber-50 text-amber-700">پرفروش</span>}
            {p.isNew && <span className="badge bg-brand-50 text-brand-700">جدید</span>}
          </div>
          <h1 className="mt-2 text-[19px] leading-9 md:text-[22px]">{p.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 border-b border-line pb-3">
            <span className="flex items-center gap-1.5">
              <Stars value={p.rating} size={15} />
              <span className="num text-[13px] font-black">{toFa(p.rating.toFixed(1))}</span>
            </span>
            <button onClick={() => setTab("reviews")} className="num text-[12px] font-bold text-brand-600">
              {toFa(p.reviewCount)} دیدگاه کاربران
            </button>
            <span className="num text-[12px] text-ink-300">{toFa(p.sold)} فروش موفق</span>
          </div>

          <p className="mt-3 text-[13px] leading-8 text-ink-700">{p.shortDesc}</p>

          {p.variants.map((v) => (
            <div key={v.label} className="mt-4">
              <p className="mb-2 text-[13px] font-bold">
                {v.label}: <span className="text-brand-600">{selected[v.label]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {v.options.map((o) => (
                  <button
                    key={o}
                    onClick={() => setSelected((s) => ({ ...s, [v.label]: o }))}
                    className={cx("chip", selected[v.label] === o && "chip-active")}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {p.specs.slice(0, 6).map((s) => (
              <li key={s.label} className="flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-[12.5px]">
                <span className="text-ink-500">{s.label}</span>
                <span className="font-bold">{s.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2 rounded-xl border border-dashed border-line p-3 text-[12px] leading-7 text-ink-500">
            <Alert size={16} className="mt-1 shrink-0 text-gold-400" />
            <span>
              <strong className="text-ink-700">توجه:</strong> اطلاعات این صفحه جنبه آموزشی دارد و جایگزین توصیه پزشک یا
            داروساز نیست. برای شرایط خاص، بارداری و شیردهی یا مصرف همزمان دارو، پیش از خرید مشورت کنید.
            </span>
          </div>
        </div>

        {/* buy box */}
        <aside className="h-fit rounded-2xl border border-line p-4 lg:sticky lg:top-[92px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-bold">فروشنده: دارونیک</span>
            <span className="badge gap-1 bg-brand-50 text-brand-700">
              <ShieldCheck size={13} />
              اصالت کالا
            </span>
          </div>
          <ul className="mb-4 space-y-2 text-[12px] text-ink-500">
            {["گارانتی سلامت فیزیکی کالا", "ارسال از انبار مرکزی تهران", "امکان بازگشت تا ۷ روز (کالای پلمب)"].map(
              (t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check size={14} className="shrink-0 text-brand-500" strokeWidth={2.2} />
                  {t}
                </li>
              ),
            )}
          </ul>

          {p.stock > 0 ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-ink-500">تعداد</span>
                <div className="flex items-center gap-3 rounded-xl border border-line px-3 py-1.5">
                  <button onClick={() => setQty((q) => Math.min(q + 1, p.stock))} aria-label="افزایش تعداد" className="text-brand-600">
                    <Plus size={15} strokeWidth={2} />
                  </button>
                  <span className="num w-5 text-center text-[13px] font-black">{toFa(qty)}</span>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="کاهش تعداد" className="text-ink-500">
                    <Minus size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <div className="mb-3 flex items-end justify-between">
                {off > 0 && (
                  <span className="num rounded-lg bg-sale-500 px-2 py-1 text-[12px] font-black text-white">
                    {toFa(off)}٪
                  </span>
                )}
                <Price value={p.price * qty} old={p.oldPrice ? p.oldPrice * qty : undefined} size="lg" />
              </div>
              <button onClick={addToCart} className="btn btn-primary w-full justify-center py-3 text-[15px]">
                افزودن به سبد خرید
              </button>
              {p.stock <= 5 && (
                <p className="num mt-2 text-center text-[11px] font-bold text-sale-500">
                  تنها {toFa(p.stock)} عدد باقی مانده
                </p>
              )}
              {p.price < FREE_SHIPPING_THRESHOLD && (
                <p className="mt-2 text-center text-[11px] text-ink-500">
                  با خرید بالای <span className="num">{formatPrice(FREE_SHIPPING_THRESHOLD)}</span> تومان، ارسال رایگان
                </p>
              )}
            </>
          ) : (
            <div className="rounded-xl bg-surface p-4 text-center">
              <p className="text-[13px] font-bold">این کالا فعلاً موجود نیست</p>
              <p className="mt-1 text-[11px] text-ink-500">می‌توانید موارد مشابه را در همان دسته‌بندی ببینید.</p>
            </div>
          )}
        </aside>
      </div>

      {/* tabs */}
      <div className="card overflow-hidden">
        <div className="rail flex gap-1 overflow-x-auto border-b border-line px-3">
          {[
            ["desc", "معرفی محصول"],
            ["specs", "مشخصات و روش مصرف"],
            ["reviews", `دیدگاه‌ها (${toFa(reviews.length)})`],
            ["faq", "سؤالات متداول"],
          ].map(([id, title]) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={cx(
                "shrink-0 border-b-2 px-4 py-3 text-[13px] font-bold transition",
                tab === id ? "border-brand-500 text-brand-600" : "border-transparent text-ink-500 hover:text-ink-700",
              )}
              aria-selected={tab === id}
              role="tab"
            >
              {title}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "desc" && (
            <div className="prose-fa max-w-none">
              <h2 className="text-[17px]">معرفی {p.name}</h2>
              {p.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {tab === "specs" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <h2 className="mb-3 text-[15px]">جدول مشخصات</h2>
                <table className="w-full overflow-hidden rounded-xl text-[13px]">
                  <tbody>
                    {p.specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-surface" : ""}>
                        <th scope="row" className="w-1/2 px-3 py-2.5 text-right font-medium text-ink-500">
                          {s.label}
                        </th>
                        <td className="px-3 py-2.5 font-bold">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="mb-2 text-[15px]">روش مصرف</h2>
                  <p className="text-[13px] leading-8 text-ink-700">{p.usage}</p>
                </div>
                <div className="rounded-xl bg-[#fff6f5] p-4">
                  <h2 className="mb-2 flex items-center gap-2 text-[15px] text-sale-600">
                    <Alert size={17} />
                    هشدارها و نکات ایمنی
                  </h2>
                  <p className="text-[13px] leading-8 text-ink-700">{p.warning}</p>
                </div>
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[13px] font-bold">امتیاز کاربران</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="num text-[30px] font-black">{toFa(p.rating.toFixed(1))}</span>
                  <div>
                    <Stars value={p.rating} size={15} />
                    <p className="num mt-1 text-[11px] text-ink-500">از {toFa(p.reviewCount)} دیدگاه</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {ratingBuckets.map((b) => (
                    <li key={b.star} className="flex items-center gap-2">
                      <span className="num w-4 text-[11px]">{toFa(b.star)}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
                        <span className="block h-full rounded-full bg-gold-400" style={{ width: `${b.percent}%` }} />
                      </span>
                      <span className="num w-8 text-[11px] text-ink-300">{toFa(b.percent)}٪</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-3">
                {reviews.map((r, i) => (
                  <li key={i} className="rounded-2xl border border-line p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Stars value={r.rating} />
                      <span className="text-[13px] font-bold">{r.title}</span>
                      {r.verified && <span className="badge bg-brand-50 text-brand-700">خرید تأییدشده</span>}
                    </div>
                    <p className="mt-2 text-[13px] leading-8 text-ink-700">{r.body}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-[12px]">
                      {r.pros.length > 0 && (
                        <span className="flex items-center gap-1 text-brand-600">
                          <Plus size={13} strokeWidth={2.2} />
                          {r.pros.join("، ")}
                        </span>
                      )}
                      {r.cons.length > 0 && (
                        <span className="flex items-center gap-1 text-sale-500">
                          <Minus size={13} strokeWidth={2.2} />
                          {r.cons.join("، ")}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[11px] text-ink-300">{r.author}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "faq" && (
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-3 text-[16px]">سؤالات متداول درباره این محصول</h2>
              <ul className="space-y-2">
                {p.faq.map((f, i) => (
                  <li key={i} className="overflow-hidden rounded-xl border border-line">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-right text-[13px] font-bold"
                    >
                      {f.q}
                      <ChevronDown
                        size={16}
                        className={cx("shrink-0 text-brand-500 transition-transform", openFaq === i && "rotate-180")}
                      />
                    </button>
                    {openFaq === i && (
                      <p className="border-t border-line px-4 py-3 text-[13px] leading-8 text-ink-700">{f.a}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
