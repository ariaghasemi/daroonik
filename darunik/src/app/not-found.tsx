import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-16">
      <div className="card mx-auto max-w-lg p-10 text-center">
        <p className="num text-[56px] font-black text-brand-500">۴۰۴</p>
        <h1 className="mt-2 text-[20px]">صفحه موردنظر پیدا نشد</h1>
        <p className="mt-2 text-[13px] leading-8 text-ink-500">
          ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه حذف شده باشد. می‌توانید از فروشگاه یا جستجو ادامه دهید.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link href="/" className="btn btn-primary">صفحه اصلی</Link>
          <Link href="/shop" className="btn btn-ghost">فروشگاه</Link>
        </div>
      </div>
    </div>
  );
}
