'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, X } from 'lucide-react'
import { locations, Location } from '@/lib/data/locations'
import StoreCard from '@/components/locations/StoreCard'
import MapEmbed from '@/components/locations/MapEmbed'
import { staggerContainer, fadeInUp } from '@/lib/utils/animations'

export default function LocationsPage() {
  const [selectedId, setSelectedId]   = useState<string | null>(null)
  const [query,      setQuery]        = useState('')

  const selectedLocation = useMemo(
    () => locations.find(l => l.id === selectedId) ?? null,
    [selectedId]
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return locations
    const q = query.toLowerCase()
    return locations.filter(l =>
      l.name.toLowerCase().includes(q)    ||
      l.city.toLowerCase().includes(q)    ||
      l.address.toLowerCase().includes(q) ||
      l.province.toLowerCase().includes(q)
    )
  }, [query])

  const handleSelect = (id: string) => {
    setSelectedId(prev => prev === id ? null : id)
  }

  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    '8rem',
        paddingBottom: '3rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 50% 0%, rgba(200,16,46,0.1) 0%, transparent 60%),
            #0D0600
          `,
        }} />
        <div style={{
          position:        'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.05) 1px, transparent 1px)',
          backgroundSize:  '28px 28px', pointerEvents: 'none',
        }} />

        <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(200,16,46,0.1)',
                border: '1px solid rgba(200,16,46,0.2)',
                borderRadius: '100px', padding: '5px 14px',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                color: '#C8102E', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
                <MapPin size={10} strokeWidth={2} />
                Find Us
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                fontWeight: 300, color: '#FFF5E4',
                margin: '0 0 0.75rem 0',
                lineHeight: 1, letterSpacing: '-0.03em',
              }}
            >
              Our Locations
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                color: '#C9B99A', maxWidth: '480px',
                lineHeight: 1.7, margin: 0,
              }}
            >
              Over 5,700 locations across Canada. Find your nearest
              Tim Hortons and get directions in one tap.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main split layout */}
      <div
        className="section-wrapper"
        style={{ paddingBottom: '4rem' }}
      >
        <div
          className="locations-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
        >

          {/* LEFT: Search + store list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Search input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,245,228,0.05)',
              border: '1px solid rgba(255,245,228,0.1)',
              borderRadius: '14px', padding: '0 14px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
              className="search-focus-wrapper"
            >
              <Search size={16} strokeWidth={1.5} color={query ? '#C8102E' : '#C9B99A'} style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by city or address..."
                style={{
                  flex: 1, background: 'transparent',
                  border: 'none', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  color: '#FFF5E4', padding: '13px 0',
                  caretColor: '#C8102E',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'rgba(255,245,228,0.08)',
                    border: '1px solid rgba(255,245,228,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9B99A', cursor: 'none', flexShrink: 0,
                  }}
                >
                  <X size={11} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Results count */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                color: '#C9B99A', margin: 0,
              }}>
                <span style={{ color: '#FFF5E4', fontWeight: 500 }}>
                  {filtered.length}
                </span>
                {' '}location{filtered.length !== 1 ? 's' : ''} found
              </p>

              {selectedLocation && (
                <button
                  onClick={() => setSelectedId(null)}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                    color: '#C8102E', background: 'transparent',
                    border: 'none', cursor: 'none',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    padding: 0,
                  }}
                >
                  Clear selection
                </button>
              )}
            </div>

            {/* Store list */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {filtered.length > 0 ? (
                filtered.map(location => (
                  <StoreCard
                    key={location.id}
                    location={location}
                    selected={selectedId === location.id}
                    onSelect={handleSelect}
                  />
                ))
              ) : (
                <div style={{
                  padding: '3rem 1rem', textAlign: 'center',
                  background: 'rgba(255,245,228,0.02)',
                  border: '1px solid rgba(255,245,228,0.06)',
                  borderRadius: '16px',
                }}>
                  <MapPin size={28} strokeWidth={1} color="#C9B99A" style={{ margin: '0 auto 1rem' }} />
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                    fontWeight: 300, color: '#FFF5E4', margin: '0 0 6px 0',
                  }}>
                    No locations found
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                    color: '#C9B99A', margin: '0 0 1rem 0',
                  }}>
                    Try searching for a different city
                  </p>
                  <button
                    onClick={() => setQuery('')}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: '#FFF5E4', background: '#C8102E',
                      border: 'none', borderRadius: '100px',
                      padding: '8px 20px', cursor: 'none',
                    }}
                  >
                    Show all locations
                  </button>
                </div>
              )}
            </motion.div>

          </div>

          {/* RIGHT: Map — sticky */}
          <div style={{
            position: 'sticky',
            top: '6rem',
            height: '600px',
          }}>
            <MapEmbed
              locations={locations}
              selectedLocation={selectedLocation}
            />

            {/* Location count bar below map */}
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              marginTop: '1rem', justifyContent: 'center',
            }}>
              {[
                { label: 'Total Locations', value: '5,700+' },
                { label: 'Provinces',       value: '10'     },
                { label: 'Drive-Thrus',     value: '3,200+' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    flex: 1, minWidth: '100px',
                    background: 'rgba(255,245,228,0.03)',
                    border: '1px solid rgba(255,245,228,0.07)',
                    borderRadius: '12px', padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                    fontWeight: 300, color: '#D4A017',
                    margin: '0 0 2px 0', lineHeight: 1,
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                    color: '#C9B99A', margin: 0,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        input::placeholder { color: #C9B99A; opacity: 0.6; }
        .search-focus-wrapper:focus-within {
          border-color: rgba(200,16,46,0.4) !important;
          box-shadow: 0 0 0 3px rgba(200,16,46,0.1) !important;
        }
        @media (max-width: 768px) {
          .locations-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}