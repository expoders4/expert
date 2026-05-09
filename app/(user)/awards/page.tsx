
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

/* ─── JSON-LD ────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/awards`,
  name: 'Awards & Recognition — TOUGH Architects',
  url: `${siteUrl}/awards`,
  description: 'A full record of TOUGH Architects\' industry awards and honours.',
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
    numberOfItems: 18,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AIA Award of Merit — Marble Peak Residence 2023' },
      { '@type': 'ListItem', position: 2, name: 'Dezeen Awards — Residential Shortlist 2023' },
      { '@type': 'ListItem', position: 3, name: 'RIBA International Prize — Volta Cultural Centre 2022' },
      { '@type': 'ListItem', position: 4, name: 'Architectural Review MIPIM Award 2022' },
      { '@type': 'ListItem', position: 5, name: 'AIA Award of Excellence — The Obsidian Tower 2022' },
    ],
  },
};

/* ─── Award Data ─────────────────────────────────────────── */
const featuredAwards = [
  {
    id: 1,
    year: '2023',
    body: 'AIA',
    fullBody: 'American Institute of Architects',
    award: 'Award of Merit — Architecture',
    project: 'Marble Peak Residence',
    location: 'Aspen, Colorado',
    category: 'Residential',
    image: '/images/about-office.png',
    desc: 'Recognised for outstanding contribution to residential design through the seamless integration of natural materials, passive solar strategy, and mountain topography.',
    featured: true,
  },
  {
    id: 2,
    year: '2023',
    body: 'Dezeen',
    fullBody: 'Dezeen Awards',
    award: 'Residential Building of the Year — Shortlist',
    project: 'Harbour House',
    location: 'Sydney, Australia',
    category: 'Residential',
    image: '/images/about-office.png',
    desc: 'Shortlisted for the most prestigious design journalism award globally, praised for its innovative response to Sydney\'s coastal context and passive cooling strategy.',
    featured: true,
  },
  {
    id: 3,
    year: '2022',
    body: 'RIBA',
    fullBody: 'Royal Institute of British Architects',
    award: 'International Prize — Shortlisted',
    project: 'Volta Cultural Centre',
    location: 'Lisbon, Portugal',
    category: 'Cultural',
    image: '/images/about-office.png',
    desc: 'The RIBA\'s most distinguished international honour, awarded annually to a single building of extraordinary architectural ambition, significance and performance.',
    featured: true,
  },
  {
    id: 4,
    year: '2022',
    body: 'AIA',
    fullBody: 'American Institute of Architects',
    award: 'Award of Excellence — Commercial',
    project: 'The Obsidian Tower',
    location: 'Manhattan, New York',
    category: 'Commercial',
    image: '/images/about-office.png',
    desc: 'The highest AIA recognition for commercial architecture, commending the Obsidian Tower\'s bold structural expression and industry-leading sustainability performance.',
    featured: false,
  },
];

const allAwards = [
  { year: '2023', body: 'AIA', award: 'Award of Merit — Architecture', project: 'Marble Peak Residence', category: 'Residential' },
  { year: '2023', body: 'Dezeen Awards', award: 'Residential Building — Shortlist', project: 'Harbour House', category: 'Residential' },
  { year: '2023', body: 'Architectural Review', award: 'AR House Award', project: 'Kyoto Wellness Retreat', category: 'Interior' },
  { year: '2022', body: 'RIBA', award: 'International Prize Shortlist', project: 'Volta Cultural Centre', category: 'Cultural' },
  { year: '2022', body: 'AIA', award: 'Award of Excellence — Commercial', project: 'The Obsidian Tower', category: 'Commercial' },
  { year: '2022', body: 'Architectural Review', award: 'MIPIM Award — Best Commercial', project: 'Zenith Office Campus', category: 'Commercial' },
  { year: '2021', body: 'AIA', award: 'Award of Merit — Interior Architecture', project: 'Kyoto Wellness Retreat', category: 'Interior' },
  { year: '2021', body: 'Dezeen Awards', award: 'Interior of the Year — Shortlist', project: 'Marble Peak Residence', category: 'Residential' },
  { year: '2020', body: 'LEED', award: 'Platinum Certification', project: 'Zenith Office Campus', category: 'Sustainable' },
  { year: '2020', body: 'AIA', award: 'Housing Award', project: 'Harbour House', category: 'Residential' },
  { year: '2019', body: 'Architectural Review', award: 'Emerging Architecture Award', project: 'Priya Anand (Associate)', category: 'People' },
  { year: '2018', body: 'RIBA', award: 'Regional Award — London Region', project: 'Camden Cultural Hub', category: 'Cultural' },
  { year: '2017', body: 'AIA New York', award: 'Design Award — Residential', project: 'The Glass Farmhouse', category: 'Residential' },
  { year: '2016', body: 'Green Building Council', award: 'Best Sustainable Design', project: 'Meridian Offices', category: 'Sustainable' },
  { year: '2014', body: 'RIBA', award: 'International Award', project: 'Biarritz Cultural Pavilion', category: 'Cultural' },
  { year: '2012', body: 'AIA', award: 'Award of Merit', project: 'Hudson River Residence', category: 'Residential' },
  { year: '2008', body: 'Architectural Review', award: 'Building of the Year — Civic', project: 'Riverside Civic Hall', category: 'Cultural' },
  { year: '1999', body: 'AIA', award: 'Award of Merit — First Recognition', project: 'Halcyon House', category: 'Residential' },
];

