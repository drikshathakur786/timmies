'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// ── Types ────────────────────────────────────────────────────
interface GlassBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'gold' | 'red' | 'green'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  onClick?: () => void       // makes it interactive (filter pill)
  active?: boolean           // active state for filter pills
  animated?: boolean
}

// ── Component ────────────────────────────────────────────────
export default function GlassBadge({
  children,
  className,
  variant = 'glass',
  size = 'md',
  icon,
  onClick,
  active = false,
  animated = false,
}: GlassBadgeProps) {

  // Base styles
  const base = cn(
    'inline-flex items-center gap-1.5 rounded-full font-body',
    'transition-all duration-300 select-none whitespace-nowrap',

    // Size
    size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs',

    // Variant + active state
    variant === 'glass' && !active && 'badge-glass',
    variant === 'glass' && active  && [
      'bg-tims-red border border-tims-red/50 text-tims-cream',
      'shadow-red-glow'
    ],

    variant === 'gold'  && 'badge-gold',
    variant === 'red'   && 'badge-red',
    variant === 'green' && [
      'bg-emerald-500/15 border border-emerald-500/30',
      'text-emerald-400 text-xs'
    ],

    // Clickable
    onClick && 'cursor-none hover:border-tims-cream/25',

    className
  )

  if (animated || onClick) {
    return (
      <motion.span
        className={base}
        onClick={onClick}
        whileHover={onClick ? { scale: 1.05 } : undefined}
        whileTap={onClick  ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.15 }}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </motion.span>
    )
  }

  return (
    <span className={base}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}