'use client';

import HeroSection from '../components/user/HeroSection';
import AboutSection from '../components/user/AboutSection';
import ServicesSection from '../components/user/ServicesSection';
import StatsSection from '../components/user/StatsSection';
import PortfolioSection from '../components/user/PortfolioSection';
import TestimonialsSection from '../components/user/TestimonialsSection';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

export default function HomeClient() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}