"use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", body: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 3 || form.body.trim().length < 10) {
      setState("error");
      return;
    }
    setState("done");
    setForm({ name: "", phone: "", email: "", subject: "", body: "" });
  }

  return (
    <form onSubmit={submit} className="card grid gap-3 p-5 md:grid-cols-2">
      <div>
        <label className="label" htmlFor="c-name">نام و نام خانوادگی</label>
        <input id="c-name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="c-phone">شماره تماس</label>
        <input id="c-phone" className="field num" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="c-email">ایمیل (اختیاری)</label>
        <input id="c-email" type="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="c-subject">موضوع</label>
        <select id="c-subject" className="field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
          <option value="">انتخاب کنید</option>
          <option>پیگیری سفارش</option>
          <option>مشاوره خرید محصول</option>
          <option>انتقاد و پیشنهاد</option>
          <option>همکاری و تأمین کالا</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label" htmlFor="c-body">متن پیام</label>
        <textarea id="c-body" rows={5} className="field" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button className="btn btn-primary" disabled={state === "loading"}>
          {state === "loading" ? "در حال ارسال..." : "ارسال پیام"}
        </button>
        {state === "done" && <span className="text-[12px] font-bold text-brand-600">این فرم نمایشی است و پیامی ارسال یا ذخیره نمی‌شود.</span>}
        {state === "error" && <span className="text-[12px] font-bold text-sale-500">لطفاً نام و متن پیام را کامل وارد کنید.</span>}
      </div>
    </form>
  );
}
