"use client";

import { useEffect } from "react";
import { PROMO } from "@/data/site";
import { usePromo, useIsClient } from "@/lib/hooks";

/** Adds `promo-on` to <html> while the promo in src/data/site.ts is running.
 *  CSS then shows [data-promo] content and hides [data-regular] content (see globals.css). */
export function PromoController() {
  const promo = usePromo();
  useEffect(() => {
    document.documentElement.classList.toggle("promo-on", promo.on);
  }, [promo.on]);
  return null;
}

/** Promo name, "Until Aug 31" badge text, or " valid Aug 26 – Aug 31" (only filled while the promo is on). */
export function PromoText({ field, id, className }: { field: "name" | "ends" | "dates"; id?: string; className?: string }) {
  const promo = usePromo();
  const text = promo.on ? promo[field] : field === "name" ? PROMO.name : "";
  return <span id={id} className={className}>{text}</span>;
}

export function Year() {
  const isClient = useIsClient();
  return <span id="year">{isClient ? new Date().getFullYear() : 2026}</span>;
}
