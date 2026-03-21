import { Variants } from 'framer-motion'

// ============================================================
// EASING CURVES
// ============================================================
export const easings = {
  apple:      [0.23, 1, 0.32, 1],       // Apple's signature — fast start, smooth settle
  easeOut:    [0.16, 1, 0.3, 1],        // Quick deceleration
  easeInOut:  [0.45, 0, 0.55, 1],       // Balanced
  bounce:     [0.34, 1.56, 0.64, 1],    // Slight overshoot
  sharp:      [0.25, 0.46, 0.45, 0.94], // Clean and crisp
} as const

// ============================================================
// FADE VARIANTS
// ============================================================

// Simple fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.apple,
    },
  },
}

// Fade in from below
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.apple,
    },
  },
}

// Fade in from above
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.apple,
    },
  },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.apple,
    },
  },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.apple,
    },
  },
}

// ============================================================
// SCALE VARIANTS
// ============================================================

// Scale up from slightly smaller
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
}

// Scale in with bounce
export const scaleInBounce: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.bounce,
    },
  },
}

// ============================================================
// CONTAINER / STAGGER VARIANTS
// ============================================================

// Parent container — staggers children one by one
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,       // 100ms between each child
      delayChildren: 0.1,          // Small delay before first child
    },
  },
}

// Slower stagger — for hero text lines
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Even slower — for section reveals
export const staggerContainerXSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

// ============================================================
// HERO TEXT VARIANTS
// ============================================================

// Each line of hero heading animates in
export const heroLineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    skewY: 3,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.9,
      ease: easings.apple,
    },
  },
}

// Subtitle / smaller text below hero
export const heroSubReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.apple,
      delay: 0.6,
    },
  },
}

// ============================================================
// CARD VARIANTS
// ============================================================

// Glass card entrance
export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.apple,
    },
  },
}

// Card hover — used with whileHover
export const cardHover = {
  y: -8,
  scale: 1.02,
  transition: {
    duration: 0.4,
    ease: easings.apple,
  },
}

// Card tap — used with whileTap
export const cardTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
}

// ============================================================
// NAVBAR VARIANTS
// ============================================================

// Navbar slides down on load
export const navbarReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.apple,
      delay: 0.1,
    },
  },
}

// Mobile menu overlay
export const mobileMenuOverlay: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.easeInOut,
    },
  },
}

// Mobile menu links stagger in from right
export const mobileMenuLinks: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.2,
    },
  },
}

// ============================================================
// DRAWER VARIANTS (Cart)
// ============================================================
export const drawerSlideIn: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: easings.easeInOut,
    },
  },
}

// ============================================================
// PAGE TRANSITION VARIANTS
// ============================================================
export const pageEnter: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.apple,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeInOut,
    },
  },
}

// ============================================================
// STAT / NUMBER COUNTER VARIANTS
// ============================================================
export const statReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.apple,
    },
  },
}

// ============================================================
// GLOW / ORB VARIANTS
// ============================================================
export const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easings.easeOut,
    },
  },
}

// ============================================================
// UTILITY — viewport config for scroll triggers
// ============================================================
export const viewportConfig = {
  once: true,       // Only animate once (not every time it enters view)
  margin: '-80px',  // Start animation 80px before element enters viewport
}

// Eager viewport — triggers sooner
export const viewportEager = {
  once: true,
  margin: '-40px',
}