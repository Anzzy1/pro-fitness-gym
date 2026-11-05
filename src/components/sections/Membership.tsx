import { PLANS } from "@/data/site";
import { PromoText } from "../Promo";

/* [data-promo] shows only while the promo is on, [data-regular] only while it is off (see globals.css) */
export default function Membership() {
  return (
    <section className="section membership" id="membership">
      <div className="membership__glow" aria-hidden="true"></div>
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow reveal" data-promo=""><PromoText field="name" id="promoName" /><PromoText field="ends" id="promoEnds" className="promo-ends" /></p>
          <p className="eyebrow reveal" data-regular="">Membership + coaching</p>
          <h2 className="title reveal" data-promo="">Get <span className="red">50% off</span> memberships<br />+ sessions with a coach</h2>
          <h2 className="title reveal" data-regular="">Memberships with<br /><span className="red">coach sessions</span> included</h2>
          <p className="lead reveal">More results. More value. Every package includes 1-on-1 coaching sessions so you start strong — and stay consistent.</p>
        </div>

        <div className="pricing">
          {PLANS.map((p, i) => (
            <article
              key={p.label}
              className={`price-card${p.featured ? " price-card--featured" : ""} reveal tilt`}
              style={i ? ({ "--d": `.${i}s` } as React.CSSProperties) : undefined}
            >
              {p.ribbon && <span className={`ribbon${p.ribbon.gold ? " ribbon--gold" : ""}`}>{p.ribbon.text}</span>}
              <div className="price-card__head">
                <h3><span className="big">{p.months}</span> Months</h3>
                <p className="plus">+ <b>{p.sessions}</b> coach sessions</p>
              </div>
              <div className="price-card__price">
                <s data-promo="">{p.regular}</s>
                <strong data-promo="">{p.promo}</strong>
                <span className="save" data-promo="">Save {p.save}</span>
                <strong data-regular="">{p.regular}</strong>
              </div>
              <ul className="price-card__list">
                <li>Full gym floor access</li>
                <li>{p.sessions} personal training sessions</li>
                <li>GX group classes</li>
                <li data-promo="">{p.promoPerk}</li>
                <li data-regular="">Coach-guided program</li>
              </ul>
              <a href="#visit" className={`btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block`} data-plan={p.label}>Choose plan</a>
            </article>
          ))}
        </div>

        <div className="perks reveal" data-promo="">
          <div className="perk"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M4 4l16 16" /></svg><span><b>Waived</b> joining fee</span></div>
          <div className="perk"><svg viewBox="0 0 24 24"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /></svg><span><b>Plus</b> freebies</span></div>
          <div className="perk"><svg viewBox="0 0 24 24"><path d="M16 3l5 3-2 5-2-1v11H7V10l-2 1-2-5 5-3a4 4 0 008 0z" /></svg><span><b>Exclusive</b> PFG jersey</span></div>
        </div>
        <p className="fineprint" data-promo="">Promo pricing<PromoText field="dates" id="promoDates" />. Terms &amp; conditions apply — ask our front desk for details.</p>
        <p className="fineprint" data-regular="">Regular rates. Ask our front desk about current promos.</p>
      </div>
    </section>
  );
}