const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Interior', 'Sustainable', 'People'];

const awardBodies = [
  { name: 'AIA', full: 'American Institute of Architects', count: 7, desc: 'The premier US architecture professional body.' },
  { name: 'RIBA', full: 'Royal Institute of British Architects', count: 4, desc: 'The UK\'s leading architecture institution since 1834.' },
  { name: 'Dezeen', full: 'Dezeen Awards', count: 3, desc: 'The world\'s most influential architecture & design media.' },
  { name: 'AR', full: 'Architectural Review', count: 4, desc: 'The oldest international architecture magazine, founded 1896.' },
];

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
export default function AwardsPage() {
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
            title="18 Awards for"
            titleAccent="Design Excellence"
            subtitle="Four decades of architectural ambition, recognised by the world's most respected design institutions — from the AIA to RIBA, Dezeen, and beyond."
            image="/images/about-office.png"
            imageAlt="Award-winning TOUGH Architects commercial architecture interior"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Awards & Recognition' }]}
          />
        </AwardsPageClient>
        <AwardsPageClient delay={0.1}>
          <section
            className="section-dark2"
            style={{ padding: '5rem 0', borderBottom: '1px solid var(--color-dark4)' }}
            aria-label="Award bodies overview"
          >
            <div className="container-wide">
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px" style={{ background: 'var(--color-dark4)' }}>
                {awardBodies.map((body) => (
                  <div key={body.name} className="service-card text-center" style={{ padding: '2.5rem 1.75rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '2.8rem',
                      fontWeight: 300,
                      color: 'var(--color-primary)',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                    }}>
                      {body.count}
                    </p>
                    <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '0.35rem' }}>
                      {body.name} Awards
                    </p>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                      {body.full}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: '1.7' }}>
                      {body.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AwardsPageClient>
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
                    direction={i % 2 ? "up" : "down"}
                  >
                    <article
                      className="group relative overflow-hidden"
                      style={{ background: 'var(--color-dark3)' }}
                      aria-label={`${award.award} — ${award.project}`}
                    >
                      <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}>

                        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '280px' }}>
                          <Image
                            src={award.image}
                            alt={`${award.project} — ${award.award}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.3)' }} />

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
                        </div>

                        <div className="p-8 lg:p-10 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-4">
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
                              {award.body}
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                              {award.category}
                            </span>
                          </div>

                          <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'var(--color-white)', lineHeight: 1.25, marginBottom: '0.6rem' }}>
                            {award.award}
                          </h3>

                          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            {award.fullBody}
                          </p>

                          <div className="flex items-center gap-2 mb-4">
                            <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--color-light2)' }}>
                              {award.project}
                            </span>
                            <span style={{ color: 'var(--color-muted2)' }}>·</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{award.location}</span>
                          </div>

                          <p style={{ fontSize: '0.83rem', lineHeight: '1.85', color: 'var(--color-muted)' }}>
                            {award.desc}
                          </p>

                          <Link href="/portfolio" className="mt-6 inline-flex items-center gap-2"
                            style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)', transition: 'gap 0.2s ease' }}>
                            <span>View Project</span>
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
                <p className="mt-4" style={{ fontSize: '0.85rem' }}>
                  Every award received since our first AIA recognition in 1999 — a full 25-year record of industry acknowledgement.
                </p>
              </div>

              <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Award category filters">
                {categories.map(cat => (
                  <span
                    key={cat}
                    style={{
                      padding: '0.35rem 0.9rem',
                      border: `1px solid ${cat === 'All' ? 'var(--color-primary)' : 'var(--color-dark4)'}`,
                      background: cat === 'All' ? 'var(--color-primary)' : 'transparent',
                      color: cat === 'All' ? 'var(--color-dark)' : 'var(--color-muted)',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-raleway)',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      cursor: 'default',
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="overflow-x-auto" role="region" aria-label="Awards table">
                <table
                  className="w-full border-collapse"
                  style={{ borderColor: 'var(--color-dark4)' }}
                  aria-label="Complete list of TOUGH Architects awards"
                >
                  <thead>
                    <tr style={{ background: 'var(--color-dark3)', borderBottom: '2px solid var(--color-primary)' }}>
                      {['Year', 'Award Body', 'Award', 'Project', 'Category'].map(h => (
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
                    {allAwards.map((award, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid var(--color-dark4)',
                          background: i % 2 === 0 ? 'transparent' : 'rgba(31,31,31,0.4)',
                          transition: 'background 0.2s ease',
                        }}
                      // onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.05)')}
                      // onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(31,31,31,0.4)')}
                      >
                        <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {award.year}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-white)', whiteSpace: 'nowrap' }}>
                          {award.body}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-light2)' }}>
                          {award.award}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                          {award.project}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </AwardsPageClient>
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
                    { n: '18', label: 'Total Awards', sub: 'Since 1999' },
                    { n: '6', label: 'Award Bodies', sub: 'AIA · RIBA · Dezeen & more' },
                    { n: '12', label: 'Winning Projects', sub: 'Across 5 categories' },
                    { n: '25+', label: 'Years of Recognition', sub: 'Consistent excellence' },
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