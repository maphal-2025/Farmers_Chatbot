import React from 'react';
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, CloudSnow, CloudDrizzle, Sunrise, Sunset, Eye, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export const WeatherWidget: React.FC = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentDayName = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric' });
  };

  const weatherData = {
    current: {
      temperature: 24,
      feelsLike: 26,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NE',
      pressure: 1013,
      visibility: 10,
      uvIndex: 7,
      sunrise: '05:45',
      sunset: '18:30',
      icon: Cloud,
    },
    forecast: [
      { day: getCurrentDayName(0), date: 'Today', temp: 24, tempMin: 18, tempMax: 28, condition: 'Partly Cloudy', icon: Cloud, rain: 20, humidity: 65, wind: 12 },
      { day: getCurrentDayName(1), date: 'Tomorrow', temp: 22, tempMin: 16, tempMax: 24, condition: 'Rainy', icon: CloudRain, rain: 80, humidity: 85, wind: 18 },
      { day: getCurrentDayName(2), date: '', temp: 26, tempMin: 19, tempMax: 30, condition: 'Sunny', icon: Sun, rain: 5, humidity: 55, wind: 8 },
      { day: getCurrentDayName(3), date: '', temp: 23, tempMin: 17, tempMax: 26, condition: 'Cloudy', icon: Cloud, rain: 40, humidity: 70, wind: 14 },
      { day: getCurrentDayName(4), date: '', temp: 25, tempMin: 18, tempMax: 28, condition: 'Sunny', icon: Sun, rain: 10, humidity: 60, wind: 10 },
      { day: getCurrentDayName(5), date: '', temp: 21, tempMin: 15, tempMax: 23, condition: 'Light Rain', icon: CloudDrizzle, rain: 65, humidity: 80, wind: 16 },
      { day: getCurrentDayName(6), date: '', temp: 27, tempMin: 20, tempMax: 31, condition: 'Sunny', icon: Sun, rain: 5, humidity: 50, wind: 9 },
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('weather')} Forecast</h2>
          <div className="text-sm text-gray-500">
            <div className="text-right">
              <div className="font-medium text-gray-700">
                {currentTime.toLocaleDateString('en-ZA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
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
          </div>
        </div>
        
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Thermometer size={24} />
            <span>Current Weather Conditions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-4 mb-4">
                <Cloud size={64} className="text-white" />
                <div>
                  <div className="text-6xl font-bold">{weatherData.current.temperature}°C</div>
                  <div className="text-blue-100 text-sm">Feels like {weatherData.current.feelsLike}°C</div>
                </div>
              </div>
              <p className="text-xl text-blue-50">{weatherData.current.condition}</p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets size={20} className="text-blue-200" />
                  <span className="text-sm text-blue-100">Humidity</span>
                </div>
                <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind size={20} className="text-blue-200" />
                  <span className="text-sm text-blue-100">Wind</span>
                </div>
                <p className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</p>
                <p className="text-xs text-blue-100">{weatherData.current.windDirection}</p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge size={20} className="text-blue-200" />
                  <span className="text-sm text-blue-100">Pressure</span>
                </div>
                <p className="text-2xl font-bold">{weatherData.current.pressure}</p>
                <p className="text-xs text-blue-100">hPa</p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye size={20} className="text-blue-200" />
                  <span className="text-sm text-blue-100">Visibility</span>
                </div>
                <p className="text-2xl font-bold">{weatherData.current.visibility}</p>
                <p className="text-xs text-blue-100">km</p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Sun size={20} className="text-yellow-200" />
                  <span className="text-sm text-blue-100">UV Index</span>
                </div>
                <p className="text-2xl font-bold">{weatherData.current.uvIndex}</p>
                <p className="text-xs text-blue-100">High</p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <Sunrise size={16} className="text-yellow-200" />
                  <span className="text-xs text-blue-100">{weatherData.current.sunrise}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sunset size={16} className="text-orange-200" />
                  <span className="text-xs text-blue-100">{weatherData.current.sunset}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Advice based on current weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>Today's Farming Advice</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3">
                <Thermometer size={18} className="flex-shrink-0" />
                <span>Good temperature for crop growth</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3">
                <Droplets size={18} className="flex-shrink-0" />
                <span>Moderate humidity - ideal conditions</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3">
                <Wind size={18} className="flex-shrink-0" />
                <span>Light winds - safe for spraying</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Weather Summary</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Temperature Range:</span>
                <span className="font-bold">{weatherData.forecast[0].tempMin}°C - {weatherData.forecast[0].tempMax}°C</span>
              </p>
              <p className="flex justify-between">
                <span>Chance of Rain:</span>
                <span className="font-bold">{weatherData.forecast[0].rain}%</span>
              </p>
              <p className="flex justify-between">
                <span>Wind Speed:</span>
                <span className="font-bold">{weatherData.current.windSpeed} km/h</span>
              </p>
              <p className="flex justify-between">
                <span>Best Time to Work:</span>
                <span className="font-bold">Morning (7-11 AM)</span>
              </p>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Cloud size={24} className="text-blue-600" />
            <span>7-Day Weather Forecast</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => {
              const Icon = day.icon;
              const isToday = index === 0;
              return (
                <div
                  key={index}
                  className={`${
                    isToday
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400'
                      : 'bg-gray-50 border border-gray-200'
                  } rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-200`}
                >
                  <p className="font-bold text-gray-800 mb-1">{day.day}</p>
                  {day.date && (
                    <p className="text-xs text-gray-500 mb-2">{day.date}</p>
                  )}
                  <Icon size={40} className={`mx-auto mb-3 ${
                    isToday ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <div className="mb-2">
                    <p className="text-3xl font-bold text-gray-800">{day.temp}°C</p>
                    <p className="text-xs text-gray-500">{day.tempMin}° / {day.tempMax}°</p>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 font-medium">{day.condition}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-center space-x-1 text-blue-600">
                      <CloudRain size={12} />
                      <span>{day.rain}%</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-gray-500">
                      <Droplets size={12} />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-gray-500">
                      <Wind size={12} />
                      <span>{day.wind} km/h</span>
                    </div>
                  </div>
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