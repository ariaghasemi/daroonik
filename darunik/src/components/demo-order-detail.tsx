"use client";

import Image from "@/components/site-image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ChevronLeft } from "@/components/icons";
import { useDemoOrders } from "@/lib/demo-orders";
import { EmptyState } from "@/components/ui";
import { formatPrice, toFa } from "@/lib/utils";

export function DemoOrderDetail() {
  const code = useSearchParams().get("code");
  const order = useDemoOrders().find((item) => item.code === code);
  if (!order) return <EmptyState title="سفارش آزمایشی پیدا نشد" desc="سفارش‌ها فقط در همان مرورگری که از آن استفاده کرده‌اید نگهداری می‌شوند." action={<Link href="/account/orders" className="btn btn-primary">سفارش‌های من</Link>} />;

  const steps = ["ثبت سفارش", "در حال پردازش", "ارسال شده", "تحویل داده شده"];
  const activeStep = 0;

  return (
    <div className="space-y-3">
      <h1 className="num text-[18px]">جزئیات سفارش آزمایشی {order.code}</h1>

      <p className="text-[12px] text-ink-500">مراحل زیر نمایشی هستند و هیچ سفارشی پردازش یا ارسال نمی‌شود.</p>
      <ol className="card flex flex-wrap items-center gap-3 p-4 text-[12px]">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`num flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black ${i <= activeStep ? "bg-brand-500 text-white" : "bg-surface text-ink-300"}`}>
              {i < activeStep ? <Check size={14} strokeWidth={2.4} /> : toFa(i + 1)}
            </span>
            <span className={i <= activeStep ? "font-bold" : "text-ink-300"}>{s}</span>
            {i < steps.length - 1 && <ChevronLeft size={14} className="text-ink-300" />}
          </li>
        ))}
      </ol>

      <div className="card p-4">
        <h2 className="mb-3 text-[15px]">اقلام سفارش</h2>
        <ul className="space-y-2">
          {order.items.map((it) => (
            <li key={it.slug} className="flex items-center gap-3 rounded-xl border border-line p-2">
              <Image src={it.image} alt={it.name} width={56} height={56} className="h-14 w-14 rounded-lg object-contain" />
              <Link href={`/product/${it.slug}`} className="flex-1 text-[12.5px] font-bold hover:text-brand-600">{it.name}</Link>
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
            <li><span className="text-ink-500">گیرنده: </span><span className="font-bold">{order.fullName}</span></li>
            <li><span className="text-ink-500">تلفن: </span><span className="num font-bold">{order.phone}</span></li>
            <li><span className="text-ink-500">استان/شهر: </span><span className="font-bold">{order.province} / {order.city}</span></li>
            <li><span className="text-ink-500">نشانی: </span>{order.address}</li>
            <li><span className="text-ink-500">روش ارسال: </span><span className="font-bold">{order.shippingMethod}</span></li>
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="mb-3 text-[15px]">اطلاعات پرداخت</h2>
          <ul className="space-y-2 text-[12.5px]">
            <li className="flex justify-between"><span className="text-ink-500">روش پرداخت</span><span className="font-bold">{order.paymentMethod}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">جمع کالاها</span><span className="num font-bold">{formatPrice(order.subtotal)}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">تخفیف</span><span className="num font-bold text-sale-500">{formatPrice(order.discount)}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">هزینه ارسال</span><span className="num font-bold">{order.shipping === 0 ? "رایگان" : formatPrice(order.shipping)}</span></li>
            <li className="flex justify-between border-t border-line pt-2 text-[14px]"><span className="font-bold">مبلغ کل</span><span className="num font-black text-brand-700">{formatPrice(order.total)}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
