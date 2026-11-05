/* eslint-disable @next/next/no-img-element */
import { HEAD_COACH, img } from "@/data/site";
import CoachCarousel from "../CoachCarousel";

export default function Coaches() {
  return (
    <section className="section coaches" id="coaches">
      <div className="container">
        <div className="section-head split">
          <div>
            <p className="eyebrow reveal">Meet The Team</p>
            <h2 className="title reveal">Your goals.<br /><span className="red">Our mission.</span></h2>
          </div>
          <p className="lead reveal">Certified, competition-proven coaches ready to build your personalized program and keep your form on point. Tap a coach to see their full profile.</p>
        </div>

        {/* Head coach feature */}
        <article className="head-coach reveal">
          <div className="head-coach__img">
            <img src={img(HEAD_COACH.img)} alt={`Head Coach ${HEAD_COACH.name}`} loading="lazy" />
          </div>
          <div className="head-coach__body">
            <div className="head-coach__top">
              <span className="tag tag--gold">Head Coach</span>
              <h3>{HEAD_COACH.name}</h3>
              <p className="role">{HEAD_COACH.role}</p>
            </div>
            <blockquote>“{HEAD_COACH.quote}”</blockquote>
            <ul className="pill-list">
              {HEAD_COACH.pills.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </article>

        <CoachCarousel />
      </div>
    </section>
  );
}
