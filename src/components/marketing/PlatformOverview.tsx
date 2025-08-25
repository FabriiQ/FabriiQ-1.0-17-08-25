import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EnrollmentShowcase } from './showcase/EnrollmentShowcase'
import { BloomsAnalyticsShowcase } from './showcase/BloomsAnalyticsShowcase'
import { FeeManagementShowcase } from './showcase/FeeManagementShowcase'
import { TeacherPortalShowcase } from './showcase/TeacherPortalShowcase'
import { StudentPortalShowcase } from './showcase/StudentPortalShowcase'

export function PlatformOverview() {
  const platforms = [
    {
      title: 'Multi-Campus SIS',
      description: 'Comprehensive student information system with centralized control and campus-specific customization.',
      features: [
        'Unified institutional management',
        'Real-time data synchronization',
        'Streamlined enrollment processes',
        'Intelligent fee management'
      ],
      demoComponent: <EnrollmentShowcase />,
      href: '/solutions/multi-campus-sis'
    },
    {
      title: 'Learning Experience Platform',
      description: 'Advanced LXP with Bloom\'s taxonomy integration and AI-powered personalization.',
      features: [
        'Curriculum with learning outcomes',
        'Bloom\'s taxonomy analytics',
        'AIVY Multi-Agent System',
        'Interactive assessments'
      ],
      demoComponent: <BloomsAnalyticsShowcase />,
      href: '/solutions/learning-experience-platform'
    },
    {
      title: 'Teacher Portal',
      description: 'Comprehensive teaching dashboard with classroom management tools and analytics.',
      features: [
        'Real-time teaching intelligence',
        'AI-powered content development',
        'Attendance and behavior tracking',
        'Advanced reporting capabilities'
      ],
      demoComponent: <TeacherPortalShowcase />,
      href: '/solutions/teacher-portal'
    },
    {
      title: 'Student Portal',
      description: 'Mobile-first learning experience with offline capabilities and social features.',
      features: [
        'Class-centric learning journey',
        'Achievement and gamification',
        'Social learning features',
        'Offline-first capabilities'
      ],
      demoComponent: <StudentPortalShowcase />,
      href: '/solutions/student-portal'
    }
  ]

  return (
    <div className="marketing-section">
      <div className="marketing-container">
        <div className="text-center mb-16">
          <h2 className="marketing-heading-lg mb-4">
            Experience the Platform Components
          </h2>
          <p className="marketing-body-lg max-w-3xl mx-auto">
            Explore FabriiQ's integrated platform through interactive demonstrations with real functionality and live dummy data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {platforms.map((platform, index) => (
            <div key={index} className="marketing-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {platform.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {platform.description}
                </p>
                <ul className="space-y-2">
                  {platform.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Demo Component */}
              <div className="mb-6">
                {platform.demoComponent}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href={platform.href}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Explore Solution
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Try Interactive Demo →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to See the Full Platform?
          </h3>
          <p className="text-gray-600 mb-8">
            Experience all components working together in our comprehensive demonstration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="marketing-btn-primary"
            >
              Book Live Demo
            </Link>
            <Link
              href="/sandbox"
              className="marketing-btn-secondary"
            >
              Try Interactive Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
