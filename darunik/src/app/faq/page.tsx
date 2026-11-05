import type { Metadata } from "next";
import { ChevronDown } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "سؤالات متداول",
  description: "پاسخ پرتکرارترین سؤالات مشتریان درباره خرید، ارسال، پرداخت، مرجوعی و اصالت کالا در فروشگاه دارونیک.",
  alternates: { canonical: "/faq" },
};

const FAQ: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "خرید و پرداخت",
    items: [
      { q: "چطور سفارش ثبت کنم؟", a: "محصول موردنظر را به سبد خرید اضافه کنید، سپس در صفحه تسویه حساب اطلاعات گیرنده، روش ارسال و روش پرداخت را انتخاب و سفارش را نهایی کنید." },
      { q: "روش‌های پرداخت کدام‌اند؟", a: "پرداخت اینترنتی از طریق درگاه بانکی، پرداخت در محل برای سفارش‌های درون‌شهری و پرداخت با کیف پول. در این نمونه‌کار هیچ تراکنش واقعی انجام نمی‌شود." },
      { q: "کد تخفیف را کجا وارد کنم؟", a: "در صفحه سبد خرید یا در ستون خلاصه سفارش صفحه تسویه حساب. کدهای نمونه: DARU10 و HEALTH15." },
    ],
  },
  {
    group: "ارسال و تحویل",
    items: [
      { q: "ارسال چقدر زمان می‌برد؟", a: "ارسال فوری درون‌شهری کمتر از ۴ ساعت و پست پیشتاز بین ۲ تا ۴ روز کاری در نظر گرفته شده است." },
      { q: "هزینه ارسال چقدر است؟", a: "برای سفارش‌های بالای ۲٬۰۰۰٬۰۰۰ تومان ارسال رایگان است؛ در غیر این صورت هزینه بر اساس روش انتخابی محاسبه می‌شود." },
      { q: "امکان تحویل حضوری وجود دارد؟", a: "بله، گزینه تحویل حضوری از انبار با هماهنگی تلفنی در مرحله انتخاب روش ارسال در دسترس است." },
    ],
  },
  {
    group: "کالا و مرجوعی",
    items: [
      { q: "اصالت کالاها چگونه تضمین می‌شود؟", a: "در این نمونه‌کار فرض شده همه کالاها از مسیر رسمی تأمین می‌شوند و در زمان تحویل، پلمب و برچسب اصالت قابل بررسی است." },
      { q: "شرایط مرجوع کردن کالا چیست؟", a: "کالاهای پلمب‌شده و سالم تا ۷ روز پس از تحویل قابل مرجوع هستند. اقلام باز شده به دلیل ماهیت بهداشتی مرجوع نمی‌شوند." },
      { q: "آیا برای خرید مکمل به نسخه نیاز است؟", a: "مکمل‌های غذایی معمولاً بدون نسخه عرضه می‌شوند، اما مصرف آن‌ها در شرایط خاص باید با نظر پزشک یا داروساز باشد." },
    ],
  },
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "سؤالات متداول" }]} />
      <h1 className="text-[22px]">سؤالات متداول</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-8 text-ink-500">
        پاسخ پرتکرارترین پرسش‌های کاربران درباره خرید از دارونیک. اگر پاسخ سؤال شما اینجا نبود، از صفحه تماس با ما
        پیام بگذارید.
      </p>
      <div className="mt-5 space-y-4">
        {FAQ.map((g) => (
          <section key={g.group} className="card p-5">
            <h2 className="mb-3 text-[16px]">{g.group}</h2>
            <ul className="space-y-2">
              {g.items.map((i) => (
                <li key={i.q} className="overflow-hidden rounded-xl border border-line">
                  <details>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[13px] font-bold">
                      {i.q}
                      <ChevronDown size={16} className="shrink-0 text-brand-500" />
                    </summary>
                    <p className="border-t border-line px-4 py-3 text-[13px] leading-8 text-ink-700">{i.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
