import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceTable = ({ devices, onDeviceSelect, selectedDevice, onDeviceAction }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

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

  const getDeviceTypeName = (type) => {
    const typeNames = {
      'bioreactor': 'Biorreactor',
      'sensor': 'Sensor',
      'esp32': 'ESP32 Controller',
      'spectrometer': 'Espectrómetro',
      'ph_meter': 'Medidor de pH',
      'temperature_sensor': 'Sensor de Temperatura',
      'pressure_sensor': 'Sensor de Presión'
    };
    return typeNames[type] || type;
  };

  const formatLastCommunication = (timestamp) => {
    if (!timestamp) return 'Nunca';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
    return date.toLocaleDateString('es-ES');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDevices = [...devices].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted scientific-transition"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-surface rounded-lg shadow-scientific border scientific-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <SortHeader field="name">Dispositivo</SortHeader>
              <SortHeader field="type">Tipo</SortHeader>
              <SortHeader field="status">Estado</SortHeader>
              <SortHeader field="location">Ubicación</SortHeader>
              <SortHeader field="lastCommunication">Última Comunicación</SortHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Experimentos
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedDevices.map((device) => (
              <tr 
                key={device.id}
                className={`hover:bg-muted scientific-transition cursor-pointer ${
                  selectedDevice?.id === device.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onDeviceSelect(device)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`
                      flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center
                      ${device.status === 'connected' ? 'bg-success/10' : 'bg-muted'}
                    `}>
                      <Icon 
                        name={getDeviceTypeIcon(device.type)} 
                        size={20} 
                        className={device.status === 'connected' ? 'text-success' : 'text-text-secondary'}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">{device.name}</div>
                      <div className="text-sm text-text-secondary">{device.model}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-primary">{getDeviceTypeName(device.type)}</span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Icon 
                      name={getStatusIcon(device.status)} 
                      size={16} 
                      className={`mr-2 ${getStatusColor(device.status)}`}
                    />
                    <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                      {getStatusText(device.status)}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Icon name="MapPin" size={14} className="text-text-secondary mr-1" />
                    <span className="text-sm text-text-primary">{device.location}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-secondary">
                    {formatLastCommunication(device.lastCommunication)}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {device.assignedExperiments.length > 0 ? (
                      <div className="flex items-center">
                        <Icon name="FlaskConical" size={14} className="text-primary mr-1" />
                        <span className="text-sm text-primary font-medium">
                          {device.assignedExperiments.length}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-text-secondary">Sin asignar</span>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeviceAction('configure', device);
                      }}
                      title="Configurar"
                    >
                      <Icon name="Settings" size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeviceAction('calibrate', device);
                      }}
                      title="Calibrar"
                    >
                      <Icon name="Target" size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeviceAction('restart', device);
                      }}
                      title="Reiniciar"
                    >
                      <Icon name="RotateCcw" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {devices.length === 0 && (
        <div className="text-center py-12">
          <Icon name="HardDrive" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No hay dispositivos registrados</h3>
          <p className="text-text-secondary">Comienza registrando tu primer dispositivo de laboratorio</p>
        </div>
      )}
    </div>
  );
};

export default DeviceTable;