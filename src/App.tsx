import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WeatherWidget } from './components/WeatherWidget';
import { MarketPrices } from './components/MarketPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'weather' | 'market' | 'schemes'>('chat');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-6">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'weather' && <WeatherWidget />}
          {activeTab === 'market' && <MarketPrices />}
          {activeTab === 'schemes' && <GovernmentSchemes />}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;