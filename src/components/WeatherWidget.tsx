import React from 'react';
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export const WeatherWidget: React.FC = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);

  const weatherData = {
    current: {
      temperature: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: Cloud,
    },
    forecast: [
      { day: 'Today', temp: 24, condition: 'Partly Cloudy', icon: Cloud, rain: 20 },
      { day: 'Tomorrow', temp: 22, condition: 'Rainy', icon: CloudRain, rain: 80 },
      { day: 'Wednesday', temp: 26, condition: 'Sunny', icon: Sun, rain: 5 },
      { day: 'Thursday', temp: 23, condition: 'Cloudy', icon: Cloud, rain: 40 },
      { day: 'Friday', temp: 25, condition: 'Sunny', icon: Sun, rain: 10 },
    ],
  };

  useEffect(() => {
    loadWeatherAlerts();
  }, []);

  const loadWeatherAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('weather_alerts')
        .select('*')
        .eq('active', true)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data) {
        const formattedAlerts = data.map(alert => ({
          type: alert.severity === 'high' ? 'warning' : 'info',
          title: alert.title,
          message: alert.message,
          time: new Date(alert.created_at).toLocaleString(),
          severity: alert.severity,
          location: alert.location,
        }));
        setAlerts(formattedAlerts);
      }
    } catch (error) {
      console.error('Error loading weather alerts:', error);
      // Fallback to static alerts
      setAlerts([
        {
          type: 'warning',
          title: 'Heavy Rain Expected',
          message: 'Heavy rainfall expected tomorrow. Prepare drainage systems and cover sensitive crops.',
          time: '2 hours ago',
        },
        {
          type: 'info',
          title: 'Optimal Planting Conditions',
          message: 'Perfect soil moisture and temperature for planting maize this week.',
          time: '6 hours ago',
        },
      ]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('weather')} Forecast</h2>
        
        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Current Weather</h3>
                <div className="flex items-center space-x-2">
                  <Cloud size={32} />
                  <span className="text-3xl font-bold">{weatherData.current.temperature}°C</span>
                </div>
                <p className="text-blue-100 mt-2">{weatherData.current.condition}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets size={16} />
                  <span className="text-sm">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind size={16} />
                  <span className="text-sm">{weatherData.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Farming Advice</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Thermometer size={16} />
                <span>Good temperature for crop growth</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets size={16} />
                <span>Moderate humidity - ideal conditions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind size={16} />
                <span>Light winds - safe for spraying</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="font-medium text-gray-800 mb-2">{day.day}</p>
                  <Icon size={32} className="mx-auto mb-2 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-800">{day.temp}°C</p>
                  <p className="text-sm text-gray-600 mb-1">{day.condition}</p>
                  <p className="text-xs text-blue-600">{day.rain}% rain</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather Alerts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' || alert.severity === 'high'
                    ? 'bg-orange-50 border-orange-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                      {alert.location && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {alert.location}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};