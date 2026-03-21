'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { easings } from '@/lib/utils/animations'

// ── Types ────────────────────────────────────────────────────
interface GlassButtonProps {
  children: React.ReactNode
  className?: string
  href?: string           // if provided, renders as <Link>
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  external?: boolean      // opens in new tab if href provided
}

// ── Size map ─────────────────────────────────────────────────
const sizeClasses = {
  sm:  'px-4 py-2 text-xs gap-1.5',
  md:  'px-6 py-2.5 text-sm gap-2',
  lg:  'px-8 py-3.5 text-base gap-2.5',
}

// ── Component ────────────────────────────────────────────────
export default function GlassButton({
  children,
  className,
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  size = 'md',
  type = 'button',
  external = false,
}: GlassButtonProps) {

  const baseClass = cn(
    // Layout
    'inline-flex items-center justify-center rounded-full',
    'font-body font-medium tracking-wide',
    'select-none outline-none',

    // Glass style
    'bg-glass-bg border border-glass-border',
    'backdrop-blur-xl',
    'text-tims-cream',

    // Size
    sizeClasses[size],

    // States
    fullWidth && 'w-full',
    disabled && 'opacity-40 pointer-events-none',

    className
  )

  const motionProps = {
    whileHover: disabled ? undefined : {
      backgroundColor: 'rgba(255, 245, 228, 0.10)',
      borderColor: 'rgba(255, 245, 228, 0.25)',
      y: -2,
      transition: { duration: 0.3, ease: easings.apple },
    },
    whileTap: disabled ? undefined : {
      scale: 0.97,
      y: 0,
      transition: { duration: 0.1 },
    },
  }

  // Render as Next.js Link
  if (href) {
    return (
      <motion.div {...motionProps} className={cn(baseClass, 'cursor-none')}>
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center w-full h-full gap-inherit"
        >
          {children}
        </Link>
      </motion.div>
    )
  }

  // Render as button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}