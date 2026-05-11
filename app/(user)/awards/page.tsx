import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../../../components/user/pageHero';
import AwardsPageClient from './awardsPageClient';

/* ─── SEO Metadata ───────────────────────────────────────── */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tougharchitects.com';

export const metadata: Metadata = {
  title: 'Awards & Recognition — 18 Industry Honours',
  description:
    'TOUGH Architects has received 18 international design awards, including AIA Awards of Merit, RIBA recognition, Dezeen Awards, and Architectural Review honours. Explore our award-winning projects.',
  keywords: [
    'architecture awards',
    'AIA award architecture',
    'RIBA award winner',
    'Dezeen architecture award',
    'award-winning architect New York',
    'Architectural Review award',
    'architecture firm recognition',
    'best architecture firm awards',
    'design excellence award',
    'green building award',
  ],
  alternates: {
    canonical: `${siteUrl}/awards`,
  },
  openGraph: {
    title: 'Awards & Recognition — TOUGH Architects',
    description:
      '18 international design awards across residential, commercial, and cultural architecture. Discover the projects that earned global recognition.',
    url: `${siteUrl}/awards`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-awards.jpg`,
        width: 1200,
        height: 630,
        alt: 'TOUGH Architects award-winning architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awards & Recognition — TOUGH Architects',
    description: '18 international design awards including AIA, RIBA, and Dezeen honours. Explore our award-winning projects.',
    images: [`${siteUrl}/og-awards.jpg`],
  },
};

/* ─── Types ──────────────────────────────────────────────── */
interface Award {
  id: string;
  title: string;
  slug: string;
  organization: string | null;
  description: string | null;
  year: number | null;
  location: string | null;
  image: string | null;
  category: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ─── Data Fetching ──────────────────────────────────────── */
async function getAwards(): Promise<Award[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/awards`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? (json.data as Award[]).filter((a) => a.published) : [];
  } catch {
    return [];
  }
}

/* ─── Static fallback data (used only if no DB awards exist) */
const pressQuotes = [
  {
    quote: 'TOUGH Architects consistently produces work of rare intelligence and emotional depth.',
    source: 'Dezeen Magazine',
    year: '2023',
  },
  {
    quote: 'Among the most important practices of their generation — technically precise, artistically fearless.',
    source: 'Architectural Review',
    year: '2022',
  },
  {
    quote: 'A body of work that will be studied for decades. Simply exceptional.',
    source: 'AIA Journal',
    year: '2022',
  },
];

