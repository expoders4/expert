import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../../../components/user/pageHero';
import StatsSection from '../../../components/user/StatsSection';
import TestimonialsSection from '../../../components/user/TestimonialsSection';
import { HoverCard, ParallaxImage, Reveal, Stagger } from '../../../components/animations';
import prisma from '../../../lib/prisma';
import { cache } from 'react';

/* ─── SEO Metadata ───────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'About Us — Our Story, Team & Vision',
  description:
    'Founded in 1984, TOUGH Architects is a globally recognised practice of 85 architects, designers and engineers. Discover our story, philosophy, leadership team, and four-decade legacy of architectural excellence.',
  keywords: [
    'about tough architects',
    'architecture firm history',
    'architectural firm team',
    'architect biography',
    'architecture studio story',
    'design philosophy architecture',
    'sustainable architecture firm',
    'award-winning architects',
    'architecture firm New York',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },
  openGraph: {
    title: 'About TOUGH Architects — Our Story, Team & Vision',
    description:
      'Founded in 1984, TOUGH Architects is a globally recognised practice of 85 architects, designers and engineers. Discover four decades of architectural excellence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'TOUGH Architects team and studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TOUGH Architects — Our Story, Team & Vision',
    description: 'Founded in 1984, TOUGH Architects has grown into a globally recognised architectural practice with a four-decade legacy of design excellence.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-about.jpg`],
  },
};

/* ─── JSON-LD for About page ─────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  name: 'About TOUGH Architects',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  description: 'The story, team, and philosophy of TOUGH Architects — founded 1984.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${process.env.NEXT_PUBLIC_SITE_URL}/about` },
    ],
  },
  mainEntity: {
    '@type': 'Organization',
    name: 'TOUGH Architects',
    foundingDate: '1984',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 85 },
    founder: {
      '@type': 'Person',
      name: 'Marcus Holt',
      jobTitle: 'Founder & Principal Architect',
    },
    member: [
      { '@type': 'Person', name: 'Marcus Holt', jobTitle: 'Founder & Principal Architect' },
      { '@type': 'Person', name: 'Elena Varga', jobTitle: 'Creative Director' },
      { '@type': 'Person', name: 'James Osei', jobTitle: 'Head of Sustainability' },
      { '@type': 'Person', name: 'Naomi Takahashi', jobTitle: 'Interior Design Lead' },
      { '@type': 'Person', name: 'Rafael Cruz', jobTitle: 'Technical Director' },
      { '@type': 'Person', name: 'Priya Anand', jobTitle: 'Associate Partner' },
    ],
  },
};

/* ─── Team Data ──────────────────────────────────────────── */
const team = [
  {
    name: 'Marcus Holt',
    role: 'Founder & Principal Architect',
    bio: 'Yale School of Architecture graduate with 40 years of practice across 28 countries. Marcus\'s work blends structural rigour with poetic sensitivity.',
    image: '/images/about-office.png',
    quals: ['M.Arch, Yale University', 'AIA Fellow', 'RIBA Honorary Member'],
    social: { li: '#', ig: '#' },
  },
  {
    name: 'Elena Varga',
    role: 'Creative Director',
    bio: 'A Budapest-born designer whose spatial compositions have won the RIBA Stirling shortlist twice. Elena leads concept development across all studio projects.',
    image: '/images/about-office.png',
    quals: ['M.Arch, TU Budapest', 'RIBA Chartered', 'Dezeen Award Winner'],
    social: { li: '#', ig: '#' },
  },
  {
    name: 'James Osei',
    role: 'Head of Sustainability',
    bio: 'A LEED Fellow and passive-house specialist, James leads our commitment to net-zero design. His work has reduced embodied carbon by an average of 42% per project.',
    image: '/images/about-office.png',
    quals: ['LEED Fellow', 'Passive House Certified', 'MSc Environmental Design'],
    social: { li: '#', ig: '#' },
  },
  {
    name: 'Naomi Takahashi',
    role: 'Interior Design Lead',
    bio: 'Trained in Tokyo and Milan, Naomi brings an East-meets-West sensibility to our interiors — known for her mastery of light, texture, and material storytelling.',
    image: '/images/about-office.png',
    quals: ['BFA Interior Design, Parsons', 'NCIDQ Certified', 'Elle Décor A-List 2023'],
    social: { li: '#', ig: '#' },
  },
  {
    name: 'Rafael Cruz',
    role: 'Technical Director',
    bio: 'With 22 years of structural and delivery experience, Rafael ensures every project is buildable, code-compliant, and completed without compromise to the design intent.',
    image: '/images/about-office.png',
    quals: ['PE, Structural Engineering', 'LEED AP BD+C', 'MSc Construction Management'],
    social: { li: '#', ig: '#' },
  },
  {
    name: 'Priya Anand',
    role: 'Associate Partner',
    bio: 'Priya leads our residential and hospitality portfolio, managing client relationships from initial brief through to post-occupancy. A rising voice in contemporary design.',
    image: '/images/about-office.png',
    quals: ['B.Arch, IIT Bombay', 'M.Arch, UCL Bartlett', 'Architectural Review 40 Under 40'],
    social: { li: '#', ig: '#' },
  },
];

