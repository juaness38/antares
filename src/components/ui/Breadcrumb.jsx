import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const breadcrumbMap = {
    '/dashboard': [
      { label: 'Dashboard', path: '/dashboard' }
    ],
    '/experiment-designer': [
      { label: 'Experimentos', path: '/experiment-designer' },
      { label: 'Diseñador', path: '/experiment-designer' }
    ],
    '/device-management': [
      { label: 'Experimentos', path: '/experiment-designer' },
      { label: 'Gestión de Dispositivos', path: '/device-management' }
    ],
    '/real-time-monitoring': [
      { label: 'Monitoreo', path: '/real-time-monitoring' },
      { label: 'Tiempo Real', path: '/real-time-monitoring' }
    ],
    '/analysis-queue': [
      { label: 'Análisis', path: '/analysis-queue' },
      { label: 'Cola de Análisis', path: '/analysis-queue' }
    ],
    '/results-visualization': [
      { label: 'Análisis', path: '/analysis-queue' },
      { label: 'Visualización de Resultados', path: '/results-visualization' }
    ]
  };

  const currentBreadcrumbs = breadcrumbMap[location.pathname] || [];

  // Don't show breadcrumbs for dashboard or single-level pages
  if (currentBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      
      {currentBreadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          
          {index === currentBreadcrumbs.length - 1 ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-text-primary scientific-transition"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;