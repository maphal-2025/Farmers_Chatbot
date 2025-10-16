import React from 'react';
import { useState, useEffect } from 'react';
import { Sprout, MessageCircle, TrendingUp, Users, FileText, Cog as Cow, MapPin } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'chat', label: t.chat, icon: MessageCircle },
    { id: 'weather', label: t.weather, icon: Sprout },
    { id: 'market', label: t.marketPrices, icon: TrendingUp },
    { id: 'livestock', label: t.livestock, icon: Cow },
    { id: 'schemes', label: t.governmentSchemes, icon: FileText },
    { id: 'whatsapp', label: 'WhatsApp Support', icon: MessageCircle },
    { id: 'suppliers', label: 'Seed Suppliers', icon: MapPin },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/farm.webp" 
              alt="Farm Logo" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">AgriAssist</h1>
              <p className="text-xs text-gray-500">{t.smartFarmingAssistant}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end text-sm">
              <div className="text-gray-600 font-medium">
                {currentTime.toLocaleDateString('en-ZA', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-green-600 font-bold">
                {currentTime.toLocaleTimeString('en-ZA', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 pt-2 pb-3">
          <div className="flex justify-center mb-2">
            <div className="text-center text-sm">
              <div className="text-gray-600">
                {currentTime.toLocaleDateString('en-ZA', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-green-600 font-bold">
                {currentTime.toLocaleTimeString('en-ZA', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};