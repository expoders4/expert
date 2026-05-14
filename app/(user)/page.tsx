import type { Metadata } from 'next';
import HeroSection from '../../components/user/HeroSection';
import AboutSection from '../../components/user/AboutSection';
import ServicesSection from '../../components/user/ServicesSection';
import StatsSection from '../../components/user/StatsSection';
import PortfolioSection from '../../components/user/PortfolioSection';
import TestimonialsSection from '../../components/user/TestimonialsSection';
import prisma from '../../lib/prisma';
import { getFeaturedProjects } from '../../lib/queries/projects';
import { cache } from 'react';

/* ─── Page-level SEO override ────────────────────────────── */
export const metadata: Metadata = {
  title: 'TOUGH Architects — Architecture & Interior Design',
  description:
    'Award-winning architectural firm specialising in residential, commercial, and interior design. Crafting spaces that inspire, endure, and elevate human experience since 1984.',
  openGraph: {
    title: 'TOUGH Architects — Architecture & Interior Design',
    description:
      'Award-winning architectural firm specialising in residential, commercial, and interior design.',
    type: 'website',
  },
};

const getTestimonial = cache(async () => {
  return prisma.testimonial.findMany({
      where: {
        published: true,
      },
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

})

export default async function HomePage() {
  const projects = await getFeaturedProjects(5);
  const testimonial = await getTestimonial();
  
  return (
    <>
      <HeroSection />
      <PortfolioSection projects={projects} />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection data={testimonial}/>
      <BackToTop />
    </>
  );
}

/* ─── Back to top button ─────────────────────────────────── */
function BackToTop() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  var btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = [
    'position:fixed',
    'bottom:2rem',
    'right:2rem',
    'width:46px',
    'height:46px',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'background:var(--color-primary)',
    'color:var(--color-dark)',
    'border:none',
    'cursor:pointer',
    'opacity:0',
    'pointer-events:none',
    'transition:opacity 0.3s ease, transform 0.3s ease',
    'z-index:80',
    'clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
  ].join(';');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
  btn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  }, { passive: true });
})();
        `,
      }}
    />
  );
}