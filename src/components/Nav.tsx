"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, img } from "@/data/site";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const menuOpenRef = useRef(false);

  // Lock page scroll while the full-screen menu is open
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) setHidden(false);
    document.body.classList.toggle("is-locked", menuOpen);
  }, [menuOpen]);

  // Background after scrolling a little; hide while scrolling down, show when scrolling up
  useEffect(() => {
    let lastY = window.scrollY, ticking = false, raf = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY && y > 600 && !menuOpenRef.current);
      lastY = y; ticking = false;
    };
    const onScroll = () => { if (!ticking) { raf = requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Escape closes the menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Highlight the link of the section in the middle of the screen
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(`#${en.target.id}`); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navClass = ["nav", scrolled && "is-scrolled", hidden && "is-hidden", menuOpen && "menu-open"].filter(Boolean).join(" ");
  const close = () => setMenuOpen(false);

  return (
    <header className={navClass} id="nav">
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" aria-label="Pro Fitness Gym home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("logo.png")} alt="Pro Fitness Gym" width={120} height={68} />
        </a>

        <nav className={`nav__menu${menuOpen ? " is-open" : ""}`} id="navMenu" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={`nav__link${active === l.href ? " is-active" : ""}`} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#membership" className="btn btn--primary nav__cta-mobile" onClick={close}>
            <span data-promo="">Get 50% Off</span><span data-regular="">Join Now</span>
          </a>
        </nav>

        <div className="nav__actions">
          <a href="#membership" className="btn btn--primary btn--sm nav__cta">Join Now</a>
          <button
            className="nav__toggle"
            id="navToggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
