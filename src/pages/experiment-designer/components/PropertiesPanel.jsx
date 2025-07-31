import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertiesPanel = ({ selectedNode, onNodeUpdate, onNodeDelete }) => {
  const [activeTab, setActiveTab] = useState('config');

  if (!selectedNode) {
    return (
      <div className="w-80 bg-surface border-l scientific-border h-full flex flex-col">
        <div className="p-4 border-b scientific-border">
          <h2 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Settings" size={20} className="mr-2" />
            Propiedades
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="MousePointer2" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Selecciona un componente para ver sus propiedades
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'config', name: 'Configuración', icon: 'Settings' },
    { id: 'validation', name: 'Validación', icon: 'CheckCircle' },
    { id: 'advanced', name: 'Avanzado', icon: 'Code' }
  ];

  const temperatureOptions = [
    { value: '4', label: '4°C (Refrigerado)' },
    { value: '25', label: '25°C (Ambiente)' },
    { value: '37', label: '37°C (Corporal)' },
    { value: '95', label: '95°C (Desnaturalización)' }
  ];

  const durationOptions = [
    { value: '30s', label: '30 segundos' },
    { value: '1m', label: '1 minuto' },
    { value: '5m', label: '5 minutos' },
    { value: '30m', label: '30 minutos' },
    { value: '1h', label: '1 hora' },
    { value: '2h', label: '2 horas' }
  ];

  const renderConfigurationTab = () => {
    switch (selectedNode.type) {
      case 'preparation':
        return (
          <div className="space-y-4">
            <Input
              label="Nombre del Paso"
              value={selectedNode.name}
              onChange={(e) => onNodeUpdate(selectedNode.id, { name: e.target.value })}
              placeholder="Ingresa el nombre del paso"
            />
            
            <Select
              label="Temperatura"
              options={temperatureOptions}
              value={selectedNode.temperature || '25'}
              onChange={(value) => onNodeUpdate(selectedNode.id, { temperature: value })}
            />
            
            <Select
              label="Duración"
              options={durationOptions}
              value={selectedNode.duration || '5m'}
              onChange={(value) => onNodeUpdate(selectedNode.id, { duration: value })}
            />
            
            <Input
              label="Volumen (μL)"
              type="number"
              value={selectedNode.volume || '100'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { volume: e.target.value })}
              placeholder="100"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Descripción</label>
              <textarea
                className="w-full p-3 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows="3"
                value={selectedNode.description || ''}
                onChange={(e) => onNodeUpdate(selectedNode.id, { description: e.target.value })}
                placeholder="Describe los pasos específicos..."
              />
            </div>
          </div>
        );
        
      case 'analysis':
        return (
          <div className="space-y-4">
            <Input
              label="Método de Análisis"
              value={selectedNode.method || 'Espectroscopía UV-Vis'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { method: e.target.value })}
            />
            
            <Input
              label="Longitud de Onda (nm)"
              type="number"
              value={selectedNode.wavelength || '280'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { wavelength: e.target.value })}
            />
            
            <Input
              label="Tiempo de Lectura"
              value={selectedNode.readTime || '30s'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { readTime: e.target.value })}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Parámetros Adicionales</label>
              <textarea
                className="w-full p-3 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows="3"
                value={selectedNode.parameters || ''}
                onChange={(e) => onNodeUpdate(selectedNode.id, { parameters: e.target.value })}
                placeholder="Configuraciones específicas del instrumento..."
              />
            </div>
          </div>
        );
        
      case 'decision':
        return (
          <div className="space-y-4">
            <Input
              label="Condición"
              value={selectedNode.condition || 'Absorbancia > 0.5'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { condition: e.target.value })}
            />
            
            <Input
              label="Acción Si Verdadero"
              value={selectedNode.trueAction || 'Continuar protocolo'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { trueAction: e.target.value })}
            />
            
            <Input
              label="Acción Si Falso"
              value={selectedNode.falseAction || 'Repetir paso anterior'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { falseAction: e.target.value })}
            />
          </div>
        );
        
      case 'ai':
        return (
          <div className="space-y-4">
            <Input
              label="Modelo IA"
              value={selectedNode.aiModel || 'OptimizationEngine-v2.1'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { aiModel: e.target.value })}
            />
            
            <Input
              label="Confianza Mínima (%)"
              type="number"
              value={selectedNode.confidence || '85'}
              onChange={(e) => onNodeUpdate(selectedNode.id, { confidence: e.target.value })}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Parámetros de Entrada</label>
              <textarea
                className="w-full p-3 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows="3"
                value={selectedNode.inputParams || 'temperatura, pH, concentración'}
                onChange={(e) => onNodeUpdate(selectedNode.id, { inputParams: e.target.value })}
                placeholder="Lista de parámetros separados por comas..."
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <Icon name="Settings" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Configuración no disponible para este tipo de componente
            </p>
          </div>
        );
    }
  };

  const renderValidationTab = () => (
    <div className="space-y-4">
      <div className="bg-success/10 border border-success/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Configuración válida</span>
        </div>
        <p className="text-xs text-success/80 mt-1">
          Todos los parámetros requeridos están configurados correctamente
        </p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">Validaciones:</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-sm text-text-secondary">Parámetros obligatorios</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-sm text-text-secondary">Rangos de valores</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-sm text-text-secondary">Compatibilidad de equipos</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Script Personalizado</label>
        <textarea
          className="w-full p-3 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
          rows="6"
          value={selectedNode.customScript || '// Código personalizado\nfunction executeStep() {\n  // Tu código aquí\n}'}
          onChange={(e) => onNodeUpdate(selectedNode.id, { customScript: e.target.value })}
          placeholder="Ingresa código personalizado..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Variables de Entorno</label>
        <textarea
          className="w-full p-3 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
          rows="3"
          value={selectedNode.envVars || 'DEVICE_ID=ESP32_001\nCALIBRATION_MODE=auto'}
          onChange={(e) => onNodeUpdate(selectedNode.id, { envVars: e.target.value })}
          placeholder="VARIABLE=valor"
        />
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-surface border-l scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name={selectedNode.icon} size={20} className="mr-2" />
            {selectedNode.name}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNodeDelete(selectedNode.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          ID: {selectedNode.id}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b scientific-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 text-sm font-medium scientific-transition flex-1
                ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'config' && renderConfigurationTab()}
        {activeTab === 'validation' && renderValidationTab()}
        {activeTab === 'advanced' && renderAdvancedTab()}
      </div>

      {/* Actions */}
      <div className="p-4 border-t scientific-border space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="Save"
          iconPosition="left"
        >
          Guardar Cambios
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Play"
          iconPosition="left"
        >
          Probar Componente
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;