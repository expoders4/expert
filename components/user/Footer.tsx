import Link from 'next/link';

const footerLinks = {
  Services: ['Residential Design', 'Commercial Architecture', 'Interior Design', 'Urban Planning', 'Renovation', 'Sustainable Design'],
  Company:  ['About Us', 'Our Team', 'Careers', 'Press & Media', 'Awards', 'Sustainability'],
  Resources:['Portfolio', 'Case Studies', 'Design Blog', 'Client Portal', 'FAQ', 'Privacy Policy'],
};

const socials = [
  { name: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { name: 'LinkedIn', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )},
  { name: 'Pinterest', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.37 1.27-5.37s-.32-.65-.32-1.61c0-1.51.88-2.64 1.97-2.64.93 0 1.38.7 1.38 1.54 0 .94-.6 2.34-.91 3.64-.26 1.09.54 1.97 1.61 1.97 1.93 0 3.42-2.04 3.42-4.97 0-2.6-1.87-4.42-4.54-4.42-3.09 0-4.91 2.32-4.91 4.72 0 .93.36 1.94.81 2.49.09.11.1.2.07.31-.08.34-.27 1.09-.31 1.24-.05.2-.17.24-.39.15-1.45-.68-2.36-2.8-2.36-4.51 0-3.66 2.66-7.02 7.67-7.02 4.03 0 7.16 2.87 7.16 6.71 0 4-2.52 7.22-6.02 7.22-1.18 0-2.28-.61-2.66-1.33l-.72 2.69c-.26.99-.96 2.24-1.44 3 1.08.33 2.23.52 3.42.52 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  )},
  { name: 'Behance', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.543c-.073-1.073-.428-2.322-1.744-2.322-1.266 0-1.693 1.201-1.799 2.322zM8 11.586c1.593-.585 2.603-1.886 2.603-3.444C10.603 5.199 8.786 4 6.5 4H0v16h6.5c2.411 0 4.827-1.353 4.827-4.269 0-1.875-.86-3.263-3.327-4.145zM2.812 6.312h3.338c.793 0 1.65.438 1.65 1.688 0 1.25-.857 1.688-1.65 1.688H2.812V6.312zm3.688 9.876H2.812v-3.876h3.688c1.2 0 1.95.657 1.95 1.938 0 1.281-.75 1.938-1.95 1.938z"/>
    </svg>
  )},
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark2 border-t" style={{ borderColor: 'var(--color-dark4)' }} role="contentinfo">
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="xl:col-span-2">
            {/* Logo */}
            <div className="flex items-end gap-1 mb-5">
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.03em' }}>
                TOUGH
              </span>
              <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.28em', color: 'var(--color-primary)', marginBottom: '3px' }}>
                ARCHITECTS
              </span>
            </div>

            <p style={{ fontSize: '0.83rem', lineHeight: '1.85', color: 'var(--color-muted)', maxWidth: '300px', marginBottom: '1.5rem' }}>
              Award-winning architectural practice crafting spaces that inspire, endure, and 
              elevate human experience since 1984.
            </p>

            {/* AIA badge text */}
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted2)' }}>
              AIA Member · LEED Certified · RIBA Accredited
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-dark4)',
                    color: 'var(--color-muted)',
                    transition: 'all 0.25s ease',
                  }}
                //   onMouseEnter={e => {
                //     const el = e.currentTarget as HTMLAnchorElement;
                //     el.style.borderColor = 'var(--color-primary)';
                //     el.style.color = 'var(--color-primary)';
                //   }}
                //   onMouseLeave={e => {
                //     const el = e.currentTarget as HTMLAnchorElement;
                //     el.style.borderColor = 'var(--color-dark4)';
                //     el.style.color = 'var(--color-muted)';
                //   }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-white)', marginBottom: '1.25rem' }}>
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <Link href="/" className="footer-link">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--color-dark4)' }}>
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
            © {year} TOUGH Architects. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(l => (
              <Link key={l} href="/" className="footer-link" style={{ fontSize: '0.68rem' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
