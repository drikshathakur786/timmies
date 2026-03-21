'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { cardReveal, cardHover, cardTap, viewportConfig } from '@/lib/utils/animations'

// ── Types ────────────────────────────────────────────────────
interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string

  // Behaviour variants
  hoverable?: boolean      // enables lift + border brighten on hover
  tappable?: boolean       // enables scale-down on tap/click
  animated?: boolean       // enables scroll-triggered entrance animation
  static?: boolean         // completely static — no motion at all

  // Style variants
  variant?: 'default' | 'sm' | 'flat'
  glowColor?: 'red' | 'gold' | 'none'

  // Gradient border (for featured cards)
  gradientBorder?: boolean
}

// ── Component ────────────────────────────────────────────────
export default function GlassCard({
  children,
  className,
  hoverable = true,
  tappable = false,
  animated = true,
  static: isStatic = false,
  variant = 'default',
  glowColor = 'none',
  gradientBorder = false,
  ...props
}: GlassCardProps) {

  // Base class per variant
  const variantClass = {
    default: 'glass-card',
    sm:      'glass-card-sm',
    flat:    'glass-card-static',
  }[variant]

  // Glow shadow
  const glowClass = {
    red:  'shadow-red-glow',
    gold: 'shadow-gold-glow',
    none: '',
  }[glowColor]

  // If completely static — render plain div, no Framer Motion
  if (isStatic) {
    return (
      <div
        className={cn(
          variantClass,
          glowClass,
          gradientBorder && 'gradient-border-card',
          className
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      // Scroll-triggered entrance
      variants={animated ? cardReveal : undefined}
      initial={animated ? 'hidden' : undefined}
      whileInView={animated ? 'visible' : undefined}
      viewport={animated ? viewportConfig : undefined}

      // Hover lift
      whileHover={hoverable ? cardHover : undefined}

      // Tap press
      whileTap={tappable ? cardTap : undefined}

      className={cn(
        variantClass,
        glowClass,
        gradientBorder && 'gradient-border-card',

        // Disable CSS hover when Framer Motion handles it
        hoverable && '!transition-none',

        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}