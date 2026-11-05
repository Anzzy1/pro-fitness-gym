/* eslint-disable @next/next/no-img-element */
import { img } from "@/data/site";

const FEATURES = [
  { title: "Expert Coaching", text: "Certified coaches with up to 22 years of experience and competition titles.",
    icon: <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4l-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z" /> },
  { title: "Personalized Programs", text: "Fat loss, lean bulk, body recomp, powerlifting — a plan built around you.",
    icon: <path d="M9 5h10M9 12h10M9 19h10M4 5h.01M4 12h.01M4 19h.01" /> },
  { title: "Accountability & Support", text: "A community and team that shows up for you — every single session.",
    icon: <path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a4 4 0 100-8 4 4 0 000 8M21 20v-2a4 4 0 00-3-3.9M16 2.1a4 4 0 010 7.8" /> },
  { title: "Real Results", text: "Proper form, guidance and progress you can actually see and feel.",
    icon: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" /> },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__media reveal-left">
          <div className="about__img about__img--main parallax" data-speed="0.06">
            <img src={img("gym_photo-2.jpg")} alt="Members training on the Pro Fitness Gym floor" loading="lazy" />
          </div>
          <div className="about__img about__img--float parallax" data-speed="-0.08">
            <img src={img("gym_building.jpg")} alt="Pro Fitness Gym building exterior in Lower Antipolo" loading="lazy" />
          </div>
          <div className="about__badge">
            <strong>6</strong>
            <span>days of<br />GX classes</span>
          </div>
        </div>

        <div className="about__text">
          <p className="eyebrow reveal">Why Pro Fitness</p>
          <h2 className="title reveal">Built for <span className="red">real results.</span><br />Made for everyone.</h2>
          <p className="lead reveal">
            From first-timers to competing athletes, Pro Fitness Gym is Lower Antipolo&apos;s home for serious
            training in a welcoming community. Plate-loaded machines, power racks, a sled track,
            a dedicated dance studio and the ProFuel café — all under one roof.
          </p>

          <div className="features">
            {FEATURES.map((f, i) => (
              <article key={f.title} className="feature reveal" style={i ? ({ "--d": `${(i * 0.08).toFixed(2).replace(/^0/, "")}s` } as React.CSSProperties) : undefined}>
                <div className="feature__icon"><svg viewBox="0 0 24 24">{f.icon}</svg></div>
                <div><h3>{f.title}</h3><p>{f.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
