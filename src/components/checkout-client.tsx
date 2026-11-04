"use client";

import { BasePathImage } from "@/components/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { Breadcrumbs, EmptyState } from "@/components/ui";
import {
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  formatPrice,
  cx,
  toFa,
} from "@/lib/utils";
import { makeDemoCode, postJson, saveDemoOrder } from "@/lib/demo-store";

export function CheckoutClient({ provinces }: { provinces: string[] }) {
  const router = useRouter();
  const { lines, subtotal, savings, clear, ready } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    province: provinces[0],
    city: "",
    address: "",
    postalCode: "",
    note: "",
  });
  const [shippingId, setShippingId] = useState(SHIPPING_METHODS[1].id);
  const [paymentId, setPaymentId] = useState(PAYMENT_METHODS[0].id);
  const [coupon, setCoupon] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const applied = COUPONS[coupon.trim().toUpperCase()];
  const couponOff = applied ? Math.round((subtotal * applied.percent) / 100) : 0;
  const shippingMethod = SHIPPING_METHODS.find((s) => s.id === shippingId)!;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethod.price;
  const total = subtotal - couponOff + shipping;

  function validate() {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 3) e.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
    if (!/^0?9\d{9}$/.test(form.phone.trim())) e.phone = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۰۰۰۰۰۰۰).";
    if (form.city.trim().length < 2) e.city = "نام شهر را وارد کنید.";
    if (form.address.trim().length < 10) e.address = "نشانی را با جزئیات بیشتری وارد کنید.";
    if (form.postalCode && !/^\d{10}$/.test(form.postalCode.trim())) e.postalCode = "کد پستی باید ۱۰ رقم باشد.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      ...form,
      shippingMethod: shippingMethod.title,
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === paymentId)?.title ?? "پرداخت اینترنتی",
      items: lines.map((l) => ({ slug: l.slug, name: l.name, image: l.image, price: l.price, qty: l.qty })),
      subtotal,
      discount: couponOff + savings,
      shipping,
      total,
    };
    const res = await postJson("/api/orders", payload);
    const code = typeof res.data?.code === "string" ? res.data.code : makeDemoCode();
    // Always keep a local copy so the order is follow-up-able in the account panel
    // (the demo path) — entries are de-duplicated by code against the API list.
    saveDemoOrder({ ...payload, code, createdAt: new Date().toISOString(), status: "در حال پردازش" });
    clear();
    router.push(`/checkout/success?code=${encodeURIComponent(code)}`);
  }

  if (!ready) {
    return (
      <div className="container-x py-6">
        <div className="skeleton h-72 rounded-2xl" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x py-6">
        <EmptyState
          title="برای تسویه حساب ابتدا خرید کنید"
          desc="سبد خرید شما خالی است. پس از افزودن محصول می‌توانید فرایند پرداخت را تکمیل کنید."
          action={
            <Link href="/shop" className="btn btn-primary">
              مشاهده محصولات
            </Link>
          }
        />
      </div>
    );
  }

  const inputCx = (key: string) => cx("field", errors[key] && "border-sale-500");

  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "سبد خرید", href: "/cart" }, { title: "تسویه حساب" }]} />
      <h1 className="mb-1 text-[20px]">تسویه حساب</h1>
      <p className="mb-4 text-[12.5px] text-ink-500">اطلاعات گیرنده را وارد کنید؛ کمتر از یک دقیقه زمان می‌برد.</p>

      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_330px]">
        <div className="space-y-4">
          <section className="card p-4">
            <h2 className="mb-4 flex items-center gap-2 text-[15px]">
              <span className="num flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[12px] text-white">
                {toFa(1)}
              </span>
              اطلاعات گیرنده
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="fullName">نام و نام خانوادگی</label>
                <input
                  id="fullName"
                  className={inputCx("fullName")}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  autoComplete="name"
                />
                {errors.fullName && <p className="mt-1 text-[11px] text-sale-500">{errors.fullName}</p>}
              </div>
              <div>
                <label className="label" htmlFor="phone">شماره موبایل</label>
                <input
                  id="phone"
                  inputMode="tel"
                  className={cx(inputCx("phone"), "num")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-[11px] text-sale-500">{errors.phone}</p>}
              </div>
              <div>
                <label className="label" htmlFor="province">استان</label>
                <select
                  id="province"
                  className="field"
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                >
                  {provinces.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="city">شهر</label>
                <input
                  id="city"
                  className={inputCx("city")}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                {errors.city && <p className="mt-1 text-[11px] text-sale-500">{errors.city}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label" htmlFor="address">نشانی کامل</label>
                <textarea
                  id="address"
                  rows={3}
                  className={inputCx("address")}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="خیابان، کوچه، پلاک و واحد"
                />
                {errors.address && <p className="mt-1 text-[11px] text-sale-500">{errors.address}</p>}
              </div>
              <div>
                <label className="label" htmlFor="postalCode">کد پستی (اختیاری)</label>
                <input
                  id="postalCode"
                  inputMode="numeric"
                  className={cx(inputCx("postalCode"), "num")}
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                />
                {errors.postalCode && <p className="mt-1 text-[11px] text-sale-500">{errors.postalCode}</p>}
              </div>
              <div>
                <label className="label" htmlFor="note">توضیح برای پیک (اختیاری)</label>
                <input
                  id="note"
                  className="field"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="card p-4">
            <h2 className="mb-4 flex items-center gap-2 text-[15px]">
              <span className="num flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[12px] text-white">
                {toFa(2)}
              </span>
              روش ارسال
            </h2>
            <div className="grid gap-2 md:grid-cols-3">
              {SHIPPING_METHODS.map((s) => (
                <label
                  key={s.id}
                  className={cx(
                    "cursor-pointer rounded-xl border p-3 transition",
                    shippingId === s.id ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-300",
                  )}
                >
                  <input
                    type="radio"
                    name="shipping"
                    className="sr-only"
                    checked={shippingId === s.id}
                    onChange={() => setShippingId(s.id)}
                  />
                  <span className="block text-[13px] font-bold">{s.title}</span>
                  <span className="mt-1 block text-[11px] text-ink-500">{s.desc}</span>
                  <span className="num mt-2 block text-[12px] font-black text-brand-700">
                    {s.price === 0 ? "رایگان" : `${formatPrice(s.price)} تومان`}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="card p-4">
            <h2 className="mb-4 flex items-center gap-2 text-[15px]">
              <span className="num flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[12px] text-white">
                {toFa(3)}
              </span>
              روش پرداخت
            </h2>
            <div className="grid gap-2 md:grid-cols-3">
              {PAYMENT_METHODS.map((s) => (
                <label
                  key={s.id}
                  className={cx(
                    "cursor-pointer rounded-xl border p-3 transition",
                    paymentId === s.id ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-300",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentId === s.id}
                    onChange={() => setPaymentId(s.id)}
                  />
                  <span className="block text-[13px] font-bold">{s.title}</span>
                  <span className="mt-1 block text-[11px] text-ink-500">{s.desc}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="card h-fit p-4 lg:sticky lg:top-[92px]">
          <h2 className="mb-3 text-[15px]">سفارش شما</h2>
          <ul className="mb-3 max-h-56 space-y-2 overflow-y-auto">
            {lines.map((l) => (
              <li key={l.slug + (l.variant ?? "")} className="flex items-center gap-2">
                <BasePathImage src={l.image} alt={l.name} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
                <span className="line-clamp-1 flex-1 text-[12px] font-bold">{l.name}</span>
                <span className="num text-[11px] text-ink-500">×{toFa(l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label className="label" htmlFor="checkout-coupon">کد تخفیف</label>
            <input
              id="checkout-coupon"
              className="field"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="DARU10"
            />
            {applied && <p className="mt-1 text-[11px] font-bold text-brand-600">{applied.label} اعمال شد.</p>}
          </div>
          <ul className="space-y-2.5 border-t border-line pt-3 text-[13px]">
            <li className="flex justify-between">
              <span className="text-ink-500">جمع کالاها</span>
              <span className="num font-bold">{formatPrice(subtotal)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-500">هزینه ارسال</span>
              <span className="num font-bold">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </li>
            {couponOff > 0 && (
              <li className="flex justify-between text-sale-500">
                <span>کد تخفیف</span>
                <span className="num font-bold">{formatPrice(couponOff)}−</span>
              </li>
            )}
            <li className="flex justify-between border-t border-line pt-3 text-[15px]">
              <span className="font-bold">مبلغ قابل پرداخت</span>
              <span className="num font-black text-brand-700">{formatPrice(total)}</span>
            </li>
          </ul>
          {errors.form && <p className="mt-3 text-[12px] font-bold text-sale-500">{errors.form}</p>}
          <button type="submit" disabled={submitting} className="btn btn-primary mt-4 w-full justify-center py-3">
            {submitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-6 text-ink-300">
            این یک فروشگاه نمونه است و هیچ پرداخت واقعی انجام نمی‌شود.
          </p>
        </aside>
      </form>
    </div>
  );
}
