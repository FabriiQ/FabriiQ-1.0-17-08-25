import Link from 'next/link'

const navigation = {
  product: [
    { name: 'Multi-Campus SIS', href: '/solutions/multi-campus-sis' },
    { name: 'Learning Experience Platform', href: '/solutions/learning-experience-platform' },
    { name: 'Teacher Portal', href: '/solutions/teacher-portal' },
    { name: 'Student Portal', href: '/solutions/student-portal' },
    { name: 'Rewards & Gamification', href: '/solutions/rewards-gamification' },
    { name: 'Analytics & Intelligence', href: '/solutions/analytics-intelligence' },
  ],
  features: [
    { name: 'Curriculum Management', href: '/features/curriculum-management' },
    { name: 'Assessment & Grading', href: '/features/assessment-grading' },
    { name: 'Analytics & Reporting', href: '/features/analytics-reporting' },
    { name: 'Enrollment & Fee Management', href: '/features/enrollment-fee-management' },
    { name: 'Student Experience', href: '/features/student-experience' },
  ],
  resources: [
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'Implementation Guide', href: '/resources/implementation-guide' },
    { name: 'Documentation', href: '/resources/documentation' },
    { name: 'Webinars & Demos', href: '/resources/webinars' },
    { name: 'Blog', href: '/resources/blog' },
  ],
  company: [
    { name: 'About FabriiQ', href: '/company/about' },
    { name: 'Platform Status', href: '/platform-status' },
    { name: 'Leadership Team', href: '/company/leadership' },
    { name: 'Careers', href: '/company/careers' },
    { name: 'Contact', href: '/company/contact' },
    { name: 'News', href: '/company/news' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Data Security', href: '/legal/security' },
    { name: 'Accessibility', href: '/legal/accessibility' },
  ],
}

const regions = [
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Southeast Asia', flag: '🌏' },
]

export function MarketingFooter() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">FabriiQ</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              The Integrated Multi-Campus Student Information & Learning Experience Platform. 
              Transforming educational institutions across Asia, Southeast Asia, and MENA regions.
            </p>
            <div className="flex space-x-6">
              {/* Social Media Links */}
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Features</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.features.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Presence */}
        <div className="mt-16 border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">Regional Presence</h3>
              <div className="flex flex-wrap gap-4">
                {regions.map((region) => (
                  <div key={region.name} className="flex items-center text-sm text-gray-300">
                    <span className="mr-2">{region.flag}</span>
                    {region.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 sm:mt-0">
              <div className="flex space-x-6">
                <Link href="/demo" className="text-sm text-blue-400 hover:text-blue-300">
                  Book Demo
                </Link>
                <Link href="/sandbox" className="text-sm text-blue-400 hover:text-blue-300">
                  Try Sandbox
                </Link>
                <Link href="/company/contact" className="text-sm text-blue-400 hover:text-blue-300">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 FabriiQ. All rights reserved. Transforming education across Asia, Southeast Asia, and MENA regions.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <div className="text-sm text-gray-300">
            <p className="mb-2">Ready to transform your educational institution?</p>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0">
              <a href="https://wa.me/923136662226" className="text-blue-400 hover:text-blue-300">
                WhatsApp: +92 313 666 2226
              </a>
              <a href="mailto:info@fabriiq.com" className="text-blue-400 hover:text-blue-300">
                Email: info@fabriiq.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
