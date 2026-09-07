"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Filter as FilterIcon, Star } from "@/components/icons";
import { cx, formatPrice, toFa } from "@/lib/utils";

export type FilterBrand = { slug: string; name: string; count: number };

const SORTS: { id: string; title: string }[] = [
  { id: "popular", title: "پرفروش‌ترین" },
  { id: "newest", title: "جدیدترین" },
  { id: "cheap", title: "ارزان‌ترین" },
  { id: "expensive", title: "گران‌ترین" },
  { id: "rating", title: "بیشترین امتیاز" },
  { id: "discount", title: "بیشترین تخفیف" },
];

export function SortBar({
  total,
  defaultSort = "popular",
  query,
}: {
  total: number;
  defaultSort?: string;
  /** Current listing query, handed down by the listing view (see shop-view.tsx for why). */
  query: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const current = query.sort ?? defaultSort;

  function setSort(id: string) {
    const next = new URLSearchParams(query);
    next.set("sort", id);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="card mb-3 flex flex-wrap items-center gap-2 p-3">
      <span className="ml-1 text-[12px] font-bold text-ink-500">مرتب‌سازی:</span>
      <div className="rail flex flex-1 gap-2 overflow-x-auto">
        {SORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSort(s.id)}
            className={cx("chip shrink-0", current === s.id && "chip-active")}
            aria-pressed={current === s.id}
          >
            {s.title}
          </button>
        ))}
      </div>
      <span className="num hidden shrink-0 text-[12px] text-ink-500 md:block">{toFa(total)} کالا</span>
    </div>
  );
}

export function FiltersPanel({
  brands,
  maxPrice,
  query,
}: {
  brands: FilterBrand[];
  maxPrice: number;
  query: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const selectedBrands = (query.brands ?? "").split(",").filter(Boolean);
  const min = Number(query.min ?? 0);
  const max = Number(query.max ?? maxPrice);
  const rating = Number(query.rating ?? 0);
  const available = query.available === "1";
  const discount = query.discount === "1";

  function update(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(query);
    mutate(next);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  // Keeps the search phrase (if any) and drops every filter.
  function clearAll() {
    const q = query.q;
    router.push(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false });
  }

  function toggleBrand(slug: string) {
    const set = new Set(selectedBrands);
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    update((p) => (set.size ? p.set("brands", [...set].join(",")) : p.delete("brands")));
  }

  const activeCount =
    selectedBrands.length + (rating ? 1 : 0) + (available ? 1 : 0) + (discount ? 1 : 0) + (min > 0 || max < maxPrice ? 1 : 0);

  const body = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px]">فیلترها</h2>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[12px] font-bold text-sale-500"
          >
            حذف همه ({toFa(activeCount)})
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 text-[13px] font-bold">وضعیت کالا</legend>
        <label className="mb-2 flex cursor-pointer items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => update((p) => (e.target.checked ? p.set("available", "1") : p.delete("available")))}
            className="h-4 w-4 accent-[var(--color-brand-500)]"
          />
          فقط کالاهای موجود
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={discount}
            onChange={(e) => update((p) => (e.target.checked ? p.set("discount", "1") : p.delete("discount")))}
            className="h-4 w-4 accent-[var(--color-sale-500)]"
          />
          فقط کالاهای تخفیف‌دار
        </label>
      </fieldset>

      <fieldset className="border-t border-line pt-4">
        <legend className="mb-2 text-[13px] font-bold">برند</legend>
        <div className="max-h-56 space-y-2 overflow-y-auto pl-1">
          {brands.map((b) => (
            <label key={b.slug} className="flex cursor-pointer items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
                className="h-4 w-4 accent-[var(--color-brand-500)]"
              />
              <span className="flex-1">{b.name}</span>
              <span className="num text-[11px] text-ink-300">{toFa(b.count)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-4">
        <legend className="mb-2 text-[13px] font-bold">محدوده قیمت (تومان)</legend>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={50000}
          value={max}
          onChange={(e) => update((p) => p.set("max", e.target.value))}
          className="w-full accent-[var(--color-brand-500)]"
          aria-label="حداکثر قیمت"
        />
        <div className="mt-2 flex items-center justify-between text-[12px] font-bold text-ink-500">
          <span className="num">از {formatPrice(min)}</span>
          <span className="num">تا {formatPrice(max)}</span>
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-4">
        <legend className="mb-2 text-[13px] font-bold">امتیاز کاربران</legend>
        <div className="flex flex-wrap gap-2">
          {[4.5, 4, 3.5].map((r) => (
            <button
              key={r}
              onClick={() => update((p) => (rating === r ? p.delete("rating") : p.set("rating", String(r))))}
              className={cx("chip num gap-1", rating === r && "chip-active")}
            >
              <Star size={12} className={rating === r ? "text-white" : "text-gold-400"} />
              {toFa(r)} به بالا
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );

  return (
    <>
      <aside className="card sticky top-[92px] hidden max-h-[calc(100vh-110px)] overflow-y-auto p-4 lg:block">{body}</aside>
      <div className="lg:hidden">
        <button onClick={() => setOpen(true)} className="btn btn-ghost w-full justify-center gap-2">
          <FilterIcon size={16} />
          فیلترها {activeCount > 0 && <span className="num badge bg-brand-50 text-brand-700">{toFa(activeCount)}</span>}
        </button>
        {open && (
          <div className="fixed inset-0 z-[88]">
            <div className="absolute inset-0 bg-ink-900/45" onClick={() => setOpen(false)} />
            <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4">
              {body}
              <button onClick={() => setOpen(false)} className="btn btn-primary mt-5 w-full justify-center">
                نمایش نتایج
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
