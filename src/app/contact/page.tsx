import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباط با پشتیبانی فروشگاه اینترنتی دارونیک؛ ثبت پیام، مشاوره خرید و پیگیری سفارش.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "تماس با ما" }]} />
      <h1 className="text-[22px]">تماس با دارونیک</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        این یک نمونه‌کار است و اطلاعات تماس زیر واقعی نیستند. با این حال فرم تماس کاملاً کار می‌کند و پیام شما در
        پایگاه داده ثبت می‌شود.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <aside className="space-y-3">
          <div className="card p-5">
            <h2 className="text-[15px]">اطلاعات تماس</h2>
            <ul className="mt-3 space-y-3 text-[12.5px] leading-7 text-ink-500">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 shrink-0 text-brand-600" />
                <span>تلفن پشتیبانی: <span className="num font-bold text-ink-900">{SITE.phone}</span></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 shrink-0 text-brand-600" />
                <span>ایمیل: <span className="font-bold text-ink-900">{SITE.email}</span></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0 text-brand-600" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1 shrink-0 text-brand-600" />
                <span>ساعت پاسخ‌گویی: شنبه تا پنجشنبه، ۹ تا ۱۸</span>
              </li>
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="text-[15px]">پرسش‌های پرتکرار</h2>
            <p className="mt-2 text-[12.5px] leading-7 text-ink-500">
              پیش از ارسال پیام، صفحه سؤالات متداول را ببینید؛ احتمالاً پاسخ سؤال شما آنجا هست.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
