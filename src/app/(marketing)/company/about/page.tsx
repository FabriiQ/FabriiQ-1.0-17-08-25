import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About FabriiQ - Educational Technology Innovation',
  description: 'Learn about FabriiQ\'s mission to transform education through innovative technology solutions designed specifically for multi-campus institutions.',
}

const values = [
  {
    icon: Target,
    title: 'Educational Excellence',
    description: 'We believe every student deserves access to exceptional educational experiences powered by innovative technology.'
  },
  {
    icon: Users,
    title: 'Institutional Empowerment',
    description: 'Our solutions empower educational institutions to achieve operational excellence while focusing on their core mission.'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'We\'re committed to transforming education across Asia, Southeast Asia, and MENA regions with culturally relevant solutions.'
  },
  {
    icon: Award,
    title: 'Continuous Innovation',
    description: 'We continuously evolve our platform based on educational best practices and real-world feedback from our partners.'
  }
]

const stats = [
  { number: 'Alpha', label: 'Development Stage' },
  { number: '2024', label: 'Founded' },
  { number: '3+', label: 'Core Regions' },
  { number: '100%', label: 'Innovation Focus' }
]

export default function AboutPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Users className="h-4 w-4 mr-2" />
            <span>About FabriiQ - Alpha Release</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Building the future of educational technology
          </h1>

          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            FabriiQ is an innovative educational platform currently in alpha development, designed to revolutionize
            multi-campus educational operations. We're building comprehensive Student Information System and Learning
            Experience Platform solutions that will transform how institutions manage their operations and deliver education.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              See our platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/company/careers" className="marketing-btn-secondary">
              Join our team
            </Link>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="marketing-heading-lg mb-6" style={{ color: '#1F504B' }}>
              Our Mission
            </h2>
            <p className="marketing-body-lg mb-8" style={{ color: '#1F504B' }}>
              To develop and deliver the next generation of educational technology that empowers institutions
              with intelligent, comprehensive solutions. We're building a platform that will streamline operations,
              enhance learning outcomes, and create meaningful connections between students, teachers, and
              administrators across multiple campus locations.
            </p>
            <div className="marketing-grid-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>{stat.number}</div>
                  <div className="marketing-body-sm" style={{ color: '#1F504B' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="marketing-grid-2 items-center gap-12 mb-20">
          <div>
            <h2 className="marketing-heading-lg mb-6">
              Our Story
            </h2>
            <div className="space-y-6">
              <p className="marketing-body">
                FabriiQ was born from recognizing the critical gaps in current educational technology solutions
                for multi-campus institutions. Our team, with extensive experience in education and technology,
                identified the need for a truly integrated platform that could unify operations while respecting
                the unique requirements of each campus location.
              </p>
              <p className="marketing-body">
                Currently in alpha development, we're focusing on the Asia, Southeast Asia, and MENA regions,
                building our platform to address the specific cultural, operational, and regulatory requirements
                of educational institutions in these diverse and dynamic markets.
              </p>
              <p className="marketing-body">
                Our alpha platform is being developed with real-world insights and feedback from educational
                professionals, ensuring that when we launch, FabriiQ will deliver meaningful improvements in
                operational efficiency, student engagement, and educational outcomes.
              </p>
            </div>
          </div>
          <div className="marketing-card">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F504B' }}>
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-4" style={{ color: '#1F504B' }}>Global Reach</h3>
              <p className="marketing-body text-gray-600 mb-6">
                Developing solutions for educational institutions across Asia, Southeast Asia, and MENA regions
                with deep cultural and operational understanding.
              </p>
              <div className="text-2xl font-bold" style={{ color: '#5A8A84' }}>Target: 15+ Countries</div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Our Values
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              The principles that guide everything we do, from product development 
              to customer relationships and company culture.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="marketing-card">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: '#1F504B' }}>
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="marketing-heading-md mb-3" style={{ color: '#1F504B' }}>{value.title}</h3>
                    <p className="marketing-body">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Preview */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Leadership Team
            </h2>
            <p className="marketing-body max-w-2xl mx-auto mb-8">
              Our experienced leadership team combines deep educational expertise with 
              cutting-edge technology innovation to drive FabriiQ's mission forward.
            </p>
            <Link href="/company/leadership" className="marketing-btn-primary">
              Meet our team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Innovation Commitment */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Commitment to Innovation
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              We invest heavily in research and development to ensure FabriiQ remains 
              at the forefront of educational technology innovation.
            </p>
          </div>

          <div className="marketing-grid-3 gap-8">
            <div className="marketing-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1F504B' }}>
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-4">Research & Development</h3>
              <p className="marketing-body">Continuous investment in cutting-edge educational technology research.</p>
            </div>
            <div className="marketing-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#5A8A84' }}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-4">User-Centered Design</h3>
              <p className="marketing-body">Every feature designed with real educators and students in mind.</p>
            </div>
            <div className="marketing-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#004EB2' }}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="marketing-heading-md mb-4">Quality Excellence</h3>
              <p className="marketing-body">Rigorous testing and quality assurance for reliable, secure solutions.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to transform your institution?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Join the growing community of educational institutions that have chosen FabriiQ 
            to power their digital transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/company/contact" className="marketing-btn-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
