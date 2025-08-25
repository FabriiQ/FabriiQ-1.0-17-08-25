import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, ClipboardList, BarChart3, MessageCircle, BookOpen, Calendar, Award, Zap } from 'lucide-react'
import { TeacherPortalShowcase } from '@/components/marketing/showcase/TeacherPortalShowcase'

export const metadata: Metadata = {
  title: 'Teacher Portal & Classroom Management - FabriiQ',
  description: 'Comprehensive teacher dashboard with advanced classroom management, attendance tracking, assessment tools, gradebook, and AI-powered teaching assistant.',
}

const features = [
  {
    icon: BarChart3,
    title: 'Teacher Dashboard',
    description: 'Comprehensive overview of classes, students, and performance metrics with real-time insights'
  },
  {
    icon: Users,
    title: 'Class Management',
    description: 'Manage multiple classes, view student rosters, and track class-specific activities and progress'
  },
  {
    icon: ClipboardList,
    title: 'Attendance Tracking',
    description: 'Efficient attendance management with bulk operations and detailed attendance reports'
  },
  {
    icon: BookOpen,
    title: 'Assessment & Gradebook',
    description: 'Create assessments, manage grades, and provide detailed feedback to students'
  },
  {
    icon: Award,
    title: 'Student Progress',
    description: 'Track individual student performance, achievements, and learning progression'
  },
  {
    icon: Zap,
    title: 'AI Teaching Assistant',
    description: 'Get intelligent suggestions for lesson planning, grading assistance, and teaching strategies'
  },
  {
    icon: Calendar,
    title: 'Schedule Management',
    description: 'View and manage teaching schedules, class timings, and important academic dates'
  },
  {
    icon: MessageCircle,
    title: 'Communication Hub',
    description: 'Connect with students, parents, and colleagues through integrated messaging system'
  }
]

const benefits = [
  'Unified dashboard for all teaching activities and class management',
  'Streamlined attendance tracking with bulk operations and reporting',
  'Comprehensive gradebook with detailed assessment management',
  'Real-time student progress monitoring and performance analytics',
  'AI-powered teaching assistant for lesson planning and grading support',
  'Integrated communication tools for student and parent engagement',
  'Mobile-responsive design for classroom and remote access',
  'Seamless integration with student portal and campus systems'
]

export default function TeacherPortalPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Users className="h-4 w-4 mr-2" />
            <span>Empower Educators</span>
          </div>

          <h1 className="marketing-heading-xl mb-6">
            Teacher Portal & Classroom Management
          </h1>

          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Comprehensive teacher dashboard with advanced classroom management, attendance tracking,
            assessment tools, gradebook, and AI-powered teaching assistant designed to enhance
            teaching effectiveness and reduce administrative burden.
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
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>AI</div>
              <div className="marketing-body-sm">Teaching Assistant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>24/7</div>
              <div className="marketing-body-sm">Access</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="marketing-grid-2 items-center mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Experience the teacher dashboard
            </h2>
            <p className="marketing-body mb-8">
              Explore our comprehensive teacher portal that streamlines classroom management,
              provides real-time student insights, and includes an AI teaching assistant to
              enhance your teaching effectiveness.
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
            <TeacherPortalShowcase />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Complete teacher empowerment platform
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Everything educators need to manage their classrooms effectively, track student progress,
              and enhance teaching outcomes with intelligent tools and insights.
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
              Comprehensive teaching platform
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              Our teacher portal provides all the tools educators need to manage their classrooms
              effectively and focus on what matters most - teaching and student success.
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
            Ready to empower your teachers?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            See how FabriiQ's Teacher Portal can reduce administrative burden and 
            enhance teaching effectiveness at your institution.
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
