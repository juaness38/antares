import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceDetailsPanel = ({ device, onClose, onDeviceAction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!device) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'disconnected': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'disconnected': return 'Desconectado';
      case 'warning': return 'Advertencia';
      default: return 'Desconocido';
    }
  };

  const getDeviceTypeIcon = (type) => {
    switch (type) {
      case 'bioreactor': return 'FlaskConical';
      case 'sensor': return 'Thermometer';
      case 'esp32': return 'Cpu';
      case 'spectrometer': return 'Zap';
      case 'ph_meter': return 'Droplets';
      case 'temperature_sensor': return 'Thermometer';
      case 'pressure_sensor': return 'Gauge';
      default: return 'HardDrive';
    }
  };

  const mockLiveData = {
    temperature: { value: 37.2, unit: '°C', status: 'normal' },
    ph: { value: 7.4, unit: 'pH', status: 'normal' },
    pressure: { value: 1.2, unit: 'bar', status: 'normal' },
    flow: { value: 15.8, unit: 'mL/min', status: 'normal' }
  };

  const mockCalibrationHistory = [
    { date: '2024-07-15', type: 'pH Calibration', result: 'Passed', technician: 'Dr. García' },
    { date: '2024-07-10', type: 'Temperature Calibration', result: 'Passed', technician: 'Dr. López' },
    { date: '2024-07-05', type: 'Pressure Calibration', result: 'Failed', technician: 'Dr. García' },
    { date: '2024-07-01', type: 'Flow Calibration', result: 'Passed', technician: 'Dr. Martín' }
  ];

  const mockMaintenanceSchedule = [
    { task: 'Limpieza general', nextDate: '2024-07-20', frequency: 'Semanal', priority: 'medium' },
    { task: 'Calibración de sensores', nextDate: '2024-07-25', frequency: 'Mensual', priority: 'high' },
    { task: 'Actualización de firmware', nextDate: '2024-08-01', frequency: 'Trimestral', priority: 'low' },
    { task: 'Inspección de componentes', nextDate: '2024-08-15', frequency: 'Mensual', priority: 'medium' }
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'Info' },
    { id: 'live', label: 'Datos en Vivo', icon: 'Activity' },
    { id: 'calibration', label: 'Calibración', icon: 'Target' },
    { id: 'maintenance', label: 'Mantenimiento', icon: 'Wrench' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="w-96 bg-surface border-l scientific-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Detalles del Dispositivo</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${device.status === 'connected' ? 'bg-success/10' : 'bg-muted'}
          `}>
            <Icon 
              name={getDeviceTypeIcon(device.type)} 
              size={24} 
              className={device.status === 'connected' ? 'text-success' : 'text-text-secondary'}
            />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{device.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Icon 
                name={getStatusIcon(device.status)} 
                size={14} 
                className={getStatusColor(device.status)}
              />
              <span className={`text-sm ${getStatusColor(device.status)}`}>
                {getStatusText(device.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b scientific-border">
        <nav className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium scientific-transition
                ${activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Información General</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Modelo:</span>
                  <span className="text-sm text-text-primary">{device.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Serie:</span>
                  <span className="text-sm text-text-primary">{device.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Ubicación:</span>
                  <span className="text-sm text-text-primary">{device.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">IP:</span>
                  <span className="text-sm text-text-primary">{device.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Protocolo:</span>
                  <span className="text-sm text-text-primary">{device.protocol}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Experimentos Asignados</h4>
              {device.assignedExperiments.length > 0 ? (
                <div className="space-y-2">
                  {device.assignedExperiments.map((exp, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                      <Icon name="FlaskConical" size={16} className="text-primary" />
                      <span className="text-sm text-text-primary">{exp}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">Sin experimentos asignados</p>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                fullWidth 
                iconName="Settings"
                onClick={() => onDeviceAction('configure', device)}
              >
                Configurar
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                iconName="Target"
                onClick={() => onDeviceAction('calibrate', device)}
              >
                Calibrar
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                iconName="RotateCcw"
                onClick={() => onDeviceAction('restart', device)}
              >
                Reiniciar
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-text-primary mb-3">Parámetros en Tiempo Real</h4>
            {Object.entries(mockLiveData).map(([key, data]) => (
              <div key={key} className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary capitalize">{key}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    data.status === 'normal' ? 'bg-success' : 'bg-warning'
                  }`} />
                </div>
                <div className="text-2xl font-semibold text-text-primary">
                  {data.value} <span className="text-sm text-text-secondary">{data.unit}</span>
                </div>
              </div>
            ))}
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Estado del Sistema</span>
              </div>
              <p className="text-sm text-text-secondary">
                Todos los parámetros dentro de rangos normales. Última actualización: hace 2 segundos.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'calibration' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">Historial de Calibración</h4>
              <Button size="sm" iconName="Plus">Nueva</Button>
            </div>
            
            <div className="space-y-3">
              {mockCalibrationHistory.map((cal, index) => (
                <div key={index} className="border scientific-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{cal.type}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cal.result === 'Passed' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                    }`}>
                      {cal.result}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {formatDate(cal.date)} • {cal.technician}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">Programa de Mantenimiento</h4>
              <Button size="sm" iconName="Plus">Agregar</Button>
            </div>
            
            <div className="space-y-3">
              {mockMaintenanceSchedule.map((task, index) => (
                <div key={index} className="border scientific-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{task.task}</span>
                    <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary mb-2">
                    Próxima: {formatDate(task.nextDate)} • {task.frequency}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="xs" variant="outline">Completar</Button>
                    <Button size="xs" variant="ghost">Posponer</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDetailsPanel;