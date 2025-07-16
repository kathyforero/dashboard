import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

interface CityCoords {
  [key: string]: { latitude: number; longitude: number };
}

const cityCoords: CityCoords = {
  guayaquil: { latitude: -2.2038, longitude: -79.8975 },
  quito: { latitude: -0.1807, longitude: -78.4678 },
  manta: { latitude: -0.9677, longitude: -80.7089 },
  cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

const CACHE_DURATION_MINUTES = 10; // Vigencia de los datos en minutos, en este caso lo seteamos en 10 minutos

function getCacheKey(city: string) {
  return `weatherData_${city}`;
}

function isCacheValid(timestamp: number, durationMinutes: number) {
  const now = Date.now();
  return now - timestamp < durationMinutes * 60 * 1000;
}

export default function DataFetcher(city: string): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coords = cityCoords[city] || cityCoords.guayaquil;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

    const cacheKey = getCacheKey(city);

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Primero intentamos leer del localStorage (cache first en lugar de fetch first)
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          if (isCacheValid(timestamp, CACHE_DURATION_MINUTES)) {
            setData(cachedData);
            setLoading(false);
            return; // Usar cache y no llamar a la API
          }
        }
      } catch (e) {
        // Si hay error leyendo el cache, continuamos normalmente
      }

      // Luego, llamamos a la API si no hay cache válido
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
        // Guardamos en localStorage con timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result, timestamp: Date.now() })
        );
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
        // Si hay un error, intentamos usar cache aunque esté expirado, esto es para que no se quede en blanco la pantalla!
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data: cachedData } = JSON.parse(cached);
            setData(cachedData);
          }
        } catch (e) {
          // Si no hay cache, no hacemos nada
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { data, loading, error };
}