/* ─── Values Data ────────────────────────────────────────── */
const values = [
  {
    number: '01',
    title: 'Human-Centred Design',
    desc: 'Every decision begins and ends with the people who will inhabit our spaces. Architecture exists to serve human life — not impress it.',
  },
  {
    number: '02',
    title: 'Material Honesty',
    desc: 'We believe in truth through material — exposed concrete, raw timber, aged steel. Beauty is inherent in authenticity, not applied through decoration.',
  },
  {
    number: '03',
    title: 'Sustainable by Default',
    desc: 'Sustainability is not a feature; it\'s the foundation. Every project targets net-zero operations and minimised embodied carbon from day one.',
  },
  {
    number: '04',
    title: 'Craft Over Speed',
    desc: 'Great architecture cannot be rushed. We take time to detail every joint, every threshold, every transition — because those are the moments people feel.',
  },
];

/* ─── Timeline Milestones ────────────────────────────────── */
const milestones = [
  { year: '1984', title: 'Studio Founded', desc: 'Marcus Holt opens a two-person studio in Manhattan\'s Garment District.' },
  { year: '1991', title: 'First International Work', desc: 'Commissioned for the Biarritz Cultural Pavilion — our first European project.' },
  { year: '1999', title: 'AIA Award', desc: 'The Halcyon House wins our first American Institute of Architects Award of Merit.' },
  { year: '2006', title: 'Sustainability Pivot', desc: 'We become one of the first NYC firms to commit to 100% LEED-certified project delivery.' },
  { year: '2012', title: 'Studio Expansion', desc: 'New studio opens in London, doubling our European project capacity.' },
  { year: '2018', title: 'RIBA International Prize', desc: 'The Volta Cultural Centre shortlisted for the RIBA International Prize.' },
  { year: '2023', title: 'Net-Zero Pledge', desc: 'All new projects committed to achieving net-zero operational carbon by handover.' },
];

/* ─── Partners / Clients ─────────────────────────────────── */
const partners = ['Heatherwick Studio', 'Arup Engineering', 'Vitra', 'Knoll', 'Cassina', 'Fritz Hansen', 'Interface', 'Bolon'];

