import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export function FinalCTA() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Educational Institution?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join leading educational institutions across Asia, Southeast Asia, and MENA regions who have achieved measurable improvements with FabriiQ's comprehensive platform.
            </p>
            
            {/* Key Benefits */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">67%</div>
                <div className="text-sm text-blue-100">Faster Enrollment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-blue-100">Better Fee Collection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">45%</div>
                <div className="text-sm text-blue-100">Higher Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">340%</div>
                <div className="text-sm text-blue-100">ROI in 18 Months</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/sandbox"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Try Interactive Sandbox
              </Link>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center">
              <p className="text-sm text-blue-100 mb-4">
                Speak with our educational technology specialists
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0">
                <a 
                  href="https://wa.me/923136662226" 
                  className="text-white hover:text-blue-100 font-medium transition-colors"
                >
                  WhatsApp: +92 313 666 2226
                </a>
                <a 
                  href="mailto:info@fabriiq.com" 
                  className="text-white hover:text-blue-100 font-medium transition-colors"
                >
                  Email: info@fabriiq.com
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 border-t border-blue-400 pt-8">
              <p className="text-sm text-blue-100 mb-4">Trusted by institutions across</p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
                <div className="flex items-center">
                  <span className="mr-2">🇵🇰</span>
                  Pakistan
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🇦🇪</span>
                  UAE
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🇸🇦</span>
                  Saudi Arabia
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌏</span>
                  Southeast Asia
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-blue-400 to-purple-400 opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
