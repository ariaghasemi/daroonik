"use client";

import Image from "@/components/site-image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { Compare, Heart, HeartFilled, Plus } from "@/components/icons";
import { Price, Stars } from "@/components/ui";
import { cx, discountPercent, toFa } from "@/lib/utils";

export type CardProduct = {
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviewCount: number;
  stock: number;
  brandName: string;
  brandSlug: string;
  isNew?: boolean;
  isBestseller?: boolean;
  shortDesc?: string;
};

export function ProductCard({ p, compact = false }: { p: CardProduct; compact?: boolean }) {
  const { add, toggleWish, toggleCompare, wishlist, compare } = useCart();
  const off = discountPercent(p.price, p.oldPrice);
  const wished = wishlist.includes(p.slug);
  const compared = compare.includes(p.slug);

  return (
    <article
      className={cx(
        "group relative flex min-w-0 flex-col rounded-2xl border border-transparent bg-white p-3 transition-all duration-200 hover:border-brand-200 hover:shadow-[0_10px_30px_rgba(20,33,46,0.10)]",
        compact ? "min-w-[168px]" : "",
      )}
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
        {off > 0 && (
          <span className="num rounded-lg bg-sale-500 px-2 py-1 text-[11px] font-black text-white">
            {toFa(off)}٪
          </span>
        )}
        {p.isBestseller && (
          <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700">پرفروش</span>
        )}
        {p.isNew && (
          <span className="rounded-lg bg-brand-50 px-2 py-1 text-[10px] font-black text-brand-700">جدید</span>
        )}
      </div>

      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1 opacity-100 transition-opacity focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <button
          onClick={() => toggleWish(p.slug)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={wished}
          title="علاقه‌مندی"
          className={cx(
            "flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink-500 shadow-sm transition hover:border-sale-500 hover:text-sale-500",
            wished && "border-sale-500 text-sale-500",
          )}
        >
          {wished ? <HeartFilled size={15} /> : <Heart size={15} />}
        </button>
        <button
          onClick={() => toggleCompare(p.slug)}
          aria-label="افزودن به لیست مقایسه"
          aria-pressed={compared}
          title="مقایسه"
          className={cx(
            "flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink-500 shadow-sm transition hover:border-brand-400 hover:text-brand-600",
            compared && "border-brand-500 text-brand-600",
          )}
        >
          <Compare size={15} />
        </button>
      </div>

      <Link href={`/product/${p.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-xl">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:768px) 45vw, 200px"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="mt-2 flex flex-1 flex-col">
        <Link
          href={`/brand/${p.brandSlug}`}
          className="w-fit text-[11px] font-bold text-ink-300 hover:text-brand-600"
        >
          {p.brandName}
        </Link>
        <h3 className="mt-1">
          <Link
            href={`/product/${p.slug}`}
            className="line-clamp-2 text-[13px] font-bold leading-[1.9] text-ink-900 hover:text-brand-600"
          >
            {p.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <Stars value={p.rating} />
          <span className="num text-[11px] font-bold text-ink-700">{toFa(p.rating.toFixed(1))}</span>
          <span className="num text-[10px] text-ink-300">({toFa(p.reviewCount)})</span>
        </div>

        <div className="mt-auto pt-3">
          {p.stock > 0 ? (
            <div className="flex flex-wrap items-end justify-between gap-2">
              <button
                onClick={() =>
                  add({
                    slug: p.slug,
                    name: p.name,
                    image: p.image,
                    price: p.price,
                    oldPrice: p.oldPrice ?? undefined,
                    brand: p.brandName,
                    stock: p.stock,
                  })
                }
                className="btn btn-primary h-9 w-9 rounded-xl p-0"
                aria-label={`افزودن ${p.name} به سبد خرید`}
                title="افزودن به سبد خرید"
              >
                <Plus size={18} strokeWidth={2} />
              </button>
              <Price value={p.price} old={p.oldPrice} />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="badge bg-slate-100 text-ink-500">ناموجود</span>
              <span className="text-[12px] text-ink-300">اطلاع از موجودی</span>
            </div>
          )}
          {p.stock > 0 && p.stock <= 5 && (
            <p className="num mt-2 text-[11px] font-bold text-sale-500">
              تنها {toFa(p.stock)} عدد در انبار باقی مانده
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductRail({ items }: { items: CardProduct[] }) {
  return (
    <div className="rail -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
      {items.map((p) => (
        <div key={p.slug} className="w-[170px] shrink-0 md:w-[210px]">
          <ProductCard p={p} compact />
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({ items }: { items: CardProduct[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
