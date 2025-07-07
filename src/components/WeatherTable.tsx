
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    <Card className="glass-effect border-slate-700 mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
          <span>📅</span>
          <span>Pronóstico Semanal</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600 hover:bg-slate-800/50">
                <TableHead className="text-slate-300 font-semibold">Fecha</TableHead>
                <TableHead className="text-slate-300 font-semibold">Temp. Máx.</TableHead>
                <TableHead className="text-slate-300 font-semibold">Temp. Mín.</TableHead>
                <TableHead className="text-slate-300 font-semibold">Condiciones</TableHead>
                <TableHead className="text-slate-300 font-semibold">Amanecer</TableHead>
                <TableHead className="text-slate-300 font-semibold">Atardecer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow 
                  key={index}
                  className="border-slate-700 hover:bg-slate-800/30 transition-colors"
                >
                  <TableCell className="text-white font-medium capitalize">
                    {row.fecha}
                  </TableCell>
                  <TableCell className="text-red-400 font-semibold">
                    {row.tempMax}°C
                  </TableCell>
                  <TableCell className="text-blue-400 font-semibold">
                    {row.tempMin}°C
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {row.descripcion}
                  </TableCell>
                  <TableCell className="text-yellow-400">
                    {row.amanecer}
                  </TableCell>
                  <TableCell className="text-orange-400">
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
