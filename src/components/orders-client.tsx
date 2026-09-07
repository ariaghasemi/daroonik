"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronLeft, Clock, Package, Truck } from "@/components/icons";
import { EmptyState } from "@/components/ui";
import { DashboardStats } from "@/components/account-client";
import { loadOrders, type DemoOrder } from "@/lib/demo-store";
import { formatPrice, toFa } from "@/lib/utils";

const STEPS = ["ثبت سفارش", "در حال پردازش", "ارسال شده", "تحویل داده شده"];

/** Receipt: status timeline + items + shipping + payment (shared by the success page and the account panel). */
export function OrderDetailCard({ order }: { order: DemoOrder }) {
  const activeStep = Math.max(0, STEPS.indexOf(order.status));
  return (
    <div className="space-y-3">
      <ol className="card flex flex-wrap items-center gap-3 p-4 text-[12px]">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`num flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black ${
                i <= activeStep ? "bg-brand-500 text-white" : "bg-surface text-ink-300"
              }`}
            >
              {i < activeStep ? <Check size={14} strokeWidth={2.4} /> : toFa(i + 1)}
            </span>
            <span className={i <= activeStep ? "font-bold" : "text-ink-300"}>{s}</span>
            {i < STEPS.length - 1 && <ChevronLeft size={14} className="text-ink-300" />}
          </li>
        ))}
      </ol>

      <div className="card p-4">
        <h2 className="mb-3 text-[15px]">اقلام سفارش</h2>
        <ul className="space-y-2">
          {order.items.map((it) => (
            <li key={it.slug} className="flex items-center gap-3 rounded-xl border border-line p-2">
              <Image
                src={it.image}
                alt={it.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-lg object-contain"
              />
              <Link href={`/product/${it.slug}`} className="flex-1 text-[12.5px] font-bold hover:text-brand-600">
                {it.name}
              </Link>
              <span className="num text-[12px] text-ink-500">×{toFa(it.qty)}</span>
              <span className="num text-[13px] font-black">{formatPrice(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="card p-4">
          <h2 className="mb-3 text-[15px]">اطلاعات ارسال</h2>
          <ul className="space-y-2 text-[12.5px] leading-7">
            <li>
              <span className="text-ink-500">گیرنده: </span>
              <span className="font-bold">{order.fullName}</span>
            </li>
            <li>
              <span className="text-ink-500">تلفن: </span>
              <span className="num font-bold">{order.phone}</span>
            </li>
            <li>
              <span className="text-ink-500">استان/شهر: </span>
              <span className="font-bold">
                {order.province} / {order.city}
              </span>
            </li>
            <li>
              <span className="text-ink-500">نشانی: </span>
              {order.address}
            </li>
            <li>
              <span className="text-ink-500">روش ارسال: </span>
              <span className="font-bold">{order.shippingMethod}</span>
            </li>
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="mb-3 text-[15px]">اطلاعات پرداخت</h2>
          <ul className="space-y-2 text-[12.5px]">
            <li className="flex justify-between">
              <span className="text-ink-500">روش پرداخت</span>
              <span className="font-bold">{order.paymentMethod}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-500">جمع کالاها</span>
              <span className="num font-bold">{formatPrice(order.subtotal)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-500">تخفیف</span>
              <span className="num font-bold text-sale-500">{formatPrice(order.discount)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-500">هزینه ارسال</span>
              <span className="num font-bold">{order.shipping === 0 ? "رایگان" : formatPrice(order.shipping)}</span>
            </li>
            <li className="flex justify-between border-t border-line pt-2 text-[14px]">
              <span className="font-bold">مبلغ کل</span>
              <span className="num font-black text-brand-700">{formatPrice(order.total)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/** `/account/orders` — list, plus a single receipt when the URL carries `?code=`. */
export function OrdersView() {
  const params = useSearchParams();
  const wanted = params.get("code");
  const [orders, setOrders] = useState<DemoOrder[] | null>(null);

  useEffect(() => {
    let alive = true;
    loadOrders().then((res) => {
      if (alive) setOrders(res.orders);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (orders === null) {
    return (
      <div className="space-y-3">
        <div className="skeleton h-7 w-52 rounded-lg" />
        <div className="skeleton h-40 rounded-2xl" />
      </div>
    );
  }

  if (wanted) {
    const order = orders.find((o) => o.code === wanted);
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="num text-[18px]">جزئیات سفارش {wanted}</h1>
          <Link href="/account/orders" className="btn btn-ghost gap-1.5 text-[12px]">
            <ChevronLeft size={14} className="rotate-180" />
            بازگشت به فهرست سفارش‌ها
          </Link>
        </div>
        {order ? (
          <OrderDetailCard order={order} />
        ) : (
          <EmptyState
            title="سفارشی با این کد پیدا نشد"
            desc="کد پیگیری را بررسی کنید؛ در نسخه نمایشی، سفارش‌ها در همان مرورگری ثبت می‌شوند که خرید در آن انجام شده است."
            action={
              <Link href="/account/orders" className="btn btn-primary">
                فهرست سفارش‌ها
              </Link>
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">سفارش‌های من</h1>
      {orders.length === 0 ? (
        <EmptyState
          title="هنوز سفارشی ثبت نکرده‌اید"
          desc="پس از ثبت اولین سفارش، وضعیت و جزئیات آن در این بخش نمایش داده می‌شود."
          action={
            <Link href="/shop" className="btn btn-primary">
              شروع خرید
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.code} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="num text-[13px] font-black">کد سفارش: {o.code}</span>
                <span className="badge gap-1 bg-brand-50 text-brand-700">
                  <Clock size={12} />
                  {o.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-ink-500">
                <span className="num flex items-center gap-1">
                  <Package size={14} />
                  {toFa(o.items.length)} کالا
                </span>
                <span className="num">مبلغ: {formatPrice(o.total)} تومان</span>
                <span className="flex items-center gap-1">
                  <Truck size={14} />
                  {o.shippingMethod}
                </span>
              </div>
              <Link href={`/account/orders?code=${encodeURIComponent(o.code)}`} className="btn btn-ghost mt-3 w-fit gap-1.5">
                مشاهده جزئیات
                <ChevronLeft size={14} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Account dashboard block: live order stats + the four most recent orders. */
export function AccountActivity() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    let alive = true;
    loadOrders().then((res) => {
      if (alive) setOrders(res.orders);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <DashboardStats ordersCount={orders.length} />
      <div className="card p-5">
        <h2 className="text-[15px]">آخرین سفارش‌ها</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-[13px] text-ink-500">
            هنوز سفارشی ثبت نشده است.{" "}
            <Link href="/shop" className="font-bold text-brand-600">
              شروع خرید
            </Link>
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.slice(0, 4).map((o) => (
              <li key={o.code}>
                <Link
                  href={`/account/orders?code=${encodeURIComponent(o.code)}`}
                  className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-[12.5px] hover:border-brand-300"
                >
                  <span className="num font-bold">{o.code}</span>
                  <span className="text-ink-500">{o.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
