import type { Metadata } from "next";
import { ProfileForm } from "@/components/account-client";

export const metadata: Metadata = { title: "اطلاعات حساب", robots: { index: false, follow: false } };

export default function ProfilePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-[18px]">اطلاعات حساب کاربری</h1>
      <ProfileForm />
    </div>
  );
}
