import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  await saveMessage({ kind: "newsletter", phone: String(body?.phone ?? "").slice(0, 24) });
  return NextResponse.json({ ok: true });
}
