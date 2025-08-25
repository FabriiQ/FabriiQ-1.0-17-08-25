import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, Users, School, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing - FabriiQ Educational Platform',
  description: 'Flexible pricing plans for educational institutions of all sizes. Start your transformation with FabriiQ\'s comprehensive SIS and LXP platform.',
}

const plans = [
  {
    name: 'Starter Campus',
    description: 'Perfect for single campus institutions getting started',
    price: 'Custom',
    period: 'per month',
    icon: School,
    color: 'bg-green-50 border-green-200',
    features: [
      'Up to 500 students',
      'Single campus management',
      'Student enrollment system',
      'Basic curriculum management',
      'Teacher portal access',
      'Student portal access',
      'Basic analytics & reporting',
      'Email support'
    ],
    cta: 'Start Pilot Project',
    popular: false
  },
  {
    name: 'Multi-Campus Pro',
    description: 'Comprehensive solution for growing institutions',
    price: 'Custom',
    period: 'per month',
    icon: Users,
    color: 'border-2',
    features: [
      'Up to 5,000 students',
      'Multi-campus architecture',
      'Full enrollment & fee management',
      'Curriculum with Bloom\'s taxonomy',
      'Assessment & activity system',
      'Social wall & rewards system',
      'AIVY AI assistant integration',
      'Advanced analytics dashboard',
      'Priority support & training'
    ],
    cta: 'Book Consultation',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'Full-scale solution for large educational networks',
    price: 'Custom',
    period: 'per month',
    icon: BarChart3,
    color: 'bg-purple-50 border-purple-200',
    features: [
      'Unlimited students',
      'Unlimited campuses',
      'Complete platform suite',
      'Advanced AI features',
      'Custom integrations',
      'Dedicated support team',
      'White-label options',
      '24/7 premium support',
      'Implementation consulting',
      'Success management'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const faqs = [
  {
    question: 'How is pricing determined?',
    answer: 'Our pricing is based on the number of active students, campuses, and specific features required. We provide custom quotes tailored to your institution\'s needs and budget.'
  },
  {
    question: 'Are there free trials available?',
    answer: 'We don\'t offer traditional free trials, but we provide comprehensive 1-month pilot projects for institutions to experience the full platform capabilities with their actual data and workflows.'
  },
  {
    question: 'What is included in the pilot project?',
    answer: 'Our 1-month pilot includes full platform access, data migration assistance, staff training, dedicated support, and comprehensive evaluation metrics to assess the platform\'s impact on your institution.'
  },
  {
    question: 'What support is included?',
    answer: 'All plans include comprehensive support. Starter includes email support, Pro includes priority phone and email support, and Enterprise includes dedicated support teams with 24/7 availability.'
  },
  {
    question: 'Can we migrate from our existing system?',
    answer: 'Absolutely! We provide comprehensive data migration services and work closely with your team to ensure a smooth transition with minimal disruption to your operations.'
  },
  {
    question: 'Are there setup or implementation fees?',
    answer: 'Implementation services are included in Pro and Enterprise plans. For Starter plans, basic setup is included, with optional professional services available.'
  }
]

export default function PricingPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Award className="h-4 w-4 mr-2" />
            <span>Transparent Pricing</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Choose the perfect plan for your institution
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Flexible pricing designed to grow with your educational institution. 
            From single campus to multi-campus networks, we have a solution that fits your needs and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              Book consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/resources/case-studies" className="marketing-btn-secondary">
              View case studies
            </Link>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="marketing-grid-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div key={index} className={`marketing-card relative ${plan.color} ${plan.popular ? 'ring-2 ring-offset-2' : ''}`} style={plan.popular ? { '--tw-ring-color': '#1F504B' } as React.CSSProperties : {}}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#1F504B' }}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <plan.icon className="h-12 w-12 mx-auto mb-4" style={{ color: '#1F504B' }} />
                <h3 className="marketing-heading-md mb-2">{plan.name}</h3>
                <p className="marketing-body text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: '#1F504B' }}>{plan.price}</span>
                  <span className="marketing-body-sm text-gray-500 ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mr-3 mt-0.5" style={{ color: '#5A8A84' }} />
                    <span className="marketing-body">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link 
                  href="/demo" 
                  className={plan.popular ? "marketing-btn-primary w-full" : "marketing-btn-secondary w-full"}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Why choose FabriiQ?
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              More than just software - a complete transformation partner for your educational institution.
            </p>
          </div>

          <div className="marketing-grid-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1F504B' }}>
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-2" style={{ color: '#1F504B' }}>Proven Results</h3>
              <p className="marketing-body" style={{ color: '#1F504B' }}>340% ROI within 18 months with measurable improvements in efficiency and outcomes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1F504B' }}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-2" style={{ color: '#1F504B' }}>Expert Support</h3>
              <p className="marketing-body" style={{ color: '#1F504B' }}>Dedicated implementation and success teams with deep educational technology expertise.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1F504B' }}>
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-2" style={{ color: '#1F504B' }}>Continuous Innovation</h3>
              <p className="marketing-body" style={{ color: '#1F504B' }}>Regular updates and new features based on educational best practices and user feedback.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Frequently asked questions
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Have questions about our pricing? We're here to help you find the perfect plan for your institution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="marketing-card">
                <h3 className="marketing-heading-md mb-4" style={{ color: '#1F504B' }}>{faq.question}</h3>
                <p className="marketing-body">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to transform your institution?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your specific needs and get a custom quote 
            tailored to your institution's requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/company/contact" className="marketing-btn-ghost">
              Contact sales team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
