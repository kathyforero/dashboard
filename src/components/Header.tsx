import { Cloud, RefreshCw } from 'lucide-react';
import { Button } from '@mui/material';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const Header = ({ onRefresh, isLoading }: HeaderProps) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-6 animate-fade-in border border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Cloud className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard Climático
            </h1>
            <p className="text-slate-400 mt-1">
              Monitoreo en tiempo real de condiciones meteorológicas
            </p>
          </div>
        </div>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-300"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>
    </div>
  );
};

export default Header;
