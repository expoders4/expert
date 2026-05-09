'use client';

import { useEffect, useRef } from 'react';

const features = [
  { icon: '◆', label: 'Award-Winning Design' },
  { icon: '◆', label: 'Sustainable Approach' },
  { icon: '◆', label: 'Proven Track Record' },
  { icon: '◆', label: 'Client-First Philosophy' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
              .forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 120);
              });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-dark2 relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="about-heading"
    >
      {/* Background number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(12rem, 20vw, 22rem)',
          fontWeight: 900,
          color: 'rgba(200,169,110,0.04)',
          lineHeight: 1,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        1984
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Image column */}
          <div className="reveal-left relative">
            {/* Main image */}
            <div className="relative" style={{
              aspectRatio: "4/5",
              maxWidth: "520px",
              width: "100%",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85')",
            }}>
              
              {/* Gold border accent */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border border-primary z-[-1]"
                style={{ borderColor: 'var(--color-primary)' }}
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-0 right-0 lg:-right-12 card-surface p-6 reveal"
              style={{ background: 'var(--color-dark)' }}
            >
              <p className="stat-number" style={{ fontSize: '2.8rem' }}>40+</p>
              <p className="mt-1"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                }}
              >
                Years of Experience
              </p>
            </div>

            {/* Award badge */}
            <div className="absolute top-8 -left-6 hidden xl:block reveal"
              style={{ animationDelay: '0.3s' }}
            >
              <div
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-dark)',
                  padding: '1.25rem',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>18</span>
                <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Awards Won</span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="reveal-right">
            <span className="section-label">Who We Are</span>
            <h2 id="about-heading" className="section-heading mt-2">
              Designing the World,<br />
              <span>One Structure</span> at a Time
            </h2>
            <span className="gold-divider" />

            <p className="mt-7" style={{ fontSize: '0.9rem', lineHeight: '1.9' }}>
              Founded in 1984, TOUGH Architects has grown from a small studio into a globally recognised
              practice with a portfolio spanning residential masterworks, civic landmarks, and
              award-winning commercial interiors across four continents.
            </p>
            <p className="mt-4" style={{ fontSize: '0.9rem', lineHeight: '1.9' }}>
              Our multidisciplinary team of 85 architects, designers, and engineers shares one
              unwavering belief: that great architecture is not just about beauty, but about
              function, sustainability, and the enrichment of human life.
            </p>

            {/* Feature list */}
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {features.map(f => (
                <li key={f.label} className="flex items-center gap-3">
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.5rem' }}>{f.icon}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: 'var(--color-light2)',
                    }}
                  >
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Signature + CTA */}
            <div className="mt-10 flex items-end justify-between flex-wrap gap-6">
              <div>
                <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--color-white)' }}>
                  Marcus Holt
                </p>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: '2px' }}>
                  Founder & Principal Architect
                </p>
              </div>
              <button
                onClick={() => document.querySelector('/portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                <span>Our Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
