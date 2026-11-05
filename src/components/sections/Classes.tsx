/* eslint-disable @next/next/no-img-element */
import { img } from "@/data/site";
import Schedule from "../Schedule";

const TYPES = [
  { src: "gym_dance-class.jpg", alt: "Members dancing in a Zumba class", title: "Zumba & Dance", text: "Retro Dance, Mixed Dance and Zumba with licensed ZIN instructors." },
  { src: "gym_photo-5.jpg", alt: "Sled track with lane markers", title: "Tabata & Circuit", text: "High-intensity conditioning to torch calories and build engine." },
  { src: "gym_person-images-6.jpg", alt: "Member loading plates on a machine", title: "Ab Blast & Strength", text: "Core-focused and strength sessions led by our coaching team." },
];

export default function Classes() {
  return (
    <section className="section classes" id="classes">
      <div className="container">
        <div className="section-head split">
          <div>
            <p className="eyebrow reveal">GX Class Schedule</p>
            <h2 className="title reveal">Move with purpose.<br /><span className="red">Train with passion.</span></h2>
          </div>
          <p className="lead reveal">Group classes run Monday to Saturday. Pick a day to see what&apos;s on — today is highlighted for you.</p>
        </div>

        <Schedule />

        <div className="class-types">
          {TYPES.map((t, i) => (
            <figure key={t.title} className="class-type reveal" style={i ? ({ "--d": `.${i}s` } as React.CSSProperties) : undefined}>
              <img src={img(t.src)} alt={t.alt} loading="lazy" />
              <figcaption><h3>{t.title}</h3><p>{t.text}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
