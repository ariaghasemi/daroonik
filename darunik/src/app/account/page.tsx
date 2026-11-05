import type { Metadata } from "next";
import { DemoAccount } from "@/components/demo-account";
export const metadata: Metadata = { title: "داشبورد حساب کاربری", robots: { index: false, follow: false } };
export default function AccountPage() { return <DemoAccount />; }
