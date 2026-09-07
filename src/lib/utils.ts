export const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatPrice(value: number): string {
  return toFa(value.toLocaleString("en-US"));
}

export function discountPercent(price: number, oldPrice?: number | null): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Absolute site URL used for metadataBase, sitemap, robots and schema.org.
 *  On Cloudflare Pages set `NEXT_PUBLIC_SITE_URL` to the project URL (see README). */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://darunik.pages.dev").replace(/\/$/, "");

export const SITE = {
  name: "دارونیک",
  nameEn: "Darunik",
  slogan: "داروخانه آنلاین تخصصی سلامت",
  url: siteUrl,
  phone: "۰۰۰۰۰۰۰۰۰۰۰",
  email: "info@darunik.demo",
  address: "این یک نمونه‌کار است؛ نشانی نمایشی: تهران، خیابان نمونه، پلاک ۰",
  author: "آریا قاسمی",
  authorLink: "https://www.karlancer.com/review/Hs1226584",
};

export const SHIPPING_METHODS = [
  { id: "express", title: "ارسال فوری درون‌شهری", desc: "تحویل کمتر از ۴ ساعت (تهران)", price: 79000 },
  { id: "post", title: "پست پیشتاز", desc: "۲ تا ۴ روز کاری در سراسر کشور", price: 49000 },
  { id: "pickup", title: "تحویل حضوری از انبار", desc: "رایگان، با هماهنگی تلفنی", price: 0 },
];

export const PAYMENT_METHODS = [
  { id: "online", title: "پرداخت اینترنتی", desc: "درگاه امن بانکی (دمو)" },
  { id: "cod", title: "پرداخت در محل", desc: "فقط برای سفارش‌های درون‌شهری" },
  { id: "wallet", title: "کیف پول دارونیک", desc: "موجودی نمایشی: ۰ تومان" },
];

export const COUPONS: Record<string, { percent: number; label: string }> = {
  DARU10: { percent: 10, label: "۱۰٪ تخفیف خوش‌آمدگویی" },
  HEALTH15: { percent: 15, label: "۱۵٪ تخفیف کمپین سلامت" },
};

export const FREE_SHIPPING_THRESHOLD = 2000000;
