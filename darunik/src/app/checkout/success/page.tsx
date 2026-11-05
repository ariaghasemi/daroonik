import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoSuccess } from "@/components/demo-success";
export const metadata: Metadata = { title: "سفارش آزمایشی", robots: { index: false, follow: false } };
export default function SuccessPage() { return <Suspense fallback={<div className="container-x py-8"><div className="skeleton h-56 rounded-2xl" /></div>}><DemoSuccess /></Suspense>; }
