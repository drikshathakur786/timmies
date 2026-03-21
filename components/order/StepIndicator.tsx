'use client'

import { motion } from 'framer-motion'
import { Check, ShoppingBag, Sliders, ClipboardList } from 'lucide-react'

interface Step {
  id:    number
  label: string
  icon:  React.ElementType
}

const steps: Step[] = [
  { id: 1, label: 'Choose Item',   icon: ShoppingBag   },
  { id: 2, label: 'Customize',     icon: Sliders       },
  { id: 3, label: 'Review',        icon: ClipboardList },
]

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '0',
      width:          '100%',
      maxWidth:       '500px',
      margin:         '0 auto',
    }}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isActive    = currentStep === step.id
        const Icon        = step.icon

        return (
          <div
            key={step.id}
            style={{
              display:    'flex',
              alignItems: 'center',
              flex:       index < steps.length - 1 ? 1 : 'none',
            }}
          >
            {/* Step pill */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <motion.div
                animate={{
                  background: isCompleted
                    ? '#C8102E'
                    : isActive
                    ? 'rgba(200,16,46,0.15)'
                    : 'rgba(255,245,228,0.05)',
                  borderColor: isCompleted || isActive
                    ? '#C8102E'
                    : 'rgba(255,245,228,0.12)',
                  boxShadow: isActive
                    ? '0 0 20px rgba(200,16,46,0.4)'
                    : 'none',
                }}
                transition={{ duration: 0.4 }}
                style={{
                  width:          '44px',
                  height:         '44px',
                  borderRadius:   '14px',
                  border:         '1px solid',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check size={18} strokeWidth={2.5} color="#FFF5E4" />
                  </motion.div>
                ) : (
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    color={isActive ? '#C8102E' : '#C9B99A'}
                  />
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{ color: isActive ? '#FFF5E4' : isCompleted ? '#C8102E' : '#C9B99A' }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    '0.72rem',
                  fontWeight:  isActive ? 500 : 400,
                  whiteSpace:  'nowrap',
                  letterSpacing: '0.02em',
                }}
              >
                {step.label}
              </motion.span>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div style={{
                flex:       1,
                height:     '1px',
                margin:     '0 8px',
                marginBottom: '22px',
                position:   'relative',
                background: 'rgba(255,245,228,0.08)',
              }}>
                <motion.div
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position:        'absolute',
                    inset:           0,
                    background:      '#C8102E',
                    transformOrigin: 'left',
                    boxShadow:       '0 0 8px rgba(200,16,46,0.5)',
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}