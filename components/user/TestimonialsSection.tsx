'use client';

import { useState, useEffect, useRef } from 'react';

type TestimonialType = {
  id: string;
  content: string;
  name: string;
  role?: string | null;
  company?: string | null;
  avatar?: string | null;
  rating: number;
};

const Stars = ({
  count,
}: {
  count: number;
}) => (
  <div className="flex gap-1">
    {Array.from({
      length: count,
    }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="var(--color-primary)"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

type Props = {
  data: TestimonialType[];
};

export default function TestimonialsSection({
  data,
}: Props) {
  // ✅ hooks must ALWAYS be before any return
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const hasData = !!data?.length;

  useEffect(() => {
    if (!auto || !hasData) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [auto, data.length, hasData]);

  const goTo = (index: number) => {
    setAuto(false);
    setCurrent(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll('.reveal, .reveal-left, .reveal-right')
            .forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, i * 120);
            });
        }
      });
    }, {
      threshold: 0.1,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ ONLY NOW safe to return conditionally
  if (!hasData) {
    return null;
  }

  const t = data[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{
        padding: 'var(--section-py) 0',
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
        }}
      />

      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="section-label justify-center reveal">
            Client Voices
          </span>

          <h2 className="section-heading reveal">
            What Our
            <span> Clients</span> Say
          </h2>

          <span className="gold-divider mx-auto reveal" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* main */}
          <div className="lg:col-span-7 reveal-left">
            <div className="testimonial-card">

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
                    lineHeight: '1.75',
                    color: 'var(--color-light2)',
                  }}
                >
                  {t.content}
                </p>
              </blockquote>

              <footer className="mt-8 flex items-center gap-4">

                <div
                  className="relative w-14 h-14 rounded-full overflow-hidden bg-center bg-cover border-2"
                  style={{
                    borderColor: 'var(--color-primary)',
                    backgroundImage: `url(${t.avatar || '/images/avatar-placeholder.png'})`,
                  }}
                />

                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      color: 'var(--color-white)',
                    }}
                  >
                    {t.name}
                  </p>

                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {t.role}
                  </p>

                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {t.company}
                  </p>
                </div>
              </footer>
            </div>
          </div>

          {/* list */}
          <div className="lg:col-span-5 space-y-4 reveal-right">
            {data.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(i)}
                className="w-full text-left p-4 transition-all duration-300"
                style={{
                  background:
                    i === current
                      ? 'var(--color-dark3)'
                      : 'transparent',
                  border: `1px solid ${
                    i === current
                      ? 'var(--color-primary)'
                      : 'var(--color-dark4)'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full bg-center bg-cover border-2"
                  style={{
                    backgroundImage: `url(${item.avatar || '/images/avatar-placeholder.png'})`,
                    borderColor: 'var(--color-primary)',
                  }}
                />

                <div>
                  <p>{item.name}</p>
                  <p>{item.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="flex justify-center gap-3 mt-10">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`slider-dot ${
                i === current ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}