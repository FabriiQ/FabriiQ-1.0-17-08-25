'use client'

import { useState } from 'react'
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

const mockFeeData = {
  overview: {
    totalCollected: 'PKR 2,450,000',
    pendingAmount: 'PKR 180,000',
    collectionRate: '89%',
    onTimePayments: '94%'
  },
  recentPayments: [
    { id: 1, student: 'Ahmed Ali Khan', amount: 'PKR 15,000', status: 'paid', date: '2024-01-15', method: 'Bank Transfer' },
    { id: 2, student: 'Fatima Sheikh', amount: 'PKR 12,500', status: 'pending', date: '2024-01-14', method: 'Online' },
    { id: 3, student: 'Muhammad Hassan', amount: 'PKR 18,000', status: 'overdue', date: '2024-01-10', method: 'Cash' },
    { id: 4, student: 'Ayesha Rahman', amount: 'PKR 16,200', status: 'paid', date: '2024-01-16', method: 'Card' }
  ],
  feeStructure: [
    { component: 'Tuition Fee', amount: 'PKR 12,000', type: 'Monthly', campus: 'All Campuses' },
    { component: 'Laboratory Fee', amount: 'PKR 2,000', type: 'Semester', campus: 'Science Programs' },
    { component: 'Library Fee', amount: 'PKR 500', type: 'Monthly', campus: 'All Campuses' },
    { component: 'Transport Fee', amount: 'PKR 3,000', type: 'Monthly', campus: 'Optional' }
  ],
  lateFeePolicy: {
    gracePeriod: '7 days',
    lateFeeRate: '2%',
    maxLateFee: 'PKR 1,000',
    escalationDays: '30 days'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'overdue': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
    case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />
    default: return <DollarSign className="h-4 w-4 text-gray-600" />
  }
}

export function FeeManagementShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPayment, setSelectedPayment] = useState(mockFeeData.recentPayments[0])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Fee Management System</h3>
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
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'payments' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'structure' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Fee Structure
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-bold text-green-600">{mockFeeData.overview.totalCollected}</div>
              <div className="text-sm text-green-700">Total Collected</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">{mockFeeData.overview.pendingAmount}</div>
              <div className="text-sm text-yellow-700">Pending Amount</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{mockFeeData.overview.collectionRate}</div>
              <div className="text-sm text-blue-700">Collection Rate</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{mockFeeData.overview.onTimePayments}</div>
              <div className="text-sm text-purple-700">On-Time Payments</div>
            </div>
          </div>

          {/* Collection Efficiency */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Collection Efficiency</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">89% (+12% vs last month)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
              </div>
              <div className="text-xs text-gray-500">89% improvement over traditional methods</div>
            </div>
          </div>

          {/* Late Fee Policy Status */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Automated Late Fee Policy</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Grace Period:</span>
                <span className="ml-2 font-medium">{mockFeeData.lateFeePolicy.gracePeriod}</span>
              </div>
              <div>
                <span className="text-blue-700">Late Fee Rate:</span>
                <span className="ml-2 font-medium">{mockFeeData.lateFeePolicy.lateFeeRate}</span>
              </div>
              <div>
                <span className="text-blue-700">Maximum Fee:</span>
                <span className="ml-2 font-medium">{mockFeeData.lateFeePolicy.maxLateFee}</span>
              </div>
              <div>
                <span className="text-blue-700">Escalation:</span>
                <span className="ml-2 font-medium">{mockFeeData.lateFeePolicy.escalationDays}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-4">
          {/* Payment List */}
          <div className="space-y-3">
            {mockFeeData.recentPayments.map((payment) => (
              <div
                key={payment.id}
                onClick={() => setSelectedPayment(payment)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPayment.id === payment.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <div className="font-medium text-gray-900">{payment.student}</div>
                      <div className="text-sm text-gray-600">{payment.method} • {payment.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{payment.amount}</div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Payment Details */}
          {selectedPayment && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Payment Details: {selectedPayment.student}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-medium">{selectedPayment.amount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Method:</span>
                  <span className="ml-2 font-medium">{selectedPayment.method}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <span className="ml-2 font-medium">{selectedPayment.date}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Generate Receipt
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                  Send Reminder
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Multi-Component Fee Structure</h4>
          {mockFeeData.feeStructure.map((fee, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{fee.component}</h5>
                  <p className="text-sm text-gray-600">{fee.type} • {fee.campus}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{fee.amount}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Multi-Currency Support */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-900 mb-3">Multi-Currency Support</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">PKR (Primary):</span>
                <span className="font-medium">Pakistani Rupee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">USD:</span>
                <span className="font-medium">US Dollar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">AED:</span>
                <span className="font-medium">UAE Dirham</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">SAR:</span>
                <span className="font-medium">Saudi Riyal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Real-Time Fee Processing Demo</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Try Payment Processing →
          </button>
        </div>
      </div>
    </div>
  )
}
