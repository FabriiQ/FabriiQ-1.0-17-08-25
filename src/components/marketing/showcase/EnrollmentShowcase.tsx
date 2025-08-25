'use client'

import { useState } from 'react'
import { CheckCircle, Clock, FileText, User } from 'lucide-react'

const mockEnrollmentData = {
  applications: [
    { id: 1, name: 'Ahmed Ali Khan', status: 'pending', campus: 'Karachi Main', program: 'Grade 9 Science', submitted: '2024-01-15', progress: 75 },
    { id: 2, name: 'Fatima Sheikh', status: 'approved', campus: 'Lahore Branch', program: 'Grade 10 Commerce', submitted: '2024-01-14', progress: 100 },
    { id: 3, name: 'Muhammad Hassan', status: 'review', campus: 'Islamabad Campus', program: 'Grade 8 General', submitted: '2024-01-16', progress: 60 },
    { id: 4, name: 'Ayesha Rahman', status: 'pending', campus: 'Karachi Main', program: 'Grade 11 Pre-Med', submitted: '2024-01-17', progress: 45 }
  ],
  stats: {
    totalApplications: 156,
    pendingReview: 23,
    approved: 98,
    avgProcessingTime: '5.2 days',
    completionRate: '94%'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'review': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
    case 'review': return <FileText className="h-4 w-4 text-blue-600" />
    default: return <User className="h-4 w-4 text-gray-600" />
  }
}

export function EnrollmentShowcase() {
  const [selectedApplication, setSelectedApplication] = useState(mockEnrollmentData.applications[0])
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Enrollment Management System</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'applications' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Applications
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockEnrollmentData.stats.totalApplications}</div>
              <div className="text-sm text-blue-700">Total Applications</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{mockEnrollmentData.stats.pendingReview}</div>
              <div className="text-sm text-yellow-700">Pending Review</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockEnrollmentData.stats.approved}</div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{mockEnrollmentData.stats.avgProcessingTime}</div>
              <div className="text-sm text-purple-700">Avg Processing</div>
            </div>
          </div>

          {/* Processing Efficiency */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Processing Efficiency</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="font-semibold text-green-600">{mockEnrollmentData.stats.completionRate}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">67% faster than traditional methods</div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Application List */}
          <div className="space-y-3">
            {mockEnrollmentData.applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApplication(app)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedApplication.id === app.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(app.status)}
                    <div>
                      <div className="font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-600">{app.program} • {app.campus}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <div className="text-sm text-gray-500">{app.submitted}</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Application Progress</span>
                    <span>{app.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                      style={{width: `${app.progress}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Application Details */}
          {selectedApplication && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Application Details: {selectedApplication.name}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Campus:</span>
                  <span className="ml-2 font-medium">{selectedApplication.campus}</span>
                </div>
                <div>
                  <span className="text-gray-600">Program:</span>
                  <span className="ml-2 font-medium">{selectedApplication.program}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <span className="ml-2 font-medium">{selectedApplication.submitted}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Review Application
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Demo Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live Demo with Mock Data</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Try Full System →
          </button>
        </div>
      </div>
    </div>
  )
}
