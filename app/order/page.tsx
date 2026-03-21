'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, ArrowLeft } from 'lucide-react'
import { menuItems, MenuItem, categories } from '@/lib/data/menu'
import StepIndicator from '@/components/order/StepIndicator'
import CustomizePanel, { CustomizationState } from '@/components/order/CustomizePanel'
import CartDrawer, { CartItem } from '@/components/order/CartDrawer'
import MenuCard from '@/components/menu/MenuCard'
import { staggerContainer } from '@/lib/utils/animations'

const categoryImages: Record<string, string> = {
  'hot-drinks':  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&auto=format',
  'cold-drinks': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&auto=format',
  'food':        'https://images.unsplash.com/photo-1619740455993-9d912f9a8a53?w=500&h=500&fit=crop&auto=format',
  'baked-goods': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=500&fit=crop&auto=format',
}

const extraPrices: Record<string, number> = {
  'extra-shot':     0.75,
  'oat-milk':       0.60,
  'extra-sugar':    0.00,
  'whip':           0.50,
  'vanilla-syrup':  0.50,
  'caramel-drizzle':0.50,
}

function defaultCustomization(item: MenuItem): CustomizationState {
  return {
    size:        item.sizes?.[0]?.label ?? 'Regular',
    temperature: item.category === 'cold-drinks' ? 'iced' : 'hot',
    extras:      [],
    quantity:    1,
  }
}

