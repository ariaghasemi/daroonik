import type { Metadata } from "next";
import { AddressBook } from "@/components/account-client";

export const metadata: Metadata = { title: "آدرس‌های من", robots: { index: false, follow: false } };

export default function AddressesPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">آدرس‌های من</h1>
      <p className="text-[12.5px] text-ink-500">آدرس‌ها نمایشی هستند؛ تغییرات فقط تا باز بودن این صفحه باقی می‌مانند. از اطلاعات ساختگی استفاده کنید.</p>
      <AddressBook />
    </div>
  );
}
