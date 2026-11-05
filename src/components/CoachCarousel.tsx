"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COACHES, img } from "@/data/site";
import { useModal } from "./Modal";
import { ArrowLeft, ArrowRight } from "./Icons";

/** Side-scrolling coach cards: arrows, progress bar, "Showing X–Y of N", mouse drag. Tap opens the profile. */
export default function CoachCarousel() {
  const { openCoach } = useModal();
  const track = useRef<HTMLDivElement>(null);
  const [ui, setUi] = useState({ width: 100, offset: 0, atStart: true, atEnd: false, first: 1, last: COACHES.length });

  const step = useCallback(() => {
    const t = track.current, card = t?.querySelector<HTMLElement>(".coach");
    return t && card ? card.offsetWidth + parseFloat(getComputedStyle(t).columnGap) : 300;
  }, []);

  const update = useCallback(() => {
    const t = track.current; if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    const st = step(), first = Math.round(t.scrollLeft / st) + 1;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const visible = Math.max(1, Math.floor((t.clientWidth + gap + 4) / st));
    setUi({
      width: (t.clientWidth / t.scrollWidth) * 100,
      offset: max > 0 ? (t.scrollLeft / t.scrollWidth) * 100 : 0,
      atStart: t.scrollLeft <= 4,
      atEnd: t.scrollLeft >= max - 4,
      first,
      last: Math.min(COACHES.length, first + visible - 1),
    });
  }, [step]);

  useEffect(() => {
    const t = track.current!;
    const onScroll = () => requestAnimationFrame(update);
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Click-and-drag scrolling for mouse users (touch already swipes natively)
    let drag: { x: number; left: number } | null = null, dragged = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: t.scrollLeft }; dragged = false;
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) > 6) { dragged = true; t.classList.add("is-dragging"); }
      if (dragged) t.scrollLeft = drag.left - dx;
    };
    const up = () => {
      if (!drag) return;
      drag = null;
      if (dragged) {
        t.classList.remove("is-dragging");
        const s = step(); t.scrollTo({ left: Math.round(t.scrollLeft / s) * s });
      }
    };
    t.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      t.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [update, step]);

  const by = (dir: number) => track.current?.scrollBy({ left: dir * step() });

  return (
    <div className="carousel reveal">
      <div
        className="coach-grid"
        id="coachGrid"
        ref={track}
        tabIndex={0}
        aria-label="Coaches, scroll sideways to see more"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); by(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); by(-1); }
        }}
      >
        {COACHES.map((c, i) => (
          <button key={c.name} className="coach" data-coach-idx={i} aria-label={`View profile of ${c.name}`} onClick={() => openCoach(c)}>
            <div className="coach__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(c.img)} alt={`${c.name} — ${c.spec}`} loading="lazy" />
            </div>
            <div className="coach__body">
              <div>
                <div className="coach__spec">{c.spec}</div>
                <div className="coach__name">{c.name}</div>
                <div className="coach__meta">{c.years} yrs experience</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="carousel__nav">
        <button className="carousel__btn carousel__btn--ghost" id="coachPrev" aria-label="Previous coaches" disabled={ui.atStart} onClick={() => by(-1)}>
          <ArrowLeft />
        </button>
        <div className="carousel__meta">
          <div className="carousel__progress" aria-hidden="true">
            <span id="coachProgress" style={{ width: `${ui.width}%`, marginLeft: `${ui.offset}%` }}></span>
          </div>
          <p className="carousel__count" id="coachCount" aria-live="polite">
            Showing <b>{ui.first === ui.last ? ui.first : `${ui.first}–${ui.last}`}</b> of <b>{COACHES.length}</b> coaches
          </p>
        </div>
        <button className="carousel__btn carousel__btn--red" id="coachNext" aria-label="Next coaches" disabled={ui.atEnd} onClick={() => by(1)}>
          <span className="carousel__btn-label">More coaches</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
