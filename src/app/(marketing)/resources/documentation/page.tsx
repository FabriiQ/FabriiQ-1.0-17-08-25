import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, BookOpen, Monitor, GraduationCap, Settings, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation - Comprehensive FabriiQ Platform Guide',
  description: 'Complete documentation for FabriiQ\'s multi-campus educational platform including implementation guides, API references, and best practices.',
}

const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Essential guides to begin your FabriiQ implementation journey',
    icon: BookOpen,
    color: 'border-2',
    documents: [
      { title: 'Platform Overview', href: '/resources/documentation/platform-overview', status: 'Available' },
      { title: 'Quick Start Guide', href: '/resources/documentation/quick-start', status: 'Available' },
      { title: 'System Requirements', href: '/resources/documentation/system-requirements', status: 'Available' },
      { title: 'Installation Guide', href: '/resources/documentation/installation', status: 'Planned' },
      { title: 'Initial Configuration', href: '/resources/documentation/initial-config', status: 'Planned' }
    ]
  },
  {
    title: 'Multi-Campus SIS',
    description: 'Comprehensive guides for student information system features',
    icon: GraduationCap,
    color: 'bg-green-50 border-green-200',
    documents: [
      { title: 'Campus Management', href: '/resources/documentation/campus-management', status: 'Available' },
      { title: 'Student Enrollment', href: '/resources/documentation/student-enrollment', status: 'Available' },
      { title: 'Fee Management System', href: '/resources/documentation/fee-management', status: 'Available' },
      { title: 'Academic Records', href: '/resources/documentation/academic-records', status: 'In Progress' },
      { title: 'Reporting & Analytics', href: '/resources/documentation/sis-reporting', status: 'Planned' }
    ]
  },
  {
    title: 'Learning Experience Platform',
    description: 'Documentation for curriculum, assessments, and learning analytics',
    icon: BarChart3,
    color: 'bg-purple-50 border-purple-200',
    documents: [
      { title: 'Curriculum Management', href: '/resources/documentation/curriculum-management', status: 'Available' },
      { title: 'Bloom\'s Taxonomy Integration', href: '/resources/documentation/blooms-taxonomy', status: 'Available' },
      { title: 'Assessment Creation', href: '/resources/documentation/assessment-creation', status: 'Available' },
      { title: 'AIVY Multi-Agent System', href: '/resources/documentation/aivy-system', status: 'In Progress' },
      { title: 'Learning Analytics', href: '/resources/documentation/learning-analytics', status: 'Planned' }
    ]
  },
  {
    title: 'Teacher Portal',
    description: 'Guides for classroom management and teaching tools',
    icon: FileText,
    color: 'bg-orange-50 border-orange-200',
    documents: [
      { title: 'Classroom Dashboard', href: '/resources/documentation/classroom-dashboard', status: 'Available' },
      { title: 'Attendance Management', href: '/resources/documentation/attendance-management', status: 'Available' },
      { title: 'Grading & Feedback', href: '/resources/documentation/grading-feedback', status: 'Available' },
      { title: 'Parent Communication', href: '/resources/documentation/parent-communication', status: 'In Progress' },
      { title: 'Class Reports', href: '/resources/documentation/class-reports', status: 'Planned' }
    ]
  },
  {
    title: 'Student & Parent Portal',
    description: 'Documentation for student experience and parent engagement',
    icon: GraduationCap,
    color: 'bg-indigo-50 border-indigo-200',
    documents: [
      { title: 'Student Dashboard', href: '/resources/documentation/student-dashboard', status: 'Available' },
      { title: 'Mobile Learning Experience', href: '/resources/documentation/mobile-learning', status: 'Available' },
      { title: 'Offline Capabilities', href: '/resources/documentation/offline-capabilities', status: 'Available' },
      { title: 'Achievement System', href: '/resources/documentation/achievement-system', status: 'Available' },
      { title: 'Social Learning Features', href: '/resources/documentation/social-learning', status: 'Planned' }
    ]
  },
  {
    title: 'Technical Integration',
    description: 'API documentation and technical implementation guides',
    icon: Monitor,
    color: 'bg-gray-50 border-gray-200',
    documents: [
      { title: 'API Reference', href: '/resources/documentation/api-reference', status: 'In Progress' },
      { title: 'Authentication & Security', href: '/resources/documentation/authentication', status: 'Available' },
      { title: 'Data Migration Guide', href: '/resources/documentation/data-migration', status: 'Planned' },
      { title: 'Third-party Integrations', href: '/resources/documentation/integrations', status: 'Planned' },
      { title: 'Troubleshooting', href: '/resources/documentation/troubleshooting', status: 'Planned' }
    ]
  },
  {
    title: 'Administration',
    description: 'System administration and configuration guides',
    icon: Settings,
    color: 'bg-red-50 border-red-200',
    documents: [
      { title: 'User Management', href: '/resources/documentation/user-management', status: 'Available' },
      { title: 'Role-Based Permissions', href: '/resources/documentation/permissions', status: 'Available' },
      { title: 'System Configuration', href: '/resources/documentation/system-config', status: 'In Progress' },
      { title: 'Backup & Recovery', href: '/resources/documentation/backup-recovery', status: 'Planned' },
      { title: 'Performance Optimization', href: '/resources/documentation/performance', status: 'Planned' }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'Planned':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function DocumentationPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Comprehensive guides, API references, and best practices for implementing and using FabriiQ's multi-campus educational platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-16 p-6 rounded-xl border-2" style={{ backgroundColor: '#D8E3E0', borderColor: '#5A8A84' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#1F504B' }}>Quick Start</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/resources/documentation/platform-overview"
              className="flex items-center p-3 bg-white rounded-lg border-2 transition-colors"
              style={{ borderColor: '#5A8A84' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F504B'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#5A8A84'}
            >
              <BookOpen className="h-5 w-5 mr-3" style={{ color: '#1F504B' }} />
              <span className="text-sm font-medium" style={{ color: '#1F504B' }}>Platform Overview</span>
            </Link>
            <Link
              href="/resources/documentation/quick-start"
              className="flex items-center p-3 bg-white rounded-lg border-2 transition-colors"
              style={{ borderColor: '#5A8A84' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F504B'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#5A8A84'}
            >
              <FileText className="h-5 w-5 mr-3" style={{ color: '#1F504B' }} />
              <span className="text-sm font-medium" style={{ color: '#1F504B' }}>Quick Start Guide</span>
            </Link>
            <Link
              href="/resources/documentation/api-reference"
              className="flex items-center p-3 bg-white rounded-lg border-2 transition-colors"
              style={{ borderColor: '#5A8A84' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F504B'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#5A8A84'}
            >
              <Monitor className="h-5 w-5 mr-3" style={{ color: '#1F504B' }} />
              <span className="text-sm font-medium" style={{ color: '#1F504B' }}>API Reference</span>
            </Link>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {documentationSections.map((section, index) => (
            <div
              key={index}
              className={`rounded-2xl border-2 ${section.color} p-6`}
            >
              <div className="flex items-start mb-4">
                <section.icon className="h-8 w-8 text-gray-700 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {section.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <Link
                      href={doc.href}
                      className="text-sm font-medium text-gray-900 transition-colors flex-1"
                      style={{ color: '#1F504B' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#5A8A84'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#1F504B'}
                    >
                      {doc.title}
                    </Link>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Additional Support?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our technical team is available to help with implementation, customization, and any questions about FabriiQ's platform capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/company/contact"
              className="marketing-btn-primary"
            >
              Contact Technical Support
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Schedule Implementation Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