const getAboutData = cache(async () => {
  const features = await prisma.feature.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { featured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  const testimonials = await prisma.testimonial.findMany({
    where: {
      published: true,
      status: 'APPROVED',
    },
    orderBy: [
      { featured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return {
    features,
    testimonials,
  };
});

export default async function AboutPage() {
const { features, testimonials } = await getAboutData();
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────── */}
        <PageHero
          label="Our Story"
          title="Four Decades of"
          titleAccent="Architectural Excellence"
          subtitle="From a two-person Manhattan studio in 1984 to a global practice of 85 — our journey is built on the belief that architecture shapes the way people feel."
          image="/images/about-office.png"
          imageAlt="TOUGH Architects studio interior showing architectural models and drawings"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        />

        {/* ── PHILOSOPHY ────────────────────────────────────── */}
        <Reveal>
          <section
            className="section-dark2"
            style={{ padding: 'var(--section-py) 0' }}
            aria-labelledby="philosophy-heading"
          >
            <div className="container-wide">
              <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                <div>
                  <span className="section-label">Our Philosophy</span>
                  <h2 id="philosophy-heading" className="section-heading mt-2">
                    Architecture That <span>Endures</span>
                  </h2>
                  <span className="gold-divider" />
                  <p className="mt-6" style={{ fontSize: '0.92rem', lineHeight: '1.95' }}>
                    We believe the best architecture disappears — not because it lacks presence, but because it
                    becomes so naturally part of life that you stop noticing it as a building and start experiencing
                    it as home, as community, as sanctuary.
                  </p>
                  <p className="mt-4" style={{ fontSize: '0.92rem', lineHeight: '1.95' }}>
                    Our process is rigorous and unhurried. We ask difficult questions before we sketch. We sketch
                    hundreds of times before we build. We build once, and we build it right.
                  </p>
                  <p className="mt-4" style={{ fontSize: '0.92rem', lineHeight: '1.95' }}>
                    Across 40 years and more than 520 completed projects in 28 countries, that philosophy has
                    never wavered — and neither has our commitment to the clients and communities who trust us
                    with their most important spaces.
                  </p>
                  <div className="mt-10">
                    <Link href="/projects" className="btn-primary inline-flex items-center gap-3">
                      <span>View Our Portfolio</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Image grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { src: '/images/about-office.png', alt: 'Modern commercial architecture', tall: true },
                    { src: '/images/about-office.png', alt: 'Residential interior design', tall: false },
                    { src: '/images/about-office.png', alt: 'Commercial office space', tall: false },
                    { src: '/images/about-office.png', alt: 'Cultural building exterior', tall: true },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden"
                      style={{
                        aspectRatio: img.tall ? '3/4' : '4/3',
                        gridRow: img.tall ? 'span 2' : 'span 1',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── VALUES ────────────────────────────────────────── */}
        <section
          className="section-dark"
          style={{ padding: 'var(--section-py) 0' }}
          aria-labelledby="values-heading"
        >
          <div className="container-wide">
            <div className="text-center mb-14">
              <span className="section-label justify-center">Core Values</span>
              <h2 id="values-heading" className="section-heading">
                The Principles That <span>Guide Us</span>
              </h2>
              <span className="gold-divider mx-auto" />
            </div>
            <Stagger>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px" style={{ background: 'var(--color-dark4)' }}>
                {values.map((v) => (
                  <article
                    key={v.number}
                    className="service-card group"
                    style={{ padding: '2.5rem 2rem' }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '2.5rem',
                      fontWeight: 300,
                      color: 'rgba(200,169,110,0.2)',
                      lineHeight: 1,
                      marginBottom: '1.25rem',
                      transition: 'color 0.3s ease',
                    }}
                      className="group-hover:!text-primary"
                    >
                      {v.number}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '0.85rem' }}>
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '0.83rem', lineHeight: '1.85' }}>
                      {v.desc}
                    </p>
                  </article>
                ))}
              </div>
            </Stagger>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────── */}
        <StatsSection />

        {/* ── TIMELINE ──────────────────────────────────────── */}
        <Reveal>
          <section
            className="section-dark2 relative overflow-hidden"
            style={{ padding: 'var(--section-py) 0' }}
            aria-labelledby="timeline-heading"
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{
                backgroundImage: 'linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <div className="container-wide relative z-10">
              <Reveal delay={0.2}>
                <div className="text-center mb-14">
                  <span className="section-label justify-center">Our Journey</span>
                  <h2 id="timeline-heading" className="section-heading">
                    Four Decades of <span>Milestones</span>
                  </h2>
                  <span className="gold-divider mx-auto" />
                </div>
              </Reveal>
              {/* Timeline */}
              <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */}
                <div className="absolute left-[80px] top-0 bottom-0 w-px hidden md:block"
                  style={{ background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)' }}
                  aria-hidden="true"
                />
                <Stagger>
                  <ol className="space-y-0" style={{ listStyle: 'none' }}>
                    {milestones.map((m, i) => (
                      <HoverCard key={m.year}>
                        <li
                          key={m.year}
                          className="relative flex gap-8 md:gap-12 items-start pb-10"
                        >
                          {/* Year */}
                          <div className="flex-shrink-0 w-[80px] text-left hidden md:block pt-1">
                            <span style={{
                              fontFamily: 'var(--font-dm-mono)',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              color: 'var(--color-primary)',
                              letterSpacing: '0.05em',
                            }}>
                              {m.year}
                            </span>
                          </div>

                          {/* Dot */}
                          <div className="absolute left-[75px] mt-3 w-[11px] h-[11px] rounded-full border-2 hidden md:block"
                            style={{ borderColor: 'var(--color-primary)', background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-dark)' }}
                            aria-hidden="true"
                          />

                          {/* Content */}
                          <div className="flex-1 card-surface p-5 md:ml-6">
                            <span className="md:hidden block text-xs font-mono mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.1em' }}>
                              {m.year}
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '0.4rem' }}>
                              {m.title}
                            </h3>
                            <p style={{ fontSize: '0.82rem', lineHeight: '1.75' }}>{m.desc}</p>
                          </div>
                        </li>
                      </HoverCard>
                    ))}
                  </ol>
                </Stagger>
              </div>
            </div>
          </section>
        </Reveal>
        {/* ── TEAM ──────────────────────────────────────────── */}
        <Reveal>
          <section
            className="section-dark"
            style={{ padding: 'var(--section-py) 0' }}
            aria-labelledby="team-heading"
          >
            <div className="container-wide">
              <Reveal delay={0.2}>
                <div className="text-center mb-14">
                  <span className="section-label justify-center">The Team</span>
                  <h2 id="team-heading" className="section-heading">
                    The People Behind <span>Every Project</span>
                  </h2>
                  <span className="gold-divider mx-auto" />
                  <p className="mt-5 max-w-xl mx-auto" style={{ fontSize: '0.88rem' }}>
                    85 architects, designers, engineers, and dreamers — united by an obsessive commitment
                    to creating spaces that matter.
                  </p>
                </div>
              </Reveal>
              <Stagger>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ background: 'var(--color-dark4)' }}>
                  {team.map((member) => (
                      <article key={member.name} className="group" style={{ background: 'var(--color-dark3)', overflow: 'hidden' }}>
                        {/* Photo */}
                          <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src={member.image}
                              alt={`${member.name} — ${member.role} at TOUGH Architects`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div
                              className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 60%)' }}
                            >
                              <div className="flex gap-3">
                                {[member.social.li, member.social.ig].map((href, i) => (
                                  <a
                                    key={i}
                                    href={href}
                                    style={{
                                      width: '34px', height: '34px',
                                      border: '1px solid rgba(200,169,110,0.5)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      color: 'var(--color-primary)',
                                      transition: 'all 0.2s ease',
                                    }}
                                    aria-label={i === 0 ? `${member.name} LinkedIn` : `${member.name} Instagram`}
                                  >
                                    {i === 0 ? (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                                      </svg>
                                    ) : (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                      </svg>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>

                        {/* Info */}
                        <div className="p-6 border-b" style={{ borderColor: 'var(--color-dark4)' }}>
                          <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '2px' }}>
                            {member.name}
                          </h3>
                          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                            {member.role}
                          </p>
                          <p className="mt-3" style={{ fontSize: '0.8rem', lineHeight: '1.75' }}>
                            {member.bio}
                          </p>
                        </div>

                        {/* Qualifications */}
                        <ul className="px-6 py-4 space-y-1.5">
                          {member.quals.map(q => (
                            <li key={q} className="flex items-center gap-2">
                              <span style={{ width: '14px', height: '1px', background: 'var(--color-primary)', flexShrink: 0 }} />
                              <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                  ))}
                </div>
              </Stagger>

              {/* CTA */}
              <Reveal delay={0.4}>
                <div className="text-center mt-12">
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                    Interested in joining our team?
                  </p>
                  <Link href="/contact" className="btn-outline inline-flex items-center gap-3">
                    <span>View Open Positions</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </Reveal>
        {/* ── PARTNERS ──────────────────────────────────────── */}
        <section
          className="section-dark2"
          style={{ padding: '4rem 0', borderTop: '1px solid var(--color-dark4)', borderBottom: '1px solid var(--color-dark4)' }}
          aria-label="Our partners and collaborators"
        >
          <div className="container-wide">
            <Reveal>
              <p className="text-center mb-8" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
                Trusted Partners & Collaborators
              </p>
            </Reveal>
            <Stagger
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {partners.map(p => (
                <HoverCard key={p}>
                  <span
                    key={p}
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-muted2)',
                      letterSpacing: '0.02em',
                      transition: 'color 0.3s ease',
                      cursor: 'default',
                    }}
                  // onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  // onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted2)')}
                  >
                    {p}
                  </span>
                </HoverCard>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────── */}
        <TestimonialsSection data={testimonials} />

      </main >

    </>
  );
}




