'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

// ── Types ────────────────────────────────────────────────────
interface CursorState {
  x:        number
  y:        number
  hovering: boolean
  clicking: boolean
  visible:  boolean
}

// ── Lerp helper ──────────────────────────────────────────────
// Linear interpolation: moves "current" toward "target" by factor "t"
// t = 0.08 means it covers 8% of remaining distance each frame
// This creates the smooth lag effect
function lerp(current: number, target: number, t: number): number {
  return current + (target - current) * t
}

// ── Component ────────────────────────────────────────────────
export default function CustomCursor() {
  // Current rendered position (lerped — smooth)
  const dotPos  = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  // Raw mouse position (instant)
  const mousePos = useRef({ x: -100, y: -100 })

  // DOM refs for direct manipulation (faster than React state)
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // State only for hover/click (less frequent updates)
  const [state, setState] = useState<CursorState>({
    x:        -100,
    y:        -100,
    hovering: false,
    clicking: false,
    visible:  false,
  })

  const isHovering = useRef(false)
  const rafId      = useRef<number>(0)

  useEffect(() => {
    // ── Mouse move ──────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Show cursor once we have a real position
      if (!state.visible) {
        setState(prev => ({ ...prev, visible: true }))
      }
    }

    // ── Hover detection ─────────────────────────────────────
    // Any interactive element triggers the expanded ring state
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      )

      if (isInteractive && !isHovering.current) {
        isHovering.current = true
        setState(prev => ({ ...prev, hovering: true }))
      } else if (!isInteractive && isHovering.current) {
        isHovering.current = false
        setState(prev => ({ ...prev, hovering: false }))
      }
    }

    // ── Click feedback ──────────────────────────────────────
    const onMouseDown = () => setState(prev => ({ ...prev, clicking: true  }))
    const onMouseUp   = () => setState(prev => ({ ...prev, clicking: false }))

    // ── Leave / enter window ────────────────────────────────
    const onMouseLeave  = () => setState(prev => ({ ...prev, visible: false }))
    const onMouseEnter  = () => setState(prev => ({ ...prev, visible: true  }))

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseup',    onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // ── Animation loop ──────────────────────────────────────
    // Runs every frame (~60fps), lerps cursor toward mouse
    const animate = () => {
      // Dot follows mouse closely (higher t = faster follow)
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.18)
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.18)

      // Ring follows more slowly (lower t = more lag)
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.10)
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.10)

      // Direct DOM manipulation — much faster than setState each frame
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    // ── Cleanup ─────────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* ── Small dot — follows closely ── */}
      <div
        ref={dotRef}
        className={cn(
          'cursor-dot',
          'fixed top-0 left-0 pointer-events-none z-[99999]',
          'transition-[width,height,opacity] duration-200',

          // Hover state — dot shrinks
          state.hovering && 'hovering',

          // Click state — dot pulses
          state.clicking && '!scale-75',

          // Hidden when outside window
          !state.visible && '!opacity-0',
        )}
        style={{
          // Start off screen
          transform: `translate(-200px, -200px) translate(-50%, -50%)`,
          willChange: 'transform',
        }}
      />

      {/* ── Ring — follows with more lag ── */}
      <div
        ref={ringRef}
        className={cn(
          'cursor-ring',
          'fixed top-0 left-0 pointer-events-none z-[99998]',
          'transition-[width,height,opacity,border-color] duration-300',

          // Hover state — ring expands
          state.hovering && 'hovering',

          // Click state — ring contracts
          state.clicking && '!w-8 !h-8 !opacity-100',

          // Hidden when outside window
          !state.visible && '!opacity-0',
        )}
        style={{
          transform: `translate(-200px, -200px) translate(-50%, -50%)`,
          willChange: 'transform',
        }}
      />
    </>
  )
}