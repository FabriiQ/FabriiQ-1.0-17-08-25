import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Users, Globe, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Live Demo - Experience FabriiQ Platform',
  description: 'Schedule a personalized demonstration of FabriiQ\'s multi-campus educational platform. See how we can transform your institution\'s operations.',
}

const demoOptions = [
  {
    title: 'Executive Overview',
    duration: '30 minutes',
    audience: 'Principals, Owners, Decision Makers',
    description: 'High-level platform overview focusing on ROI, implementation timeline, and strategic benefits.',
    features: [
      'Platform capabilities overview',
      'ROI and success metrics',
      'Implementation roadmap',
      'Pricing and packages'
    ],
    icon: Users,
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Academic Leadership Demo',
    duration: '45 minutes',
    audience: 'Academic Directors, Curriculum Heads',
    description: 'Deep dive into curriculum management, Bloom\'s analytics, and learning experience features.',
    features: [
      'Curriculum management with Bloom\'s taxonomy',
      'Assessment and rubric systems',
      'Learning analytics and reporting',
      'AIVY Multi-Agent System'
    ],
    icon: GraduationCap,
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Operations & Finance Demo',
    duration: '45 minutes',
    audience: 'Operations Managers, Finance Directors',
    description: 'Focus on enrollment processes, fee management, multi-campus operations, and financial reporting.',
    features: [
      'Streamlined enrollment workflows',
      'Comprehensive fee management',
      'Multi-campus coordination',
      'Financial reporting and analytics'
    ],
    icon: Clock,
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'Technical Implementation',
    duration: '60 minutes',
    audience: 'IT Directors, Technical Teams',
    description: 'Technical architecture, security, integration capabilities, and implementation requirements.',
    features: [
      'System architecture and security',
      'API and integration capabilities',
      'Data migration strategies',
      'Technical support and maintenance'
    ],
    icon: Globe,
    color: 'bg-orange-50 border-orange-200'
  }
]

const timeSlots = [
  '9:00 AM - 9:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '2:00 PM - 2:30 PM',
  '3:00 PM - 3:30 PM',
  '4:00 PM - 4:30 PM'
]

export default function DemoPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Experience FabriiQ Live
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Schedule a personalized demonstration tailored to your role and institution's needs. See exactly how FabriiQ can transform your educational operations.
          </p>
        </div>

        {/* Demo Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Demo Experience
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {demoOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 ${option.color} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-start mb-4">
                  <option.icon className="h-8 w-8 text-gray-700 mr-4 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {option.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {option.audience}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-900 mb-3">
                    What You'll See:
                  </div>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule This Demo
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Schedule Your Demo
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your role</option>
                  <option value="principal">Principal/Owner</option>
                  <option value="academic">Academic Director</option>
                  <option value="operations">Operations Manager</option>
                  <option value="finance">Finance Director</option>
                  <option value="it">IT Director</option>
                  <option value="teacher">Teacher</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </label>
                <select
                  id="students"
                  name="students"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select range</option>
                  <option value="1-100">1-100</option>
                  <option value="101-500">101-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1001-5000">1001-5000</option>
                  <option value="5000+">5000+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Specific Areas of Interest (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your specific needs or challenges..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Schedule Demo
            </button>
          </form>
        </div>

        {/* Alternative Contact */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Prefer to Talk Directly?
          </h3>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8 space-y-4 sm:space-y-0">
            <a 
              href="https://wa.me/923136662226" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp: +92 313 666 2226
            </a>
            <a 
              href="mailto:info@fabriiq.com" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email: info@fabriiq.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
