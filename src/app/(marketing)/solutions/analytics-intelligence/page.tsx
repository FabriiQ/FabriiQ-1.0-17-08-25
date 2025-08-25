import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, BarChart3, TrendingUp, Target, DollarSign } from 'lucide-react'
import { BloomsAnalyticsShowcase } from '@/components/marketing/showcase/BloomsAnalyticsShowcase'

export const metadata: Metadata = {
  title: 'Analytics & Intelligence - FabriiQ',
  description: 'Comprehensive analytics engine providing real-time insights into institutional performance across all campus locations.',
}

const features = [
  {
    icon: BarChart3,
    title: 'Multi-Campus Dashboards',
    description: 'Real-time performance dashboards with drill-down capabilities across locations'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'AI-powered insights for student success prediction and intervention strategies'
  },
  {
    icon: DollarSign,
    title: 'Financial Intelligence',
    description: 'Comprehensive financial reporting with collection and aging analysis'
  },
  {
    icon: Target,
    title: 'Curriculum Effectiveness',
    description: 'Data-driven curriculum optimization and learning outcome measurement'
  }
]

const benefits = [
  '340% ROI within 18 months of implementation',
  '89% improvement in data-driven decision making',
  '76% faster identification of at-risk students',
  '92% accuracy in performance predictions',
  'Real-time visibility across all campus operations',
  'Automated compliance and regulatory reporting'
]

export default function AnalyticsIntelligencePage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 mb-8">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Data-Driven Insights</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Analytics & Intelligence
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Comprehensive analytics engine providing real-time insights into institutional 
            performance across all campus locations with predictive capabilities and actionable intelligence.
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
              <div className="text-3xl font-bold text-indigo-600 mb-2">340%</div>
              <div className="marketing-body-sm">ROI in 18 months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
              <div className="marketing-body-sm">Better decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <div className="marketing-body-sm">Prediction accuracy</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="marketing-grid-2 items-center mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Experience real-time analytics
            </h2>
            <p className="marketing-body mb-8">
              See how our comprehensive analytics engine provides actionable insights 
              across all aspects of your institution with predictive capabilities and drill-down analysis.
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
            <BloomsAnalyticsShowcase />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Comprehensive analytics capabilities
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Everything you need to make data-driven decisions across your institution, 
              from real-time dashboards to predictive analytics and financial intelligence.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="marketing-card-feature">
                <feature.icon className="h-8 w-8 text-indigo-600 mb-4" />
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
              Proven ROI and performance gains
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Institutions using our analytics platform report significant improvements 
              in decision-making speed, accuracy, and overall operational efficiency.
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
            Ready to unlock your data's potential?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            See how FabriiQ's Analytics & Intelligence platform can transform 
            your decision-making with actionable insights and predictive capabilities.
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
