'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 0,
    image: '', //'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85',
    label: 'Residential Excellence',
    heading: ['Crafting', 'Timeless', 'Spaces'],
    sub: 'Architecture that tells your story — from concept to completion, we build futures worth living in.',
    cta: { label: 'Explore Our Work', href: '/portfolio' },
    cta2: { label: 'Our Story', href: '/about' },
  },
  {
    id: 1,
    image: '/image/slider-2.png', //'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85',
    label: 'Commercial Design',
    heading: ['Bold', 'Visions,', 'Built'],
    sub: 'Transforming skylines and cityscapes through precision engineering and artistic brilliance.',
    cta: { label: 'View Portfolio', href: '/portfolio' },
    cta2: { label: 'Our Services', href: '/services' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85',
    label: 'Interior Mastery',
    heading: ['Interior', 'Worlds', 'Reimagined'],
    sub: 'Every room, every corner — a curated composition of light, material, and human experience.',
    cta: { label: 'See Our Interiors', href: '/portfolio' },
    cta2: { label: 'Get a Quote', href: '/contact' },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 1400);
  }, [animating, current]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const handleCta = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section pt-10" aria-label="Hero">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          aria-hidden={i !== current}
        >
          {/* BG */}
          <div
            className={`hero-bg ${i === current ? 'zoomed' : ''}`}
            style={{
              backgroundImage: `url('/images/slider-${i + 1}.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(105deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.2) 100%)',
            }}
          />
          {/* Geometric accent */}
          <div className="absolute right-0 top-0 h-full w-[40%] z-[1] hidden lg:block"
            style={{
              background: 'linear-gradient(to left, rgba(200,169,110,0.06) 0%, transparent 100%)',
              borderLeft: '1px solid rgba(200,169,110,0.1)',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="hero-content container-wide w-full pt-24 pb-16 relative z-10">
        {/* Slide label */}
        <div
          key={`label-${current}`}
          className="animate-fade-up animate-fill-both"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="section-label">{slides[current].label}</span>
        </div>

        {/* Heading */}
        <h1
          key={`h-${current}`}
          className="mt-2 animate-fade-up animate-fill-both"
          style={{ animationDelay: '0.25s' }}
        >
          {slides[current].heading.map((word, wi) => (
            <span
              key={wi}
              className={`block ${wi === 1 ? 'text-gold italic' : 'text-white'}`}
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          key={`sub-${current}`}
          className="mt-6 max-w-lg text-sm leading-relaxed animate-fade-up animate-fill-both"
          style={{ animationDelay: '0.4s', color: 'rgba(245,245,240,0.65)', fontWeight: 300, letterSpacing: '0.04em' }}
        >
          {slides[current].sub}
        </p>

        {/* CTAs */}
        <div
          key={`cta-${current}`}
          className="mt-10 flex flex-wrap gap-4 animate-fade-up animate-fill-both"
          style={{ animationDelay: '0.55s' }}
        >
          <button
            onClick={() => handleCta(slides[current].cta.href)}
            className="btn-primary"
            aria-label={slides[current].cta.label}
          >
            <span>{slides[current].cta.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => handleCta(slides[current].cta2.href)}
            className="btn-outline"
            aria-label={slides[current].cta2.label}
          >
            <span>{slides[current].cta2.label}</span>
          </button>
        </div>

        {/* Slide counter */}
        <div className="mt-16 flex items-center gap-4">
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
            }}
          >
            0{current + 1}
          </span>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`slider-dot ${i === current ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.15em',
            }}
          >
            0{slides.length}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 z-20 hidden lg:flex flex-col items-center gap-3">
        <span
          style={{
            fontFamily: 'var(--font-raleway)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll Down
        </span>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
          animation: 'fadeIn 2s ease infinite alternate',
        }} />
      </div>

      {/* Side social */}
      <div className="absolute left-8 bottom-0 z-20 hidden xl:flex flex-col items-center gap-5 pb-12">
        {['IG', 'LI', 'BE', 'PN'].map((s) => (
          <a
            key={s}
            href="/"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              transition: 'color 0.2s ease',
            }}
          // onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
          // onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            {s}
          </a>
        ))}
        <div style={{ width: '1px', height: '60px', background: 'var(--color-dark4)' }} />
      </div>
    </section>
  );
}
