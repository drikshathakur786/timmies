'use client'

import { motion } from 'framer-motion'
import { Smartphone, Star, Zap, Gift } from 'lucide-react'
import {
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/utils/animations'

const appFeatures = [
  { icon: Zap,      text: 'Order ahead — skip the line'     },
  { icon: Gift,     text: 'Exclusive app-only deals'         },
  { icon: Star,     text: 'Track your Tims Rewards points'   },
  { icon: Smartphone, text: 'Find locations near you'        },
]

export default function AppSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0' }}>

      {/* Background */}
      <div style={{
        position: 'absolute',
        inset:    0,
        background: `
          radial-gradient(ellipse 60% 80% at 0% 50%, rgba(200,16,46,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 100% 50%, rgba(212,160,23,0.12) 0%, transparent 60%),
          #0D0600
        `,
      }} />

      {/* Top + bottom border lines */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,245,228,0.08), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,245,228,0.08), transparent)',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '5rem',
            alignItems:          'center',
          }}
          className="app-grid"
        >

          {/* ── Left: Text + features ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Label */}
            <motion.div variants={fadeInLeft} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '8px',
                background:    'rgba(212,160,23,0.1)',
                border:        '1px solid rgba(212,160,23,0.2)',
                borderRadius:  '100px',
                padding:       '5px 14px',
                fontFamily:    'var(--font-body)',
                fontSize:      '0.7rem',
                color:         '#D4A017',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight:    500,
              }}>
                <Smartphone size={10} strokeWidth={2} />
                Get the App
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInLeft}
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight:    300,
                color:         '#FFF5E4',
                margin:        '0 0 1rem 0',
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Your Tims.
              <br />
              <span style={{ color: '#D4A017' }}>In your pocket.</span>
            </motion.h2>

            <motion.p
              variants={fadeInLeft}
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '0.95rem',
                color:        '#C9B99A',
                lineHeight:   1.7,
                marginBottom: '2rem',
                maxWidth:     '400px',
              }}
            >
              Order ahead, collect rewards, find locations and unlock
              exclusive deals — all from the Tim Hortons app.
            </motion.p>

            {/* Feature list */}
            <motion.div
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}
            >
              {appFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.text}
                    variants={fadeInUp}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <div style={{
                      width:          '32px',
                      height:         '32px',
                      borderRadius:   '8px',
                      background:     'rgba(212,160,23,0.1)',
                      border:         '1px solid rgba(212,160,23,0.2)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                    }}>
                      <Icon size={14} strokeWidth={1.5} color="#D4A017" />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.875rem',
                      color:      '#C9B99A',
                    }}>
                      {feature.text}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Download buttons */}
            <motion.div
              variants={fadeInLeft}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              {/* App Store button */}
              <motion.a
                href="#"
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:              'flex',
                  alignItems:           'center',
                  gap:                  '10px',
                  background:           'rgba(255,245,228,0.06)',
                  border:               '1px solid rgba(255,245,228,0.12)',
                  borderRadius:         '14px',
                  padding:              '10px 20px',
                  backdropFilter:       'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  textDecoration:       'none',
                  transition:           'all 0.3s ease',
                }}
              >
                {/* Apple icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF5E4">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: '#C9B99A', lineHeight: 1 }}>
                    Download on the
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: '#FFF5E4', lineHeight: 1.2 }}>
                    App Store
                  </div>
                </div>
              </motion.a>

              {/* Google Play button */}
              <motion.a
                href="#"
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:              'flex',
                  alignItems:           'center',
                  gap:                  '10px',
                  background:           'rgba(255,245,228,0.06)',
                  border:               '1px solid rgba(255,245,228,0.12)',
                  borderRadius:         '14px',
                  padding:              '10px 20px',
                  backdropFilter:       'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  textDecoration:       'none',
                  transition:           'all 0.3s ease',
                }}
              >
                {/* Google Play icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF5E4">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                </svg>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: '#C9B99A', lineHeight: 1 }}>
                    Get it on
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: '#FFF5E4', lineHeight: 1.2 }}>
                    Google Play
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: QR code + phone mockup ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{
              display:        'flex',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            '2rem',
            }}
          >
            {/* QR code card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background:           'rgba(255,245,228,0.05)',
                backdropFilter:       'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border:               '1px solid rgba(255,245,228,0.12)',
                borderRadius:         '24px',
                padding:              '1.5rem',
                display:              'flex',
                flexDirection:        'column',
                alignItems:           'center',
                gap:                  '1rem',
                boxShadow:            '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {/* QR code placeholder */}
              <div style={{
                width:        '160px',
                height:       '160px',
                borderRadius: '16px',
                background:   '#FFF5E4',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                position:     'relative',
                overflow:     'hidden',
              }}>
                {/* QR pattern simulation */}
                <div style={{
                  display:             'grid',
                  gridTemplateColumns: 'repeat(8, 1fr)',
                  gap:                 '3px',
                  padding:             '12px',
                  width:               '100%',
                  height:              '100%',
                }}>
                  {Array.from({ length: 64 }).map((_, i) => {
                    const corners = [0,1,7,8,14,15,48,49,55,56,62,63]
                    const isCorner = corners.includes(i)
                    const isDark   = isCorner || Math.random() > 0.5
                    return (
                      <div
                        key={i}
                        style={{
                          borderRadius: '1px',
                          background:   isDark ? '#0D0600' : 'transparent',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Center logo */}
                <div style={{
                  position:       'absolute',
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '8px',
                  background:     '#C8102E',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   '0.4rem',
                    fontWeight: 600,
                    color:      '#FFF5E4',
                    textAlign:  'center',
                    lineHeight: 1.1,
                  }}>
                    Tim<br />Hortons
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.8rem',
                  fontWeight: 500,
                  color:      '#FFF5E4',
                  margin:     '0 0 4px 0',
                }}>
                  Scan to download
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.7rem',
                  color:      '#C9B99A',
                  margin:     0,
                }}>
                  iOS &amp; Android
                </p>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative' }}
            >
              {/* Phone frame */}
              <div style={{
                width:        '140px',
                height:       '280px',
                borderRadius: '32px',
                background:   'linear-gradient(180deg, rgba(42,20,8,0.9) 0%, rgba(13,6,0,0.95) 100%)',
                border:       '1.5px solid rgba(255,245,228,0.15)',
                boxShadow:    '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,245,228,0.1)',
                overflow:     'hidden',
                position:     'relative',
                display:      'flex',
                flexDirection: 'column',
              }}>
                {/* Notch */}
                <div style={{
                  width:        '60px',
                  height:       '20px',
                  background:   '#0D0600',
                  borderRadius: '0 0 12px 12px',
                  margin:       '0 auto',
                  flexShrink:   0,
                }} />

                {/* Screen content */}
                <div style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                  {/* App header */}
                  <div style={{
                    background:   '#C8102E',
                    borderRadius: '8px',
                    padding:      '8px',
                    textAlign:    'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: '#FFF5E4', fontWeight: 600 }}>
                      Tim Hortons
                    </span>
                  </div>

                  {/* Points card */}
                  <div style={{
                    background:   'rgba(212,160,23,0.2)',
                    border:       '1px solid rgba(212,160,23,0.3)',
                    borderRadius: '8px',
                    padding:      '8px',
                  }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.45rem', color: '#D4A017', marginBottom: '2px' }}>
                      REWARDS
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#F5C842', lineHeight: 1 }}>
                      2,450
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.4rem', color: '#C9B99A' }}>
                      points
                    </div>
                  </div>

                  {/* Mini menu items */}
                  {['Original Blend', 'Iced Capp', 'Timbits'].map((item) => (
                    <div
                      key={item}
                      style={{
                        background:   'rgba(255,245,228,0.05)',
                        border:       '1px solid rgba(255,245,228,0.08)',
                        borderRadius: '6px',
                        padding:      '6px 8px',
                        display:      'flex',
                        alignItems:   'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.45rem', color: '#FFF5E4' }}>
                        {item}
                      </span>
                      <div style={{
                        width:        '12px',
                        height:       '12px',
                        borderRadius: '50%',
                        background:   '#C8102E',
                      }} />
                    </div>
                  ))}
                </div>

                {/* Home indicator */}
                <div style={{
                  width:        '40px',
                  height:       '3px',
                  borderRadius: '2px',
                  background:   'rgba(255,245,228,0.3)',
                  margin:       '0 auto 8px',
                  flexShrink:   0,
                }} />
              </div>

              {/* Phone glow */}
              <div style={{
                position:     'absolute',
                bottom:       '-20px',
                left:         '50%',
                transform:    'translateX(-50%)',
                width:        '100px',
                height:       '40px',
                background:   'radial-gradient(circle, rgba(200,16,46,0.4) 0%, transparent 70%)',
                filter:       'blur(15px)',
                pointerEvents: 'none',
              }} />
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .app-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>

    </section>
  )
}