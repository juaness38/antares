import React from 'react';
import Icon from '../../../components/AppIcon';

const DeviceStatusGrid = () => {
  const devices = [
    {
      id: 'BR-01',
      name: 'Biorreactor Principal',
      type: 'bioreactor',
      status: 'active',
      temperature: '37.2°C',
      utilization: 85,
      lastUpdate: '14:55'
    },
    {
      id: 'BR-02',
      name: 'Biorreactor Secundario',
      type: 'bioreactor',
      status: 'active',
      temperature: '36.8°C',
      utilization: 72,
      lastUpdate: '14:54'
    },
    {
      id: 'ESP32-01',
      name: 'Sensor de pH Lab-A',
      type: 'sensor',
      status: 'online',
      value: 'pH 7.2',
      utilization: 100,
      lastUpdate: '14:55'
    },
    {
      id: 'ESP32-02',
      name: 'Sensor de Oxígeno',
      type: 'sensor',
      status: 'online',
      value: '87% O₂',
      utilization: 100,
      lastUpdate: '14:55'
    },
    {
      id: 'HPLC-01',
      name: 'Cromatógrafo HPLC',
      type: 'analyzer',
      status: 'busy',
      value: 'Análisis en curso',
      utilization: 95,
      lastUpdate: '14:52'
    },
    {
      id: 'SPEC-01',
      name: 'Espectrómetro UV-Vis',
      type: 'analyzer',
      status: 'maintenance',
      value: 'Calibración req.',
      utilization: 0,
      lastUpdate: '12:30'
    },
    {
      id: 'SLAVE-01',
      name: 'Análisis de Proteínas',
      type: 'microservice',
      status: 'sleeping',
      value: 'Inactivo',
      utilization: 0,
      lastUpdate: '14:45'
    },
    {
      id: 'SLAVE-02',
      name: 'Procesamiento BLAST',
      type: 'microservice',
      status: 'active',
      value: '3 trabajos',
      utilization: 60,
      lastUpdate: '14:55'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case'online':
        return 'text-success bg-success/10 border-success/20';
      case 'busy':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'maintenance': case'error':
        return 'text-error bg-error/10 border-error/20';
      case 'sleeping': case'offline':
        return 'text-text-secondary bg-muted border-border';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'online': return 'En línea';
      case 'busy': return 'Ocupado';
      case 'maintenance': return 'Mantenimiento';
      case 'sleeping': return 'Inactivo';
      case 'offline': return 'Desconectado';
      case 'error': return 'Error';
      default: return 'Desconocido';
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'bioreactor': return 'FlaskConical';
      case 'sensor': return 'Thermometer';
      case 'analyzer': return 'Microscope';
      case 'microservice': return 'Server';
      default: return 'Cpu';
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return 'bg-error';
    if (utilization >= 60) return 'bg-warning';
    if (utilization >= 40) return 'bg-primary';
    return 'bg-success';
  };

  return (
    <div className="bg-card border scientific-border rounded-lg scientific-shadow">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Cpu" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Estado de Dispositivos</h2>
              <p className="text-sm text-text-secondary">Monitoreo de equipos y microservicios</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-text-secondary">6 activos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-text-secondary">1 ocupado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-sm text-text-secondary">1 mantenimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices.map((device) => (
            <div key={device.id} className="border scientific-border rounded-lg p-4 hover:shadow-scientific scientific-transition">
              {/* Device Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(device.type)} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">{device.id}</h3>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                  {getStatusLabel(device.status)}
                </div>
              </div>

              {/* Device Name */}
              <p className="text-sm text-text-secondary mb-3 truncate">{device.name}</p>

              {/* Device Value/Temperature */}
              <div className="mb-3">
                <p className="text-lg font-semibold text-text-primary">
                  {device.temperature || device.value}
                </p>
              </div>

              {/* Utilization Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-secondary">Utilización</span>
                  <span className="text-xs text-text-secondary">{device.utilization}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full scientific-transition ${getUtilizationColor(device.utilization)}`}
                    style={{ width: `${device.utilization}%` }}
                  ></div>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Actualizado: {device.lastUpdate}</span>
                </div>
                <button className="text-primary hover:text-primary/80 scientific-transition">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t scientific-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 scientific-transition">
                <Icon name="RefreshCw" size={16} />
                <span>Actualizar todo</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 scientific-transition">
                <Icon name="Settings" size={16} />
                <span>Configurar alertas</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 scientific-transition">
              <Icon name="Plus" size={16} />
              <span>Agregar dispositivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusGrid;