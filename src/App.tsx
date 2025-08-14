import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { CaseRegistry } from './components/CaseRegistry';
import { TipSubmission } from './components/TipSubmission';
import { CommunityAlerts } from './components/CommunityAlerts';
import { Analytics } from './components/Analytics';
import { Footer } from './components/Footer';
import {WalletSelector} from "@aptos-labs/wallet-adapter-ant-design"
export type UserRole = 'visitor' | 'law_enforcement' | 'family' | 'community';
export type ActiveSection = 'home' | 'dashboard' | 'cases' | 'tips' | 'alerts' | 'analytics';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const renderContent = () => {
    if (userRole === 'visitor') {
      return <Hero onRoleSelect={setUserRole} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'cases':
        return <CaseRegistry userRole={userRole} />;
      case 'tips':
        return <TipSubmission userRole={userRole} />;
      case 'alerts':
        return <CommunityAlerts userRole={userRole} />;
      case 'analytics':
        return <Analytics userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <WalletSelector/>

      <Header 
        userRole={userRole} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={() => {
          setUserRole('visitor');
          setActiveSection('home');
        }}
      />
      
      <main className="relative">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;