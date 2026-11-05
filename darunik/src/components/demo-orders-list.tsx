"use client";

import Link from "next/link";
import { ChevronLeft, Clock, Package, Truck } from "@/components/icons";
import { EmptyState } from "@/components/ui";
import { useDemoOrders } from "@/lib/demo-orders";
import { formatPrice, toFa } from "@/lib/utils";

export function DemoOrdersList() {
  const orders = useDemoOrders().slice().reverse();
  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">سفارش‌های من</h1>
      {orders.length === 0 ? (
        <EmptyState
          title="هنوز سفارشی ثبت نکرده‌اید"
          desc="پس از ثبت اولین سفارش، وضعیت و جزئیات آن در این بخش نمایش داده می‌شود."
          action={<Link href="/shop" className="btn btn-primary">شروع خرید</Link>}
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
              <Link href={`/account/orders/detail?code=${encodeURIComponent(o.code)}`} className="btn btn-ghost mt-3 w-fit gap-1.5">
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
