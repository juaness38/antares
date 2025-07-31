import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'experiment_completed',
      title: 'Experimento EXP-2024-003 completado',
      description: 'Fermentación batch optimizada finalizada con éxito',
      timestamp: '14:32',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 2,
      type: 'device_alert',
      title: 'Alerta de calibración',
      description: 'Espectrómetro-01 requiere calibración en 2 horas',
      timestamp: '14:15',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 3,
      type: 'ai_decision',
      title: 'IA ajustó parámetros',
      description: 'Driver IA optimizó temperatura en biorreactor BR-02',
      timestamp: '13:58',
      icon: 'Brain',
      color: 'primary'
    },
    {
      id: 4,
      type: 'analysis_started',
      title: 'Análisis iniciado',
      description: 'Procesamiento de datos de proteínas recombinantes',
      timestamp: '13:45',
      icon: 'BarChart3',
      color: 'primary'
    },
    {
      id: 5,
      type: 'device_connected',
      title: 'Dispositivo conectado',
      description: 'ESP32-Lab-05 se conectó al sistema',
      timestamp: '13:30',
      icon: 'Wifi',
      color: 'success'
    },
    {
      id: 6,
      type: 'protocol_created',
      title: 'Nuevo protocolo creado',
      description: 'Dr. García creó protocolo de purificación de proteínas',
      timestamp: '12:15',
      icon: 'FileText',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="bg-card border scientific-border rounded-lg scientific-shadow">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Actividad Reciente</h2>
              <p className="text-sm text-text-secondary">Eventos del sistema en tiempo real</p>
            </div>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 scientific-transition">
            Ver todo
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(activity.color)}`}>
                <Icon name={activity.icon} size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {activity.description}
                </p>
              </div>

              {/* Timeline connector */}
              {index < activities.length - 1 && (
                <div className="absolute left-10 mt-8 w-px h-6 bg-border"></div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:text-primary/80 scientific-transition">
            Cargar más actividades
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;