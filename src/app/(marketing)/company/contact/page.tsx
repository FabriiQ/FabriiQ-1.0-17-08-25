import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact FabriiQ - Get in Touch with Our Team',
  description: 'Contact FabriiQ for sales inquiries, support, or partnership opportunities. Our educational technology experts are here to help.',
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a message and we\'ll respond within 24 hours',
    contact: 'hello@fabriiq.com',
    action: 'mailto:hello@fabriiq.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our sales and support team',
    contact: '+1 (555) 123-4567',
    action: 'tel:+15551234567'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    contact: 'Available 9 AM - 6 PM',
    action: '#'
  }
]

const offices = [
  {
    region: 'Asia Pacific',
    address: 'Singapore Office\n123 Business District\nSingapore 018956',
    timezone: 'GMT+8',
    hours: '9:00 AM - 6:00 PM SGT'
  },
  {
    region: 'Middle East',
    address: 'Dubai Office\n456 Business Bay\nDubai, UAE',
    timezone: 'GMT+4',
    hours: '9:00 AM - 6:00 PM GST'
  },
  {
    region: 'South Asia',
    address: 'Karachi Office\n789 Clifton Block\nKarachi, Pakistan',
    timezone: 'GMT+5',
    hours: '9:00 AM - 6:00 PM PKT'
  }
]

export default function ContactPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>Contact Us</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Get in touch with our team
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Ready to transform your educational institution? Our experts are here to help you 
            understand how FabriiQ can meet your specific needs and requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/pricing" className="marketing-btn-secondary">
              View pricing
            </Link>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              How can we help you?
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Choose the best way to reach us. Our team is ready to assist with 
              sales inquiries, technical support, or partnership opportunities.
            </p>
          </div>

          <div className="marketing-grid-3 gap-8">
            {contactMethods.map((method, index) => (
              <Link key={index} href={method.action} className="marketing-card text-center group hover:no-underline">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: '#D8E3E0' }}>
                  <method.icon className="h-8 w-8" style={{ color: '#1F504B' }} />
                </div>
                <h3 className="marketing-heading-md mb-3" style={{ color: '#1F504B' }}>{method.title}</h3>
                <p className="marketing-body text-gray-600 mb-4">{method.description}</p>
                <div className="font-medium" style={{ color: '#5A8A84' }}>{method.contact}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="marketing-grid-2 gap-12 mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Send us a message
            </h2>
            <p className="marketing-body mb-8">
              Fill out the form below and our team will get back to you within 24 hours. 
              For urgent inquiries, please call us directly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 mt-1" style={{ color: '#5A8A84' }} />
                <div>
                  <div className="font-medium mb-1">Response Time</div>
                  <div className="marketing-body-sm text-gray-600">We typically respond within 24 hours during business days</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1" style={{ color: '#5A8A84' }} />
                <div>
                  <div className="font-medium mb-1">Global Support</div>
                  <div className="marketing-body-sm text-gray-600">Support available across multiple time zones</div>
                </div>
              </div>
            </div>
          </div>

          <div className="marketing-card">
            <form className="space-y-6">
              <div className="marketing-grid-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                    style={{ focusRingColor: '#1F504B' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                    style={{ focusRingColor: '#1F504B' }}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                  style={{ focusRingColor: '#1F504B' }}
                />
              </div>

              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Name
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                  style={{ focusRingColor: '#1F504B' }}
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiry"
                  name="inquiry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                  style={{ focusRingColor: '#1F504B' }}
                >
                  <option value="">Select inquiry type</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="demo">Request Demo</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                  style={{ focusRingColor: '#1F504B' }}
                  placeholder="Tell us about your institution and how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="marketing-btn-primary w-full"
              >
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Office Locations */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Our Global Offices
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              With offices across key regions, we provide local support and expertise 
              to educational institutions worldwide.
            </p>
          </div>

          <div className="marketing-grid-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 mr-3" style={{ color: '#1F504B' }} />
                  <h3 className="marketing-heading-md" style={{ color: '#1F504B' }}>{office.region}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Address</div>
                    <div className="marketing-body-sm text-gray-600 whitespace-pre-line">{office.address}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Business Hours</div>
                    <div className="marketing-body-sm text-gray-600">{office.hours}</div>
                    <div className="marketing-body-sm text-gray-500">({office.timezone})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to get started?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Don't wait to transform your educational institution. Schedule a personalized 
            demo today and see how FabriiQ can meet your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/resources" className="marketing-btn-ghost">
              Explore resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
