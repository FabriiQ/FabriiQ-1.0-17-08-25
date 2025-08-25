export function ProofSection() {
  const metrics = [
    {
      value: '12,500+',
      label: 'Students Managed',
      description: 'Across multiple institutions'
    },
    {
      value: '8',
      label: 'Campus Locations',
      description: 'In our flagship implementation'
    },
    {
      value: '850+',
      label: 'Teachers Empowered',
      description: 'With comprehensive tools'
    },
    {
      value: '99.2%',
      label: 'System Uptime',
      description: 'Reliable access guaranteed'
    }
  ]

  const testimonials = [
    {
      quote: "FabriiQ transformed how we manage our multi-campus operations. The 67% improvement in enrollment processing alone saved us countless hours.",
      author: "Dr. Muhammad Hassan",
      role: "Network Director",
      company: "Al-Noor Educational Network"
    },
    {
      quote: "The Bloom's analytics feature gives us unprecedented insight into our curriculum effectiveness. It's revolutionized our academic planning.",
      author: "Fatima Ahmed",
      role: "Senior Mathematics Teacher",
      company: "Karachi Campus"
    },
    {
      quote: "Our fee collection improved by 89% within the first year. The automated late fee policies and parent notifications made all the difference.",
      author: "Ahmed Ali",
      role: "Finance Director",
      company: "Multi-Campus Network"
    }
  ]

  return (
    <div className="marketing-section bg-gray-50">
      <div className="marketing-container">
        {/* Metrics */}
        <div className="text-center mb-20">
          <h2 className="marketing-heading-lg mb-4">
            Proven Results Across Educational Institutions
          </h2>
          <p className="marketing-body-lg max-w-3xl mx-auto">
            Join leading educational institutions across Asia, Southeast Asia, and MENA regions who have transformed their operations with FabriiQ.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-20">
          {metrics.map((metric, index) => (
            <div key={index} className="marketing-metric-tile">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-gray-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="marketing-card">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <blockquote className="text-gray-700 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-blue-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Logos */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-500 mb-8">Trusted by educational institutions across</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-gray-400 font-semibold">Al-Noor Educational Network</div>
            <div className="text-gray-400 font-semibold">International School of Karachi</div>
            <div className="text-gray-400 font-semibold">Lahore Grammar School</div>
            <div className="text-gray-400 font-semibold">Dubai International Academy</div>
            <div className="text-gray-400 font-semibold">Riyadh International School</div>
          </div>
        </div>
      </div>
    </div>
  )
}
