// import { Toaster } from "@/components/ui/toaster";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <Toaster />
//     <BrowserRouter>
//       <Routes>
//         <Route path="/dashboard" element={<Index />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   </QueryClientProvider>
// );


// export default App;

import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import './App.css';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';

function App() {

  const dataFetcherOutput = DataFetcher();

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">

             <AlertUI description="No se preveen lluvias"/></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3  }}><SelectorUI/></Grid>

        {/* Indicadores */}
        {/* Renderizado condicional de los datos obtenidos */}

        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
        <>

            {/* Indicadores con datos obtenidos */}

            <Grid size={{ xs: 12, md: 3 }} >
                <IndicatorUI
                    title='Temperatura (2m)'
                    description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Temperatura aparente'
                    description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Velocidad del viento'
                    description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Humedad relativa'
                    description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

        </>
        )}
        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }} >
          Elemento: Gráfico
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }} >
          Elemento: Tabla
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App