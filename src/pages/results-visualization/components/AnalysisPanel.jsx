import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AnalysisPanel = ({ selectedData, onAnalysisChange }) => {
  const [activeTab, setActiveTab] = useState('statistics');
  const [selectedMetrics, setSelectedMetrics] = useState(['mean', 'std']);
  const [trendPeriod, setTrendPeriod] = useState('7-days');
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState('');

  const tabs = [
    { id: 'statistics', label: 'Estadísticas', icon: 'Calculator' },
    { id: 'trends', label: 'Tendencias', icon: 'TrendingUp' },
    { id: 'annotations', label: 'Anotaciones', icon: 'MessageSquare' },
    { id: 'comparison', label: 'Comparación', icon: 'GitCompare' }
  ];

  const statisticalMetrics = [
    { value: 'mean', label: 'Media' },
    { value: 'median', label: 'Mediana' },
    { value: 'std', label: 'Desviación Estándar' },
    { value: 'variance', label: 'Varianza' },
    { value: 'min', label: 'Mínimo' },
    { value: 'max', label: 'Máximo' },
    { value: 'q1', label: 'Cuartil 1' },
    { value: 'q3', label: 'Cuartil 3' },
    { value: 'correlation', label: 'Correlación' },
    { value: 'regression', label: 'Regresión Lineal' }
  ];

  const trendPeriodOptions = [
    { value: '1-day', label: '1 Día' },
    { value: '7-days', label: '7 Días' },
    { value: '30-days', label: '30 Días' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const mockStatistics = {
    mean: 24.7,
    median: 24.5,
    std: 2.3,
    variance: 5.29,
    min: 18.2,
    max: 31.4,
    q1: 22.8,
    q3: 26.9,
    correlation: 0.87,
    regression: 'y = 0.45x + 12.3'
  };

  const mockAnnotations = [
    {
      id: 1,
      text: 'Pico anómalo detectado en el minuto 45 - posible contaminación',
      timestamp: '2024-07-15 14:30',
      author: 'Dr. García',
      type: 'warning'
    },
    {
      id: 2,
      text: 'Condiciones óptimas alcanzadas - mantener parámetros',
      timestamp: '2024-07-15 16:15',
      author: 'Dr. Rodríguez',
      type: 'success'
    },
    {
      id: 3,
      text: 'Revisar calibración del sensor de pH',
      timestamp: '2024-07-15 18:45',
      author: 'Técnico López',
      type: 'info'
    }
  ];

  const handleMetricToggle = (metric) => {
    const updated = selectedMetrics.includes(metric)
      ? selectedMetrics.filter(m => m !== metric)
      : [...selectedMetrics, metric];
    setSelectedMetrics(updated);
    onAnalysisChange({ type: 'metrics', data: updated });
  };

  const handleAddAnnotation = () => {
    if (newAnnotation.trim()) {
      const annotation = {
        id: Date.now(),
        text: newAnnotation,
        timestamp: new Date().toLocaleString('es-ES'),
        author: 'Usuario Actual',
        type: 'info'
      };
      setAnnotations([...annotations, annotation]);
      setNewAnnotation('');
      onAnalysisChange({ type: 'annotation', data: annotation });
    }
  };

  const getAnnotationIcon = (type) => {
    const iconMap = {
      warning: 'AlertTriangle',
      success: 'CheckCircle',
      info: 'Info',
      error: 'XCircle'
    };
    return iconMap[type] || 'MessageSquare';
  };

  const getAnnotationColor = (type) => {
    const colorMap = {
      warning: 'text-warning',
      success: 'text-success',
      info: 'text-primary',
      error: 'text-destructive'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const renderStatisticsTab = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-text-primary mb-3">Métricas Disponibles</h4>
        <div className="space-y-2">
          {statisticalMetrics.map((metric) => (
            <Checkbox
              key={metric.value}
              label={metric.label}
              checked={selectedMetrics.includes(metric.value)}
              onChange={() => handleMetricToggle(metric.value)}
            />
          ))}
        </div>
      </div>

      {selectedMetrics.length > 0 && (
        <div className="border-t scientific-border pt-4">
          <h4 className="font-medium text-text-primary mb-3">Resultados</h4>
          <div className="space-y-2">
            {selectedMetrics.map((metric) => (
              <div key={metric} className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm text-text-secondary">
                  {statisticalMetrics.find(m => m.value === metric)?.label}
                </span>
                <span className="font-mono text-sm text-text-primary">
                  {mockStatistics[metric]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTrendsTab = () => (
    <div className="space-y-4">
      <Select
        label="Período de Análisis"
        options={trendPeriodOptions}
        value={trendPeriod}
        onChange={setTrendPeriod}
      />

      <div className="space-y-3">
        <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="font-medium text-success">Tendencia Positiva</span>
          </div>
          <p className="text-sm text-text-secondary">
            Incremento del 12.5% en la producción de biomasa durante los últimos 7 días
          </p>
        </div>

        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="font-medium text-warning">Variabilidad Detectada</span>
          </div>
          <p className="text-sm text-text-secondary">
            Fluctuaciones en el pH superiores al rango normal (±0.5)
          </p>
        </div>

        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="font-medium text-primary">Correlación Identificada</span>
          </div>
          <p className="text-sm text-text-secondary">
            Fuerte correlación (r=0.87) entre temperatura y velocidad de crecimiento
          </p>
        </div>
      </div>
    </div>
  );

  const renderAnnotationsTab = () => (
    <div className="space-y-4">
      <div>
        <Input
          label="Nueva Anotación"
          type="text"
          placeholder="Agregar comentario o observación..."
          value={newAnnotation}
          onChange={(e) => setNewAnnotation(e.target.value)}
          className="mb-2"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddAnnotation}
          disabled={!newAnnotation.trim()}
          iconName="Plus"
          iconPosition="left"
          fullWidth
        >
          Agregar Anotación
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Anotaciones Recientes</h4>
        {mockAnnotations.map((annotation) => (
          <div key={annotation.id} className="p-3 border scientific-border rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon 
                name={getAnnotationIcon(annotation.type)} 
                size={16} 
                className={getAnnotationColor(annotation.type)} 
              />
              <div className="flex-1">
                <p className="text-sm text-text-primary mb-1">{annotation.text}</p>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{annotation.author}</span>
                  <span>{annotation.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Icon name="GitCompare" size={48} className="text-text-secondary mx-auto mb-3" />
        <p className="text-text-secondary mb-2">Comparación de Experimentos</p>
        <p className="text-sm text-text-secondary">
          Selecciona múltiples experimentos para comparar resultados
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-surface border-l scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Análisis</h3>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center space-x-1"
            >
              <Icon name={tab.icon} size={14} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'statistics' && renderStatisticsTab()}
        {activeTab === 'trends' && renderTrendsTab()}
        {activeTab === 'annotations' && renderAnnotationsTab()}
        {activeTab === 'comparison' && renderComparisonTab()}
      </div>
    </div>
  );
};

export default AnalysisPanel;