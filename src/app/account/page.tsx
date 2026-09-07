import type { Metadata } from "next";
import { AccountActivity } from "@/components/orders-client";

export const metadata: Metadata = { title: "داشبورد حساب کاربری", robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h1 className="text-[18px]">سلام، خوش آمدید</h1>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          این پنل کاربری نمونه است و برای نمایش ساختار حساب کاربری یک فروشگاه ووکامرسی طراحی شده است. از منوی کناری
          می‌توانید سفارش‌ها، آدرس‌ها، علاقه‌مندی‌ها و لیست مقایسه را ببینید.
        </p>
      </div>
      <AccountActivity />
    </div>
  );
}
