'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/project' },
  { label: 'Awards', href: '/awards' },
  { label: 'Features', href: '/features-recognitions' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-4 ${scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-black'
          }`}
      >
        <div className="mx-auto px-6 lg:px-12 flex items-center justify-between container-wide">

          {/* Logo */}
          <Link
            href="/"
            aria-label="ARCHSTUDIO Home"
            className="flex items-center gap-2"
          >
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="ARCHSTUDIO Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>

            <span className="font-playfair text-xl tracking-[0.15em] text-white font-semibold">
              ARCH<span className="text-gold">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-playfair transition-colors ${pathname === link.href
                  ? 'text-gold'
                  : 'text-white hover:text-gold'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sidebar Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col gap-[5px]"
            aria-label="Open navigation menu"
          >
            <span className="block w-7 h-px bg-white" />
            <span className="block w-5 h-px bg-gold" />
            <span className="block w-7 h-px bg-white" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* sidebar */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.45,
              }}
              className="fixed top-0 right-0 h-full w-[360px] max-w-[90vw] backdrop-blur-2xl z-50 border-l border-white/10 p-10
              overflow-y-auto overscroll-contain"
            >
              {/* close */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-3xl"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              {/* nav */}
              <nav
                aria-label="Main navigation"
                className="flex flex-col gap-7"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-playfair text-xl transition-colors ${pathname === link.href
                        ? 'text-gold'
                        : 'text-white hover:text-gold'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex mt-12 px-8 py-3 border border-gold text-gold uppercase tracking-[0.15em] text-sm"
              >
                Book Consultation
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}