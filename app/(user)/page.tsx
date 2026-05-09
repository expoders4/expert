import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Building2, Users, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ArchStudio | Architecture & Interior Design Firm',
  description: 'ArchStudio — Premier architecture and interior design firm in Surat, India. Expert in residential, commercial, hospital, and institutional projects.',
  openGraph: {
    title: 'ArchStudio | Architecture & Interior Design',
    description: 'Premier architecture and interior design firm in India',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness',
  name: 'ArchStudio', url: process.env.NEXT_PUBLIC_SITE_URL,
  description: 'Premier architecture and interior design firm in Surat, India',
  address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressRegion: 'Gujarat', addressCountry: 'IN' },
  contactPoint: { '@type': 'ContactPoint', telephone: '+91-98765-43210' },
}

const featuredProjects = [
  { id: '1', title: 'Serenity Private Bungalow', slug: 'serenity-private-bungalow', image: '/uploads/project1.png', location: 'Surat', year: 2023, cat: 'Architecture' },
  { id: '2', title: 'Apex Corporate HQ',         slug: 'apex-corporate-hq',         image: '/uploads/project1.png', location: 'Ahmedabad', year: 2022, cat: 'Architecture' },
  { id: '3', title: 'Harmony Residences',        slug: 'harmony-residences',         image: '/uploads/project1.png', location: 'Vadodara', year: 2023, cat: 'Interior' },
]

const testimonials = [
  { name: 'Rajesh Mehta', role: 'CEO, Mehta Group', text: 'The team transformed our vision into a stunning reality. Exceptional attention to detail.', rating: 5 },
  { name: 'Priya Sharma', role: 'Homeowner',         text: 'Building our dream home was seamless. The architects understood exactly what we wanted.', rating: 5 },
  { name: 'Amit Patel',   role: 'MD, Patel Corp',    text: 'Outstanding professionalism and creativity. Delivered beyond our expectations.', rating: 5 },
]

const services = [
  { icon: Building2, title: 'Architecture',     href: '/projects?cat=ARCHITECTURE', desc: 'From private bungalows to institutional complexes — designed with purpose, scale, and sensitivity.', items: ['Private Bungalows','Housing Schemes','Commercial Spaces','Hospitals','Industrial','Institutional'] },
  { icon: Star,      title: 'Interior Design',  href: '/projects?cat=INTERIOR',     desc: 'Crafting interiors that reflect personality — residential, corporate, healthcare, and retail spaces.', items: ['Residential','Corporate','Healthcare','Retail Shops'] },
  { icon: Award,     title: 'Cultural Complex', href: '/projects?cat=CULTURAL',     desc: 'Civic and cultural spaces that serve communities and stand as lasting landmarks.', items: ['Civic Centers','Heritage Sites','Community Halls','Museums'] },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.jpg" alt="ArchStudio architecture" fill className="object-cover opacity-40" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80" />
        <div className="relative z-10 container text-center pt-24 pb-16">
          <p className="section-label text-primary-300 mb-6 animate-fade-in">Architecture · Interior · Cultural</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-semibold leading-[1.05] mb-8 animate-slide-up">
            Designing Spaces,<br />
            <span className="text-accent-400">Crafting Legacies</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up animate-delay-200">
            Over two decades of visionary architecture and thoughtful interior design, creating spaces that inspire and endure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
            <Link href="/projects" className="btn-primary text-base px-9 py-4">Explore Our Work <ArrowRight className="w-5 h-5" /></Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-stone-900 text-base px-9 py-4">Start a Project</Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-primary-800 py-14">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[{ v: '25+', l: 'Years Experience' }, { v: '250+', l: 'Projects Completed' }, { v: '35+', l: 'Awards Won' }, { v: '500+', l: 'Happy Clients' }].map(s => (
              <div key={s.l}>
                <div className="font-serif text-4xl lg:text-5xl font-bold text-accent-400 mb-1">{s.v}</div>
                <div className="text-xs text-primary-200 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About snippet ── */}
      <div className="section-padding bg-stone-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">About ArchStudio</p>
              <h2 className="section-title mb-5">Where Vision Meets<br />Craftsmanship</h2>
              <div className="decorative-line mb-7" />
              <p className="text-stone-600 leading-relaxed mb-5">
                Founded with a passion for purposeful design, ArchStudio has grown into one of India&apos;s most respected architecture and interior design practices.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Our multidisciplinary team brings expertise across residential, commercial, healthcare, and institutional typologies.
              </p>
              <Link href="/about" className="btn-primary">Our Story <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden bg-stone-200">
                <Image src="/images/about-office.png" alt="ArchStudio office" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-800 text-white p-6 w-44">
                <div className="font-serif text-4xl font-bold text-accent-400">25+</div>
                <div className="text-xs uppercase tracking-wide mt-1 text-primary-200">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <div className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title">Our Expertise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="group border border-stone-100 p-8 hover:border-primary-200 hover:shadow-lg transition-all duration-300 card-hover">
                <div className="w-12 h-12 bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-800 transition-colors duration-300">
                  <s.icon className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-3">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-1 mb-7">
                  {s.items.map(i => (
                    <li key={i} className="text-xs text-stone-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary-500 rounded-full" />{i}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="btn-ghost text-sm group/link">
                  Explore <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Projects ── */}
      <div className="section-padding bg-stone-50">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link href="/projects" className="hidden md:flex btn-ghost">All Projects <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <Link key={p.id} href={`/projects/${p.slug}`}
                    className={`group relative overflow-hidden bg-stone-200 card-hover ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" />
                <div className="img-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs tracking-widest uppercase text-primary-300 mb-1">{p.cat} · {p.year}</p>
                  <h3 className="font-serif text-xl font-semibold group-hover:text-accent-300 transition-colors">{p.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/projects" className="btn-primary">All Projects</Link>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="section-padding bg-stone-900">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label text-primary-400 mb-3">Client Stories</p>
            <h2 className="section-title text-white">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-stone-800 border border-stone-700 p-8">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />)}
                </div>
                <p className="font-serif text-stone-200 text-lg italic leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/testimonials" className="btn-outline border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-stone-600 hover:text-white">
              Read More Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-primary-800 py-20">
        <div className="container text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-white font-semibold mb-5">Have a Project in Mind?</h2>
          <p className="text-primary-200 text-lg max-w-xl mx-auto mb-10">
            Let&apos;s work together to create spaces beyond expectations. Reach out to start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="bg-white text-primary-800 hover:bg-stone-100 px-9 py-4 text-sm font-medium inline-flex items-center gap-2 transition-colors">
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="border border-primary-400 text-primary-100 hover:border-white hover:text-white px-9 py-4 text-sm font-medium inline-flex items-center gap-2 transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}