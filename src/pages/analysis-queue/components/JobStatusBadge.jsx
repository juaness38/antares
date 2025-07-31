import React from 'react';
import Icon from '../../../components/AppIcon';

const JobStatusBadge = ({ status, showIcon = true }) => {
  const statusConfig = {
    queued: {
      label: 'En Cola',
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      icon: 'Clock'
    },
    running: {
      label: 'Ejecutando',
      color: 'bg-primary/10 text-primary border-primary/20',
      icon: 'Play'
    },
    completed: {
      label: 'Completado',
      color: 'bg-success/10 text-success border-success/20',
      icon: 'CheckCircle'
    },
    failed: {
      label: 'Fallido',
      color: 'bg-error/10 text-error border-error/20',
      icon: 'XCircle'
    },
    cancelled: {
      label: 'Cancelado',
      color: 'bg-warning/10 text-warning border-warning/20',
      icon: 'StopCircle'
    },
    paused: {
      label: 'Pausado',
      color: 'bg-warning/10 text-warning border-warning/20',
      icon: 'Pause'
    }
  };

  const config = statusConfig[status] || statusConfig.queued;

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color}`}>
      {showIcon && <Icon name={config.icon} size={14} />}
      <span>{config.label}</span>
    </div>
  );
};

export default JobStatusBadge;