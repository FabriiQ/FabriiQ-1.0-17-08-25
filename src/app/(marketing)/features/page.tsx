import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EnrollmentShowcase } from '@/components/marketing/showcase/EnrollmentShowcase'
import { BloomsAnalyticsShowcase } from '@/components/marketing/showcase/BloomsAnalyticsShowcase'
import { FeeManagementShowcase } from '@/components/marketing/showcase/FeeManagementShowcase'
import { TeacherPortalShowcase } from '@/components/marketing/showcase/TeacherPortalShowcase'
import { StudentPortalShowcase } from '@/components/marketing/showcase/StudentPortalShowcase'

export const metadata: Metadata = {
  title: 'Features - Comprehensive Educational Platform Capabilities',
  description: 'Explore FabriiQ\'s comprehensive features: Curriculum Management, Assessment & Grading, Analytics & Reporting, Enrollment & Fee Management, and Student Experience.',
}

const features = [
  {
    title: 'Curriculum Management',
    description: 'Comprehensive curriculum development with Bloom\'s taxonomy integration, learning outcomes framework, and advanced rubric systems.',
    capabilities: [
      'Structured subject framework with hierarchical organization',
      'ABCD and SMART learning outcomes with action verb suggestions',
      'Comprehensive rubric system with weightings and descriptors',
      'Real-time cognitive distribution analysis across all activities',
      'Version control with draft → review → publish workflow'
    ],
    showcase: <EnrollmentShowcase />,
    href: '/features/curriculum-management',
    metrics: 'Real-time Bloom\'s analytics across 6 cognitive levels',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Assessment & Grading',
    description: 'Revolutionary assessment creation with automated grading, rubric-based evaluation, and comprehensive feedback systems.',
    capabilities: [
      'AI-powered assessment creation with question bank integration',
      'Automated grading with rubric-based scoring consistency',
      'Real-time feedback delivery to students and parents',
      'Cross-campus performance benchmarking and analysis',
      'Advanced mastery tracking through cognitive levels'
    ],
    showcase: <TeacherPortalShowcase />,
    href: '/features/assessment-grading',
    metrics: '60% reduction in grading time with automated systems',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'Analytics & Reporting',
    description: 'Comprehensive analytics engine providing real-time insights into institutional performance across all campus locations.',
    capabilities: [
      'Multi-campus performance dashboards with drill-down capabilities',
      'Predictive analytics for student success and intervention',
      'Financial intelligence with collection and aging analysis',
      'Curriculum effectiveness measurement and optimization',
      'Custom report builder with automated scheduling'
    ],
    showcase: <BloomsAnalyticsShowcase />,
    href: '/features/analytics-reporting',
    metrics: '340% ROI through data-driven decision making',
    color: 'bg-indigo-50 border-indigo-200'
  },
  {
    title: 'Enrollment & Fee Management',
    description: 'Streamlined enrollment processes with intelligent fee management, automated late fee policies, and multi-currency support.',
    capabilities: [
      'Self-serve and admin-assisted enrollment workflows',
      'Program-based fee structures with automatic assignment',
      'Automated late fee policies with grace periods and escalation',
      'Multi-currency support (PKR, USD, AED, SAR) with custom symbols',
      'Real-time payment processing with instant confirmations'
    ],
    showcase: <FeeManagementShowcase />,
    href: '/features/enrollment-fee-management',
    metrics: '67% faster enrollment, 89% improved fee collection',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Student Experience',
    description: 'Mobile-first learning experience with offline capabilities, social learning features, and psychology-driven engagement.',
    capabilities: [
      'Intuitive class-centric learning journey with personalized paths',
      'Achievement system with evidence-based psychological principles',
      'Social learning and collaboration features with safe moderation',
      'Offline-first capabilities with intelligent background sync',
      'Real-time progress tracking with parent engagement tools'
    ],
    showcase: <StudentPortalShowcase />,
    href: '/features/student-experience',
    metrics: '45% increase in student engagement and participation',
    color: 'bg-orange-50 border-orange-200'
  }
]

export default function FeaturesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Comprehensive Platform Features
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience FabriiQ's integrated features through interactive demonstrations with real functionality and live mock data. See exactly how each component transforms educational operations.
          </p>
        </div>

        {/* Features Showcase */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`rounded-2xl border-2 ${feature.color} p-8`}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                      Key Capabilities:
                    </h3>
                    <ul className="space-y-3">
                      {feature.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
                          <span className="text-sm text-gray-700">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 bg-white/50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600 mb-1">Proven Results</div>
                    <div className="text-lg font-bold text-gray-900">{feature.metrics}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={feature.href}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Explore Feature
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      Try Interactive Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Showcase */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="sticky top-8">
                  {feature.showcase}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="mt-20 bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seamlessly Integrated Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All features work together as one unified platform, sharing data in real-time and providing a consistent experience across all user roles and campus locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Sync</h3>
              <p className="text-gray-600">Instant updates across all features and campus locations with offline support.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unified Data</h3>
              <p className="text-gray-600">Single source of truth for all educational data with comprehensive audit trails.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Configuration</h3>
              <p className="text-gray-600">Customize features to match your institution's unique requirements and workflows.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience All Features?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            See how FabriiQ's integrated features work together to transform your educational operations with measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Book Comprehensive Demo
            </Link>
            <Link
              href="/sandbox"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Try Interactive Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
