'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isAuth   = pathname === '/login' || pathname === '/signup'

  if (isAuth) return null

  return <Navbar />
}