# دارونیک — فروشگاه اینترنتی نمونه (Next.js + Cloudflare Pages)

نمونه‌کار طراحی و پیاده‌سازی یک داروخانه آنلاین کامل: صفحه اصلی، فروشگاه با فیلتر و مرتب‌سازی،
دسته‌بندی چندسطحی، صفحه محصول، سبد خرید، تسویه حساب، پنل کاربری، مجله سلامت، جستجو، سئو و
داده ساخت‌یافته Schema.org. نسخه‌ی موجود در این مخزن طوری آماده شده که **رایگان و بدون سرور روی
Cloudflare Pages** بالا بیاید.

> طراح و توسعه‌دهنده: [آریا قاسمی](https://www.karlancer.com/review/Hs1226584)

---

## ۱. استک پروژه (این پروژه Vite نیست)

| مورد | وضعیت |
| --- | --- |
| فریم‌ورک | **Next.js 16 (App Router)** + React 19 — نه Vite، نه Create React App |
| زبان | TypeScript (strict) |
| استایل | **Tailwind CSS v4** (از طریق `@tailwindcss/postcss`، بدون `tailwind.config.js`) |
| فونت | `next/font/local` + فایل‌های woff2 خودمیزبان در `src/fonts` |
| تصاویر | `next/image` (در بیلد استاتیک، فایل‌های webp از قبل بهینه‌شده سرو می‌شوند) |
| دیتابیس (اختیاری) | Drizzle ORM + PostgreSQL |
| پکیج‌منیجر | npm (فایل `package-lock.json` موجود است؛ Pages همان را استفاده می‌کند) |
| بیلد برای Pages | `next build` با `output: "export"` → پوشه‌ی `out/` |

**چرا Vite نه؟** چون خروجی برنامه یک اپ Next.js با Server Components است. ابزار بیلد، خودِ
`next build` است و در Cloudflare Pages فقط باید بگویید خروجی از `out/` برداشته شود. هیچ
تنظیمات Vite یا `vite.config.*` در کار نیست.

---

## ۲. اجرای محلی

```bash
npm install          # یک‌بار
npm run dev          # http://localhost:3000  (حالت Node، با APIها)
```

دیتابیس اختیاری است؛ اگر `DATABASE_URL` ست نشده باشد، همه‌چیز از کاتالوگ نمونه‌ی داخل
`src/data/catalog.ts` خوانده می‌شود و سایت کامل کار می‌کند.

```bash
npm run build:pages       # بیلد استاتیک → out/
npm run preview:pages     # پیش‌نمایش دقیقاً با موتور Cloudflare Pages (wrangler) روی :8788
npm run lint              # eslint
npm run typecheck         # tsc --noEmit
```

اسکریپت‌ها:

| دستور | کار |
| --- | --- |
| `npm run dev` | سرور توسعه Next (شامل `/api/*`) |
| `npm run build` | بیلد نود-سرور (برای VPS/کانتینر + Postgres) |
| `npm run build:pages` | بیلد استاتیک `out/` برای Cloudflare Pages (موقت `src/app/api` را پارک و برمی‌گرداند) |
| `npm run preview:pages` | سرو کردن `out/` با `wrangler pages dev` (همان رفتار Pages: Pretty URLs، `404.html`، `_headers`) |
| `npm run fonts:build` | تبدیل TTF → woff2 در `src/fonts` |
| `npm run db:push` | ساخت جدول‌ها روی PostgreSQL (فقط وقتی دیتابیس وصل است) |

---

## ۳. دیپلوی روی Cloudflare Pages (دو روش)

### روش الف — اتصال GitHub (پیشنهادی؛ هر `git push` = دیپلوی خودکار)

1. وارد داشبورد Cloudflare شوید: **Workers & Pages → Create → Pages → Connect to Git**.
2. ریپازیتوری `ariaghasemi/daroonik` را انتخاب کنید (اگر نیست، در Cloudflare GitHub App این مخزن را allow کنید).
3. تنظیمات Build را این‌طور پر کنید:

   | فیلد | مقدار |
   | --- | --- |
   | Framework preset | **`None` / `Other`** (پیش‌تنظیم `Next.js` دستور `next build` را تحمیل می‌کند و بیلد استاتیک ساخته نمی‌شود) |
   | Build command | `npm run build:pages` |
   | Build output directory | `out` |
   | Root directory | `/` (ریشه‌ی ریپو) |

4. بخش **Environment variables** (در همان صفحه‌ی Build settings):

   | کلید | مقدار |
   | --- | --- |
   | `NODE_VERSION` | `22` (فایل `.node-version` هم در ریشه اضافه شده) |
   | `NEXT_PUBLIC_SITE_URL` | `https://darunik.pages.dev` (آدرس نهایی پروژه‌تان) |

5. **Save and Deploy**. بعد از حدود ۱–۲ دقیقه، دامنه‌ی `https://<project-name>.pages.dev` فعال است.
6. دامنه‌ی شخصی: تب **Custom domains → Set up a custom domain**؛ اگر دامنه روی DNS همان
   اکانت Cloudflare باشد، SSL و DNS خودکار تنظیم می‌شوند.

> اگر `NEXT_PUBLIC_SITE_URL` را عوض کردید، یک دیپلوی جدید لازم است (مقدار در زمان بیلد داخل
> فایل‌ها inline می‌شود: sitemap، robots، canonical و og:image).

### روش ب — آپلود مستقیم (بدون Git)

```bash
npm run build:pages
npx wrangler login
npx wrangler pages deploy out --project-name=darunik
```

---

## ۴. وضعیت قابلیت‌ها روی هاست استاتیک

بخش‌هایی که در حالت Node به `/api/*` و Postgres نوشته می‌کنند، روی Pages حذف شده‌اند
(هاست استاتیک سرور ندارد) و به‌جایشان **حالت دمو** فعال است:

| قابلیت | روی Pages (استاتیک) | روی Node + Postgres |
| --- | --- | --- |
| مشاهده‌ی محصول/دسته/برند/مقاله | کامل (پیش‌رندر شده) | کامل (از DB، با fallback) |
| فیلتر، مرتب‌سازی، صفحه‌بندی، جستجو | کامل — روی کلاینت و در URL (`?brands=…&sort=cheap&page=2`) | همان |
| سبد خرید، علاقه‌مندی، مقایسه | localStorage | localStorage |
| ثبت سفارش | کد پیگیری نمونه ساخته و در همان مرورگر ذخیره می‌شود؛ پیگیری در `/account/orders?code=…` | `POST /api/orders` + جدول `orders` |
| فرم تماس / خبرنامه | ذخیره در localStorage + پیام موفقیت (برچسب «نسخه نمایشی») | `POST /api/contact` / `newsletter` + جدول `messages` |
| `next/image` بهینه‌ساز | خاموش (تصاویر از قبل webp هستند) | روشن (avif/webp on-demand) |

برای فعال کردن دوباره‌ی دیتابیس: `.env.example` را به `.env` کپی کنید، `DATABASE_URL` را
بدهید، `npm run db:push` بزنید و با `npm run build && npm start` اجرا کنید.

---

## ۵. فونت‌ها و تصاویر (چیزهایی که درست شدند)

- فونت‌های **Dana / Kalameh / Peyda** از `public/fonts/*.ttf` (با `@font-face` دستی) به
  `next/font/local` منتقل شدند: خروجی woff2، `font-display: swap`، URL هش‌دار با کش ابدی و
  preload خودکار. حجم وب‌فونت از ~۶۲۰KB به ~۲۲۰KB رسید.
- باگ واقعی: `Kalameh-Black.ttf` در واقع یک فایل **woff2** بود با پسوند `.ttf` و با
  `format("truetype")` اعلام شده بود؛ به همین دلیل وزن Black که تمام `h1…h4` از آن استفاده
  می‌کنند بارگذاری نمی‌شد و تیترها به فونت متن برمی‌گشتند. فایل به
  `src/fonts/Kalameh-Black.woff2` تغییر نام داد و درست register شد.
- `Rokh-*.ttf` عملاً در طراحی استفاده نمی‌شد؛ در `src/fonts` مانده ولی register نشده (register
  کردن باعث preload بی‌دلیل در هر صفحه می‌شد). برای استفاده، یک entry به `src/app/fonts.ts`
  اضافه کنید.
- عکس پروفایل طراح با عکس واقعی جایگزین شد:
  - `public/images/aria-ghasemi.webp` — کراپ مربع ۵۱۲×۵۱۲ (پاپ‌آپ «طراحی: آریا قاسمی»)
  - `public/images/aria-ghasemi-portrait.webp` — پرتره ۷۶۰×۱۰۱ (کارت «سازنده این نمونه‌کار» در `/about`)

---

## ۶. ساختار

```
src/
  app/                روت‌ها (App Router) + layout + globals.css + fonts.ts + robots/sitemap/icon
  components/         header, footer, shop-view (کلاینت)، product-card، filters، checkout-client، …
  data/               کاتالوگ نمونه (محصولات، برندها، دسته‌ها، مقالات) — fallback بدون دیتابیس
  db/                 درایور pg + اسکیما (اختیاری؛ اگر DATABASE_URL نباشد هرچیز fallback می‌کند)
  lib/                store (دسترسی داده)، filters (منطق خالص فیلتر/جستجو)، utils، demo-store
  fonts/              فونت‌ها (TTF منبع + woff2 خروجی)
public/images/        تصاویر وب‌سایت (webp)
scripts/              pages-build.mjs (بیلد Pages)، build-fonts.mjs
```

نکته‌ی معماری: صفحات لیست، سمت سرور فقط داده‌ی خام را به یک کامپوننت کلاینت
(`ShopView`) می‌دهند و فیلتر در URL انجام می‌شود. برای اینکه HTMLِ پیش‌رند هم همان گرید واقعی
را داشته باشد (نه اسکلتون)، `Suspense` با fallback هم‌نام `ShopViewInitial` رندر می‌شود که
دقیقاً همان مارک‌آپ را با query خالی تولید می‌کند.

---

## ۷. عیب‌یابی سریع

| مشکل | راه‌حل |
| --- | --- |
| بیلد Pages خطای `output: export` می‌دهد | از `npm run build:pages` استفاده کنید (نه `next build` خالی)؛ این اسکریپت `/api` را پارک می‌کند |
| در لاگ Pages ردیف‌های `ƒ /api/...` دیده می‌شود | یعنی Pages دستور `npm run build` را اجرا کرده (حالت Node) و `out/` ساخته نشده. Build command را به `npm run build:pages` تغییر دهید. از این به بعد چنین بیلدی با پیام روشن شکست می‌خورد (نگهبان داخل `next.config.ts`) |
| سایت خالی یا ۴۰۴ می‌دهد درحالی‌که بیلد سبز است | Build output directory باید دقیقاً `out` باشد و Framework preset روی `None` |
| صفحه‌ای ۴۰۴ شد ولی لینکش داخل سایت کار می‌کند | مسیر داینامیک فقط برای slugهای موجود در `generateStaticParams` ساخته می‌شود؛ slug جدید را به دیتا اضافه کنید و دوباره بیلد بگیرید |
| فونت روی سرور اعمال نشده | `npm run fonts:build` را اجرا کنید تا woff2‌ها ساخته شوند |
| آدرس در sitemap/canonical غلط است | `NEXT_PUBLIC_SITE_URL` را در Pages ست و Redeploy بزنید |
| خواستم فرم‌ها واقعاً ذخیره شوند | روی Node deploy شوید (بخش ۴) |

محدودیت‌های Pages که برای این پروژه مهم‌اند: حداکثر 20000 فایل و 25MB برای هر فایل در هر دیپلوی (اکنون 1418 فایل و حدود 50MB خروجی `out/`) و 500 بیلد در ماه روی پلن رایگان.
