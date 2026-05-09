'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: 'TOUGH Architects transformed our vision into something far beyond what we imagined. The attention to detail, the communication throughout, and the final result — a home that feels both monumental and deeply personal.',
    name: 'Dr. Helena Voss',
    role: 'Private Client',
    project: 'Marble Peak Residence, Aspen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The Obsidian Tower project was delivered on time, within budget, and has become one of the most photographed buildings in Manhattan. The teams creative problem-solving and technical mastery are second to none.',
    name: 'James Witherspoon',
    role: 'CEO, Apex Properties',
    project: 'The Obsidian Tower, New York',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    rating: 5,
  },
  {
    id: 3,
    quote: "Working with TOUGH on the Volta Cultural Centre was a privilege. They understood our institution's identity immediately and translated it into architecture that will inspire generations of visitors.",
    name: 'Sofia Almeida',
    role: 'Director, Volta Foundation',
    project: 'Volta Cultural Centre, Lisbon',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Our wellness retreat has become internationally recognised precisely because the architecture creates an experience before you even enter a room. TOUGH understood the philosophy and made it structural.',
    name: 'Kenji Nakamura',
    role: 'Founder, Kyoto Wellness Co.',
    project: 'Kyoto Wellness Retreat, Japan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [auto]);

  const goTo = (i: number) => {
    setAuto(false);
    setCurrent(i);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)' }}
      />

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label justify-center reveal">
            Client Voices
          </span>
          <h2 id="testimonials-heading" className="section-heading reveal">
            What Our <span>Clients</span> Say
          </h2>
          <span className="gold-divider mx-auto reveal" />
        </div>

        {/* Main testimonial */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Large quote */}
          <div className="lg:col-span-7 reveal-left">
            <div className="testimonial-card">
              {/* Stars */}
              <div className="mb-4">
                <Stars count={t.rating} />
              </div>

              <blockquote>
                <p
                  key={t.id}
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: '1.75',
                    color: 'var(--color-light2)',
                  }}
                >
                  {t.quote}
                </p>
              </blockquote>

              <footer className="mt-8 flex items-center gap-4">
                <div
                  className="relative w-14 h-14 rounded-full overflow-hidden border-2 bg-center bg-cover"
                  style={{
                    borderColor: 'var(--color-primary)',
                    backgroundImage: `url(${t.avatar})`,
                  }}
                >
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-white)' }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.08em' }}>
                    {t.role}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '2px' }}>
                    {t.project}
                  </p>
                </div>
              </footer>
            </div>
          </div>

          {/* Thumbnail list */}
          <div className="lg:col-span-5 space-y-4 reveal-right">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(i)}
                className="w-full text-left p-4 transition-all duration-300"
                style={{
                  background: i === current ? 'var(--color-dark3)' : 'transparent',
                  border: `1px solid ${i === current ? 'var(--color-primary)' : 'var(--color-dark4)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
                aria-label={`Testimonial from ${item.name}`}
              >
                <div
                  className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-center bg-cover border-2"
                  style={{
                    backgroundImage: `url(${item.avatar})`,
                    borderColor: 'var(--color-primary)',
                  }}
                />
                <div>
                  <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.82rem', fontWeight: 700, color: i === current ? 'var(--color-white)' : 'var(--color-muted)' }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: i === current ? 'var(--color-primary)' : 'var(--color-muted2)' }}>
                    {item.role}
                  </p>
                </div>
                {i === current && (
                  <span className="ml-auto" style={{ color: 'var(--color-primary)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`slider-dot ${i === current ? 'active' : ''}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div >
    </section >
  );
}
