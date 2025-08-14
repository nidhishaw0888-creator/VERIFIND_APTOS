import React from 'react';
import { Shield, Search, Bell, BarChart3, FileText, Users, LogOut } from 'lucide-react';
import type { UserRole, ActiveSection } from '../App';

interface HeaderProps {
  userRole: UserRole;
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  onLogout: () => void;
}

export function Header({ userRole, activeSection, onSectionChange, onLogout }: HeaderProps) {
  if (userRole === 'visitor') {
    return (
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">VeriFind</h1>
            </div>
            <div className="text-sm text-gray-600">
              Blockchain-Verified Missing Person Recovery
            </div>
          </div>
        </div>
      </header>
    );
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'cases', label: 'Cases', icon: FileText },
    { id: 'tips', label: 'Tips', icon: Search },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: Users },
  ];

  const getRoleColor = () => {
    switch (userRole) {
      case 'law_enforcement': return 'text-blue-600 bg-blue-50';
      case 'family': return 'text-teal-600 bg-teal-50';
      case 'community': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'law_enforcement': return 'Law Enforcement';
      case 'family': return 'Family Member';
      case 'community': return 'Community Member';
      default: return 'User';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">VeriFind</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id as ActiveSection)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor()}`}>
              {getRoleLabel()}
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}