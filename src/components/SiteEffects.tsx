"use client";

import { useEffect } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/time";

const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];

/**
 * Page-wide motion that works on plain markup (no React state needed):
 * preloader, scroll progress, floating CTA, parallax, reveal-on-scroll,
 * number counters, magnetic buttons and tilt cards.
 */
export default function SiteEffects() {
  /* Preloader */
  useEffect(() => {
    const finishLoad = () => {
      $("#preloader")?.classList.add("is-done");
      document.body.classList.add("is-loaded");
    };
    const timers: number[] = [];
    const onLoad = () => timers.push(window.setTimeout(finishLoad, 900));
    if (prefersReducedMotion()) finishLoad();
    else if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(finishLoad, 3500)); // safety net on slow connections
    return () => {
      window.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
    };
  }, []);

  /* Scroll effects (single rAF loop) */
  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    const progress = $("#scrollProgress"), floatCta = $("#floatCta");
    const parallaxEls = $$(".parallax");
    const membership = $("#membership"), visit = $("#visit");
    let ticking = false, raf = 0;

    const inView = (el: Element | null) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };
    const onScroll = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      // Show the mobile CTA after the hero, but hide it when pricing or the form is on-screen
      floatCta?.classList.toggle("is-visible", y > innerHeight * 0.8 && !inView(membership) && !inView(visit));
      if (!reduceMotion) {
        parallaxEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          const offset = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed || "0.1");
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
      }
      ticking = false;
    };
    const onScrollEvent = () => {
      if (!ticking) { raf = requestAnimationFrame(onScroll); ticking = true; }
    };
    window.addEventListener("scroll", onScrollEvent, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Reveal on scroll + counters */
  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObs.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    // elements marked data-reveal-self manage their own reveal (their class list is React-controlled)
    $$(".reveal:not([data-reveal-self]), .reveal-left, .reveal-right").forEach((el) => revealObs.observe(el));

    const rafs = new Set<number>();
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement, target = +el.dataset.target!, start = +(el.dataset.start || 0);
        counterObs.unobserve(el);
        if (reduceMotion) return;
        const dur = 1600, t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 4);
          el.textContent = String(Math.round(start + (target - start) * eased));
          if (p < 1) rafs.add(requestAnimationFrame(tick));
        };
        rafs.add(requestAnimationFrame(tick));
      });
    }, { threshold: 0.6 });
    $$(".counter").forEach((c) => {
      if (!reduceMotion) c.textContent = c.dataset.start || "0";
      counterObs.observe(c);
    });

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
      rafs.forEach(cancelAnimationFrame);
      // leave counters showing their final number if we unmount mid-animation
      $$(".counter").forEach((c) => (c.textContent = c.dataset.target!));
    };
  }, []);

  /* Magnetic buttons & tilt cards (mouse only) */
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const offs: (() => void)[] = [];
    const on = (el: HTMLElement, type: string, fn: (e: MouseEvent) => void) => {
      el.addEventListener(type, fn as EventListener);
      offs.push(() => el.removeEventListener(type, fn as EventListener));
    };
    $$(".magnetic").forEach((btn) => {
      on(btn, "mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      on(btn, "mouseleave", () => (btn.style.transform = ""));
    });
    $$(".tilt").forEach((card) => {
      on(card, "mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      on(card, "mouseleave", () => (card.style.transform = ""));
    });
    return () => offs.forEach((off) => off());
  }, []);

  return null;
}
