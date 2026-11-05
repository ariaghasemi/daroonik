"use client";

import { useState } from "react";
import { toEnglishDigits } from "@/lib/utils";

export function NewsletterForm() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^09\d{9}$/.test(toEnglishDigits(value))) {
      setState("error");
      return;
    }
    setState("done");
    setValue("");
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <p className="mb-2 text-[11px] text-white/75">فرم خبرنامه نمایشی است و اطلاعاتی ارسال نمی‌شود.</p>
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
        {state === "done" && "این فرم نمایشی است؛ عضویتی ثبت یا پیامی ارسال نمی‌شود."}
        {state === "error" && "شماره موبایل معتبر نیست."}
      </p>
    </form>
  );
}
