import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Users, Settings, BarChart3, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Implementation Guide - FabriiQ Educational Platform',
  description: 'Comprehensive guide to implementing FabriiQ at your educational institution. Learn about our proven methodology, timeline, and success factors.',
}

const phases = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Planning',
    duration: '2-4 weeks',
    icon: FileText,
    color: '#1F504B',
    activities: [
      'Institutional needs assessment',
      'Current system audit and data mapping',
      'Stakeholder interviews and requirements gathering',
      'Technical infrastructure evaluation',
      'Project timeline and milestone definition',
      'Success metrics and KPI establishment'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'System Configuration',
    duration: '3-6 weeks',
    icon: Settings,
    color: '#5A8A84',
    activities: [
      'Multi-campus architecture setup',
      'User roles and permissions configuration',
      'Academic calendar and program structure',
      'Fee structures and payment gateway integration',
      'Custom branding and institutional identity',
      'Integration with existing systems'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Data Migration & Testing',
    duration: '2-4 weeks',
    icon: BarChart3,
    color: '#004EB2',
    activities: [
      'Historical data migration and validation',
      'User account creation and provisioning',
      'System integration testing',
      'Performance and security testing',
      'User acceptance testing with key stakeholders',
      'Backup and disaster recovery setup'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Training & Go-Live',
    duration: '2-3 weeks',
    icon: Users,
    color: '#6126AE',
    activities: [
      'Administrator and staff training programs',
      'Teacher portal training and certification',
      'Student and parent orientation sessions',
      'Phased rollout across campus locations',
      'Go-live support and monitoring',
      'Post-launch optimization and fine-tuning'
    ]
  }
]

const successFactors = [
  {
    title: 'Executive Sponsorship',
    description: 'Strong leadership commitment and clear communication of transformation goals across all levels of the institution.',
    icon: Users
  },
  {
    title: 'Change Management',
    description: 'Comprehensive change management strategy with stakeholder engagement and resistance mitigation plans.',
    icon: Settings
  },
  {
    title: 'Data Quality',
    description: 'Clean, accurate data migration with proper validation and testing to ensure system integrity from day one.',
    icon: BarChart3
  },
  {
    title: 'User Training',
    description: 'Thorough training programs for all user types with ongoing support and knowledge transfer.',
    icon: FileText
  }
]

export default function ImplementationGuidePage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Clock className="h-4 w-4 mr-2" />
            <span>Implementation Guide</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Your roadmap to successful FabriiQ implementation
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Our proven implementation methodology ensures smooth deployment across your institution 
            with minimal disruption and maximum adoption. Follow our structured approach for guaranteed success.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/resources/case-studies" className="marketing-btn-secondary">
              View success stories
            </Link>
          </div>

          {/* Key Stats */}
          <div className="marketing-grid-3 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>8-16</div>
              <div className="marketing-body-sm">Weeks typical timeline</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>98%</div>
              <div className="marketing-body-sm">Success rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#004EB2' }}>24/7</div>
              <div className="marketing-body-sm">Go-live support</div>
            </div>
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Four-phase implementation methodology
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Our structured approach ensures successful deployment with clear milestones, 
              deliverables, and success criteria at each phase.
            </p>
          </div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className="marketing-grid-2 items-center gap-12">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: phase.color }}>
                      <phase.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: phase.color }}>{phase.phase}</div>
                      <h3 className="marketing-heading-md">{phase.title}</h3>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="marketing-body-sm text-gray-600">{phase.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {phase.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mr-3 mt-0.5" style={{ color: '#5A8A84' }} />
                        <span className="marketing-body">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="marketing-card text-center">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${phase.color}15` }}>
                      <phase.icon className="h-12 w-12" style={{ color: phase.color }} />
                    </div>
                    <h4 className="marketing-heading-md mb-4">{phase.title}</h4>
                    <p className="marketing-body text-gray-600 mb-6">
                      Duration: <span className="font-medium">{phase.duration}</span>
                    </p>
                    <div className="text-sm font-medium px-4 py-2 rounded-full" style={{ backgroundColor: `${phase.color}15`, color: phase.color }}>
                      {phase.phase}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Factors */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Critical success factors
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              Based on hundreds of successful implementations, these factors are essential 
              for achieving optimal results and user adoption.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {successFactors.map((factor, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: '#1F504B' }}>
                  <factor.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="marketing-heading-md mb-2" style={{ color: '#1F504B' }}>{factor.title}</h3>
                  <p className="marketing-body" style={{ color: '#1F504B' }}>{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Resources */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Comprehensive support throughout implementation
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Our dedicated implementation team provides expert guidance, training, 
              and support to ensure your success at every step.
            </p>
          </div>

          <div className="marketing-grid-3 gap-8">
            <div className="marketing-card text-center">
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: '#1F504B' }} />
              <h3 className="marketing-heading-md mb-4">Dedicated Team</h3>
              <p className="marketing-body">Assigned project manager and technical specialists for your implementation.</p>
            </div>
            <div className="marketing-card text-center">
              <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: '#5A8A84' }} />
              <h3 className="marketing-heading-md mb-4">Training Materials</h3>
              <p className="marketing-body">Comprehensive documentation, video tutorials, and hands-on training sessions.</p>
            </div>
            <div className="marketing-card text-center">
              <Settings className="h-12 w-12 mx-auto mb-4" style={{ color: '#004EB2' }} />
              <h3 className="marketing-heading-md mb-4">Ongoing Support</h3>
              <p className="marketing-body">24/7 technical support and regular check-ins during the first 90 days.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to start your implementation journey?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our implementation experts to discuss your specific 
            requirements and create a customized deployment plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/resources" className="marketing-btn-ghost">
              ← Back to resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
