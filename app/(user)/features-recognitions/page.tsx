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

const publications = [
  {
    title: 'Architectural Digest',
    year: '2025',
    category: 'Editorial Feature',
    image: '/images/about-office.png',
  },
  {
    title: 'Dezeen',
    year: '2024',
    category: 'Design Feature',
    image: '/images/about-office.png',
  },
  {
    title: 'Wallpaper*',
    year: '2024',
    category: 'Studio Feature',
    image: '/images/about-office.png',
  },
  {
    title: 'ArchDaily',
    year: '2023',
    category: 'Project Feature',
    image: '/images/about-office.png',
  },
  {
    title: 'Interior Design Magazine',
    year: '2023',
    category: 'Editorial',
    image: '/images/about-office.png',
  },
  {
    title: 'Designboom',
    year: '2022',
    category: 'Global Press',
    image: '/images/about-office.png',
  },
];

const recognitions = [
  {
    year: '2025',
    title: 'Global Design Excellence Award',
    desc:
      'Recognised for pioneering sustainable luxury architecture.',
  },
  {
    year: '2024',
    title: 'RIBA International Recognition',
    desc:
      'Shortlisted for cultural architecture excellence.',
  },
  {
    year: '2023',
    title: 'Architectural Review Award',
    desc:
      'Celebrated for innovation in residential design.',
  },
  {
    year: '2022',
    title: 'Dezeen Design Award',
    desc:
      'Awarded for outstanding hospitality interiors.',
  },
  {
    year: '2020',
    title: 'AIA Award of Merit',
    desc:
      'Excellence in modern contextual architecture.',
  },
];

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

export default function FeaturedRecognitionsPage() {
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
                <span>
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

        {/* PRESS */}
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
                    key={item.title}
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
                          item.image
                        }
                        alt={
                          item.title
                        }
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5 md:p-6">

                      <p
                        style={{
                          color:
                            'var(--color-primary)',
                          fontSize:
                            '.7rem',
                          letterSpacing:
                            '.15em',
                        }}
                      >
                        {
                          item.year
                        }
                      </p>

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
                        {
                          item.title
                        }
                      </h3>

                      <p
                        className="mt-3 text-sm"
                      >
                        {
                          item.category
                        }
                      </p>

                    </div>
                  </article>
                )
              )}
            </div>

          </div>
        </section>

        {/* TIMELINE */}
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
                    key={item.title}
                    className="card-surface p-5 md:p-6"
                  >

                    <p
                      style={{
                        color:
                          'var(--color-primary)',
                        fontSize:
                          '.75rem',
                        letterSpacing:
                          '.15em',
                      }}
                    >
                      {
                        item.year
                      }
                    </p>

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
                      {
                        item.title
                      }
                    </h3>

                    <p
                      className="mt-3 text-sm"
                    >
                      {
                        item.desc
                      }
                    </p>

                  </div>
                )
              )}

            </div>

          </div>
        </section>

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
                      {
                        item.number
                      }
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
                      {
                        item.label
                      }
                    </p>

                  </div>
                )
              )}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section
          className="relative overflow-hidden"
          style={{
            padding:
              '6rem 0',
          }}
        >

          <div className="absolute inset-0">

            <img
              src="/images/about-office.png"
              alt=""
              className="w-full h-full object-cover"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  'rgba(13,13,13,.87)',
              }}
            />

          </div>

          <div className="container-wide relative z-10 text-center px-5">

            <Reveal>
              <span className="section-label justify-center">
                Build With Us
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="section-heading mt-3">
                Let’s Create
                <span>
                  The Next Recognition
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10">

                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  Start a Conversation
                </Link>

              </div>
            </Reveal>

          </div>

        </section>

      </main>
    </>
  );
}