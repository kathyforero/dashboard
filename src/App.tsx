import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import './App.css';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';


function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const dataFetcherOutput = DataFetcher(selectedCity);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3  }}>
        <SelectorUI onCityChange={setSelectedCity} value={selectedCity} />
      </Grid>

      {/* Indicadores */}
      {/* Renderizado condicional de los datos obtenidos */}
      {dataFetcherOutput.loading ? (
        <Grid size={{ xs: 12, md: 12 }} justifyContent="center" alignItems="center">
          <p style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Cargando datos...</p>
        </Grid>
      ) : dataFetcherOutput.error ? (
        <Grid size={{ xs: 12, md: 12 }}><p>Error: {dataFetcherOutput.error}</p></Grid>
      ) : dataFetcherOutput.data ? (
        <>
          {/* Indicadores con datos obtenidos */}
          <Grid size={{ xs: 12, md: 2 }} >
            <IndicatorUI
              title='Temperatura (2m)'
              description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <IndicatorUI
              title='Temperatura aparente'
              description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <IndicatorUI
              title='Velocidad del viento'
              description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <IndicatorUI
              title='Humedad relativa'
              description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
          </Grid>
        </>
      ) : null}
      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }} >
        <ChartUI
          data={dataFetcherOutput.data?.hourly}
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
        />
      </Grid>
      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }} >
        <TableUI
          data={dataFetcherOutput.data?.hourly}
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
        />
      </Grid>
      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  )
}

export default App