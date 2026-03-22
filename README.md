<div align="center">

<img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop&crop=center&auto=format&q=80" alt="Tim Hortons Banner" width="100%" style="border-radius: 12px;" />

# ☕ Tim Hortons — Reimagined

### *Canada's Finest Since 1964, redesigned for the future.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-timmies--by--drikshu.vercel.app-C8102E?style=for-the-badge&logo=vercel&logoColor=white)](https://timmies-by-drikshu.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **"What if Apple designed a Tim Hortons website?"**
> This is that answer. Dark, warm, cinematic — iOS meets luxury coffee.

</div>

---

## ✨ What is this?

A **premium frontend rebuild** of the Tim Hortons website — built entirely from scratch using modern React and Next.js 16 with the App Router. Every interaction is intentional, every animation purposeful, every card feels like frosted glass you want to touch.

The person looking at this says *"wow, what is this?"* within the first 3 seconds. That was the goal. That is the result.

**[→ See it live](https://timmies-by-drikshu.vercel.app/)**

---

## 🎨 Design Philosophy

| Principle | Implementation |
|-----------|---------------|
| **iOS meets luxury coffee** | Dark backgrounds, warm cream tones, cinematic typography |
| **Glass morphism** | `backdrop-filter: blur(20px)` on every card and panel |
| **Editorial typography** | Cormorant Garamond (display) + Outfit (body) from Google Fonts |
| **Apple easing** | `cubic-bezier(0.23, 1, 0.32, 1)` on every animation |
| **Cinematic depth** | Layered radial gradients, film grain noise texture, dot grids |
| **Premium interactions** | Custom cursor, hover glows, scroll parallax, stagger reveals |

---

## 🚀 Pages Built

### 🏠 Home (`/`)
- **Hero** — Full viewport with auto-rotating drink carousel (4 drinks, 3.5s interval), mouse parallax background, floating drink info card, animated dot switcher, scroll-fade effect
- **Stats Bar** — Animated counting numbers triggered by scroll (5,700+ locations, 60 years, 100% Canadian, Est. 1964)
- **Today's Picks** — Horizontal snap-scroll card row with real Unsplash photos, category color glow, scroll controls
- **Trending Now** — Asymmetric 3-card grid with animated gradient border on center featured card
- **Experience Section** — Split layout with feature points and fanned deck of glass cards
- **App Download** — QR code, phone mockup, App Store + Google Play buttons

### 🍽️ Menu (`/menu`)
- Sticky category sidebar with item counts
- Live search with instant filtering
- Multi-select filter pills (Popular, Under $5, Under 300cal, Hot, Iced, Customizable)
- Responsive auto-fill grid (`repeat(auto-fill, minmax(240px, 1fr))`)
- Real food photography from Unsplash per category

### 🛒 Order (`/order`)
- **Step 1** — Item selection grid with category pills
- **Step 2** — Customize: size selector, hot/iced toggle, extras with iOS-style toggle switches, quantity stepper
- **Step 3** — Order review with subtotal, tax, total breakdown
- Cart drawer sliding in from right with quantity controls
- Order placed success screen with spring animation

### 🌟 Rewards (`/rewards`)
- Animated SVG circular progress ring with gold gradient arc and tick marks
- Scratch-to-reveal daily deal card
- Reward cards with locked/unlocked states and progress bars
- Points history list with earn/redeem color coding

### 📍 Locations (`/locations`)
- Split layout: store list left, Google Maps embed right
- Live search by city or address
- Store cards with today's hours, amenities badges, open/closed status
- CSS `invert + hue-rotate` dark map trick
- Directions link opens Google Maps

### 🔐 Auth (`/login`, `/signup`)
- Split-screen layout: brand panel left, form right
- Floating label inputs (animate on focus/value)
- Password strength meter (4 levels)
- Password show/hide toggle
- Google OAuth button
- Form validation with field-specific error messages

### 📄 Supporting Pages
`/about` `/careers` `/press` `/investors` `/sustainability` `/faq` `/contact` `/accessibility` `/privacy` `/terms`

---

## 🧩 Component Architecture

```
components/
├── layout/
│   ├── Navbar.tsx          # Scroll-aware glass navbar + mobile menu
│   └── Footer.tsx          # Multi-column footer with watermark text
├── ui/
│   ├── GlassCard.tsx       # Reusable iOS-style glass card
│   ├── GlassButton.tsx     # Secondary glass button
│   ├── RedButton.tsx       # Primary CTA with loading state
│   ├── GlassInput.tsx      # Floating label input with clear button
│   ├── GlassBadge.tsx      # Interactive filter pill
│   ├── SteamEffect.tsx     # Organic steam wisp animation
│   └── CustomCursor.tsx    # Red lerp cursor with ring expansion
├── home/
│   ├── Hero.tsx            # Rotating drink showcase + parallax
│   ├── StatsBar.tsx        # Scroll-triggered counting numbers
│   ├── FeaturedSection.tsx # Horizontal snap scroll menu cards
│   ├── TrendingSection.tsx # Asymmetric grid with gradient border
│   ├── ExperienceSection.tsx # Split layout + fanned card deck
│   └── AppSection.tsx      # App download with phone mockup
├── menu/
│   ├── MenuCard.tsx        # Grid card with image zoom on hover
│   ├── CategorySidebar.tsx # Sticky sidebar with counts
│   ├── SearchBar.tsx       # Live search + multi-select filters
│   └── MenuGrid.tsx        # Filter logic + responsive grid
├── order/
│   ├── StepIndicator.tsx   # 3-step progress bar with connector
│   ├── CartDrawer.tsx      # Slide-in cart with quantity controls
│   └── CustomizePanel.tsx  # Size, temperature, extras, quantity
├── rewards/
│   ├── PointsRing.tsx      # SVG stroke-dashoffset progress ring
│   ├── RewardCard.tsx      # Locked/unlocked reward with progress bar
│   └── DailyDeal.tsx       # Scratch-to-reveal deal card
└── locations/
    ├── StoreCard.tsx        # Store info with amenity badges
    └── MapEmbed.tsx         # Dark Google Maps with controls
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2 | App Router, SSR, file-based routing |
| **TypeScript** | 5.x | Type safety throughout |
| **Tailwind CSS** | v4 | Utility classes + `@theme` design tokens |
| **Framer Motion** | 11.x | All animations, gestures, transitions |
| **Lucide React** | latest | Icon system (strokeWidth 1.5, consistent) |
| **clsx + tailwind-merge** | latest | Conditional className merging |

---

## 🎯 Key Technical Highlights

### Custom Cursor with Lerp
```ts
// Linear interpolation for smooth cursor lag
function lerp(current: number, target: number, t: number) {
  return current + (target - current) * t
}
// Dot follows at t=0.18, ring at t=0.10
// Direct DOM manipulation at 60fps via requestAnimationFrame
```

### SVG Progress Ring
```ts
// stroke-dashoffset animation technique
const circumference = 2 * Math.PI * radius
const dashOffset    = circumference * (1 - progress)
// Animated from circumference → dashOffset on scroll into view
```

### Hydration-Safe QR Code
```ts
// Static pattern array instead of Math.random()
// Math.random() differs server vs client = hydration mismatch
const QR_PATTERN = [1,1,1,0,1,1,1,0,...] // 256 cells, deterministic
```

### CSS Dark Map Trick
```css
/* No API key needed — invert Google Maps colors */
filter: invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85);
```

### Scroll-Triggered Counter
```ts
// ease-out cubic counting animation
const eased = 1 - Math.pow(1 - progress, 3)
setCount(Math.floor(eased * end))
```

---

## 🎨 Design System

```css
/* Brand Colors */
--tims-red:         #C8102E   /* Primary brand, CTAs */
--tims-dark:        #0D0600   /* Deepest background */
--tims-cream:       #FFF5E4   /* Primary text */
--tims-gold:        #D4A017   /* Rewards, highlights */

