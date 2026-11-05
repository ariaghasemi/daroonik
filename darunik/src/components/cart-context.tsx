"use client";

import Image from "@/components/site-image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Cart as CartIcon, Close, Minus, Plus } from "@/components/icons";
import { formatPrice, toFa, cx, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export type CartLine = {
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  qty: number;
  brand: string;
  variant?: string;
  stock: number;
};

type Ctx = {
  lines: CartLine[];
  wishlist: string[];
  compare: string[];
  ready: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  count: number;
  subtotal: number;
  savings: number;
  toast: (msg: string) => void;
};

const CartContext = createContext<Ctx | null>(null);

const LS = { cart: "darunik.cart", wish: "darunik.wishlist", cmp: "darunik.compare" };

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    // Read browser-only storage after hydration; the server cannot access it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(read<CartLine[]>(LS.cart, []));
    setWishlist(read<string[]>(LS.wish, []));
    setCompare(read<string[]>(LS.cmp, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(LS.cart, JSON.stringify(lines));
  }, [lines, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem(LS.wish, JSON.stringify(wishlist));
  }, [wishlist, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem(LS.cmp, JSON.stringify(compare));
  }, [compare, ready]);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setMessages((m) => [...m, { id, text }]);
    setTimeout(() => setMessages((m) => m.filter((x) => x.id !== id)), 2600);
  }, []);

  const add: Ctx["add"] = useCallback(
    (line, qty = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === line.slug && l.variant === line.variant);
        if (existing) {
          return prev.map((l) =>
            l === existing ? { ...l, qty: Math.min(l.qty + qty, l.stock || 99) } : l,
          );
        }
        return [...prev, { ...line, qty }];
      });
      setDrawerOpen(true);
    },
    [],
  );

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, l.stock || 99) } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const toggleWish = useCallback(
    (slug: string) => {
      setWishlist((prev) => {
        const has = prev.includes(slug);
        toast(has ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
        return has ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [toast],
  );

  const toggleCompare = useCallback(
    (slug: string) => {
      setCompare((prev) => {
        const has = prev.includes(slug);
        if (!has && prev.length >= 4) {
          toast("حداکثر ۴ کالا قابل مقایسه است");
          return prev;
        }
        toast(has ? "از لیست مقایسه حذف شد" : "به لیست مقایسه اضافه شد");
        return has ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [toast],
  );

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const savings = lines.reduce((s, l) => s + ((l.oldPrice ?? l.price) - l.price) * l.qty, 0);

  const value = useMemo(
    () => ({
      lines,
      wishlist,
      compare,
      ready,
      drawerOpen,
      setDrawerOpen,
      add,
      remove,
      setQty,
      clear,
      toggleWish,
      toggleCompare,
      count,
      subtotal,
      savings,
      toast,
    }),
    [lines, wishlist, compare, ready, drawerOpen, add, remove, setQty, clear, toggleWish, toggleCompare, count, subtotal, savings, toast],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <MiniCart />
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex -translate-x-1/2 flex-col items-center gap-2">
        {messages.map((m) => (
          <div
            key={m.id}
            role="status"
            className="animate-pop rounded-xl bg-ink-900/92 px-4 py-2 text-[13px] font-bold text-white shadow-lg"
          >
            {m.text}
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function MiniCart() {
  const { lines, drawerOpen, setDrawerOpen, subtotal, setQty, remove } = useCart();
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawerOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      className={cx("fixed inset-0 z-[95]", drawerOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={() => setDrawerOpen(false)}
        className={cx(
          "absolute inset-0 bg-ink-900/40 transition-opacity",
          drawerOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="سبد خرید"
        className={cx(
          "absolute inset-y-0 left-0 flex w-[92vw] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="text-[15px]">سبد خرید شما</h2>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-ghost px-2.5 py-2" aria-label="بستن سبد خرید">
            <Close size={16} />
          </button>
        </header>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <CartIcon size={30} strokeWidth={1.5} />
            </span>
            <p className="text-[14px] font-bold">سبد خرید خالی است</p>
            <p className="text-[12px] text-ink-500">محصولات موردنیاز خود را از فروشگاه انتخاب کنید.</p>
            <Link href="/shop" onClick={() => setDrawerOpen(false)} className="btn btn-primary">
              رفتن به فروشگاه
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {remaining > 0 && (
                <p className="rounded-xl bg-brand-50 px-3 py-2 text-[12px] font-bold text-brand-700">
                  تا ارسال رایگان {formatPrice(remaining)} تومان مانده است
                </p>
              )}
              {lines.map((l) => (
                <div key={l.slug + (l.variant ?? "")} className="flex gap-3 rounded-xl border border-line p-2">
                  <Image src={l.image} alt={l.name} width={64} height={64} className="h-16 w-16 rounded-lg object-contain" />
                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      href={`/product/${l.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="line-clamp-2 text-[12px] font-bold leading-6 hover:text-brand-600"
                    >
                      {l.name}
                    </Link>
                    {l.variant && <span className="text-[11px] text-ink-500">{l.variant}</span>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-line px-2 py-1">
                        <button onClick={() => setQty(l.slug, l.qty + 1)} aria-label="افزایش" className="text-brand-600">
                          <Plus size={14} strokeWidth={2} />
                        </button>
                        <span className="num w-5 text-center text-[12px] font-bold">{toFa(l.qty)}</span>
                        <button
                          onClick={() => (l.qty === 1 ? remove(l.slug) : setQty(l.slug, l.qty - 1))}
                          aria-label="کاهش"
                          className="text-ink-500"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <span className="num text-[13px] font-black">{formatPrice(l.price * l.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <footer className="space-y-3 border-t border-line p-4">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-ink-500">مبلغ کل</span>
                <span className="num text-[16px] font-black">{formatPrice(subtotal)} تومان</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={() => setDrawerOpen(false)} className="btn btn-ghost justify-center">
                  مشاهده سبد
                </Link>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="btn btn-primary justify-center">
                  تسویه حساب
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
