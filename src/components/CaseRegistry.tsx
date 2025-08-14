import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, MapPin, Clock, User, Shield } from 'lucide-react';
import type { UserRole } from '../App';

interface CaseRegistryProps {
  userRole: UserRole;
}

interface Case {
  id: string;
  name: string;
  age: number;
  status: 'active' | 'resolved' | 'closed';
  location: string;
  date: string;
  description: string;
  reward: number;
  tips: number;
  blockchainHash: string;
  submitter: string;
}

export function CaseRegistry({ userRole }: CaseRegistryProps) {
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockCases: Case[] = [
    {
      id: '001',
      name: 'Sarah Johnson',
      age: 24,
      status: 'active',
      location: 'Downtown Metro Area',
      date: '2024-01-15',
      description: 'Last seen leaving work at 6:30 PM, wearing blue jacket and black jeans',
      reward: 1000,
      tips: 23,
      blockchainHash: '0x8f7a2b4c9d1e3f6a8b9c2d4e5f7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
      submitter: 'Metro Police Department'
    },
    {
      id: '002',
      name: 'Michael Chen',
      age: 16,
      status: 'resolved',
      location: 'Riverside District',
      date: '2024-01-10',
      description: 'Missing after school basketball practice, found safe with relatives',
      reward: 500,
      tips: 12,
      blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
      submitter: 'Family Member'
    },
    {
      id: '003',
      name: 'Emma Rodriguez',
      age: 31,
      status: 'active',
      location: 'University Campus',
      date: '2024-01-12',
      description: 'PhD student, last seen at library, vehicle found in parking lot',
      reward: 2000,
      tips: 45,
      blockchainHash: '0x3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
      submitter: 'University Police'
    }
  ];

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const canCreateCase = userRole === 'law_enforcement' || userRole === 'family';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Registry</h1>
            <p className="text-gray-600">Blockchain-verified missing person cases with immutable records</p>
          </div>
          {canCreateCase && (
            <button
              onClick={() => setShowNewCaseForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Case</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cases by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCases.map((case_) => (
            <div key={case_.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{case_.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Age {case_.age}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{case_.location}</span>
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(case_.status)}`}>
                    {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{case_.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Reward Pool</div>
                    <div className="text-lg font-semibold text-green-600">${case_.reward}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Tips Received</div>
                    <div className="text-lg font-semibold text-blue-600">{case_.tips}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Reported {case_.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Blockchain Verified</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 font-mono">
                    Hash: {case_.blockchainHash.substring(0, 20)}...
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* New Case Form Modal */}
        {showNewCaseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Register New Case</h2>
                <p className="text-gray-600 mt-1">All information will be cryptographically secured on the blockchain</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter missing person's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Age"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Known Location</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter last known location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the circumstances and any identifying information..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reward Pool ($)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter reward amount"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewCaseForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewCaseForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register Case
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}