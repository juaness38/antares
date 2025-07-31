import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MonitoringToolbar = ({ onEmergencyStop, onDataExport, onParameterAdjust }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [recordingDuration, setRecordingDuration] = useState(1847); // seconds
  const [emergencyStopConfirm, setEmergencyStopConfirm] = useState(false);
  const [systemStatus, setSystemStatus] = useState('running');

  // Update recording duration
  React.useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmergencyStop = () => {
    if (!emergencyStopConfirm) {
      setEmergencyStopConfirm(true);
      setTimeout(() => setEmergencyStopConfirm(false), 5000);
      return;
    }
    
    setSystemStatus('stopped');
    setIsRecording(false);
    onEmergencyStop?.();
    setEmergencyStopConfirm(false);
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleQuickExport = () => {
    onDataExport?.('csv');
  };

  const handleParameterAdjustment = () => {
    onParameterAdjust?.();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-success bg-success/10 border-success/20';
      case 'paused':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'stopped':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'running':
        return 'En Ejecución';
      case 'paused':
        return 'Pausado';
      case 'stopped':
        return 'Detenido';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-card border-b scientific-border p-4">
      <div className="flex items-center justify-between">
        {/* Left section - Experiment info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FlaskConical" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-text-primary">Experimento A-2024-001</h2>
              <p className="text-sm text-text-secondary">Optimización de Proteína Recombinante</p>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(systemStatus)}`}>
                {getStatusLabel(systemStatus)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>Duración: {formatDuration(recordingDuration)}</span>
            </div>
          </div>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center space-x-3">
          {/* Recording control */}
          <Button
            variant={isRecording ? "default" : "outline"}
            size="sm"
            onClick={handleRecordingToggle}
            iconName={isRecording ? "Pause" : "Play"}
            iconPosition="left"
            className="min-w-[120px]"
          >
            {isRecording ? 'Pausar' : 'Reanudar'}
          </Button>

          {/* Quick export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickExport}
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>

          {/* Parameter adjustment */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleParameterAdjustment}
            iconName="Settings"
            iconPosition="left"
          >
            Ajustar
          </Button>

          <div className="h-6 w-px bg-border" />

          {/* Emergency stop */}
          <Button
            variant={emergencyStopConfirm ? "destructive" : "outline"}
            size="sm"
            onClick={handleEmergencyStop}
            iconName="StopCircle"
            iconPosition="left"
            className={`min-w-[140px] ${emergencyStopConfirm ? 'animate-pulse' : ''}`}
          >
            {emergencyStopConfirm ? 'Confirmar Parada' : 'Parada de Emergencia'}
          </Button>
        </div>
      </div>

      {/* Secondary toolbar with quick stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t scientific-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Thermometer" size={16} className="text-destructive" />
            <span className="text-text-secondary">Temp:</span>
            <span className="font-medium text-text-primary">37.2°C</span>
            <div className="w-2 h-2 bg-success rounded-full" />
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Droplets" size={16} className="text-primary" />
            <span className="text-text-secondary">pH:</span>
            <span className="font-medium text-text-primary">7.4</span>
            <div className="w-2 h-2 bg-success rounded-full" />
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Wind" size={16} className="text-success" />
            <span className="text-text-secondary">O₂:</span>
            <span className="font-medium text-text-primary">85%</span>
            <div className="w-2 h-2 bg-success rounded-full" />
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Activity" size={16} className="text-warning" />
            <span className="text-text-secondary">Biomasa:</span>
            <span className="font-medium text-text-primary">0.8 OD</span>
            <div className="w-2 h-2 bg-warning rounded-full" />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={16} />
            <span>6/6 dispositivos conectados</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} />
            <span>2.3 GB registrados</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>3 investigadores monitoreando</span>
          </div>
        </div>
      </div>

      {/* Emergency stop confirmation overlay */}
      {emergencyStopConfirm && (
        <div className="absolute inset-0 bg-destructive/10 border-2 border-destructive rounded-lg flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-scientific-lg border scientific-border">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-text-primary">
                Confirmar Parada de Emergencia
              </h3>
            </div>
            <p className="text-text-secondary mb-4">
              Esta acción detendrá inmediatamente todos los procesos del experimento.
              Los datos se guardarán automáticamente.
            </p>
            <div className="flex items-center space-x-3">
              <Button
                variant="destructive"
                onClick={handleEmergencyStop}
                iconName="StopCircle"
                iconPosition="left"
              >
                Detener Experimento
              </Button>
              <Button
                variant="outline"
                onClick={() => setEmergencyStopConfirm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringToolbar;