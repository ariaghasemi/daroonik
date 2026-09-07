/**
 * Demo persistence for the write-side of the storefront (contact form, newsletter, orders).
 *
 * With a Postgres + Node deployment these requests hit `/api/*` and are stored in the
 * database. On a static host (Cloudflare Pages export) there is no server, so the very same
 * flows fall back to `localStorage`: the demo stays fully clickable — you can order, pay,
 * and follow the order in the account panel — without inventing a backend nobody asked for.
 */

export type DemoOrderItem = { slug: string; name: string; image: string; price: number; qty: number };

export type DemoOrder = {
  code: string;
  createdAt: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  shippingMethod: string;
  paymentMethod: string;
  note?: string;
  items: DemoOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
};

export type DemoMessage = {
  kind: "contact" | "newsletter";
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  body?: string;
  at: string;
};

const ORDERS_KEY = "darunik.demo.orders";
const MESSAGES_KEY = "darunik.demo.messages";

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function readList<T>(key: string): T[] {
  const store = safeStorage();
  if (!store) return [];
  try {
    const raw = store.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, rows: T[]) {
  const store = safeStorage();
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(rows.slice(-50)));
  } catch {
    /* storage full / private mode — the demo keeps working, it just does not persist */
  }
}

export function makeDemoCode(): string {
  return `DRN-${Math.floor(100000 + Math.random() * 899999)}`;
}

export function saveDemoOrder(order: DemoOrder) {
  writeList(ORDERS_KEY, [...readList<DemoOrder>(ORDERS_KEY), order]);
}

export function listDemoOrders(): DemoOrder[] {
  return readList<DemoOrder>(ORDERS_KEY).slice().reverse();
}

export function saveDemoMessage(message: DemoMessage) {
  writeList(MESSAGES_KEY, [...readList<DemoMessage>(MESSAGES_KEY), message]);
}

export function listDemoMessages(): DemoMessage[] {
  return readList<DemoMessage>(MESSAGES_KEY).slice().reverse();
}

export function clearDemoData() {
  const store = safeStorage();
  store?.removeItem(ORDERS_KEY);
  store?.removeItem(MESSAGES_KEY);
}

type ApiOrder = Omit<Partial<DemoOrder>, "createdAt"> & { createdAt?: string | Date };

function normalize(o: ApiOrder, index: number): DemoOrder {
  const createdAt =
    o.createdAt instanceof Date ? o.createdAt.toISOString() : (o.createdAt ?? new Date().toISOString());
  return {
    code: o.code ?? `DRN-0000${index}`,
    createdAt,
    fullName: o.fullName ?? "",
    phone: o.phone ?? "",
    province: o.province ?? "",
    city: o.city ?? "",
    address: o.address ?? "",
    postalCode: o.postalCode,
    shippingMethod: o.shippingMethod ?? "پست پیشتاز",
    paymentMethod: o.paymentMethod ?? "پرداخت اینترنتی",
    note: o.note,
    items: Array.isArray(o.items) ? o.items : [],
    subtotal: Number(o.subtotal ?? 0),
    discount: Number(o.discount ?? 0),
    shipping: Number(o.shipping ?? 0),
    total: Number(o.total ?? 0),
    status: o.status ?? "در حال پردازش",
  };
}

/**
 * Local demo orders + (when the deployment has one) the real `/api/orders` rows,
 * de-duplicated by order code.
 */
export async function loadOrders(): Promise<{ orders: DemoOrder[]; hasServer: boolean }> {
  const local = listDemoOrders();
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) return { orders: local, hasServer: false };
    const data = (await res.json()) as { orders?: ApiOrder[] };
    const merged = new Map<string, DemoOrder>();
    (data.orders ?? []).forEach((o, i) => {
      const row = normalize(o, i);
      merged.set(row.code, row);
    });
    for (const o of local) if (!merged.has(o.code)) merged.set(o.code, o);
    return { orders: [...merged.values()].reverse(), hasServer: true };
  } catch {
    return { orders: local, hasServer: false };
  }
}

/** Posts a payload and reports whether a real backend accepted it. */
export async function postJson(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; served: boolean; data?: Record<string, unknown> }> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false, served: false };
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: true, served: true, data };
  } catch {
    return { ok: false, served: false };
  }
}
