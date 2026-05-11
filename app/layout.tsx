import type {
  Metadata,
  Viewport,
} from "next";

import {
  Playfair_Display,
  Raleway,
  DM_Mono,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import BodyWrapper from "../components/bodyWrapper";


/* ─── Fonts ───────────────────────── */

const playfair =
  Playfair_Display({
    subsets: ["latin"],
    weight: [
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ],
    style: [
      "normal",
      "italic",
    ],
    variable:
      "--font-playfair",
    display:
      "swap",
  });

const raleway =
  Raleway({
    subsets: ["latin"],
    weight: [
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
    ],
    variable:
      "--font-raleway",
    display:
      "swap",
  });

const dmMono =
  DM_Mono({
    subsets: ["latin"],
    weight: [
      "300",
      "400",
      "500",
    ],
    variable:
      "--font-dm-mono",
    display:
      "swap",
  });


/* ─── SEO ───────────────────────── */

const siteUrl =
  process.env
    .NEXT_PUBLIC_SITE_URL ||
  "https://tougharchitects.com";

const siteName =
  "TOUGH Architects";

const siteDescription =
  "Award-winning architectural firm specialising in residential, commercial, and interior design.";


/* ─── Metadata ───────────────────── */

export const metadata: Metadata = {
  metadataBase:
    new URL(
      siteUrl
    ),

  title: {
    default:
      `${siteName} — Architecture & Interior Design`,

    template:
      `%s | ${siteName}`,
  },

  description:
    siteDescription,

  keywords: [
    "architecture",
    "interior design",
    "architect",
    "commercial architecture",
    "residential architecture",
  ],

  authors: [
    {
      name:
        siteName,

      url:
        siteUrl,
    },
  ],

  creator:
    siteName,

  publisher:
    siteName,

  alternates: {
    canonical:
      siteUrl,
  },

  openGraph: {
    type:
      "website",

    url:
      siteUrl,

    title:
      `${siteName} — Architecture & Interior Design`,

    description:
      siteDescription,

    siteName,

    images: [
      {
        url:
          `${siteUrl}/og-image.jpg`,

        width:
          1200,

        height:
          630,
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      `${siteName} — Architecture & Interior Design`,

    description:
      siteDescription,

    images: [
      `${siteUrl}/og-image.jpg`,
    ],
  },
};


export const viewport: Viewport = {
  themeColor:
    "#0d0d0d",

  width:
    "device-width",

  initialScale:
    1,
};


/* ─── JSON-LD ───────────────────── */

const jsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "ProfessionalService",

  "@id":
    siteUrl,

  name:
    siteName,

  description:
    siteDescription,

  url:
    siteUrl,

  logo:
    `${siteUrl}/logo.png`,

  image:
    `${siteUrl}/og-image.jpg`,
};


/* ─── Layout ───────────────────── */

export default function RootLayout({
  children,
}: {
  children:
  React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${raleway.variable} ${dmMono.variable}`}
    >

      <head>

        <link
          rel="preconnect"
          href="https://images.unsplash.com"
        />

        <link
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                jsonLd
              ),
          }}
        />

      </head>

      <body className="antialiased">
        <BodyWrapper>
          {children}
        </BodyWrapper>
        <Toaster
          position="top-right"
          richColors
        />

      </body>

    </html>
  );
}