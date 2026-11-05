import Image from "@/components/site-image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, TrustRow } from "@/components/ui";
import { SITE, toFa } from "@/lib/utils";

export const metadata: Metadata = {
  title: "درباره دارونیک",
  description: "درباره فروشگاه اینترنتی دارونیک؛ یک نمونه‌کار حرفه‌ای طراحی داروخانه آنلاین با تمرکز بر تجربه کاربری، سئو و ساختار فروشگاهی استاندارد.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "درباره ما" }]} />
      <div className="card overflow-hidden">
        <div className="relative aspect-[16/6]">
          <Image src="/images/hero-vitamins.webp" alt="فروشگاه اینترنتی سلامت دارونیک" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/85" />
          <div className="absolute inset-y-0 right-0 flex max-w-[520px] flex-col justify-center p-6">
            <h1 className="text-[22px] leading-10 md:text-[28px]">دارونیک؛ داروخانه آنلاین تخصصی سلامت</h1>
            <p className="mt-2 text-[13px] leading-8 text-ink-700">
              تجربه‌ای ساده، سریع و مطمئن از خرید محصولات سلامت برای همه اعضای خانواده.
            </p>
          </div>
        </div>
        <div className="prose-fa max-w-none p-6">
          <h2>ما چه کاری انجام می‌دهیم؟</h2>
          <p>
            دارونیک یک فروشگاه اینترنتی نمونه در حوزه سلامت است که ساختار کامل یک داروخانه آنلاین حرفه‌ای را
            شبیه‌سازی می‌کند: دسته‌بندی چندسطحی محصولات، فیلترهای پیشرفته، صفحه محصول کامل با مشخصات و روش مصرف،
            سبد خرید، تسویه حساب، پنل کاربری و مجله سلامت.
          </p>
          <h2>ارزش‌های ما</h2>
          <ul>
            <li>شفافیت اطلاعات محصول؛ درج مشخصات، روش مصرف و هشدارهای ایمنی</li>
            <li>احترام به سلامت کاربر؛ پرهیز از ادعاهای درمانی و تشویق به مشورت با پزشک</li>
            <li>تجربه کاربری روان در موبایل و دسکتاپ</li>
            <li>سرعت بارگذاری بالا و ساختار سئوی استاندارد</li>
          </ul>
          <h2>این پروژه چگونه ساخته شده است؟</h2>
          <p>
            طراحی این نمونه‌کار به‌گونه‌ای انجام شده که تمام اجزای آن قابل پیاده‌سازی با وردپرس، ووکامرس و المنتور
            باشد: دسته‌بندی‌ها با Product Categories، ویژگی‌ها با Product Attributes، فیلترها با افزونه‌های فیلتر
            محصولات، مجله سلامت با پست‌های وردپرس و بخش‌های اختصاصی با کد سفارشی یا افزونه اختصاصی.
          </p>
          <p>
            برای دیدن ساختار فروشگاه به <Link href="/shop">صفحه فروشگاه</Link> و برای مطالعه مقالات به{" "}
            <Link href="/blog">مجله سلامت</Link> سر بزنید.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {[
          ["۵۰+", "محصول نمونه"],
          ["۷", "دسته اصلی"],
          ["۱۰", "برند نمونه"],
          ["۸", "مقاله آموزشی"],
        ].map(([v, t]) => (
          <div key={t} className="card p-5 text-center">
            <p className="num text-[26px] font-black text-brand-600">{v}</p>
            <p className="mt-1 text-[12.5px] text-ink-500">{t}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <TrustRow />
      </div>

      <div className="card mt-4 p-6">
        <h2 className="text-[17px]">تماس با دارونیک</h2>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          شماره پشتیبانی نمونه: <span className="num font-bold">{SITE.phone}</span> — {SITE.address}
        </p>
        <p className="mt-1 text-[12px] text-ink-300">
          طراحی و توسعه نمونه کار: {SITE.author} · {toFa(1404)}
        </p>
      </div>
    </div>
  );
}
