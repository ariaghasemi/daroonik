"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { ProductGrid, type CardProduct } from "@/components/product-card";
import { Cart, Compare, Heart, Package, Trash } from "@/components/icons";
import { EmptyState, Stars } from "@/components/ui";
import { formatPrice, toFa } from "@/lib/utils";

export function DashboardStats({ ordersCount }: { ordersCount: number }) {
  const { count, wishlist, compare, subtotal } = useCart();
  const stats = [
    { title: "سفارش‌های ثبت‌شده", value: toFa(ordersCount), href: "/account/orders", Ico: Package },
    { title: "کالاهای سبد خرید", value: toFa(count), href: "/cart", Ico: Cart },
    { title: "علاقه‌مندی‌ها", value: toFa(wishlist.length), href: "/account/wishlist", Ico: Heart },
    { title: "لیست مقایسه", value: toFa(compare.length), href: "/account/compare", Ico: Compare },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.title} href={s.href} className="card p-4 transition hover:shadow-[var(--shadow-pop)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <s.Ico size={20} strokeWidth={1.5} />
            </span>
            <p className="num mt-2 text-[22px] font-black">{s.value}</p>
            <p className="text-[12px] text-ink-500">{s.title}</p>
          </Link>
        ))}
      </div>
      {subtotal > 0 && (
        <p className="card mt-3 p-4 text-[13px]">
          مبلغ سبد خرید فعلی شما <span className="num font-black text-brand-700">{formatPrice(subtotal)}</span> تومان
          است.{" "}
          <Link href="/checkout" className="font-bold text-brand-600">
            تکمیل خرید
          </Link>
        </p>
      )}
    </>
  );
}

export function WishlistView({ products }: { products: CardProduct[] }) {
  const { wishlist, ready } = useCart();
  if (!ready) return <div className="skeleton h-56 rounded-2xl" />;
  const items = products.filter((p) => wishlist.includes(p.slug));
  if (items.length === 0)
    return (
      <EmptyState
        title="لیست علاقه‌مندی‌ها خالی است"
        desc="با زدن آیکون قلب روی کارت هر محصول، آن را برای بررسی بعدی ذخیره کنید."
        action={
          <Link href="/shop" className="btn btn-primary">
            مشاهده محصولات
          </Link>
        }
      />
    );
  return <ProductGrid items={items} />;
}

