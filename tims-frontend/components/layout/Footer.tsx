'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Coffee, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/utils/animations'

const LINKS = [
  { section: 'Company', items: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Press', href: '/press' }] },
  { section: 'Menu', items: [{ label: 'Hot Drinks', href: '/menu' }, { label: 'Cold Drinks', href: '/menu' }, { label: 'Food', href: '/menu' }] },
  { section: 'Support', items: [{ label: 'FAQ', href: '/faq' }, { label: 'Contact', href: '/contact' }, { label: 'Privacy', href: '/privacy' }] },
]

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: '#0D0600' }}>
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <motion.div variants={fadeInUp}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', textDecoration: 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Coffee size={16} strokeWidth={2} color="#FFF5E4" />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#C8102E' }}>Tim Hortons</span>
              </Link>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#C9B99A', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Serving Canada finest coffee since 1964. Over 5,700 locations coast to coast.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                <a href="tel:1-888-601-1616" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#C9B99A', textDecoration: 'none' }}>
                  <Phone size={14} strokeWidth={1.5} color="#C8102E" />
                  1-888-601-1616
                </a>
                <a href="mailto:hello@timhortons.ca" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#C9B99A', textDecoration: 'none' }}>
                  <Mail size={14} strokeWidth={1.5} color="#C8102E" />
                  hello@timhortons.ca
                </a>
                <Link href="/locations" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#C9B99A', textDecoration: 'none' }}>
                  <MapPin size={14} strokeWidth={1.5} color="#C8102E" />
                  Find a location
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,245,228,0.06)', border: '1px solid rgba(255,245,228,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9B99A' }}>
                    <Icon size={15} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            {LINKS.map((col) => (
              <motion.div key={col.section} variants={fadeInUp}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9B99A', marginBottom: '1.25rem' }}>
                  {col.section}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#C9B99A', textDecoration: 'none' }}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,245,228,0.12)' }} />
        <div style={{ padding: '1.5rem 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#C9B99A' }}>
            {year} Tim Hortons. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/privacy" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#C9B99A', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#C9B99A', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
