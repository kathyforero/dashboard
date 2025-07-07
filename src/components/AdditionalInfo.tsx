
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Umbrella, Shirt, Car } from 'lucide-react';
import { CurrentWeather } from '../types/weather';

interface AdditionalInfoProps {
  currentWeather: CurrentWeather;
}

const AdditionalInfo = ({ currentWeather }: AdditionalInfoProps) => {
  const getClothingRecommendation = (temp: number) => {
    if (temp < 0) return 'Ropa de abrigo pesada, gorro y guantes';
    if (temp < 10) return 'Abrigo o chaqueta gruesa';
    if (temp < 20) return 'Chaqueta ligera o suéter';
    if (temp < 30) return 'Ropa ligera, camiseta';
    return 'Ropa muy ligera, protección solar.';
  };

  const getDrivingConditions = (visibility: number, windSpeed: number) => {
    if (visibility < 1000) return 'Condiciones de conducción difíciles por baja visibilidad';
    if (windSpeed > 50) return 'Precaución por vientos fuertes';
    if (visibility < 5000) return 'Visibilidad reducida, conduzca con cuidado';
    return 'Condiciones de conducción normales.';
  };

  const getRainProbability = (humidity: number) => {
    if (humidity > 80) return 'Alta probabilidad de lluvia';
    if (humidity > 60) return 'Posibilidad moderada de lluvia';
    return 'Baja probabilidad de lluvia';
  };

  const getUVRecommendation = (uvIndex: number) => {
    if (uvIndex < 3) return 'Bajo riesgo UV, no se requiere protección especial';
    if (uvIndex < 6) return 'Riesgo UV moderado, use protector solar';
    if (uvIndex < 8) return 'Riesgo UV alto, protección solar necesaria';
    return 'Riesgo UV muy alto, evite exposición prolongada';
  };

  const recommendations = [
    {
      icon: Shirt,
      title: 'Recomendación de Vestimenta',
      content: getClothingRecommendation(currentWeather.temperature),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Umbrella,
      title: 'Probabilidad de Lluvia',
      content: getRainProbability(currentWeather.humidity),
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      icon: Car,
      title: 'Condiciones de Conducción',
      content: getDrivingConditions(currentWeather.visibility, currentWeather.windSpeed),
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Lightbulb,
      title: 'Protección UV',
      content: getUVRecommendation(currentWeather.uvIndex),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {recommendations.map((rec, index) => (
        <Card 
          key={rec.title}
          className="glass-effect border-slate-700 hover:bg-white/10 transition-all duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-white flex items-center space-x-3">
              <div className={`p-2 ${rec.bgColor} rounded-lg`}>
                <rec.icon className={`h-5 w-5 ${rec.color}`} />
              </div>
              <span>{rec.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed">{rec.content}</p>
          </CardContent>
        </Card>
      ))}
      
      {/* Información adicional del clima actual */}
      <Card className="glass-effect border-slate-700 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center space-x-3">
            <span>🌡️</span>
            <span>Resumen del Clima Actual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-slate-400">Estado del Día</p>
              <p className="text-white font-semibold">
                {currentWeather.isDay ? '☀️ Día' : '🌙 Noche'}
              </p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-slate-400">Dirección del Viento</p>
              <p className="text-white font-semibold">{currentWeather.windDirection}°</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-slate-400">Sensación Térmica</p>
              <p className="text-white font-semibold">
                {currentWeather.temperature > 25 ? 'Cálido' : 
                 currentWeather.temperature > 15 ? 'Templado' : 
                 currentWeather.temperature > 5 ? 'Fresco' : 'Frío'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
