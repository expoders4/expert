'use client';

import { useEffect, useRef, useState } from 'react';

const categories = ['All', 'Residential', 'Commercial', 'Interior', 'Cultural'];

const projects = [
  {
    id: 1,
    title: 'Marble Peak Residence',
    category: 'Residential',
    location: 'Aspen, Colorado',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'The Obsidian Tower',
    category: 'Commercial',
    location: 'Manhattan, New York',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'Volta Cultural Centre',
    category: 'Cultural',
    location: 'Lisbon, Portugal',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?w=800&q=80',
    featured: false,
  },
  {
    id: 4,
    title: 'Kyoto Wellness Retreat',
    category: 'Interior',
    location: 'Kyoto, Japan',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    title: 'Harbour House',
    category: 'Residential',
    location: 'Sydney, Australia',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    title: 'Zenith Office Campus',
    category: 'Commercial',
    location: 'Munich, Germany',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    featured: false,
  },
];

export default function PortfolioSection() {
  const [active, setActive] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = projects.filter(
    (p) => active === 'All' || p.category === active
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current
          .querySelectorAll('.reveal-scale')
          .forEach((el, i) => {
            el.classList.remove('visible');

            setTimeout(() => {
              el.classList.add('visible');
            }, i * 80);
          });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll('.reveal, .reveal-scale')
            .forEach((el, i) =>
              setTimeout(() => el.classList.add('visible'), i * 80)
            );
        }
      });
    },
    { threshold: 0.05 }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-dark2 relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="section-label reveal">Our Work</span>
            <h2 id="portfolio-heading" className="section-heading mt-2 reveal">
              Featured <span>Projects</span>
            </h2>
            <span className="gold-divider reveal" />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 reveal">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-raleway)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: `1px solid ${cat === active ? 'var(--color-primary)' : 'var(--color-dark4)'}`,
                  background: cat === active ? 'var(--color-primary)' : 'transparent',
                  color: cat === active ? 'var(--color-dark)' : 'var(--color-muted)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            background: 'var(--color-dark4)',
          }}
        >
          {filtered.map((project, i) => (
            <article
              key={`${active}-${project.id}`}
              className="portfolio-item reveal-scale group"
              style={{
                aspectRatio: project.featured ? '16/10' : '4/3',
                transitionDelay: `${i * 0.06}s`,
                gridColumn: project.featured && i === 0 ? 'span 2' : 'span 1',
                cursor: 'pointer',
              }}
              aria-label={`${project.title} — ${project.category}`}
            >
              <div
                className="relative w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              />
              <div className="portfolio-overlay" />
              <div className="portfolio-info">
                <p
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {project.category} · {project.year}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-white)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,245,240,0.6)', fontWeight: 300 }}>
                  {project.location}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                    View Project
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <button className="btn-outline">
            <span>View All Projects</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
