'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Flame, Snowflake, Check } from 'lucide-react'
import { MenuItem } from '@/lib/data/menu'

export interface CustomizationState {
  size:        string
  temperature: 'hot' | 'iced'
  extras:      string[]
  quantity:    number
}

interface CustomizePanelProps {
  item:           MenuItem
  customization:  CustomizationState
  onChange:       (c: CustomizationState) => void
  totalPrice:     number
}

const extraOptions = [
  { id: 'extra-shot',    label: 'Extra Espresso Shot', price: 0.75  },
  { id: 'oat-milk',      label: 'Oat Milk',            price: 0.60  },
  { id: 'extra-sugar',   label: 'Extra Sugar',          price: 0.00  },
  { id: 'whip',          label: 'Whipped Cream',        price: 0.50  },
  { id: 'vanilla-syrup', label: 'Vanilla Syrup',        price: 0.50  },
  { id: 'caramel-drizzle',label: 'Caramel Drizzle',     price: 0.50  },
]

const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&auto=format',
  'cold-drinks': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&auto=format',
  'food':        'https://images.unsplash.com/photo-1619740455993-9d912f9a8a53?w=500&h=500&fit=crop&auto=format',
  'baked-goods': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=500&fit=crop&auto=format',
}

// ── Segmented control (reusable) ─────────────────────────────
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; icon?: React.ElementType; price?: number }[]
  value:   T
  onChange:(val: T) => void
}) {
  return (
    <div style={{
      display:      'flex',
      background:   'rgba(255,245,228,0.04)',
      border:       '1px solid rgba(255,245,228,0.08)',
      borderRadius: '14px',
      padding:      '4px',
      gap:          '4px',
    }}>
      {options.map(opt => {
        const Icon     = opt.icon
        const isActive = value === opt.id
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            whileTap={{ scale: 0.97 }}
            style={{
              flex:           1,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '6px',
              padding:        '10px 8px',
              borderRadius:   '10px',
              border:         'none',
              background:     isActive ? '#C8102E' : 'transparent',
              color:          isActive ? '#FFF5E4' : '#C9B99A',
              fontFamily:     'var(--font-body)',
              fontSize:       '0.8rem',
              fontWeight:     isActive ? 500 : 400,
              cursor:         'none',
              transition:     'all 0.25s ease',
              boxShadow:      isActive ? '0 0 16px rgba(200,16,46,0.3)' : 'none',
              whiteSpace:     'nowrap',
            }}
          >
            {Icon && <Icon size={13} strokeWidth={1.5} />}
            {opt.label}
            {opt.price !== undefined && opt.price > 0 && (
              <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                +${opt.price.toFixed(2)}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

// ── Toggle switch ────────────────────────────────────────────
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked:  boolean
  onChange: (v: boolean) => void
}) {
  return (
    <motion.button
      onClick={() => onChange(!checked)}
      style={{
        width:        '44px',
        height:       '24px',
        borderRadius: '12px',
        background:   checked ? '#C8102E' : 'rgba(255,245,228,0.1)',
        border:       '1px solid ' + (checked ? 'rgba(200,16,46,0.5)' : 'rgba(255,245,228,0.12)'),
        position:     'relative',
        cursor:       'none',
        flexShrink:   0,
        transition:   'background 0.3s ease, border-color 0.3s ease',
        boxShadow:    checked ? '0 0 10px rgba(200,16,46,0.3)' : 'none',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          position:     'absolute',
          top:          '2px',
          width:        '18px',
          height:       '18px',
          borderRadius: '50%',
          background:   '#FFF5E4',
          boxShadow:    '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  )
}

// ── Main component ───────────────────────────────────────────
export default function CustomizePanel({
  item,
  customization,
  onChange,
  totalPrice,
}: CustomizePanelProps) {

  const set = (patch: Partial<CustomizationState>) =>
    onChange({ ...customization, ...patch })

  const toggleExtra = (id: string) => {
    const extras = customization.extras.includes(id)
      ? customization.extras.filter(e => e !== id)
      : [...customization.extras, id]
    set({ extras })
  }

  const sizeOptions = item.sizes?.map(s => ({
    id:    s.label,
    label: s.label,
    price: s.price - item.price,
  })) ?? [{ id: 'Regular', label: 'Regular', price: 0 }]

  const image = categoryImages[item.category] ?? categoryImages['hot-drinks']
  const isDrink = item.category === 'hot-drinks' || item.category === 'cold-drinks'

  return (
    <div style={{
      background:           'rgba(255,245,228,0.04)',
      backdropFilter:       'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border:               '1px solid rgba(255,245,228,0.08)',
      borderRadius:         '24px',
      overflow:             'hidden',
    }}>

      {/* Item preview header */}
      <div style={{
        display:    'flex',
        gap:        '1rem',
        padding:    '1.25rem',
        background: 'rgba(255,245,228,0.03)',
        borderBottom: '1px solid rgba(255,245,228,0.08)',
        alignItems: 'center',
      }}>
        <div style={{
          width:        '72px',
          height:       '72px',
          borderRadius: '16px',
          overflow:     'hidden',
          flexShrink:   0,
          border:       '1px solid rgba(255,245,228,0.08)',
        }}>
          <img
            src={image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize:   '1.3rem',
            fontWeight: 400,
            color:      '#FFF5E4',
            margin:     '0 0 4px 0',
          }}>
            {item.name}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.75rem',
            color:      '#C9B99A',
            margin:     '0 0 6px 0',
            lineHeight: 1.4,
          }}>
            {item.description.slice(0, 70)}...
          </p>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.8rem',
            color:      '#C9B99A',
          }}>
            Base: <span style={{ color: '#D4A017', fontWeight: 600 }}>${item.price.toFixed(2)}</span>
          </span>
        </div>
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Size selector */}
        {item.sizes && item.sizes.length > 0 && (
          <div>
            <label style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.72rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#C9B99A',
              display:       'block',
              marginBottom:  '10px',
            }}>
              Size
            </label>
            <SegmentedControl
              options={sizeOptions.map(s => ({ id: s.label, label: s.label }))}
              value={customization.size}
              onChange={(val) => set({ size: val })}
            />
          </div>
        )}

        {/* Temperature — drinks only */}
        {isDrink && (
          <div>
            <label style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.72rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#C9B99A',
              display:       'block',
              marginBottom:  '10px',
            }}>
              Temperature
            </label>
            <SegmentedControl
              options={[
                { id: 'hot'  as const, label: 'Hot',  icon: Flame    },
                { id: 'iced' as const, label: 'Iced', icon: Snowflake },
              ]}
              value={customization.temperature}
              onChange={(val) => set({ temperature: val })}
            />
          </div>
        )}

        {/* Extras — drinks only */}
        {isDrink && (
          <div>
            <label style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.72rem',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#C9B99A',
              display:       'block',
              marginBottom:  '10px',
            }}>
              Extras
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {extraOptions.map(extra => {
                const isOn = customization.extras.includes(extra.id)
                return (
                  <div
                    key={extra.id}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      padding:        '10px 12px',
                      background:     isOn ? 'rgba(200,16,46,0.08)' : 'rgba(255,245,228,0.03)',
                      border:         '1px solid ' + (isOn ? 'rgba(200,16,46,0.2)' : 'rgba(255,245,228,0.07)'),
                      borderRadius:   '12px',
                      transition:     'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.85rem',
                        color:      isOn ? '#FFF5E4' : '#C9B99A',
                        fontWeight: isOn ? 500 : 400,
                        transition: 'color 0.25s ease',
                      }}>
                        {extra.label}
                      </span>
                      {extra.price > 0 && (
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize:   '0.7rem',
                          color:      '#D4A017',
                        }}>
                          +${extra.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <ToggleSwitch
                      checked={isOn}
                      onChange={() => toggleExtra(extra.id)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.72rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         '#C9B99A',
            display:       'block',
            marginBottom:  '10px',
          }}>
            Quantity
          </label>
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '16px',
          }}>
            <motion.button
              onClick={() => set({ quantity: Math.max(1, customization.quantity - 1) })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '12px',
                background:     'rgba(255,245,228,0.06)',
                border:         '1px solid rgba(255,245,228,0.12)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          customization.quantity <= 1 ? '#C9B99A40' : '#C9B99A',
                cursor:         'none',
              }}
              disabled={customization.quantity <= 1}
            >
              <Minus size={16} strokeWidth={2} />
            </motion.button>

            <motion.span
              key={customization.quantity}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.8rem',
                fontWeight: 300,
                color:      '#FFF5E4',
                minWidth:   '40px',
                textAlign:  'center',
                lineHeight: 1,
              }}
            >
              {customization.quantity}
            </motion.span>

            <motion.button
              onClick={() => set({ quantity: customization.quantity + 1 })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '12px',
                background:     'rgba(255,245,228,0.06)',
                border:         '1px solid rgba(255,245,228,0.12)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#C9B99A',
                cursor:         'none',
              }}
            >
              <Plus size={16} strokeWidth={2} />
            </motion.button>

            <div style={{
              marginLeft: 'auto',
              textAlign:  'right',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.7rem',
                color:      '#C9B99A',
                margin:     '0 0 2px 0',
              }}>
                Total
              </p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalPrice}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   '1.5rem',
                    fontWeight: 400,
                    color:      '#D4A017',
                    display:    'block',
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}