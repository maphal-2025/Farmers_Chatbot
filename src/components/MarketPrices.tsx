import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MarketItem {
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
  category: 'grain' | 'vegetable' | 'export';
}

export const MarketPrices: React.FC = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState<'all' | 'grain' | 'vegetable' | 'export'>('all');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const marketData: MarketItem[] = [
    { crop: 'Maize', price: 4500, unit: 'ton', change: 5.2, trend: 'up', market: 'Johannesburg', category: 'grain' },
    { crop: 'Wheat', price: 6200, unit: 'ton', change: -2.1, trend: 'down', market: 'Cape Town', category: 'grain' },
    { crop: 'Soybeans', price: 8900, unit: 'ton', change: 3.8, trend: 'up', market: 'Durban', category: 'export' },
    { crop: 'Sunflower', price: 7100, unit: 'ton', change: 1.4, trend: 'up', market: 'Pretoria', category: 'export' },
    { crop: 'Tomatoes', price: 18, unit: 'kg', change: 0, trend: 'stable', market: 'Local Market', category: 'vegetable' },
    { crop: 'Potatoes', price: 12, unit: 'kg', change: 8.5, trend: 'up', market: 'Local Market', category: 'vegetable' },
    { crop: 'Onions', price: 15, unit: 'kg', change: -5.3, trend: 'down', market: 'Local Market', category: 'vegetable' },
    { crop: 'Cabbage', price: 8, unit: 'kg', change: 2.1, trend: 'up', market: 'Local Market', category: 'vegetable' },
    { crop: 'Carrots', price: 14, unit: 'kg', change: 0, trend: 'stable', market: 'Local Market', category: 'vegetable' },
    { crop: 'Sorghum', price: 3200, unit: 'ton', change: 4.0, trend: 'up', market: 'Bloemfontein', category: 'grain' },
  ];

  const filtered = activeCategory === 'all' ? marketData : marketData.filter(d => d.category === activeCategory);
  const highlights = marketData.slice(0, 4);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-emerald-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  const getCategoryEmoji = (category: string) => {
    if (category === 'grain') return '🌾';
    if (category === 'vegetable') return '🥦';
    return '📦';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{getCategoryEmoji(item.category)}</span>
              {getTrendIcon(item.trend)}
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{item.crop}</p>
            <p className="text-2xl font-bold text-gray-900">
              R{item.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-500 ml-1">/{item.unit}</span>
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-sm font-semibold ${getTrendColor(item.trend)}`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
              <span className="text-xs text-gray-400">{item.market}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Market Prices</h2>
              <p className="text-sm text-gray-500 mt-1">Live agricultural commodity prices</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <div className="text-gray-500">Updated</div>
                <div className="font-bold text-green-600">
                  {currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700 font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-4">
            {(['all', 'grain', 'vegetable', 'export'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Markets' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Commodity</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Change</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Market</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getCategoryEmoji(item.category)}</span>
                      <span className="font-semibold text-gray-900">{item.crop}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-gray-900">R{item.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">/{item.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold text-sm ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{item.market}</td>
                  <td className="px-6 py-4 text-center">{getTrendIcon(item.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Market insights */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} className="text-green-700" />
            <h4 className="font-semibold text-green-800">Market Insights</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-700">
            {[
              'Maize prices up 5.2% driven by strong export demand',
              'Wheat prices declined slightly due to increased supply',
              'Potatoes showing strong weekly gains — best time to sell',
              'Soybeans trending higher with global oilseed demand',
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-green-500 font-bold mt-0.5">•</span>
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
