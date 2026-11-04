import { Suspense } from "react";
import type { Metadata } from "next";
import { OrdersView } from "@/components/orders-client";

export const metadata: Metadata = { title: "سفارش‌های من", robots: { index: false, follow: false } };

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-3">
          <div className="skeleton h-7 w-52 rounded-lg" />
          <div className="skeleton h-40 rounded-2xl" />
        </div>
      }
    >
      <OrdersView />
    </Suspense>
  );
}
