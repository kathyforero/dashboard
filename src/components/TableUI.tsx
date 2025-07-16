import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

// ...eliminado: columns anterior...

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { Hourly } from '../types/DashboardTypes';

interface TableUIProps {
  data?: Hourly;
  loading: boolean;
  error: string | null;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'time',
    headerName: 'Hora',
    width: 180,
  },
  {
    field: 'temperature',
    headerName: 'Temperatura (°C)',
    width: 180,
  },
  {
    field: 'wind',
    headerName: 'Viento (km/h)',
    width: 180,
  },
];

export default function TableUI({ data, loading, error }: TableUIProps) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data || !data.time || !data.temperature_2m || !data.wind_speed_10m || data.time.length === 0) {
    return <Alert severity="info">No hay datos para mostrar.</Alert>;
  }
  const rows = data.time.map((time, idx) => ({
    id: idx,
    time,
    temperature: data.temperature_2m[idx],
    wind: data.wind_speed_10m[idx],
  }));
  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}