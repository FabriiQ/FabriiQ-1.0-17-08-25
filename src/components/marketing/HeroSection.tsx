'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { useState } from 'react'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="marketing-section">
      <div className="marketing-container">
        {/* Background gradient with FabriiQ colors */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              background: 'linear-gradient(135deg, #D8E3E0 0%, #5A8A84 50%, #1F504B 100%)',
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
              <span>Building the Future of Education • Alpha Release</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="marketing-heading-xl mb-6">
            Where education meets{' '}
            <span style={{ color: '#1F504B' }}>innovation</span>{' '}
            across multiple campuses
          </h1>

          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Imagine a world where managing multiple campuses is effortless, where teachers are empowered with AI assistance,
            and where students are engaged through gamified learning experiences. FabriiQ is building that future -
            a comprehensive platform that unifies Student Information Systems and Learning Experience Platforms
            specifically for the diverse educational landscape of Asia, Southeast Asia, and MENA regions.
          </p>

          {/* Vision Metrics */}
          <div className="marketing-grid-4 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>Multi</div>
              <div className="marketing-body-sm">Campus Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>AI</div>
              <div className="marketing-body-sm">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>Gamified</div>
              <div className="marketing-body-sm">Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>3+</div>
              <div className="marketing-body-sm">Target Regions</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="marketing-btn-primary"
            >
              Explore the vision
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="marketing-btn-secondary"
            >
              <Play className="mr-2 h-5 w-5" />
              See our roadmap
            </button>
          </div>

          {/* Secondary CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/solutions"
              className="marketing-btn-ghost"
            >
              Discover our solutions →
            </Link>
          </div>

          {/* Vision indicators */}
          <div className="mt-16 text-center">
            <p className="marketing-body-sm text-gray-500 mb-6">Designed for educational institutions across</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#1F504B' }}></div>
                <span className="marketing-body-sm font-medium text-gray-700">Asia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#5A8A84' }}></div>
                <span className="marketing-body-sm font-medium text-gray-700">Southeast Asia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#1F504B' }}></div>
                <span className="marketing-body-sm font-medium text-gray-700">MENA Region</span>
              </div>
            </div>
          </div>
        </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">Close video</span>
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Platform Overview Video</p>
                <p className="text-sm text-gray-400 mt-2">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-blue-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      </div>
    </section>
  )
}
