'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Active link on scroll */
  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-wide w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50 relative" aria-label="TOUGH Architects home">
            <div className="flex items-end gap-0.5">
              <span
                className="text-white leading-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                }}
              >
                TOUGH
              </span>
              <span
                className="text-gold mb-[2px]"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  lineHeight: 1,
                }}
              >
                ARCHITECTS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('#contact')}
              className="hidden lg:inline-flex btn-primary text-xs"
              style={{ padding: '0.65rem 1.75rem' }}
            >
              <span>Get a Quote</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-1 z-[110] relative"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="hamburger-line"
                style={{
                  transform: menuOpen ? 'translateY(5px) rotate(45deg)' : '',
                  background: menuOpen ? 'var(--color-primary)' : '',
                }}
              />
              <span
                className="hamburger-line"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : '',
                }}
              />
              <span
                className="hamburger-line"
                style={{
                  transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : '',
                  background: menuOpen ? 'var(--color-primary)' : '',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="flex flex-col items-center gap-6 stagger-children">
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="mobile-nav-link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center gap-5">
          {['Instagram', 'LinkedIn', 'Pinterest', 'Behance'].map(s => (
            <a
              key={s}
              href="#"
              className="text-muted hover:text-gold transition-colors text-xs tracking-widest font-body font-semibold uppercase"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
