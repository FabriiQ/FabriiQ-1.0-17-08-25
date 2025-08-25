import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Monitor, Award, Users, Globe, BookOpen, BarChart3, Zap, Target } from 'lucide-react'
import { StudentPortalShowcase } from '@/components/marketing/showcase/StudentPortalShowcase'

export const metadata: Metadata = {
  title: 'Student Portal & Learning Experience - FabriiQ',
  description: 'Comprehensive student learning platform with dashboard, courses, assignments, grades, rewards system, gamification, and achievement tracking.',
}

const features = [
  {
    icon: Monitor,
    title: 'Student Dashboard',
    description: 'Comprehensive overview of courses, assignments, grades, and progress with personalized insights'
  },
  {
    icon: BookOpen,
    title: 'Course Management',
    description: 'Access course materials, track progress, and manage learning activities across all enrolled classes'
  },
  {
    icon: BarChart3,
    title: 'Grades & Analytics',
    description: 'Real-time grade tracking, performance analytics, and detailed progress reports'
  },
  {
    icon: Award,
    title: 'Rewards & Achievements',
    description: 'Comprehensive gamification system with points, levels, badges, and achievement tracking'
  },
  {
    icon: Target,
    title: 'Assignment Tracking',
    description: 'Manage assignments, submissions, and deadlines with intelligent reminders and progress tracking'
  },
  {
    icon: Zap,
    title: 'Interactive Learning',
    description: 'Engaging activities, quizzes, and interactive content designed to enhance learning outcomes'
  },
  {
    icon: Users,
    title: 'Class Community',
    description: 'Connect with classmates, participate in discussions, and collaborate on group projects'
  },
  {
    icon: Globe,
    title: 'Mobile Access',
    description: 'Full-featured mobile experience with offline capabilities and seamless synchronization'
  }
]

const benefits = [
  'Unified dashboard for all courses, assignments, and academic progress',
  'Comprehensive rewards system with points, levels, and achievement badges',
  'Real-time grade tracking and detailed performance analytics',
  'Interactive assignment management with deadline reminders',
  'Gamified learning experience to boost engagement and motivation',
  'Mobile-responsive design for learning anywhere, anytime',
  'Class-specific dashboards with tailored content and activities',
  'Seamless integration with teacher portal and campus systems'
]

export default function StudentPortalPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Monitor className="h-4 w-4 mr-2" />
            <span>Student Success Platform</span>
          </div>

          <h1 className="marketing-heading-xl mb-6">
            Student Portal & Learning Experience
          </h1>

          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Comprehensive student learning platform with personalized dashboard, course management,
            assignment tracking, grades analytics, and gamified rewards system designed to enhance
            student engagement and academic success.
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
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>8+</div>
              <div className="marketing-body-sm">Core Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>Gamified</div>
              <div className="marketing-body-sm">Learning Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>24/7</div>
              <div className="marketing-body-sm">Mobile Access</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="marketing-grid-2 items-center mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Experience the student learning platform
            </h2>
            <p className="marketing-body mb-8">
              Explore our comprehensive student portal that combines academic management with
              gamified learning experiences, real-time progress tracking, and engaging rewards
              system to motivate and support student success.
            </p>
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#1F504B' }} />
                  <span className="marketing-body">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <StudentPortalShowcase />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Complete student learning ecosystem
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Everything students need for academic success, from comprehensive course management
              to gamified learning experiences and real-time progress tracking.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="marketing-card">
                <feature.icon className="h-8 w-8 mb-4" style={{ color: '#1F504B' }} />
                <h3 className="marketing-heading-md mb-3" style={{ color: '#1F504B' }}>{feature.title}</h3>
                <p className="marketing-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Comprehensive student success platform
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              Our student portal provides all the tools and features students need to excel
              academically while staying engaged and motivated through gamified learning experiences.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#1F504B' }} />
                <span className="marketing-body" style={{ color: '#1F504B' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to enhance student and parent experience?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            See how FabriiQ's Student & Parent Portal can improve engagement 
            and communication at your institution.
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
