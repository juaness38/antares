import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledProtocols = () => {
  const scheduledProtocols = [
    {
      id: 'PROT-2024-001',
      name: 'Purificación de His-Tag',
      scheduledTime: '16:00',
      duration: '3h 30min',
      priority: 'high',
      devices: ['BR-01', 'HPLC-02'],
      status: 'pending'
    },
    {
      id: 'PROT-2024-002',
      name: 'Análisis de Western Blot',
      scheduledTime: '18:30',
      duration: '2h 15min',
      priority: 'medium',
      devices: ['IMG-01', 'WASH-03'],
      status: 'pending'
    },
    {
      id: 'PROT-2024-003',
      name: 'Fermentación Nocturna',
      scheduledTime: '22:00',
      duration: '12h 00min',
      priority: 'low',
      devices: ['BR-03', 'BR-04'],
      status: 'scheduled'
    },
    {
      id: 'PROT-2024-004',
      name: 'Extracción de ADN',
      scheduledTime: '08:00',
      duration: '4h 45min',
      priority: 'high',
      devices: ['CENT-01', 'THERM-02'],
      status: 'tomorrow'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'scheduled': return 'Calendar';
      case 'tomorrow': return 'Sun';
      default: return 'Clock';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'scheduled': return 'Programado';
      case 'tomorrow': return 'Mañana';
      default: return 'Pendiente';
    }
  };

  return (
    <div className="bg-card border scientific-border rounded-lg scientific-shadow">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Protocolos Programados</h2>
              <p className="text-sm text-text-secondary">Próximas ejecuciones automáticas</p>
            </div>
          </div>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Programar
          </Button>
        </div>
      </div>

      {/* Protocols List */}
      <div className="p-6">
        <div className="space-y-4">
          {scheduledProtocols.map((protocol) => (
            <div key={protocol.id} className="border scientific-border rounded-lg p-4 hover:bg-muted/50 scientific-transition">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getStatusIcon(protocol.status)} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">{protocol.name}</h3>
                    <p className="text-xs text-text-secondary">{protocol.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(protocol.priority)}`}>
                    {getPriorityLabel(protocol.priority)}
                  </span>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {protocol.scheduledTime} ({protocol.duration})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Cpu" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {protocol.devices.join(', ')}
                  </span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-xs text-text-secondary">
                    {getStatusLabel(protocol.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-xs text-primary hover:text-primary/80 scientific-transition">
                    Editar
                  </button>
                  <button className="text-xs text-error hover:text-error/80 scientific-transition">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t scientific-border">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" iconName="Play" iconPosition="left" className="w-full">
              Ejecutar Ahora
            </Button>
            <Button variant="outline" iconName="Calendar" iconPosition="left" className="w-full">
              Ver Calendario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledProtocols;