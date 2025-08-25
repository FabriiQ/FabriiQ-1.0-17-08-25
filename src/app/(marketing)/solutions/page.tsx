import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions - Comprehensive Educational Platform Components',
  description: 'Explore FabriiQ\'s integrated solutions: Multi-Campus SIS, Learning Experience Platform, Teacher Portal, Student Portal, and Analytics Intelligence.',
}

const solutions = [
  {
    title: 'Multi-Campus SIS',
    description: 'Comprehensive student information system designed specifically for multi-campus educational institutions with centralized control and campus-specific customization.',
    features: [
      'Unified institutional management across all locations',
      'Real-time data synchronization with offline support',
      'Streamlined enrollment and student lifecycle management',
      'Intelligent fee management with automated processing'
    ],
    href: '/solutions/multi-campus-sis',
    metrics: '67% faster enrollment processing',
    color: 'border-2' // Will use custom styling
  },
  {
    title: 'Learning Experience Platform',
    description: 'Advanced LXP with comprehensive Bloom\'s taxonomy integration, AI-powered personalization, and evidence-based engagement strategies.',
    features: [
      'Curriculum management with learning outcomes framework',
      'Revolutionary Bloom\'s taxonomy analytics',
      'AIVY Multi-Agent System for personalized support',
      'Interactive assessments and rubric-based grading'
    ],
    href: '/solutions/learning-experience-platform',
    metrics: '45% increase in student engagement',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Teacher Portal & Classroom Tools',
    description: 'Comprehensive teaching dashboard with classroom management tools that reduce administrative burden while enhancing instructional effectiveness.',
    features: [
      'Real-time teaching intelligence and class analytics',
      'AI-powered content development and grading',
      'Comprehensive attendance and behavior management',
      'Advanced reporting and parent communication'
    ],
    href: '/solutions/teacher-portal',
    metrics: '75% reduction in administrative time',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'Student & Parent Portal',
    description: 'Mobile-first learning experience with offline capabilities, social learning features, and comprehensive parent engagement tools.',
    features: [
      'Intuitive class-centric learning journey',
      'Achievement system with psychology-based motivation',
      'Social learning and collaboration features',
      'Real-time progress tracking and analytics'
    ],
    href: '/solutions/student-portal',
    metrics: '92% parent satisfaction rate',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    title: 'Rewards & Gamification',
    description: 'Comprehensive gamification platform with points, levels, achievements, badges, and leaderboards designed to boost student engagement and motivation.',
    features: [
      'Points and levels system with progress tracking',
      'Achievement badges and milestone celebrations',
      'Class leaderboards and friendly competition',
      'Interactive challenges and learning quests'
    ],
    href: '/solutions/rewards-gamification',
    metrics: 'Increased engagement and motivation',
    color: 'border-2'
  },
  {
    title: 'Analytics & Intelligence',
    description: 'Comprehensive analytics engine providing real-time insights into institutional performance across all campus locations.',
    features: [
      'Multi-campus performance dashboards',
      'Predictive analytics for student success',
      'Financial intelligence and reporting',
      'Curriculum effectiveness measurement'
    ],
    href: '/solutions/analytics-intelligence',
    metrics: '340% ROI within 18 months',
    color: 'bg-indigo-50 border-indigo-200'
  }
]

export default function SolutionsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Comprehensive Educational Solutions
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FabriiQ's integrated platform components work together to transform your multi-campus educational operations with measurable results and proven outcomes.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className={`relative rounded-2xl border-2 ${solution.color} p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {solution.title}
                    </h3>
                    <p className="mt-4 text-gray-700">
                      {solution.description}
                    </p>
                    
                    <div className="mt-6">
                      <div className="text-sm font-semibold mb-3" style={{ color: '#1F504B' }}>
                        Key Capabilities:
                      </div>
                      <ul className="space-y-2">
                        {solution.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 mr-3" style={{ backgroundColor: '#1F504B' }} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-white/50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Proven Results</div>
                      <div className="text-lg font-bold text-gray-900">{solution.metrics}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={solution.href}
                    className="inline-flex items-center gap-2 font-semibold transition-colors"
                    style={{ color: '#1F504B' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5A8A84'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#1F504B'}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Ready to Transform Your Institution?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience how FabriiQ's integrated solutions can deliver measurable improvements in your educational operations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="marketing-btn-primary"
            >
              Book Live Demo
            </Link>
            <Link
              href="/sandbox"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Try Interactive Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
