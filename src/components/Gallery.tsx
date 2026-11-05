"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GALLERY, img, type GalleryCat, type GalleryPhoto } from "@/data/site";
import { hasFinePointer, prefersReducedMotion } from "@/lib/time";
import { useModal } from "./Modal";
import { ArrowLeft, ArrowRight } from "./Icons";

type Filter = "all" | GalleryCat;
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "floor", label: "Gym floor" },
  { value: "members", label: "Members" },
  { value: "classes", label: "Classes" },
];
const LOOP_HINT = "Hover or hold to pause · tap a photo to enlarge";

/**
 * "All": two rows of photos looping in opposite directions.
 * A category: the loop stops and the same two-row area scrolls sideways (drag / arrows / swipe).
 */
export default function Gallery() {
  const { openGallery } = useModal();
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(false);
  const [browseUi, setBrowseUi] = useState({ fits: true, atStart: true, atEnd: true });
  const reel = useRef<HTMLDivElement>(null);
  const browse = useRef<HTMLDivElement | null>(null);
  const dragged = useRef(false);

  const photos = useMemo(() => GALLERY.filter((g) => filter === "all" || g.cat === filter), [filter]);
  const isAll = filter === "all";

  // Reveal (this element's classes are React-controlled, so it observes itself)
  useEffect(() => {
    const el = reel.current!;
    const obs = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Swap animation each time the set of photos changes
  useEffect(() => {
    const el = reel.current!;
    if (prefersReducedMotion()) return;
    el.classList.remove("is-swapping"); void el.offsetWidth; el.classList.add("is-swapping");
  }, [filter]);

  const updateBrowse = useCallback(() => {
    const b = browse.current; if (!b) return;
    b.classList.remove("is-fit");
    const max = b.scrollWidth - b.clientWidth;
    const fits = max <= 4;
    b.classList.toggle("is-fit", fits); // center the photos when they all fit on screen
    setBrowseUi({ fits, atStart: b.scrollLeft <= 4, atEnd: b.scrollLeft >= max - 4 });
  }, []);

  // Browse mode wiring: scroll + resize keep the arrows/hint in sync
  useEffect(() => {
    if (isAll) return;
    const b = browse.current!;
    const onScroll = () => requestAnimationFrame(updateBrowse);
    b.scrollLeft = 0;
    b.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateBrowse);
    const raf = requestAnimationFrame(updateBrowse);
    return () => {
      b.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBrowse);
      cancelAnimationFrame(raf);
    };
  }, [isAll, filter, updateBrowse]);

  // Mouse drag to explore in browse mode (touch swipes natively)
  useEffect(() => {
    const el = reel.current!;
    let drag: { x: number; left: number } | null = null;
    const down = (e: PointerEvent) => {
      if (!browse.current || e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: browse.current.scrollLeft }; dragged.current = false;
    };
    const move = (e: PointerEvent) => {
      const b = browse.current;
      if (!drag || !b) return;
      const dx = e.clientX - drag.x;
      if (!dragged.current && Math.abs(dx) > 6) { dragged.current = true; b.classList.add("is-dragging"); }
      if (dragged.current) b.scrollLeft = drag.left - dx;
    };
    const up = () => {
      if (!drag) return;
      drag = null;
      browse.current?.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onReelClick = (e: React.MouseEvent) => {
    if (dragged.current) { dragged.current = false; return; } // a drag, not a tap
    const item = (e.target as HTMLElement).closest<HTMLElement>(".reel__item"); if (!item) return;
    openGallery(photos, +item.dataset.idx!);
  };

  // Hold to pause on touch screens
  const pauseTimer = useRef(0);
  const onTouchStart = () => { clearTimeout(pauseTimer.current); reel.current?.classList.add("is-paused"); };
  const onTouchEnd = () => { pauseTimer.current = window.setTimeout(() => reel.current?.classList.remove("is-paused"), 1200); };
  useEffect(() => () => clearTimeout(pauseTimer.current), []);

  const scrollBrowse = (dir: number) => browse.current?.scrollBy({ left: dir * browse.current.clientWidth * 0.8 });

  const hint = isAll
    ? LOOP_HINT
    : browseUi.fits
      ? `${photos.length} photos · tap a photo to enlarge`
      : `${photos.length} photos · ${hasFinePointer() ? "drag or use the arrows" : "swipe"} to explore`;
  const arrowsHidden = isAll || browseUi.fits;

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-head split">
          <div>
            <p className="eyebrow reveal">Inside The Club</p>
            <h2 className="title reveal">See where <span className="red">pros</span> are made.</h2>
          </div>
          <div className="gallery__filters reveal" role="group" aria-label="Filter gallery">
            {FILTERS.map((f) => (
              <button key={f.value} className={`chip${filter === f.value ? " is-active" : ""}`} data-gfilter={f.value} onClick={() => setFilter(f.value)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`reel reveal${visible ? " is-visible" : ""}${isAll ? "" : " is-browse"}`}
        data-reveal-self=""
        id="reel"
        ref={reel}
        aria-label="Photo gallery, tap a photo to enlarge"
        onClick={onReelClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {isAll ? (
          <LoopRows photos={photos} />
        ) : (
          <div
            key={filter}
            className="reel__browse"
            ref={browse}
            tabIndex={0}
            aria-label={`${photos.length} photos, scroll sideways to explore`}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); scrollBrowse(1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); scrollBrowse(-1); }
            }}
          >
            {photos.map((g, i) => <ReelItem key={g.src} g={g} i={i} extra={{ "--i": i } as React.CSSProperties} />)}
          </div>
        )}
      </div>
      <div className="container reel__controls">
        <button className="carousel__btn carousel__btn--ghost" id="reelPrev" aria-label="Scroll photos left" hidden={arrowsHidden} disabled={browseUi.atStart} onClick={() => scrollBrowse(-1)}>
          <ArrowLeft />
        </button>
        <p className="reel__hint" id="reelHint" aria-live="polite">{hint}</p>
        <button className="carousel__btn carousel__btn--ghost" id="reelNext" aria-label="Scroll photos right" hidden={arrowsHidden} disabled={browseUi.atEnd} onClick={() => scrollBrowse(1)}>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

/** Two rows moving in opposite directions. Each half is repeated until it is wider than the screen,
 *  then duplicated so the CSS loop (translate -50%) is seamless. Copies are hidden from screen readers. */
function LoopRows({ photos }: { photos: GalleryPhoto[] }) {
  const list = photos.map((g, i) => ({ g, i }));
  const rows = [list.filter((_, k) => k % 2 === 0), list.filter((_, k) => k % 2 === 1)];
  return (
    <>
      {rows.map((row, r) => {
        let half = [...row];
        while (half.length < 8) half = half.concat(row);
        return (
          <div key={r} className={`reel__row${r % 2 ? " reel__row--rev" : ""}`}>
            <div className="reel__track" style={{ "--dur": `${half.length * 5}s` } as React.CSSProperties}>
              {half.map(({ g, i }, k) => <ReelItem key={`a${k}`} g={g} i={i} clone={k >= row.length} />)}
              {half.map(({ g, i }, k) => <ReelItem key={`b${k}`} g={g} i={i} clone />)}
            </div>
          </div>
        );
      })}
    </>
  );
}

function ReelItem({ g, i, clone = false, extra }: { g: GalleryPhoto; i: number; clone?: boolean; extra?: React.CSSProperties }) {
  return (
    <button
      className="reel__item"
      style={{ "--ar": g.ar || "3 / 4", ...extra } as React.CSSProperties}
      data-idx={i}
      {...(clone ? { tabIndex: -1, "aria-hidden": true } : { "aria-label": `Enlarge: ${g.alt}` })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(g.src)} alt={clone ? "" : g.alt} loading="lazy" decoding="async" draggable={false} />
    </button>
  );
}
