import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { Hourly } from '../types/DashboardTypes';

interface ChartUIProps {
  data?: Hourly;
  loading: boolean;
  error: string | null;
}

export default function ChartUI({ data, loading, error }: ChartUIProps) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data || !data.time || !data.temperature_2m || !data.wind_speed_10m || data.time.length === 0) {
    return <Alert severity="info">No hay datos para mostrar.</Alert>;
  }
  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y Viento por hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: data.temperature_2m, label: 'Temperatura (°C)' },
          { data: data.wind_speed_10m, label: 'Viento (km/h)' },
        ]}
        xAxis={[{ scaleType: 'point', data: data.time }]}
      />
    </>
  );
}