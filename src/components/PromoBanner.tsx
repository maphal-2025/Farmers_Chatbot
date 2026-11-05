import React, { useState } from 'react';
import { Gift, X, Share2 } from 'lucide-react';

const STORAGE_KEY = 'agriassist:promo-banner-dismissed';

export const PromoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  };

  const share = async () => {
    const shareData = {
      title: 'AgriAssist — Smart Farming Assistant',
      text: 'Free AI farming advice, weather, market prices, and expert WhatsApp support for South African farmers.',
      url: window.location.origin,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      navigator.clipboard?.writeText(`${shareData.text} ${shareData.url}`);
      alert('Link copied to clipboard — share it with your fellow farmers!');
    }
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Gift size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium truncate">
              <span className="font-bold">Refer a farmer.</span>
              <span className="hidden sm:inline text-green-100"> Help grow our community — share AgriAssist with a friend today.</span>
              <span className="sm:hidden text-green-100"> Share with a friend.</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={share}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              <Share2 size={13} />
              Share
            </button>
            <button
              onClick={dismiss}
              className="p-1 text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
