'use client'

import { useState } from 'react'
import { BarChart3, GraduationCap, TrendingUp } from 'lucide-react'

const mockBloomsData = {
  classOverview: {
    className: 'Grade 9 Mathematics',
    teacher: 'Ms. Fatima Ahmed',
    students: 28,
    totalActivities: 45
  },
  bloomsDistribution: [
    { level: 'Remember', percentage: 85, color: 'bg-red-500', activities: 12, mastery: 'High' },
    { level: 'Understand', percentage: 72, color: 'bg-orange-500', activities: 10, mastery: 'Good' },
    { level: 'Apply', percentage: 68, color: 'bg-yellow-500', activities: 8, mastery: 'Good' },
    { level: 'Analyze', percentage: 45, color: 'bg-green-500', activities: 6, mastery: 'Developing' },
    { level: 'Evaluate', percentage: 32, color: 'bg-blue-500', activities: 5, mastery: 'Needs Focus' },
    { level: 'Create', percentage: 28, color: 'bg-purple-500', activities: 4, mastery: 'Needs Focus' }
  ],
  recentAssessments: [
    { name: 'Algebra Quiz', date: '2024-01-15', avgScore: 8.4, bloomsLevel: 'Apply', students: 28 },
    { name: 'Problem Solving', date: '2024-01-12', avgScore: 7.2, bloomsLevel: 'Analyze', students: 27 },
    { name: 'Concept Review', date: '2024-01-10', avgScore: 9.1, bloomsLevel: 'Understand', students: 28 }
  ],
  recommendations: [
    'Increase "Analyze" level activities to improve critical thinking',
    'Add more "Create" level projects for deeper learning',
    'Maintain strong foundation in "Remember" and "Understand" levels'
  ]
}

export function BloomsAnalyticsShowcase() {
  const [activeView, setActiveView] = useState('distribution')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Bloom's Taxonomy Analytics</h3>
          <p className="text-sm text-gray-600">{mockBloomsData.classOverview.className} • {mockBloomsData.classOverview.teacher}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('distribution')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'distribution' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Distribution
          </button>
          <button
            onClick={() => setActiveView('assessments')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'assessments' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Assessments
          </button>
          <button
            onClick={() => setActiveView('insights')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'insights' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {activeView === 'distribution' && (
        <div className="space-y-6">
          {/* Class Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{mockBloomsData.classOverview.students}</div>
              <div className="text-sm text-blue-700">Students</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{mockBloomsData.classOverview.totalActivities}</div>
              <div className="text-sm text-green-700">Activities</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">8.2</div>
              <div className="text-sm text-purple-700">Avg Score</div>
            </div>
          </div>

          {/* Bloom's Distribution */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Cognitive Level Distribution
            </h4>
            {mockBloomsData.bloomsDistribution.map((level, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{level.level}</span>
                    <span className="text-sm text-gray-600">({level.activities} activities)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">{level.percentage}%</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      level.mastery === 'High' ? 'bg-green-100 text-green-800' :
                      level.mastery === 'Good' ? 'bg-blue-100 text-blue-800' :
                      level.mastery === 'Developing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {level.mastery}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${level.color} h-3 rounded-full transition-all duration-500`}
                    style={{width: `${level.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'assessments' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Recent Assessments
          </h4>
          {mockBloomsData.recentAssessments.map((assessment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{assessment.name}</h5>
                  <p className="text-sm text-gray-600">Bloom's Level: {assessment.bloomsLevel}</p>
                  <p className="text-xs text-gray-500">{assessment.date} • {assessment.students} students</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{assessment.avgScore}</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
              
              {/* Score Distribution Visualization */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Score Distribution</span>
                  <span>Class Average: {assessment.avgScore}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${(assessment.avgScore / 10) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'insights' && (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            AI-Powered Recommendations
          </h4>
          
          {/* Cognitive Balance Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Cognitive Balance Analysis</h5>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {mockBloomsData.bloomsDistribution.map((level, index) => (
                <div key={index} className="text-center">
                  <div className={`${level.color} h-16 rounded-t`} style={{height: `${level.percentage}px`}}></div>
                  <div className="text-xs text-gray-600 mt-1">{level.level.slice(0, 3)}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Current distribution shows strong foundational skills with opportunities for higher-order thinking development.
            </p>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-900">Recommended Actions</h5>
            {mockBloomsData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                </div>
                <p className="text-sm text-blue-900">{rec}</p>
              </div>
            ))}
          </div>

          {/* Progress Tracking */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-900 mb-2">Progress This Month</h5>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Higher-order thinking activities</span>
              <span className="font-medium text-green-800">+15%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Student engagement scores</span>
              <span className="font-medium text-green-800">+8%</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live Analytics with Real-Time Updates</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Explore Full Analytics →
          </button>
        </div>
      </div>
    </div>
  )
}
