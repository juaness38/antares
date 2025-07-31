import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DeviceStatusPanel = () => {
  const [devices, setDevices] = useState([
    {
      id: 'bioreactor-001',
      name: 'Biorreactor Principal',
      type: 'bioreactor',
      status: 'online',
      lastUpdate: new Date(),
      parameters: {
        temperature: 37.2,
        ph: 7.4,
        stirring: 200,
        airflow: 1.5
      },
      alerts: []
    },
    {
      id: 'sensor-temp-001',
      name: 'Sensor Temperatura #1',
      type: 'temperature',
      status: 'online',
      lastUpdate: new Date(Date.now() - 5000),
      parameters: {
        value: 37.1,
        calibration: 'OK'
      },
      alerts: []
    },
    {
      id: 'sensor-ph-001',
      name: 'Sensor pH #1',
      type: 'ph',
      status: 'warning',
      lastUpdate: new Date(Date.now() - 30000),
      parameters: {
        value: 7.6,
        calibration: 'Needs calibration'
      },
      alerts: [
        { type: 'warning', message: 'Calibración requerida en 2 horas' }
      ]
    },
    {
      id: 'pump-001',
      name: 'Bomba Peristáltica #1',
      type: 'pump',
      status: 'online',
      lastUpdate: new Date(Date.now() - 10000),
      parameters: {
        flowRate: 50,
        pressure: 0.8
      },
      alerts: []
    },
    {
      id: 'esp32-001',
      name: 'ESP32 Controller #1',
      type: 'controller',
      status: 'offline',
      lastUpdate: new Date(Date.now() - 300000),
      parameters: {
        wifi: 'Disconnected',
        memory: 'N/A'
      },
      alerts: [
        { type: 'error', message: 'Conexión perdida hace 5 minutos' }
      ]
    },
    {
      id: 'spectrometer-001',
      name: 'Espectrómetro UV-Vis',
      type: 'spectrometer',
      status: 'online',
      lastUpdate: new Date(Date.now() - 2000),
      parameters: {
        wavelength: 600,
        absorbance: 0.85
      },
      alerts: []
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => {
          if (device.status === 'online') {
            return {
              ...device,
              lastUpdate: new Date(),
              parameters: {
                ...device.parameters,
                ...(device.type === 'bioreactor' && {
                  temperature: 37.2 + (Math.random() - 0.5) * 0.4,
                  ph: 7.4 + (Math.random() - 0.5) * 0.2
                }),
                ...(device.type === 'temperature' && {
                  value: 37.1 + (Math.random() - 0.5) * 0.3
                }),
                ...(device.type === 'spectrometer' && {
                  absorbance: 0.85 + (Math.random() - 0.5) * 0.1
                })
              }
            };
          }
          return device;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'offline':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'bioreactor':
        return 'FlaskConical';
      case 'temperature':
        return 'Thermometer';
      case 'ph':
        return 'Droplets';
      case 'pump':
        return 'Zap';
      case 'controller':
        return 'Cpu';
      case 'spectrometer':
        return 'Eye';
      default:
        return 'HardDrive';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'En línea';
      case 'warning':
        return 'Advertencia';
      case 'offline':
        return 'Desconectado';
      default:
        return 'Desconocido';
    }
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h`;
  };

  const handleDeviceAction = (deviceId, action) => {
    console.log(`Acción ${action} en dispositivo ${deviceId}`);
    // Implement device control logic
  };

  return (
    <div className="bg-card rounded-lg scientific-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Estado de Dispositivos
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Wifi" size={16} />
          <span>{devices.filter(d => d.status === 'online').length}/{devices.length} conectados</span>
        </div>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="border scientific-border rounded-lg p-4 hover:bg-muted/50 scientific-transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(device.type)} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{device.name}</h4>
                  <p className="text-sm text-text-secondary">{device.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                  {getStatusText(device.status)}
                </span>
                <span className="text-xs text-text-secondary">
                  {formatLastUpdate(device.lastUpdate)}
                </span>
              </div>
            </div>

            {/* Device parameters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {Object.entries(device.parameters).map(([key, value]) => (
                <div key={key} className="bg-muted/50 rounded-lg p-2">
                  <div className="text-xs text-text-secondary capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {device.alerts.length > 0 && (
              <div className="space-y-2 mb-3">
                {device.alerts.map((alert, index) => (
                  <div key={index} className={`flex items-center space-x-2 p-2 rounded-lg text-sm ${
                    alert.type === 'error' ?'bg-destructive/10 text-destructive' :'bg-warning/10 text-warning'
                  }`}>
                    <Icon name={alert.type === 'error' ? 'AlertCircle' : 'AlertTriangle'} size={16} />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Device actions */}
            <div className="flex items-center space-x-2">
              {device.status === 'online' && (
                <>
                  <button
                    onClick={() => handleDeviceAction(device.id, 'restart')}
                    className="flex items-center space-x-1 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm scientific-transition"
                  >
                    <Icon name="RotateCcw" size={14} />
                    <span>Reiniciar</span>
                  </button>
                  <button
                    onClick={() => handleDeviceAction(device.id, 'calibrate')}
                    className="flex items-center space-x-1 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm scientific-transition"
                  >
                    <Icon name="Settings" size={14} />
                    <span>Calibrar</span>
                  </button>
                </>
              )}
              {device.status === 'offline' && (
                <button
                  onClick={() => handleDeviceAction(device.id, 'reconnect')}
                  className="flex items-center space-x-1 px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm scientific-transition"
                >
                  <Icon name="Wifi" size={14} />
                  <span>Reconectar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary footer */}
      <div className="mt-6 pt-4 border-t scientific-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">
              {devices.filter(d => d.status === 'online').length}
            </div>
            <div className="text-sm text-text-secondary">En línea</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">
              {devices.filter(d => d.status === 'warning').length}
            </div>
            <div className="text-sm text-text-secondary">Advertencias</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">
              {devices.filter(d => d.status === 'offline').length}
            </div>
            <div className="text-sm text-text-secondary">Desconectados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusPanel;