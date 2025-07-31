import React from 'react';

const JobProgressBar = ({ progress, status, estimatedTime }) => {
  const getProgressColor = () => {
    switch (status) {
      case 'running':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'failed':
        return 'bg-error';
      case 'paused':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const getProgressWidth = () => {
    if (status === 'completed') return '100%';
    if (status === 'failed' || status === 'cancelled') return '0%';
    return `${Math.min(Math.max(progress || 0, 0), 100)}%`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-secondary">
          {status === 'running' ? `${progress || 0}% completado` : 
           status === 'completed' ? 'Completado' :
           status === 'failed' ? 'Fallido' :
           status === 'cancelled' ? 'Cancelado' :
           'En cola'}
        </span>
        {estimatedTime && status === 'running' && (
          <span className="text-xs text-text-secondary">
            ~{estimatedTime} restante
          </span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full scientific-transition ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
};

export default JobProgressBar;