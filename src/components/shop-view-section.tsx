import { Suspense } from "react";
import { ShopView, ShopViewInitial, type ShopViewProps } from "@/components/shop-view";

/**
 * Renders a listing page as: prerendered default grid → replaced on hydration by the
 * URL-driven interactive grid. Both share the same markup, so nothing shifts or flashes.
 */
export function ShopViewSection(props: ShopViewProps) {
  return (
    <Suspense fallback={<ShopViewInitial {...props} />}>
      <ShopView {...props} />
    </Suspense>
  );
}
