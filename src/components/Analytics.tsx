import React from 'react';
import { BarChart3, TrendingUp, MapPin, Clock, Users, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import type { UserRole } from '../App';

interface AnalyticsProps {
  userRole: UserRole;
}

export function Analytics({ userRole }: AnalyticsProps) {
  const getAnalyticsTitle = () => {
    switch (userRole) {
      case 'law_enforcement': return 'Investigation Analytics';
      case 'family': return 'Case Progress Analytics';
      case 'community': return 'Community Impact Analytics';
      default: return 'System Analytics';
    }
  };

  const keyMetrics = [
    {
      label: 'Resolution Rate',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Average Response Time',
      value: '4.2 hrs',
      change: '-18%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Community Engagement',
      value: '2,847',
      change: '+34%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Rewards Distributed',
      value: '$12,450',
      change: '+28%',
      trend: 'up',
      icon: Award,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const hotspotData = [
    { area: 'Downtown Metro', cases: 18, resolved: 14, rate: 78 },
    { area: 'University District', cases: 12, resolved: 9, rate: 75 },
    { area: 'Riverside Area', cases: 8, resolved: 7, rate: 88 },
    { area: 'Shopping Centers', cases: 15, resolved: 10, rate: 67 },
    { area: 'Transit Hubs', cases: 22, resolved: 16, rate: 73 }
  ];

  const timePatterns = [
    { hour: '6 AM', cases: 2 },
    { hour: '9 AM', cases: 5 },
    { hour: '12 PM', cases: 8 },
    { hour: '3 PM', cases: 12 },
    { hour: '6 PM', cases: 18 },
    { hour: '9 PM', cases: 15 },
    { hour: '12 AM', cases: 7 },
    { hour: '3 AM', cases: 3 }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getAnalyticsTitle()}</h1>
          <p className="text-gray-600">Data-driven insights powered by blockchain-verified information</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Geographic Hotspots */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Geographic Hotspots</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">Case distribution and resolution rates by area</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {hotspotData.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{area.area}</div>
                      <div className="text-sm text-gray-600">
                        {area.cases} cases • {area.resolved} resolved
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        area.rate >= 80 ? 'text-green-600' : 
                        area.rate >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {area.rate}%
                      </div>
                      <div className="text-sm text-gray-600">success rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Pattern Analysis */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Time Pattern Analysis</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">Peak hours for missing person reports</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {timePatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-gray-700">{pattern.hour}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(pattern.cases / 18) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-8 text-sm font-medium text-gray-900">{pattern.cases}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-teal-600" />
              <span>Performance Trends</span>
            </h2>
            <p className="text-gray-600 text-sm mt-1">30-day blockchain-verified performance metrics</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
                <div className="text-sm text-gray-600 mb-4">Tip Verification Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94.2%' }} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">847</div>
                <div className="text-sm text-gray-600 mb-4">Smart Contracts Executed</div>
                <div className="flex items-center justify-center space-x-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+23% this month</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2.1s</div>
                <div className="text-sm text-gray-600 mb-4">Avg. Blockchain Confirmation</div>
                <div className="flex items-center justify-center space-x-1 text-sm text-purple-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Optimal performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Peak missing person reports occur between 3-6 PM on weekdays</p>
                <p>• Community response time improves by 34% with blockchain verification</p>
                <p>• Transit hub areas show 23% higher case resolution rates</p>
                <p>• Smart reward distribution increases tip quality by 45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}