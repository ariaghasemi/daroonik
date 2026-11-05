import type { Metadata } from "next";
import { CartClient } from "@/components/cart-client";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "مشاهده و ویرایش سبد خرید فروشگاه اینترنتی دارونیک؛ اعمال کد تخفیف و ادامه فرایند تسویه حساب.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
