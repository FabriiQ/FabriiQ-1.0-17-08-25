import { Metadata } from 'next'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import '@/styles/marketing.css'

export const metadata: Metadata = {
  title: {
    default: 'FabriiQ - The Integrated Multi-Campus Student Information & Learning Experience Platform',
    template: '%s | FabriiQ'
  },
  description: 'Transform your multi-campus educational operations with FabriiQ\'s comprehensive SIS and LXP integration. Designed specifically for K-12 institutions across Asia, Southeast Asia, and MENA regions.',
  keywords: [
    'student information system',
    'learning management system',
    'multi-campus education',
    'K-12 school management',
    'educational technology',
    'Pakistan education software',
    'Asia education platform',
    'MENA school management'
  ],
  authors: [{ name: 'FabriiQ Team' }],
  creator: 'FabriiQ',
  publisher: 'FabriiQ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fabriiq.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fabriiq.com',
    siteName: 'FabriiQ',
    title: 'FabriiQ - Multi-Campus Educational Platform',
    description: 'Transform your educational institution with comprehensive SIS and LXP integration designed for multi-campus operations.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FabriiQ Educational Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FabriiQ - Multi-Campus Educational Platform',
    description: 'Transform your educational institution with comprehensive SIS and LXP integration.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      <main className="marketing-main">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}
