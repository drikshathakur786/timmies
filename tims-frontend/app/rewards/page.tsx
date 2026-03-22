'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Coffee, ArrowRight, Clock } from 'lucide-react'
import PointsRing from '@/components/rewards/PointsRing'
import RewardCard, { rewards } from '@/components/rewards/RewardCard'
import DailyDeal from '@/components/rewards/DailyDeal'
import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  viewportConfig,
} from '@/lib/utils/animations'

const pointsHistory = [
  { id: 1, item: 'Original Blend Coffee', date: 'Today, 8:32 AM',      points: +25,  type: 'earn'  },
  { id: 2, item: 'Blueberry Muffin',      date: 'Yesterday, 2:15 PM',  points: +20,  type: 'earn'  },
  { id: 3, item: 'Iced Capp',             date: 'Mar 19, 11:04 AM',    points: +45,  type: 'earn'  },
  { id: 4, item: 'Free Coffee Redeemed',  date: 'Mar 18, 9:20 AM',     points: -500, type: 'redeem'},
  { id: 5, item: 'Breakfast Sandwich',    date: 'Mar 17, 7:45 AM',     points: +60,  type: 'earn'  },
  { id: 6, item: 'Dark Roast Coffee',     date: 'Mar 16, 8:10 AM',     points: +25,  type: 'earn'  },
  { id: 7, item: 'Timbits (10 pack)',     date: 'Mar 15, 3:30 PM',     points: +25,  type: 'earn'  },
]

const USER_POINTS = 2450

