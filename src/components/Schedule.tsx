"use client";

import { useState } from "react";
import { SCHEDULE, type ClassType } from "@/data/site";
import { DAY_SHORT } from "@/lib/time";
import { useManilaDay } from "@/lib/hooks";

type Filter = "all" | ClassType;
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All classes" },
  { value: "dance", label: "Dance" },
  { value: "strength", label: "Strength & HIIT" },
];
const DAYS = [1, 2, 3, 4, 5, 6];

/** GX class schedule: day tabs (today highlighted) + type filter. */
export default function Schedule() {
  const today = useManilaDay(); // -1 until it runs in the browser
  const [picked, setPicked] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const activeDay = picked ?? (today <= 0 ? 1 : today); // Sunday has no classes, so show Monday

  const items = SCHEDULE[activeDay].filter((c) => filter === "all" || c.type === filter);

  return (
    <div className="schedule reveal">
      <div className="schedule__filters" role="group" aria-label="Filter classes">
        {FILTERS.map((f) => (
          <button key={f.value} className={`chip${filter === f.value ? " is-active" : ""}`} data-filter={f.value} onClick={() => setFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="schedule__days" role="tablist" aria-label="Day of week" id="dayTabs">
        {DAYS.map((d) => {
          const n = SCHEDULE[d].length;
          const on = d === activeDay;
          return (
            <button key={d} className={`day-tab${on ? " is-active" : ""}`} role="tab" data-day={d} aria-selected={on} onClick={() => setPicked(d)}>
              {d === today && <span className="today">Today</span>}
              {DAY_SHORT[d]}<small>{n} class{n > 1 ? "es" : ""}</small>
            </button>
          );
        })}
      </div>

      <div className="schedule__list" id="scheduleList" role="tabpanel" aria-live="polite">
        {items.length ? (
          items.map((c, i) => (
            // key changes with day/filter so the slide-in animation replays
            <div className="slot" style={{ "--i": i } as React.CSSProperties} key={`${activeDay}-${filter}-${i}`}>
              <div className="slot__time">{c.t}<small>{c.p}</small></div>
              <div><div className="slot__name">{c.name}</div><div className="slot__coach">with {c.coach}</div></div>
              <span className={`slot__tag slot__tag--${c.type}`}>{c.type === "dance" ? "Dance" : "Strength"}</span>
            </div>
          ))
        ) : (
          <div className="schedule__empty" key={`${activeDay}-${filter}-empty`}>
            <p><b>No {filter === "dance" ? "dance" : "strength"} classes on {DAY_SHORT[activeDay]}.</b><br />The gym floor is open all day — or try another day.</p>
          </div>
        )}
      </div>
    </div>
  );
}
