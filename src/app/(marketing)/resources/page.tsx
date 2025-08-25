import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Users, BookOpen, Play, Download, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources - FabriiQ Educational Platform',
  description: 'Comprehensive resources to help you succeed with FabriiQ. Access case studies, implementation guides, documentation, and training materials.',
}

const resourceCategories = [
  {
    title: 'Case Studies',
    description: 'Real-world success stories from educational institutions using FabriiQ',
    icon: FileText,
    color: '#1F504B',
    href: '/resources/case-studies',
    items: [
      'Al-Noor Educational Network: 340% ROI in 18 months',
      'International School System: 67% faster enrollment',
      'Technical College Network: 89% fee collection improvement'
    ]
  },
  {
    title: 'Implementation Guide',
    description: 'Step-by-step methodology for successful FabriiQ deployment',
    icon: BookOpen,
    color: '#5A8A84',
    href: '/resources/implementation-guide',
    items: [
      'Four-phase implementation methodology',
      'Critical success factors and best practices',
      'Timeline and milestone planning'
    ]
  },
  {
    title: 'Documentation',
    description: 'Comprehensive technical and user documentation',
    icon: FileText,
    color: '#004EB2',
    href: '/resources/documentation',
    items: [
      'Administrator guides and API documentation',
      'Teacher portal user manuals',
      'Student and parent guides'
    ]
  },
  {
    title: 'Webinars & Demos',
    description: 'Interactive sessions and recorded demonstrations',
    icon: Play,
    color: '#6126AE',
    href: '/resources/webinars',
    items: [
      'Live product demonstrations',
      'Educational best practices webinars',
      'Technical deep-dive sessions'
    ]
  }
]

const featuredResources = [
  {
    title: 'Multi-Campus Implementation Playbook',
    description: 'Complete guide to deploying FabriiQ across multiple campus locations with real-world examples and templates.',
    type: 'Implementation Guide',
    downloadUrl: '#',
    readTime: '45 min read'
  },
  {
    title: 'ROI Calculator for Educational Technology',
    description: 'Interactive tool to calculate potential return on investment for your FabriiQ implementation.',
    type: 'Calculator Tool',
    downloadUrl: '#',
    readTime: 'Interactive tool'
  },
  {
    title: 'Bloom\'s Taxonomy Integration Whitepaper',
    description: 'Deep dive into how FabriiQ\'s revolutionary Bloom\'s analytics transform curriculum effectiveness measurement.',
    type: 'Research Paper',
    downloadUrl: '#',
    readTime: '25 min read'
  }
]

export default function ResourcesPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Knowledge Center</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Resources to accelerate your success
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Access comprehensive resources designed to help you maximize the value of FabriiQ 
            at your educational institution. From implementation guides to success stories, 
            we provide everything you need to succeed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/company/contact" className="marketing-btn-secondary">
              Contact support
            </Link>
          </div>
        </div>

        {/* Resource Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Explore our resource library
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Comprehensive resources organized by category to help you at every stage 
              of your FabriiQ journey, from evaluation to optimization.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {resourceCategories.map((category, index) => (
              <Link key={index} href={category.href} className="marketing-card group hover:no-underline">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: `${category.color}15` }}>
                    <category.icon className="h-6 w-6" style={{ color: category.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="marketing-heading-md mb-2 group-hover:text-opacity-80" style={{ color: category.color }}>
                      {category.title}
                    </h3>
                    <p className="marketing-body text-gray-600 mb-4">{category.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>

                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: category.color }}></div>
                      {item}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Featured resources
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              Hand-picked resources that provide the most value for educational institutions 
              evaluating or implementing FabriiQ.
            </p>
          </div>

          <div className="space-y-6">
            {featuredResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3" style={{ backgroundColor: '#1F504B', color: 'white' }}>
                      {resource.type}
                    </span>
                    <span className="text-sm text-gray-500">{resource.readTime}</span>
                  </div>
                  <h3 className="marketing-heading-md mb-2" style={{ color: '#1F504B' }}>{resource.title}</h3>
                  <p className="marketing-body text-gray-600">{resource.description}</p>
                </div>
                <div className="ml-6">
                  <Link 
                    href={resource.downloadUrl} 
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: '#1F504B', color: 'white' }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Quick access
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Jump directly to the most commonly requested resources and tools.
            </p>
          </div>

          <div className="marketing-grid-3 gap-6">
            <Link href="/demo" className="marketing-card text-center group hover:no-underline">
              <Play className="h-12 w-12 mx-auto mb-4" style={{ color: '#1F504B' }} />
              <h3 className="marketing-heading-md mb-2">Live Demo</h3>
              <p className="marketing-body text-gray-600 mb-4">Schedule a personalized demonstration</p>
              <div className="inline-flex items-center text-sm font-medium" style={{ color: '#5A8A84' }}>
                Book now <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>

            <Link href="/resources/case-studies" className="marketing-card text-center group hover:no-underline">
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: '#1F504B' }} />
              <h3 className="marketing-heading-md mb-2">Success Stories</h3>
              <p className="marketing-body text-gray-600 mb-4">Real results from our customers</p>
              <div className="inline-flex items-center text-sm font-medium" style={{ color: '#5A8A84' }}>
                Read stories <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>

            <Link href="/company/contact" className="marketing-card text-center group hover:no-underline">
              <Globe className="h-12 w-12 mx-auto mb-4" style={{ color: '#1F504B' }} />
              <h3 className="marketing-heading-md mb-2">Expert Support</h3>
              <p className="marketing-body text-gray-600 mb-4">Get help from our specialists</p>
              <div className="inline-flex items-center text-sm font-medium" style={{ color: '#5A8A84' }}>
                Contact us <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Need personalized guidance?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Our education technology experts are here to help you navigate your digital 
            transformation journey with personalized recommendations and support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/company/contact" className="marketing-btn-ghost">
              Contact our team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
