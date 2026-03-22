'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Star, Clock, MapPin, ChevronRight, ShoppingBag } from 'lucide-react'
import SteamEffect from '@/components/ui/SteamEffect'

const drinks = [
  {
    id: 0,
    name: 'Original Blend',
    sub: 'Medium Roast Coffee',
    price: '$2.19',
    cal: '10 cal',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1100&fit=crop&crop=center&auto=format&q=90',
    accent: '#C8102E',
    glow: 'rgba(200,16,46,0.5)',
    bg: 'rgba(200,16,46,0.12)',
  },
  {
    id: 1,
    name: 'Iced Capp',
    sub: 'Frozen Blended Drink',
    price: '$4.49',
    cal: '470 cal',
    tag: 'Iconic',
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=800&h=1100&fit=crop&crop=center&auto=format&q=90',
    accent: '#3B82F6',
    glow: 'rgba(59,130,246,0.5)',
    bg: 'rgba(59,130,246,0.12)',
  },
  {
    id: 2,
    name: 'French Vanilla',
    sub: 'Hot Specialty Drink',
    price: '$3.49',
    cal: '290 cal',
    tag: "Canada's Fav",
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&h=1100&fit=crop&crop=center&auto=format&q=90',
    accent: '#D4A017',
    glow: 'rgba(212,160,23,0.5)',
    bg: 'rgba(212,160,23,0.12)',
  },
  {
    id: 3,
    name: 'Cold Brew',
    sub: '16-Hour Steeped',
    price: '$4.29',
    cal: '5 cal',
    tag: 'Smooth',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&h=1100&fit=crop&crop=center&auto=format&q=90',
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.5)',
    bg: 'rgba(139,92,246,0.12)',
  },
]