export default function OrderPage() {
  const [step,          setStep]          = useState(1)
  const [selectedItem,  setSelectedItem]  = useState<MenuItem | null>(null)
  const [customization, setCustomization] = useState<CustomizationState | null>(null)
  const [cartItems,     setCartItems]     = useState<CartItem[]>([])
  const [cartOpen,      setCartOpen]      = useState(false)
  const [orderPlaced,   setOrderPlaced]   = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Computed total price
  const totalPrice = useMemo(() => {
    if (!selectedItem || !customization) return 0
    const sizePrice  = selectedItem.sizes?.find(s => s.label === customization.size)?.price ?? selectedItem.price
    const extrasPrice = customization.extras.reduce((sum, id) => sum + (extraPrices[id] ?? 0), 0)
    return (sizePrice + extrasPrice) * customization.quantity
  }, [selectedItem, customization])

  // Step 1 — select item
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item)
    setCustomization(defaultCustomization(item))
    setStep(2)
  }

  // Step 2 — add to cart
  const handleAddToCart = () => {
    if (!selectedItem || !customization) return
    setCartItems(prev => {
      const existing = prev.findIndex(ci => ci.item.id === selectedItem.id && ci.size === customization.size)
      if (existing >= 0) {
        return prev.map((ci, i) =>
          i === existing ? { ...ci, quantity: ci.quantity + customization.quantity } : ci
        )
      }
      return [...prev, {
        item:     selectedItem,
        quantity: customization.quantity,
        size:     customization.size,
        extras:   customization.extras,
      }]
    })
    setStep(3)
  }

  // Cart helpers
  const handleCartAdd = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.findIndex(ci => ci.item.id === item.id)
      if (existing >= 0) {
        return prev.map((ci, i) => i === existing ? { ...ci, quantity: ci.quantity + 1 } : ci)
      }
      return [...prev, { item, quantity: 1 }]
    })
  }

  const handleCartRemove = (itemId: string) => {
    setCartItems(prev => {
      const existing = prev.findIndex(ci => ci.item.id === itemId)
      if (existing >= 0 && prev[existing].quantity > 1) {
        return prev.map((ci, i) => i === existing ? { ...ci, quantity: ci.quantity - 1 } : ci)
      }
      return prev.filter(ci => ci.item.id !== itemId)
    })
  }

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)

  // Filter items
  const filteredItems = useMemo(() =>
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter(i => i.category === activeCategory),
    [activeCategory]
  )

  // Order placed screen
  if (orderPlaced) {
    return (
      <div style={{
        minHeight:      '100vh',
        background:     '#0D0600',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{
            textAlign:  'center',
            maxWidth:   '480px',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              width:          '96px',
              height:         '96px',
              borderRadius:   '28px',
              background:     'rgba(200,16,46,0.15)',
              border:         '1px solid rgba(200,16,46,0.3)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              margin:         '0 auto 2rem',
              boxShadow:      '0 0 40px rgba(200,16,46,0.3)',
            }}
          >
            <Check size={40} strokeWidth={2} color="#C8102E" />
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color:      '#FFF5E4',
            margin:     '0 0 1rem 0',
            lineHeight: 1.1,
          }}>
            Order Placed!
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '1rem',
            color:      '#C9B99A',
            margin:     '0 0 0.5rem 0',
            lineHeight: 1.6,
          }}>
            Your order is being prepared. Estimated wait time:
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize:   '2rem',
            color:      '#D4A017',
            margin:     '0 0 2.5rem 0',
          }}>
            8–12 minutes
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setOrderPlaced(false)
                setStep(1)
                setSelectedItem(null)
                setCustomization(null)
                setCartItems([])
              }}
              style={{
                background:   '#C8102E',
                color:        '#FFF5E4',
                fontFamily:   'var(--font-body)',
                fontSize:     '0.9rem',
                fontWeight:   500,
                padding:      '12px 28px',
                borderRadius: '100px',
                border:       'none',
                cursor:       'none',
                boxShadow:    '0 0 24px rgba(200,16,46,0.4)',
              }}
            >
              Order Again
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        position:   'relative',
        paddingTop: '7rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid rgba(255,245,228,0.06)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(200,16,46,0.1) 0%, transparent 60%)',
        }} />

        <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 4vw, 3.5rem)',
              fontWeight:    300,
              color:         '#FFF5E4',
              margin:        0,
              letterSpacing: '-0.02em',
            }}>
              Place Order
            </h1>

            {/* Cart button */}
            <motion.button
              onClick={() => setCartOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '8px',
                background:     cartCount > 0 ? 'rgba(200,16,46,0.15)' : 'rgba(255,245,228,0.05)',
                border:         '1px solid ' + (cartCount > 0 ? 'rgba(200,16,46,0.3)' : 'rgba(255,245,228,0.1)'),
                borderRadius:   '100px',
                padding:        '10px 20px',
                fontFamily:     'var(--font-body)',
                fontSize:       '0.875rem',
                color:          cartCount > 0 ? '#FFF5E4' : '#C9B99A',
                cursor:         'none',
                boxShadow:      cartCount > 0 ? '0 0 20px rgba(200,16,46,0.2)' : 'none',
              }}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Cart
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    background:   '#C8102E',
                    color:        '#FFF5E4',
                    borderRadius: '100px',
                    padding:      '1px 8px',
                    fontSize:     '0.72rem',
                    fontWeight:   600,
                    minWidth:     '20px',
                    textAlign:    'center',
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Step indicator */}
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Step content */}
      <div className="section-wrapper" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Choose item ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.5rem',
                fontWeight: 300,
                color:      '#FFF5E4',
                margin:     '0 0 1.5rem 0',
              }}>
                What are you having?
              </h2>

              {/* Category pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[{ id: 'all', label: 'All' }, ...categories.map(c => ({ id: c.id, label: c.label }))].map(cat => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '0.8rem',
                      color:        activeCategory === cat.id ? '#FFF5E4' : '#C9B99A',
                      background:   activeCategory === cat.id ? '#C8102E' : 'rgba(255,245,228,0.05)',
                      border:       '1px solid ' + (activeCategory === cat.id ? 'rgba(200,16,46,0.5)' : 'rgba(255,245,228,0.1)'),
                      borderRadius: '100px',
                      padding:      '7px 18px',
                      cursor:       'none',
                      boxShadow:    activeCategory === cat.id ? '0 0 12px rgba(200,16,46,0.3)' : 'none',
                      transition:   'all 0.25s ease',
                    }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>

              {/* Items grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{
                  display:             'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap:                 '1rem',
                }}
              >
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    style={{ cursor: 'none' }}
                  >
                    <MenuCard
                      item={item}
                      selected={selectedItem?.id === item.id}
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── STEP 2: Customize ── */}
          {step === 2 && selectedItem && customization && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back button */}
              <motion.button
                onClick={() => setStep(1)}
                whileHover={{ x: -4 }}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '6px',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '0.875rem',
                  color:          '#C9B99A',
                  background:     'transparent',
                  border:         'none',
                  cursor:         'none',
                  marginBottom:   '1.5rem',
                  padding:        0,
                }}
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                Back to menu
              </motion.button>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.5rem',
                fontWeight: 300,
                color:      '#FFF5E4',
                margin:     '0 0 1.5rem 0',
              }}>
                Customize your order
              </h2>

              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '2rem',
                alignItems:          'start',
              }}
                className="customize-grid"
              >
                {/* Left: large item preview */}
                <div>
                  <div style={{
                    borderRadius: '24px',
                    overflow:     'hidden',
                    height:       '320px',
                    position:     'relative',
                    marginBottom: '1.5rem',
                  }}>
                    <img
                      src={categoryImages[selectedItem.category]}
                      alt={selectedItem.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position:   'absolute',
                      inset:      0,
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(13,6,0,0.9) 100%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom:   '1.5rem',
                      left:     '1.5rem',
                      right:    '1.5rem',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize:   '1.8rem',
                        fontWeight: 300,
                        color:      '#FFF5E4',
                        margin:     '0 0 4px 0',
                      }}>
                        {selectedItem.name}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.8rem',
                        color:      '#C9B99A',
                      }}>
                        {selectedItem.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{
                      boxShadow: '0 0 40px rgba(200,16,46,0.6)',
                      y: -2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width:        '100%',
                      background:   '#C8102E',
                      color:        '#FFF5E4',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '1rem',
                      fontWeight:   500,
                      padding:      '16px',
                      borderRadius: '16px',
                      border:       'none',
                      cursor:       'none',
                      boxShadow:    '0 0 24px rgba(200,16,46,0.4)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      gap:          '10px',
                      transition:   'all 0.3s ease',
                    }}
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    Add to Cart — ${totalPrice.toFixed(2)}
                  </motion.button>
                </div>

                {/* Right: customize panel */}
                <CustomizePanel
                  item={selectedItem}
                  customization={customization}
                  onChange={setCustomization}
                  totalPrice={totalPrice}
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.5rem',
                fontWeight: 300,
                color:      '#FFF5E4',
                margin:     '0 0 1.5rem 0',
                textAlign:  'center',
              }}>
                Review your order
              </h2>

              {/* Order items */}
              <div style={{
                background:   'rgba(255,245,228,0.04)',
                border:       '1px solid rgba(255,245,228,0.08)',
                borderRadius: '20px',
                overflow:     'hidden',
                marginBottom: '1.5rem',
              }}>
                {cartItems.map((ci, i) => (
                  <div
                    key={i}
                    style={{
                      display:    'flex',
                      gap:        '12px',
                      padding:    '1rem 1.25rem',
                      borderBottom: i < cartItems.length - 1 ? '1px solid rgba(255,245,228,0.06)' : 'none',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{
                      width:        '52px',
                      height:       '52px',
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
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.9rem',
                        fontWeight: 500,
                        color:      '#FFF5E4',
                        margin:     '0 0 3px 0',
                      }}>
                        {ci.item.name}
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.72rem',
                        color:      '#C9B99A',
                        margin:     0,
                      }}>
                        {[ci.size, ci.extras?.join(', ')].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.75rem',
                        color:      '#C9B99A',
                        display:    'block',
                      }}>
                        x{ci.quantity}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.95rem',
                        fontWeight: 600,
                        color:      '#D4A017',
                      }}>
                        ${(ci.item.price * ci.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              {(() => {
                const sub = cartItems.reduce((s, ci) => s + ci.item.price * ci.quantity, 0)
                const tax = sub * 0.13
                const tot = sub + tax
                return (
                  <div style={{
                    background:   'rgba(255,245,228,0.04)',
                    border:       '1px solid rgba(255,245,228,0.08)',
                    borderRadius: '20px',
                    padding:      '1.25rem',
                    marginBottom: '1.5rem',
                    display:      'flex',
                    flexDirection:'column',
                    gap:          '10px',
                  }}>
                    {[
                      { label: 'Subtotal', val: sub },
                      { label: 'Tax (13%)', val: tax },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#C9B99A' }}>{label}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#FFF5E4' }}>${val.toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{ height: '1px', background: 'rgba(255,245,228,0.08)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: '#FFF5E4' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#D4A017' }}>${tot.toFixed(2)}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#C9B99A', margin: 0, textAlign: 'center' }}>
                      You will earn <span style={{ color: '#D4A017', fontWeight: 500 }}>{Math.floor(tot * 10)} pts</span> on this order
                    </p>
                  </div>
                )
              })()}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex:         1,
                    fontFamily:   'var(--font-body)',
                    fontSize:     '0.9rem',
                    color:        '#C9B99A',
                    background:   'rgba(255,245,228,0.05)',
                    border:       '1px solid rgba(255,245,228,0.1)',
                    borderRadius: '14px',
                    padding:      '14px',
                    cursor:       'none',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent:'center',
                    gap:          '6px',
                  }}
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                  Add More
                </motion.button>

                <motion.button
                  onClick={() => setOrderPlaced(true)}
                  whileHover={{ boxShadow: '0 0 40px rgba(200,16,46,0.6)', y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex:         2,
                    fontFamily:   'var(--font-body)',
                    fontSize:     '1rem',
                    fontWeight:   500,
                    color:        '#FFF5E4',
                    background:   '#C8102E',
                    border:       'none',
                    borderRadius: '14px',
                    padding:      '14px',
                    cursor:       'none',
                    boxShadow:    '0 0 24px rgba(200,16,46,0.4)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent:'center',
                    gap:          '8px',
                  }}
                >
                  <Check size={18} strokeWidth={2} />
                  Place Order
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onAdd={handleCartAdd}
        onRemove={handleCartRemove}
        onClear={() => setCartItems([])}
      />

      <style>{`
        @media (max-width: 768px) {
          .customize-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}