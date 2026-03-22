'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ShoppingCart, User, Menu, X, Coffee, MapPin, Star, Home } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { navbarReveal, mobileMenuOverlay, mobileMenuLinks, staggerContainer, easings } from '@/lib/utils/animations'

const navLinks = [
  { label: 'Home',      href: '/',         icon: Home   },
  { label: 'Menu',      href: '/menu',      icon: Coffee },
  { label: 'Locations', href: '/locations', icon: MapPin },
  { label: 'Rewards',   href: '/rewards',   icon: Star   },
]

export default function Navbar() {
  const pathname               = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount]             = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { scrollY } = useScroll()
  const navBg     = useTransform(scrollY, [0, 80], ['rgba(13,6,0,0)', 'rgba(13,6,0,0.92)'])
  const navBorder = useTransform(scrollY, [0, 80], ['rgba(255,245,228,0)', 'rgba(255,245,228,0.08)'])
  const navBlur   = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(20px)'])

  return (
    <>
      <motion.header
        variants={navbarReveal}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-[9990]"
      >
        <motion.div
          style={{
            backgroundColor:    navBg,
            borderBottomColor:  navBorder,
            backdropFilter:     navBlur,
            WebkitBackdropFilter: navBlur,
          }}
          className="border-b border-transparent"
        >
          <div className="section-wrapper">
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: easings.apple }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-tims-red flex items-center justify-center shadow-red-glow">
                    <Coffee size={14} strokeWidth={2} className="text-tims-cream" />
                  </div>
                  <span
                    className="font-display text-2xl font-semibold text-tims-red tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Tim Hortons
                  </span>
                </motion.div>
              </Link>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link key={link.href} href={link.href} className="relative group">
                      <span className={cn(
                        'font-body text-sm font-medium tracking-wide transition-colors duration-300',
                        isActive ? 'text-tims-cream' : 'text-tims-cream-muted hover:text-tims-cream'
                      )}>
                        {link.label}
                      </span>
                      <span className={cn(
                        'absolute -bottom-1 left-0 h-px bg-tims-red transition-all duration-300 ease-out',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )} />
                    </Link>
                  )
                })}
              </nav>

              {/* Desktop right */}
              <div className="hidden md:flex items-center gap-3">

                {/* Cart */}
                <Link href="/order" className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass-card-sm flex items-center justify-center text-tims-cream-muted group-hover:text-tims-cream transition-colors duration-300"
                  >
                    <ShoppingCart size={18} strokeWidth={1.5} />
                  </motion.div>
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-tims-red text-tims-cream text-[10px] font-body font-semibold flex items-center justify-center shadow-red-glow"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Profile */}
                <Link href="/login" className="group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass-card-sm flex items-center justify-center text-tims-cream-muted group-hover:text-tims-cream transition-colors duration-300"
                  >
                    <User size={18} strokeWidth={1.5} />
                  </motion.div>
                </Link>

                {/* Order Now — premium redesign */}
                <Link href="/order">
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      boxShadow: '0 0 30px rgba(200,16,46,0.7), 0 0 60px rgba(200,16,46,0.3)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25, ease: easings.apple }}
                    style={{
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            '8px',
                      background:     'linear-gradient(135deg, #C8102E 0%, #a00d24 100%)',
                      color:          '#FFF5E4',
                      fontFamily:     'var(--font-body)',
                      fontSize:       '0.82rem',
                      fontWeight:     600,
                      letterSpacing:  '0.04em',
                      textTransform:  'uppercase',
                      padding:        '10px 22px',
                      borderRadius:   '100px',
                      border:         '1px solid rgba(255,100,100,0.3)',
                      boxShadow:      '0 0 20px rgba(200,16,46,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
                      position:       'relative',
                      overflow:       'hidden',
                      cursor:         'none',
                    }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                      style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        width:      '40%',
                        height:     '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        pointerEvents: 'none',
                      }}
                    />
                    <Coffee size={13} strokeWidth={2} />
                    Order Now
                  </motion.div>
                </Link>

              </div>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden w-10 h-10 rounded-full glass-card-sm flex items-center justify-center text-tims-cream"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={18} strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={18} strokeWidth={1.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9980] flex flex-col md:hidden"
            style={{
              backgroundColor:    'rgba(13,6,0,0.97)',
              backdropFilter:     'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="glow-orb-red w-96 h-96 -top-20 -right-20 opacity-30" />
            </div>

            <div className="relative z-10 flex flex-col h-full pt-24 pb-12 px-8">
              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2 flex-1"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  const Icon     = link.icon
                  return (
                    <motion.div key={link.href} variants={mobileMenuLinks}>
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center gap-4 py-4 px-4 rounded-2xl transition-all duration-300 group',
                          isActive ? 'glass-card-static' : 'hover:bg-glass-bg'
                        )}
                      >
                        <span className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                          isActive ? 'bg-tims-red text-tims-cream shadow-red-glow' : 'glass-card-sm text-tims-cream-muted group-hover:text-tims-cream'
                        )}>
                          <Icon size={18} strokeWidth={1.5} />
                        </span>
                        <span
                          className={cn(
                            'font-display text-4xl font-light transition-colors duration-300',
                            isActive ? 'text-tims-cream' : 'text-tims-cream-muted group-hover:text-tims-cream'
                          )}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.span layoutId="mobile-active-dot" className="ml-auto w-2 h-2 rounded-full bg-tims-red shadow-red-glow" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              <motion.div variants={mobileMenuLinks} initial="hidden" animate="visible" className="flex flex-col gap-3 mt-8">
                <Link href="/order">
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            '8px',
                      background:     'linear-gradient(135deg, #C8102E 0%, #a00d24 100%)',
                      color:          '#FFF5E4',
                      fontFamily:     'var(--font-body)',
                      fontSize:       '1rem',
                      fontWeight:     600,
                      letterSpacing:  '0.04em',
                      textTransform:  'uppercase',
                      padding:        '16px',
                      borderRadius:   '16px',
                      border:         '1px solid rgba(255,100,100,0.2)',
                      boxShadow:      '0 0 30px rgba(200,16,46,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    <Coffee size={16} strokeWidth={2} />
                    Order Now
                  </motion.div>
                </Link>
                <div className="flex gap-3">
                  <Link href="/login"  className="flex-1 btn-glass text-center py-3 text-sm">Sign In</Link>
                  <Link href="/signup" className="flex-1 btn-glass text-center py-3 text-sm">Sign Up</Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
