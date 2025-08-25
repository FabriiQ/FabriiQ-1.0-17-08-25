import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, GraduationCap, Brain, Target, BarChart3 } from 'lucide-react'
import { BloomsAnalyticsShowcase } from '@/components/marketing/showcase/BloomsAnalyticsShowcase'

export const metadata: Metadata = {
  title: 'Learning Experience Platform - FabriiQ',
  description: 'Advanced LXP with comprehensive Bloom\'s taxonomy integration, AI-powered personalization, and evidence-based engagement strategies.',
}

const features = [
  {
    icon: GraduationCap,
    title: 'Curriculum Management',
    description: 'Comprehensive learning outcomes framework with ABCD and SMART objectives'
  },
  {
    icon: Brain,
    title: 'Bloom\'s Analytics',
    description: 'Revolutionary cognitive level tracking and distribution analysis'
  },
  {
    icon: Target,
    title: 'AI Personalization',
    description: 'AIVY Multi-Agent System for personalized learning support'
  },
  {
    icon: BarChart3,
    title: 'Assessment Intelligence',
    description: 'Interactive assessments with rubric-based grading and feedback'
  }
]

const benefits = [
  '45% increase in student engagement and participation',
  '78% improvement in learning outcome achievement',
  '92% accuracy in cognitive level assessment',
  '67% reduction in curriculum development time',
  'Real-time Bloom\'s taxonomy distribution tracking',
  'Evidence-based pedagogical recommendations'
]

export default function LearningExperiencePlatformPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-green-50 text-green-700 ring-1 ring-green-200 mb-8">
            <Brain className="h-4 w-4 mr-2" />
            <span>AI-Powered Learning</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Learning Experience Platform
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Advanced LXP with comprehensive Bloom's taxonomy integration, AI-powered personalization, 
            and evidence-based engagement strategies that transform how students learn and teachers teach.
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
              <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
              <div className="marketing-body-sm">Higher engagement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
              <div className="marketing-body-sm">Better outcomes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
              <div className="marketing-body-sm">Assessment accuracy</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="marketing-grid-2 items-center mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Revolutionary Bloom's taxonomy analytics
            </h2>
            <p className="marketing-body mb-8">
              Experience real-time cognitive level tracking and distribution analysis that helps 
              educators optimize their curriculum and assessment strategies for better learning outcomes.
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
              Comprehensive learning experience capabilities
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Everything you need to create engaging, personalized learning experiences 
              with evidence-based pedagogical insights and AI-powered support.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="marketing-card-feature">
                <feature.icon className="h-8 w-8 text-green-600 mb-4" />
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
              Proven impact on learning outcomes
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Educational institutions using our LXP report significant improvements 
              in student engagement, learning outcomes, and teaching effectiveness.
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
            Ready to revolutionize your learning experience?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            See how FabriiQ's Learning Experience Platform can transform teaching 
            and learning at your institution with AI-powered insights.
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
