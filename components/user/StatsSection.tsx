'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 520,  suffix: '+', label: 'Projects Completed',  desc: 'Across residential, commercial & cultural sectors' },
  { value: 40,   suffix: '+', label: 'Years of Experience', desc: 'Founded 1984, still building tomorrow' },
  { value: 18,   suffix: '',  label: 'Industry Awards',     desc: 'Recognised by AIA, RIBA, Dezeen & more' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction', desc: 'Measured through post-project reviews' },
];

function Counter({ target, suffix, running }: { target: number; suffix: string; running: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const start     = performance.now();
    const duration  = 2200;

    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, running]);

  return (
    <span>
      {count}
      <span style={{ color: 'var(--color-primary)' }}>{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '6rem 0' }}
      aria-label="Firm statistics"
    >
      {/* BG image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=75"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.88)' }} />
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-primary)', opacity: 0.4 }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--color-primary)', opacity: 0.4 }} />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x"
          // style={{ divideColor: 'var(--color-dark4)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center px-6 py-4"
              style={{ borderColor: 'var(--color-dark4)' }}
            >
              {/* Number */}
              <p className="stat-number">
                <Counter target={stat.value} suffix={stat.suffix} running={started} />
              </p>
              {/* Label */}
              <p className="mt-3"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-white)',
                }}
              >
                {stat.label}
              </p>
              {/* Desc */}
              <p className="mt-2"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  lineHeight: '1.6',
                }}
              >
                {stat.desc}
              </p>
              {/* Gold line */}
              <div className="mt-4 mx-auto"
                style={{ width: '30px', height: '1px', background: 'var(--color-primary)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
