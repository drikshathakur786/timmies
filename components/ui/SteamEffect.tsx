'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// ── Types ────────────────────────────────────────────────────
interface SteamEffectProps {
  className?: string
  wisps?: number          // how many steam wisps (default 3)
  color?: string          // color of steam (default cream)
  size?: 'sm' | 'md' | 'lg'
  intensity?: 'subtle' | 'normal' | 'strong'
}

// ── Wisp config — each wisp has unique movement ──────────────
const wispConfigs = [
  {
    // Left wisp
    x:         [-2, -6, -4, -8, -3],
    scaleX:    [1, 1.3, 0.9, 1.2, 0.8],
    delay:     0,
    duration:  2.8,
    height:    '28px',
    opacity:   [0, 0.5, 0.4, 0.25, 0],
  },
  {
    // Center wisp (tallest)
    x:         [0, 4, -3, 5, 0],
    scaleX:    [1, 1.2, 1.4, 1.1, 0.9],
    delay:     0.7,
    duration:  3.2,
    height:    '38px',
    opacity:   [0, 0.6, 0.45, 0.3, 0],
  },
  {
    // Right wisp
    x:         [2, 6, 3, 8, 2],
    scaleX:    [1, 0.9, 1.3, 1.0, 1.2],
    delay:     1.4,
    duration:  2.6,
    height:    '24px',
    opacity:   [0, 0.45, 0.35, 0.2, 0],
  },
  {
    // Extra left (if wisps > 3)
    x:         [-4, -8, -5, -10, -4],
    scaleX:    [1, 1.1, 0.8, 1.2, 1.0],
    delay:     0.35,
    duration:  3.0,
    height:    '20px',
    opacity:   [0, 0.35, 0.25, 0.15, 0],
  },
  {
    // Extra right (if wisps > 4)
    x:         [4, 8, 5, 10, 3],
    scaleX:    [1, 0.8, 1.1, 0.9, 1.1],
    delay:     1.1,
    duration:  2.4,
    height:    '18px',
    opacity:   [0, 0.3, 0.2, 0.1, 0],
  },
]

// ── Size map ─────────────────────────────────────────────────
const sizeMap = {
  sm:  { width: '2px',  gap: 'gap-1.5', maxHeight: 30 },
  md:  { width: '3px',  gap: 'gap-2',   maxHeight: 40 },
  lg:  { width: '4px',  gap: 'gap-2.5', maxHeight: 55 },
}

const intensityMap = {
  subtle: 0.5,
  normal: 1,
  strong: 1.4,
}

// ── Component ────────────────────────────────────────────────
export default function SteamEffect({
  className,
  wisps = 3,
  color = 'rgba(255, 245, 228, 0.6)',
  size = 'md',
  intensity = 'normal',
}: SteamEffectProps) {

  const { width, gap, maxHeight } = sizeMap[size]
  const intensityMultiplier = intensityMap[intensity]
  const activeWisps = wispConfigs.slice(0, Math.min(wisps, 5))

  return (
    <div
      className={cn(
        'flex items-end justify-center pointer-events-none',
        gap,
        className
      )}
      aria-hidden="true"
    >
      {activeWisps.map((wisp, index) => (
        <motion.div
          key={index}
          style={{
            width,
            height: wisp.height,
            background: `linear-gradient(to top, ${color}, transparent)`,
            borderRadius: '100px',
            transformOrigin: 'bottom center',
          }}
          animate={{
            y:       [0, -maxHeight * intensityMultiplier * 0.5, -maxHeight * intensityMultiplier],
            x:       wisp.x,
            scaleX:  wisp.scaleX,
            opacity: wisp.opacity.map(o => o * intensityMultiplier > 1 ? 1 : o * intensityMultiplier),
            filter:  ['blur(1px)', 'blur(2px)', 'blur(3px)', 'blur(4px)', 'blur(6px)'],
          }}
          transition={{
            duration: wisp.duration,
            delay:    wisp.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
            times:    [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  )
}