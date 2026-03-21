'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift, Clock } from 'lucide-react'

const deals = [
  { title: '50% Off Any Coffee',     sub: 'Today only — any size, any roast', saving: '$1.25' },
  { title: 'Free Timbit with order', sub: 'Add any drink to qualify',          saving: '$0.50' },
  { title: 'Double Points Today',    sub: 'On all purchases over $5',           saving: '2x pts' },
]

export default function DailyDeal() {
  const [revealed,    setRevealed]    = useState(false)
  const [scratching,  setScratching]  = useState(false)
  const deal = deals[new Date().getDay() % deals.length]

  return (
    <div style={{ position: 'relative' }}>

      {/* Animated gradient border */}
      <div style={{
        position:     'absolute',
        inset:        '-1px',
        borderRadius: '25px',
        background:   'linear-gradient(135deg, #C8102E, #D4A017, #C8102E)',
        backgroundSize: '300% 300%',
        animation:    'borderRotate 4s ease infinite',
        zIndex:       0,
      }} />

      <div style={{
        position:             'relative',
        zIndex:               1,
        background:           'rgba(20,8,0,0.97)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius:         '24px',
        overflow:             'hidden',
        padding:              '2rem',
      }}>

        {/* Header */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width:          '40px',
              height:         '40px',
              borderRadius:   '12px',
              background:     'rgba(200,16,46,0.15)',
              border:         '1px solid rgba(200,16,46,0.25)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <Gift size={18} strokeWidth={1.5} color="#C8102E" />
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.2rem',
                fontWeight: 400,
                color:      '#FFF5E4',
                margin:     0,
              }}>
                Daily Deal
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={10} strokeWidth={1.5} color="#C9B99A" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.65rem',
                  color:      '#C9B99A',
                }}>
                  Resets at midnight
                </span>
              </div>
            </div>
          </div>

          {/* Saving badge */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background:   'rgba(200,16,46,0.15)',
                  border:       '1px solid rgba(200,16,46,0.3)',
                  borderRadius: '100px',
                  padding:      '4px 12px',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '5px',
                }}
              >
                <Sparkles size={10} color="#C8102E" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.72rem',
                  color:      '#C8102E',
                  fontWeight: 600,
                }}>
                  Save {deal.saving}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scratch area */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Revealed deal underneath */}
          <div style={{
            padding:        '2rem',
            background:     'linear-gradient(135deg, rgba(200,16,46,0.12), rgba(212,160,23,0.08))',
            border:         '1px solid rgba(255,245,228,0.08)',
            borderRadius:   '16px',
            textAlign:      'center',
          }}>
            <motion.div
              animate={revealed ? { scale: [0.95, 1.02, 1] } : {}}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <Sparkles
                size={32}
                color="#D4A017"
                strokeWidth={1}
                style={{ margin: '0 auto 1rem' }}
              />
              <h2 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.5rem, 3vw, 2rem)',
                fontWeight:    300,
                color:         '#FFF5E4',
                margin:        '0 0 8px 0',
                letterSpacing: '-0.02em',
              }}>
                {deal.title}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.85rem',
                color:      '#C9B99A',
                margin:     0,
              }}>
                {deal.sub}
              </p>
            </motion.div>
          </div>

          {/* Scratch overlay */}
          <AnimatePresence>
            {!revealed && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setScratching(true)}
                onMouseLeave={() => setScratching(false)}
                onClick={() => setRevealed(true)}
                style={{
                  position:       'absolute',
                  inset:          0,
                  borderRadius:   '16px',
                  background:     scratching
                    ? 'linear-gradient(135deg, rgba(42,20,8,0.92), rgba(30,12,4,0.95))'
                    : 'linear-gradient(135deg, #2A1408, #1E0C04)',
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '12px',
                  cursor:         'none',
                  transition:     'background 0.3s ease',
                  border:         '1px solid rgba(255,245,228,0.06)',
                }}
              >
                {/* Scratch texture pattern */}
                <div style={{
                  position:  'absolute',
                  inset:     0,
                  opacity:   0.06,
                  backgroundImage: `
                    repeating-linear-gradient(
                      45deg,
                      rgba(255,245,228,0.3) 0px,
                      rgba(255,245,228,0.3) 1px,
                      transparent 1px,
                      transparent 8px
                    )
                  `,
                  borderRadius: '16px',
                }} />

                {/* Sparkle animation */}
                <motion.div
                  animate={scratching ? {
                    rotate: [0, 15, -15, 0],
                    scale:  [1, 1.2, 1],
                  } : {
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: scratching ? 0.3 : 2, repeat: Infinity }}
                >
                  <Sparkles
                    size={32}
                    color={scratching ? '#D4A017' : '#C9B99A'}
                    strokeWidth={1.5}
                    style={{ transition: 'color 0.3s ease' }}
                  />
                </motion.div>

                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.9rem',
                    fontWeight: 500,
                    color:      scratching ? '#FFF5E4' : '#C9B99A',
                    margin:     '0 0 4px 0',
                    transition: 'color 0.3s ease',
                  }}>
                    {scratching ? 'Click to reveal!' : 'Scratch to reveal'}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.72rem',
                    color:      '#C9B99A',
                    margin:     0,
                    opacity:    0.6,
                  }}>
                    Today&apos;s exclusive deal
                  </p>
                </div>

                {/* Animated dots */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                      transition={{
                        duration: 1.5,
                        repeat:   Infinity,
                        delay:    i * 0.3,
                      }}
                      style={{
                        width:        '5px',
                        height:       '5px',
                        borderRadius: '50%',
                        background:   '#D4A017',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA after reveal */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ marginTop: '1.25rem' }}
            >
              <motion.button
                whileHover={{ boxShadow: '0 0 30px rgba(200,16,46,0.5)', y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width:        '100%',
                  padding:      '13px',
                  borderRadius: '14px',
                  background:   '#C8102E',
                  border:       'none',
                  color:        '#FFF5E4',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '0.9rem',
                  fontWeight:   500,
                  cursor:       'none',
                  boxShadow:    '0 0 20px rgba(200,16,46,0.35)',
                }}
              >
                Claim Deal Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}