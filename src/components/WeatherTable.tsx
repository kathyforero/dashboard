import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DailyWeather } from '../types/weather';

interface WeatherTableProps {
  dailyData: DailyWeather;
}

const WeatherTable = ({ dailyData }: WeatherTableProps) => {
  const getWeatherDescription = (code: number) => {
    const descriptions: { [key: number]: string } = {
      0: 'Despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna intensa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos intensos',
      95: 'Tormenta',
    };
    return descriptions[code] || 'Desconocido';
  };

  const tableData = dailyData.time.map((time, index) => ({
    fecha: new Date(time).toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    tempMax: dailyData.temperatureMax[index],
    tempMin: dailyData.temperatureMin[index],
    descripcion: getWeatherDescription(dailyData.weatherCode[index]),
    amanecer: new Date(dailyData.sunrise[index]).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    atardecer: new Date(dailyData.sunset[index]).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));

  return (
    <Card 
      className="bg-card border-slate-700 mb-6 animate-fade-in rounded-2xl"
      sx={{
        boxShadow: 'none',
        color: 'white',
        backgroundColor: 'hsl(var(--card))'
      }}
    >
      <div className="flex items-center gap-2 p-4 text-xl font-bold text-white">
        📅 Pronóstico Semanal
      </div>
      <CardContent>
        <div className="overflow-x-auto">
          <Table sx={{ 
            minWidth: 650, 
            backgroundColor: 'transparent',
            '& .MuiTableCell-root': {
              paddingLeft: '10px',
              paddingRight: '10px'
            }
          }}>
            <TableHead>
              <TableRow sx={{
                borderBottom: '1px solid rgb(71 85 105)',
                '&:hover': {
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                },
              }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Temp. Máx.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Temp. Mín.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Condiciones</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amanecer</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Atardecer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow 
                  key={index}
                  sx={{
                    borderBottom: '1px solid rgb(71 85 105)',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 41, 59, 0.3)',
                    },
                    transition: 'background-color 0.15s ease-in-out',
                  }}
                >
                  <TableCell sx={{ color: 'white', fontWeight: 'medium', textTransform: 'capitalize' }}>
                    {row.fecha}
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(239 68 68)', fontWeight: 'semibold' }}>
                    {row.tempMax}°C
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(59 130 246)', fontWeight: 'semibold' }}>
                    {row.tempMin}°C
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(203 213 225)' }}>
                    {row.descripcion}
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(250 204 21)' }}>
                    {row.amanecer}
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(249 115 22)' }}>
                    {row.atardecer}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherTable;
