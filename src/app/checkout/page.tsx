import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";
import { PROVINCES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description: "تکمیل اطلاعات ارسال و پرداخت سفارش در فروشگاه اینترنتی دارونیک.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient provinces={PROVINCES} />;
}
