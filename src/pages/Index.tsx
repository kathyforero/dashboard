import { useWeatherData } from '../hooks/useWeatherData';
import Header from '../components/Header';
import AlertSection from '../components/AlertSection';
import LocationSelector from '../components/LocationSelector';
import WeatherIndicators from '../components/WeatherIndicators';
import WeatherChart from '../components/WeatherChart';
import WeatherTable from '../components/WeatherTable';
import AdditionalInfo from '../components/AdditionalInfo';

const Index = () => {
  const {
    weatherData,
    selectedLocation,
    setSelectedLocation,
    loading,
    error,
    alerts,
    availableLocations,
    refreshData,
  } = useWeatherData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-slate-300 text-lg">Cargando datos climáticos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 bg-card p-8 rounded-lg border border-slate-700">
          <div className="text-red-400 text-6xl">❌</div>
          <h2 className="text-2xl font-bold text-white">Error al cargar datos</h2>
          <p className="text-slate-300">{error}</p>
          <button
            onClick={refreshData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-300 text-lg">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <Header onRefresh={refreshData} isLoading={loading} />
      
      <AlertSection alerts={alerts} />
      
      <LocationSelector
        selectedLocation={selectedLocation}
        availableLocations={availableLocations}
        onLocationChange={setSelectedLocation}
      />
      
      <WeatherIndicators currentWeather={weatherData.current} />
      
      <WeatherChart
        hourlyData={weatherData.hourly}
        dailyData={weatherData.daily}
      />
      
      <WeatherTable dailyData={weatherData.daily} />
      
      <AdditionalInfo currentWeather={weatherData.current} />
    </div>
  );
};

export default Index;
