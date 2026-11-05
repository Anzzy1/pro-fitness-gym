/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { img } from "@/data/site";
import { ArrowRight } from "../Icons";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <img src={img("hero-building.jpg")} alt="Pro Fitness Gym building on Marcos Highway, Antipolo, with its red sign" fetchPriority="high" />
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__slash" aria-hidden="true"></div>

      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow" data-hero="1"><span className="dot"></span> Lower Antipolo · Est. 2020</p>
        <h1 className="hero__title">
          {/* the {" "} keep the word spacing when two lines share a row on wide screens */}
          <span className="line"><span className="word" data-hero="2">Train</span></span>{" "}
          <span className="line"><span className="word" data-hero="3">Like A</span></span>{" "}
          <span className="line"><span className="word word--red" data-hero="4">Pro.</span></span>
        </h1>
        <p className="hero__lead" data-hero="5">
          Premium strength equipment, certified coaches and high-energy group classes —
          everything you need to become a better version of you, one workout at a time.
        </p>
        <div className="hero__ctas" data-hero="6">
          <a href="#membership" className="btn btn--primary btn--lg magnetic">
            <span data-promo="">Claim 50% Off</span><span data-regular="">See membership plans</span>
            <ArrowRight />
          </a>
          <a href="#classes" className="btn btn--ghost btn--lg magnetic">View Class Schedule</a>
        </div>
        <ul className="hero__chips" data-hero="7">
          <li data-promo="">✓ Waived joining fee</li>
          <li data-regular="">✓ Certified coaches</li>
          <li>✓ Coach sessions included</li>
          <li data-promo="">✓ Free exclusive jersey</li>
          <li data-regular="">✓ Open 7 days a week</li>
        </ul>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span>Scroll</span><i></i>
      </a>
    </section>
  );
}

const MARQUEE = ["Strength", "Powerlifting", "Bodybuilding", "Boxing", "HIIT", "Zumba", "TRX", "Tabata"];

export function Marquee() {
  // the list is rendered twice so the CSS loop is seamless
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((m, i) => (
          <Fragment key={i}><span>{m}</span><b>✦</b></Fragment>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        <div className="stat reveal">
          <strong><span className="counter" data-target="2020" data-start="1990">2020</span></strong>
          <span>Established</span>
        </div>
        <div className="stat reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
          <strong><span className="counter" data-target="7">7</span></strong>
          <span>Certified coaches</span>
        </div>
        <div className="stat reveal" style={{ "--d": ".2s" } as React.CSSProperties}>
          <strong><span className="counter" data-target="11">11</span><span className="suffix">+</span></strong>
          <span>Group classes weekly</span>
        </div>
        <div className="stat reveal" style={{ "--d": ".3s" } as React.CSSProperties} data-promo="">
          <strong><span className="counter" data-target="50">50</span><span className="suffix">%</span></strong>
          <span>Off memberships</span>
        </div>
        <div className="stat reveal" style={{ "--d": ".3s" } as React.CSSProperties} data-regular="">
          <strong><span className="counter" data-target="7">7</span></strong>
          <span>Days open a week</span>
        </div>
      </div>
    </section>
  );
}
