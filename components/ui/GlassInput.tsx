'use client'

import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ── Types ────────────────────────────────────────────────────
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string              // floating label text
  icon?: React.ReactNode      // icon on the left side
  error?: string              // error message below input
  clearable?: boolean         // shows X button to clear input
  onClear?: () => void        // called when X is clicked
  containerClassName?: string // className for the wrapper div
}

// ── Component (forwardRef so parent can access input DOM node) 
const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      icon,
      error,
      clearable = false,
      onClear,
      containerClassName,
      className,
      type = 'text',
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused]       = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const isPassword  = type === 'password'
    const inputType   = isPassword ? (showPassword ? 'text' : 'password') : type
    const hasValue    = value !== undefined ? String(value).length > 0 : false
    const isFloating  = isFocused || hasValue

    return (
      <div className={cn('relative w-full', containerClassName)}>

        {/* ── Input wrapper ── */}
        <div
          className={cn(
            'relative flex items-center',
            'rounded-xl border transition-all duration-300',
            'bg-[rgba(255,245,228,0.05)]',

            // Border color
            isFocused
              ? 'border-tims-red shadow-[0_0_0_3px_rgba(200,16,46,0.15)]'
              : error
              ? 'border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
              : 'border-glass-border',
          )}
        >
          {/* Left icon */}
          {icon && (
            <span className={cn(
              'pl-4 flex items-center shrink-0 transition-colors duration-300',
              isFocused ? 'text-tims-red' : 'text-tims-cream-muted'
            )}>
              {icon}
            </span>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            className={cn(
              'w-full bg-transparent outline-none',
              'font-body text-tims-cream text-base',
              'placeholder:text-tims-cream-muted placeholder:opacity-60',

              // Padding — adjust based on icon presence
              icon ? 'pl-3 pr-4' : 'pl-4 pr-4',
              label ? 'pt-5 pb-2' : 'py-3.5',

              // Make room for right-side buttons
              (clearable || isPassword) && '!pr-10',

              className
            )}
            {...props}
          />

          {/* Floating label */}
          {label && (
            <label
              className={cn(
                'absolute pointer-events-none',
                'font-body transition-all duration-200',
                icon ? 'left-11' : 'left-4',

                // Floated up (focused or has value)
                isFloating
                  ? 'top-2 text-xs text-tims-red'
                  : 'top-1/2 -translate-y-1/2 text-sm text-tims-cream-muted opacity-60'
              )}
            >
              {label}
            </label>
          )}

          {/* Clear button */}
          <AnimatePresence>
            {clearable && hasValue && (
              <motion.button
                type="button"
                onClick={onClear}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'absolute right-3 p-1 rounded-full',
                  'text-tims-cream-muted hover:text-tims-cream',
                  'transition-colors duration-200'
                )}
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                'absolute right-3 p-1 rounded-full',
                'text-tims-cream-muted hover:text-tims-cream',
                'transition-colors duration-200'
              )}
            >
              {showPassword
                ? <EyeOff size={16} strokeWidth={1.5} />
                : <Eye    size={16} strokeWidth={1.5} />
              }
            </button>
          )}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs text-red-400 font-body pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'
export default GlassInput