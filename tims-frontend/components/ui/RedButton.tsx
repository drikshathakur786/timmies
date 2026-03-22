'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { easings } from '@/lib/utils/animations'

// ── Types ────────────────────────────────────────────────────
interface RedButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
  loading?: boolean       // shows a spinner when true
  glowing?: boolean       // extra strong glow effect
}

// ── Size map ─────────────────────────────────────────────────
const sizeClasses = {
  sm:  'px-4 py-2 text-xs gap-1.5',
  md:  'px-8 py-3 text-sm gap-2',
  lg:  'px-10 py-4 text-base gap-2.5',
}

// ── Spinner ──────────────────────────────────────────────────
function Spinner() {
  return (
    <motion.span
      className="inline-block w-4 h-4 border-2 border-tims-cream/30 border-t-tims-cream rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// ── Component ────────────────────────────────────────────────
export default function RedButton({
  children,
  className,
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  size = 'md',
  type = 'button',
  external = false,
  loading = false,
  glowing = true,
}: RedButtonProps) {

  const isDisabled = disabled || loading

  const baseClass = cn(
    // Layout
    'inline-flex items-center justify-center rounded-full',
    'font-body font-medium tracking-wide',
    'select-none outline-none',

    // Red style
    'bg-tims-red text-tims-cream',
    'border border-transparent',

    // Glow
    glowing && 'shadow-red-glow',

    // Size
    sizeClasses[size],

    // States
    fullWidth && 'w-full',
    isDisabled && 'opacity-40 pointer-events-none',

    className
  )

  const motionProps = {
    whileHover: isDisabled ? undefined : {
      boxShadow: '0 0 40px rgba(200,16,46,0.6), 0 0 80px rgba(200,16,46,0.2)',
      y: -2,
      transition: { duration: 0.3, ease: easings.apple },
    },
    whileTap: isDisabled ? undefined : {
      scale: 0.97,
      y: 0,
      transition: { duration: 0.1 },
    },
  }

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  )

  // Render as Next.js Link
  if (href) {
    return (
      <motion.div {...motionProps} className={cn(baseClass, 'cursor-none')}>
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center w-full h-full gap-2"
        >
          {content}
        </Link>
      </motion.div>
    )
  }

  // Render as button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={baseClass}
      {...motionProps}
    >
      {content}
    </motion.button>
  )
}