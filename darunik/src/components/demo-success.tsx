"use client";

import Link from "next/link";
import { CheckCircle, Package } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { useDemoOrders } from "@/lib/demo-orders";
import { EmptyState } from "@/components/ui";
import { formatPrice, toFa } from "@/lib/utils";

export function DemoSuccess() {
  const code = useSearchParams().get("code");
  const order = useDemoOrders().find((item) => item.code === code);
  if (!order) return <div className="container-x py-8"><EmptyState title="سفارش آزمایشی پیدا نشد" desc="سفارش‌ها فقط در مرورگر ثبت‌کننده نگهداری می‌شوند." action={<Link href="/shop" className="btn btn-primary">بازگشت به فروشگاه</Link>} /></div>;

  return (
    <div className="container-x py-10">
      <div className="card mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle size={34} strokeWidth={1.5} />
        </div>
        <h1 className="mt-4 text-[20px]">سفارش آزمایشی شما ثبت شد</h1>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          کد پیگیری سفارش شما <span className="num font-black text-ink-900">{code ?? "—"}</span> است. این یک فروشگاه
          نمونه است؛ پرداخت واقعی انجام نشده و سفارش فقط در همین مرورگر ذخیره شده است.
        </p>

        {order && (
          <div className="mt-5 rounded-2xl border border-line p-4 text-right">
            <ul className="space-y-2 text-[13px]">
              <li className="flex justify-between"><span className="text-ink-500">گیرنده</span><span className="font-bold">{order.fullName}</span></li>
              <li className="flex justify-between"><span className="text-ink-500">شماره تماس</span><span className="num font-bold">{order.phone}</span></li>
              <li className="flex justify-between"><span className="text-ink-500">مقصد</span><span className="font-bold">{order.province} / {order.city}</span></li>
              <li className="flex justify-between"><span className="text-ink-500">روش ارسال</span><span className="font-bold">{order.shippingMethod}</span></li>
              <li className="flex justify-between"><span className="text-ink-500">تعداد اقلام</span><span className="num font-bold">{toFa(order.items.length)}</span></li>
              <li className="flex justify-between border-t border-line pt-2"><span className="font-bold">مبلغ آزمایشی</span><span className="num font-black text-brand-700">{formatPrice(order.total)} تومان</span></li>
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/account/orders" className="btn btn-primary gap-1.5">
            <Package size={16} />
            پیگیری سفارش‌ها
          </Link>
          <Link href="/shop" className="btn btn-ghost">ادامه خرید</Link>
        </div>
      </div>
    </div>
  );
}
