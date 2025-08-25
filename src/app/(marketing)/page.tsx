import { Metadata } from 'next'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ProofSection } from '@/components/marketing/ProofSection'
import { PlatformOverview } from '@/components/marketing/PlatformOverview'
import { CaseStudySpotlight } from '@/components/marketing/CaseStudySpotlight'
import { FeatureDemonstrations } from '@/components/marketing/FeatureDemonstrations'
import { IntegrationShowcase } from '@/components/marketing/IntegrationShowcase'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export const metadata: Metadata = {
  title: 'FabriiQ - Building the Future of Multi-Campus Education',
  description: 'Where education meets innovation. FabriiQ is developing a comprehensive platform that unifies Student Information Systems and Learning Experience Platforms for multi-campus institutions across Asia, Southeast Asia, and MENA regions.',
  openGraph: {
    title: 'FabriiQ - Where Education Meets Innovation',
    description: 'Building the future of multi-campus educational technology with AI-powered teaching assistance, gamified learning, and comprehensive management solutions.',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofSection />
      <PlatformOverview />
      <CaseStudySpotlight />
      <FeatureDemonstrations />
      <IntegrationShowcase />
      <FinalCTA />
    </>
  )
}
