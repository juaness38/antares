import React from 'react';
import Icon from '../../../components/AppIcon';

const QueueStatsCard = ({ title, value, subtitle, icon, color = 'primary', trend }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20'
  };

  return (
    <div className="bg-card border scientific-border rounded-lg p-6 scientific-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.direction === 'up' ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-secondary">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default QueueStatsCard;