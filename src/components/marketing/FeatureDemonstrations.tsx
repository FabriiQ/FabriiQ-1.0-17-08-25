export function FeatureDemonstrations() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        <div className="text-center mb-16">
          <h2 className="marketing-heading-lg mb-4">
            Experience Real Platform Components
          </h2>
          <p className="marketing-body-lg max-w-3xl mx-auto">
            Interact with actual FabriiQ components using live dummy data. See exactly how the platform works in real educational environments.
          </p>
        </div>

        <div className="marketing-interactive-demo">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Interactive Platform Demonstrations
            </h3>
            <p className="text-gray-600 mb-8">
              Experience FabriiQ's comprehensive platform through working demonstrations with real functionality and sample institutional data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="marketing-btn-primary">
                Launch Interactive Demo
              </button>
              <button className="marketing-btn-secondary">
                View Component Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
