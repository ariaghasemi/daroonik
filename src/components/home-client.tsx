"use client";

import { BasePathImage } from "@/components/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { cx, toFa } from "@/lib/utils";

const SLIDES = [
  {
    href: "/category/sports-supplements",
    image: "/images/hero-sports.webp",
    badge: "کمپین تناسب اندام",
    title: "مکمل‌های ورزشی اصل،\nبا مشاوره تخصصی",
    desc: "پروتئین وی، کراتین و آمینواسید از برندهای منتخب؛ همراه با راهنمای مصرف و پشتیبانی داروساز.",
    cta: "خرید مکمل ورزشی",
    off: 40,
    theme: "dark" as const,
  },
  {
    href: "/category/skin-care",
    image: "/images/hero-skincare.webp",
    badge: "روتین پوستی",
    title: "پوست شما لایق\nمراقبت روزانه است",
    desc: "ضدآفتاب، سرم ویتامین C و مرطوب‌کننده‌های تخصصی برای همه انواع پوست، با تضمین اصالت کالا.",
    cta: "مشاهده مراقبت پوست",
    off: 25,
    theme: "light" as const,
  },
  {
    href: "/category/vitamins",
    image: "/images/hero-vitamins.webp",
    badge: "سلامت خانواده",
    title: "ویتامین‌ها و مکمل‌های\nروزانه خانواده",
    desc: "مولتی‌ویتامین، ویتامین D، امگا ۳ و مکمل کودکان؛ ارسال سریع به سراسر ایران.",
    cta: "خرید ویتامین",
    off: 30,
    theme: "light" as const,
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-ink-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="پیشنهادهای ویژه دارونیک"
    >
      <div className="relative aspect-[16/11] w-full sm:aspect-[21/9] lg:aspect-[2.5/1]">
        {SLIDES.map((s, idx) => (
          <div
            key={s.href}
            className={cx(
              "absolute inset-0 transition-opacity duration-700",
              idx === i ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={idx !== i}
          >
            <BasePathImage
              src={s.image}
              alt={s.title.replace("\n", " ")}
              fill
              priority={idx === 0}
              sizes="(max-width:1024px) 100vw, 900px"
              className="object-cover"
            />
            <div
              className={cx(
                "absolute inset-0",
                s.theme === "dark"
                  ? "bg-gradient-to-l from-transparent via-ink-900/50 to-ink-900/85"
                  : "bg-gradient-to-l from-transparent via-white/45 to-white/90",
              )}
            />
            <div
              className={cx(
                "absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col justify-center gap-3 p-5 sm:p-8 lg:p-12",
                s.theme === "dark" ? "text-white" : "text-ink-900",
              )}
            >
              <span
                className={cx(
                  "num w-fit rounded-lg px-3 py-1.5 text-[11px] font-black",
                  s.theme === "dark" ? "bg-white/15 text-white" : "bg-brand-500 text-white",
                )}
              >
                {s.badge} · تا {toFa(s.off)}٪ تخفیف
              </span>
              <h2 className="whitespace-pre-line text-[22px] leading-[1.7] sm:text-[30px] lg:text-[38px]">
                {s.title}
              </h2>
              <p
                className={cx(
                  "max-w-[420px] text-[12px] leading-7 sm:text-[14px]",
                  s.theme === "dark" ? "text-white/75" : "text-ink-700",
                )}
              >
                {s.desc}
              </p>
              <Link href={s.href} className="btn btn-primary w-fit px-6 py-2.5">
                {s.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((s, idx) => (
          <button
            key={s.href}
            onClick={() => setI(idx)}
            aria-label={`اسلاید ${toFa(idx + 1)}`}
            aria-current={idx === i}
            className={cx(
              "h-2 rounded-full transition-all",
              idx === i ? "w-7 bg-brand-500" : "w-2 bg-ink-900/25",
            )}
          />
        ))}
      </div>
      <button
        onClick={() => setI((v) => (v + 1) % SLIDES.length)}
        aria-label="اسلاید بعدی"
        className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-700 shadow-sm transition hover:bg-white lg:flex"
      >
        <ChevronRight size={18} />
      </button>
      <button
        onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="اسلاید قبلی"
        className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-700 shadow-sm transition hover:bg-white lg:flex"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}

export function Countdown({ hours = 8 }: { hours?: number }) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v <= 0 ? hours * 3600 : v - 1)), 1000);
    return () => clearInterval(t);
  }, [hours]);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const box = "num flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-[13px] font-black text-white";
  return (
    <div className="flex items-center gap-1.5" role="timer" aria-label="زمان باقی‌مانده پیشنهاد شگفت‌انگیز">
      <span className={box}>{toFa(String(s).padStart(2, "0"))}</span>
      <span className="text-white/60">:</span>
      <span className={box}>{toFa(String(m).padStart(2, "0"))}</span>
      <span className="text-white/60">:</span>
      <span className={box}>{toFa(String(h).padStart(2, "0"))}</span>
    </div>
  );
}
