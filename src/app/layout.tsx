import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});
const barlow = Barlow({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  // Public address of the site, used for absolute share-image URLs. Set SITE_URL when deploying.
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Pro Fitness Gym Antipolo | Train Like A Pro",
  description:
    "Pro Fitness Gym Lower Antipolo — premium strength equipment, certified coaches, GX dance & HIIT classes, and membership + coaching packages.",
  openGraph: {
    title: "Pro Fitness Gym Antipolo — Train Like A Pro",
    description: "Certified coaches, premium equipment and group classes in Lower Antipolo.",
    images: ["/assets/img/hero-building.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/img/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/img/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/assets/img/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${anton.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
