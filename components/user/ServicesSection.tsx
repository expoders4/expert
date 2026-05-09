'use client';

import { useEffect, useRef } from 'react';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title:    'Residential Design',
    desc:     'Bespoke homes crafted around your lifestyle — from minimal beach houses to grand urban residences. Every space is a reflection of who you are.',
    features: ['Custom Floor Plans', 'Material Curation', '3D Visualisation'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
    title:    'Commercial Architecture',
    desc:     'Landmark commercial buildings that command attention, foster productivity, and leave an enduring impression on the urban fabric.',
    features: ['Office Complexes', 'Retail Environments', 'Mixed-Use Developments'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title:    'Interior Design',
    desc:     'Interior environments where every surface, fixture, and finish works in harmony — creating atmospheres that are both beautiful and deeply functional.',
    features: ['Space Planning', 'Custom Furniture', 'Lighting Design'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title:    'Urban Planning',
    desc:     'Master planning and urban design strategies that shape communities, activate public spaces, and build cities fit for the future.',
    features: ['Master Planning', 'Public Space Design', 'Community Consultation'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title:    'Renovation & Restoration',
    desc:     'Breathing new life into existing structures — preserving architectural heritage while introducing modern comforts and contemporary sensibility.',
    features: ['Heritage Preservation', 'Adaptive Reuse', 'Structural Assessment'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title:    'Sustainable Design',
    desc:     'Net-zero and low-carbon design solutions that prove responsible architecture can be breathtakingly beautiful, efficient, and future-proof.',
    features: ['LEED Certification', 'Passive Design', 'Renewable Integration'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
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
      id="services"
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="services-heading"
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="section-label reveal">What We Do</span>
          <h2 id="services-heading" className="section-heading mt-2 reveal">
            Full Spectrum of<br /><span>Architectural</span> Services
          </h2>
          <span className="gold-divider reveal" />
          <p className="mt-6 reveal" style={{ fontSize: '0.9rem' }}>
            From initial concept sketches to final handover, we manage every phase of your project 
            with the precision, creativity, and transparency you deserve.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <article key={service.title} className="service-card reveal group" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-white)',
                  marginBottom: '0.75rem',
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: '0.83rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                {service.desc}
              </p>
              <ul className="space-y-2 mt-auto">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ width: '18px', height: '1px', background: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--color-light2)' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