/* ─── Server Component ───────────────────────────────────── */
export default async function AwardsPage() {
  const awards = await getAwards();
  
  const featuredAwards = awards.filter((a) => a.featured);
  const totalAwards = awards.length;
  const organizations = [...new Set(awards.map((a) => a.organization).filter(Boolean))];
  const categories = [...new Set(awards.map((a) => a.category).filter(Boolean))];
  const years = awards.map((a) => a.year).filter(Boolean) as number[];
  const earliestYear = years.length ? Math.min(...years) : null;
  const yearsOfRecognition = earliestYear ? new Date().getFullYear() - earliestYear : null;

  /* Org summary for the top grid */
  const orgMap: Record<string, number> = {};
  awards.forEach((a) => {
    if (a.organization) orgMap[a.organization] = (orgMap[a.organization] || 0) + 1;
  });
  const topOrgs = Object.entries(orgMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/awards`,
    name: 'Awards & Recognition — TOUGH Architects',
    url: `${siteUrl}/awards`,
    description: "A full record of TOUGH Architects' industry awards and honours.",
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Awards & Recognition', item: `${siteUrl}/awards` },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Architecture Awards Won by TOUGH Architects',
      numberOfItems: totalAwards,
      itemListElement: awards.slice(0, 5).map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${a.organization} — ${a.title} ${a.year ?? ''}`.trim(),
      })),
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        <AwardsPageClient>
          <PageHero
            label="Recognition"
            title={`${totalAwards > 0 ? totalAwards : 18} Awards for`}
            titleAccent="Design Excellence"
            subtitle="Four decades of architectural ambition, recognised by the world's most respected design institutions — from the AIA to RIBA, Dezeen, and beyond."
            image="/images/about-office.png"
            imageAlt="Award-winning TOUGH Architects commercial architecture interior"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Awards & Recognition' }]}
          />
        </AwardsPageClient>

        {/* ── Award Bodies Overview ── */}
        {topOrgs.length > 0 && (
          <AwardsPageClient delay={0.1}>
            <section
              className="section-dark2"
              style={{ padding: '5rem 0', borderBottom: '1px solid var(--color-dark4)' }}
              aria-label="Award bodies overview"
            >
              <div className="container-wide">
                <div
                  className={`grid gap-px ${topOrgs.length === 1 ? 'md:grid-cols-1' : topOrgs.length === 2 ? 'md:grid-cols-2' : topOrgs.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4'}`}
                  style={{ background: 'var(--color-dark4)' }}
                >
                  {topOrgs.map(([org, count]) => (
                    <div key={org} className="service-card text-center" style={{ padding: '2.5rem 1.75rem' }}>
                      <p style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '2.8rem',
                        fontWeight: 300,
                        color: 'var(--color-primary)',
                        lineHeight: 1,
                        marginBottom: '0.5rem',
                      }}>
                        {count}
                      </p>
                      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '0.35rem' }}>
                        {org} Award{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AwardsPageClient>
        )}

        {/* ── Featured Awards ── */}
        {featuredAwards.length > 0 && (
          <AwardsPageClient delay={0.2}>
            <section
              className="section-dark"
              style={{ padding: 'var(--section-py) 0' }}
              aria-labelledby="featured-awards-heading"
            >
              <div className="container-wide">
                <div className="mb-14">
                  <span className="section-label">Highlights</span>
                  <h2 id="featured-awards-heading" className="section-heading mt-2">
                    Landmark <span>Award Wins</span>
                  </h2>
                  <span className="gold-divider" />
                </div>

                <div className="space-y-px" style={{ background: 'var(--color-dark4)' }}>
                  {featuredAwards.map((award, i) => (
                    <AwardsPageClient
                      key={award.id}
                      delay={i * 0.15}
                      direction={i % 2 ? 'up' : 'down'}
                    >
                      <article
                        className="group relative overflow-hidden"
                        style={{ background: 'var(--color-dark3)' }}
                        aria-label={`${award.title} — ${award.organization ?? ''}`}
                      >
                        <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}>

                          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '280px' }}>
                            <Image
                              src={award.image || '/images/about-office.png'}
                              alt={`${award.title} — ${award.organization ?? 'award'}`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.3)' }} />

                            {award.year && (
                              <div className="absolute top-5 left-5"
                                style={{
                                  background: 'var(--color-primary)',
                                  color: 'var(--color-dark)',
                                  padding: '0.4rem 0.85rem',
                                  fontFamily: 'var(--font-dm-mono)',
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  letterSpacing: '0.08em',
                                }}
                              >
                                {award.year}
                              </div>
                            )}
                          </div>

                          <div className="p-8 lg:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                              {award.organization && (
                                <div style={{
                                  padding: '0.3rem 0.8rem',
                                  border: '1px solid var(--color-primary)',
                                  fontFamily: 'var(--font-raleway)',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  letterSpacing: '0.25em',
                                  textTransform: 'uppercase',
                                  color: 'var(--color-primary)',
                                }}>
                                  {award.organization}
                                </div>
                              )}
                              {award.category && (
                                <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                                  {award.category}
                                </span>
                              )}
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'var(--color-white)', lineHeight: 1.25, marginBottom: '0.6rem' }}>
                              {award.title}
                            </h3>

                            {award.location && (
                              <div className="flex items-center gap-2 mb-4">
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{award.location}</span>
                              </div>
                            )}

                            {award.description && (
                              <p style={{ fontSize: '0.83rem', lineHeight: '1.85', color: 'var(--color-muted)' }}>
                                {award.description}
                              </p>
                            )}

                            <Link href="/portfolio" className="mt-6 inline-flex items-center gap-2"
                              style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)', transition: 'gap 0.2s ease' }}>
                              <span>View Projects</span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    </AwardsPageClient>
                  ))}
                </div>
              </div>
            </section>
          </AwardsPageClient>
        )}

        {/* ── Press Quotes ── */}
        <AwardsPageClient delay={0.3}>
          <section
            className="relative overflow-hidden"
            style={{ padding: '5rem 0' }}
            aria-label="Press recognition quotes"
          >
            <div className="absolute inset-0">
              <img src="/images/about-office.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.91)' }} />
            </div>
            <div className="container-wide relative z-10">
              <div className="text-center mb-10">
                <span className="section-label justify-center">Press</span>
                <h2 className="section-heading">
                  What the Critics <span>Say</span>
                </h2>
                <span className="gold-divider mx-auto" />
              </div>
              <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {pressQuotes.map((q, i) => (
                  <blockquote
                    key={i}
                    className="p-8 text-center"
                    style={{ background: 'rgba(13,13,13,0.6)', backdropFilter: 'blur(8px)' }}
                  >
                    <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', color: 'var(--color-primary)', opacity: 0.4, lineHeight: 1, display: 'block', marginBottom: '0.5rem' }}>
                      
                    </span>
                    <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--color-light2)' }}>
                      {q.quote}
                    </p>
                    <footer className="mt-5">
                      <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                        {q.source}
                      </p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--color-muted)', marginTop: '2px' }}>{q.year}</p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        </AwardsPageClient>

        {/* ── Full Awards Table ── */}
        {awards.length > 0 && (
          <AwardsPageClient delay={0.4}>
            <section
              className="section-dark2"
              style={{ padding: 'var(--section-py) 0' }}
              aria-labelledby="all-awards-heading"
            >
              <div className="container-wide">
                <div className="mb-12">
                  <span className="section-label">Complete Record</span>
                  <h2 id="all-awards-heading" className="section-heading mt-2">
                    Full Awards <span>History</span>
                  </h2>
                  <span className="gold-divider" />
                  {earliestYear && (
                    <p className="mt-4" style={{ fontSize: '0.85rem' }}>
                      Every award received since our first recognition in {earliestYear} — a full {yearsOfRecognition}+ year record of industry acknowledgement.
                    </p>
                  )}
                </div>

                <div className="overflow-x-auto" role="region" aria-label="Awards table">
                  <table
                    className="w-full border-collapse"
                    style={{ borderColor: 'var(--color-dark4)' }}
                    aria-label="Complete list of awards"
                  >
                    <thead>
                      <tr style={{ background: 'var(--color-dark3)', borderBottom: '2px solid var(--color-primary)' }}>
                        {['Year', 'Award Body', 'Award', 'Location', 'Category'].map(h => (
                          <th
                            key={h}
                            scope="col"
                            style={{
                              padding: '1rem 1.25rem',
                              textAlign: 'left',
                              fontFamily: 'var(--font-raleway)',
                              fontSize: '0.6rem',
                              fontWeight: 700,
                              letterSpacing: '0.25em',
                              textTransform: 'uppercase',
                              color: 'var(--color-muted)',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {awards
                        .slice()
                        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
                        .map((award, i) => (
                          <tr
                            key={award.id}
                            style={{
                              borderBottom: '1px solid var(--color-dark4)',
                              background: i % 2 === 0 ? 'transparent' : 'rgba(31,31,31,0.4)',
                            }}
                          >
                            <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                              {award.year ?? '—'}
                            </td>
                            <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-white)', whiteSpace: 'nowrap' }}>
                              {award.organization ?? '—'}
                            </td>
                            <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-light2)' }}>
                              {award.title}
                            </td>
                            <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                              {award.location ?? '—'}
                            </td>
                            <td style={{ padding: '1rem 1.25rem' }}>
                              {award.category && (
                                <span style={{
                                  padding: '0.2rem 0.6rem',
                                  border: '1px solid var(--color-dark4)',
                                  fontSize: '0.6rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.15em',
                                  textTransform: 'uppercase',
                                  color: 'var(--color-muted)',
                                  whiteSpace: 'nowrap',
                                }}>
                                  {award.category}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </AwardsPageClient>
        )}

        {/* ── Why Awards Matter ── */}
        <AwardsPageClient delay={0.5}>
          <section
            className="section-dark"
            style={{ padding: 'var(--section-py) 0' }}
            aria-labelledby="process-heading"
          >
            <div className="container-wide">
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div>
                  <span className="section-label">Our Standard</span>
                  <h2 id="process-heading" className="section-heading mt-2">
                    Why Awards <span>Matter</span> to Us
                  </h2>
                  <span className="gold-divider" />
                  <p className="mt-6" style={{ fontSize: '0.9rem', lineHeight: '1.95' }}>
                    We don&apos;t pursue awards for prestige alone. Industry recognition puts our work
                    under independent expert scrutiny — and that scrutiny makes us better. It validates
                    our commitment to architectural excellence on behalf of our clients and communities.
                  </p>
                  <p className="mt-4" style={{ fontSize: '0.9rem', lineHeight: '1.95' }}>
                    Each award submission is a rigorous exercise in architectural self-evaluation:
                    Why does this building matter? Who does it serve? What did it teach us? Those
                    questions sharpen every project that follows.
                  </p>
                  <p className="mt-4" style={{ fontSize: '0.9rem', lineHeight: '1.95' }}>
                    Most importantly, awards create visibility for the kind of architecture we believe
                    in — human-centred, sustainable, enduring — and help clients who share those values
                    find us.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href="/portfolio" className="btn-primary inline-flex items-center gap-3">
                      <span>Explore Our Projects</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href="/about" className="btn-outline inline-flex items-center gap-3">
                      <span>Our Story</span>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--color-dark4)' }}>
                  {[
                    { n: totalAwards > 0 ? String(totalAwards) : '18', label: 'Total Awards', sub: earliestYear ? `Since ${earliestYear}` : 'Industry recognition' },
                    { n: organizations.length > 0 ? String(organizations.length) : '6', label: 'Award Bodies', sub: organizations.slice(0, 3).join(' · ') || 'AIA · RIBA · Dezeen & more' },
                    { n: categories.length > 0 ? String(categories.length) : '5', label: 'Categories', sub: `Across ${categories.length || 5} categories` },
                    { n: yearsOfRecognition ? `${yearsOfRecognition}+` : '25+', label: 'Years of Recognition', sub: 'Consistent excellence' },
                  ].map(s => (
                    <div key={s.label} className="card-surface p-8 text-center">
                      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
                        {s.n}
                      </p>
                      <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-white)', marginTop: '0.5rem' }}>
                        {s.label}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                        {s.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AwardsPageClient>

        {/* ── CTA ── */}
        <AwardsPageClient delay={0.6}>
          <section
            className="section-dark2"
            style={{ padding: '5rem 0', borderTop: '1px solid var(--color-dark4)' }}
            aria-label="Contact call to action"
          >
            <div className="container-wide text-center">
              <h2 className="section-heading">
                Ready to Build Something <span>Award-Worthy?</span>
              </h2>
              <p className="mt-5 max-w-lg mx-auto" style={{ fontSize: '0.9rem' }}>
                Great architecture begins with the right conversation. Let&apos;s talk about your project.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-3">
                  <span>Start Your Project</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/about" className="btn-outline inline-flex items-center gap-3">
                  <span>Meet the Team</span>
                </Link>
              </div>
            </div>
          </section>
        </AwardsPageClient>
      </main>
    </>
  );
}