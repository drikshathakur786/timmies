'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(200,16,46,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10, paddingTop: '10rem', paddingBottom: '6rem' }}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3rem' }}
        >
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem',
            color: '#C9B99A', textDecoration: 'none',
          }}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '4rem', maxWidth: '640px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(200,16,46,0.1)',
            border: '1px solid rgba(200,16,46,0.2)',
            borderRadius: '100px', padding: '5px 14px',
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            color: '#C8102E', letterSpacing: '0.1em',
            textTransform: 'uppercase', fontWeight: 500,
            marginBottom: '1.25rem',
          }}>
            Contact
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 300, color: '#FFF5E4',
            margin: '0 0 1rem 0', lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: '#C9B99A', lineHeight: 1.7, margin: 0,
          }}>
            Have a question or feedback? We would love to hear from you. Our team is here to help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,245,228,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,245,228,0.08)',
            borderRadius: '24px', padding: '3rem',
            maxWidth: '540px', textAlign: 'center',
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'rgba(200,16,46,0.1)',
            border: '1px solid rgba(200,16,46,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', fontSize: '1.75rem',
          }}>
            ✉️
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem', fontWeight: 300,
            color: '#FFF5E4', margin: '0 0 0.75rem 0',
          }}>
            Coming Soon
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            color: '#C9B99A', margin: '0 0 2rem 0', lineHeight: 1.6,
          }}>
            We are working hard to bring you this page.
            In the meantime, explore our menu or find a location near you.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={{
              background: '#C8102E', color: '#FFF5E4',
              fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              fontWeight: 500, padding: '11px 28px',
              borderRadius: '100px', textDecoration: 'none',
              boxShadow: '0 0 20px rgba(200,16,46,0.35)',
            }}>
              View Menu
            </Link>
            <Link href="/locations" style={{
              background: 'rgba(255,245,228,0.06)',
              border: '1px solid rgba(255,245,228,0.12)',
              color: '#FFF5E4', fontFamily: 'var(--font-body)',
              fontSize: '0.875rem', fontWeight: 500,
              padding: '11px 28px', borderRadius: '100px',
              textDecoration: 'none', backdropFilter: 'blur(10px)',
            }}>
              Find Locations
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
