'use client'

import { motion } from 'framer-motion'
import { Coffee, MapPin, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/utils/animations'

const features = [
  {
    icon:        Coffee,
    title:       'Freshly brewed every 20 minutes',
    description: 'We never serve coffee that has been sitting. Every cup is guaranteed fresh, every time you visit.',
    color:       '#C8102E',
  },
  {
    icon:        MapPin,
    title:       '5,700+ locations across Canada',
    description: 'From downtown cores to highway stops — there is always a Tim Hortons within reach.',
    color:       '#D4A017',
  },
  {
    icon:        Star,
    title:       'Tims Rewards — earn with every sip',
    description: 'Every purchase earns points. Redeem for free coffee, food, and exclusive member deals.',
    color:       '#C8102E',
  },
]

const deckCards = [
  {
    label:    'Original Blend',
    sub:      'Medium Roast',
    price:    '$2.19',
    rotate:   '-8deg',
    translate: '-20px',
    zIndex:   1,
    opacity:  0.5,
  },
  {
    label:    'French Vanilla',
    sub:      'Hot Drink',
    price:    '$3.49',
    rotate:   '-3deg',
    translate: '-8px',
    zIndex:   2,
    opacity:  0.75,
  },
  {
    label:    'Iced Capp',
    sub:      'Cold Drink',
    price:    '$4.49',
    rotate:   '0deg',
    translate: '0px',
    zIndex:   3,
    opacity:  1,
  },
]

export default function ExperienceSection() {
  return (
    <section
      style={{
        position:   'relative',
        overflow:   'hidden',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          background: `
            radial-gradient(ellipse 70% 60% at 0% 50%, rgba(200,16,46,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 100% 50%, rgba(212,160,23,0.06) 0%, transparent 50%),
            #0D0600
          `,
        }}
      />

      <div
        className="section-wrapper"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '5rem',
            alignItems:          'center',
          }}
          className="experience-grid"
        >

          {/* ── Left: Text content ── */}
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
                background:    'rgba(200,16,46,0.1)',
                border:        '1px solid rgba(200,16,46,0.2)',
                borderRadius:  '100px',
                padding:       '5px 14px',
                fontFamily:    'var(--font-body)',
                fontSize:      '0.7rem',
                color:         '#C8102E',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight:    500,
              }}>
                <Coffee size={10} strokeWidth={2} />
                The Tim Hortons Experience
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
                margin:        '0 0 1.5rem 0',
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
              }}
            >
              More than coffee.
              <br />
              <span style={{
                color:           'transparent',
                WebkitTextStroke: '1.5px #C8102E',
              }}>
                It&apos;s a moment.
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeInLeft}
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '0.95rem',
                color:        '#C9B99A',
                lineHeight:   1.7,
                marginBottom: '2.5rem',
                maxWidth:     '420px',
              }}
            >
              For over 60 years, Tim Hortons has been woven into the fabric
              of Canadian life. It is where mornings begin, where friends
              meet, and where memories are made — one cup at a time.
            </motion.p>

            {/* Feature points */}
            <motion.div
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    custom={index}
                    style={{
                      display: 'flex',
                      gap:     '1rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width:          '42px',
                      height:         '42px',
                      borderRadius:   '12px',
                      background:     `rgba(${feature.color === '#C8102E' ? '200,16,46' : '212,160,23'}, 0.12)`,
                      border:         `1px solid rgba(${feature.color === '#C8102E' ? '200,16,46' : '212,160,23'}, 0.2)`,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                    }}>
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        color={feature.color}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.95rem',
                        fontWeight: 500,
                        color:      '#FFF5E4',
                        margin:     '0 0 4px 0',
                        lineHeight: 1.3,
                      }}>
                        {feature.title}
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.82rem',
                        color:      '#C9B99A',
                        margin:     0,
                        lineHeight: 1.6,
                      }}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInLeft} style={{ marginTop: '2.5rem' }}>
              <Link
                href="/rewards"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '0.875rem',
                  fontWeight:     500,
                  color:          '#FFF5E4',
                  textDecoration: 'none',
                  background:     'rgba(255,245,228,0.06)',
                  border:         '1px solid rgba(255,245,228,0.12)',
                  borderRadius:   '100px',
                  padding:        '10px 24px',
                }}
              >
                Join Tims Rewards
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Fanned deck of cards ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{
              position:       'relative',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              height:         '400px',
            }}
          >
            {/* Glow behind deck */}
            <div style={{
              position:     'absolute',
              width:        '250px',
              height:       '250px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(200,16,46,0.2) 0%, transparent 70%)',
              filter:       'blur(50px)',
              pointerEvents: 'none',
            }} />

            {/* Deck of cards */}
            <div style={{ position: 'relative', width: '240px', height: '320px' }}>
              {deckCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 40, rotate: card.rotate }}
                  whileInView={{
                    opacity:   card.opacity,
                    y:         0,
                    rotate:    card.rotate,
                    x:         card.translate,
                  }}
                  whileHover={
                    index === deckCards.length - 1
                      ? { y: -12, scale: 1.03, opacity: 1 }
                      : undefined
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay:    index * 0.15,
                    ease:     [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    position: 'absolute',
                    top:      0,
                    left:     0,
                    width:    '220px',
                    zIndex:   card.zIndex,
                  }}
                >
                  <div style={{
                    background:           'rgba(255,245,228,0.06)',
                    backdropFilter:       'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border:               '1px solid rgba(255,245,228,0.12)',
                    borderRadius:         '20px',
                    padding:              '1.5rem',
                    boxShadow:            '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,245,228,0.08)',
                  }}>
                    {/* Card image area */}
                    <div style={{
                      height:         '140px',
                      borderRadius:   '14px',
                      background:     'linear-gradient(135deg, rgba(200,16,46,0.2), rgba(13,6,0,0.8))',
                      marginBottom:   '1rem',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width:        '55px',
                        height:       '65px',
                        background:   'linear-gradient(180deg, #C8102E 0%, #8B0000 100%)',
                        borderRadius: '5px 5px 10px 10px',
                        boxShadow:    '0 4px 16px rgba(200,16,46,0.4)',
                        display:      'flex',
                        alignItems:   'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize:   '0.45rem',
                          color:      'rgba(255,245,228,0.8)',
                          textAlign:  'center',
                          lineHeight: 1.1,
                        }}>
                          Tim<br />Hortons
                        </span>
                      </div>
                    </div>

                    {/* Card info */}
                    <div style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-display)',
                          fontSize:   '1.1rem',
                          fontWeight: 400,
                          color:      '#FFF5E4',
                          margin:     '0 0 2px 0',
                        }}>
                          {card.label}
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize:   '0.7rem',
                          color:      '#C9B99A',
                          margin:     0,
                        }}>
                          {card.sub}
                        </p>
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '1rem',
                        fontWeight: 600,
                        color:      '#D4A017',
                      }}>
                        {card.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>

    </section>
  )
}