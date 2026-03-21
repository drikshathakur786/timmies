'use client'

import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { MenuCategory } from '@/lib/data/menu'

const filters: { id: string; label: string }[] = [
  { id: 'popular',    label: 'Popular'      },
  { id: 'under-5',    label: 'Under $5'     },
  { id: 'under-300',  label: 'Under 300cal' },
  { id: 'hot',        label: 'Hot'          },
  { id: 'cold',       label: 'Iced'         },
  { id: 'customizable', label: 'Customizable' },
]

interface SearchBarProps {
  query:         string
  onQueryChange: (q: string) => void
  activeFilters: string[]
  onFilterToggle:(id: string) => void
}

export default function SearchBar({
  query,
  onQueryChange,
  activeFilters,
  onFilterToggle,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <div style={{
          display:              'flex',
          alignItems:           'center',
          gap:                  '10px',
          background:           'rgba(255,245,228,0.05)',
          border:               '1px solid rgba(255,245,228,0.1)',
          borderRadius:         '14px',
          padding:              '0 16px',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition:           'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
          className="search-wrapper"
        >
          {/* Search icon */}
          <Search
            size={16}
            strokeWidth={1.5}
            color={query ? '#C8102E' : '#C9B99A'}
            style={{ flexShrink: 0, transition: 'color 0.3s ease' }}
          />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search menu..."
            style={{
              flex:        1,
              background:  'transparent',
              border:      'none',
              outline:     'none',
              fontFamily:  'var(--font-body)',
              fontSize:    '0.9rem',
              color:       '#FFF5E4',
              padding:     '14px 0',
              caretColor:  '#C8102E',
            }}
          />

          {/* Clear button */}
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  onQueryChange('')
                  inputRef.current?.focus()
                }}
                style={{
                  width:          '24px',
                  height:         '24px',
                  borderRadius:   '50%',
                  background:     'rgba(255,245,228,0.1)',
                  border:         '1px solid rgba(255,245,228,0.15)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#C9B99A',
                  cursor:         'none',
                  flexShrink:     0,
                }}
              >
                <X size={12} strokeWidth={2} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Filter icon */}
          <div style={{
            width:          '1px',
            height:         '20px',
            background:     'rgba(255,245,228,0.1)',
            flexShrink:     0,
          }} />
          <SlidersHorizontal
            size={16}
            strokeWidth={1.5}
            color={activeFilters.length > 0 ? '#C8102E' : '#C9B99A'}
            style={{ flexShrink: 0 }}
          />
        </div>

        {/* Focus ring injected via style tag */}
        <style>{`
          .search-wrapper:focus-within {
            border-color: rgba(200,16,46,0.4) !important;
            box-shadow: 0 0 0 3px rgba(200,16,46,0.1) !important;
          }
          input::placeholder { color: #C9B99A; opacity: 0.6; }
        `}</style>
      </div>

      {/* Filter pills */}
      <div style={{
        display:   'flex',
        gap:       '8px',
        flexWrap:  'wrap',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.7rem',
          color:         '#C9B99A',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          whiteSpace:    'nowrap',
        }}>
          Filter:
        </span>

        {filters.map((f) => {
          const isActive = activeFilters.includes(f.id)
          return (
            <motion.button
              key={f.id}
              onClick={() => onFilterToggle(f.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                fontFamily:   'var(--font-body)',
                fontSize:     '0.75rem',
                fontWeight:   isActive ? 500 : 400,
                color:        isActive ? '#FFF5E4' : '#C9B99A',
                background:   isActive
                  ? '#C8102E'
                  : 'rgba(255,245,228,0.05)',
                border:       '1px solid ' + (isActive
                  ? 'rgba(200,16,46,0.5)'
                  : 'rgba(255,245,228,0.1)'),
                borderRadius: '100px',
                padding:      '5px 14px',
                cursor:       'none',
                boxShadow:    isActive ? '0 0 12px rgba(200,16,46,0.3)' : 'none',
                transition:   'all 0.25s ease',
              }}
            >
              {f.label}
            </motion.button>
          )
        })}

        {/* Clear all filters */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => activeFilters.forEach(f => onFilterToggle(f))}
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '0.72rem',
                color:        '#C9B99A',
                background:   'transparent',
                border:       'none',
                cursor:       'none',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                padding:      '5px 4px',
              }}
            >
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}