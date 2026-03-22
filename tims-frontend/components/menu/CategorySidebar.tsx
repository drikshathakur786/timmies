'use client'

import { motion } from 'framer-motion'
import { Coffee, Snowflake, UtensilsCrossed, Croissant } from 'lucide-react'
import { MenuCategory, categories } from '@/lib/data/menu'

type SidebarProps = {
  active: MenuCategory | 'all'
  onChange: (cat: MenuCategory | 'all') => void
  counts: Record<string, number>
}

const ICONS: Record<string, React.ElementType> = {
  'hot-drinks':  Coffee,
  'cold-drinks': Snowflake,
  'food':        UtensilsCrossed,
  'baked-goods': Croissant,
}

const COLORS: Record<string, string> = {
  'hot-drinks':  '#C8102E',
  'cold-drinks': '#3B82F6',
  'food':        '#EAB308',
  'baked-goods': '#D4A017',
}

function SidebarButton({
  isActive,
  onClick,
  icon,
  label,
  color,
  count,
}: {
  isActive: boolean
  onClick: () => void
  icon?: React.ElementType
  label: string
  color: string
  count: number
}) {
  const Icon = icon

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '10px 14px',
        borderRadius:   '14px',
        border:         isActive
          ? '1px solid ' + color + '55'
          : '1px solid transparent',
        background:     isActive ? color + '18' : 'transparent',
        cursor:         'none',
        width:          '100%',
        transition:     'all 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width:          '32px',
          height:         '32px',
          borderRadius:   '10px',
          background:     isActive ? color + '25' : 'rgba(255,245,228,0.05)',
          border:         '1px solid ' + (isActive ? color + '40' : 'rgba(255,245,228,0.08)'),
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexShrink:     0,
        }}>
          {Icon ? (
            <Icon size={15} strokeWidth={1.5} color={isActive ? color : '#C9B99A'} />
          ) : (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize:   '0.75rem',
              color:      isActive ? color : '#C9B99A',
              fontWeight: 600,
            }}>
              All
            </span>
          )}
        </div>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.875rem',
          fontWeight: isActive ? 500 : 400,
          color:      isActive ? '#FFF5E4' : '#C9B99A',
        }}>
          {label}
        </span>
      </div>
      <span style={{
        fontFamily:   'var(--font-body)',
        fontSize:     '0.7rem',
        color:        isActive ? color : '#C9B99A',
        background:   isActive ? color + '20' : 'rgba(255,245,228,0.06)',
        border:       '1px solid ' + (isActive ? color + '35' : 'rgba(255,245,228,0.1)'),
        borderRadius: '100px',
        padding:      '2px 8px',
        minWidth:     '28px',
        textAlign:    'center',
      }}>
        {count}
      </span>
    </motion.button>
  )
}

export default function CategorySidebar(props: SidebarProps) {
  const { active, onChange, counts } = props
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <aside style={{
      position:      'sticky',
      top:           '6rem',
      width:         '220px',
      flexShrink:    0,
      display:       'flex',
      flexDirection: 'column',
      gap:           '6px',
    }}>

      <p style={{
        fontFamily:    'var(--font-body)',
        fontSize:      '0.65rem',
        fontWeight:    600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         '#C9B99A',
        margin:        '0 0 8px 12px',
      }}>
        Categories
      </p>

      <SidebarButton
        isActive={active === 'all'}
        onClick={() => onChange('all')}
        label="All Items"
        color="#C8102E"
        count={totalCount}
      />

      {categories.map((cat) => (
        <SidebarButton
          key={cat.id}
          isActive={active === cat.id}
          onClick={() => onChange(cat.id)}
          icon={ICONS[cat.id]}
          label={cat.label}
          color={COLORS[cat.id] ?? '#C8102E'}
          count={counts[cat.id] ?? 0}
        />
      ))}

      <div style={{
        width:      '100%',
        height:     '1px',
        background: 'rgba(255,245,228,0.08)',
        margin:     '4px 0',
      }} />

      <div style={{
        padding:      '14px',
        background:   'rgba(255,245,228,0.03)',
        border:       '1px solid rgba(255,245,228,0.07)',
        borderRadius: '14px',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.72rem',
          color:      '#C9B99A',
          margin:     0,
          lineHeight: 1.5,
        }}>
          All items freshly prepared. Nutritional info available on request.
        </p>
      </div>
    </aside>
  )
}
