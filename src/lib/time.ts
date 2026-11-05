import { PROMO } from "@/data/site";

export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current day/hour in the Philippines, regardless of the visitor's timezone. */
export function manilaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return { day: DAY_SHORT.indexOf(get("weekday")), hour: (+get("hour") % 24) + +get("minute") / 60 };
}

export const fmtHour = (h: number) =>
  h === 24 ? "12:00 MN" : h === 12 ? "12:00 NN" : `${((h + 11) % 12) + 1}:00 ${h < 12 ? "AM" : "PM"}`;

export type PromoStatus = { on: false } | { on: true; name: string; ends: string; dates: string };

/** Is the membership promo running today (Philippine date)? */
export function promoStatus(): PromoStatus {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date()); // YYYY-MM-DD
  const on = !!PROMO.start && !!PROMO.end && today >= PROMO.start && today <= PROMO.end;
  if (!on) return { on: false };
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00+08:00`).toLocaleDateString("en-US", { timeZone: "Asia/Manila", month: "short", day: "numeric" });
  return {
    on: true,
    name: PROMO.name,
    ends: today === PROMO.end ? "Last day today!" : `Until ${fmt(PROMO.end)}`,
    dates: ` valid ${fmt(PROMO.start)} – ${fmt(PROMO.end)}`,
  };
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;
