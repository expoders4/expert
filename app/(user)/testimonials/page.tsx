import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '../../../components/user/pageHero';
import { Reveal } from '../../../components/animations';


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tougharchitects.com';


export const metadata: Metadata = {
  title: 'Client Testimonials — Trust Built Through Design',
  description:
    'Read what homeowners, developers, hospitality brands, and global partners say about working with TOUGH Architects.',

  keywords: [
    'architect client reviews India',
    'architecture firm testimonials',
    'TOUGH Architects reviews',
    'client feedback architecture',
    'residential architecture reviews',
    'interior design testimonials',
  ],

  alternates: {
    canonical: `${siteUrl}/testimonials`,
  },

  openGraph: {
    title:
      'TOUGH Architects Client Testimonials',

    description:
      'Real stories from clients across residential, hospitality, commercial and cultural projects.',

    url: `${siteUrl}/testimonials`,
    type: 'website',
  },
};


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'TOUGH Architects Testimonials',
  url: `${siteUrl}/testimonials`,
};


const stats = [
  {
    number: '520+',
    label: 'Projects Delivered',
  },
  {
    number: '96%',
    label: 'Repeat Clients',
  },
  {
    number: '28',
    label: 'Countries',
  },
  {
    number: '40+',
    label: 'Years of Practice',
  },
];


/* ─── Types ──────────────────────────────────────────────── */
interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

/* ─── Data Fetching ──────────────────────────────────────── */
async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/testimonials`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success
      ? (json.data as Testimonial[])
          .filter((t) => t.published)
          .sort((a, b) => a.sortOrder - b.sortOrder)
      : [];
  } catch {
    return [];
  }
}


export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main>

        {/* HERO */}
        <PageHero
          label="Client Stories"
          title="Built On"
          titleAccent="Trust"
          subtitle="The most meaningful measure of our work is the relationships it creates."
          image="/images/about-office.png"
          imageAlt="TOUGH Architects client meeting"
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Testimonials',
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
          <div className="container-wide text-center max-w-4xl">

            <Reveal>
              <span className="section-label justify-center">
                Our Clients
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="section-heading mt-3">
                Relationships That
                <span>
                  Endure
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-6"
                style={{
                  fontSize:
                    '.92rem',
                  lineHeight:
                    '1.9',
                }}
              >
                For over four decades,
                our work has been shaped
                by collaboration,
                trust, and a shared belief
                in creating spaces
                that matter.
              </p>
            </Reveal>

          </div>
        </section>



        {/* TESTIMONIAL GRID */}
        {testimonials.length > 0 && (
          <section
            className="section-dark"
            style={{
              padding:
                'var(--section-py) 0',
            }}
          >
            <div className="container-wide">

              <div
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-px"
              >
                {testimonials.map(
                  (item) => (
                    <article
                      key={item.id}
                      className="service-card"
                      style={{
                        padding:
                          '2.5rem',
                      }}
                    >

                      <p
                        style={{
                          fontSize:
                            '3rem',
                          color:
                            'var(--color-primary)',
                          lineHeight:
                            1,
                        }}
                      >
                        "
                      </p>


                      <p
                        style={{
                          fontSize:
                            '.85rem',
                          lineHeight:
                            '1.9',
                        }}
                      >
                        {item.content}
                      </p>


                      <div
                        className="mt-8"
                      >
                        <h3
                          style={{
                            fontFamily:
                              'var(--font-playfair)',
                            color:
                              'white',
                            fontSize:
                              '1rem',
                          }}
                        >
                          {item.name}
                        </h3>

                        {(item.role || item.company) && (
                          <p
                            style={{
                              color:
                                'var(--color-primary)',
                              fontSize:
                                '.7rem',
                              letterSpacing:
                                '.15em',
                              marginTop:
                                '.5rem',
                            }}
                          >
                            {[item.role, item.company].filter(Boolean).join(', ')}
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



        {/* STATS */}
        <section
          className="section-dark2"
          style={{
            padding:
              '5rem 0',
          }}
        >
          <div className="container-wide">

            <div
              className="grid md:grid-cols-4 gap-px"
            >
              {stats.map(
                (item) => (
                  <div
                    key={item.label}
                    className="text-center p-8"
                  >

                    <h3
                      style={{
                        fontFamily:
                          'var(--font-playfair)',
                        fontSize:
                          '2.4rem',
                        color:
                          'var(--color-primary)',
                      }}
                    >
                      {item.number}
                    </h3>

                    <p
                      className="mt-2"
                      style={{
                        fontSize:
                          '.75rem',
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


          <div className="container-wide relative z-10 text-center">

            <Reveal>
              <span className="section-label justify-center">
                Start Your Story
              </span>
            </Reveal>


            <Reveal delay={0.2}>
              <h2 className="section-heading mt-3">
                Let's Create
                <span>
                  Something Extraordinary
                </span>
              </h2>
            </Reveal>


            <Reveal delay={0.3}>
              <p
                className="mt-5 max-w-lg mx-auto"
                style={{
                  fontSize:
                    '.9rem',
                }}
              >
                The next story
                we tell
                could be yours.
              </p>
            </Reveal>


            <Reveal delay={0.4}>
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