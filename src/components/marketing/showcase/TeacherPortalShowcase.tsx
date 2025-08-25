'use client'

import { useState } from 'react'
import { Users, ClipboardList, BarChart3, Award } from 'lucide-react'

const mockTeacherData = {
  classInfo: {
    className: 'Grade 9 Mathematics',
    teacher: 'Ms. Fatima Ahmed',
    students: 28,
    present: 26,
    absent: 2,
    avgScore: 8.4
  },
  recentActivities: [
    { id: 1, title: 'Algebra Quiz', type: 'Assessment', date: '2024-01-15', completed: 26, pending: 2, avgScore: 8.4 },
    { id: 2, title: 'Problem Solving Workshop', type: 'Activity', date: '2024-01-14', completed: 28, pending: 0, avgScore: 7.8 },
    { id: 3, title: 'Homework Review', type: 'Assignment', date: '2024-01-13', completed: 24, pending: 4, avgScore: 8.9 }
  ],
  studentProgress: [
    { name: 'Ahmed Ali', score: 9.2, trend: 'up', attendance: 95, assignments: 12 },
    { name: 'Fatima Sheikh', score: 8.8, trend: 'up', attendance: 98, assignments: 12 },
    { name: 'Hassan Khan', score: 7.4, trend: 'down', attendance: 87, assignments: 10 },
    { name: 'Ayesha Rahman', score: 8.9, trend: 'up', attendance: 92, assignments: 11 }
  ],
  achievements: [
    { student: 'Ahmed Ali', achievement: 'Perfect Attendance', date: '2024-01-15', points: 50 },
    { student: 'Fatima Sheikh', achievement: 'Top Performer', date: '2024-01-14', points: 100 },
    { student: 'Hassan Khan', achievement: 'Most Improved', date: '2024-01-13', points: 75 }
  ]
}

export function TeacherPortalShowcase() {
  const [activeView, setActiveView] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState(mockTeacherData.studentProgress[0])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Teacher Portal Dashboard</h3>
          <p className="text-sm text-gray-600">{mockTeacherData.classInfo.className} • {mockTeacherData.classInfo.teacher}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'overview' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('activities')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'activities' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => setActiveView('students')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeView === 'students' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Students
          </button>
        </div>
      </div>

      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Class Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{mockTeacherData.classInfo.students}</div>
              <div className="text-sm text-blue-700">Total Students</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <ClipboardList className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{mockTeacherData.classInfo.present}</div>
              <div className="text-sm text-green-700">Present Today</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{mockTeacherData.classInfo.avgScore}</div>
              <div className="text-sm text-purple-700">Class Average</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">96%</div>
              <div className="text-sm text-orange-700">Attendance Rate</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                <ClipboardList className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-medium">Take Attendance</div>
              </button>
              <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                <BarChart3 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-medium">Create Assessment</div>
              </button>
              <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <div className="text-xs font-medium">Grade Assignments</div>
              </button>
              <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                <Award className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                <div className="text-xs font-medium">Award Points</div>
              </button>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-3">Recent Student Achievements</h4>
            <div className="space-y-2">
              {mockTeacherData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-yellow-600" />
                    <div>
                      <span className="font-medium text-gray-900">{achievement.student}</span>
                      <span className="text-sm text-gray-600 ml-2">{achievement.achievement}</span>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-600 font-medium">+{achievement.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'activities' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Recent Activities & Assessments</h4>
          {mockTeacherData.recentActivities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{activity.title}</h5>
                  <p className="text-sm text-gray-600">{activity.type} • {activity.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{activity.avgScore}</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-lg font-bold text-green-600">{activity.completed}</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="text-lg font-bold text-yellow-600">{activity.pending}</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
              </div>

              <div className="mt-3 flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                  Grade Remaining
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'students' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Student Progress Overview</h4>
          <div className="space-y-3">
            {mockTeacherData.studentProgress.map((student, index) => (
              <div
                key={index}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedStudent.name === student.name 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">
                        {student.assignments} assignments • {student.attendance}% attendance
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{student.score}</div>
                      <div className="text-sm text-gray-600">Average</div>
                    </div>
                    <div className={`p-1 rounded ${
                      student.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div className={`w-0 h-0 ${
                        student.trend === 'up' 
                          ? 'border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-green-600'
                          : 'border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-red-600'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Student Details */}
          {selectedStudent && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-3">Student Details: {selectedStudent.name}</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current Average:</span>
                  <span className="ml-2 font-medium text-blue-600">{selectedStudent.score}/10</span>
                </div>
                <div>
                  <span className="text-gray-600">Attendance:</span>
                  <span className="ml-2 font-medium text-green-600">{selectedStudent.attendance}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Assignments:</span>
                  <span className="ml-2 font-medium">{selectedStudent.assignments} completed</span>
                </div>
                <div>
                  <span className="text-gray-600">Trend:</span>
                  <span className={`ml-2 font-medium ${
                    selectedStudent.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStudent.trend === 'up' ? '↗ Improving' : '↘ Needs attention'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  View Full Profile
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
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Interactive Teacher Dashboard Demo</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Explore Full Portal →
          </button>
        </div>
      </div>
    </div>
  )
}
