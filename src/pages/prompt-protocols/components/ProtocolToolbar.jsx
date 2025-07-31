import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ProtocolToolbar = ({ 
  onSave, 
  onLoad, 
  onValidate, 
  validationStatus,
  protocolStatus 
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const templates = [
    { id: 'new', name: 'Nuevo Protocolo', icon: 'Plus' },
    { id: 'protein-discovery', name: 'Descubrimiento de Proteínas', icon: 'Dna' },
    { id: 'drug-screening', name: 'Screening de Fármacos', icon: 'Pill' },
    { id: 'structure-prediction', name: 'Predicción de Estructura', icon: 'Cube' },
    { id: 'expression-analysis', name: 'Análisis de Expresión', icon: 'BarChart3' },
    { id: 'phylogenetic-study', name: 'Estudio Filogenético', icon: 'GitBranch' }
  ];

  const getValidationIcon = () => {
    switch (validationStatus) {
      case 'valid':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'running':
        return 'Loader';
      default:
        return 'HelpCircle';
    }
  };

  const getValidationColor = () => {
    switch (validationStatus) {
      case 'valid':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      case 'running':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getValidationText = () => {
    switch (validationStatus) {
      case 'valid':
        return 'Protocolo Válido';
      case 'warning':
        return 'Advertencias';
      case 'error':
        return 'Errores Encontrados';
      case 'running':
        return 'Ejecutando...';
      case 'completed':
        return 'Completado';
      default:
        return 'Sin Validar';
    }
  };

  return (
    <div className="bg-surface border-b scientific-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Templates Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              iconName="FileText"
              iconPosition="left"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              Plantillas
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </Button>
            
            {showTemplates && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border scientific-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        onLoad(template.id);
                        setShowTemplates(false);
                      }}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded scientific-transition"
                    >
                      <Icon name={template.icon} size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-border" />

          {/* File Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              iconName="Save"
              iconPosition="left"
              onClick={onSave}
              disabled={protocolStatus === 'running'}
            >
              Guardar
            </Button>
            
            <Button
              variant="ghost"
              iconName="Upload"
              iconPosition="left"
              disabled={protocolStatus === 'running'}
            >
              Importar
            </Button>
            
            <Button
              variant="ghost"
              iconName="Download"
              iconPosition="left"
              disabled={protocolStatus === 'running'}
            >
              Exportar
            </Button>
          </div>
        </div>

        {/* Center Section - Validation Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getValidationIcon()} 
              size={18} 
              className={`${getValidationColor()} ${validationStatus === 'running' ? 'animate-spin' : ''}`}
            />
            <span className={`text-sm font-medium ${getValidationColor()}`}>
              {getValidationText()}
            </span>
          </div>
          
          <Button
            variant="ghost"
            iconName="Shield"
            iconPosition="left"
            onClick={onValidate}
            disabled={protocolStatus === 'running'}
          >
            Validar
          </Button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Version Control */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="GitBranch" size={16} />
            <span>v1.0</span>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-border" />

          {/* Workflow Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              iconName="Play"
              iconPosition="left"
              disabled={protocolStatus === 'running'}
            >
              Previsualizar
            </Button>
            
            <Button
              variant="ghost"
              iconName="Zap"
              iconPosition="left"
              disabled={protocolStatus === 'running'}
            >
              Simular
            </Button>
            
            <Button
              variant="ghost"
              iconName="Share"
              iconPosition="left"
              disabled={protocolStatus === 'running'}
            >
              Compartir
            </Button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-border" />

          {/* Settings */}
          <Button
            variant="ghost"
            iconName="Settings"
            disabled={protocolStatus === 'running'}
          />
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t scientific-border">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomOut"
            disabled={protocolStatus === 'running'}
          />
          <span className="text-sm text-text-secondary px-2">100%</span>
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomIn"
            disabled={protocolStatus === 'running'}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Maximize"
            disabled={protocolStatus === 'running'}
          />
        </div>

        {/* Grid and Snap Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Grid"
            disabled={protocolStatus === 'running'}
          >
            Rejilla
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Magnet"
            disabled={protocolStatus === 'running'}
          >
            Ajustar
          </Button>
        </div>

        {/* View Options */}
        <div className="flex items-center space-x-2">
          <Select
            value="detail"
            className="w-32"
            disabled={protocolStatus === 'running'}
          >
            <option value="detail">Vista Detallada</option>
            <option value="compact">Vista Compacta</option>
            <option value="overview">Vista General</option>
          </Select>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Layout"
            disabled={protocolStatus === 'running'}
          >
            Auto-organizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolToolbar;