import { useState, useEffect } from 'react';
import { WeatherData, WeatherLocation, WeatherAlert } from '../types/weather';

const DEFAULT_LOCATIONS: WeatherLocation[] = [
  { name: 'Quito', latitude: -0.1807, longitude: -78.4678, country: 'Ecuador', timezone: 'America/Guayaquil' },
  { name: 'Guayaquil', latitude: -2.1700, longitude: -79.9224, country: 'Ecuador', timezone: 'America/Guayaquil' },
  { name: 'Cuenca', latitude: -2.9001, longitude: -79.0059, country: 'Ecuador', timezone: 'America/Guayaquil' },
  { name: 'Manta', latitude: -0.9631, longitude: -80.7270, country: 'Ecuador', timezone: 'America/Guayaquil' },
  { name: 'Ciudad de México', latitude: 19.4326, longitude: -99.1332, country: 'México', timezone: 'America/Mexico_City' },
  { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816, country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Bogotá', latitude: 4.7110, longitude: -74.0721, country: 'Colombia', timezone: 'America/Bogota' },
  { name: 'Santiago', latitude: -33.4489, longitude: -70.6693, country: 'Chile', timezone: 'America/Santiago' },
  { name: 'Lima', latitude: -12.0464, longitude: -77.0428, country: 'Perú', timezone: 'America/Lima' },
  { name: 'São Paulo', latitude: -23.5505, longitude: -46.6333, country: 'Brasil', timezone: 'America/Sao_Paulo' },
];

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(DEFAULT_LOCATIONS[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const fetchWeatherData = async (location: WeatherLocation) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching weather data for:', location.name);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,weather_code,is_day&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=${location.timezone}&forecast_days=7`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const processedData: WeatherData = {
        current: {
          temperature: Math.round(data.current.temperature_2m || 0),
          humidity: data.current.relative_humidity_2m || 0,
          windSpeed: Math.round(data.current.wind_speed_10m || 0),
          windDirection: data.current.wind_direction_10m || 0,
          pressure: Math.round(data.current.surface_pressure || 0),
          visibility: Math.round(data.current.visibility || 0),
          uvIndex: data.current.uv_index || 0,
          weatherCode: data.current.weather_code || 0,
          isDay: data.current.is_day === 1,
        },
        hourly: {
          time: data.hourly.time.slice(0, 24) || [],
          temperature: data.hourly.temperature_2m.slice(0, 24).map((t: number) => Math.round(t)) || [],
          humidity: data.hourly.relative_humidity_2m.slice(0, 24) || [],
          windSpeed: data.hourly.wind_speed_10m.slice(0, 24).map((w: number) => Math.round(w)) || [],
          pressure: data.hourly.surface_pressure.slice(0, 24).map((p: number) => Math.round(p)) || [],
          weatherCode: data.hourly.weather_code.slice(0, 24) || [],
        },
        daily: {
          time: data.daily.time || [],
          temperatureMax: data.daily.temperature_2m_max.map((t: number) => Math.round(t)) || [],
          temperatureMin: data.daily.temperature_2m_min.map((t: number) => Math.round(t)) || [],
          weatherCode: data.daily.weather_code || [],
          sunrise: data.daily.sunrise || [],
          sunset: data.daily.sunset || [],
        },
        location,
      };

      setWeatherData(processedData);
      generateWeatherAlerts(processedData);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const generateWeatherAlerts = (data: WeatherData) => {
    const newAlerts: WeatherAlert[] = [];

    // Alerta por temperatura extrema
    if (data.current.temperature > 35) {
      newAlerts.push({
        id: '1',
        type: 'danger',
        title: 'Temperatura Extrema',
        message: `Temperatura muy alta: ${data.current.temperature}°C. Se recomienda mantenerse hidratado.`,
        timestamp: new Date().toISOString(),
      });
    } else if (data.current.temperature < 0) {
      newAlerts.push({
        id: '2',
        type: 'warning',
        title: 'Temperatura Baja',
        message: `Temperatura bajo cero: ${data.current.temperature}°C. Cuidado con las heladas.`,
        timestamp: new Date().toISOString(),
      });
    }

    // Alerta por viento fuerte
    if (data.current.windSpeed > 50) {
      newAlerts.push({
        id: '3',
        type: 'warning',
        title: 'Vientos Fuertes',
        message: `Vientos de ${data.current.windSpeed} km/h. Evite actividades al aire libre.`,
        timestamp: new Date().toISOString(),
      });
    }

    // Alerta por UV alto
    if (data.current.uvIndex > 8) {
      newAlerts.push({
        id: '4',
        type: 'info',
        title: 'Índice UV Alto',
        message: `Índice UV: ${data.current.uvIndex}. Use protección solar.`,
        timestamp: new Date().toISOString(),
      });
    }

    setAlerts(newAlerts);
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  return {
    weatherData,
    selectedLocation,
    setSelectedLocation,
    loading,
    error,
    alerts,
    availableLocations: DEFAULT_LOCATIONS,
    refreshData: () => fetchWeatherData(selectedLocation),
  };
};
