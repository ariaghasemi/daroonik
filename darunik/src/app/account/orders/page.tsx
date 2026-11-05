import type { Metadata } from "next";
import { DemoOrdersList } from "@/components/demo-orders-list";
export const metadata: Metadata = { title: "سفارش‌های من", robots: { index: false, follow: false } };
export default function OrdersPage() { return <DemoOrdersList />; }
