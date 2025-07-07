import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { HourlyWeather, DailyWeather } from '../types/weather';
import React from 'react';

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

  const [value, setValue] = React.useState('hourly');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card className="glass-effect border-slate-700 mb-6 animate-fade-in"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: 'white',
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" className="text-xl font-bold text-white flex items-center space-x-2"
            sx={{ pl: 2 }}
          >
            <span>📊</span>
            <span>Análisis Climático</span>
          </Typography>
        }
        sx={{
          borderBottom: '1px solid rgb(51 65 85)',
          paddingBottom: '16px',
        }}
      />
      <CardContent>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="weather charts tabs"
            variant="fullWidth"
            sx={{
              backgroundColor: 'rgb(15, 23, 42)',
              borderRadius: '0.5rem',
              '.MuiTabs-indicator': {
                backgroundColor: 'transparent',
              },
              '.MuiTab-root': {
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(59, 130, 246, 0.3)',
                  color: 'white',
                  borderRadius: '0.5rem',
                },
                flexGrow: 1,
                maxWidth: 'unset',
              },
            }}
          >
            <Tab label="Por Horas" value="hourly" />
            <Tab label="Por Días" value="daily" />
            <Tab label="Humedad/Viento" value="humidity" />
            <Tab label="Presión" value="pressure" />
          </TabList>

          <TabPanel value="hourly" sx={{ padding: '24px 0 0 0' }}>
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
          </TabPanel>

          <TabPanel value="daily" sx={{ padding: '24px 0 0 0' }}>
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
          </TabPanel>

          <TabPanel value="humidity" sx={{ padding: '24px 0 0 0' }}>
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
          </TabPanel>

          <TabPanel value="pressure" sx={{ padding: '24px 0 0 0' }}>
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
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
