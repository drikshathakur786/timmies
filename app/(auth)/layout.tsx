import type { Metadata } from 'next'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: "Tim Hortons — Canada's Finest Since 1964",
    template: '%s | Tim Hortons',
  },
  description: "Order your favourite Tim Hortons coffee, food and baked goods.",
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
        <NavbarWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}