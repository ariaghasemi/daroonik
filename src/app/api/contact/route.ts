import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.body) {
    return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
  }
  await saveMessage({
    kind: "contact",
    name: String(body.name).slice(0, 120),
    phone: String(body.phone ?? "").slice(0, 24),
    email: String(body.email ?? "").slice(0, 120),
    subject: String(body.subject ?? "").slice(0, 160),
    body: String(body.body).slice(0, 4000),
  });
  return NextResponse.json({ ok: true });
}
