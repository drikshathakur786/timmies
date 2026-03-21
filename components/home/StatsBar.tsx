'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, statReveal } from '@/lib/utils/animations'

// ── Counter hook ─────────────────────────────────────────────
function useCounter(end: number, duration: number = 2000, started: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return

    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * (end - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(step)
  }, [started, end, duration])

  return count
}

// ── Stat item ────────────────────────────────────────────────
interface StatProps {
  value:    number
  suffix:   string
  label:    string
  started:  boolean
  duration: number
}

function StatItem({ value, suffix, label, started, duration }: StatProps) {
  const count = useCounter(value, duration, started)

  return (
    <motion.div
      variants={statReveal}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '1.5rem 1rem',
        flex:           1,
      }}
    >
      <div
        style={{
          fontFamily:   'var(--font-display)',
          fontSize:     'clamp(2rem, 4vw, 3.5rem)',
          fontWeight:   400,
          color:        '#D4A017',
          lineHeight:   1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.8rem',
          color:         '#C9B99A',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight:    500,
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

// ── Stats data ───────────────────────────────────────────────
const stats = [
  { value: 5700,  suffix: '+', label: 'Locations',        duration: 2000 },
  { value: 60,    suffix: '',  label: 'Years of Coffee',   duration: 1500 },
  { value: 100,   suffix: '%', label: 'Canadian',          duration: 1200 },
  { value: 1964,  suffix: '',  label: 'Est.',              duration: 2500 },
]

// ── Component ────────────────────────────────────────────────
export default function StatsBar() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        zIndex:   10,
        padding:  '0 0 4rem 0',
      }}
    >
      <div className="section-wrapper">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background:           'rgba(255,245,228,0.04)',
            backdropFilter:       'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border:               '1px solid rgba(255,245,228,0.08)',
            borderRadius:         '24px',
            display:              'flex',
            flexWrap:             'wrap',
            position:             'relative',
            overflow:             'hidden',
            boxShadow:            '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,245,228,0.06)',
          }}
        >

          {/* Subtle top highlight line */}
          <div
            style={{
              position:   'absolute',
              top:        0,
              left:       '10%',
              right:      '10%',
              height:     '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,245,228,0.15), transparent)',
            }}
          />

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                display:  'flex',
                flex:     '1 1 150px',
                position: 'relative',
              }}
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                started={inView}
                duration={stat.duration}
              />

              {/* Vertical divider — hide after last item */}
              {index < stats.length - 1 && (
                <div
                  style={{
                    position:  'absolute',
                    right:     0,
                    top:       '20%',
                    bottom:    '20%',
                    width:     '1px',
                    background: 'rgba(255,245,228,0.08)',
                  }}
                />
              )}
            </div>
          ))}

        </motion.div>
      </div>
    </div>
  )
}