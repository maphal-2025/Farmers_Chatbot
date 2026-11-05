import React from 'react';
import { MessageCircle, Cloud, TrendingUp, Heart, FileText } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const primaryTabs = [
  { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'market', label: 'Market', icon: TrendingUp },
  { id: 'livestock', label: 'Livestock', icon: Heart },
  { id: 'schemes', label: 'Schemes', icon: FileText },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {primaryTabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all min-w-0 flex-1"
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-green-600' : ''}`}>
                <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
              </div>
              <span className={`text-xs font-medium truncate ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
