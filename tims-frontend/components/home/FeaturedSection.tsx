'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getFeaturedItems } from '@/lib/data/menu'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/utils/animations'

const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format',
  'cold-drinks': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format',
  'food':        'https://images.unsplash.com/photo-1619740455993-9d912f9a8a53?w=400&h=300&fit=crop&auto=format',
  'baked-goods': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&auto=format',
}

const categoryGlow: Record<string, string> = {
  'hot-drinks':  'rgba(200,16,46,0.3)',
  'cold-drinks': 'rgba(59,130,246,0.3)',
  'food':        'rgba(234,179,8,0.3)',
  'baked-goods': 'rgba(212,160,23,0.3)',
}

function MenuCard({ item }: { item: ReturnType<typeof getFeaturedItems>[0] }) {
  const image = categoryImages[item.category] ?? categoryImages['hot-drinks']
  const glow  = categoryGlow[item.category]  ?? categoryGlow['hot-drinks']

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        flex:            '0 0 260px',
        scrollSnapAlign: 'start',
        position:        'relative',
      }}
    >
      <div style={{
        background:           'rgba(255,245,228,0.05)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:               '1px solid rgba(255,245,228,0.10)',
        borderRadius:         '24px',
        overflow:             'hidden',
        height:               '100%',
        display:              'flex',
        flexDirection:        'column',
        boxShadow:            '0 8px 32px rgba(0,0,0,0.4)',
      }}>

        {/* Image area */}
        <div style={{
          position:   'relative',
          height:     '180px',
          overflow:   'hidden',
          flexShrink: 0,
        }}>
          <motion.img
            src={image}
            alt={item.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width:     '100%',
              height:    '100%',
              objectFit: 'cover',
              display:   'block',
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(13,6,0,0.8) 100%)',
          }} />

          {/* Glow */}
          <div style={{
            position:   'absolute',
            bottom:     '-10px',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '140px',
            height:     '60px',
            background: 'radial-gradient(circle, ' + glow + ' 0%, transparent 70%)',
            filter:     'blur(12px)',
          }} />

          {/* Popular badge */}
          {item.popular && (
            <div style={{
              position:     'absolute',
              top:          '10px',
              left:         '10px',
              zIndex:       3,
              display:      'flex',
              alignItems:   'center',
              gap:          '4px',
              background:   'rgba(212,160,23,0.15)',
              border:       '1px solid rgba(212,160,23,0.3)',
              borderRadius: '100px',
              padding:      '3px 10px',
            }}>
              <Star size={8} fill="#F5C842" color="#F5C842" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#F5C842' }}>
                Popular
              </span>
            </div>
          )}

          {/* Category badge */}
          <div style={{
            position:     'absolute',
            top:          '10px',
            right:        '10px',
            zIndex:       3,
            background:   'rgba(255,245,228,0.06)',
            border:       '1px solid rgba(255,245,228,0.12)',
            borderRadius: '100px',
            padding:      '3px 10px',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#C9B99A' }}>
              {item.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize:   '1.25rem',
            fontWeight: 400,
            color:      '#FFF5E4',
            margin:     '0 0 6px 0',
            lineHeight: 1.2,
          }}>
            {item.name}
          </h3>

          <p style={{
            fontFamily:      'var(--font-body)',
            fontSize:        '0.8rem',
            color:           '#C9B99A',
            margin:          '0 0 auto 0',
            lineHeight:      1.5,
            display:         '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
          }}>
            {item.description}
          </p>

          {/* Price + Add */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginTop:      '1rem',
            paddingTop:     '1rem',
            borderTop:      '1px solid rgba(255,245,228,0.08)',
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '1.1rem',
                fontWeight: 600,
                color:      '#D4A017',
              }}>
                ${item.price.toFixed(2)}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.7rem',
                color:      '#C9B99A',
                marginLeft: '4px',
              }}>
                {item.calories} cal
              </span>
            </div>

            <Link href="/order">
              <motion.button
                whileHover={{
                  background: '#C8102E',
                  boxShadow:  '0 0 20px rgba(200,16,46,0.5)',
                  scale:      1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '50%',
                  background:     'rgba(255,245,228,0.08)',
                  border:         '1px solid rgba(255,245,228,0.15)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#FFF5E4',
                  cursor:         'none',
                }}
              >
                <ShoppingBag size={15} strokeWidth={1.5} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const items     = getFeaturedItems()

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
  }

  return (
    <section style={{ position: 'relative', paddingBottom: '6rem' }}>

      <div style={{ position: 'absolute', inset: 0, background: '#0D0600', pointerEvents: 'none' }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            marginBottom:   '2.5rem',
            flexWrap:       'wrap',
            gap:            '1rem',
          }}
        >
          <motion.div variants={fadeInUp}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.75rem',
              color:         '#C8102E',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '0.5rem',
              fontWeight:    500,
            }}>
              Featured
            </p>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 4vw, 3.5rem)',
              fontWeight:    300,
              color:         '#FFF5E4',
              margin:        0,
              lineHeight:    1,
              letterSpacing: '-0.02em',
            }}>
              Today&apos;s Picks
            </h2>
          </motion.div>

          {/* Scroll controls */}
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '8px' }}>
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     'rgba(255,245,228,0.06)',
                border:         '1px solid rgba(255,245,228,0.12)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#C9B99A',
                cursor:         'none',
              }}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     'rgba(255,245,228,0.06)',
                border:         '1px solid rgba(255,245,228,0.12)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#C9B99A',
                cursor:         'none',
              }}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll row */}
        <div
          ref={scrollRef}
          style={{
            display:         'flex',
            gap:             '1.25rem',
            overflowX:       'auto',
            scrollSnapType:  'x mandatory',
            paddingBottom:   '1rem',
            scrollbarWidth:  'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link href="/menu" style={{
            fontFamily:     'var(--font-body)',
            fontSize:       '0.875rem',
            color:          '#C9B99A',
            textDecoration: 'none',
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '6px',
            borderBottom:   '1px solid rgba(201,185,154,0.3)',
            paddingBottom:  '2px',
          }}>
            View full menu
            <ChevronRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
