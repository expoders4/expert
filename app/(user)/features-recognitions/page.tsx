import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import PageHero from '../../../components/user/pageHero';
import { Reveal } from '../../../components/animations';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tougharchitects.com';

export const metadata: Metadata = {
  title:
    'Featured & Recognitions — Press, Awards & Industry Recognition',

  description:
    'Explore press features, global publications, design awards, editorial recognition, and industry accolades earned by TOUGH Architects.',

  alternates: {
    canonical:
      `${siteUrl}/featured-recognitions`,
  },

  openGraph: {
    title:
      'TOUGH Architects — Featured & Recognitions',

    description:
      'International recognition, media features, awards, and editorial highlights.',

    url:
      `${siteUrl}/featured-recognitions`,

    type:
      'website',
  },
};

const jsonLd = {
  '@context':
    'https://schema.org',

  '@type':
    'CollectionPage',

  name:
    'TOUGH Architects Featured & Recognitions',

  url:
    `${siteUrl}/featured-recognitions`,
};

/* ─── Static fallback stats ─────────────────────────────── */
const stats = [
  {
    number: '65+',
    label: 'Global Features',
  },
  {
    number: '22',
    label: 'Industry Awards',
  },
  {
    number: '14',
    label: 'Countries Published',
  },
  {
    number: '40+',
    label: 'Years Recognised',
  },
];

/* ─── Types ──────────────────────────────────────────────── */
interface Feature {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  category: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ─── Data Fetching ──────────────────────────────────────── */
async function getFeatures(): Promise<Feature[]> {
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/feature`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const json = await res.json();

    return json.success
      ? (json.data as Feature[])
      : [];
  } catch {
    return [];
  }
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function FeaturedRecognitionsPage() {
  const features = await getFeatures();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />

      <main>

        <PageHero
          label="Recognition"
          title="Featured"
          titleAccent="Worldwide"
          subtitle="Four decades of design excellence recognised by global publications, institutions, and industry leaders."
          image="/images/features-recognitions-banner.png"
          imageAlt="TOUGH Architects recognitions"
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label:
                'Featured & Recognitions',
            },
          ]}
        />

        {/* INTRO */}

        <section
          className="section-dark2"
          style={{
            padding: "5rem 0",
            borderBottom: "1px solid var(--color-dark4)",
          }}
          aria-label="Features"
        >
          <div className="container-wide">
            <div className="row">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map((feature: any) => (
                  <div
                    key={feature.id}
                    // href={`/awards/${feature.slug}`}
                    className="group block cursor-pointer"
                  >
                    <div className="relative h-[280px] overflow-hidden rounded-2xl">

                      {/* Background image */}
                      <div
                        className="
                              absolute inset-0
                              bg-cover bg-center
                              transition-all duration-700
                              scale-100 group-hover:scale-110
                            "
                        style={{
                          backgroundImage: `url(${feature.image})`,
                        }}
                      />

                      {/* Featured Badge */}
                      {feature.featured && (
                        <div
                          className="absolute top-4 right-4 z-30 px-3 py-1"
                          style={{
                            background: "var(--color-primary)",
                            color: "var(--color-dark1)",
                            fontSize: ".65rem",
                            fontWeight: 600,
                            letterSpacing: "1.5px",
                            fontFamily: "var(--font-dm-mono)",
                            textTransform: "uppercase",
                          }}
                        >
                          Featured
                        </div>
                      )}

                      {/* Default overlay */}
                      <div
                        className="
                              absolute inset-0
                              flex flex-col items-center justify-center
                              transition-all duration-700
                              group-hover:opacity-0
                            "
                        style={{
                          background: "rgba(0,0,0,.45)",
                        }}
                      >
                        <p
                          style={{
                            color: "white",
                            fontSize: ".7rem",
                            letterSpacing: "2px",
                            marginBottom: ".75rem",
                            fontFamily: "var(--font-dm-mono)",
                            textTransform: "uppercase",
                          }}
                        >
                          Featured In
                        </p>

                        <h3
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "1.8rem",
                            color: "white",
                            textAlign: "center",
                            padding: "0 1rem",
                          }}
                        >
                          {feature.organization}
                        </h3>
                      </div>

                      {/* Hover overlay */}
                      <div
                        className="
                              absolute inset-0
                              opacity-0 group-hover:opacity-100
                              transition-all duration-700
                              bg-gradient-to-t
                              from-black via-black/40 to-transparent
                              backdrop-blur-[2px]
                            "
                      />

                      {/* Shine effect */}
                      <div
                        className="
                              absolute top-0 -left-[120%]
                              w-[60%] h-full
                              bg-white/10
                              skew-x-[-25deg]
                              group-hover:left-[160%]
                              transition-all duration-1000
                            "
                      />

                      {/* Gold border */}
                      <div
                        className="
                              absolute inset-4
                              border border-transparent
                              group-hover:border-[var(--color-primary)]
                              transition-all duration-700
                            "
                      />

                      {/* Hover content */}
                      <div className="absolute inset-0 z-20 flex items-end p-6">
                        <div
                          className="
                                translate-y-10 opacity-0
                                group-hover:translate-y-0
                                group-hover:opacity-100
                                transition-all duration-700
                              "
                        >
                          <h3
                            style={{
                              fontFamily: "var(--font-playfair)",
                              fontSize: "1.4rem",
                              fontWeight: 700,
                              color: "var(--color-white)",
                              marginBottom: ".5rem",
                            }}
                          >
                            {feature.title}
                          </h3>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


      </main>
    </>
  );
}