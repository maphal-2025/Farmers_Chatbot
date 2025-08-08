import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WeatherWidget } from './components/WeatherWidget';
import { MarketPrices } from './components/MarketPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { LivestockManagement } from './components/LivestockManagement';
import { LanguageProvider } from './contexts/LanguageContext';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { WhatsAppSupport } from './components/WhatsAppSupport';
import { SeedSuppliers } from './components/SeedSuppliers';
import { LoginPage } from './components/LoginPage';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'weather' | 'market' | 'schemes' | 'livestock' | 'whatsapp' | 'suppliers'>('chat');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AgriAssist...</p>
        </div>
      </div>
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
      <div 
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative"
        style={{
          backgroundImage: 'url(/FB_IMG_1752006509141.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-85"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-6">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'weather' && <WeatherWidget />}
          {activeTab === 'market' && <MarketPrices />}
          {activeTab === 'schemes' && <GovernmentSchemes />}
          {activeTab === 'livestock' && <LivestockManagement />}
          {activeTab === 'whatsapp' && <WhatsAppSupport />}
          {activeTab === 'suppliers' && <SeedSuppliers />}
        </main>
      </div>
        </div>
        
        {/* Global WhatsApp Widget - only show on non-chat pages */}
        {activeTab !== 'chat' && activeTab !== 'whatsapp' && <WhatsAppWidget />}
    </LanguageProvider>
  );
}

export default App;