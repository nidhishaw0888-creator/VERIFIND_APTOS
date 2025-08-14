import React from 'react';
import { Shield, Users, Search, Award, ChevronRight } from 'lucide-react';
import type { UserRole } from '../App';

interface HeroProps {
  onRoleSelect: (role: UserRole) => void;
}

export function Hero({ onRoleSelect }: HeroProps) {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain-Verified Cases',
      description: 'Immutable, cryptographically secured case records with tamper-proof timestamps'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Real-time alerts to verified community members in affected areas'
    },
    {
      icon: Search,
      title: 'Immutable Tips',
      description: 'Blockchain-verified citizen reports with GPS coordinates and media hashes'
    },
    {
      icon: Award,
      title: 'Smart Rewards',
      description: 'Automated cryptocurrency bounties through transparent smart contracts'
    }
  ];

  const roleCards = [
    {
      role: 'law_enforcement' as UserRole,
      title: 'Law Enforcement Portal',
      description: 'Register cases, verify tips, manage investigations with full blockchain transparency',
      color: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100'
    },
    {
      role: 'family' as UserRole,
      title: 'Family Member Portal',
      description: 'Submit missing person cases, track progress, receive real-time updates',
      color: 'border-teal-200 hover:border-teal-400 hover:shadow-teal-100'
    },
    {
      role: 'community' as UserRole,
      title: 'Community Member Portal',
      description: 'Receive alerts, submit tips, earn rewards for verified contributions',
      color: 'border-orange-200 hover:border-orange-400 hover:shadow-orange-100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="h-4 w-4" />
              <span>World's First Blockchain-Verified Missing Person Network</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Find Them
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Faster
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionary missing person recovery through immutable blockchain verification, 
              community mobilization, and cryptographic evidence preservation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powered by Blockchain Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every case, tip, and reward is cryptographically verified and permanently stored 
              on the blockchain for unprecedented transparency and trust.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Portal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access role-specific features designed for your unique needs in the 
              missing person recovery ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {roleCards.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 ${card.color} transition-all duration-300 hover:shadow-lg cursor-pointer group`}
                onClick={() => onRoleSelect(card.role)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Enter Portal</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Network Monitoring</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300">Blockchain Verified</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">Global</div>
              <div className="text-gray-300">Community Network</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">Instant</div>
              <div className="text-gray-300">Alert Distribution</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}