import React, { useState } from 'react';
import { Cog as Cow, Sheet as Sheep, Bird, Heart, TrendingUp, Calendar, AlertTriangle, Plus, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<'overview' | 'records' | 'health' | 'market'>('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const livestockData = [
    {
      id: '1',
      type: 'cattle' as const,
      name: 'Bessie',
      age: 3,
      weight: 450,
      health: 'excellent' as const,
      lastCheckup: '2024-01-15',
      vaccinations: ['FMD', 'Anthrax', 'Blackleg'],
      notes: 'Pregnant, due in 3 months'
    },
    {
      id: '2',
      type: 'sheep' as const,
      name: 'Woolly',
      age: 2,
      weight: 65,
      health: 'good' as const,
      lastCheckup: '2024-01-10',
      vaccinations: ['CDT', 'Rabies'],
      notes: 'Ready for shearing'
    },
    {
      id: '3',
      type: 'chickens' as const,
      name: 'Flock A',
      age: 1,
      weight: 2.5,
      health: 'good' as const,
      lastCheckup: '2024-01-20',
      vaccinations: ['Newcastle', 'Marek\'s'],
      notes: '25 birds, good egg production'
    }
  ];

  const marketPrices = [
    { type: 'Cattle', price: 45, unit: 'kg live weight', change: 3.2 },
    { type: 'Sheep', price: 55, unit: 'kg live weight', change: -1.5 },
    { type: 'Goats', price: 50, unit: 'kg live weight', change: 2.1 },
    { type: 'Chickens', price: 35, unit: 'kg live weight', change: 1.8 },
    { type: 'Pigs', price: 40, unit: 'kg live weight', change: 0.5 },
    { type: 'Eggs', price: 45, unit: 'dozen', change: 5.2 },
    { type: 'Milk', price: 8, unit: 'liter', change: 2.3 }
  ];

  const healthAlerts = [
    {
      type: 'vaccination',
      message: 'Cattle vaccination due in 2 weeks',
      severity: 'medium',
      date: '2024-02-15'
    },
    {
      type: 'checkup',
      message: 'Sheep health checkup overdue',
      severity: 'high',
      date: '2024-01-25'
    },
    {
      type: 'breeding',
      message: 'Breeding season starts next month',
      severity: 'low',
      date: '2024-03-01'
    }
  ];

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case 'cattle':
        return <Cow size={24} className="text-brown-600" />;
      case 'sheep':
      case 'goats':
        return <Sheep size={24} className="text-gray-600" />;
      case 'chickens':
        return <Bird size={24} className="text-orange-600" />;
      default:
        return <Cow size={24} className="text-gray-600" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-400 bg-red-50';
      case 'medium':
        return 'border-yellow-400 bg-yellow-50';
      case 'low':
        return 'border-blue-400 bg-blue-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Livestock Management</h2>
              <p className="text-amber-100 mt-2">Monitor and manage your livestock health, breeding, and productivity</p>
            </div>
            <div className="text-right text-amber-100">
              <div className="text-sm opacity-90">
                {currentTime.toLocaleDateString('en-ZA', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="font-bold">
                {currentTime.toLocaleTimeString('en-ZA', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview', icon: Heart },
              { key: 'records', label: 'Animal Records', icon: Cow },
              { key: 'health', label: 'Health Alerts', icon: AlertTriangle },
              { key: 'market', label: 'Market Prices', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeSection === tab.key
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Animals</p>
                      <p className="text-2xl font-bold text-blue-800">127</p>
                    </div>
                    <Cow size={32} className="text-blue-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Healthy Animals</p>
                      <p className="text-2xl font-bold text-green-800">119</p>
                    </div>
                    <Heart size={32} className="text-green-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Need Attention</p>
                      <p className="text-2xl font-bold text-yellow-800">8</p>
                    </div>
                    <AlertTriangle size={32} className="text-yellow-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-purple-800">R45,200</p>
                    </div>
                    <TrendingUp size={32} className="text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-700">Vaccination scheduled for Cattle Herd A - Feb 15</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Heart size={16} className="text-green-600" />
                    <span className="text-sm text-gray-700">Health checkup completed for Sheep Flock B - Jan 20</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <TrendingUp size={16} className="text-purple-600" />
                    <span className="text-sm text-gray-700">Milk production increased by 12% this month</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Animal Records Section */}
          {activeSection === 'records' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Animal Records</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <Plus size={18} />
                  <span>Add Animal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {livestockData.map((animal) => (
                  <div key={animal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getAnimalIcon(animal.type)}
                        <div>
                          <h4 className="font-semibold text-gray-800">{animal.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{animal.type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(animal.health)}`}>
                        {animal.health}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span className="font-medium">{animal.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">{animal.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Checkup:</span>
                        <span className="font-medium">{animal.lastCheckup}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Vaccinations:</p>
                      <div className="flex flex-wrap gap-1">
                        {animal.vaccinations.map((vaccine, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {vaccine}
                          </span>
                        ))}
                      </div>
                    </div>

                    {animal.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Notes:</p>
                        <p className="text-xs text-gray-800">{animal.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-2 mt-4">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Alerts Section */}
          {activeSection === 'health' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Health Alerts & Reminders</h3>
              
              <div className="space-y-4">
                {healthAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle size={16} className="text-gray-600" />
                          <h4 className="font-semibold text-gray-800 capitalize">{alert.type} Alert</h4>
                        </div>
                        <p className="text-gray-600">{alert.message}</p>
                      </div>
                      <span className="text-xs text-gray-500">{alert.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Health Management Tips</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Schedule regular health checkups every 3-6 months</li>
                  <li>• Keep vaccination records up to date</li>
                  <li>• Monitor feed quality and water sources daily</li>
                  <li>• Isolate sick animals immediately to prevent disease spread</li>
                  <li>• Maintain clean and dry living conditions</li>
                </ul>
              </div>
            </div>
          )}

          {/* Market Prices Section */}
          {activeSection === 'market' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Livestock Market Prices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{item.type}</h4>
                      <TrendingUp size={16} className={item.change >= 0 ? 'text-green-500' : 'text-red-500'} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      R{item.price}
                      <span className="text-sm font-normal text-gray-600">/{item.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                      <span className="text-xs text-gray-500">vs last week</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-3">Market Insights</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Cattle prices are up 3.2% due to increased demand for beef</li>
                  <li>• Egg prices showing strong growth - good time to expand poultry</li>
                  <li>• Milk prices stable with slight upward trend</li>
                  <li>• Sheep prices down slightly due to seasonal factors</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};