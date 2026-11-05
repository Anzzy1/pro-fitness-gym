/* eslint-disable @next/next/no-img-element */
import { img } from "@/data/site";
import Nav from "@/components/Nav";
import SiteEffects from "@/components/SiteEffects";
import { ModalProvider } from "@/components/Modal";
import { PromoController } from "@/components/Promo";
import Gallery from "@/components/Gallery";
import Hero, { Marquee, Stats } from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Membership from "@/components/sections/Membership";
import Classes from "@/components/sections/Classes";
import Coaches from "@/components/sections/Coaches";
import Visit, { Community } from "@/components/sections/Visit";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <ModalProvider>
      {/* ========== PRELOADER ========== */}
      <div className="preloader" id="preloader" aria-hidden="true">
        <img src={img("logo.png")} alt="" className="preloader__logo" />
        <div className="preloader__bar"><span></span></div>
      </div>

      <div className="scroll-progress" id="scrollProgress"></div>

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Membership />
        <Classes />
        <Coaches />
        <Gallery />
        <Community />
        <Visit />
      </main>

      <Footer />

      {/* Floating CTA (mobile) */}
      <a href="#membership" className="float-cta" id="floatCta">
        <span data-promo="">Get 50% Off</span><span data-regular="">Join Now</span>
      </a>

      <PromoController />
      <SiteEffects />
    </ModalProvider>
  );
}
