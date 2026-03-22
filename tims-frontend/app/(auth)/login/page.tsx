'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Coffee, ArrowRight, Mail, Lock } from 'lucide-react'
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '@/lib/utils/animations'

export default function LoginPage() {
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [errors,      setErrors]      = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!email.trim())              e.email    = 'Email is required'
    else if (!email.includes('@'))  e.email    = 'Enter a valid email'
    if (!password)                  e.password = 'Password is required'
    else if (password.length < 6)   e.password = 'Password must be at least 6 characters'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setLoading(true)
    setErrors({})
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
  }

  const FloatingInput = ({
    id, label, type = 'text', value, onChange, icon: Icon, error,
  }: {
    id: string; label: string; type?: string; value: string
    onChange: (v: string) => void; icon: React.ElementType; error?: string
  }) => {
    const isFocused  = focusedField === id
    const isFloating = isFocused || value.length > 0
    const inputType  = id === 'password' ? (showPass ? 'text' : 'password') : type

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          position: 'relative',
          background: 'rgba(255,245,228,0.05)',
          border: '1px solid ' + (error ? 'rgba(239,68,68,0.5)' : isFocused ? '#C8102E' : 'rgba(255,245,228,0.1)'),
          borderRadius: '14px',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: error
            ? '0 0 0 3px rgba(239,68,68,0.1)'
            : isFocused ? '0 0 0 3px rgba(200,16,46,0.12)' : 'none',
        }}>
          {/* Left icon */}
          <div style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)',
            color: isFocused ? '#C8102E' : '#C9B99A',
            transition: 'color 0.3s ease',
            pointerEvents: 'none',
          }}>
            <Icon size={16} strokeWidth={1.5} />
          </div>

          {/* Floating label */}
          <label style={{
            position: 'absolute',
            left: '44px',
            top: isFloating ? '8px' : '50%',
            transform: isFloating ? 'none' : 'translateY(-50%)',
            fontFamily: 'var(--font-body)',
            fontSize: isFloating ? '0.65rem' : '0.9rem',
            color: isFocused ? '#C8102E' : '#C9B99A',
            opacity: isFloating ? 1 : 0.7,
            transition: 'all 0.2s ease',
            pointerEvents: 'none',
            letterSpacing: isFloating ? '0.06em' : '0',
            textTransform: isFloating ? 'uppercase' : 'none',
          }}>
            {label}
          </label>

          {/* Input */}
          <input
            type={inputType}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none', outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#FFF5E4',
              padding: '24px 44px 10px 44px',
              caretColor: '#C8102E',
            }}
          />

          {/* Password toggle */}
          {id === 'password' && (
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                color: '#C9B99A', cursor: 'none', padding: '4px',
              }}
            >
              {showPass
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
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: '#EF4444', margin: 0, paddingLeft: '4px',
              }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0D0600',
      display: 'grid', gridTemplateColumns: '45fr 55fr',
    }}
      className="auth-grid"
    >

      {/* LEFT: Brand panel */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3rem',
          background: '#0D0600',
        }}
      >
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(200,16,46,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 80%, rgba(212,160,23,0.08) 0%, transparent 50%),
            #0D0600
          `,
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Animated orb */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '10%', right: '-10%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,16,46,0.25) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />

        

        {/* Center quote */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 300, color: '#FFF5E4',
            lineHeight: 1.15, margin: '0 0 1.5rem 0',
            letterSpacing: '-0.02em',
          }}>
            Welcome back
            <br />
            <span style={{ color: '#D4A017', fontStyle: 'italic' }}>
              to Canada&apos;s finest.
            </span>
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            color: '#C9B99A', lineHeight: 1.7, maxWidth: '360px',
          }}>
            Sign in to access your Tims Rewards, track your orders,
            and unlock exclusive member deals.
          </p>
        </div>

        {/* Bottom stats */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', gap: '2rem',
        }}>
          {[
            { value: '5,700+', label: 'Locations' },
            { value: '60+',    label: 'Years'     },
            { value: '2M+',    label: 'Members'   },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1.5rem',
                fontWeight: 300, color: '#F5C842',
                margin: '0 0 2px 0', lineHeight: 1,
              }}>
                {value}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                color: '#C9B99A', margin: 0,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT: Auth form */}
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
          background: 'rgba(255,245,228,0.01)',
          borderLeft: '1px solid rgba(255,245,228,0.06)',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>

          {/* Form card */}
          <div style={{
            background: 'rgba(255,245,228,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,245,228,0.08)',
            borderRadius: '28px',
            padding: '2.5rem',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem', fontWeight: 300,
                color: '#FFF5E4', margin: '0 0 6px 0',
                letterSpacing: '-0.02em',
              }}>
                Sign In
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: '#C9B99A', margin: 0,
              }}>
                Don&apos;t have an account?{' '}
                <Link href="/signup" style={{
                  color: '#C8102E', textDecoration: 'none', fontWeight: 500,
                }}>
                  Sign up free
                </Link>
              </p>
            </div>

            {/* Form fields */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}
            >
              <motion.div variants={fadeInUp}>
                <FloatingInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  icon={Mail}
                  error={errors.email}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FloatingInput
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  icon={Lock}
                  error={errors.password}
                />
              </motion.div>

              {/* Forgot password */}
              <div style={{ textAlign: 'right' }}>
                <Link href="#" style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: '#C9B99A', textDecoration: 'none',
                }}>
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={!loading ? {
                boxShadow: '0 0 40px rgba(200,16,46,0.6)',
                y: -2,
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{
                width: '100%', padding: '15px',
                background: '#C8102E', color: '#FFF5E4',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                fontWeight: 500, border: 'none',
                borderRadius: '14px', cursor: 'none',
                boxShadow: '0 0 24px rgba(200,16,46,0.35)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
                opacity: loading ? 0.8 : 1,
                transition: 'all 0.3s ease',
                marginBottom: '1.25rem',
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{
                      display: 'inline-block', width: '16px', height: '16px',
                      border: '2px solid rgba(255,245,228,0.3)',
                      borderTopColor: '#FFF5E4', borderRadius: '50%',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} strokeWidth={1.5} />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '1.25rem',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,245,228,0.08)' }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: '#C9B99A', whiteSpace: 'nowrap',
              }}>
                or continue with
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,245,228,0.08)' }} />
            </div>

            {/* Google OAuth button */}
            <motion.button
              whileHover={{ background: 'rgba(255,245,228,0.08)', y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '13px',
                background: 'rgba(255,245,228,0.04)',
                border: '1px solid rgba(255,245,228,0.1)',
                borderRadius: '14px', cursor: 'none',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '10px',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: '#FFF5E4', fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Google SVG icon */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>

          </div>
        </div>
      </motion.div>
    </div>
  )
}