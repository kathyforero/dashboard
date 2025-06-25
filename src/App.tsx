import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import './App.css';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/Select';

function App() {
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
        <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

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
