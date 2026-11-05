"use client";

import { useMemo, useSyncExternalStore } from "react";

export type DemoOrder = {
  id: number;
  code: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  note: string;
  shippingMethod: string;
  paymentMethod: string;
  items: { slug: string; name: string; image: string; price: number; qty: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
};

type NewDemoOrder = Omit<DemoOrder, "id" | "code" | "status" | "createdAt">;
const KEY = "darunik.demo.orders.v1";
const EVENT = "darunik:demo-orders-changed";
const EMPTY = "[]";

function snapshot() {
  try { return window.localStorage.getItem(KEY) ?? EMPTY; } catch { return EMPTY; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}
function parse(raw: string): DemoOrder[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? (value as DemoOrder[]) : [];
  } catch { return []; }
}

export function useDemoOrders() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  return useMemo(() => parse(raw), [raw]);
}

export function createDemoOrder(input: NewDemoOrder): DemoOrder {
  const id = Date.now();
  const order: DemoOrder = {
    ...input,
    id,
    code: `DRN-${id.toString(36).toUpperCase()}`,
    status: "سفارش آزمایشی",
    createdAt: new Date(id).toISOString(),
  };
  // Save locally only. If storage is unavailable, throw instead of reporting success.
  window.localStorage.setItem(KEY, JSON.stringify([...parse(snapshot()), order].slice(-50)));
  window.dispatchEvent(new Event(EVENT));
  return order;
}
