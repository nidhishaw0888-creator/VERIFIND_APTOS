import React from 'react';
import { BarChart3, Users, FileText, Search, Award, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import type { UserRole } from '../App';

interface DashboardProps {
  userRole: UserRole;
}

export function Dashboard({ userRole }: DashboardProps) {
  const getDashboardData = () => {
    switch (userRole) {
      case 'law_enforcement':
        return {
          title: 'Law Enforcement Dashboard',
          stats: [
            { label: 'Active Cases', value: '23', icon: FileText, color: 'text-blue-600 bg-blue-50' },
            { label: 'Tips Received', value: '147', icon: Search, color: 'text-teal-600 bg-teal-50' },
            { label: 'Cases Resolved', value: '18', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
            { label: 'Blockchain Verifications', value: '342', icon: BarChart3, color: 'text-purple-600 bg-purple-50' }
          ]
        };
      case 'family':
        return {
          title: 'Family Member Dashboard',
          stats: [
            { label: 'My Cases', value: '1', icon: FileText, color: 'text-teal-600 bg-teal-50' },
            { label: 'Community Alerts', value: '1,247', icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: 'Tips Received', value: '34', icon: Search, color: 'text-orange-600 bg-orange-50' },
            { label: 'Hours Active', value: '72', icon: TrendingUp, color: 'text-green-600 bg-green-50' }
          ]
        };
      case 'community':
        return {
          title: 'Community Member Dashboard',
          stats: [
            { label: 'Active Alerts', value: '12', icon: AlertCircle, color: 'text-orange-600 bg-orange-50' },
            { label: 'Tips Submitted', value: '7', icon: Search, color: 'text-blue-600 bg-blue-50' },
            { label: 'Rewards Earned', value: '$284', icon: Award, color: 'text-green-600 bg-green-50' },
            { label: 'Verification Score', value: '98%', icon: CheckCircle, color: 'text-purple-600 bg-purple-50' }
          ]
        };
      default:
        return { title: 'Dashboard', stats: [] };
    }
  };

  const { title, stats } = getDashboardData();

  const recentActivity = [
    {
      id: 1,
      type: 'case_created',
      title: 'New missing person case registered',
      description: 'Sarah Johnson, 24, reported missing in downtown area',
      timestamp: '2 minutes ago',
      status: 'verified'
    },
    {
      id: 2,
      type: 'tip_submitted',
      title: 'Community tip received',
      description: 'Potential sighting reported near Central Park',
      timestamp: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'reward_distributed',
      title: 'Reward automatically distributed',
      description: '$50 sent to community member for verified tip',
      timestamp: '1 hour ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'case_resolved',
      title: 'Missing person case resolved',
      description: 'Michael Chen found safe, case closed successfully',
      timestamp: '3 hours ago',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">Real-time blockchain-verified data and system overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 text-sm mt-1">Live blockchain-verified events and updates</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Network Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Optimal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Block</span>
                  <span className="text-sm font-medium text-gray-900">#2,847,395</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Gas Price</span>
                  <span className="text-sm font-medium text-gray-900">12 Gwei</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confirmations</span>
                  <span className="text-sm font-medium text-gray-900">15/15</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Security Guarantee</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                All data is cryptographically secured and immutably stored on the blockchain. 
                Your contributions are permanently verified and tamper-proof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}