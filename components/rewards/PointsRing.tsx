'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface PointsRingProps {
  points:    number
  maxPoints: number
  size?:     number
}

function useCounter(end: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])
  return count
}

export default function PointsRing({
  points    = 2450,
  maxPoints = 5000,
  size      = 260,
}: PointsRingProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count  = useCounter(points, 2000, inView)

  const stroke       = 12
  const radius       = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress     = points / maxPoints
  const dashOffset   = circumference * (1 - progress)

  return (
    <div
      ref={ref}
      style={{
        position:       'relative',
        width:          size,
        height:         size,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        margin:         '0 auto',
      }}
    >
      {/* SVG ring */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        {/* Glow filter */}
        <defs>
          <filter id="gold-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#D4A017" />
            <stop offset="50%"  stopColor="#F5C842" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,245,228,0.06)"
          strokeWidth={stroke}
        />

        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? dashOffset : circumference }}
          transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          filter="url(#gold-glow)"
        />

        {/* Tick marks */}
        {Array.from({ length: 40 }).map((_, i) => {
          const angle  = (i / 40) * 360
          const radian = (angle - 90) * (Math.PI / 180)
          const inner  = radius - stroke
          const outer  = radius + stroke * 0.3
          const x1     = size / 2 + inner * Math.cos(radian)
          const y1     = size / 2 + inner * Math.sin(radian)
          const x2     = size / 2 + outer * Math.cos(radian)
          const y2     = size / 2 + outer * Math.sin(radian)
          const isFilled = i / 40 <= progress

          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isFilled ? 'rgba(212,160,23,0.4)' : 'rgba(255,245,228,0.04)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
            />
          )
        })}
      </svg>

      {/* Center content */}
      <div style={{
        position:       'relative',
        zIndex:         1,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '4px',
        textAlign:      'center',
      }}>
        {/* Points number */}
        <motion.span
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight:    300,
            color:         '#F5C842',
            lineHeight:    1,
            letterSpacing: '-0.02em',
          }}
        >
          {count.toLocaleString()}
        </motion.span>

        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.72rem',
          color:         '#C9B99A',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight:    500,
        }}>
          Points
        </span>

        {/* Divider */}
        <div style={{
          width:      '32px',
          height:     '1px',
          background: 'rgba(212,160,23,0.3)',
          margin:     '4px 0',
        }} />

        {/* Until next reward */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.72rem',
          color:      '#C9B99A',
          maxWidth:   '100px',
          lineHeight: 1.4,
          textAlign:  'center',
        }}>
          {(maxPoints - points).toLocaleString()} until next tier
        </span>
      </div>

      {/* Animated glow pulse behind ring */}
      <motion.div
        animate={{
          opacity:  [0.3, 0.6, 0.3],
          scale:    [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:     'absolute',
          width:        size * 0.7,
          height:       size * 0.7,
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 70%)',
          filter:       'blur(20px)',
          pointerEvents:'none',
        }}
      />
    </div>
  )
}