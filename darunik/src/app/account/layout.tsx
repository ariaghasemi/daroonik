import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui";
import { Compare, Heart, Home, Logout, MapPin, Package, User } from "@/components/icons";

const NAV: { href: string; title: string; Ico: (p: { size?: number; className?: string }) => ReactElement }[] = [
  { href: "/account", title: "داشبورد", Ico: Home },
  { href: "/account/orders", title: "سفارش‌های من", Ico: Package },
  { href: "/account/addresses", title: "آدرس‌ها", Ico: MapPin },
  { href: "/account/profile", title: "اطلاعات حساب", Ico: User },
  { href: "/account/wishlist", title: "علاقه‌مندی‌ها", Ico: Heart },
  { href: "/account/compare", title: "لیست مقایسه", Ico: Compare },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-x py-4">
      <Breadcrumbs items={[{ title: "حساب کاربری" }]} />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="card h-fit p-3 lg:sticky lg:top-[92px]">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface p-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <User size={20} />
            </span>
            <span>
              <span className="block text-[13px] font-bold">کاربر نمونه دارونیک</span>
              <span className="num block text-[11px] text-ink-300">۰۰۰۰۰۰۰۰۰۰۰</span>
            </span>
          </div>
          <nav>
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:block lg:space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-w-0 items-center gap-2 rounded-xl px-2 py-2.5 text-[12px] font-bold text-ink-700 lg:gap-2.5 lg:px-3 lg:text-[13px] transition hover:bg-surface hover:text-brand-600"
                  >
                    <item.Ico size={18} />
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-bold text-sale-500 hover:bg-surface">
                  <Logout size={18} />
                  خروج از حساب
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
