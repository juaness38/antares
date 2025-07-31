import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';


const JobFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  selectedJobs, 
  onBulkAction,
  totalJobs 
}) => {
  const analysisTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'blast', label: 'BLAST Search' },
    { value: 'protein_function', label: 'Análisis de Función Proteica' },
    { value: 'molecular_docking', label: 'Acoplamiento Molecular' },
    { value: 'homology_search', label: 'Búsqueda de Homología' },
    { value: 'phylogenetic', label: 'Análisis Filogenético' },
    { value: 'structure_prediction', label: 'Predicción de Estructura' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'queued', label: 'En Cola' },
    { value: 'running', label: 'Ejecutando' },
    { value: 'completed', label: 'Completado' },
    { value: 'failed', label: 'Fallido' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'paused', label: 'Pausado' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Todas las prioridades' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const userOptions = [
    { value: 'all', label: 'Todos los usuarios' },
    { value: 'dr_garcia', label: 'Dr. García' },
    { value: 'dr_martinez', label: 'Dr. Martínez' },
    { value: 'dr_lopez', label: 'Dr. López' },
    { value: 'dr_rodriguez', label: 'Dr. Rodríguez' }
  ];

  const bulkActions = [
    { value: 'cancel', label: 'Cancelar Seleccionados', icon: 'StopCircle' },
    { value: 'pause', label: 'Pausar Seleccionados', icon: 'Pause' },
    { value: 'resume', label: 'Reanudar Seleccionados', icon: 'Play' },
    { value: 'delete', label: 'Eliminar Seleccionados', icon: 'Trash2' }
  ];

  return (
    <div className="bg-card border scientific-border rounded-lg p-6 mb-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Tipo de Análisis"
          options={analysisTypeOptions}
          value={filters.type}
          onChange={(value) => onFilterChange('type', value)}
        />
        
        <Select
          label="Estado"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        
        <Select
          label="Prioridad"
          options={priorityOptions}
          value={filters.priority}
          onChange={(value) => onFilterChange('priority', value)}
        />
        
        <Select
          label="Usuario"
          options={userOptions}
          value={filters.user}
          onChange={(value) => onFilterChange('user', value)}
        />
      </div>

      {/* Search and Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          label="Buscar trabajos"
          type="search"
          placeholder="Nombre del trabajo, ID, descripción..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
        
        <Input
          label="Fecha desde"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        />
        
        <Input
          label="Fecha hasta"
          type="date"
          value={filters.dateTo}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t scientific-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            {totalJobs} trabajos encontrados
          </span>
          
          {selectedJobs.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-primary">
                {selectedJobs.length} seleccionados
              </span>
              
              <div className="flex items-center space-x-2">
                {bulkActions.map((action) => (
                  <Button
                    key={action.value}
                    variant="outline"
                    size="sm"
                    iconName={action.icon}
                    iconPosition="left"
                    onClick={() => onBulkAction(action.value)}
                    className={action.value === 'delete' ? 'text-error border-error hover:bg-error/10' : ''}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={onClearFilters}
          >
            Limpiar Filtros
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;