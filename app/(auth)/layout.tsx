import type { Metadata } from 'next'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: "Tim Hortons — Canada's Finest",
    template: '%s | Tim Hortons',
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}