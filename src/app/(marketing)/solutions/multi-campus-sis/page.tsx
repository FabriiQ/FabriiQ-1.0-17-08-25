import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, School, Globe, BarChart3 } from 'lucide-react'
import { EnrollmentShowcase } from '@/components/marketing/showcase/EnrollmentShowcase'

export const metadata: Metadata = {
  title: 'Multi-Campus Student Information System - FabriiQ',
  description: 'Comprehensive SIS designed for multi-campus educational institutions with centralized control, real-time synchronization, and campus-specific customization.',
}

const features = [
  {
    icon: School,
    title: 'Unified Campus Management',
    description: 'Centralized control with campus-specific customization and branding'
  },
  {
    icon: Globe,
    title: 'Real-Time Synchronization',
    description: 'Instant data sync across all locations with offline support'
  },
  {
    icon: Users,
    title: 'Streamlined Enrollment',
    description: 'Automated enrollment workflows with intelligent routing'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Cross-campus performance insights and predictive analytics'
  }
]

const benefits = [
  '67% faster enrollment processing across all campuses',
  '89% improvement in fee collection efficiency',
  '95% reduction in data inconsistencies',
  '78% decrease in administrative overhead',
  'Real-time visibility across all campus operations',
  'Automated compliance reporting and audit trails'
]

export default function MultiCampusSISPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200 mb-8">
            <School className="h-4 w-4 mr-2" />
            <span>Multi-Campus Solution</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Multi-Campus Student Information System
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Comprehensive SIS designed specifically for multi-campus educational institutions. 
            Centralized control with campus-specific customization, real-time synchronization, 
            and intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              Book live demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/features" className="marketing-btn-secondary">
              View all features
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="marketing-grid-3 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
              <div className="marketing-body-sm">Faster enrollment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <div className="marketing-body-sm">Better fee collection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="marketing-body-sm">Reduced inconsistencies</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="marketing-grid-2 items-center mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Experience the enrollment workflow
            </h2>
            <p className="marketing-body mb-8">
              See how our multi-campus SIS streamlines student enrollment with intelligent 
              routing, automated workflows, and real-time status tracking across all locations.
            </p>
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="marketing-body">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <EnrollmentShowcase />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Comprehensive multi-campus capabilities
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Everything you need to manage student information across multiple campus locations 
              with centralized oversight and local flexibility.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="marketing-card-feature">
                <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="marketing-heading-md mb-3">{feature.title}</h3>
                <p className="marketing-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Proven results across institutions
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Educational institutions using our multi-campus SIS report significant 
              improvements in efficiency, accuracy, and student satisfaction.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="marketing-body">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to transform your multi-campus operations?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            See how FabriiQ's Multi-Campus SIS can streamline your operations and 
            improve outcomes across all your locations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/solutions" className="marketing-btn-ghost">
              ← Back to solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
