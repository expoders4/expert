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
            image="/images/award-banner.png"
            imageAlt="Award-winning TOUGH Architects commercial architecture interior"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Awards & Recognition' }]}
          />
        </AwardsPageClient>

        {/* ── Award Bodies Overview ── */}
        {Array.isArray(awards) && awards.length > 0 && (
          <AwardsPageClient delay={0.1}>
            <section
              className="section-dark2"
              style={{
                padding: "5rem 0",
                borderBottom: "1px solid var(--color-dark4)",
              }}
              aria-label="Awards"
            >
              <div className="container-wide">
                <div className="row">

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {awards.map((award: any) => (
                      <Link
                        key={award.id}
                        href={`/awards/${award.slug}`}
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
                              backgroundImage: `url(${award.image})`,
                            }}
                          />

                          {/* Featured Badge */}
                          {award.featured && (
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
                              {award.organization}
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
                                {award.title}
                              </h3>
                            </div>
                          </div>

                        </div>
                      </Link>
                    ))}
                  </div>

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

      </main>
    </>
  );
}