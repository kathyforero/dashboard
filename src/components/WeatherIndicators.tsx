import { Thermometer, Droplets, Wind, Eye, Sun, Gauge } from 'lucide-react';
import { CurrentWeather } from '../types/weather';

interface WeatherIndicatorsProps {
  currentWeather: CurrentWeather;
}

const WeatherIndicators = ({ currentWeather }: WeatherIndicatorsProps) => {
  const indicators = [
    {
      icon: Thermometer,
      label: 'Temperatura',
      value: `${currentWeather.temperature}°C`,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Droplets,
      label: 'Humedad',
      value: `${currentWeather.humidity}%`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Wind,
      label: 'Viento',
      value: `${currentWeather.windSpeed} km/h`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Gauge,
      label: 'Presión',
      value: `${currentWeather.pressure} hPa`,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Eye,
      label: 'Visibilidad',
      value: `${(currentWeather.visibility / 1000).toFixed(1)} km`,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      icon: Sun,
      label: 'Índice UV',
      value: currentWeather.uvIndex.toString(),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {indicators.map((indicator, index) => (
        <div
          key={indicator.label}
          className="bg-card rounded-lg p-4 animate-fade-in hover:bg-white/10 transition-all duration-300 border border-slate-700"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-3 ${indicator.bgColor} rounded-lg`}>
              <indicator.icon className={`h-6 w-6 ${indicator.color}`} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{indicator.label}</p>
              <p className="text-white text-xl font-bold">{indicator.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherIndicators;