export default function RewardsPage() {
  const [redeemedIds, setRedeemedIds] = useState<string[]>([])

  const handleRedeem = (id: string) => {
    setRedeemedIds(prev => [...prev, id])
  }

  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        position:   'relative',
        overflow:   'hidden',
        paddingTop: '8rem',
        paddingBottom: '5rem',
      }}>
        {/* Gold gradient background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(212,160,23,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(200,16,46,0.10) 0%, transparent 50%),
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
          <div
            className="rewards-hero-grid"
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '4rem',
              alignItems:          'center',
            }}
          >
            {/* Left: text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInLeft} style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           '8px',
                  background:    'rgba(212,160,23,0.1)',
                  border:        '1px solid rgba(212,160,23,0.2)',
                  borderRadius:  '100px',
                  padding:       '5px 14px',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.7rem',
                  color:         '#D4A017',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight:    500,
                }}>
                  <Star size={10} color="#D4A017" fill="#D4A017" />
                  Tims Rewards
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInLeft}
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight:    300,
                  color:         '#FFF5E4',
                  margin:        '0 0 0.5rem 0',
                  lineHeight:    1,
                  letterSpacing: '-0.03em',
                }}
              >
                Your Rewards
              </motion.h1>

              <motion.h2
                variants={fadeInLeft}
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(1.5rem, 3vw, 3rem)',
                  fontWeight:    300,
                  fontStyle:     'italic',
                  color:         '#D4A017',
                  margin:        '0 0 1.5rem 0',
                  lineHeight:    1.1,
                }}
              >
                Every sip counts.
              </motion.h2>

              <motion.p
                variants={fadeInLeft}
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     '0.95rem',
                  color:        '#C9B99A',
                  lineHeight:   1.7,
                  maxWidth:     '400px',
                  marginBottom: '2rem',
                }}
              >
                Earn points with every purchase. Redeem for free drinks,
                food, and exclusive member benefits.
              </motion.p>

              {/* Quick stats */}
              <motion.div
                variants={fadeInLeft}
                style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
              >
                {[
                  { label: 'Points Balance', value: USER_POINTS.toLocaleString() },
                  { label: 'Member Since',   value: '2021'                        },
                  { label: 'Total Earned',   value: '12,450'                      },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      '1.8rem',
                      fontWeight:    300,
                      color:         '#F5C842',
                      margin:        '0 0 2px 0',
                      lineHeight:    1,
                      letterSpacing: '-0.02em',
                    }}>
                      {value}
                    </p>
                    <p style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '0.65rem',
                      color:         '#C9B99A',
                      margin:        0,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Points ring */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              style={{
                display:        'flex',
                justifyContent: 'center',
                alignItems:     'center',
                position:       'relative',
              }}
            >
              {/* Glow behind ring */}
              <div style={{
                position:     'absolute',
                width:        '300px',
                height:       '300px',
                borderRadius: '50%',
                background:   'radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 70%)',
                filter:       'blur(50px)',
                pointerEvents: 'none',
              }} />

              <PointsRing
                points={USER_POINTS}
                maxPoints={5000}
                size={280}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-wrapper" style={{ paddingBottom: '6rem' }}>

        {/* ── DAILY DEAL + REWARDS GRID ── */}
        <div
          className="rewards-main-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 2fr',
            gap:                 '2rem',
            marginBottom:        '4rem',
            alignItems:          'start',
          }}
        >
          {/* Daily deal */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.65rem',
              fontWeight:    600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#C9B99A',
              marginBottom:  '1rem',
            }}>
              Today&apos;s Deal
            </p>
            <DailyDeal />
          </motion.div>

          {/* Rewards grid */}
          <div>
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   '1rem',
            }}>
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.65rem',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#C9B99A',
                margin:        0,
              }}>
                Available Rewards
              </p>
              <span style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '0.72rem',
                color:        '#D4A017',
                background:   'rgba(212,160,23,0.1)',
                border:       '1px solid rgba(212,160,23,0.2)',
                borderRadius: '100px',
                padding:      '3px 10px',
              }}>
                {USER_POINTS.toLocaleString()} pts available
              </span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap:                 '1rem',
              }}
            >
              {rewards.map(reward => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={USER_POINTS}
                  onRedeem={handleRedeem}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── POINTS HISTORY ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div
            variants={fadeInUp}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   '1.25rem',
            }}
          >
            <div>
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.65rem',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#C9B99A',
                margin:        '0 0 4px 0',
              }}>
                Points History
              </p>
              <h2 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight:    300,
                color:         '#FFF5E4',
                margin:        0,
                letterSpacing: '-0.02em',
              }}>
                Recent Activity
              </h2>
            </div>
            <button style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '6px',
              fontFamily:     'var(--font-body)',
              fontSize:       '0.8rem',
              color:          '#C9B99A',
              background:     'rgba(255,245,228,0.05)',
              border:         '1px solid rgba(255,245,228,0.1)',
              borderRadius:   '100px',
              padding:        '8px 16px',
              cursor:         'none',
            }}>
              View All
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* History list */}
          <div style={{
            background:   'rgba(255,245,228,0.02)',
            border:       '1px solid rgba(255,245,228,0.07)',
            borderRadius: '20px',
            overflow:     'hidden',
          }}>
            {pointsHistory.map((entry, index) => (
              <motion.div
                key={entry.id}
                variants={fadeInUp}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '1rem',
                  padding:        '1rem 1.5rem',
                  borderBottom:   index < pointsHistory.length - 1
                    ? '1px solid rgba(255,245,228,0.05)'
                    : 'none',
                  transition:     'background 0.2s ease',
                }}
                whileHover={{ background: 'rgba(255,245,228,0.03)' }}
              >
                {/* Icon */}
                <div style={{
                  width:          '38px',
                  height:         '38px',
                  borderRadius:   '10px',
                  background:     entry.type === 'earn'
                    ? 'rgba(212,160,23,0.1)'
                    : 'rgba(200,16,46,0.1)',
                  border:         '1px solid ' + (entry.type === 'earn'
                    ? 'rgba(212,160,23,0.2)'
                    : 'rgba(200,16,46,0.2)'),
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  {entry.type === 'earn'
                    ? <Coffee size={15} strokeWidth={1.5} color="#D4A017" />
                    : <Star   size={15} strokeWidth={1.5} color="#C8102E" fill="#C8102E" />
                  }
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     '0.875rem',
                    fontWeight:   500,
                    color:        '#FFF5E4',
                    margin:       '0 0 2px 0',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                  }}>
                    {entry.item}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={10} strokeWidth={1.5} color="#C9B99A" />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.72rem',
                      color:      '#C9B99A',
                    }}>
                      {entry.date}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.95rem',
                  fontWeight: 600,
                  color:      entry.type === 'earn' ? '#D4A017' : '#C8102E',
                  flexShrink: 0,
                }}>
                  {entry.type === 'earn' ? '+' : ''}{entry.points} pts
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .rewards-hero-grid  { grid-template-columns: 1fr !important; }
          .rewards-main-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}