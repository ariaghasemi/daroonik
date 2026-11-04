import { Suspense } from "react";
import type { Metadata } from "next";
import { SuccessView } from "@/components/success-view";

export const metadata: Metadata = {
  title: "ثبت سفارش موفق",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-10">
          <div className="skeleton mx-auto h-80 max-w-2xl rounded-2xl" />
        </div>
      }
    >
      <SuccessView />
    </Suspense>
  );
}
