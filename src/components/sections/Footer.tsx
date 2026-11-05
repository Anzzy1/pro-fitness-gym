/* eslint-disable @next/next/no-img-element */
import { CONTACT, NAV_LINKS, SOCIAL, img } from "@/data/site";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "../Icons";
import { Year } from "../Promo";

const SOCIAL_LINKS = [
  { key: "facebook", label: "Pro Fitness Gym Antipolo on Facebook", icon: <FacebookIcon /> },
  { key: "instagram", label: "Pro Fitness Gym Antipolo on Instagram", icon: <InstagramIcon /> },
] as const;

export default function Footer() {
  // icons only appear once their URL is filled in (src/data/site.ts → SOCIAL)
  const socials = SOCIAL_LINKS.filter((s) => SOCIAL[s.key]);
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={img("logo.png")} alt="Pro Fitness Gym" width={160} />
          <p>Stronger today. <span className="red">Better tomorrow.</span></p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="footer__contact">
          <a href={CONTACT.directionsUrl} target="_blank" rel="noopener"><PinIcon />{CONTACT.addressShort}</a>
          <a href={CONTACT.phoneHref}><PhoneIcon />{CONTACT.phoneDisplay}</a>
          <a href={`mailto:${CONTACT.email}`}><MailIcon />{CONTACT.email}</a>
        </div>
        {socials.length > 0 && (
          <div className="footer__social" id="footerSocial">
            {socials.map((s) => (
              <a key={s.key} href={SOCIAL[s.key]} data-social={s.key} aria-label={s.label} target="_blank" rel="noopener">{s.icon}</a>
            ))}
          </div>
        )}
      </div>
      <div className="container footer__bottom">
        <p>© <Year /> Pro Fitness Gym Antipolo. All rights reserved.</p>
        <a href="#home" className="to-top">Back to top ↑</a>
      </div>
    </footer>
  );
}
