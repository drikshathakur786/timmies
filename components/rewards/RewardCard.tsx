'use client'

import { motion } from 'framer-motion'
import { Lock, Star, Coffee, Cookie, Sandwich } from 'lucide-react'
import { cardReveal } from '@/lib/utils/animations'

export interface Reward {
  id:       string
  title:    string
  points:   number
  icon:     React.ElementType
  locked:   boolean
  category: string
}

export const rewards: Reward[] = [
  {
    id:       'free-coffee',
    title:    'Free Coffee',
    points:   500,
    icon:     Coffee,
    locked:   false,
    category: 'Drinks',
  },
  {
    id:       'free-muffin',
    title:    'Free Muffin',
    points:   400,
    icon:     Cookie,
    locked:   false,
    category: 'Baked Goods',
  },
  {
    id:       'free-combo',
    title:    'Free Breakfast Combo',
    points:   800,
    icon:     Sandwich,
    locked:   true,
    category: 'Food',
  },
]

interface RewardCardProps {
  reward:    Reward
  userPoints: number
  onRedeem:  (id: string) => void
}

export default function RewardCard({ reward, userPoints, onRedeem }: RewardCardProps) {
  const Icon       = reward.icon
  const canRedeem  = !reward.locked && userPoints >= reward.points
  const isLocked   = reward.locked || userPoints < reward.points
  const progress   = Math.min(userPoints / reward.points, 1)

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={!isLocked ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Locked blur overlay */}
      {isLocked && (
        <div style={{
          position:     'absolute',
          inset:        0,
          borderRadius: '24px',
          background:   'rgba(13,6,0,0.5)',
          backdropFilter: 'blur(2px)',
          zIndex:       5,
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap:          '8px',
        }}>
          <div style={{
            width:          '44px',
            height:         '44px',
            borderRadius:   '12px',
            background:     'rgba(255,245,228,0.08)',
            border:         '1px solid rgba(255,245,228,0.12)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            <Lock size={20} strokeWidth={1.5} color="#C9B99A" />
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.75rem',
            color:      '#C9B99A',
            textAlign:  'center',
          }}>
            {reward.points - userPoints > 0
              ? `${(reward.points - userPoints).toLocaleString()} more pts needed`
              : 'Locked'
            }
          </span>
        </div>
      )}

      {/* Card */}
      <div style={{
        background:           'rgba(255,245,228,0.04)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:               '1px solid ' + (canRedeem ? 'rgba(212,160,23,0.25)' : 'rgba(255,245,228,0.08)'),
        borderRadius:         '24px',
        padding:              '1.5rem',
        display:              'flex',
        flexDirection:        'column',
        gap:                  '1.25rem',
        boxShadow:            canRedeem
          ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,160,23,0.1)'
          : '0 8px 32px rgba(0,0,0,0.3)',
      }}>

        {/* Icon + category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width:          '52px',
            height:         '52px',
            borderRadius:   '16px',
            background:     canRedeem ? 'rgba(212,160,23,0.15)' : 'rgba(255,245,228,0.05)',
            border:         '1px solid ' + (canRedeem ? 'rgba(212,160,23,0.25)' : 'rgba(255,245,228,0.08)'),
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      canRedeem ? '0 0 20px rgba(212,160,23,0.2)' : 'none',
          }}>
            <Icon
              size={22}
              strokeWidth={1.5}
              color={canRedeem ? '#D4A017' : '#C9B99A'}
            />
          </div>

          <span style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '0.65rem',
            color:        '#C9B99A',
            background:   'rgba(255,245,228,0.05)',
            border:       '1px solid rgba(255,245,228,0.08)',
            borderRadius: '100px',
            padding:      '3px 10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {reward.category}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize:   '1.4rem',
            fontWeight: 400,
            color:      '#FFF5E4',
            margin:     '0 0 6px 0',
          }}>
            {reward.title}
          </h3>

          {/* Points badge */}
          <div style={{
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '5px',
            background:  'rgba(212,160,23,0.12)',
            border:      '1px solid rgba(212,160,23,0.22)',
            borderRadius:'100px',
            padding:     '4px 12px',
          }}>
            <Star size={10} fill="#D4A017" color="#D4A017" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.78rem',
              fontWeight: 600,
              color:      '#D4A017',
            }}>
              {reward.points.toLocaleString()} pts
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            marginBottom:   '6px',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#C9B99A' }}>
              Progress
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#D4A017' }}>
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div style={{
            height:       '4px',
            borderRadius: '2px',
            background:   'rgba(255,245,228,0.06)',
            overflow:     'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              style={{
                height:       '100%',
                borderRadius: '2px',
                background:   'linear-gradient(to right, #D4A017, #F5C842)',
                boxShadow:    '0 0 8px rgba(212,160,23,0.5)',
              }}
            />
          </div>
        </div>

        {/* Redeem button */}
        <motion.button
          onClick={() => canRedeem && onRedeem(reward.id)}
          whileHover={canRedeem ? {
            boxShadow: '0 0 30px rgba(212,160,23,0.5)',
            y: -2,
          } : {}}
          whileTap={canRedeem ? { scale: 0.97 } : {}}
          style={{
            width:        '100%',
            padding:      '12px',
            borderRadius: '14px',
            border:       '1px solid ' + (canRedeem ? 'rgba(212,160,23,0.4)' : 'rgba(255,245,228,0.08)'),
            background:   canRedeem ? 'rgba(212,160,23,0.15)' : 'rgba(255,245,228,0.03)',
            color:        canRedeem ? '#D4A017' : '#C9B99A',
            fontFamily:   'var(--font-body)',
            fontSize:     '0.875rem',
            fontWeight:   canRedeem ? 600 : 400,
            cursor:       canRedeem ? 'none' : 'not-allowed',
            transition:   'all 0.3s ease',
          }}
        >
          {canRedeem ? 'Redeem Reward' : `Need ${(reward.points - userPoints).toLocaleString()} more pts`}
        </motion.button>
      </div>
    </motion.div>
  )
}