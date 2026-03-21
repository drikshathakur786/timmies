'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Star, Flame } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from '@/lib/data/menu'
import { cardReveal } from '@/lib/utils/animations'

const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format',
  'cold-drinks': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format',
  'food':        'https://images.unsplash.com/photo-1619740455993-9d912f9a8a53?w=400&h=300&fit=crop&auto=format',
  'baked-goods': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&auto=format',
}

const categoryGlow: Record<string, string> = {
  'hot-drinks':  'rgba(200,16,46,0.25)',
  'cold-drinks': 'rgba(59,130,246,0.25)',
  'food':        'rgba(234,179,8,0.25)',
  'baked-goods': 'rgba(212,160,23,0.25)',
}

interface MenuCardProps {
  item:     MenuItem
  onAdd?:   (item: MenuItem) => void
  selected?: boolean
}

export default function MenuCard({ item, onAdd, selected = false }: MenuCardProps) {
  const image = categoryImages[item.category]
  const glow  = categoryGlow[item.category]

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Selected red border */}
      {selected && (
        <div style={{
          position:     'absolute',
          inset:        '-2px',
          borderRadius: '26px',
          background:   'linear-gradient(135deg, #C8102E, #D4A017)',
          zIndex:       0,
          boxShadow:    '0 0 30px rgba(200,16,46,0.4)',
        }} />
      )}

      <div
        style={{
          position:             'relative',
          zIndex:               1,
          background:           'rgba(255,245,228,0.05)',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border:               selected
            ? '1px solid transparent'
            : '1px solid rgba(255,245,228,0.10)',
          borderRadius:         '24px',
          overflow:             'hidden',
          display:              'flex',
          flexDirection:        'column',
          boxShadow:            selected
            ? '0 16px 48px rgba(200,16,46,0.3)'
            : '0 8px 32px rgba(0,0,0,0.4)',
          height:               '100%',
        }}
      >
        {/* Image */}
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
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(13,6,0,0.85) 100%)`,
          }} />

          {/* Glow under image */}
          <div style={{
            position:   'absolute',
            bottom:     '-10px',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '140px',
            height:     '60px',
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            filter:     'blur(12px)',
          }} />

          {/* Popular badge */}
          {item.popular && (
            <div style={{
              position:     'absolute',
              top:          '10px',
              left:         '10px',
              display:      'flex',
              alignItems:   'center',
              gap:          '4px',
              background:   'rgba(212,160,23,0.15)',
              border:       '1px solid rgba(212,160,23,0.3)',
              borderRadius: '100px',
              padding:      '3px 10px',
              zIndex:       2,
            }}>
              <Star size={8} fill="#F5C842" color="#F5C842" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.62rem',
                color:      '#F5C842',
                fontWeight: 500,
              }}>
                Popular
              </span>
            </div>
          )}

          {/* Category badge */}
          <div style={{
            position:     'absolute',
            top:          '10px',
            right:        '10px',
            background:   'rgba(255,245,228,0.08)',
            border:       '1px solid rgba(255,245,228,0.12)',
            borderRadius: '100px',
            padding:      '3px 10px',
            zIndex:       2,
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.62rem',
              color:      '#C9B99A',
            }}>
              {item.categoryLabel}
            </span>
          </div>

          {/* Calories badge */}
          <div style={{
            position:     'absolute',
            bottom:       '10px',
            right:        '10px',
            display:      'flex',
            alignItems:   'center',
            gap:          '3px',
            background:   'rgba(13,6,0,0.6)',
            borderRadius: '100px',
            padding:      '3px 8px',
            zIndex:       2,
          }}>
            <Flame size={8} color="#C9B99A" strokeWidth={1.5} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.6rem',
              color:      '#C9B99A',
            }}>
              {item.calories} cal
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding:       '1.1rem',
          display:       'flex',
          flexDirection: 'column',
          flex:          1,
        }}>
          <h3 style={{
            fontFamily:   'var(--font-display)',
            fontSize:     '1.2rem',
            fontWeight:   400,
            color:        '#FFF5E4',
            margin:       '0 0 5px 0',
            lineHeight:   1.2,
          }}>
            {item.name}
          </h3>

          <p style={{
            fontFamily:       'var(--font-body)',
            fontSize:         '0.78rem',
            color:            '#C9B99A',
            margin:           '0 0 auto 0',
            lineHeight:       1.5,
            display:          '-webkit-box',
            WebkitLineClamp:  2,
            WebkitBoxOrient:  'vertical',
            overflow:         'hidden',
          }}>
            {item.description}
          </p>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div style={{
              display:   'flex',
              gap:       '4px',
              flexWrap:  'wrap',
              marginTop: '0.6rem',
            }}>
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '0.58rem',
                    color:         '#C9B99A',
                    background:    'rgba(255,245,228,0.04)',
                    border:        '1px solid rgba(255,245,228,0.08)',
                    borderRadius:  '100px',
                    padding:       '2px 8px',
                    letterSpacing: '0.04em',
                    textTransform: 'capitalize',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price + Add button */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginTop:      '0.875rem',
            paddingTop:     '0.875rem',
            borderTop:      '1px solid rgba(255,245,228,0.07)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '1.1rem',
                fontWeight: 600,
                color:      '#D4A017',
                lineHeight: 1,
              }}>
                ${item.price.toFixed(2)}
              </span>
              {item.sizes && (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.6rem',
                  color:      '#C9B99A',
                  marginTop:  '2px',
                }}>
                  from {item.sizes[0].label}
                </span>
              )}
            </div>

            <Link href="/order">
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  onAdd?.(item)
                }}
                whileHover={{
                  background: '#C8102E',
                  boxShadow:  '0 0 24px rgba(200,16,46,0.5)',
                  scale:      1.08,
                }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.2 }}
                style={{
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '50%',
                  background:     'rgba(255,245,228,0.07)',
                  border:         '1px solid rgba(255,245,228,0.14)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#FFF5E4',
                  cursor:         'none',
                }}
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}