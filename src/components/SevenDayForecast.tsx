import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudDrizzle, ChevronDown, ChevronUp } from 'lucide-react';

interface ForecastDay {
  day: string;
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: React.ComponentType<any>;
  rain: number;
  humidity: number;
  wind: number;
  advice: string;
}

export const SevenDayForecast: React.FC<{ isExpanded?: boolean }> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const getCurrentDayName = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric' });
  };

  const getFullDate = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
  };

  const forecast: ForecastDay[] = [
    { day: getCurrentDayName(0), date: 'Today', temp: 24, tempMin: 18, tempMax: 28, condition: 'Partly Cloudy', icon: Cloud, rain: 20, humidity: 65, wind: 12, advice: 'Good planting conditions. Safe for spraying operations.' },
    { day: getCurrentDayName(1), date: 'Tomorrow', temp: 22, tempMin: 16, tempMax: 24, condition: 'Rainy', icon: CloudRain, rain: 80, humidity: 85, wind: 18, advice: 'Postpone field work. Prepare drainage systems.' },
    { day: getCurrentDayName(2), date: getFullDate(2), temp: 26, tempMin: 19, tempMax: 30, condition: 'Sunny', icon: Sun, rain: 5, humidity: 55, wind: 8, advice: 'Ideal for planting. Soil moisture optimal.' },
    { day: getCurrentDayName(3), date: getFullDate(3), temp: 23, tempMin: 17, tempMax: 26, condition: 'Cloudy', icon: Cloud, rain: 40, humidity: 70, wind: 14, advice: 'Scattered showers expected. Avoid fertilizing.' },
    { day: getCurrentDayName(4), date: getFullDate(4), temp: 25, tempMin: 18, tempMax: 28, condition: 'Sunny', icon: Sun, rain: 10, humidity: 60, wind: 10, advice: 'Good for harvesting and general farm work.' },
    { day: getCurrentDayName(5), date: getFullDate(5), temp: 21, tempMin: 15, tempMax: 23, condition: 'Light Rain', icon: CloudDrizzle, rain: 65, humidity: 80, wind: 16, advice: 'Wet conditions. Monitor crops for disease.' },
    { day: getCurrentDayName(6), date: getFullDate(6), temp: 27, tempMin: 20, tempMax: 31, condition: 'Sunny', icon: Sun, rain: 5, humidity: 50, wind: 9, advice: 'Excellent conditions for outdoor activities.' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Cloud size={24} className="text-blue-600" />
          <div className="text-left">
            <h3 className="font-bold text-gray-800">7-Day Weather Forecast</h3>
            <p className="text-xs text-gray-500">Plan your farming activities</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="text-gray-600" size={20} />
        ) : (
          <ChevronDown className="text-gray-600" size={20} />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              const isToday = index === 0;
              return (
                <div
                  key={index}
                  className={`${
                    isToday
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400'
                      : 'bg-gray-50 border border-gray-200'
                  } rounded-xl p-4 transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-800">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                    <Icon size={32} className={isToday ? 'text-blue-600' : 'text-gray-600'} />
                  </div>

                  <div className="mb-3">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold text-gray-800">{day.temp}°C</span>
                      <span className="text-xs text-gray-500">{day.tempMin}° / {day.tempMax}°</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{day.condition}</p>
                  </div>

                  <div className="space-y-2 mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <CloudRain size={14} className="text-blue-500" />
                        Rain Chance
                      </span>
                      <span className="font-semibold text-gray-800">{day.rain}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Droplets size={14} className="text-cyan-500" />
                        Humidity
                      </span>
                      <span className="font-semibold text-gray-800">{day.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Wind size={14} className="text-gray-500" />
                        Wind Speed
                      </span>
                      <span className="font-semibold text-gray-800">{day.wind} km/h</span>
                    </div>
                  </div>

                  <div className={`${
                    isToday ? 'bg-blue-100' : 'bg-gray-100'
                  } rounded-lg p-3`}>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Farming Advice:</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{day.advice}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Weekly Planning Tips
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Focus major field work on sunny days (Days 2, 4, 6)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Days 1 and 5 have high rainfall - prepare drainage</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Humidity high on rainy days - monitor for fungal diseases</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Wind speeds moderate throughout - safe for spraying on most days</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
