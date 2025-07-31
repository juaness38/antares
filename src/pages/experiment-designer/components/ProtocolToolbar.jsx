import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProtocolToolbar = ({ onSave, onLoad, onValidate, onSimulate, validationStatus }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const protocolTemplates = [
    { value: '', label: 'Seleccionar plantilla...' },
    { value: 'pcr-basic', label: 'PCR Básico' },
    { value: 'protein-purification', label: 'Purificación de Proteínas' },
    { value: 'cell-culture', label: 'Cultivo Celular' },
    { value: 'spectroscopy-analysis', label: 'Análisis Espectroscópico' },
    { value: 'chromatography-hplc', label: 'Cromatografía HPLC' },
    { value: 'enzyme-assay', label: 'Ensayo Enzimático' }
  ];

  const getValidationStatusColor = () => {
    switch (validationStatus) {
      case 'valid': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getValidationStatusIcon = () => {
    switch (validationStatus) {
      case 'valid': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Clock';
    }
  };

  const getValidationStatusText = () => {
    switch (validationStatus) {
      case 'valid': return 'Protocolo válido';
      case 'warning': return 'Advertencias encontradas';
      case 'error': return 'Errores encontrados';
      default: return 'Sin validar';
    }
  };

  const handleTemplateLoad = (templateId) => {
    if (templateId) {
      onLoad(templateId);
      setSelectedTemplate('');
    }
  };

  return (
    <div className="bg-surface border-b scientific-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section - File Operations */}
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onLoad('new')}
          >
            Nuevo
          </Button>
          
          <Button
            variant="outline"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={onLoad}
          >
            Abrir
          </Button>
          
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
          >
            Guardar
          </Button>
          
          <div className="w-px h-6 bg-border" />
          
          <div className="w-64">
            <Select
              placeholder="Cargar plantilla..."
              options={protocolTemplates}
              value={selectedTemplate}
              onChange={handleTemplateLoad}
            />
          </div>
        </div>

        {/* Center Section - Protocol Info */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">Protocolo Actual</p>
            <p className="text-xs text-text-secondary">Experimento_PCR_v2.1</p>
          </div>
          
          <div className="w-px h-8 bg-border" />
          
          <div className="flex items-center space-x-2">
            <Icon 
              name={getValidationStatusIcon()} 
              size={16} 
              className={getValidationStatusColor()} 
            />
            <span className={`text-sm font-medium ${getValidationStatusColor()}`}>
              {getValidationStatusText()}
            </span>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="CheckCircle"
            iconPosition="left"
            onClick={onValidate}
          >
            Validar
          </Button>
          
          <Button
            variant="outline"
            iconName="Play"
            iconPosition="left"
            onClick={onSimulate}
          >
            Simular
          </Button>
          
          <div className="w-px h-6 bg-border" />
          
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
          >
            Compartir
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
          
          <Button
            variant="outline"
            iconName="Settings"
            size="icon"
          />
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t scientific-border">
        {/* Protocol Statistics */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">8</span> componentes
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="GitBranch" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">3</span> conexiones
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Duración estimada: <span className="font-medium text-text-primary">2h 45m</span>
            </span>
          </div>
        </div>

        {/* View Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Vista:</span>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md scientific-transition">
              Diseño
            </button>
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary scientific-transition">
              Código
            </button>
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary scientific-transition">
              Cronograma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolToolbar;