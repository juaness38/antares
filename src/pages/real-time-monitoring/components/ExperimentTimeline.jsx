import React from 'react';
import Icon from '../../../components/AppIcon';

const ExperimentTimeline = ({ experiment }) => {
  const timelineSteps = [
    {
      id: 1,
      title: "Inicialización del Sistema",
      description: "Calibración de sensores y verificación de dispositivos",
      status: "completed",
      timestamp: "14:30:15",
      duration: "2m 30s"
    },
    {
      id: 2,
      title: "Preparación del Medio",
      description: "Ajuste de pH y temperatura inicial",
      status: "completed",
      timestamp: "14:32:45",
      duration: "5m 15s"
    },
    {
      id: 3,
      title: "Inoculación",
      description: "Introducción de cultivo bacteriano",
      status: "completed",
      timestamp: "14:38:00",
      duration: "1m 45s"
    },
    {
      id: 4,
      title: "Fase de Crecimiento",
      description: "Monitoreo de densidad óptica y metabolitos",
      status: "in-progress",
      timestamp: "14:39:45",
      duration: "En curso - 18m 58s"
    },
    {
      id: 5,
      title: "Análisis de Proteínas",
      description: "Extracción y caracterización proteica",
      status: "pending",
      timestamp: "15:30:00",
      duration: "Estimado: 45m"
    },
    {
      id: 6,
      title: "Finalización",
      description: "Limpieza y almacenamiento de muestras",
      status: "pending",
      timestamp: "16:15:00",
      duration: "Estimado: 10m"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'in-progress':
        return <Icon name="Clock" size={20} className="text-warning" />;
      case 'pending':
        return <Icon name="Circle" size={20} className="text-text-secondary" />;
      default:
        return <Icon name="Circle" size={20} className="text-text-secondary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/10';
      case 'in-progress':
        return 'border-warning bg-warning/10';
      case 'pending':
        return 'border-border bg-muted';
      default:
        return 'border-border bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg scientific-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Cronología del Experimento
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Timer" size={16} />
          <span>Tiempo total: 28m 58s</span>
        </div>
      </div>

      <div className="space-y-4">
        {timelineSteps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}>
                {getStatusIcon(step.status)}
              </div>
              {index < timelineSteps.length - 1 && (
                <div className={`w-0.5 h-12 mt-2 ${
                  step.status === 'completed' ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-medium ${
                  step.status === 'in-progress' ? 'text-warning' : 'text-text-primary'
                }`}>
                  {step.title}
                </h4>
                <span className="text-sm text-text-secondary">
                  {step.timestamp}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-2">
                {step.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span>Duración: {step.duration}</span>
                {step.status === 'in-progress' && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full scientific-pulse" />
                    <span>En progreso</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress summary */}
      <div className="mt-6 pt-4 border-t scientific-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Progreso general</span>
          <span className="font-medium text-text-primary">50% completado</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full scientific-transition" style={{ width: '50%' }} />
        </div>
      </div>
    </div>
  );
};

export default ExperimentTimeline;