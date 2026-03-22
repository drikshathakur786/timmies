'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
export default function PrivacyPage() {
  return (
    <div style={{ background: '#0D0600', minHeight: '100vh' }}>
      <div className="section-wrapper" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#C9B99A', textDecoration: 'none', marginBottom: '3rem' }}>
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#FFF5E4', margin: '2rem 0 1rem' }}>Privacy Policy</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#C9B99A', marginBottom: '3rem' }}>Last updated: March 2026</p>
        {[
          { title: 'Information We Collect', text: 'We collect account information (name, email, password), order history, device information, location data when you use our store locator, and Tims Rewards activity including points earned and redeemed.' },
          { title: 'How We Use Your Information', text: 'We use your information to process orders and payments, personalize your experience with relevant offers, communicate about your orders and promotions, improve our products and services, and comply with Canadian legal obligations.' },
          { title: 'How We Protect Your Information', text: 'We use industry-standard SSL encryption, secure password hashing, restrict data access to authorized employees, conduct regular security audits, and comply with PIPEDA.' },
          { title: 'Cookies and Tracking', text: 'We use essential cookies to keep you signed in and analytics cookies to improve our website. You can control cookie preferences through your browser. We do not sell your personal data to third-party advertisers.' },
          { title: 'Your Rights', text: 'You have the right to access, correct, or delete your personal information. You may withdraw consent for marketing communications at any time. Contact our Privacy Officer at privacy@timhortons.ca to exercise these rights.' },
          { title: 'Contact Us', text: 'Privacy Officer — Tim Hortons, 130 King Street West, Suite 300, Toronto, Ontario M5X 1E1. Email: privacy@timhortons.ca. Phone: 1-888-601-1616. We respond to all privacy inquiries within 30 days.' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,245,228,0.03)', border: '1px solid rgba(255,245,228,0.07)', borderRadius: '20px', padding: '2rem', marginBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: '#FFF5E4', marginBottom: '0.75rem' }}>{s.title}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#C9B99A', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
