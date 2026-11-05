import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { SHIPPING_METHODS, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "شرایط ارسال",
  description: "روش‌های ارسال، هزینه‌ها و زمان تحویل سفارش در فروشگاه اینترنتی دارونیک؛ ارسال فوری، پست پیشتاز و تحویل حضوری.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "شرایط ارسال" }]} />
      <h1 className="text-[22px]">شرایط و روش‌های ارسال</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        این صفحه و روش‌های ارسال صرفاً نمایشی هستند؛ هیچ سفارش واقعی پردازش یا ارسال نمی‌شود.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {SHIPPING_METHODS.map((s) => (
          <div key={s.id} className="card p-5">
            <h2 className="text-[15px]">{s.title}</h2>
            <p className="mt-2 text-[12.5px] leading-7 text-ink-500">{s.desc}</p>
            <p className="num mt-3 text-[15px] font-black text-brand-700">
              {s.price === 0 ? "رایگان" : `${formatPrice(s.price)} تومان`}
            </p>
          </div>
        ))}
      </div>
      <div className="card prose-fa mt-4 max-w-none p-6">
        <h2>ارسال رایگان</h2>
        <p>برای سفارش‌های بالای ۲٬۰۰۰٬۰۰۰ تومان، هزینه ارسال به‌صورت خودکار صفر می‌شود.</p>
        <h2>پیگیری سفارش</h2>
        <p>
          پس از ثبت سفارش، کد پیگیری برای شما نمایش داده می‌شود و می‌توانید وضعیت آن را در بخش{" "}
          <Link href="/account/orders">سفارش‌های من</Link> دنبال کنید.
        </p>
        <h2>بسته‌بندی</h2>
        <p>
          همه سفارش‌ها در بسته‌بندی ضدضربه و بدون درج نام محصول روی بسته ارسال می‌شوند تا حریم خصوصی شما حفظ شود.
        </p>
      </div>
    </div>
  );
}
