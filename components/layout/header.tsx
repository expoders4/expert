// 'use client'

// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// const navLinks = [
//   { label: 'Home',         href: '/' },
//   { label: 'About',        href: '/about' },
//   { label: 'Projects',     href: '/projects', hasDropdown: true },
//   { label: 'Awards',       href: '/awards' },
//   { label: 'Features',     href: '/features-recognitions' },
//   { label: 'Blog',         href: '/blogs' },
//   { label: 'Testimonials', href: '/testimonials' },
//   { label: 'Contact',      href: '/contact' },
// ]
// export default function Header() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60)
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [menuOpen])

//   return (
//     <>
//       <header
//         role="banner"
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
//           scrolled
//             ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-4'
//             : 'py-7'
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex items-center justify-between">
//           {/* Logo */}
//           <a
//             href="/"
//             className="flex items-center gap-3"
//             aria-label="ARCHSTUDIO - Return to homepage"
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 border border-gold flex items-center justify-center">
//                 <div className="w-3 h-3 bg-gold" />
//               </div>
//               <span className="font-playfair text-xl tracking-[0.15em] text-white font-semibold">
//                 ARCH<span className="text-gold">STUDIO</span>
//               </span>
//             </div>
//           </a>

//           {/* Desktop Nav */}
//           <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
//             {navLinks.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className="nav-link font-inter text-[13px] font-medium tracking-[0.12em] text-gray-muted hover:text-white transition-colors duration-300 uppercase"
//                 aria-label={link.label}
//               >
//                 {link.label}
//               </a>
//             ))}
//             <a
//               href="/contact"
//               className="ml-4 px-6 py-2.5 border border-gold text-gold font-inter text-[12px] tracking-[0.15em] uppercase font-medium hover:bg-gold hover:text-white transition-all duration-400"
//               aria-label="Book Consultation"
//             >
//               Book Consultation
//             </a>
//           </nav>

//           {/* Mobile Hamburger */}
//           <button
//             className="lg:hidden flex flex-col gap-[5px] z-50"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={menuOpen}
//           >
//             <span
//               className={`block w-7 h-px bg-white transition-all duration-300 ${
//                 menuOpen ? 'rotate-45 translate-y-[9px]' : ''
//               }`}
//             />
//             <span
//               className={`block w-5 h-px bg-gold transition-all duration-300 ${
//                 menuOpen ? 'opacity-0 -translate-x-2' : ''
//               }`}
//             />
//             <span
//               className={`block w-7 h-px bg-white transition-all duration-300 ${
//                 menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
//               }`}
//             />
//           </button>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col justify-center items-center"
//             role="dialog"
//             aria-modal="true"
//             aria-label="Mobile navigation menu"
//           >
//             <nav className="flex flex-col items-center gap-8">
//               {navLinks.map((link, i) => (
//                 <motion.a
//                   key={link.label}
//                   href={link.href}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                   onClick={() => setMenuOpen(false)}
//                   className="font-playfair text-4xl font-semibold text-white hover:text-gold transition-colors duration-300"
//                 >
//                   {link.label}
//                 </motion.a>
//               ))}
//               <motion.a
//                 href="/contact"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.35, duration: 0.5 }}
//                 onClick={() => setMenuOpen(false)}
//                 className="mt-6 px-8 py-3 border border-gold text-gold font-inter text-[13px] tracking-[0.15em] uppercase"
//               >
//                 Book Consultation
//               </motion.a>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-4'
            : 'py-7'
          }`}
      >
        <div className="mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            aria-label="ARCHSTUDIO Home"
            className="flex items-center gap-3"
          >
            <div className="w-7 h-7 border border-gold flex items-center justify-center">
              <div className="w-3 h-3 bg-gold" />
            </div>

            <span className="font-playfair text-xl tracking-[0.15em] text-white font-semibold">
              ARCH<span className="text-gold">STUDIO</span>
            </span>
          </Link>

          {/* Sidebar Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px]"
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
              className="fixed top-0 right-0 h-full w-[360px] max-w-[90vw] backdrop-blur-2xl z-40 z-50 border-l border-white/10 p-10
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