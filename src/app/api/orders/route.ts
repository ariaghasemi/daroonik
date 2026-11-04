import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ orders: await listOrders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.items?.length) {
      return NextResponse.json({ error: "سبد خرید خالی است" }, { status: 400 });
    }
    const order = await createOrder({
      fullName: String(body.fullName ?? "").slice(0, 120),
      phone: String(body.phone ?? "").slice(0, 24),
      province: String(body.province ?? "").slice(0, 60),
      city: String(body.city ?? "").slice(0, 60),
      address: String(body.address ?? ""),
      postalCode: String(body.postalCode ?? "").slice(0, 20),
      shippingMethod: String(body.shippingMethod ?? "پست پیشتاز").slice(0, 40),
      paymentMethod: String(body.paymentMethod ?? "پرداخت اینترنتی").slice(0, 40),
      note: String(body.note ?? ""),
      items: body.items,
      subtotal: Number(body.subtotal ?? 0),
      discount: Number(body.discount ?? 0),
      shipping: Number(body.shipping ?? 0),
      total: Number(body.total ?? 0),
      status: "در حال پردازش",
    });
    return NextResponse.json({ code: order.code, id: order.id });
  } catch {
    return NextResponse.json({ error: "خطا در ثبت سفارش" }, { status: 500 });
  }
}
