'use client'

import { useState } from 'react'
import { Award, Clock, BookOpen, MessageCircle, Globe } from 'lucide-react'

const mockStudentData = {
  profile: {
    name: 'Ahmed Ali Khan',
    class: 'Grade 9 Mathematics',
    points: 1247,
    streak: 7,
    level: 'Scholar'
  },
  achievements: [
    { id: 1, title: 'Perfect Attendance', icon: '🎯', points: 50, date: '2024-01-15', new: true },
    { id: 2, title: 'Top Performer', icon: '⭐', points: 100, date: '2024-01-14', new: false },
    { id: 3, title: 'Quick Learner', icon: '⚡', points: 75, date: '2024-01-12', new: false }
  ],
  recentActivities: [
    { id: 1, title: 'Algebra Quiz', score: 9.2, maxScore: 10, status: 'completed', date: '2024-01-15' },
    { id: 2, title: 'Geometry Assignment', score: 8.5, maxScore: 10, status: 'completed', date: '2024-01-14' },
    { id: 3, title: 'Problem Solving Workshop', score: null, maxScore: 10, status: 'pending', date: '2024-01-16' }
  ],
  socialFeed: [
    { id: 1, user: 'Fatima Sheikh', action: 'completed', item: 'Calculus Challenge', time: '2 hours ago', likes: 5 },
    { id: 2, user: 'Hassan Khan', action: 'achieved', item: 'Study Streak: 10 days', time: '4 hours ago', likes: 8 },
    { id: 3, user: 'Ayesha Rahman', action: 'shared', item: 'Math Formula Sheet', time: '6 hours ago', likes: 12 }
  ],
  goals: [
    { title: 'Maintain 90% Average', progress: 92, target: 90, status: 'achieved' },
    { title: 'Complete 15 Assignments', progress: 12, target: 15, status: 'in-progress' },
    { title: '30-Day Study Streak', progress: 7, target: 30, status: 'in-progress' }
  ]
}

export function StudentPortalShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Portal</h3>
          <p className="text-sm text-gray-600">{mockStudentData.profile.name} • {mockStudentData.profile.class}</p>
        </div>
        <div className="flex items-center space-x-3">
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
              onClick={() => setActiveTab('activities')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'activities' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Activities
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'social' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Social
            </button>
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`p-2 rounded-md transition-colors ${
              isOffline 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}
            title={isOffline ? 'Offline Mode' : 'Online Mode'}
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Offline Indicator */}
      {isOffline && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-orange-700">Offline Mode - Content synced locally</span>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Student Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{mockStudentData.profile.points}</div>
              <div className="text-sm text-purple-700">Total Points</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{mockStudentData.profile.streak}</div>
              <div className="text-sm text-orange-700">Day Streak</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-700">Assignments</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600 mb-1">{mockStudentData.profile.level}</div>
              <div className="text-sm text-green-700">Current Level</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Recent Achievements
            </h4>
            <div className="space-y-2">
              {mockStudentData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center">
                        {achievement.title}
                        {achievement.new && (
                          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">New!</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{achievement.date}</div>
                    </div>
                  </div>
                  <div className="text-yellow-600 font-medium">+{achievement.points} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Learning Goals</h4>
            <div className="space-y-3">
              {mockStudentData.goals.map((goal, index) => (
                <div key={index} className="bg-white p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{goal.title}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      goal.status === 'achieved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {goal.status === 'achieved' ? 'Achieved!' : 'In Progress'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          goal.status === 'achieved' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{width: `${Math.min((goal.progress / goal.target) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{goal.progress}/{goal.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Recent Activities</h4>
          {mockStudentData.recentActivities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{activity.title}</h5>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
                <div className="text-right">
                  {activity.status === 'completed' ? (
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {activity.score}/{activity.maxScore}
                      </div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-lg font-bold text-yellow-600">Pending</div>
                      <div className="text-sm text-yellow-700">Due Soon</div>
                    </div>
                  )}
                </div>
              </div>
              
              {activity.status === 'completed' && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${(activity.score! / activity.maxScore) * 100}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Score: {((activity.score! / activity.maxScore) * 100).toFixed(0)}%
                  </div>
                </div>
              )}

              <div className="mt-3 flex space-x-2">
                {activity.status === 'completed' ? (
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    View Feedback
                  </button>
                ) : (
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                    Start Activity
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'social' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
            Class Social Feed
          </h4>
          {mockStudentData.socialFeed.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-xs">
                    {post.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{post.user}</span>
                    <span className="text-gray-600"> {post.action} </span>
                    <span className="font-medium text-blue-600">{post.item}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{post.time}</div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <span className="text-sm">❤️</span>
                      <span className="text-xs">{post.likes}</span>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                      Comment
                    </button>
                    <button className="text-xs text-gray-500 hover:text-green-500 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Post Something */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">AK</span>
              </div>
              <input 
                type="text" 
                placeholder="Share your learning progress..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">
              {isOffline ? 'Offline-First Experience Demo' : 'Interactive Student Portal Demo'}
            </span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Try Mobile App →
          </button>
        </div>
      </div>
    </div>
  )
}
