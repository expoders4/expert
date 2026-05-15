'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  breadcrumbs: Crumb[];
}

export default function PageHero({
  label,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt,
  breadcrumbs,
}: PageHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  /* Subtle parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-end"
      style={{
        minHeight: '62vh',
        paddingTop: 'var(--nav-h)',
      }}
      aria-label={`${title} hero`}
    >
      {/* BG image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
      >
        <motion.img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          animate={{
            scale: [1.08, 1.16, 1.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Gradient overlay */}
      {/* <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.35) 100%)',
        }}
      /> */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      {/* Left gold accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--color-primary) 40%, var(--color-primary) 60%, transparent 100%)',
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-wide relative z-10 pb-14 pt-10 w-full">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="mb-6"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <ol
            className="flex items-center gap-2"
            style={{
              listStyle: 'none',
            }}
          >
            {breadcrumbs.map((crumb, i) => (
              <li
                key={i}
                className="flex items-center gap-2"
              >
                {i > 0 && (
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '0.6rem',
                    }}
                  >
                    ›
                  </span>
                )}

                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-[var(--color-primary)]"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Label */}
        <motion.span
          className="section-label"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
        >
          {label}
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="mt-3"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 1,
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-white)',
            }}
          >
            {title}
          </span>

          {titleAccent && (
            <motion.span
              style={{
                display: 'block',
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--color-primary)',
                fontStyle: 'italic',
              }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              {titleAccent}
            </motion.span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-xl"
          style={{
            fontSize: '0.9rem',
            lineHeight: '1.85',
            color: 'rgba(245,245,240,0.6)',
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.8,
          }}
        >
          {subtitle}
        </motion.p>

      </div>
    </section>
  );
}