export function CompareView({ products }: { products: (CardProduct & { specs: { label: string; value: string }[]; brand: string })[] }) {
  const { compare, ready, toggleCompare } = useCart();
  if (!ready) return <div className="skeleton h-56 rounded-2xl" />;
  const items = products.filter((p) => compare.includes(p.slug));
  if (items.length === 0)
    return (
      <EmptyState
        title="لیست مقایسه خالی است"
        desc="برای مقایسه، از دکمه مقایسه روی کارت محصولات استفاده کنید. حداکثر ۴ کالا هم‌زمان قابل مقایسه هستند."
        action={
          <Link href="/shop" className="btn btn-primary">
            انتخاب محصول
          </Link>
        }
      />
    );

  const labels = Array.from(new Set(items.flatMap((i) => i.specs.map((s) => s.label))));

  return (
    <div className="card overflow-x-auto p-4">
      <table className="w-full min-w-[640px] text-[12.5px]">
        <thead>
          <tr>
            <th className="w-32 text-right" />
            {items.map((p) => (
              <th key={p.slug} className="p-2 text-center align-top">
                <Image src={p.image} alt={p.name} width={90} height={90} className="mx-auto h-[90px] w-[90px] object-contain" />
                <Link href={`/product/${p.slug}`} className="mt-2 block text-[12.5px] font-bold hover:text-brand-600">
                  {p.name}
                </Link>
                <button onClick={() => toggleCompare(p.slug)} className="mx-auto mt-1 flex items-center gap-1 text-[11px] font-bold text-sale-500">
                  <Trash size={13} />
                  حذف
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-surface">
            <th scope="row" className="p-2 text-right text-ink-500">قیمت</th>
            {items.map((p) => (
              <td key={p.slug} className="num p-2 text-center font-black">{formatPrice(p.price)}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="p-2 text-right text-ink-500">برند</th>
            {items.map((p) => (
              <td key={p.slug} className="p-2 text-center font-bold">{p.brand}</td>
            ))}
          </tr>
          <tr className="bg-surface">
            <th scope="row" className="p-2 text-right text-ink-500">امتیاز</th>
            {items.map((p) => (
              <td key={p.slug} className="p-2 text-center">
                <span className="flex justify-center"><Stars value={p.rating} /></span>
              </td>
            ))}
          </tr>
          {labels.map((label, i) => (
            <tr key={label} className={i % 2 ? "bg-surface" : ""}>
              <th scope="row" className="p-2 text-right text-ink-500">{label}</th>
              {items.map((p) => (
                <td key={p.slug} className="p-2 text-center">
                  {p.specs.find((s) => s.label === label)?.value ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DEMO_ADDRESSES = [
  {
    id: 1,
    title: "خانه",
    receiver: "کاربر نمونه دارونیک",
    phone: "۰۰۰۰۰۰۰۰۰۰۰",
    text: "تهران، منطقه نمونه، خیابان نمونه، پلاک ۰، واحد ۰",
  },
  {
    id: 2,
    title: "محل کار",
    receiver: "کاربر نمونه دارونیک",
    phone: "۰۰۰۰۰۰۰۰۰۰۰",
    text: "تهران، بلوار نمونه، ساختمان دمو، طبقه ۰",
  },
];

export function AddressBook() {
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [form, setForm] = useState({ title: "", text: "" });

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {addresses.map((a) => (
          <article key={a.id} className="card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px]">{a.title}</h3>
              <button
                onClick={() => setAddresses((prev) => prev.filter((x) => x.id !== a.id))}
                className="flex items-center gap-1 text-[12px] font-bold text-sale-500"
              >
                <Trash size={14} />
                حذف
              </button>
            </div>
            <p className="mt-2 text-[12.5px] leading-7 text-ink-500">{a.text}</p>
            <p className="num mt-2 text-[12px] text-ink-300">
              {a.receiver} · {a.phone}
            </p>
          </article>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.title || form.text.length < 10) return;
          setAddresses((prev) => [
            ...prev,
            { id: Date.now(), title: form.title, receiver: "کاربر نمونه دارونیک", phone: "۰۰۰۰۰۰۰۰۰۰۰", text: form.text },
          ]);
          setForm({ title: "", text: "" });
        }}
        className="card grid gap-3 p-4 md:grid-cols-[200px_1fr_auto] md:items-end"
      >
        <div>
          <label className="label" htmlFor="addr-title">عنوان آدرس</label>
          <input id="addr-title" className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="addr-text">نشانی</label>
          <input id="addr-text" className="field" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
        </div>
        <button className="btn btn-primary">افزودن آدرس</button>
      </form>
    </div>
  );
}

export function ProfileForm() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="card grid gap-3 p-4 md:grid-cols-2"
    >
      <div>
        <label className="label" htmlFor="p-name">نام و نام خانوادگی</label>
        <input id="p-name" className="field" defaultValue="کاربر نمونه دارونیک" />
      </div>
      <div>
        <label className="label" htmlFor="p-phone">شماره موبایل</label>
        <input id="p-phone" className="field num" defaultValue="۰۰۰۰۰۰۰۰۰۰۰" readOnly />
      </div>
      <div>
        <label className="label" htmlFor="p-email">ایمیل</label>
        <input id="p-email" className="field" defaultValue="user@darunik.demo" />
      </div>
      <div>
        <label className="label" htmlFor="p-birth">تاریخ تولد</label>
        <input id="p-birth" className="field num" defaultValue="۱۳۷۰/۰۱/۰۱" />
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button className="btn btn-primary">ذخیره تغییرات</button>
        {saved && <span className="text-[12px] font-bold text-brand-600">تغییرات ذخیره شد (نمونه).</span>}
      </div>
    </form>
  );
}
