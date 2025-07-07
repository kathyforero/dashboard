import { MapPin } from 'lucide-react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { WeatherLocation } from '../types/weather';

interface LocationSelectorProps {
  selectedLocation: WeatherLocation;
  availableLocations: WeatherLocation[];
  onLocationChange: (location: WeatherLocation) => void;
}

const LocationSelector = ({ selectedLocation, availableLocations, onLocationChange }: LocationSelectorProps) => {
  return (
    <div className="bg-card rounded-lg p-4 mb-6 animate-fade-in border border-slate-700">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <FormControl fullWidth className="text-sm font-medium text-slate-300 block mb-2">
            <InputLabel id="location-select-label" sx={{ color: 'white' }}>Seleccionar Ubicación</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={selectedLocation.name}
              label="Seleccionar Ubicación"
              onChange={(event) => {
                const value = event.target.value as string;
                const location = availableLocations.find(loc => loc.name === value);
                if (location) {
                  onLocationChange(location);
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgb(30, 41, 59)', // Un gris oscuro similar al slate-800
                    border: '1px solid rgb(71 85 105)', // Borde similar al slate-600
                  },
                },
              }}
              sx={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)', // bg-slate-800/50
                borderColor: 'rgb(71 85 105)', // border-slate-600
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(71 85 105)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(71 85 105)',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              {availableLocations.map((location) => (
                <MenuItem
                  key={location.name}
                  value={location.name}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgb(51 65 85)', // hover:bg-slate-700
                    },
                  }}
                >
                  {location.name}, {location.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
