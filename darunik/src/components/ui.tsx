import Link from "next/link";
import { ChevronLeft, Icon, Return, Search as SearchIcon, ShieldCheck, Star as StarIcon, Support, Truck } from "@/components/icons";
import { cx, formatPrice, toFa } from "@/lib/utils";

export function Logo({ size = "md", withTag = true }: { size?: "sm" | "md" | "lg"; withTag?: boolean }) {
  const scale = size === "lg" ? "text-[30px]" : size === "sm" ? "text-[20px]" : "text-[26px]";
  return (
    <span className="inline-flex items-center gap-2 select-none" aria-label="دارونیک، داروخانه آنلاین">
      <span className="relative inline-flex flex-col leading-none">
        <span className={cx("font-[family-name:var(--font-display)] font-black tracking-tight", scale)}>
          <span className="text-ink-900">دارو</span>
          <span className="text-brand-600">نیـک</span>
          <span className="relative -top-[2px] mr-[3px] inline-block h-[9px] w-[9px] rounded-[3px] bg-brand-500 align-top" />
        </span>
        {withTag && (
          <span className="mt-[3px] text-[9px] font-bold tracking-[0.32em] text-ink-300">DARUNIK</span>
        )}
      </span>
    </span>
  );
}

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[1px]" aria-label={`امتیاز ${toFa(value.toFixed(1))} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: value >= i - 0.4 ? "var(--color-gold-400)" : "#e3eaef" }}>
          <StarIcon size={size} />
        </span>
      ))}
    </span>
  );
}

export function Price({
  value,
  old,
  size = "md",
}: {
  value: number;
  old?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const main = size === "lg" ? "text-[24px]" : size === "sm" ? "text-[14px]" : "text-[17px]";
  return (
    <span className="flex flex-col items-end gap-[2px]">
      {old && old > value ? (
        <span className="num text-[12px] text-ink-300 line-through">{formatPrice(old)}</span>
      ) : null}
      <span className="flex items-baseline gap-1">
        <span className={cx("num font-black text-ink-900", main)}>{formatPrice(value)}</span>
        <span className="text-[11px] font-bold text-ink-500">تومان</span>
      </span>
    </span>
  );
}

export function Badge({
  tone = "brand",
  children,
}: {
  tone?: "brand" | "sale" | "gold" | "info" | "muted";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-700",
    sale: "bg-sale-500 text-white",
    gold: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
    muted: "bg-slate-100 text-ink-500",
  };
  return <span className={cx("badge", tones[tone])}>{children}</span>;
}

export function Breadcrumbs({ items }: { items: { title: string; href?: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-3 text-[12px] text-ink-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-brand-600">
            خانه
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-ink-300" aria-hidden="true">
              <ChevronLeft size={12} />
            </span>
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-600">
                {item.title}
              </Link>
            ) : (
              <span className="font-bold text-ink-700">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkText = "مشاهده همه",
  accent = "brand",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
  accent?: "brand" | "sale" | "gold";
}) {
  const bar = accent === "sale" ? "bg-sale-500" : accent === "gold" ? "bg-gold-400" : "bg-brand-500";
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className={cx("h-7 w-1.5 rounded-full", bar)} />
        <div>
          <h2 className="text-[18px] md:text-[21px]">{title}</h2>
          {subtitle && <p className="mt-1 text-[12px] text-ink-500">{subtitle}</p>}
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-[13px] font-bold text-brand-600 hover:gap-2 md:inline-flex"
        >
          {linkText}
          <ChevronLeft size={15} />
        </Link>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center gap-3 p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <SearchIcon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-[17px]">{title}</h3>
      <p className="max-w-md text-[13px] leading-7 text-ink-500">{desc}</p>
      {action}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  baseHref,
}: {
  page: number;
  totalPages: number;
  baseHref: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );
  const sep = baseHref.includes("?") ? "&" : "?";
  return (
    <nav aria-label="صفحه‌بندی" className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={`${baseHref}${sep}page=${page - 1}`} className="chip gap-1">
          <Icon name="chevronRight" size={14} />
          قبلی
        </Link>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - pages[i - 1] > 1 && <span className="text-ink-300">…</span>}
          <Link
            href={`${baseHref}${sep}page=${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cx("chip num min-w-9 justify-center", p === page && "chip-active")}
          >
            {toFa(p)}
          </Link>
        </span>
      ))}
      {page < totalPages && (
        <Link href={`${baseHref}${sep}page=${page + 1}`} className="chip gap-1">
          بعدی
          <Icon name="chevronLeft" size={14} />
        </Link>
      )}
    </nav>
  );
}

export function TrustRow() {
  const items = [
    { Icon: Truck, title: "ارسال سریع", desc: "تحویل درون‌شهری زیر ۴ ساعت" },
    { Icon: ShieldCheck, title: "تضمین اصالت", desc: "تأمین از مسیر رسمی" },
    { Icon: Support, title: "مشاوره داروساز", desc: "پاسخ‌گویی ۷ روز هفته" },
    { Icon: Return, title: "بازگشت کالا", desc: "تا ۷ روز برای کالای پلمب" },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.title} className="card flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <item.Icon size={22} strokeWidth={1.5} />
          </span>
          <span className="flex flex-col">
            <span className="text-[13px] font-bold">{item.title}</span>
            <span className="text-[11px] text-ink-500">{item.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
