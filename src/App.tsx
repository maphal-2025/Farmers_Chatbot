import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChatInterface } from './components/ChatInterface';
import { WeatherWidget } from './components/WeatherWidget';
import { MarketPrices } from './components/MarketPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { LivestockManagement } from './components/LivestockManagement';
import { LanguageProvider } from './contexts/LanguageContext';
import { WhatsAppSupport } from './components/WhatsAppSupport';
import { SeedSuppliers } from './components/SeedSuppliers';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { PromoBanner } from './components/PromoBanner';

type Tab = 'chat' | 'weather' | 'market' | 'livestock' | 'schemes' | 'whatsapp' | 'suppliers';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <img src="/farm.webp" alt="AgriAssist" className="w-12 h-12 object-cover rounded-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">AgriAssist</h1>
          <p className="text-green-200 text-sm mb-6">Smart Farming Assistant</p>
          <div className="flex justify-center gap-1.5">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!user && !showAuth) {
    return (
      <LanguageProvider>
        <LandingPage onGetStarted={() => setShowAuth(true)} />
      </LanguageProvider>
    );
  }

  if (!user) {
    return (
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <PromoBanner />
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 lg:pb-6">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'weather' && <WeatherWidget />}
          {activeTab === 'market' && <MarketPrices />}
          {activeTab === 'livestock' && <LivestockManagement />}
          {activeTab === 'schemes' && <GovernmentSchemes />}
          {activeTab === 'whatsapp' && <WhatsAppSupport />}
          {activeTab === 'suppliers' && <SeedSuppliers />}
        </main>

        {/* Mobile bottom nav */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </LanguageProvider>
  );
}

export default App;
