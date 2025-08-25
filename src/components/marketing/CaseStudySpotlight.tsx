import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CaseStudySpotlight() {
  return (
    <div className="marketing-section bg-gray-50">
      <div className="marketing-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-green-50 text-green-700 ring-1 ring-green-200 mb-6">
              <span>Success Story</span>
            </div>
            
            <h2 className="marketing-heading-lg mb-6">
              Al-Noor Educational Network: 
              <span className="text-blue-600"> 340% ROI</span> in 18 Months
            </h2>
            
            <p className="marketing-body-lg mb-8">
              Discover how Al-Noor Educational Network transformed their 8-campus operations across Karachi, Lahore, and Islamabad, serving 12,500 students with measurable improvements in efficiency and outcomes.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">67%</div>
                <div className="text-sm text-gray-600">Faster Enrollment</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-gray-600">Fee Collection Improvement</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">PKR 2.8M</div>
                <div className="text-sm text-gray-600">Annual Savings</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">99.2%</div>
                <div className="text-sm text-gray-600">System Uptime</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/resources/case-studies/al-noor-educational-network"
                className="marketing-btn-primary"
              >
                Read Full Case Study
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="marketing-btn-secondary"
              >
                See Similar Results
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Phase 1: Foundation</div>
                      <div className="text-xs text-gray-600">Months 1-3 • Multi-campus setup</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Phase 2: Core Operations</div>
                      <div className="text-xs text-gray-600">Months 4-8 • SIS & LXP deployment</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Phase 3: Analytics</div>
                      <div className="text-xs text-gray-600">Months 9-12 • Advanced reporting</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Phase 4: Optimization</div>
                      <div className="text-xs text-gray-600">Months 13-18 • AI & personalization</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="text-sm text-gray-600 mb-2">Customer Testimonial</div>
                <blockquote className="text-gray-700 italic">
                  "FabriiQ transformed our multi-campus operations completely. The ROI exceeded our expectations, and our staff efficiency improved dramatically."
                </blockquote>
                <div className="mt-3 text-sm">
                  <div className="font-semibold text-gray-900">Dr. Muhammad Hassan</div>
                  <div className="text-gray-600">Network Director, Al-Noor Educational Network</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
