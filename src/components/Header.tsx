import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Heart, FileText, MapPin, Cloud, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const allTabs = [
  { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'market', label: 'Market', icon: TrendingUp },
  { id: 'livestock', label: 'Livestock', icon: Heart },
  { id: 'schemes', label: 'Schemes', icon: FileText },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'suppliers', label: 'Suppliers', icon: MapPin },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userInitial = user?.email?.[0]?.toUpperCase() ?? 'F';
  const userEmail = user?.email ?? '';

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
              <img src="/farm.webp" alt="AgriAssist" className="w-full h-full object-cover" />
            </div>
            <span className="text-base font-bold text-gray-900 hidden sm:block">AgriAssist</span>
          </div>

          {/* Desktop nav — primary tabs only */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {allTabs.slice(0, 5).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(u => !u)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  ['whatsapp', 'suppliers'].includes(activeTab)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                More
                <ChevronDown size={13} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
                  {allTabs.slice(5).map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => { handleTabClick(id); setUserMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                        activeTab === id ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: language + user */}
          <div className="flex items-center gap-2">
            <LanguageSelector />

            {/* User avatar (desktop) */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userInitial}
              </div>
              <span className="text-xs text-gray-500 max-w-28 truncate">{userEmail}</span>
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={14} />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-menu (for less-common tabs + sign out) */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">All Sections</p>
              <div className="grid grid-cols-3 gap-2">
                {allTabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleTabClick(id)}
                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {userInitial}
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-40">{userEmail}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 text-sm text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
