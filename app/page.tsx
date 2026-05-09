import type { Metadata } from 'next';
import HeroSection       from '../components/user/HeroSection';
import AboutSection      from '../components/user/AboutSection';
import ServicesSection   from '../components/user/ServicesSection';
import StatsSection      from '../components/user/StatsSection';
import PortfolioSection  from '../components/user/PortfolioSection';
import TestimonialsSection from '../components/user/TestimonialsSection';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

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

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      {/* <Navbar /> */}
      <Header />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero with full-screen slider */}
        <HeroSection />

         {/* 5. Portfolio grid with filter */}
        <PortfolioSection />

        {/* 2. About the firm */}
        <AboutSection />

        {/* 3. Services offered */}
        <ServicesSection />

        {/* 4. Stats / counter strip */}
        <StatsSection />
       
        {/* 6. Client testimonials slider */}
        <TestimonialsSection />
        
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
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