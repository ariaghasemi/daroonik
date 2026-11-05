import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header, type NavCategory } from "@/components/header";
import { Footer } from "@/components/footer";
import { DeveloperPopup } from "@/components/developer-popup";
import { getBrands, getCategoryTree } from "@/lib/store";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "دارونیک | داروخانه آنلاین و فروشگاه اینترنتی محصولات سلامت",
    template: "%s | دارونیک",
  },
  description:
    "خرید آنلاین مکمل ورزشی، ویتامین، محصولات مراقبت پوست و مو، بهداشت دهان و دندان، تجهیزات پزشکی و کالای مادر و کودک از داروخانه اینترنتی دارونیک با ارسال سریع و تضمین اصالت کالا.",
  keywords: [
    "داروخانه آنلاین",
    "خرید مکمل ورزشی",
    "ویتامین",
    "مراقبت پوست",
    "تجهیزات پزشکی",
    "فروشگاه اینترنتی سلامت",
  ],
  authors: [{ name: SITE.author, url: SITE.authorLink }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "دارونیک",
    title: "دارونیک | داروخانه آنلاین تخصصی سلامت",
    description:
      "فروشگاه اینترنتی تخصصی داروخانه؛ مکمل، ویتامین، مراقبت پوست و مو، تجهیزات پزشکی و مادر و کودک.",
    images: ["/images/hero-vitamins.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0fa47a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [tree, brands] = await Promise.all([getCategoryTree(), getBrands()]);
  const navTree: NavCategory[] = tree.map((t) => ({
    slug: t.slug,
    title: t.title,
    icon: t.icon,
    children: t.children.map((c) => ({ slug: c.slug, title: c.title, icon: c.icon })),
  }));

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "دارونیک",
    alternateName: "Darunik",
    url: SITE.url,
    description: "داروخانه آنلاین و فروشگاه اینترنتی محصولات سلامت (نمونه‌کار)",
    telephone: SITE.phone,
    email: SITE.email,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preload" href="/daroonik/fonts/Dana-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/daroonik/fonts/Kalameh-Black.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          رفتن به محتوای اصلی
        </a>
        <CartProvider>
          <Header tree={navTree} brands={brands.map((b) => ({ slug: b.slug, name: b.name }))} />
          <main id="main">{children}</main>
          <Footer />
          <DeveloperPopup />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
