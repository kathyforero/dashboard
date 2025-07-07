
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WeatherLocation } from '../types/weather';

interface LocationSelectorProps {
  selectedLocation: WeatherLocation;
  availableLocations: WeatherLocation[];
  onLocationChange: (location: WeatherLocation) => void;
}

const LocationSelector = ({ selectedLocation, availableLocations, onLocationChange }: LocationSelectorProps) => {
  return (
    <div className="glass-effect rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-300 block mb-2">
            Seleccionar Ubicación
          </label>
          <Select
            value={selectedLocation.name}
            onValueChange={(value) => {
              const location = availableLocations.find(loc => loc.name === value);
              if (location) {
                onLocationChange(location);
              }
            }}
          >
            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Selecciona una ciudad" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {availableLocations.map((location) => (
                <SelectItem
                  key={location.name}
                  value={location.name}
                  className="text-white hover:bg-slate-700"
                >
                  {location.name}, {location.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
