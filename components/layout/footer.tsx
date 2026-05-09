import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-react'

const projectLinks = [
  { label: 'Private Bungalows', href: '/projects/private_bungalow' },
  { label: 'Residential Housing', href: '/projects/residential' },
  { label: 'Hospitality', href: '/projects/hospitality' },
  { label: 'Commercial', href: '/projects/commercial' },
  { label: 'Cultural Complex', href: '/projects/cultural' },
]
const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Awards', href: '/awards' },
  { label: 'Features & Recognitions', href: '/features-recognitions' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 ">
      <div className="container-wide">

        {/* CTA strip */}
        <div className="bg-primary-800 py-14">
          <div className="text-center">
            <p className="section-label text-primary-300 mb-3">Start Your Project</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Let&apos;s Create Something Remarkable</h2>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-3 hover:!text-background">
              <span> Get In Touch</span>
            </Link>
          </div>
        </div>

        {/* Main */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary-700 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">A</span>
                </div>
                <div>
                  <span className="block text-white font-serif font-bold text-lg">ArchStudio</span>
                  <span className="block text-[10px] text-stone-400 tracking-[0.2em] uppercase">Architecture & Design</span>
                </div>
              </Link>
              <p className="text-sm text-stone-400 leading-relaxed mb-6">
                Creating spaces that inspire, connect, and endure. Over two decades of architectural excellence across India.
              </p>
              <div className="flex gap-3">
                {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Linkedin, label: 'LinkedIn' }, { Icon: Facebook, label: 'Facebook' }].map(({ Icon, label }) => (
                  <a key={label} href="/" aria-label={label}
                    className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-400 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">Our Work</h4>
              <ul className="space-y-3">
                {projectLinks.map(l => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-stone-400 hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(l => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-stone-400 hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex gap-3"><MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" /><span className="text-sm text-stone-400">123 Architect&apos;s Lane, Ring Road, Surat, Gujarat 395007</span></li>
                <li className="flex gap-3"><Phone className="w-4 h-4 text-primary-400 shrink-0" /><a href="tel:+919876543210" className="text-sm text-stone-400 hover:text-white transition-colors">+91 98765 43210</a></li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-primary-400 shrink-0" /><a href="mailto:info@archstudio.com" className="text-sm text-stone-400 hover:text-white transition-colors">info@archstudio.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} ArchStudio. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/privacy-policy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
              <Link href="/sitemap.xml" className="hover:text-stone-300 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}