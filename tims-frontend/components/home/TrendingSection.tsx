'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Star, ArrowUpRight, Flame } from 'lucide-react'
import { getPopularItems } from '@/lib/data/menu'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '@/lib/utils/animations'

// Real food/coffee images per category
const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=700&fit=crop&crop=center&auto=format&q=85',
  'cold-drinks': 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&h=700&fit=crop&crop=center&auto=format&q=85',
  'food':        'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=600&h=700&fit=crop&crop=center&auto=format&q=85',
  'baked-goods': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=700&fit=crop&crop=center&auto=format&q=85',
}

const categoryAccent: Record<string, { bg: string; text: string; border: string }> = {
  'hot-drinks':  { bg: 'rgba(200,16,46,0.15)',  text: '#ff6b6b', border: 'rgba(200,16,46,0.3)'  },
  'cold-drinks': { bg: 'rgba(59,130,246,0.15)',  text: '#93c5fd', border: 'rgba(59,130,246,0.3)' },
  'food':        { bg: 'rgba(234,179,8,0.15)',   text: '#fde047', border: 'rgba(234,179,8,0.3)'  },
  'baked-goods': { bg: 'rgba(212,160,23,0.15)',  text: '#F5C842', border: 'rgba(212,160,23,0.3)' },
}

export default function TrendingSection() {
  const items  = getPopularItems().slice(0, 3)
  const [left, center, right] = items

  if (!left || !center || !right) return null

  return (
    <section style={{ position: 'relative', padding: '6rem 0', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: '#0D0600' }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', userSelect: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 18vw, 220px)',
        fontWeight: 700, color: 'transparent',
        WebkitTextStroke: '1px rgba(255,245,228,0.025)',
        lineHeight: 1, zIndex: 1,
      }}>
        Trending
      </div>

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ marginBottom: '3rem' }}
        >
          <motion.div variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.2)',
              borderRadius: '100px', padding: '4px 12px',
            }}>
              <TrendingUp size={12} color="#C8102E" strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#C8102E', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                Trending Now
              </span>
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300, color: '#FFF5E4',
            margin: 0, lineHeight: 1, letterSpacing: '-0.02em',
          }}>
            What Canada{' '}
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px #C8102E' }}>
              is ordering
            </span>
          </motion.h2>
        </motion.div>

        {/* Asymmetric grid */}
        <div
          className="trending-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}
        >

          {/* Left card */}
          <motion.div
            variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ minHeight: '420px' }}
          >
            <Link href="/order" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                height: '100%',
                background: 'rgba(255,245,228,0.04)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,245,228,0.09)',
                borderRadius: '24px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                {/* Image */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '240px' }}>
                  <img
                    src={categoryImages[left.category] ?? categoryImages['hot-drinks']}
                    alt={left.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(13,6,0,0.1) 0%, transparent 40%, rgba(13,6,0,0.8) 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: categoryAccent[left.category]?.bg ?? 'rgba(200,16,46,0.15)',
                    border: '1px solid ' + (categoryAccent[left.category]?.border ?? 'rgba(200,16,46,0.3)'),
                    borderRadius: '100px', padding: '3px 10px',
                  }}>
                    <Flame size={8} color={categoryAccent[left.category]?.text ?? '#ff6b6b'} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: categoryAccent[left.category]?.text ?? '#ff6b6b' }}>
                      {left.categoryLabel}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: '#FFF5E4', margin: '0 0 6px 0' }}>
                    {left.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#C9B99A', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                    {left.description.slice(0, 75)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#D4A017' }}>
                      ${left.price.toFixed(2)}
                    </span>
                    <ArrowUpRight size={16} color="#C9B99A" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Center card — featured */}
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Animated gradient border */}
            <div style={{
              position: 'absolute', inset: '-1px', borderRadius: '25px',
              background: 'linear-gradient(135deg, #C8102E, #D4A017, #C8102E)',
              backgroundSize: '300% 300%',
              animation: 'borderRotate 4s ease infinite', zIndex: 0,
            }} />

            <Link href="/order" style={{ textDecoration: 'none', display: 'block', height: '100%', position: 'relative', zIndex: 1 }}>
              <div style={{
                height: '100%', minHeight: '480px',
                background: 'rgba(20,8,0,0.96)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}>
                {/* Staff pick banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(200,16,46,0.3), rgba(212,160,23,0.2))',
                  padding: '10px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,245,228,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={10} fill="#D4A017" color="#D4A017" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#D4A017', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      Staff Pick
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#C9B99A' }}>
                    {center.categoryLabel}
                  </span>
                </div>

                {/* Image — taller for center */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
                  <motion.img
                    src={categoryImages[center.category] ?? categoryImages['hot-drinks']}
                    alt={center.name}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(13,6,0,0.05) 0%, transparent 35%, rgba(13,6,0,0.85) 100%)',
                  }} />

                  {/* Red glow overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '200px', height: '100px',
                    background: 'radial-gradient(circle, rgba(200,16,46,0.35) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 400, color: '#FFF5E4', margin: '0 0 8px 0', lineHeight: 1.1 }}>
                    {center.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#C9B99A', margin: '0 0 1.25rem 0', lineHeight: 1.6 }}>
                    {center.description.slice(0, 90)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', fontWeight: 600, color: '#D4A017' }}>
                      ${center.price.toFixed(2)}
                    </span>
                    <div style={{
                      background: '#C8102E', color: '#FFF5E4',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                      padding: '8px 20px', borderRadius: '100px',
                      boxShadow: '0 0 20px rgba(200,16,46,0.4)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      Order Now
                      <ArrowUpRight size={12} strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right card */}
          <motion.div
            variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportConfig}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ minHeight: '420px' }}
          >
            <Link href="/order" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                height: '100%',
                background: 'rgba(255,245,228,0.04)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,245,228,0.09)',
                borderRadius: '24px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '240px' }}>
                  <img
                    src={categoryImages[right.category] ?? categoryImages['baked-goods']}
                    alt={right.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(13,6,0,0.1) 0%, transparent 40%, rgba(13,6,0,0.8) 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: categoryAccent[right.category]?.bg ?? 'rgba(212,160,23,0.15)',
                    border: '1px solid ' + (categoryAccent[right.category]?.border ?? 'rgba(212,160,23,0.3)'),
                    borderRadius: '100px', padding: '3px 10px',
                  }}>
                    <Star size={8} fill={categoryAccent[right.category]?.text ?? '#F5C842'} color={categoryAccent[right.category]?.text ?? '#F5C842'} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: categoryAccent[right.category]?.text ?? '#F5C842' }}>
                      {right.categoryLabel}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: '#FFF5E4', margin: '0 0 6px 0' }}>
                    {right.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#C9B99A', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                    {right.description.slice(0, 75)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#D4A017' }}>
                      ${right.price.toFixed(2)}
                    </span>
                    <ArrowUpRight size={16} color="#C9B99A" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trending-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
