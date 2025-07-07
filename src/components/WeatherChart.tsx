
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HourlyWeather, DailyWeather } from '../types/weather';

interface WeatherChartProps {
  hourlyData: HourlyWeather;
  dailyData: DailyWeather;
}

const WeatherChart = ({ hourlyData, dailyData }: WeatherChartProps) => {
  // Preparar datos para gráficos por horas
  const hourlyChartData = hourlyData.time.map((time, index) => ({
    time: new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    temperatura: hourlyData.temperature[index],
    humedad: hourlyData.humidity[index],
    viento: hourlyData.windSpeed[index],
    presion: hourlyData.pressure[index]
  }));

  // Preparar datos para gráficos por días
  const dailyChartData = dailyData.time.map((time, index) => ({
    fecha: new Date(time).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
    tempMax: dailyData.temperatureMax[index],
    tempMin: dailyData.temperatureMin[index]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 p-3 rounded-lg border border-slate-600 shadow-lg">
          <p className="text-slate-300 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.name}: {entry.value}
              {entry.dataKey === 'temperatura' || entry.dataKey === 'tempMax' || entry.dataKey === 'tempMin' ? '°C' : ''}
              {entry.dataKey === 'humedad' ? '%' : ''}
              {entry.dataKey === 'viento' ? ' km/h' : ''}
              {entry.dataKey === 'presion' ? ' hPa' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-effect border-slate-700 mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
          <span>📊</span>
          <span>Análisis Climático</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="hourly" className="data-[state=active]:bg-blue-500/30">
              Por Horas
            </TabsTrigger>
            <TabsTrigger value="daily" className="data-[state=active]:bg-blue-500/30">
              Por Días
            </TabsTrigger>
            <TabsTrigger value="humidity" className="data-[state=active]:bg-blue-500/30">
              Humedad/Viento
            </TabsTrigger>
            <TabsTrigger value="pressure" className="data-[state=active]:bg-blue-500/30">
              Presión
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8"
                    fontSize={12}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    name="Temperatura"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="daily" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="fecha" 
                    stroke="#94a3b8"
                    fontSize={12}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="tempMax" fill="#ef4444" name="Temp. Máxima" />
                  <Bar dataKey="tempMin" fill="#3b82f6" name="Temp. Mínima" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="humidity" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8"
                    fontSize={12}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="humedad"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="Humedad"
                  />
                  <Line
                    type="monotone"
                    dataKey="viento"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Viento"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="pressure" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8"
                    fontSize={12}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="presion"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="Presión"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