export default function Hero() {
  const [mounted, setMounted]       = useState(false)
  const [active, setActive]         = useState(0)
  const [prevActive, setPrevActive] = useState(0)
  const containerRef                = useRef<HTMLElement>(null)
  const { scrollY }                 = useScroll()
  const heroOpacity                 = useTransform(scrollY, [0, 500], [1, 0])
  const heroY                       = useTransform(scrollY, [0, 500], [0, 80])

  useEffect(() => {
    setMounted(true)
    const iv = setInterval(() => {
      setActive(prev => {
        setPrevActive(prev)
        return (prev + 1) % drinks.length
      })
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  if (!mounted) return null

  const drink = drinks[active]

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity, position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* Background color shifts per drink */}
      <AnimatePresence>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', inset: 0,
            background:
              'radial-gradient(ellipse 70% 80% at 70% 50%, ' + drink.bg + ' 0%, transparent 65%),' +
              'radial-gradient(ellipse 50% 50% at 15% 15%, rgba(200,16,46,0.1) 0%, transparent 50%),' +
              '#0D0600',
          }}
        />
      </AnimatePresence>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }} />

      {/* Scan line */}
      <motion.div
        animate={{ y: ['-5%', '105%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatDelay: 8 }}
        style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,16,46,0.2), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />

      {/* Side ticker — only visible indicator, no stats */}
      <div style={{
        position: 'absolute', left: '1.5rem', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20,
      }}>
        {drinks.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrevActive(active); setActive(i) }}
            style={{
              width: '2px', height: active === i ? '36px' : '14px',
              borderRadius: '2px', border: 'none', padding: 0, cursor: 'none',
              background: active === i ? drink.accent : 'rgba(255,245,228,0.18)',
              transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
        ))}
      </div>

      {/* MAIN GRID */}
      <motion.div style={{ y: heroY }} className="section-wrapper">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
            alignItems: 'center',
            gap: '2rem',
            paddingTop: '6rem',
            paddingBottom: '4rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* LEFT: TEXT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ marginBottom: '2rem' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,245,228,0.06)',
                border: '1px solid rgba(255,245,228,0.12)',
                borderRadius: '100px', padding: '6px 16px',
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: '#C9B99A', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                <Star size={10} color="#D4A017" fill="#D4A017" />
                Est. 1964 — Canada&apos;s Finest
              </span>
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 7vw, 8.5rem)',
                  fontWeight: 300, color: '#FFF5E4',
                  lineHeight: 0.92, margin: 0, letterSpacing: '-0.03em',
                }}
              >
                Canada&apos;s
              </motion.h1>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 7vw, 8.5rem)',
                  fontWeight: 600, color: 'transparent',
                  WebkitTextStroke: '2px #C8102E',
                  lineHeight: 0.92, margin: 0, letterSpacing: '-0.03em',
                }}
              >
                Finest
              </motion.h1>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 3.5rem)',
                  fontWeight: 300, fontStyle: 'italic',
                  color: '#D4A017', lineHeight: 1.2,
                  margin: 0, letterSpacing: '0.02em',
                }}
              >
                Since 1964
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                color: '#C9B99A', lineHeight: 1.7,
                maxWidth: '420px', marginBottom: '2.5rem',
              }}
            >
              Freshly brewed every 20 minutes. Over 5,700 locations across Canada.
              The coffee that built a nation, one cup at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '3rem' }}
            >
              <Link href="/order" style={{
                background: '#C8102E', color: '#FFF5E4',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500,
                padding: '14px 36px', borderRadius: '100px', textDecoration: 'none',
                boxShadow: '0 0 30px rgba(200,16,46,0.5)',
                display: 'inline-flex', alignItems: 'center',
              }}>
                Order Now
              </Link>
              <Link href="/menu" style={{
                background: 'rgba(255,245,228,0.06)',
                border: '1px solid rgba(255,245,228,0.15)',
                color: '#FFF5E4', fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', fontWeight: 500,
                padding: '14px 36px', borderRadius: '100px', textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}>
                View Menu <ChevronRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
            >
              {[
                { icon: Clock,  text: 'Fresh every 20 min' },
                { icon: MapPin, text: '5,700+ locations'   },
                { icon: Star,   text: 'Tims Rewards'       },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#C9B99A',
                }}>
                  <Icon size={13} color="#C8102E" strokeWidth={1.5} />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: PILL IMAGE + floating cards only */}
          <div style={{
            position: 'relative',
            height: '580px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: '500px', height: '500px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,245,228,0.05)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: '400px', height: '400px',
                borderRadius: '50%',
                border: '1px solid rgba(255,245,228,0.03)',
                pointerEvents: 'none',
              }}
            />

            {/* Glow orb */}
            <AnimatePresence>
              <motion.div
                key={'glow-' + active}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '300px', height: '300px', borderRadius: '50%',
                  background: 'radial-gradient(circle, ' + drink.glow + ' 0%, transparent 70%)',
                  filter: 'blur(50px)', pointerEvents: 'none',
                }}
              />
            </AnimatePresence>

            {/* PILL IMAGE */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <div style={{
                width: '280px',
                height: '460px',
                borderRadius: '140px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,245,228,0.08)',
              }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={'img-' + active}
                    src={drink.image}
                    alt={drink.name}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                    }}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(13,6,0,0.2) 0%, transparent 25%, transparent 60%, rgba(13,6,0,0.9) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Steam */}
                <div style={{
                  position: 'absolute', top: '16px',
                  left: '50%', transform: 'translateX(-50%)',
                }}>
                  <SteamEffect wisps={3} size="sm" intensity="subtle" />
                </div>

                {/* Price pill at bottom */}
                <div style={{
                  position: 'absolute', bottom: '24px',
                  left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(13,6,0,0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,245,228,0.12)',
                  borderRadius: '100px',
                  padding: '8px 22px',
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={'price-' + active}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem', color: '#D4A017', fontWeight: 400,
                      }}
                    >
                      {drink.price}
                    </motion.span>
                  </AnimatePresence>
                  <div style={{ width: '1px', height: '14px', background: 'rgba(255,245,228,0.2)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#C9B99A' }}>
                    {drink.cal}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* FLOATING DRINK INFO CARD — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'absolute',
                top: '30px', right: '0px',
                background: 'rgba(13,6,0,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,245,228,0.1)',
                borderRadius: '20px',
                padding: '16px 20px',
                minWidth: '170px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                zIndex: 10,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={'info-' + active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: drink.bg,
                    border: '1px solid ' + drink.glow.replace('0.5', '0.35'),
                    borderRadius: '100px', padding: '3px 10px', marginBottom: '10px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                      color: drink.accent, fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      {drink.tag}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.35rem',
                    fontWeight: 400, color: '#FFF5E4', margin: '0 0 4px 0', lineHeight: 1.1,
                  }}>
                    {drink.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                    color: '#C9B99A', margin: '0 0 12px 0',
                  }}>
                    {drink.sub}
                  </p>
                  <Link href="/order" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: '#C8102E', color: '#FFF5E4',
                    fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
                    padding: '6px 14px', borderRadius: '100px', textDecoration: 'none',
                    boxShadow: '0 0 12px rgba(200,16,46,0.4)',
                  }}>
                    <ShoppingBag size={11} strokeWidth={1.5} />
                    Order
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* DOT SWITCHER */}
            <div style={{
              position: 'absolute', bottom: '10px',
              left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '8px', zIndex: 10,
            }}>
              {drinks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPrevActive(active); setActive(i) }}
                  style={{
                    width: active === i ? '24px' : '6px',
                    height: '6px', borderRadius: '3px',
                    background: active === i ? drink.accent : 'rgba(255,245,228,0.2)',
                    border: 'none', cursor: 'none', padding: 0,
                    transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.62rem',
          color: '#C9B99A', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5,
        }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} color="#C9B99A" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 5rem !important; }
        }
      `}</style>
    </motion.section>
  )
}
