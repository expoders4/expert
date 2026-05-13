'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const categories = ['All', 'Residential', 'Commercial', 'Interior', 'Cultural'];

type ProjectType = {
  id: string;
  slug: string;
  title: string;
  location?: string | null;
  year?: number | null;
  thumbnail?: string | null;
  image?: string | null;
  featured?: boolean;
  subCategory?: {
    id: string;
    name: string;
    slug: string;
    sortOrder: number;
    description: string | null;
    image: string | null;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export default function PortfolioSection({
  projects,
}: {
  projects: ProjectType[];
}) {
  const [active, setActive] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const filtered = projects.filter(
    (p) =>
      active === 'All' ||
      p.subCategory?.name === active
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
        {/* <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            background: 'var(--color-dark4)',
          }}
        > */}
        <div className="grid gap-px grid-cols-1 md:grid-cols-2"
          style={{
            background: 'var(--color-dark4)',
          }}
        >
          {filtered.map((item, i) => {
            const spanClass =
              i % 4 === 0
                ? 'md:row-span-2'
                : i % 4 === 1
                  ? 'md:row-span-1'
                  : i % 4 === 2
                    ? 'md:row-span-1'
                    : 'md:row-span-2';

            const heightClass =
              i % 4 === 0
                ? 'h-[600px]'
                : i % 4 === 1
                  ? 'h-[280px]'
                  : i % 4 === 2
                    ? 'h-[320px]'
                    : 'h-[200px]';

            return (
              <Link
                key={item.id}
                href={`/project/${item.slug}`}
                className={`group block ${spanClass}`}
              >
                <div className={`relative ${heightClass} overflow-hidden`}>

                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />

                  {/* Main luxury overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-t from-black via-black/40 to-transparent backdrop-blur-[2px]" />

                  {/* Diagonal sweep */}
                  <div className="absolute top-0 -left-[120%] w-[60%] h-full bg-white/10 skew-x-[-25deg] group-hover:left-[160%] transition-all duration-1000"
                  />

                  {/* Gold border animation */}
                  <div className="absolute inset-6 border border-transparent group-hover:border-[var(--color-primary)] transition-all duration-700" />

                  {/* Content */}
                  <div className="absolute inset-0 z-20 flex items-end p-10">
                    <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                      {/* Meta */}
                      <p
                        style={{
                          fontFamily:
                            "var(--font-raleway)",
                          fontSize: ".65rem",
                          fontWeight: 700,
                          letterSpacing: ".25em",
                          textTransform: "uppercase",
                          color:
                            "var(--color-primary)",
                          marginBottom: ".7rem",
                        }}
                      >
                        · {item.year}
                      </p>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily:
                            "var(--font-playfair)",
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color:
                            "var(--color-white)",
                          marginBottom: ".5rem",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Location */}
                      <p
                        style={{
                          fontSize: ".85rem",
                          color:
                            "rgba(255,255,255,.75)",
                        }}
                      >
                        {item.location}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-3 mt-5">

                        <span className="h-[1px] w-0 group-hover:w-10 transition-all duration-500 delay-300"
                          style={{
                            background:
                              "var(--color-primary)",
                          }}
                        />

                        <span
                          style={{
                            fontSize: ".7rem",
                            fontWeight: 700,
                            letterSpacing:
                              ".15em",
                            textTransform:
                              "uppercase",
                            color:
                              "var(--color-primary)",
                          }}
                        >
                          View Project
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <button className="btn-outline">
            <span>View All Projects</span>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}