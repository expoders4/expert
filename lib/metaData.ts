import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://expert-psi.vercel.app";

/**
 * Returns the current origin at call time:
 *  - Client-side  → window.location.origin  (actual browser URL, works on any host)
 *  - Server-side  → NEXT_PUBLIC_SITE_URL env var, or production fallback
 *
 * Using typeof window guards against calling window on the server.
 */
export function getOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return BASE_URL;
}

export const SITE_CONFIG = {
  name: "Rakesh Architecture & Design",
  tagline: "30+ Years of Designing Excellence",
  description:
    "For over 30 years, we have been Gujarat's preferred choice for innovative architecture and interior design. From the heart of Gandhinagar to the expanding horizons of Ahmedabad, we provide premium design solutions that blend Gujarati heritage with modern functionality. Trusted by families and developers alike.",
  url: BASE_URL,
  get imageUrl(): string { return getOrigin(); },
  ogImage: `${BASE_URL}/images/og-default.jpg`,
  email: "info@rakesharchitecture.com",
  phone: "+91-814-0604000",
  whatsapp: "+91-8140604000",
  address: {
    street: "608 ASK CONSULTANT, SHALIN CENTRUM, NEAR CROMA SHOW ROOM, SECTOR 11, GANDHINAGAR",
    city: "GANDHINAGAR",
    state: "Gujarat",
    pin: "382010",
    country: "India",
  },
  social: {
    facebook: "https://facebook.com/patelseeds",
    instagram: "https://instagram.com/patelseeds",
    linkedin: "https://linkedin.com/company/patel-seeds",
    youtube: "https://youtube.com/@patelseeds",
  },

  EMAIL_USER: 'info@rakesharchitecture.com',
  ADMIN_EMAIL: 'dashu.web@gmail.com',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'eleven.expoders@gmail.com',
  SMTP_PASS: 'kusm mrpn aeoq csmc'
};

export const aboutMetadata: Metadata = {
  title: 'About TOUGH Architects | Global Architecture Studio Since 1984',
  description:
    'TOUGH Architects is a global architecture firm founded in 1984. Explore our team, philosophy, sustainable design approach, and award-winning architectural projects.',
  keywords: [
    'architecture firm',
    'best architects',
    'sustainable architecture',
    'design studio',
    'urban planning architects',
    'luxury architecture firm',
  ],
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About TOUGH Architects',
    description:
      'Global architecture studio delivering sustainable and award-winning designs since 1984.',
    url: `${BASE_URL}/about`,
    siteName: 'TOUGH Architects',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'TOUGH Architects Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TOUGH Architects',
    description:
      'Award-winning global architecture firm shaping modern cities.',
    images: [`${BASE_URL}/og-about.jpg`],
  },
};
