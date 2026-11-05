/* =========================================================
   SITE DATA: edit the gym's details here.
   Everything on the page that changes over time (promo, hours,
   classes, coaches, gallery, contact) is read from this file.
   ========================================================= */

// Social links (paste the full page URLs). Icons with an empty URL are hidden automatically.
export const SOCIAL = {
  facebook: "", // e.g. "https://www.facebook.com/..."
  instagram: "", // e.g. "https://www.instagram.com/..."
};

// Where website inquiries are emailed. Uses FormSubmit (free, no server needed).
// 1) Put the gym manager's email below.  2) Publish the site and send one test inquiry.
// 3) FormSubmit emails that address an activation link once. Click it, and every inquiry after that is delivered.
export const FORM_CONFIG = {
  email: "profitnessgym.antipolo@gmail.com",
  subject: "New inquiry from the Pro Fitness Gym website",
};

// Membership promo. Between `start` and `end` (Philippine time) the site shows the 50% promo
// prices and "Get 50% Off" buttons; outside those dates it automatically shows the regular rates.
// To run the promo again, just change the dates (YYYY-MM-DD). Both days are included.
export const PROMO = {
  name: "Month-End Combo Sale",
  start: "2026-08-26",
  end: "2026-08-31",
};

export const CONTACT = {
  address: "89A Marcos Highway, Mayamot, Antipolo City, Rizal",
  addressShort: "89A Marcos Hwy, Mayamot, Antipolo City",
  landmark: "Beside SM Cherry Antipolo Downtown",
  phoneDisplay: "0947 796 6387",
  phoneHref: "tel:+639477966387",
  email: "profitnessgym.antipolo@gmail.com",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pro+Fitness+Gym+-+Antipolo+Branch,+Marcos+Highway,+Mayamot,+Antipolo+City,+Rizal",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Pro+Fitness+Gym+-+Antipolo+Branch,+Marcos+Highway,+Mayamot,+Antipolo+City,+Rizal&output=embed",
};

export type Plan = {
  months: number;
  sessions: number;
  regular: string;
  promo: string;
  save: string;
  /** value sent with the inquiry form */
  label: string;
  ribbon?: { text: string; gold?: boolean };
  featured?: boolean;
  promoPerk: string;
};

export const PLANS: Plan[] = [
  { months: 3, sessions: 5, regular: "₱14,000", promo: "₱7,000", save: "₱7,000", label: "3 Months + 5 Sessions", promoPerk: "Waived joining fee" },
  { months: 6, sessions: 12, regular: "₱38,400", promo: "₱19,200", save: "₱19,200", label: "6 Months + 12 Sessions", ribbon: { text: "Most Popular" }, featured: true, promoPerk: "Waived joining fee + freebies" },
  { months: 12, sessions: 24, regular: "₱73,200", promo: "₱36,600", save: "₱36,600", label: "12 Months + 24 Sessions", ribbon: { text: "Best Value", gold: true }, promoPerk: "Waived joining fee + freebies" },
];

// Extra choices in the form's "Interested in" dropdown (after the plans)
export const EXTRA_INQUIRY_OPTIONS = ["Just a free gym tour", "Other question"];

// Opening hours, 24h format. day: 0 = Sunday ... 6 = Saturday. close 24 = midnight.
// NOTE: Based on the gym's posted hours (7AM–12MN / Sun 7AM–11PM). Confirm with the gym.
export const HOURS = [
  { day: 1, label: "Monday", open: 7, close: 24 },
  { day: 2, label: "Tuesday", open: 7, close: 24 },
  { day: 3, label: "Wednesday", open: 7, close: 24 },
  { day: 4, label: "Thursday", open: 7, close: 24 },
  { day: 5, label: "Friday", open: 7, close: 24 },
  { day: 6, label: "Saturday", open: 7, close: 24 },
  { day: 0, label: "Sunday", open: 7, close: 23 },
];

export type ClassType = "dance" | "strength";
export type GxClass = { t: string; p: "AM" | "PM"; name: string; coach: string; type: ClassType };

// GX class schedule (from the gym's schedule board). Keys: 1 = Monday ... 6 = Saturday
export const SCHEDULE: Record<number, GxClass[]> = {
  1: [{ t: "6:00", p: "PM", name: "Zumba", coach: "ZIN Micko", type: "dance" }],
  2: [{ t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" }],
  3: [
    { t: "8:00", p: "AM", name: "Retro Dance", coach: "ZIN Jhelai", type: "dance" },
    { t: "6:00", p: "PM", name: "Zumba", coach: "ZIN Micko", type: "dance" },
  ],
  4: [
    { t: "5:00", p: "PM", name: "Tabata", coach: "Coach Eros", type: "strength" },
    { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" },
  ],
  5: [
    { t: "8:00", p: "AM", name: "Retro Dance", coach: "ZIN Jhelai", type: "dance" },
    { t: "5:00", p: "PM", name: "Circuit Training", coach: "Coach Zen", type: "strength" },
    { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" },
  ],
  6: [
    { t: "5:00", p: "PM", name: "Ab Blast", coach: "Coach Paul", type: "strength" },
    { t: "6:00", p: "PM", name: "Mixed Dance", coach: "ZIN Ashley", type: "dance" },
  ],
};

export type GalleryCat = "floor" | "members" | "classes";
export type GalleryPhoto = { src: string; cat: GalleryCat; alt: string; ar?: string };

// Gallery photos (files in public/assets/img). ar = aspect ratio shown in the loop (portrait 3/4 by default)
export const GALLERY: GalleryPhoto[] = [
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

export type Coach = {
  name: string;
  nick: string;
  spec: string;
  img: string;
  years: number;
  quote: string;
  highlights: string[];
};

export const HEAD_COACH = {
  name: "Dave Villamor",
  img: "gym_head-coach.jpg",
  role: "Certified Personal Training · Fitness Instructor · Batch 84 (Gold's Gym)",
  quote: "Better version of you, one workout at a time.",
  pills: ["Fat Loss Specialist", "Body Recomposition Expert", "Lean Bulk Specialist", "Special Population (with medical condition)", "Powerlifting Enthusiast"],
};

export const COACHES: Coach[] = [
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

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#membership", label: "Membership" },
  { href: "#classes", label: "Classes" },
  { href: "#coaches", label: "Coaches" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

export const img = (file: string) => `/assets/img/${file}`;
