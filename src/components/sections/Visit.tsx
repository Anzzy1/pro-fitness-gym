/* eslint-disable @next/next/no-img-element */
import { CONTACT, img } from "@/data/site";
import HoursList from "../HoursList";
import InquiryForm from "../InquiryForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "../Icons";

export function Community() {
  return (
    <section className="community">
      <div className="community__bg parallax" data-speed="0.12">
        <img src={img("gym_photo-3.jpg")} alt="" loading="lazy" />
      </div>
      <div className="community__overlay"></div>
      <div className="container community__grid">
        <div className="community__text">
          <p className="eyebrow reveal">Be Part Of The Team</p>
          <h2 className="title title--xl reveal">Join &amp; get your<br /><span className="outline">exclusive</span><br /><span className="red">jersey shirt.</span></h2>
          <p className="lead reveal">Sign up for a membership and wear the colors. Our limited-edition PFG jersey is yours on us — while supplies last.</p>
          <a href="#membership" className="btn btn--primary btn--lg magnetic reveal">Sign up today</a>
        </div>
        <div className="community__card reveal-right">
          <img src={img("gym_exclusive-jersey.jpg")} alt="Two members wearing the exclusive Pro Fitness Gym jersey" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export default function Visit() {
  return (
    <section className="section visit" id="visit">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow reveal">Visit Us</p>
          <h2 className="title reveal">See you at <span className="red">the club!</span></h2>
        </div>

        <div className="visit__grid">
          <div className="visit__info reveal-left">
            <div className="info-card">
              <h3><ClockIcon /> Opening hours</h3>
              <HoursList />
              <p className="note">Holiday hours may vary — follow our page for announcements.</p>
            </div>
            <div className="info-card">
              <h3><PinIcon /> Location &amp; contact</h3>
              <ul className="contact-list">
                <li><PinIcon /><span>{CONTACT.address}<small>{CONTACT.landmark}</small></span></li>
                <li><PhoneIcon /><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
                <li><MailIcon /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              </ul>
              <div className="contact-actions">
                <a className="btn btn--primary btn--sm" href={CONTACT.directionsUrl} target="_blank" rel="noopener">Get directions</a>
                <a className="btn btn--ghost btn--sm" href={CONTACT.phoneHref}>Call us</a>
                <a className="btn btn--ghost btn--sm" href={`mailto:${CONTACT.email}`}>Email us</a>
              </div>
            </div>
            <div className="map">
              <iframe
                title="Map to Pro Fitness Gym Antipolo, 89A Marcos Highway, Mayamot"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={CONTACT.mapEmbedUrl}
              ></iframe>
            </div>
          </div>

          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
