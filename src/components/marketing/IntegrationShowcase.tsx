export function IntegrationShowcase() {
  const integrations = [
    {
      category: 'Security & Compliance',
      items: [
        'Enterprise-grade security with audit trails',
        'Role-based access control (RBAC)',
        'Data encryption at rest and in transit',
        'GDPR and regional compliance support'
      ]
    },
    {
      category: 'Technical Architecture',
      items: [
        'Cloud-native with 99.9% uptime SLA',
        'Real-time synchronization across campuses',
        'Mobile-first progressive web app',
        'Offline-first capabilities with smart sync'
      ]
    },
    {
      category: 'Regional Adaptations',
      items: [
        'Multi-currency support (PKR, USD, AED, SAR)',
        'Right-to-left (RTL) language support',
        'Islamic calendar integration',
        'Local educational standards alignment'
      ]
    },
    {
      category: 'Scalability & Performance',
      items: [
        'Horizontal scaling for growing institutions',
        'Automated backup and disaster recovery',
        'Performance optimization for large datasets',
        'Load balancing across multiple regions'
      ]
    }
  ]

  return (
    <div className="marketing-section bg-gray-50">
      <div className="marketing-container">
        <div className="text-center mb-16">
          <h2 className="marketing-heading-lg mb-4">
            Enterprise-Grade Platform Architecture
          </h2>
          <p className="marketing-body-lg max-w-3xl mx-auto">
            Built on modern cloud infrastructure with comprehensive security, compliance, and regional adaptations for educational institutions across Asia, Southeast Asia, and MENA regions.
          </p>
        </div>

        <div className="marketing-feature-grid">
          {integrations.map((integration, index) => (
            <div key={index} className="marketing-card-feature">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {integration.category}
              </h3>
              <ul className="space-y-3">
                {integration.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Uptime SLA</div>
              <div className="text-xs text-gray-600">Guaranteed availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">&lt;200ms</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Response Time</div>
              <div className="text-xs text-gray-600">Average API response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">256-bit</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Encryption</div>
              <div className="text-xs text-gray-600">AES encryption standard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
