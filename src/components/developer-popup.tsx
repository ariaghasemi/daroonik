"use client";

import { BasePathImage } from "@/components/image";
import { useEffect, useState } from "react";
import { ChevronLeft, Close } from "@/components/icons";
import { SITE } from "@/lib/utils";

export function DeveloperPopup() {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      const seen = window.sessionStorage.getItem("darunik.credit.seen");
      if (!seen) {
        setExpanded(true);
        window.sessionStorage.setItem("darunik.credit.seen", "1");
      }
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-[70px] left-3 z-[85] lg:bottom-5 lg:left-5">
      {expanded ? (
        <div
          role="dialog"
          aria-label="معرفی سازنده نمونه‌کار"
          className="animate-pop w-[290px] rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-pop)] sm:w-[330px]"
        >
          <div className="flex items-start gap-3">
            <BasePathImage
              src="/images/aria-ghasemi.webp"
              alt="آریا قاسمی، طراح و توسعه‌دهنده این نمونه‌کار"
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-[10px] font-bold tracking-wide text-brand-600">طراحی و توسعه نمونه کار</p>
              <p className="mt-0.5 text-[15px] font-black">آریا قاسمی</p>
              <p className="mt-1 text-[11px] leading-6 text-ink-500">
                طراحی رابط کاربری و پیاده‌سازی فروشگاه اینترنتی سلامت — قابل اجرا با وردپرس و ووکامرس.
              </p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              aria-label="بستن پنجره معرفی سازنده"
              className="shrink-0 rounded-lg p-1 text-ink-300 transition hover:bg-surface hover:text-ink-700"
            >
              <Close size={15} />
            </button>
          </div>
          <a
            href={SITE.authorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-soft mt-3 w-full justify-center gap-1.5 text-[12px]"
          >
            مشاهده پروفایل و اعتبار در کارلنسر
            <ChevronLeft size={14} />
          </a>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          aria-label="نمایش اطلاعات سازنده نمونه‌کار"
          className="group flex items-center gap-2 rounded-full border border-line bg-white/95 py-1.5 pl-3 pr-1.5 shadow-[var(--shadow-soft)] backdrop-blur transition hover:shadow-[var(--shadow-pop)]"
        >
          <BasePathImage
            src="/images/aria-ghasemi.webp"
            alt="آریا قاسمی"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-[11px] font-bold text-ink-700 group-hover:text-brand-600">
            طراحی: آریا قاسمی
          </span>
        </button>
      )}
    </div>
  );
}
