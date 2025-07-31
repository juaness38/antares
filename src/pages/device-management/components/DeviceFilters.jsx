import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DeviceFilters = ({ filters, onFilterChange, onClearFilters, deviceCounts }) => {
  const deviceTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'bioreactor', label: 'Biorreactor' },
    { value: 'sensor', label: 'Sensor' },
    { value: 'esp32', label: 'ESP32 Controller' },
    { value: 'spectrometer', label: 'Espectrómetro' },
    { value: 'ph_meter', label: 'Medidor de pH' },
    { value: 'temperature_sensor', label: 'Sensor de Temperatura' },
    { value: 'pressure_sensor', label: 'Sensor de Presión' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'connected', label: 'Conectado' },
    { value: 'disconnected', label: 'Desconectado' },
    { value: 'warning', label: 'Advertencia' }
  ];

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'Laboratorio A', label: 'Laboratorio A' },
    { value: 'Laboratorio B', label: 'Laboratorio B' },
    { value: 'Laboratorio C', label: 'Laboratorio C' },
    { value: 'Sala de Cultivo', label: 'Sala de Cultivo' },
    { value: 'Área de Análisis', label: 'Área de Análisis' }
  ];

  const hasActiveFilters = filters.search || filters.type || filters.status || filters.location;

  return (
    <div className="bg-surface rounded-lg shadow-scientific border scientific-border p-6 mb-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Dispositivos</p>
              <p className="text-2xl font-semibold text-text-primary">{deviceCounts.total}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="HardDrive" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Conectados</p>
              <p className="text-2xl font-semibold text-success">{deviceCounts.connected}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Desconectados</p>
              <p className="text-2xl font-semibold text-error">{deviceCounts.disconnected}</p>
            </div>
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Con Advertencias</p>
              <p className="text-2xl font-semibold text-warning">{deviceCounts.warning}</p>
            </div>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar dispositivos..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        <Select
          options={deviceTypeOptions}
          value={filters.type}
          onChange={(value) => onFilterChange('type', value)}
          placeholder="Tipo de dispositivo"
        />

        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Estado"
        />

        <Select
          options={locationOptions}
          value={filters.location}
          onChange={(value) => onFilterChange('location', value)}
          placeholder="Ubicación"
        />
      </div>

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t scientific-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Filtros activos:</span>
            
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Búsqueda: "{filters.search}"
              </span>
            )}
            
            {filters.type && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Tipo: {deviceTypeOptions.find(opt => opt.value === filters.type)?.label}
              </span>
            )}
            
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Estado: {statusOptions.find(opt => opt.value === filters.status)?.label}
              </span>
            )}
            
            {filters.location && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Ubicación: {filters.location}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeviceFilters;