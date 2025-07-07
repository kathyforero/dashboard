
export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  humidity: number[];
  windSpeed: number[];
  pressure: number[];
  weatherCode: number[];
}

export interface DailyWeather {
  time: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
  location: WeatherLocation;
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'info' | 'danger';
  title: string;
  message: string;
  timestamp: string;
}
