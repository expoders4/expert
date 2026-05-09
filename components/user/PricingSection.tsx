'use client';

import { useEffect, useRef } from 'react';

const plans = [
  {
    name:     'Consultation',
    price:    '299',
    period:   'per session',
    desc:     'Ideal for homeowners and small developers who need expert guidance before committing to a full project.',
    features: [
      '2-hour design consultation',
      'Site visit & assessment',
      'Preliminary concept sketches',
      'Material & style direction',
      'Written project brief',
    ],
    unavail:  ['Full design development', 'Construction administration'],
    featured: false,
    cta:      'Book a Session',
  },
  {
    name:     'Full Design',
    price:    '4,800',
    period:   'starting price',
    desc:     'Our most popular offering — end-to-end architectural design from concept through to planning approval.',
    features: [
      'Concept & schematic design',
      'Full design development',
      '3D renderings & walkthroughs',
      'Planning & permit drawings',
      'Contractor tender support',
      'Interior design coordination',
    ],
    unavail:  [],
    featured: true,
    cta:      'Start Your Project',
  },
  {
    name:     'Full Service',
    price:    '9,500',
    period:   'starting price',
    desc:     'Complete peace of mind — we manage your project from first sketch to final handover, handling everything.',
    features: [
      'Everything in Full Design',
      'Construction administration',
      'Site supervision & reporting',
      'Contractor management',
      'Defects inspection',
      'Post-occupancy review',
    ],
    unavail:  [],
    featured: false,
    cta:      'Get a Quote',
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
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

  const handleCta = () => {
    document.querySelector('/contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-dark2 relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="pricing-heading"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label justify-center reveal">Investment</span>
          <h2 id="pricing-heading" className="section-heading reveal">
            Transparent <span>Pricing</span> Plans
          </h2>
          <span className="gold-divider mx-auto reveal" />
          <p className="mt-5 max-w-xl mx-auto reveal" style={{ fontSize: '0.9rem' }}>
            Every project is unique. Our pricing reflects that — these are starting points for 
            conversation, not fixed limits. Contact us for a bespoke quote.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--color-dark4)' }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`pricing-card reveal ${plan.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <div className="absolute top-4 right-4 px-3 py-1"
                  style={{
                    background: 'var(--color-dark)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <p style={{
                fontFamily: 'var(--font-raleway)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: plan.featured ? 'var(--color-dark)' : 'var(--color-primary)',
                marginBottom: '1rem',
              }}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.85rem', verticalAlign: 'top', lineHeight: 2.2 }}>
                  $
                </span>
                <span className="price-number">{plan.price}</span>
              </div>
              <p style={{
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: plan.featured ? 'rgba(13,13,13,0.6)' : 'var(--color-muted)',
                marginBottom: '1.25rem',
              }}>
                {plan.period}
              </p>

              {/* Divider */}
              <div className="mb-5"
                style={{ height: '1px', background: plan.featured ? 'rgba(13,13,13,0.15)' : 'var(--color-dark4)' }}
              />

              {/* Desc */}
              <p style={{ fontSize: '0.82rem', lineHeight: '1.75', marginBottom: '1.5rem', color: plan.featured ? 'rgba(13,13,13,0.75)' : 'var(--color-muted)' }}>
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ color: plan.featured ? 'var(--color-dark)' : 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: '0.8rem', color: plan.featured ? 'var(--color-dark)' : 'var(--color-light2)' }}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.unavail.map(f => (
                  <li key={f} className="flex items-start gap-3 opacity-40">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: '2px', color: plan.featured ? 'var(--color-dark)' : 'var(--color-muted)' }}>
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span style={{ fontSize: '0.8rem', color: plan.featured ? 'var(--color-dark)' : 'var(--color-muted)' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={handleCta}
                className="w-full py-3 transition-all duration-300"
                style={{
                  background: plan.featured ? 'var(--color-dark)' : 'transparent',
                  border: `1px solid ${plan.featured ? 'var(--color-dark)' : 'currentColor'}`,
                  color: plan.featured ? 'var(--color-primary)' : 'inherit',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-raleway)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
                // onMouseEnter={e => {
                //   if (!plan.featured) {
                //     (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary)';
                //     (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
                //     (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-dark)';
                //   }
                // }}
                // onMouseLeave={e => {
                //   if (!plan.featured) {
                //     (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                //     (e.currentTarget as HTMLButtonElement).style.borderColor = 'currentColor';
                //     (e.currentTarget as HTMLButtonElement).style.color = 'inherit';
                //   }
                // }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center mt-8 reveal"
          style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}
        >
          * All prices exclude VAT and vary by project scope, location, and complexity.
          <button onClick={handleCta} className="text-gold ml-2 underline underline-offset-2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', fontSize: 'inherit' }}>
            Contact us for a custom proposal.
          </button>
        </p>
      </div>
    </section>
  );
}
