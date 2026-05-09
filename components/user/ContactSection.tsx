'use client';

import { useEffect, useRef, useState } from 'react';

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Studio Address',
    value: '240 Architecture Ave, Suite 12\nNew York, NY 10001',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+1 (555) 123 4567',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@tougharchitects.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Office Hours',
    value: 'Monday – Friday\n9:00 AM – 6:00 PM EST',
  },
];

const projectTypes = ['Residential', 'Commercial', 'Interior', 'Cultural', 'Renovation', 'Consultation', 'Other'];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', projectType: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{ padding: 'var(--section-py) 0' }}
      aria-labelledby="contact-heading"
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-dark4)' }} />

      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-14 xl:gap-20">

          {/* Info column */}
          <div className="lg:col-span-2">
            <h2 id="contact-heading" className="section-heading mt-2 reveal">
              Let&apos;s Build<br /><span>Something</span><br />Extraordinary
            </h2>
            <span className="gold-divider reveal" />

            <p className="mt-6 reveal" style={{ fontSize: '0.88rem', lineHeight: '1.9' }}>
              Whether you have a clear vision or just a vague idea, we&apos;d love to hear about 
              your project. Our first consultation is always a conversation, never a pitch.
            </p>

            {/* Contact info */}
            <ul className="mt-10 space-y-7">
              {contactInfo.map(item => (
                <li key={item.label} className="flex items-start gap-4 reveal">
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center border"
                    style={{ borderColor: 'var(--color-dark4)', color: 'var(--color-primary)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '0.83rem', color: 'var(--color-light2)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-10 reveal">
              <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                Follow Our Work
              </p>
              <div className="flex gap-3">
                {['Instagram', 'LinkedIn', 'Pinterest', 'Behance'].map(s => (
                  <a
                    key={s}
                    href="/"
                    style={{
                      padding: '0.5rem 0.85rem',
                      border: '1px solid var(--color-dark4)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-muted)',
                      transition: 'all 0.25s ease',
                    }}
                    // onMouseEnter={e => {
                    //   (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-primary)';
                    //   (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)';
                    // }}
                    // onMouseLeave={e => {
                    //   (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-dark4)';
                    //   (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted)';
                    // }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3 reveal-right">
            <div className="card-surface p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(200,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: 'var(--color-white)' }}>
                    Message Received
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', maxWidth: '320px' }}>
                    Thank you for reaching out. We&apos;ll review your project brief and respond within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-4"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.65rem' }}
                  >
                    <span>Send Another</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1.75rem' }}>
                    Project Brief
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="sr-only">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="sr-only">Project Type</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleChange}
                        className="form-input"
                        required
                        style={{ appearance: 'none' }}
                      >
                        <option value="" disabled>Project Type</option>
                        {projectTypes.map(t => (
                          <option key={t} value={t} style={{ background: 'var(--color-dark3)' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="budget" className="sr-only">Estimated Budget</label>
                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      placeholder="Estimated Budget (e.g. $100k – $500k)"
                      value={formState.budget}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="sr-only">Project Description</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, vision, and timeline..."
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <span>Send Project Brief</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>

                  <p className="mt-4 text-center" style={{ fontSize: '0.68rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
                    By submitting you agree to our privacy policy. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
