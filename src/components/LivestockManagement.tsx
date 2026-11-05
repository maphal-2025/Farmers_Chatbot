import React, { useState, useEffect } from 'react';
import { Beef, Bird, Heart, TrendingUp, TrendingDown, Calendar, AlertTriangle, Plus, Pencil, Trash2, Activity, DollarSign } from 'lucide-react';

interface LivestockRecord {
  id: string;
  type: 'cattle' | 'sheep' | 'goats' | 'chickens' | 'pigs';
  name: string;
  age: number;
  weight: number;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  lastCheckup: string;
  vaccinations: string[];
  notes: string;
}

export const LivestockManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'records' | 'health' | 'market'>('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const livestockData: LivestockRecord[] = [
    {
      id: '1',
      type: 'cattle',
      name: 'Bessie',
      age: 3,
      weight: 450,
      health: 'excellent',
      lastCheckup: '2024-01-15',
      vaccinations: ['FMD', 'Anthrax', 'Blackleg'],
      notes: 'Pregnant, due in 3 months',
    },
    {
      id: '2',
      type: 'sheep',
      name: 'Woolly',
      age: 2,
      weight: 65,
      health: 'good',
      lastCheckup: '2024-01-10',
      vaccinations: ['CDT', 'Rabies'],
      notes: 'Ready for shearing',
    },
    {
      id: '3',
      type: 'chickens',
      name: 'Flock A',
      age: 1,
      weight: 2.5,
      health: 'good',
      lastCheckup: '2024-01-20',
      vaccinations: ['Newcastle', "Marek's"],
      notes: '25 birds, good egg production',
    },
    {
      id: '4',
      type: 'goats',
      name: 'Billy',
      age: 4,
      weight: 72,
      health: 'fair',
      lastCheckup: '2023-12-15',
      vaccinations: ['CDT'],
      notes: 'Needs deworming soon',
    },
  ];

  const marketPrices = [
    { type: 'Cattle', price: 45, unit: 'kg live', change: 3.2 },
    { type: 'Sheep', price: 55, unit: 'kg live', change: -1.5 },
    { type: 'Goats', price: 50, unit: 'kg live', change: 2.1 },
    { type: 'Chickens', price: 35, unit: 'kg live', change: 1.8 },
    { type: 'Pigs', price: 40, unit: 'kg live', change: 0.5 },
    { type: 'Eggs', price: 45, unit: 'dozen', change: 5.2 },
    { type: 'Milk', price: 8, unit: 'litre', change: 2.3 },
  ];

  const healthAlerts = [
    { type: 'checkup', message: 'Sheep health checkup overdue by 5 days', severity: 'high', date: '2024-01-25' },
    { type: 'vaccination', message: 'Cattle FMD vaccination due in 2 weeks', severity: 'medium', date: '2024-02-15' },
    { type: 'deworming', message: 'Billy (Goat) needs deworming this week', severity: 'medium', date: '2024-02-10' },
    { type: 'breeding', message: 'Breeding season starts next month', severity: 'low', date: '2024-03-01' },
  ];

  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case 'cattle': return '🐄';
      case 'sheep': return '🐑';
      case 'goats': return '🐐';
      case 'chickens': return '🐔';
      case 'pigs': return '🐷';
      default: return '🐾';
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-emerald-700 bg-emerald-100 border border-emerald-200';
      case 'good': return 'text-blue-700 bg-blue-100 border border-blue-200';
      case 'fair': return 'text-amber-700 bg-amber-100 border border-amber-200';
      case 'poor': return 'text-red-700 bg-red-100 border border-red-200';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-4 border-red-500 bg-red-50';
      case 'medium': return 'border-l-4 border-amber-500 bg-amber-50';
      case 'low': return 'border-l-4 border-blue-500 bg-blue-50';
      default: return 'border-l-4 border-gray-400 bg-gray-50';
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: Activity },
    { key: 'records', label: 'Animals', icon: Beef },
    { key: 'health', label: 'Health', icon: Heart },
    { key: 'market', label: 'Prices', icon: DollarSign },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Livestock Management</h2>
              <p className="text-amber-100 text-sm mt-1">Monitor health, breeding, and productivity</p>
            </div>
            <div className="text-right text-amber-100 text-sm">
              <div className="opacity-90">
                {currentTime.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div className="font-bold text-white">
                {currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex px-6 overflow-x-auto">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === key
                    ? 'border-amber-500 text-amber-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Animals', value: '127', color: 'blue', icon: Beef },
                  { label: 'Healthy', value: '119', color: 'green', icon: Heart },
                  { label: 'Need Attention', value: '8', color: 'amber', icon: AlertTriangle },
                  { label: 'Monthly Revenue', value: 'R45,200', color: 'emerald', icon: TrendingUp },
                ].map(({ label, value, color, icon: Icon }) => (
                  <div key={label} className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl p-4 border border-${color}-200`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-xs font-semibold text-${color}-600 uppercase tracking-wide`}>{label}</p>
                      <Icon size={18} className={`text-${color}-500`} />
                    </div>
                    <p className={`text-2xl font-bold text-${color}-800`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Herd Composition */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Herd Composition</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Cattle', count: 45, pct: 35, emoji: '🐄' },
                    { type: 'Sheep', count: 38, pct: 30, emoji: '🐑' },
                    { type: 'Chickens', count: 25, pct: 20, emoji: '🐔' },
                    { type: 'Goats', count: 19, pct: 15, emoji: '🐐' },
                  ].map(({ type, count, pct, emoji }) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 flex items-center gap-2">
                          <span>{emoji}</span>{type}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">{count} animals</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { icon: Calendar, color: 'blue', text: 'Vaccination scheduled for Cattle Herd A — Feb 15' },
                    { icon: Heart, color: 'green', text: 'Health checkup completed for Sheep Flock B — Jan 20' },
                    { icon: TrendingUp, color: 'emerald', text: 'Milk production increased by 12% this month' },
                  ].map(({ icon: Icon, color, text }, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Icon size={16} className={`text-${color}-600 flex-shrink-0`} />
                      <span className="text-sm text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Animal Records */}
          {activeSection === 'records' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Animal Records</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium">
                  <Plus size={16} />
                  Add Animal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {livestockData.map((animal) => (
                  <div key={animal.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl">
                          {getAnimalEmoji(animal.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{animal.name}</h4>
                          <p className="text-sm text-gray-500 capitalize">{animal.type}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getHealthBadge(animal.health)}`}>
                        {animal.health}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Age', value: `${animal.age}y` },
                        { label: 'Weight', value: `${animal.weight}kg` },
                        { label: 'Checkup', value: animal.lastCheckup.slice(5) },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="text-sm font-semibold text-gray-800">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1.5">Vaccinations</p>
                      <div className="flex flex-wrap gap-1">
                        {animal.vaccinations.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {animal.notes && (
                      <p className="text-xs text-gray-600 bg-amber-50 rounded-lg p-2 border border-amber-100">
                        {animal.notes}
                      </p>
                    )}

                    <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Alerts */}
          {activeSection === 'health' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Health Alerts & Reminders</h3>
              <div className="space-y-3">
                {healthAlerts.map((alert, i) => (
                  <div key={i} className={`rounded-xl p-4 ${getSeverityStyle(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className={
                          alert.severity === 'high' ? 'text-red-600 mt-0.5' :
                          alert.severity === 'medium' ? 'text-amber-600 mt-0.5' : 'text-blue-600 mt-0.5'
                        } />
                        <div>
                          <p className="font-semibold text-gray-800 capitalize text-sm">{alert.type} Alert</p>
                          <p className="text-gray-600 text-sm mt-0.5">{alert.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{alert.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h4 className="font-semibold text-blue-900 mb-3">Health Management Best Practices</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  {[
                    'Schedule health checkups every 3–6 months per animal type',
                    'Keep vaccination records current and digitally backed up',
                    'Monitor feed quality and water sources daily',
                    'Isolate sick animals immediately to prevent disease spread',
                    'Maintain clean, dry living conditions for all livestock',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Market Prices */}
          {activeSection === 'market' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Livestock Market Prices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{item.type}</h4>
                      {item.change >= 0
                        ? <TrendingUp size={18} className="text-green-500" />
                        : <TrendingDown size={18} className="text-red-500" />}
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-0.5">
                      R{item.price}
                      <span className="text-sm font-normal text-gray-500">/{item.unit}</span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                      <span className="text-xs text-gray-400">vs last week</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                <h4 className="font-semibold text-green-900 mb-3">Market Insights</h4>
                <ul className="text-sm text-green-800 space-y-2">
                  {[
                    'Cattle prices up 3.2% — strong export and domestic demand',
                    'Egg prices showing strongest growth — good time to expand poultry',
                    'Milk prices stable with a slight upward trend this quarter',
                    'Sheep prices down slightly due to seasonal supply increase',
                  ].map((insight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-0.5">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
