'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from '@/lib/data/menu'
import { drawerSlideIn, easings } from '@/lib/utils/animations'

export interface CartItem {
  item:     MenuItem
  quantity: number
  size?:    string
  extras?:  string[]
}

interface CartDrawerProps {
  isOpen:   boolean
  onClose:  () => void
  items:    CartItem[]
  onAdd:    (item: MenuItem) => void
  onRemove: (itemId: string) => void
  onClear:  () => void
}

const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&auto=format',
  'cold-drinks': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop&auto=format',
  'food':        'https://images.unsplash.com/photo-1619740455993-9d912f9a8a53?w=100&h=100&fit=crop&auto=format',
  'baked-goods': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=100&h=100&fit=crop&auto=format',
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onAdd,
  onRemove,
  onClear,
}: CartDrawerProps) {

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0)
  const tax      = subtotal * 0.13
  const total    = subtotal + tax
  const itemCount = items.reduce((sum, ci) => sum + ci.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position:   'fixed',
              inset:      0,
              background: 'rgba(13,6,0,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex:     9000,
            }}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position:      'fixed',
              top:           0,
              right:         0,
              bottom:        0,
              width:         '100%',
              maxWidth:      '420px',
              zIndex:        9001,
              display:       'flex',
              flexDirection: 'column',
              background:    'rgba(20,8,0,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft:    '1px solid rgba(255,245,228,0.08)',
              boxShadow:     '-20px 0 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '1.5rem',
              borderBottom:   '1px solid rgba(255,245,228,0.08)',
              flexShrink:     0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '10px',
                  background:     'rgba(200,16,46,0.15)',
                  border:         '1px solid rgba(200,16,46,0.25)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}>
                  <ShoppingBag size={16} strokeWidth={1.5} color="#C8102E" />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   '1.3rem',
                    fontWeight: 400,
                    color:      '#FFF5E4',
                    margin:     0,
                    lineHeight: 1,
                  }}>
                    Your Cart
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.72rem',
                    color:      '#C9B99A',
                    margin:     0,
                  }}>
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {items.length > 0 && (
                  <motion.button
                    onClick={onClear}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '5px',
                      fontFamily:     'var(--font-body)',
                      fontSize:       '0.72rem',
                      color:          '#C9B99A',
                      background:     'rgba(255,245,228,0.05)',
                      border:         '1px solid rgba(255,245,228,0.1)',
                      borderRadius:   '8px',
                      padding:        '6px 10px',
                      cursor:         'none',
                    }}
                  >
                    <Trash2 size={12} strokeWidth={1.5} />
                    Clear
                  </motion.button>
                )}

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width:          '36px',
                    height:         '36px',
                    borderRadius:   '10px',
                    background:     'rgba(255,245,228,0.05)',
                    border:         '1px solid rgba(255,245,228,0.1)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    color:          '#C9B99A',
                    cursor:         'none',
                  }}
                >
                  <X size={16} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Items list */}
            <div style={{
              flex:       1,
              overflowY:  'auto',
              padding:    '1rem 1.5rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#4A2C2A #0D0600',
            }}>
              {items.length === 0 ? (
                /* Empty state */
                <div style={{
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  height:         '100%',
                  gap:            '1rem',
                  padding:        '3rem 0',
                }}>
                  <div style={{
                    width:          '72px',
                    height:         '72px',
                    borderRadius:   '20px',
                    background:     'rgba(255,245,228,0.04)',
                    border:         '1px solid rgba(255,245,228,0.08)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                  }}>
                    <ShoppingBag size={28} strokeWidth={1} color="#C9B99A" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize:   '1.3rem',
                      fontWeight: 300,
                      color:      '#FFF5E4',
                      margin:     '0 0 6px 0',
                    }}>
                      Your cart is empty
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.8rem',
                      color:      '#C9B99A',
                      margin:     0,
                    }}>
                      Add items from the menu to get started
                    </p>
                  </div>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '0.875rem',
                      color:        '#FFF5E4',
                      background:   'rgba(255,245,228,0.06)',
                      border:       '1px solid rgba(255,245,228,0.12)',
                      borderRadius: '100px',
                      padding:      '10px 24px',
                      cursor:       'none',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Browse Menu
                  </motion.button>
                </div>
              ) : (
                /* Cart items */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map((ci, index) => (
                    <motion.div
                      key={ci.item.id + index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      style={{
                        display:    'flex',
                        gap:        '12px',
                        alignItems: 'center',
                        padding:    '12px',
                        background: 'rgba(255,245,228,0.04)',
                        border:     '1px solid rgba(255,245,228,0.08)',
                        borderRadius: '16px',
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width:        '56px',
                        height:       '56px',
                        borderRadius: '12px',
                        overflow:     'hidden',
                        flexShrink:   0,
                      }}>
                        <img
                          src={categoryImages[ci.item.category]}
                          alt={ci.item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{
                          fontFamily:   'var(--font-display)',
                          fontSize:     '1rem',
                          fontWeight:   400,
                          color:        '#FFF5E4',
                          margin:       '0 0 2px 0',
                          overflow:     'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace:   'nowrap',
                        }}>
                          {ci.item.name}
                        </h4>
                        {ci.size && (
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize:   '0.7rem',
                            color:      '#C9B99A',
                            margin:     '0 0 4px 0',
                          }}>
                            {ci.size}
                          </p>
                        )}
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize:   '0.9rem',
                          fontWeight: 600,
                          color:      '#D4A017',
                        }}>
                          ${(ci.item.price * ci.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity controls */}
                      <div style={{
                        display:    'flex',
                        alignItems: 'center',
                        gap:        '8px',
                        flexShrink: 0,
                      }}>
                        <motion.button
                          onClick={() => onRemove(ci.item.id)}
                          whileHover={{ scale: 1.1, background: 'rgba(200,16,46,0.2)' }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            width:          '28px',
                            height:         '28px',
                            borderRadius:   '8px',
                            background:     'rgba(255,245,228,0.06)',
                            border:         '1px solid rgba(255,245,228,0.1)',
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            color:          '#C9B99A',
                            cursor:         'none',
                          }}
                        >
                          <Minus size={12} strokeWidth={2} />
                        </motion.button>

                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize:   '0.875rem',
                          fontWeight: 600,
                          color:      '#FFF5E4',
                          minWidth:   '20px',
                          textAlign:  'center',
                        }}>
                          {ci.quantity}
                        </span>

                        <motion.button
                          onClick={() => onAdd(ci.item)}
                          whileHover={{ scale: 1.1, background: 'rgba(200,16,46,0.2)' }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            width:          '28px',
                            height:         '28px',
                            borderRadius:   '8px',
                            background:     'rgba(255,245,228,0.06)',
                            border:         '1px solid rgba(255,245,228,0.1)',
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            color:          '#C9B99A',
                            cursor:         'none',
                          }}
                        >
                          <Plus size={12} strokeWidth={2} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — totals + checkout */}
            {items.length > 0 && (
              <div style={{
                padding:      '1.5rem',
                borderTop:    '1px solid rgba(255,245,228,0.08)',
                flexShrink:   0,
              }}>
                {/* Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
                  {[
                    { label: 'Subtotal', value: subtotal },
                    { label: 'Tax (13%)', value: tax },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      display:        'flex',
                      justifyContent: 'space-between',
                      alignItems:     'center',
                    }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#C9B99A' }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#FFF5E4' }}>
                        ${value.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'rgba(255,245,228,0.08)', margin: '4px 0' }} />

                  {/* Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.9rem',
                      fontWeight: 600,
                      color:      '#FFF5E4',
                    }}>
                      Total
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize:   '1.3rem',
                      fontWeight: 400,
                      color:      '#D4A017',
                    }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link href="/order" onClick={onClose}>
                  <motion.div
                    whileHover={{
                      boxShadow: '0 0 40px rgba(200,16,46,0.6)',
                      y: -2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: easings.apple }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            '8px',
                      background:     '#C8102E',
                      color:          '#FFF5E4',
                      fontFamily:     'var(--font-body)',
                      fontSize:       '0.9rem',
                      fontWeight:     500,
                      padding:        '14px',
                      borderRadius:   '14px',
                      boxShadow:      '0 0 24px rgba(200,16,46,0.4)',
                      textDecoration: 'none',
                    }}
                  >
                    Go to Checkout
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </motion.div>
                </Link>

                {/* Rewards note */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.7rem',
                  color:      '#C9B99A',
                  textAlign:  'center',
                  margin:     '10px 0 0 0',
                }}>
                  You will earn{' '}
                  <span style={{ color: '#D4A017', fontWeight: 500 }}>
                    {Math.floor(total * 10)} pts
                  </span>
                  {' '}on this order
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}