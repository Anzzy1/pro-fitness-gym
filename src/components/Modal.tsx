"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { img, type Coach, type GalleryPhoto } from "@/data/site";

type ModalContent =
  | { kind: "gallery"; items: GalleryPhoto[]; index: number }
  | { kind: "coach"; coach: Coach };

type ModalApi = {
  openGallery: (items: GalleryPhoto[], index: number) => void;
  openCoach: (coach: Coach) => void;
};

const ModalContext = createContext<ModalApi | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

/** Gallery lightbox + coach profile modal. Renders the modal after the page content. */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  // content stays rendered while hidden (same as the original markup)
  const [content, setContent] = useState<ModalContent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback((c: ModalContent) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setContent(c);
    setIsOpen(true);
  }, []);
  const api: ModalApi = {
    openGallery: useCallback((items, index) => open({ kind: "gallery", items, index }), [open]),
    openCoach: useCallback((coach) => open({ kind: "coach", coach }), [open]),
  };

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("is-locked");
    lastFocus.current?.focus();
  }, []);

  const step = useCallback((d: number) => {
    setContent((s) => (s && s.kind === "gallery" ? { ...s, index: (s.index + d + s.items.length) % s.items.length } : s));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("is-locked");
    closeBtn.current?.focus();
  }, [isOpen]);

  const single = content?.kind === "coach";

  // Keyboard: Escape closes, arrows move through the gallery
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (!single) {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, single, close, step]);

  // Swipe support in the lightbox
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || single) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const shown = content;

  return (
    <ModalContext.Provider value={api}>
      {children}
      <div
        className={`modal${single ? " is-single" : ""}`}
        id="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        hidden={!isOpen}
        onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).closest("[data-close]")) close(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="modal__close" id="modalClose" aria-label="Close" ref={closeBtn} onClick={close}>×</button>
        <button className="modal__nav modal__nav--prev" id="modalPrev" aria-label="Previous" onClick={() => step(-1)}>‹</button>
        <div className="modal__content" id="modalContent">
          {shown?.kind === "gallery" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img(shown.items[shown.index].src)} alt={shown.items[shown.index].alt} />
          )}
          {shown?.kind === "coach" && <CoachProfile c={shown.coach} />}
        </div>
        <button className="modal__nav modal__nav--next" id="modalNext" aria-label="Next" onClick={() => step(1)}>›</button>
      </div>
    </ModalContext.Provider>
  );
}

function CoachProfile({ c }: { c: Coach }) {
  return (
    <div className="coach-modal">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(c.img)} alt={`${c.name} profile poster`} />
      <div className="coach-modal__body">
        <span className="eyebrow">{c.spec}</span>
        <h3>{c.name}</h3>
        {c.quote && <blockquote>“{c.quote}”</blockquote>}
        <ul>{c.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      </div>
    </div>
  );
}
