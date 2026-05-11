'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const highlights = ['520+ Projects', '18 Awards', '40 Years', '28 Countries'];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale, .reveal-blur').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '8rem 0' }}
      aria-label="Call to action"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Multi-layer overlay for drama */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.82) 50%, rgba(13,13,13,0.92) 100%)',
          }}
        />
        {/* Gold vignette left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 0% 50%, rgba(200,169,110,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Top gold border */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '1px', background: 'linear-gradient(to right, var(--color-primary), transparent)' }}
      />
      {/* Bottom gold border */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '1px', background: 'linear-gradient(to right, var(--color-primary), transparent)' }}
      />

      <div
        className="container-wide relative z-10"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        {/* Section label */}
        <span className="section-label justify-center reveal" style={{ transitionDelay: '0s' }}>
          Start Your Project
        </span>

        {/* Heading */}
        <h2
          className="reveal"
          style={{ transitionDelay: '0.1s',
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            marginTop: '1rem',
            maxWidth: '760px',
          }}
        >
          Ready to Build Something
          <br />
          <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
            Truly Extraordinary?
          </span>
        </h2>

        {/* Gold divider */}
        <span className="gold-divider mx-auto reveal" style={{ transitionDelay: '0.18s' }} />

        {/* Supporting text */}
        <p
          className="reveal-blur"
          style={{
            marginTop: '1.5rem',
            maxWidth: '520px',
            fontSize: '0.9rem',
            lineHeight: 1.9,
            color: 'rgba(245,245,240,0.6)',
            transitionDelay: '0.26s',
          }}
        >
          Whether you have a fully formed vision or just the beginnings of an idea —
          we&apos;d love to hear it. Every landmark began with a single conversation.
        </p>

        {/* CTA Buttons */}
        <div
          className="reveal"
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            transitionDelay: '0.35s',
          }}
        >
          <Link href="/contact" className="btn-primary">
            <span>Start a Conversation</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/project" className="btn-outline">
            <span>See Our Work</span>
          </Link>
        </div>

        {/* Highlight strip */}
        <div
          className="reveal"
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0',
            transitionDelay: '0.45s',
          }}
        >
          {highlights.map((item, i) => (
            <div
              key={item}
              style={{
                padding: '0 2.5rem',
                borderRight: i < highlights.length - 1 ? '1px solid rgba(200,169,110,0.2)' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1,
                }}
              >
                {item.split(' ')[0]}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,240,0.45)',
                  marginTop: '0.4rem',
                }}
              >
                {item.split(' ').slice(1).join(' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
