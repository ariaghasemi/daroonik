"use client";

import Link from "next/link";
import { DashboardStats } from "@/components/account-client";
import { useDemoOrders } from "@/lib/demo-orders";

export function DemoAccount() {
  const orders = useDemoOrders();
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h1 className="text-[18px]">سلام، خوش آمدید</h1>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          این پنل کاربری نمونه است و برای نمایش ساختار حساب کاربری یک فروشگاه ووکامرسی طراحی شده است. از منوی کناری
          می‌توانید سفارش‌ها، آدرس‌ها، علاقه‌مندی‌ها و لیست مقایسه را ببینید.
        </p>
      </div>
      <DashboardStats ordersCount={orders.length} />
      <div className="card p-5">
        <h2 className="text-[15px]">آخرین سفارش‌ها</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-[13px] text-ink-500">
            هنوز سفارشی ثبت نشده است.{" "}
            <Link href="/shop" className="font-bold text-brand-600">شروع خرید</Link>
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.slice(-4).reverse().map((o) => (
              <li key={o.code}>
                <Link href={`/account/orders/detail?code=${encodeURIComponent(o.code)}`} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-[12.5px] hover:border-brand-300">
                  <span className="num font-bold">{o.code}</span>
                  <span className="text-ink-500">{o.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
