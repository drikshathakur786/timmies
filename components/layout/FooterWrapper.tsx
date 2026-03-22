'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  const isAuth   = pathname === '/login' || pathname === '/signup'

  if (isAuth) return null

  return <Footer />
}