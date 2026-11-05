/* =========================================================
   PRO FITNESS GYM ANTIPOLO — interactions & motion
   ========================================================= */
(() => {
  "use strict";

  /* ---------------- DATA (edit here) ---------------- */

  // Social links (paste the full page URLs). Icons with an empty URL are hidden automatically.
  const SOCIAL = {
    facebook: "",   // e.g. "https://www.facebook.com/..."
    instagram: "",  // e.g. "https://www.instagram.com/..."
  };

  // Where website inquiries are emailed. Uses FormSubmit (free, no server needed).
  // 1) Put the gym manager's email below.  2) Publish the site and send one test inquiry.
  // 3) FormSubmit emails that address an activation link once — click it, and every inquiry after that is delivered.
  const FORM_CONFIG = {
    email: "profitnessgym.antipolo@gmail.com",
    subject: "New inquiry from the Pro Fitness Gym website",
  };

  // Membership promo. Between `start` and `end` (Philippine time) the site shows the 50% promo
  // prices and "Get 50% Off" buttons; outside those dates it automatically shows the regular rates.
  // To run the promo again, just change the dates (YYYY-MM-DD). Both days are included.
  const PROMO = {
    name: "Month-End Combo Sale",
    start: "2026-08-26",
    end: "2026-08-31",
  };

  // Opening hours, 24h format. day: 0 = Sunday ... 6 = Saturday. close 24 = midnight.
  // NOTE: Based on the gym's posted hours (7AM–12MN / Sun 7AM–11PM). Confirm with the gym.
  const HOURS = [
    { day: 1, label: "Monday",    open: 7, close: 24 },
    { day: 2, label: "Tuesday",   open: 7, close: 24 },
    { day: 3, label: "Wednesday", open: 7, close: 24 },
    { day: 4, label: "Thursday",  open: 7, close: 24 },
    { day: 5, label: "Friday",    open: 7, close: 24 },
    { day: 6, label: "Saturday",  open: 7, close: 24 },
    { day: 0, label: "Sunday",    open: 7, close: 23 },
  ];

  // GX class schedule (from the gym's schedule board)
  const SCHEDULE = {
    1: [ { t: "6:00", p: "PM", name: "Zumba", coach: "ZIN Micko", type: "dance" } ],
    2: [ { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" } ],
    3: [ { t: "8:00", p: "AM", name: "Retro Dance", coach: "ZIN Jhelai", type: "dance" },
         { t: "6:00", p: "PM", name: "Zumba", coach: "ZIN Micko", type: "dance" } ],
    4: [ { t: "5:00", p: "PM", name: "Tabata", coach: "Coach Eros", type: "strength" },
         { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" } ],
    5: [ { t: "8:00", p: "AM", name: "Retro Dance", coach: "ZIN Jhelai", type: "dance" },
         { t: "5:00", p: "PM", name: "Circuit Training", coach: "Coach Zen", type: "strength" },
         { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" } ],
    6: [ { t: "5:00", p: "PM", name: "Ab Blast", coach: "Coach Paul", type: "strength" },
         { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" } ],
  };
  // Gallery photos. ar = aspect ratio shown in the loop (portrait 3/4 by default)
  const GALLERY = [
    { src: "gym_photo-6.jpg", cat: "floor", alt: "Training floor under the PRO FITNESS GYM mural" },
    { src: "gym_person-images-2.jpg", cat: "members", alt: "Coach spotting a member on the pull-up machine" },
    { src: "gym_dance-class-2.jpg", cat: "classes", alt: "Dance class group photo", ar: "4 / 3" },
    { src: "gym_photo.jpg", cat: "floor", alt: "Red plate-loaded machines on the gym floor" },
    { src: "gym_person-images-3.jpg", cat: "members", alt: "Member squatting on the power rack" },
    { src: "gym_photo-3.jpg", cat: "floor", alt: "Gym floor and ProFuel cafe", ar: "4 / 3" },
    { src: "gym_person-images-7.jpg", cat: "members", alt: "Member doing lateral raises by the dumbbell rack" },
    { src: "gym_dance-class.jpg", cat: "classes", alt: "Members dancing in a Zumba class" },
    { src: "gym_photo-4.jpg", cat: "floor", alt: "Busy training floor seen from above" },
    { src: "gym_person-images.jpg", cat: "members", alt: "Coach smiling by the treadmills" },
    { src: "gym_coaches-and-events.jpg", cat: "classes", alt: "GX class schedule board", ar: "16 / 9" },
    { src: "gym_photo-5.jpg", cat: "floor", alt: "Sled track with numbered lanes" },
    { src: "gym_person-images-5.jpg", cat: "members", alt: "Member on a seated row machine near the entrance" },
    { src: "gym_photo-2.jpg", cat: "floor", alt: "Members training under the red-lit ceiling" },
    { src: "gym_person-images-4.jpg", cat: "members", alt: "Two members giving thumbs up under the PRO GYM mural" },
    { src: "gym_person-images-6.jpg", cat: "members", alt: "Member loading plates on a machine" },
  ];
  const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const COACHES = [
    { name: "Eros Ramos", nick: "Coach Eros", spec: "Boxing, HIIT & Strength", img: "gym_coach-6.jpg", years: 8,
      quote: "Push through the pain — on the other side is the reward.",
      highlights: ["8 years of experience", "Fitness EduTraining Asia 2019", "Fitness Instructor Course Training (Gold's Gym 2026)", "Focus: HIIT, Tabata, circuit & strength training", "Offers: basic boxing, kickboxing & bodybuilding"] },
    { name: "Rommel Enriquez", nick: "Coach Rommel", spec: "Freestyle Movement & TRX", img: "gym_coach-4.jpg", years: 22,
      quote: "Fitness is not about being better than someone else. It's about being better than you used to be.",
      highlights: ["22 years of experience", "IFPA Certified 2016", "Level 1 Certified Freestyle Movement Training Specialist", "Focus: bodybuilding, weight loss & functional training"] },
    { name: "Joseph Costan", nick: "Coach Isjay", spec: "Physique", img: "gym_coach-2.jpg", years: 8,
      quote: "Nothing will work unless you do.",
      highlights: ["8 years of experience", "Warriors' Novice Natural Category — Champion 2026", "Focus: general fitness, strength, weight loss & fat loss", "Offers: boxing & bodybuilding"] },
    { name: "Jhon Cribe", nick: "Coach Jhon", spec: "Physique & Endurance", img: "gym_coach-1.jpg", years: 7,
      quote: "Alagaan ang katawan dahil dito ka titira habang buhay.",
      highlights: ["7 years of experience", "Physique Hot Bod Challenge 2025 — Men's Physique Cat. 1, 1st place", "Focus: general health, strength, weight loss & fat loss", "Offers: boxing & bodybuilding"] },
    { name: "Jerome Bedia", nick: "Coach Jerome", spec: "Powerlifting", img: "gym_coach-3.jpg", years: 4,
      quote: "", // no quote on his poster
      highlights: ["4 years of experience", "Ongoing Fitness Instructor Course", "Focus: fat loss, body recomp & lean bulk", "Offers: strength & conditioning and powerlifting"] },
    { name: "Jonas Amad", nick: "Coach Jonas", spec: "Physique & Endurance", img: "gym_coach-5.jpg", years: 2,
      quote: "Be stronger than yesterday.",
      highlights: ["2 years of experience", "Fitness Instructor Course Training (Gold's Gym 2026)", "Tabuelan Bodybuilding Showdown 2026 — 2nd place", "Focus: weight loss, conditioning, endurance & flexibility", "Offers: athletic conditioning & bodybuilding"] },
  ];

  /* ---------------- Helpers ---------------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // Current time in the Philippines regardless of visitor's timezone
  const manilaNow = () => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    return { day: DAY_SHORT.indexOf(get("weekday")), hour: (+get("hour") % 24) + (+get("minute")) / 60 };
  };
  const fmtHour = (h) => (h === 24 ? "12:00 MN" : h === 12 ? "12:00 NN" : `${((h + 11) % 12) + 1}:00 ${h < 12 ? "AM" : "PM"}`);

  /* ---------------- Preloader ---------------- */
  const finishLoad = () => {
    $("#preloader").classList.add("is-done");
    document.body.classList.add("is-loaded");
  };
  if (reduceMotion) finishLoad();
  else window.addEventListener("load", () => setTimeout(finishLoad, 900));
  setTimeout(finishLoad, 3500); // safety net on slow connections

  $("#year").textContent = new Date().getFullYear();

  // Promo: switch between promo prices and regular rates based on the dates above
  (() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date()); // YYYY-MM-DD
    const on = !!PROMO.start && !!PROMO.end && today >= PROMO.start && today <= PROMO.end;
    document.documentElement.classList.toggle("promo-on", on);
    if (!on) return;
    const fmt = (d) => new Date(`${d}T00:00:00+08:00`).toLocaleDateString("en-US", { timeZone: "Asia/Manila", month: "short", day: "numeric" });
    $("#promoName").textContent = PROMO.name;
    $("#promoEnds").textContent = today === PROMO.end ? "Last day today!" : `Until ${fmt(PROMO.end)}`;
    $("#promoDates").textContent = ` valid ${fmt(PROMO.start)} – ${fmt(PROMO.end)}`;
  })();

  // Social icons: link the ones that are set, hide the rest
  $$("[data-social]").forEach((a) => {
    const url = SOCIAL[a.dataset.social];
    if (url) a.href = url; else a.remove();
  });
  if (!$("#footerSocial [data-social]")) $("#footerSocial").remove();

  /* ---------------- Nav ---------------- */
  const nav = $("#nav"), toggle = $("#navToggle"), menu = $("#navMenu");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Active link highlighting
  const links = $$(".nav__link");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => sectionObs.observe(s));

  /* ---------------- Scroll effects (single rAF loop) ---------------- */
  const progress = $("#scrollProgress"), floatCta = $("#floatCta");
  const parallaxEls = $$(".parallax");
  const membership = $("#membership"), visit = $("#visit");
  let lastY = window.scrollY, ticking = false;

  const onScroll = () => {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle("is-scrolled", y > 30);
    nav.classList.toggle("is-hidden", y > lastY && y > 600 && !menu.classList.contains("is-open"));

    // Show the mobile CTA after the hero, but hide it when pricing or the form is on-screen
    const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
    floatCta.classList.toggle("is-visible", y > innerHeight * 0.8 && !inView(membership) && !inView(visit));

    if (!reduceMotion) {
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const offset = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed || 0.1);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    }
    lastY = y; ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll ---------------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObs.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  const observeReveals = (root = document) => $$(".reveal, .reveal-left, .reveal-right", root).forEach((el) => revealObs.observe(el));

  /* ---------------- Counters ---------------- */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.target, start = +(el.dataset.start || 0);
      counterObs.unobserve(el);
      if (reduceMotion) return;
      const dur = 1600, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(start + (target - start) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$(".counter").forEach((c) => { if (!reduceMotion) c.textContent = c.dataset.start || 0; counterObs.observe(c); });

  /* ---------------- Magnetic buttons & tilt cards (mouse only) ---------------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
    $$(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => (card.style.transform = ""));
    });
  }

  /* ---------------- Open / closed status + hours ---------------- */
  const renderHours = () => {
    const { day, hour } = manilaNow();
    const today = HOURS.find((h) => h.day === day);
    const pill = $("#statusPill"), label = $("span", pill);
    const isOpen = hour >= today.open && hour < today.close;
    pill.classList.toggle("is-open", isOpen);
    pill.classList.toggle("is-closed", !isOpen);
    if (isOpen) label.textContent = `Open · till ${fmtHour(today.close)}`;
    else {
      const next = hour < today.open ? today : HOURS.find((h) => h.day === (day + 1) % 7);
      label.textContent = `Closed · opens ${fmtHour(next.open)}`;
    }
    $("#hoursList").innerHTML = HOURS.map((h) =>
      `<li class="${h.day === day ? "is-today" : ""}"><span>${h.label}</span><span>${fmtHour(h.open)} – ${fmtHour(h.close)}</span></li>`).join("");
  };
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------------- Class schedule ---------------- */
  const dayTabs = $("#dayTabs"), list = $("#scheduleList");
  const todayIdx = manilaNow().day;
  let activeDay = todayIdx === 0 ? 1 : todayIdx, activeFilter = "all";

  dayTabs.innerHTML = [1, 2, 3, 4, 5, 6].map((d) => `
    <button class="day-tab" role="tab" data-day="${d}" aria-selected="false">
      ${d === todayIdx ? '<span class="today">Today</span>' : ""}
      ${DAY_SHORT[d]}<small>${SCHEDULE[d].length} class${SCHEDULE[d].length > 1 ? "es" : ""}</small>
    </button>`).join("");

  const renderSchedule = () => {
    $$(".day-tab", dayTabs).forEach((b) => {
      const on = +b.dataset.day === activeDay;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    const items = SCHEDULE[activeDay].filter((c) => activeFilter === "all" || c.type === activeFilter);
    list.innerHTML = items.length
      ? items.map((c, i) => `
        <div class="slot" style="--i:${i}">
          <div class="slot__time">${c.t}<small>${c.p}</small></div>
          <div><div class="slot__name">${c.name}</div><div class="slot__coach">with ${c.coach}</div></div>
          <span class="slot__tag slot__tag--${c.type}">${c.type === "dance" ? "Dance" : "Strength"}</span>
        </div>`).join("")
      : `<div class="schedule__empty"><p><b>No ${activeFilter === "dance" ? "dance" : "strength"} classes on ${DAY_SHORT[activeDay]}.</b><br/>The gym floor is open all day — or try another day.</p></div>`;
  };
  dayTabs.addEventListener("click", (e) => {
    const b = e.target.closest(".day-tab"); if (!b) return;
    activeDay = +b.dataset.day; renderSchedule();
  });
  $$(".schedule__filters .chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".schedule__filters .chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeFilter = chip.dataset.filter; renderSchedule();
  }));
  renderSchedule();

  /* ---------------- Coaches ---------------- */
  $("#coachGrid").innerHTML = COACHES.map((c, i) => `
    <button class="coach" data-coach-idx="${i}" aria-label="View profile of ${c.name}">
      <div class="coach__img"><img src="assets/img/${c.img}" alt="${c.name} — ${c.spec}" loading="lazy" /></div>
      <div class="coach__body">
        <div>
          <div class="coach__spec">${c.spec}</div>
          <div class="coach__name">${c.name}</div>
          <div class="coach__meta">${c.years} yrs experience</div>
        </div>
      </div>
    </button>`).join("");

  /* Coach carousel: arrows, progress bar, mouse drag */
  const track = $("#coachGrid"), prevBtn = $("#coachPrev"), nextBtn = $("#coachNext"), bar = $("#coachProgress");
  const coachCount = $("#coachCount");
  const step = () => { const card = $(".coach", track); return card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap) : 300; };
  const updateCarousel = () => {
    const max = track.scrollWidth - track.clientWidth;
    const view = track.clientWidth / track.scrollWidth;
    bar.style.width = `${view * 100}%`;
    bar.style.marginLeft = `${max > 0 ? (track.scrollLeft / track.scrollWidth) * 100 : 0}%`;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= max - 4;
    // "Showing 1–4 of 6 coaches"
    const st = step(), first = Math.round(track.scrollLeft / st) + 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const visible = Math.max(1, Math.floor((track.clientWidth + gap + 4) / st));
    const last = Math.min(COACHES.length, first + visible - 1);
    coachCount.innerHTML = `Showing <b>${first === last ? first : `${first}–${last}`}</b> of <b>${COACHES.length}</b> coaches`;
  };
  prevBtn.addEventListener("click", () => track.scrollBy({ left: -step() }));
  nextBtn.addEventListener("click", () => track.scrollBy({ left: step() }));
  track.addEventListener("scroll", () => requestAnimationFrame(updateCarousel), { passive: true });
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });
  window.addEventListener("resize", updateCarousel);
  updateCarousel();

  // Click-and-drag scrolling for mouse users (touch already swipes natively)
  let drag = null, dragged = false;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    drag = { x: e.clientX, left: track.scrollLeft }; dragged = false;
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!dragged && Math.abs(dx) > 6) { dragged = true; track.classList.add("is-dragging"); }
    if (dragged) track.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    drag = null;
    if (dragged) {
      track.classList.remove("is-dragging");
      const s = step(); track.scrollTo({ left: Math.round(track.scrollLeft / s) * s });
    }
  });


  /* ---------------- Modal: gallery lightbox + coach profile ---------------- */
  const modal = $("#modal"), modalContent = $("#modalContent");
  let gallery = [], gIndex = 0, lastFocus = null;

  const openModal = (html, single) => {
    lastFocus = document.activeElement;
    modalContent.innerHTML = html;
    modal.classList.toggle("is-single", single);
    modal.hidden = false;
    document.body.classList.add("is-locked");
    $("#modalClose").focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    lastFocus && lastFocus.focus();
  };
  const showGallery = (i) => {
    gIndex = (i + gallery.length) % gallery.length;
    const img = gallery[gIndex];
    modalContent.innerHTML = `<img src="assets/img/${img.src}" alt="${img.alt}" />`;
  };

  /* ---------------- Gallery: looping photo reel ---------------- */
  const reel = $("#reel");
  const reelItem = (g, i, clone, extra = "") => `
    <button class="reel__item" style="--ar:${g.ar || "3 / 4"};${extra}" data-idx="${i}" ${clone ? 'tabindex="-1" aria-hidden="true"' : `aria-label="Enlarge: ${g.alt}"`}>
      <img src="assets/img/${g.src}" alt="${clone ? "" : g.alt}" loading="lazy" decoding="async" draggable="false" />
    </button>`;
  const reelPrev = $("#reelPrev"), reelNext = $("#reelNext"), reelHint = $("#reelHint");
  let browse = null;
  const updateBrowseBtns = () => {
    if (!browse) return;
    browse.classList.remove("is-fit");
    const max = browse.scrollWidth - browse.clientWidth;
    const fits = max <= 4;
    browse.classList.toggle("is-fit", fits); // center the photos when they all fit on screen
    reelPrev.hidden = reelNext.hidden = fits;
    reelPrev.disabled = browse.scrollLeft <= 4;
    reelNext.disabled = browse.scrollLeft >= max - 4;
    const n = gallery.length;
    reelHint.textContent = fits
      ? `${n} photos · tap a photo to enlarge`
      : `${n} photos · ${finePointer ? "drag or use the arrows" : "swipe"} to explore`;
  };
  const renderReel = (filter) => {
    gallery = GALLERY.filter((g) => filter === "all" || g.cat === filter);
    const list = gallery.map((g, i) => ({ g, i }));
    const isAll = filter === "all";
    reel.classList.toggle("is-browse", !isAll);
    reelPrev.hidden = reelNext.hidden = isAll;

    if (isAll) {
      // Looping mode: two rows moving in opposite directions
      browse = null;
      const rows = [list.filter((_, k) => k % 2 === 0), list.filter((_, k) => k % 2 === 1)];
      reel.innerHTML = rows.map((row, r) => {
        // Repeat the set so each half is wider than the screen, then duplicate it for a seamless loop
        let half = [...row];
        while (half.length < 8) half = half.concat(row);
        const html = half.map(({ g, i }, k) => reelItem(g, i, k >= row.length)).join("")
                   + half.map(({ g, i }) => reelItem(g, i, true)).join("");
        return `<div class="reel__row${r % 2 ? " reel__row--rev" : ""}"><div class="reel__track" style="--dur:${half.length * 5}s">${html}</div></div>`;
      }).join("");
      reelHint.textContent = "Hover or hold to pause · tap a photo to enlarge";
    } else {
      // Browse mode: loop stops, same two-row height, free to scroll / drag / swipe
      reel.innerHTML = `<div class="reel__browse" tabindex="0" aria-label="${gallery.length} photos, scroll sideways to explore">${
        list.map(({ g, i }) => reelItem(g, i, false, `--i:${i}`)).join("")}</div>`;
      browse = $(".reel__browse", reel);
      browse.addEventListener("scroll", () => requestAnimationFrame(updateBrowseBtns), { passive: true });
      browse.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); browse.scrollBy({ left: browse.clientWidth * 0.8 }); }
        if (e.key === "ArrowLeft") { e.preventDefault(); browse.scrollBy({ left: -browse.clientWidth * 0.8 }); }
      });
      browse.scrollLeft = 0;
      requestAnimationFrame(updateBrowseBtns);
    }
    if (!reduceMotion) { reel.classList.remove("is-swapping"); void reel.offsetWidth; reel.classList.add("is-swapping"); }
  };
  reelPrev.addEventListener("click", () => browse && browse.scrollBy({ left: -browse.clientWidth * 0.8 }));
  reelNext.addEventListener("click", () => browse && browse.scrollBy({ left: browse.clientWidth * 0.8 }));
  window.addEventListener("resize", updateBrowseBtns);

  // Mouse drag to explore in browse mode (touch swipes natively)
  let rDrag = null, rDragged = false;
  reel.addEventListener("pointerdown", (e) => {
    if (!browse || e.pointerType !== "mouse") return;
    rDrag = { x: e.clientX, left: browse.scrollLeft }; rDragged = false;
  });
  window.addEventListener("pointermove", (e) => {
    if (!rDrag || !browse) return;
    const dx = e.clientX - rDrag.x;
    if (!rDragged && Math.abs(dx) > 6) { rDragged = true; browse.classList.add("is-dragging"); }
    if (rDragged) browse.scrollLeft = rDrag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!rDrag) return;
    rDrag = null;
    if (browse) browse.classList.remove("is-dragging");
  });
  renderReel("all");

  reel.addEventListener("click", (e) => {
    if (rDragged) { rDragged = false; return; } // a drag, not a tap
    const item = e.target.closest(".reel__item"); if (!item) return;
    openModal("", false);
    showGallery(+item.dataset.idx);
  });
  // Hold to pause on touch screens
  reel.addEventListener("touchstart", () => reel.classList.add("is-paused"), { passive: true });
  reel.addEventListener("touchend", () => setTimeout(() => reel.classList.remove("is-paused"), 1200));

  $("#coachGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".coach"); if (!card) return;
    const c = COACHES[+card.dataset.coachIdx];
    openModal(`
      <div class="coach-modal">
        <img src="assets/img/${c.img}" alt="${c.name} profile poster" />
        <div class="coach-modal__body">
          <span class="eyebrow">${c.spec}</span>
          <h3>${c.name}</h3>
          ${c.quote ? `<blockquote>“${c.quote}”</blockquote>` : ""}
          <ul>${c.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
        </div>
      </div>`, true);
  });

  $("#modalClose").addEventListener("click", closeModal);
  $("#modalPrev").addEventListener("click", () => showGallery(gIndex - 1));
  $("#modalNext").addEventListener("click", () => showGallery(gIndex + 1));
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (!modal.classList.contains("is-single")) {
      if (e.key === "ArrowRight") showGallery(gIndex + 1);
      if (e.key === "ArrowLeft") showGallery(gIndex - 1);
    }
  });
  // Swipe support in lightbox
  let touchX = null;
  modal.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (touchX === null || modal.classList.contains("is-single")) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showGallery(gIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------------- Gallery filter ---------------- */
  $$(".gallery__filters .chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".gallery__filters .chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderReel(chip.dataset.gfilter);
  }));

  /* ---------------- Prefill form from "Choose plan" ---------------- */
  const planSelect = $("#fPlan");
  document.addEventListener("click", (e) => {
    const planBtn = e.target.closest("[data-plan]");
    if (!planBtn) return;
    planSelect.value = planBtn.dataset.plan;
    planSelect.closest(".field").classList.remove("is-invalid");
    setTimeout(() => $("#fName").focus({ preventScroll: true }), 700);
  });

  /* ---------------- Inquiry form: validate + email via FormSubmit ---------------- */
  const form = $("#inquiryForm");
  const emailEl = $("#fEmail"), phoneEl = $("#fPhone"), contactGroup = $("#contactGroup");
  const submitBtn = $("#formSubmit"), errorBox = $("#formError"), successBox = $("#formSuccess");

  const validateField = (el) => {
    const ok = el.checkValidity() && (el.type !== "text" || el.value.trim().length > 1);
    el.closest(".field").classList.toggle("is-invalid", !ok);
    return ok;
  };
  const validateContact = () => {
    const hasOne = emailEl.value.trim() !== "" || phoneEl.value.trim() !== "";
    contactGroup.classList.toggle("is-invalid", !hasOne);
    const emailOk = validateField(emailEl), phoneOk = validateField(phoneEl);
    return hasOne && emailOk && phoneOk;
  };
  const cleanPhone = () => (phoneEl.value = phoneEl.value.replace(/[\s-]/g, ""));

  $$("input:not(.form__honey), select, textarea", form).forEach((el) => {
    el.addEventListener("blur", () => {
      if (el === phoneEl) cleanPhone();
      if (el === emailEl || el === phoneEl) { if (el.value) validateField(el); }
      else if (el.required) validateField(el);
    });
    el.addEventListener("input", () => {
      if (el.closest(".field").classList.contains("is-invalid")) validateField(el);
      if ((el === emailEl || el === phoneEl) && contactGroup.classList.contains("is-invalid")) validateContact();
    });
  });

  const showError = (msg) => { errorBox.textContent = msg; errorBox.hidden = false; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.hidden = true;
    cleanPhone();
    const required = [$("#fName"), planSelect];
    const fieldsOk = required.map(validateField).every(Boolean);
    const contactOk = validateContact();
    if (!fieldsOk || !contactOk) {
      ($(".field.is-invalid input, .field.is-invalid select", form) || (contactGroup.classList.contains("is-invalid") ? emailEl : null))?.focus();
      return;
    }
    if (form.elements._honey.value) return; // bot

    if (!FORM_CONFIG.email) {
      console.warn("FORM_CONFIG.email is empty — set the gym's email at the top of js/main.js.");
      showError("Sorry, online inquiries aren't set up yet. Please call or text us at 0947 796 6387.");
      return;
    }

    const data = {
      name: $("#fName").value.trim(),
      contact_email: emailEl.value.trim() || "(not provided)",
      contact_mobile: phoneEl.value.trim() || "(not provided)",
      interested_in: planSelect.value,
      message: $("#fMessage").value.trim() || "(none)",
      _subject: `${FORM_CONFIG.subject} — ${$("#fName").value.trim()}`,
      _template: "table",
      _captcha: "false",
    };
    if (emailEl.value.trim()) data._replyto = emailEl.value.trim(); // manager can hit "Reply"

    const label = submitBtn.textContent;
    submitBtn.disabled = true; submitBtn.textContent = "Sending…";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FORM_CONFIG.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || `HTTP ${res.status}`);
      submitBtn.hidden = true;
      successBox.hidden = false;
      form.reset();
    } catch (err) {
      console.error("Inquiry failed:", err);
      showError("Sorry, we couldn't send your inquiry right now. Please try again, or call/text us at 0947 796 6387.");
      submitBtn.disabled = false; submitBtn.textContent = label;
    }
  });

  observeReveals();
})();
