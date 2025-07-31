import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import JobStatusBadge from './JobStatusBadge';
import JobProgressBar from './JobProgressBar';

const JobTable = ({ 
  jobs, 
  selectedJobs, 
  onJobSelect, 
  onSelectAll, 
  onJobAction, 
  onJobClick,
  sortConfig,
  onSort 
}) => {
  const columns = [
    { key: 'select', label: '', width: 'w-12' },
    { key: 'name', label: 'Nombre del Análisis', sortable: true },
    { key: 'type', label: 'Tipo', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'priority', label: 'Prioridad', sortable: true },
    { key: 'progress', label: 'Progreso', width: 'w-48' },
    { key: 'user', label: 'Usuario', sortable: true },
    { key: 'submitted', label: 'Enviado', sortable: true },
    { key: 'estimated', label: 'Tiempo Est.', sortable: true },
    { key: 'resources', label: 'Recursos', width: 'w-24' },
    { key: 'actions', label: 'Acciones', width: 'w-32' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getJobActions = (job) => {
    const actions = [];
    
    if (job.status === 'running') {
      actions.push({ key: 'pause', icon: 'Pause', label: 'Pausar' });
      actions.push({ key: 'cancel', icon: 'StopCircle', label: 'Cancelar' });
    } else if (job.status === 'paused') {
      actions.push({ key: 'resume', icon: 'Play', label: 'Reanudar' });
      actions.push({ key: 'cancel', icon: 'StopCircle', label: 'Cancelar' });
    } else if (job.status === 'queued') {
      actions.push({ key: 'cancel', icon: 'StopCircle', label: 'Cancelar' });
      actions.push({ key: 'priority', icon: 'ArrowUp', label: 'Prioridad' });
    } else if (job.status === 'failed') {
      actions.push({ key: 'retry', icon: 'RotateCcw', label: 'Reintentar' });
      actions.push({ key: 'delete', icon: 'Trash2', label: 'Eliminar' });
    } else if (job.status === 'completed') {
      actions.push({ key: 'view', icon: 'Eye', label: 'Ver Resultados' });
      actions.push({ key: 'download', icon: 'Download', label: 'Descargar' });
    }
    
    return actions;
  };

  const handleSort = (key) => {
    if (!columns.find(col => col.key === key)?.sortable) return;
    
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border scientific-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b scientific-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-text-primary ${column.width || ''}`}
                >
                  {column.key === 'select' ? (
                    <Checkbox
                      checked={selectedJobs.length === jobs.length && jobs.length > 0}
                      onChange={(e) => onSelectAll(e.target.checked)}
                      indeterminate={selectedJobs.length > 0 && selectedJobs.length < jobs.length}
                    />
                  ) : (
                    <div
                      className={`flex items-center space-x-2 ${
                        column.sortable ? 'cursor-pointer hover:text-primary scientific-transition' : ''
                      }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <span>{column.label}</span>
                      {column.sortable && (
                        <Icon name={getSortIcon(column.key)} size={14} />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-muted/50 scientific-transition cursor-pointer"
                onClick={() => onJobClick(job)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onChange={(e) => onJobSelect(job.id, e.target.checked)}
                  />
                </td>
                
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-text-primary">{job.name}</p>
                    <p className="text-sm text-text-secondary">{job.id}</p>
                  </div>
                </td>
                
                <td className="px-4 py-4">
                  <span className="text-sm text-text-primary">{job.type}</span>
                </td>
                
                <td className="px-4 py-4">
                  <JobStatusBadge status={job.status} />
                </td>
                
                <td className="px-4 py-4">
                  <div className={`flex items-center space-x-1 ${getPriorityColor(job.priority)}`}>
                    <Icon name={getPriorityIcon(job.priority)} size={14} />
                    <span className="text-sm capitalize">{job.priority}</span>
                  </div>
                </td>
                
                <td className="px-4 py-4">
                  <JobProgressBar
                    progress={job.progress}
                    status={job.status}
                    estimatedTime={job.estimatedTime}
                  />
                </td>
                
                <td className="px-4 py-4">
                  <span className="text-sm text-text-primary">{job.user}</span>
                </td>
                
                <td className="px-4 py-4">
                  <span className="text-sm text-text-secondary">
                    {formatDate(job.submittedAt)}
                  </span>
                </td>
                
                <td className="px-4 py-4">
                  <span className="text-sm text-text-secondary">
                    {job.estimatedCompletion || '-'}
                  </span>
                </td>
                
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Cpu" size={14} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">{job.cpuCores}</span>
                  </div>
                </td>
                
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    {getJobActions(job).slice(0, 2).map((action) => (
                      <Button
                        key={action.key}
                        variant="ghost"
                        size="icon"
                        iconName={action.icon}
                        onClick={() => onJobAction(job.id, action.key)}
                        className="h-8 w-8"
                        title={action.label}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No se encontraron trabajos con los filtros aplicados</p>
        </div>
      )}
    </div>
  );
};

export default JobTable;