/* Glass System */
--glass-bg:         rgba(255, 245, 228, 0.06)
--glass-border:     rgba(255, 245, 228, 0.12)
backdrop-filter:    blur(20px) saturate(180%)

/* Typography */
--font-display:     'Cormorant Garamond' — editorial, cinematic
--font-body:        'Outfit'             — modern, iOS-like

/* Apple Easing */
cubic-bezier(0.23, 1, 0.32, 1)
```

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/drikshathakur786/timmies.git
cd timmies

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

---

## 📁 Project Structure

```
tims-frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Route group — no navbar/footer
│   │   ├── login/
│   │   └── signup/
│   ├── menu/
│   ├── order/
│   ├── rewards/
│   ├── locations/
│   ├── privacy/
│   ├── terms/
│   └── ...10 more pages
├── components/             # 40+ reusable components
├── lib/
│   ├── data/
│   │   ├── menu.ts         # 20 static menu items
│   │   └── locations.ts    # 5 Canadian locations
│   └── utils/
│       ├── cn.ts           # clsx + tailwind-merge
│       └── animations.ts   # Shared Framer Motion variants
└── public/
```

---

## 🚀 Deployment

Deployed on **Vercel** with automatic deployments on every push to `main`.

**Live URL:** [https://timmies-by-drikshu.vercel.app](https://timmies-by-drikshu.vercel.app)

---

## 🔮 What's Next

- [ ] Connect Supabase for real auth and database
- [ ] Add NextAuth.js for Google OAuth
- [ ] Real payment flow with Stripe
- [ ] Replace Unsplash photos with real Tim Hortons assets
- [ ] Add i18n support (English + French for Canada)
- [ ] PWA support for mobile app-like experience

---

## 👨‍💻 Built By

**Driksha Thakur** — Built from scratch, one step at a time, as a frontend learning project.

> *"From zero to a full premium frontend in one session."*

---

<div align="center">

**[⭐ Star this repo](https://github.com/drikshathakur786/timmies)** if you found it impressive!

Made with ☕ and a lot of `cubic-bezier(0.23, 1, 0.32, 1)`

</div>
