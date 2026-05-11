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
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    const res = await fetch(
      `${baseUrl}/api/feature`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const json = await res.json();

    return json.success
      ? (json.data as Feature[]).filter(
          (f) => f.published,
        )
      : [];
  } catch {
    return [];
  }
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function FeaturedRecognitionsPage() {
  const features = await getFeatures();

  /* Split by category — anything with category "press",
     "publication", or "feature" goes to the press grid;
     everything else to the recognition timeline.
     If no category is set, default to timeline.          */
  const pressKeywords = ['press', 'publication', 'feature', 'media', 'editorial'];

  const publications = features.filter((f) =>
    pressKeywords.some((kw) =>
      (f.category ?? '').toLowerCase().includes(kw),
    ),
  );

  const recognitions = features.filter(
    (f) =>
      !pressKeywords.some((kw) =>
        (f.category ?? '').toLowerCase().includes(kw),
      ),
  );

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
          image="/images/about-office.png"
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
            padding:
              'var(--section-py) 0',
          }}
        >
          <div className="container-wide text-center max-w-4xl px-5">

            <Reveal>
              <span className="section-label justify-center">
                Global Recognition
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="section-heading mt-3">
                Design That
                <span className="pl-3">
                  Gets Noticed
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-6 text-sm md:text-base"
                style={{
                  lineHeight:
                    '1.9',
                }}
              >
                Our work has been featured
                across leading design
                publications, recognised
                by global institutions,
                and celebrated for
                architecture that
                endures beyond trends.
              </p>
            </Reveal>

          </div>
        </section>

        {/* PRESS FEATURES */}
        {publications.length > 0 && (
          <section
            className="section-dark"
            style={{
              padding:
                'var(--section-py) 0',
            }}
          >
            <div className="container-wide px-5">

              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <span className="section-label justify-center">
                    Press Features
                  </span>

                  <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                    International
                    <span className="block sm:inline pl-0 sm:pl-3 mt-2 sm:mt-0">
                      Publications
                    </span>
                  </h2>

                  <span className="gold-divider mx-auto" />
                </div>
              </Reveal>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px"
              >
                {publications.map(
                  (item) => (
                    <article
                      key={item.id}
                      style={{
                        background:
                          'var(--color-dark3)',
                        overflow:
                          'hidden',
                      }}
                    >
                      <div
                        className="relative"
                        style={{
                          aspectRatio:
                            '4/3',
                        }}
                      >
                        <Image
                          src={
                            item.image ||
                            '/images/about-office.png'
                          }
                          alt={
                            item.title
                          }
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5 md:p-6">

                        {item.category && (
                          <p
                            style={{
                              color:
                                'var(--color-primary)',
                              fontSize:
                                '.7rem',
                              letterSpacing:
                                '.15em',
                              textTransform:
                                'uppercase',
                            }}
                          >
                            {item.category}
                          </p>
                        )}

                        <h3
                          className="mt-3"
                          style={{
                            fontFamily:
                              'var(--font-playfair)',
                            color:
                              'white',
                            fontSize:
                              '1.1rem',
                          }}
                        >
                          {item.title}
                        </h3>

                        {item.description && (
                          <p
                            className="mt-3 text-sm"
                          >
                            {item.description}
                          </p>
                        )}

                      </div>
                    </article>
                  )
                )}
              </div>

            </div>
          </section>
        )}

        {/* RECOGNITION TIMELINE */}
        {recognitions.length > 0 && (
          <section
            className="section-dark2"
            style={{
              padding:
                'var(--section-py) 0',
            }}
          >
            <div className="container-wide px-5">

              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <span className="section-label justify-center">
                    Milestones
                  </span>

                  <h2 className="section-heading">
                    Industry
                    <span>
                      Recognition
                    </span>
                  </h2>

                  <span className="gold-divider mx-auto" />
                </div>
              </Reveal>

              <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">

                {recognitions.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="card-surface p-5 md:p-6"
                    >

                      {item.category && (
                        <p
                          style={{
                            color:
                              'var(--color-primary)',
                            fontSize:
                              '.75rem',
                            letterSpacing:
                              '.15em',
                            textTransform:
                              'uppercase',
                          }}
                        >
                          {item.category}
                        </p>
                      )}

                      <h3
                        className="mt-2"
                        style={{
                          fontFamily:
                            'var(--font-playfair)',
                          fontSize:
                            '1.1rem',
                          color:
                            'white',
                        }}
                      >
                        {item.title}
                      </h3>

                      {item.description && (
                        <p
                          className="mt-3 text-sm"
                        >
                          {item.description}
                        </p>
                      )}

                    </div>
                  )
                )}

              </div>

            </div>
          </section>
        )}

        {/* STATS */}
        <section
          className="section-dark"
          style={{
            padding:
              '5rem 0',
          }}
        >
          <div className="container-wide px-5">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px">

              {stats.map(
                (item) => (
                  <div
                    key={item.label}
                    className="text-center p-6 md:p-8"
                  >

                    <h3
                      style={{
                        fontFamily:
                          'var(--font-playfair)',
                        fontSize:
                          'clamp(1.8rem,4vw,2.4rem)',
                        color:
                          'var(--color-primary)',
                      }}
                    >
                      {item.number}
                    </h3>

                    <p
                      className="mt-2 text-xs"
                      style={{
                        letterSpacing:
                          '.12em',
                        textTransform:
                          'uppercase',
                      }}
                    >
                      {item.label}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>
        </section>
      </main>
    </>
  );
}