"use client";

import { BasePathImage } from "@/components/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { Minus, Plus, Trash, Truck } from "@/components/icons";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import { COUPONS, FREE_SHIPPING_THRESHOLD, formatPrice, toFa } from "@/lib/utils";

export function CartClient() {
  const { lines, setQty, remove, subtotal, savings, ready } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ percent: number; label: string } | null>(null);
  const [error, setError] = useState("");

  const couponOff = applied ? Math.round((subtotal * applied.percent) / 100) : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 49000;
  const total = subtotal - couponOff + shipping;

  function apply() {
    const found = COUPONS[code.trim().toUpperCase()];
    if (!found) {
      setError("کد تخفیف معتبر نیست. کدهای نمونه: DARU10 یا HEALTH15");
      setApplied(null);
      return;
    }
    setError("");
    setApplied(found);
  }

  if (!ready) {
    return (
      <div className="container-x py-6">
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "سبد خرید" }]} />
      <h1 className="mb-4 text-[20px]">سبد خرید شما</h1>

      {lines.length === 0 ? (
        <EmptyState
          title="سبد خرید شما خالی است"
          desc="هنوز محصولی به سبد اضافه نکرده‌اید. می‌توانید از دسته‌بندی‌ها یا صفحه پیشنهادهای ویژه، خرید خود را شروع کنید."
          action={
            <div className="flex gap-2">
              <Link href="/shop" className="btn btn-primary">
                رفتن به فروشگاه
              </Link>
              <Link href="/sale" className="btn btn-ghost">
                مشاهده تخفیف‌ها
              </Link>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
          <div className="space-y-3">
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="card flex items-center gap-2 p-3 text-[12.5px] font-bold text-brand-700">
                <Truck size={17} />
                تا ارسال رایگان <span className="num">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> تومان
                باقی مانده است.
              </p>
            )}
            {lines.map((l) => (
              <article key={l.slug + (l.variant ?? "")} className="card flex gap-3 p-3">
                <Link href={`/product/${l.slug}`} className="shrink-0">
                  <BasePathImage src={l.image} alt={l.name} width={96} height={96} className="h-24 w-24 rounded-xl object-contain" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/product/${l.slug}`} className="text-[13.5px] font-bold leading-7 hover:text-brand-600">
                    {l.name}
                  </Link>
                  <span className="mt-1 text-[11.5px] text-ink-300">{l.brand}</span>
                  {l.variant && <span className="mt-1 text-[11.5px] text-ink-500">{l.variant}</span>}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-xl border border-line px-3 py-1.5">
                        <button onClick={() => setQty(l.slug, l.qty + 1)} aria-label="افزایش تعداد" className="text-brand-600">
                          <Plus size={15} strokeWidth={2} />
                        </button>
                        <span className="num w-5 text-center text-[13px] font-black">{toFa(l.qty)}</span>
                        <button
                          onClick={() => (l.qty === 1 ? remove(l.slug) : setQty(l.slug, l.qty - 1))}
                          aria-label="کاهش تعداد"
                          className="text-ink-500"
                        >
                          <Minus size={15} strokeWidth={2} />
                        </button>
                      </div>
                      <button onClick={() => remove(l.slug)} className="flex items-center gap-1 text-[12px] font-bold text-sale-500">
                        <Trash size={14} />
                        حذف
                      </button>
                    </div>
                    <div className="text-left">
                      {l.oldPrice && l.oldPrice > l.price && (
                        <span className="num block text-[11px] text-ink-300 line-through">
                          {formatPrice(l.oldPrice * l.qty)}
                        </span>
                      )}
                      <span className="num text-[15px] font-black">{formatPrice(l.price * l.qty)}</span>
                      <span className="mr-1 text-[11px] text-ink-500">تومان</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <Link href="/shop" className="btn btn-ghost w-full justify-center">
              ادامه خرید
            </Link>
          </div>

          <aside className="card h-fit p-4 lg:sticky lg:top-[92px]">
            <h2 className="mb-3 text-[15px]">خلاصه سفارش</h2>
            <div className="mb-3">
              <label htmlFor="coupon" className="label">
                کد تخفیف
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="مثال: DARU10"
                  className="field"
                />
                <button onClick={apply} className="btn btn-ghost shrink-0">
                  اعمال
                </button>
              </div>
              {error && <p className="mt-2 text-[11px] font-bold text-sale-500">{error}</p>}
              {applied && <p className="mt-2 text-[11px] font-bold text-brand-600">{applied.label} اعمال شد.</p>}
            </div>
            <ul className="space-y-2.5 border-t border-line pt-3 text-[13px]">
              <li className="flex justify-between">
                <span className="text-ink-500">قیمت کالاها</span>
                <span className="num font-bold">{formatPrice(subtotal + savings)}</span>
              </li>
              {savings > 0 && (
                <li className="flex justify-between text-sale-500">
                  <span>تخفیف محصولات</span>
                  <span className="num font-bold">{formatPrice(savings)}−</span>
                </li>
              )}
              {couponOff > 0 && (
                <li className="flex justify-between text-sale-500">
                  <span>کد تخفیف</span>
                  <span className="num font-bold">{formatPrice(couponOff)}−</span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-ink-500">هزینه ارسال</span>
                <span className="num font-bold">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
              </li>
              <li className="flex justify-between border-t border-line pt-3 text-[15px]">
                <span className="font-bold">مبلغ قابل پرداخت</span>
                <span className="num font-black text-brand-700">{formatPrice(total)}</span>
              </li>
            </ul>
            <Link href="/checkout" className="btn btn-primary mt-4 w-full justify-center py-3">
              ادامه و تسویه حساب
            </Link>
            <p className="mt-3 text-center text-[11px] leading-6 text-ink-300">
              با ثبت سفارش، <Link href="/terms" className="text-brand-600">قوانین و مقررات</Link> فروشگاه را می‌پذیرید.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
