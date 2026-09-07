"use client";

import { useState } from "react";
import { postJson, saveDemoMessage } from "@/lib/demo-store";

export function NewsletterForm() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^09\d{9}$/.test(value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))))) {
      setState("error");
      return;
    }
    setState("loading");
    const res = await postJson("/api/newsletter", { phone: value });
    if (!res.served) saveDemoMessage({ kind: "newsletter", name: "", phone: value, at: new Date().toISOString() });
    setState("done");
    setValue("");
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setState("idle");
          }}
          inputMode="tel"
          aria-label="شماره موبایل برای عضویت در خبرنامه"
          placeholder="شماره موبایل (مثال: ۰۹۱۲۰۰۰۰۰۰۰)"
          className="field num h-11 bg-white/95"
        />
        <button type="submit" disabled={state === "loading"} className="btn btn-primary h-11 shrink-0">
          {state === "loading" ? "در حال ثبت..." : "عضویت"}
        </button>
      </div>
      <p
        className="mt-2 min-h-5 text-[11px] font-bold"
        role="status"
        style={{ color: state === "error" ? "#ffb4b1" : "#a5e8d0" }}
      >
        {state === "done" && "عضویت شما ثبت شد. تخفیف‌های هفتگی برایتان ارسال می‌شود."}
        {state === "error" && "شماره موبایل معتبر نیست."}
      </p>
    </form>
  );
}
