import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const MarketPrices: React.FC = () => {
  const { t } = useLanguage();

  const marketData = [
    {
      crop: 'Maize',
      price: 4500,
      unit: 'ton',
      change: 5.2,
      trend: 'up',
      market: 'Johannesburg',
    },
    {
      crop: 'Wheat',
      price: 6200,
      unit: 'ton',
      change: -2.1,
      trend: 'down',
      market: 'Cape Town',
    },
    {
      crop: 'Soybeans',
      price: 8900,
      unit: 'ton',
      change: 3.8,
      trend: 'up',
      market: 'Durban',
    },
    {
      crop: 'Tomatoes',
      price: 18,
      unit: 'kg',
      change: 0,
      trend: 'stable',
      market: 'Local Market',
    },
    {
      crop: 'Potatoes',
      price: 12,
      unit: 'kg',
      change: 8.5,
      trend: 'up',
      market: 'Local Market',
    },
    {
      crop: 'Onions',
      price: 15,
      unit: 'kg',
      change: -5.3,
      trend: 'down',
      market: 'Local Market',
    },
    {
      crop: 'Cabbage',
      price: 8,
      unit: 'kg',
      change: 2.1,
      trend: 'up',
      market: 'Local Market',
    },
    {
      crop: 'Carrots',
      price: 14,
      unit: 'kg',
      change: 0,
      trend: 'stable',
      market: 'Local Market',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('marketPrices')}</h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {marketData.slice(0, 4).map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{item.crop}</h3>
                {getTrendIcon(item.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                R{item.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-600">/{item.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
                <span className="text-xs text-gray-500">{item.market}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Market Report</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 font-semibold text-gray-700">Crop</th>
                  <th className="pb-3 font-semibold text-gray-700">Price</th>
                  <th className="pb-3 font-semibold text-gray-700">Change</th>
                  <th className="pb-3 font-semibold text-gray-700">Market</th>
                  <th className="pb-3 font-semibold text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-3 font-medium text-gray-800">{item.crop}</td>
                    <td className="py-3 text-gray-800">
                      R{item.price.toLocaleString()}/{item.unit}
                    </td>
                    <td className={`py-3 font-medium ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </td>
                    <td className="py-3 text-gray-600">{item.market}</td>
                    <td className="py-3">{getTrendIcon(item.trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">Market Insights</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maize prices are up 5.2% due to strong export demand</li>
            <li>• Wheat prices declined slightly due to increased supply</li>
            <li>• Vegetable prices remain stable with seasonal variations</li>
            <li>• Best time to sell potatoes - prices up 8.5% this week</li>
          </ul>
        </div>
      </div>
    </div>
  );
};