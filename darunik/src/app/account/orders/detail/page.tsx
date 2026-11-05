import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoOrderDetail } from "@/components/demo-order-detail";
export const metadata: Metadata = { title: "جزئیات سفارش آزمایشی", robots: { index: false, follow: false } };
export default function OrderDetailPage() { return <Suspense fallback={<div className="skeleton h-56 rounded-2xl" />}><DemoOrderDetail /></Suspense>; }
