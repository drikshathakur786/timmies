import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: "Tim Hortons — Canada's Finest Since 1964",
    template: '%s | Tim Hortons',
  },
  description: "Order your favourite Tim Hortons coffee, food and baked goods. Find locations, earn Tims Rewards and experience Canada's finest since 1964.",
  keywords: ['Tim Hortons', 'coffee', 'Canada', 'timbits', 'rewards', 'order online'],
  authors: [{ name: 'Tim Hortons' }],
  creator: 'Tim Hortons',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://timhortons.ca',
    siteName: 'Tim Hortons',
    title: "Tim Hortons — Canada's Finest Since 1964",
    description: 'Order your favourite Tim Hortons coffee and food online.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tim Hortons — Canada's Finest Since 1964",
    description: 'Order your favourite Tim Hortons coffee and food online.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#0D0600' }}>
        <CustomCursor />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}