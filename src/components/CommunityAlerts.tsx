import React, { useState } from 'react';
import { Bell, MapPin, Clock, Users, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import type { UserRole } from '../App';

interface CommunityAlertsProps {
  userRole: UserRole;
}

interface Alert {
  id: string;
  caseId: string;
  caseName: string;
  age: number;
  description: string;
  location: string;
  radius: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved';
  responders: number;
}

export function CommunityAlerts({ userRole }: CommunityAlertsProps) {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const alerts: Alert[] = [
    {
      id: 'alert_001',
      caseId: '001',
      caseName: 'Sarah Johnson',
      age: 24,
      description: 'Last seen downtown area, blue jacket, black jeans',
      location: 'Downtown Metro Area',
      radius: 5,
      timestamp: '2024-01-16 18:30',
      priority: 'high',
      status: 'active',
      responders: 234
    },
    {
      id: 'alert_002',
      caseId: '003',
      caseName: 'Emma Rodriguez',
      age: 31,
      description: 'PhD student, last seen at university library',
      location: 'University Campus',
      radius: 3,
      timestamp: '2024-01-15 22:15',
      priority: 'high',
      status: 'active',
      responders: 187
    },
    {
      id: 'alert_003',
      caseId: '002',
      caseName: 'Michael Chen',
      age: 16,
      description: 'Found safe with relatives, case resolved',
      location: 'Riverside District',
      radius: 4,
      timestamp: '2024-01-14 16:45',
      priority: 'medium',
      status: 'resolved',
      responders: 156
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Alerts</h1>
          <p className="text-gray-600">Real-time, location-based notifications for your area</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-green-600">1</div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-600">Resolved Today</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-blue-600">421</div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-600">Active Responders</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-purple-600">12km</div>
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-600">Coverage Radius</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter alerts:</span>
            </div>
            <div className="flex gap-4">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Bell className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {alert.caseName}, {alert.age}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{alert.timestamp}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{alert.responders} responders</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(alert.priority)}`}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{alert.description}</p>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <strong>Alert Radius:</strong> {alert.radius}km from last known location
                  </div>
                  {alert.status === 'active' && (
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        I'm Responding
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Submit Tip
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">No alerts match your current filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}