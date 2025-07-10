import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WeatherWidget } from './components/WeatherWidget';
import { MarketPrices } from './components/MarketPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { LivestockManagement } from './components/LivestockManagement';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'weather' | 'market' | 'schemes' | 'livestock'>('chat');

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
        </main>
      </div>
        </div>
    </LanguageProvider>
  );
}

export default App;