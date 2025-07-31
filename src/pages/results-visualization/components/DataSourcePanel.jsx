import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataSourcePanel = ({ onDataSourceChange, selectedExperiments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('last-7-days');

  const experiments = [
    {
      id: 'exp-001',
      name: 'Optimización de Biorreactor A-2024-001',
      category: 'bioreactor',
      date: '2024-07-15',
      status: 'completed',
      dataPoints: 1250,
      parameters: ['pH', 'Temperatura', 'Oxígeno Disuelto', 'Biomasa']
    },
    {
      id: 'exp-002',
      name: 'Análisis Proteico BLAST-2024-002',
      category: 'protein',
      date: '2024-07-14',
      status: 'completed',
      dataPoints: 850,
      parameters: ['Secuencia', 'Homología', 'Función', 'Estructura']
    },
    {
      id: 'exp-003',
      name: 'Síntesis de Compuestos Drug-2024-003',
      category: 'drug-discovery',
      date: '2024-07-13',
      status: 'completed',
      dataPoints: 2100,
      parameters: ['Afinidad', 'Toxicidad', 'Solubilidad', 'Biodisponibilidad']
    },
    {
      id: 'exp-004',
      name: 'Monitoreo Metabólico Meta-2024-004',
      category: 'metabolic',
      date: '2024-07-12',
      status: 'completed',
      dataPoints: 1800,
      parameters: ['Glucosa', 'Lactato', 'Acetato', 'Etanol']
    },
    {
      id: 'exp-005',
      name: 'Calibración Sensores Sens-2024-005',
      category: 'sensors',
      date: '2024-07-11',
      status: 'completed',
      dataPoints: 950,
      parameters: ['Precisión', 'Deriva', 'Linealidad', 'Repetibilidad']
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Todas las Categorías' },
    { value: 'bioreactor', label: 'Biorreactores' },
    { value: 'protein', label: 'Análisis Proteico' },
    { value: 'drug-discovery', label: 'Descubrimiento de Fármacos' },
    { value: 'metabolic', label: 'Análisis Metabólico' },
    { value: 'sensors', label: 'Sensores y Calibración' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Últimos 7 días' },
    { value: 'last-30-days', label: 'Últimos 30 días' },
    { value: 'last-3-months', label: 'Últimos 3 meses' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExperimentToggle = (experimentId) => {
    const updatedSelection = selectedExperiments.includes(experimentId)
      ? selectedExperiments.filter(id => id !== experimentId)
      : [...selectedExperiments, experimentId];
    onDataSourceChange(updatedSelection);
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      bioreactor: 'FlaskConical',
      protein: 'Dna',
      'drug-discovery': 'Pill',
      metabolic: 'Activity',
      sensors: 'Gauge'
    };
    return iconMap[category] || 'FileText';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      completed: 'text-success',
      running: 'text-warning',
      failed: 'text-destructive'
    };
    return colorMap[status] || 'text-text-secondary';
  };

  return (
    <div className="w-80 bg-surface border-r scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Database" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Fuentes de Datos</h3>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Buscar experimentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="space-y-3">
          <Select
            label="Categoría"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          
          <Select
            label="Período"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>

      {/* Experiments List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredExperiments.map((experiment) => (
            <div
              key={experiment.id}
              className={`
                p-3 rounded-lg border scientific-transition cursor-pointer
                ${selectedExperiments.includes(experiment.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
              onClick={() => handleExperimentToggle(experiment.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedExperiments.includes(experiment.id)}
                    onChange={() => handleExperimentToggle(experiment.id)}
                    size="sm"
                  />
                  <Icon 
                    name={getCategoryIcon(experiment.category)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                <div className={`flex items-center space-x-1 ${getStatusColor(experiment.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span className="text-xs font-medium capitalize">{experiment.status}</span>
                </div>
              </div>

              <h4 className="font-medium text-text-primary text-sm mb-1 line-clamp-2">
                {experiment.name}
              </h4>
              
              <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                <span>{experiment.date}</span>
                <span>{experiment.dataPoints.toLocaleString()} puntos</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {experiment.parameters.slice(0, 3).map((param) => (
                  <span
                    key={param}
                    className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                  >
                    {param}
                  </span>
                ))}
                {experiment.parameters.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                    +{experiment.parameters.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredExperiments.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No se encontraron experimentos</p>
          </div>
        )}
      </div>

      {/* Selected Summary */}
      {selectedExperiments.length > 0 && (
        <div className="p-4 border-t scientific-border bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {selectedExperiments.length} experimento{selectedExperiments.length !== 1 ? 's' : ''} seleccionado{selectedExperiments.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDataSourceChange([])}
              iconName="X"
              iconPosition="left"
            >
              Limpiar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourcePanel;