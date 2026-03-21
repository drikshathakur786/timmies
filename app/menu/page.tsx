import type { Metadata } from 'next'
import MenuGrid from '@/components/menu/MenuGrid'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore the full Tim Hortons menu — hot drinks, cold drinks, food and baked goods.',
}

export default function MenuPage() {
  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>

      {/* Hero header */}
      <div
        style={{
          position:   'relative',
          overflow:   'hidden',
          paddingTop: '10rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset:    0,
          background: `
            radial-gradient(ellipse 60% 80% at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%),
            #0D0600
          `,
        }} />

        {/* Dot grid */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle, rgba(255,245,228,0.05) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
          pointerEvents:   'none',
        }} />

        <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          {/* Eyebrow */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              background:    'rgba(200,16,46,0.1)',
              border:        '1px solid rgba(200,16,46,0.2)',
              borderRadius:  '100px',
              padding:       '5px 14px',
              fontFamily:    'var(--font-body)',
              fontSize:      '0.7rem',
              color:         '#C8102E',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight:    500,
            }}>
              Full Menu
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 5vw, 5rem)',
            fontWeight:    300,
            color:         '#FFF5E4',
            margin:        '0 0 1rem 0',
            lineHeight:    1,
            letterSpacing: '-0.03em',
          }}>
            Our Menu
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '1rem',
            color:      '#C9B99A',
            maxWidth:   '480px',
            lineHeight: 1.7,
            margin:     0,
          }}>
            From our signature coffees to freshly baked goods —
            everything made with care, served fresh every time.
          </p>
        </div>
      </div>

      {/* Menu grid */}
      <div
        className="section-wrapper"
        style={{ paddingBottom: '6rem', position: 'relative', zIndex: 10 }}
      >
        <MenuGrid />
      </div>

    </div>
  )
}