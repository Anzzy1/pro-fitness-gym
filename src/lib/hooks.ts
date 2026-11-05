"use client";

import { useSyncExternalStore } from "react";
import { manilaNow, promoStatus, type PromoStatus } from "./time";

/* Time-based values are computed in the browser (the page is pre-rendered at build time),
   so the server snapshot is a neutral value and the real one is applied right after hydration. */

const OFF: PromoStatus = { on: false };
let promoCache: PromoStatus | null = null;
const noopSubscribe = () => () => {};

/** Promo state for today (Philippine time). */
export function usePromo(): PromoStatus {
  return useSyncExternalStore(
    noopSubscribe,
    () => (promoCache ??= promoStatus()),
    () => OFF,
  );
}

/** Today's weekday in Manila (0 = Sunday). -1 during server render. Re-checks every minute. */
export function useManilaDay(): number {
  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, 60000);
      return () => clearInterval(id);
    },
    () => manilaNow().day,
    () => -1,
  );
}

/** true once mounted in the browser. */
export function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
