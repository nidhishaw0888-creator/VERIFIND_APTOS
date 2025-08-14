import React, { useState } from 'react';
import { Search, MapPin, Camera, Upload, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import type { UserRole } from '../App';

interface TipSubmissionProps {
  userRole: UserRole;
}

interface Tip {
  id: string;
  caseId: string;
  caseName: string;
  description: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'verified' | 'rejected';
  reward: number;
  blockchainHash: string;
}

export function TipSubmission({ userRole }: TipSubmissionProps) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState('');

  const availableCases = [
    { id: '001', name: 'Sarah Johnson', reward: 1000 },
    { id: '003', name: 'Emma Rodriguez', reward: 2000 }
  ];

  const myTips: Tip[] = [
    {
      id: 'tip_001',
      caseId: '001',
      caseName: 'Sarah Johnson',
      description: 'Saw someone matching the description at Central Station around 8 PM',
      location: '40.7128, -74.0060',
      timestamp: '2024-01-16 20:15',
      status: 'verified',
      reward: 50,
      blockchainHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'
    },
    {
      id: 'tip_002',
      caseId: '003',
      caseName: 'Emma Rodriguez',
      description: 'Vehicle matching description seen in university parking garage',
      location: '40.7589, -73.9851',
      timestamp: '2024-01-15 14:30',
      status: 'pending',
      reward: 0,
      blockchainHash: 'Pending blockchain confirmation...'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const canSubmitTips = userRole === 'community' || userRole === 'family';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Submission</h1>
            <p className="text-gray-600">Submit immutable, blockchain-verified tips and earn rewards</p>
          </div>
          {canSubmitTips && (
            <button
              onClick={() => setShowSubmitForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Submit Tip</span>
            </button>
          )}
        </div>

        {/* Active Cases for Tips */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Cases Seeking Tips</h2>
            <p className="text-gray-600 text-sm mt-1">Earn cryptocurrency rewards for verified information</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {availableCases.map((case_) => (
                <div key={case_.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{case_.name}</h3>
                    <div className="flex items-center space-x-2 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="font-medium">${case_.reward}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Submit verified tips to earn rewards from the smart contract reward pool
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCase(case_.id);
                      setShowSubmitForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Submit Tip →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Tips */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Submitted Tips</h2>
            <p className="text-gray-600 text-sm mt-1">Track your contributions and rewards</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {myTips.map((tip) => (
                <div key={tip.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.caseName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tip.timestamp}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tip.location}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {tip.reward > 0 && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">${tip.reward}</span>
                        </div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tip.status)}`}>
                        {tip.status.charAt(0).toUpperCase() + tip.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{tip.description}</p>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Blockchain Hash: </span>
                      <span className="font-mono text-xs">{tip.blockchainHash.substring(0, 20)}...</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Tip Form Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Submit Tip</h2>
                <p className="text-gray-600 mt-1">Your tip will be cryptographically verified and permanently stored</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Case</label>
                    <select
                      value={selectedCase}
                      onChange={(e) => setSelectedCase(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose a case...</option>
                      {availableCases.map((case_) => (
                        <option key={case_.id} value={case_.id}>
                          {case_.name} (${case_.reward} reward)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tip Description</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe what you saw, when, and where. Be as specific as possible..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter location or coordinates"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload photos or videos</p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <h4 className="font-medium text-blue-900 mb-1">Privacy & Security</h4>
                        <p className="text-blue-700">
                          Your tip will be encrypted and hashed before blockchain storage. 
                          Only verified information receives rewards through smart contracts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowSubmitForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSubmitForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Tip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}