import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, CloudDrizzle, Sunrise, Sunset, Eye, Gauge, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export const WeatherWidget: React.FC = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
    },
    forecast: [
      { day: getCurrentDayName(0), temp: 24, tempMin: 18, tempMax: 28, condition: 'Partly Cloudy', icon: Cloud, rain: 20, humidity: 65, wind: 12 },
      { day: getCurrentDayName(1), temp: 22, tempMin: 16, tempMax: 24, condition: 'Rainy', icon: CloudRain, rain: 80, humidity: 85, wind: 18 },
      { day: getCurrentDayName(2), temp: 26, tempMin: 19, tempMax: 30, condition: 'Sunny', icon: Sun, rain: 5, humidity: 55, wind: 8 },
      { day: getCurrentDayName(3), temp: 23, tempMin: 17, tempMax: 26, condition: 'Cloudy', icon: Cloud, rain: 40, humidity: 70, wind: 14 },
      { day: getCurrentDayName(4), temp: 25, tempMin: 18, tempMax: 28, condition: 'Sunny', icon: Sun, rain: 10, humidity: 60, wind: 10 },
      { day: getCurrentDayName(5), temp: 21, tempMin: 15, tempMax: 23, condition: 'Light Rain', icon: CloudDrizzle, rain: 65, humidity: 80, wind: 16 },
      { day: getCurrentDayName(6), temp: 27, tempMin: 20, tempMax: 31, condition: 'Sunny', icon: Sun, rain: 5, humidity: 50, wind: 9 },
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
      if (data && data.length > 0) {
        setAlerts(data.map(alert => ({
          type: alert.severity === 'high' ? 'warning' : 'info',
          title: alert.title,
          message: alert.message,
          time: new Date(alert.created_at).toLocaleString(),
          severity: alert.severity,
          location: alert.location,
        })));
      } else {
        setAlerts([
          { type: 'warning', title: 'Heavy Rain Expected', message: 'Heavy rainfall expected tomorrow. Prepare drainage systems and cover sensitive crops.', time: '2 hours ago', severity: 'high' },
          { type: 'info', title: 'Optimal Planting Conditions', message: 'Perfect soil moisture and temperature for planting maize this week.', time: '6 hours ago', severity: 'low' },
        ]);
      }
    } catch {
      setAlerts([
        { type: 'warning', title: 'Heavy Rain Expected', message: 'Heavy rainfall expected tomorrow. Prepare drainage systems and cover sensitive crops.', time: '2 hours ago', severity: 'high' },
        { type: 'info', title: 'Optimal Planting Conditions', message: 'Perfect soil moisture and temperature for planting maize this week.', time: '6 hours ago', severity: 'low' },
      ]);
    }
  };

  const farmingAdvice: Record<string, string> = {
    'Partly Cloudy': 'Good conditions for spraying and fieldwork today.',
    'Rainy': 'Postpone field operations. Check drainage systems.',
    'Sunny': 'Ideal for planting and harvesting. Water crops in the morning.',
    'Cloudy': 'Scattered showers possible — hold off on fertilizer.',
    'Light Rain': 'Monitor crops for fungal disease pressure.',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Current weather hero */}
      <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Weather Forecast</h2>
              <p className="text-blue-200 text-sm mt-1">
                {currentTime.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-blue-200 text-xs">{currentTime.toLocaleTimeString('en-ZA', { second: '2-digit' }).split(':').pop()}s</div>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <Cloud size={80} className="text-white opacity-90 flex-shrink-0" />
            <div>
              <div className="text-7xl font-bold leading-none">{weatherData.current.temperature}°C</div>
              <div className="text-blue-200 mt-1">Feels like {weatherData.current.feelsLike}°C · {weatherData.current.condition}</div>
              <div className="mt-2 text-sm bg-white bg-opacity-20 rounded-lg px-3 py-1.5 inline-block">
                {farmingAdvice[weatherData.current.condition]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { icon: Droplets, label: 'Humidity', value: `${weatherData.current.humidity}%` },
              { icon: Wind, label: 'Wind', value: `${weatherData.current.windSpeed} km/h` },
              { icon: Gauge, label: 'Pressure', value: `${weatherData.current.pressure} hPa` },
              { icon: Eye, label: 'Visibility', value: `${weatherData.current.visibility} km` },
              { icon: Sun, label: 'UV Index', value: `${weatherData.current.uvIndex} (High)` },
              { icon: Sunrise, label: 'Sunrise/Set', value: `${weatherData.current.sunrise} / ${weatherData.current.sunset}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-3 text-center">
                <Icon size={16} className="mx-auto mb-1 text-blue-200" />
                <p className="text-xs text-blue-200 mb-0.5">{label}</p>
                <p className="text-xs font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Cloud size={20} className="text-blue-500" />
            7-Day Farming Forecast
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-0">
          {weatherData.forecast.map((day, index) => {
            const Icon = day.icon;
            const isToday = index === 0;
            return (
              <div
                key={index}
                className={`p-4 text-center border-r border-b border-gray-100 last:border-r-0 ${
                  isToday ? 'bg-blue-50' : 'hover:bg-gray-50'
                } transition-colors`}
              >
                <p className={`text-xs font-bold mb-2 ${isToday ? 'text-blue-700' : 'text-gray-600'}`}>{day.day}</p>
                <Icon size={32} className={`mx-auto mb-2 ${isToday ? 'text-blue-600' : 'text-gray-500'}`} />
                <p className="text-xl font-bold text-gray-900">{day.temp}°</p>
                <p className="text-xs text-gray-400 mb-2">{day.tempMin}° / {day.tempMax}°</p>
                <p className="text-xs text-gray-600 font-medium mb-2">{day.condition}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <CloudRain size={10} /><span>{day.rain}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-400">
                    <Droplets size={10} /><span>{day.humidity}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-500" />
          Active Weather Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border-l-4 ${
                alert.severity === 'high'
                  ? 'border-red-500 bg-red-50'
                  : alert.severity === 'medium'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              {alert.severity === 'high'
                ? <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                : <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-800 text-sm">{alert.title}</h4>
                  {alert.location && (
                    <span className="text-xs bg-white bg-opacity-70 text-gray-600 px-2 py-0.5 rounded-full border">{alert.location}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
