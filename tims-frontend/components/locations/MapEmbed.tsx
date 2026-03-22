'use client'

import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { Location } from '@/lib/data/locations'

interface MapEmbedProps {
  locations:        Location[]
  selectedLocation: Location | null
}

export default function MapEmbed({ locations, selectedLocation }: MapEmbedProps) {
  const [locating,  setLocating]  = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  const center = selectedLocation
    ? selectedLocation.coordinates
    : { lat: 56.1304, lng: -106.3468 }

  const zoom = selectedLocation ? 14 : 4

  const handleGetLocation = () => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => setLocating(false),
      () => setLocating(false)
    )
  }

  return (
    <div style={{
      position: 'relative', height: '100%', minHeight: '500px',
      borderRadius: '24px', overflow: 'hidden',
      border: '1px solid rgba(255,245,228,0.08)',
      background: '#1A0A00',
    }}>

      {/* Map iframe — key forces remount on location change */}
      <iframe
        key={selectedLocation?.id ?? 'default'}
        src={
          'https://maps.google.com/maps?q=' +
          center.lat + ',' + center.lng +
          '&z=' + zoom +
          '&output=embed&hl=en'
        }
        width="100%"
        height="100%"
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '500px',
          filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)',
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setMapLoaded(true)}
        title="Tim Hortons Locations Map"
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(13,6,0,0.15) 0%, transparent 30%, transparent 70%, rgba(13,6,0,0.3) 100%)',
      }} />

      {/* Top overlay — selected location info */}
      {selectedLocation && (
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem', right: '1rem',
          zIndex: 10, display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: '8px',
        }}>
          <div style={{
            background: 'rgba(13,6,0,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,245,228,0.1)',
            borderRadius: '14px', padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: '8px',
            maxWidth: '260px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'rgba(200,16,46,0.2)',
              border: '1px solid rgba(200,16,46,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <MapPin size={13} strokeWidth={1.5} color="#C8102E" />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
                color: '#FFF5E4', margin: '0 0 1px 0',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {selectedLocation.name.replace('Tim Hortons — ', '')}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#C9B99A', margin: 0 }}>
                {selectedLocation.city}, {selectedLocation.province}
              </p>
            </div>
          </div>

          <a
            href={
              'https://www.google.com/maps/dir/?api=1&destination=' +
              selectedLocation.coordinates.lat + ',' +
              selectedLocation.coordinates.lng
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(13,6,0,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,245,228,0.1)',
              borderRadius: '14px', padding: '10px 14px',
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              fontWeight: 500, color: '#FFF5E4', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
            }}
          >
            <Navigation size={13} strokeWidth={1.5} color="#C8102E" />
            Directions
          </a>
        </div>
      )}

      {/* Bottom — use my location */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10 }}>
        <button
          onClick={handleGetLocation}
          disabled={locating}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(13,6,0,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,245,228,0.1)',
            borderRadius: '14px', padding: '10px 14px',
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            fontWeight: 500, color: locating ? '#C9B99A' : '#FFF5E4',
            cursor: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          <Navigation size={13} strokeWidth={1.5} color={locating ? '#C9B99A' : '#C8102E'} />
          {locating ? 'Locating...' : 'Use My Location'}
        </button>
      </div>

      {/* Loading placeholder */}
      {!mapLoaded && (
        <div style={{
          position: 'absolute', inset: 0, background: '#1A0A00', zIndex: 20,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1rem',
        }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'rgba(200,16,46,0.1)',
            border: '1px solid rgba(200,16,46,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MapPin size={26} strokeWidth={1} color="#C8102E" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '1.2rem',
              fontWeight: 300, color: '#FFF5E4', margin: '0 0 6px 0',
            }}>
              Loading Map...
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#C9B99A', margin: 0 }}>
              5 Canadian locations
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#C8102E',
                  animation: 'mapPulse 1.2s ease-in-out infinite',
                  animationDelay: i * 0.2 + 's',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
