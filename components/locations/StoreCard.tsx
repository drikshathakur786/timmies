'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Car, Wifi, Smartphone, Coffee } from 'lucide-react'
import { Location, getTodayHours } from '@/lib/data/locations'

const amenityIcons: Record<string, React.ElementType> = {
  'Drive-Thru':   Car,
  'WiFi':         Wifi,
  'Mobile Order': Smartphone,
  'Dine-In':      Coffee,
  '24h':          Clock,
}

interface StoreCardProps {
  location: Location
  selected: boolean
  onSelect: (id: string) => void
}

export default function StoreCard({ location, selected, onSelect }: StoreCardProps) {
  const todayHours = getTodayHours(location)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(location.id)}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{ cursor: 'none' }}
    >
      <div style={{
        background:           selected ? 'rgba(200,16,46,0.08)' : 'rgba(255,245,228,0.03)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:               '1px solid ' + (selected ? 'rgba(200,16,46,0.3)' : 'rgba(255,245,228,0.07)'),
        borderLeft:           selected ? '3px solid #C8102E' : '3px solid transparent',
        borderRadius:         '16px',
        padding:              '1.1rem 1.25rem',
        transition:           'all 0.3s ease',
        boxShadow:            selected ? '0 8px 24px rgba(200,16,46,0.15)' : '0 4px 16px rgba(0,0,0,0.2)',
      }}>

        {/* Top row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: '8px', marginBottom: '0.6rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
            color: selected ? '#FFF5E4' : '#C9B99A', margin: 0, lineHeight: 1.3,
            transition: 'color 0.3s ease', flex: 1,
          }}>
            {location.name}
          </h3>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: location.isOpen ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
            border: '1px solid ' + (location.isOpen ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'),
            borderRadius: '100px', padding: '3px 8px', flexShrink: 0,
          }}>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: location.isOpen ? '#22C55E' : '#EF4444',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              color: location.isOpen ? '#22C55E' : '#EF4444', fontWeight: 500,
            }}>
              {location.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '0.5rem' }}>
          <MapPin size={12} strokeWidth={1.5} color="#C8102E" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            color: '#C9B99A', margin: 0, lineHeight: 1.4,
          }}>
            {location.address}, {location.city}, {location.province}
          </p>
        </div>

        {/* Hours */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.5rem' }}>
          <Clock size={12} strokeWidth={1.5} color="#C9B99A" style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#C9B99A' }}>
            {todayHours.open} — {todayHours.close}
          </span>
          {location.distance && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#C8102E', marginLeft: '4px' }}>
              · {location.distance}
            </span>
          )}
        </div>

        {/* Phone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.875rem' }}>
          <Phone size={12} strokeWidth={1.5} color="#C9B99A" style={{ flexShrink: 0 }} />
          <a
            href={'tel:' + location.phone}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#C9B99A', textDecoration: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            {location.phone}
          </a>
        </div>

        {/* Amenities */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {location.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] ?? Coffee
            return (
              <div
                key={amenity}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: 'rgba(255,245,228,0.04)',
                  border: '1px solid rgba(255,245,228,0.08)',
                  borderRadius: '100px', padding: '3px 8px',
                }}
              >
                <Icon size={9} strokeWidth={1.5} color="#C9B99A" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: '#C9B99A' }}>
                  {amenity}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </motion.div>
  )
}
