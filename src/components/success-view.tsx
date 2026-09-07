"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package } from "@/components/icons";
import { OrderDetailCard } from "@/components/orders-client";
import { loadOrders, type DemoOrder } from "@/lib/demo-store";

/**
 * `/checkout/success?code=DRN-xxxx` — a query param (not a path segment) on purpose:
 * it keeps the page a single prerendered file, so deep links work on a static host.
 */
export function SuccessView() {
  const params = useSearchParams();
  const code = params.get("code");
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    if (!code) return;
    let alive = true;
    loadOrders().then((res) => {
      if (alive) setOrder(res.orders.find((o) => o.code === code) ?? null);
    });
    return () => {
      alive = false;
    };
  }, [code]);

  return (
    <div className="container-x py-10">
      <div className="card mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle size={34} strokeWidth={1.5} />
        </div>
        <h1 className="mt-4 text-[20px]">سفارش شما با موفقیت ثبت شد</h1>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          کد پیگیری سفارش شما <span className="num font-black text-ink-900">{code ?? "—"}</span> است. این یک فروشگاه
          نمونه است و پرداخت واقعی انجام نشده؛ جزئیات سفارش را می‌توانید در پنل کاربری پیگیری کنید.
        </p>

        {order && (
          <div className="mt-5 text-right">
            <OrderDetailCard order={order} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/account/orders" className="btn btn-primary gap-1.5">
            <Package size={16} />
            پیگیری سفارش‌ها
          </Link>
          <Link href="/shop" className="btn btn-ghost">
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
