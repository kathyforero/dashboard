
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WeatherAlert } from '../types/weather';

interface AlertSectionProps {
  alerts: WeatherAlert[];
}

const AlertSection = ({ alerts }: AlertSectionProps) => {
  if (alerts.length === 0) {
    return (
      <div className="glass-effect rounded-lg p-4 mb-6 animate-fade-in">
        <div className="flex items-center space-x-2 text-green-400">
          <Info className="h-5 w-5" />
          <span className="font-medium">Sin alertas activas</span>
        </div>
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'danger':
        return 'border-red-500/50 bg-red-500/10 text-red-300';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
      default:
        return 'border-blue-500/50 bg-blue-500/10 text-blue-300';
    }
  };

  return (
    <div className="space-y-3 mb-6 animate-fade-in">
      {alerts.map((alert) => (
        <Alert key={alert.id} className={`glass-effect ${getAlertClass(alert.type)}`}>
          {getAlertIcon(alert.type)}
          <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
          <AlertDescription className="mt-1">
            {alert.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default AlertSection;
