import Link from "next/link";
import { Award, Instagram, Linkedin, Mail, MapPin, Phone, PlayCircle, ShieldCheck, Telegram } from "@/components/icons";
import { Logo } from "@/components/ui";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE, toFa } from "@/lib/utils";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "دسته‌بندی‌ها",
    links: [
      ["/category/sports-supplements", "مکمل‌های ورزشی"],
      ["/category/vitamins", "ویتامین و مکمل"],
      ["/category/skin-care", "مراقبت پوست"],
      ["/category/hair-care", "مراقبت مو"],
      ["/category/oral-care", "بهداشت دهان و دندان"],
      ["/category/medical-devices", "تجهیزات پزشکی"],
      ["/category/mom-baby", "مادر و کودک"],
    ],
  },
  {
    title: "خرید از دارونیک",
    links: [
      ["/shop", "فروشگاه"],
      ["/sale", "تخفیف‌ها"],
      ["/new", "جدیدترین محصولات"],
      ["/bestsellers", "پرفروش‌ترین‌ها"],
      ["/brands", "برندها"],
      ["/cart", "سبد خرید"],
      ["/account/orders", "پیگیری سفارش"],
    ],
  },
  {
    title: "راهنمای مشتریان",
    links: [
      ["/faq", "سؤالات متداول"],
      ["/shipping", "شرایط ارسال"],
      ["/terms", "قوانین و مقررات"],
      ["/privacy", "حریم خصوصی"],
      ["/contact", "تماس با ما"],
      ["/about", "درباره ما"],
    ],
  },
  {
    title: "مجله سلامت",
    links: [
      ["/blog", "همه مقالات"],
      ["/blog/category/vitamins", "ویتامین‌ها"],
      ["/blog/category/sports", "مکمل‌های ورزشی"],
      ["/blog/category/skin", "مراقبت پوست"],
      ["/blog/category/mom-baby", "مادر و کودک"],
      ["/blog/category/devices", "تجهیزات پزشکی"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-ink-900 pb-[70px] text-white lg:pb-0">
      <div className="container-x">
        <div className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="text-[18px] text-white">از تخفیف‌های هفتگی جا نمانید</h2>
            <p className="mt-2 text-[13px] leading-7 text-white/60">
              شماره موبایل خود را وارد کنید تا پیشنهادهای ویژه، کدهای تخفیف و مطالب تازه مجله سلامت را دریافت کنید.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <div className="rounded-xl bg-white px-3 py-2 w-fit">
              <Logo size="sm" />
            </div>
            <p className="mt-4 text-[12.5px] leading-8 text-white/60">
              دارونیک یک فروشگاه اینترنتی نمونه در حوزه سلامت است؛ از مکمل‌های ورزشی و ویتامین‌ها تا محصولات مراقبت
              پوست و مو، بهداشت دهان و دندان، تجهیزات پزشکی و کالای مادر و کودک. این پروژه صرفاً به‌عنوان نمونه‌کار
              طراحی و توسعه فروشگاه اینترنتی ساخته شده است.
            </p>
            <ul className="mt-4 space-y-2.5 text-[12.5px] text-white/70">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-1 shrink-0 text-brand-300" />
                <span>تلفن پشتیبانی: <span className="num font-bold text-white">{SITE.phone}</span></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-1 shrink-0 text-brand-300" />
                <span>{SITE.email}</span>
              </li>
              <li className="flex items-start gap-2 leading-7">
                <MapPin size={15} className="mt-1 shrink-0 text-brand-300" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-3 text-[14px] text-white">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(([href, title]) => (
                  <li key={href}>
                    <Link href={href} className="text-[12.5px] text-white/60 transition hover:text-brand-300">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: "اینستاگرام", Ico: Instagram },
              { label: "تلگرام", Ico: Telegram },
              { label: "لینکدین", Ico: Linkedin },
              { label: "آپارات", Ico: PlayCircle },
            ].map((s) => (
              <span
                key={s.label}
                title={`${s.label} (نمایشی)`}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition hover:border-brand-300 hover:text-brand-300"
              >
                <s.Ico size={18} />
              </span>
            ))}
            <div className="flex gap-2">
              {[
                { t: "نماد اعتماد", Ico: ShieldCheck },
                { t: "ساماندهی", Ico: Award },
                { t: "اتحادیه", Ico: Award },
              ].map((b) => (
                <span
                  key={b.t}
                  className="flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 text-center text-[9px] leading-4 text-white/60"
                >
                  <b.Ico size={17} className="text-brand-300" />
                  {b.t}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[11.5px] leading-7 text-white/50">
            © تمامی حقوق این نمونه‌کار محفوظ است — {SITE.name} {toFa(1404)} · طراحی و توسعه نمونه کار:{" "}
            <a
              href={SITE.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-300 hover:text-brand-200"
            >
              آریا قاسمی
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
