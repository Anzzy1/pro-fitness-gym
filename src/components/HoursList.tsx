"use client";

import { HOURS } from "@/data/site";
import { fmtHour } from "@/lib/time";
import { useManilaDay } from "@/lib/hooks";

/** Opening hours with today's row highlighted (Philippine time, re-checked every minute). */
export default function HoursList() {
  const day = useManilaDay();
  return (
    <ul className="hours" id="hoursList">
      {HOURS.map((h) => (
        <li key={h.day} className={h.day === day ? "is-today" : ""}>
          <span>{h.label}</span><span>{fmtHour(h.open)} – {fmtHour(h.close)}</span>
        </li>
      ))}
    </ul>
  );
}
