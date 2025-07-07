import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { WeatherAlert } from '../types/weather';

interface AlertSectionProps {
  alerts: WeatherAlert[];
}

const AlertSection = ({ alerts }: AlertSectionProps) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-card rounded-lg p-4 mb-6 animate-fade-in border border-slate-700">
        <div className="flex items-center space-x-2 text-green-400">
          <InfoOutlinedIcon className="h-5 w-5" />
          <span className="font-medium">Sin alertas activas</span>
        </div>
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <ErrorOutlineIcon className="h-5 w-5" />;
      case 'warning':
        return <WarningAmberOutlinedIcon className="h-5 w-5" />;
      default:
        return <InfoOutlinedIcon className="h-5 w-5" />;
    }
  };

  const getAlertSeverity = (type: string) => {
    switch (type) {
      case 'danger':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-3 mb-6 animate-fade-in">
      {alerts.map((alert) => (
        <div key={alert.id} className={`glass-effect ${getAlertSeverity(alert.type) === 'error' ? 'border-red-500/50 bg-red-500/10 text-red-300' : getAlertSeverity(alert.type) === 'warning' ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300' : 'border-blue-500/50 bg-blue-500/10 text-blue-300'}`}>
          <Alert
            icon={getAlertIcon(alert.type)}
            severity={getAlertSeverity(alert.type) as 'error' | 'warning' | 'info'}
            sx={{
              backgroundColor: 'transparent',
              color: 'inherit',
              border: 'none',
              '.MuiAlert-icon': {
                color: 'inherit',
              },
              '.MuiAlert-message': {
                color: 'inherit',
              },
            }}
          >
            <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
            <div className="mt-1">
              {alert.message}
            </div>
          </Alert>
        </div>
      ))}
    </div>
  );
};

export default AlertSection;
