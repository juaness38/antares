import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VisualizationToolbar = ({ 
  currentView, 
  onViewChange, 
  onExport, 
  onShare, 
  onFullscreen,
  isFullscreen 
}) => {
  const [exportFormat, setExportFormat] = useState('png');

  const viewOptions = [
    { value: 'line-chart', label: 'Gráfico de Líneas', icon: 'TrendingUp' },
    { value: 'scatter-plot', label: 'Gráfico de Dispersión', icon: 'Scatter3D' },
    { value: 'heatmap', label: 'Mapa de Calor', icon: 'Grid3X3' },
    { value: 'molecular-3d', label: 'Estructura Molecular 3D', icon: 'Atom' },
    { value: 'bar-chart', label: 'Gráfico de Barras', icon: 'BarChart3' },
    { value: 'data-table', label: 'Tabla de Datos', icon: 'Table' }
  ];

  const exportOptions = [
    { value: 'png', label: 'PNG (Imagen)' },
    { value: 'svg', label: 'SVG (Vector)' },
    { value: 'pdf', label: 'PDF (Documento)' },
    { value: 'csv', label: 'CSV (Datos)' },
    { value: 'json', label: 'JSON (Datos)' }
  ];

  const handleExport = () => {
    onExport(exportFormat);
  };

  return (
    <div className="bg-surface border-b scientific-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section - View Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={20} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Vista:</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewOptions.map((option) => (
              <Button
                key={option.value}
                variant={currentView === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(option.value)}
                className="flex items-center space-x-2"
                title={option.label}
              >
                <Icon name={option.icon} size={16} />
                <span className="hidden lg:inline">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Export Controls */}
          <div className="flex items-center space-x-2">
            <Select
              options={exportOptions}
              value={exportFormat}
              onChange={setExportFormat}
              placeholder="Formato"
              className="w-32"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Exportar
            </Button>
          </div>

          {/* Share Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
          >
            Compartir
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationToolbar;