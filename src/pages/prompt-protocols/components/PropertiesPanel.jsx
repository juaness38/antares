import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PropertiesPanel = ({ selectedNode, onNodeUpdate, onNodeDelete }) => {
  const [activeTab, setActiveTab] = useState('parameters');

  if (!selectedNode) {
    return (
      <div className="w-80 bg-surface border-l scientific-border h-full flex flex-col">
        <div className="p-4 border-b scientific-border">
          <h2 className="text-lg font-semibold text-text-primary">Propiedades</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Settings" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Selecciona un nodo para ver sus propiedades
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleParameterChange = (key, value) => {
    const updatedParameters = { ...selectedNode.parameters, [key]: value };
    onNodeUpdate(selectedNode.id, { parameters: updatedParameters });
  };

  const handleNodeNameChange = (name) => {
    onNodeUpdate(selectedNode.id, { name });
  };

  const renderParameterInput = (key, value) => {
    const paramType = typeof value;
    
    if (paramType === 'boolean') {
      return (
        <div key={key} className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleParameterChange(key, e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm font-medium text-text-primary">
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </label>
        </div>
      );
    }
    
    if (paramType === 'number') {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <Input
            type="number"
            value={value}
            onChange={(e) => handleParameterChange(key, parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      );
    }
    
    // Special handling for select options
    if (key === 'database' && selectedNode.type === 'bioinformatics') {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Base de Datos
          </label>
          <Select
            value={value}
            onChange={(value) => handleParameterChange(key, value)}
            className="w-full"
          >
            <option value="nr">Non-redundant protein sequences (nr)</option>
            <option value="swissprot">Swiss-Prot</option>
            <option value="pdb">Protein Data Bank</option>
            <option value="refseq">Reference Sequences</option>
          </Select>
        </div>
      );
    }
    
    if (key === 'algorithm' || key === 'method') {
      const options = {
        'algorithm': ['clustalw', 'muscle', 'mafft', 'tcoffee'],
        'method': ['neighbor-joining', 'maximum-likelihood', 'parsimony', 'upgma']
      };
      
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <Select
            value={value}
            onChange={(value) => handleParameterChange(key, value)}
            className="w-full"
          >
            {options[key]?.map(option => (
              <option key={option} value={option}>
                {option.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </Select>
        </div>
      );
    }
    
    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        <Input
          type="text"
          value={value}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className="w-full"
        />
      </div>
    );
  };

  const tabs = [
    { id: 'parameters', label: 'Parámetros', icon: 'Settings' },
    { id: 'logs', label: 'Logs', icon: 'FileText' },
    { id: 'outputs', label: 'Salidas', icon: 'Download' }
  ];

  return (
    <div className="w-80 bg-surface border-l scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">Propiedades</h2>
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            onClick={() => onNodeDelete(selectedNode.id)}
          />
        </div>
        
        <div className="space-y-2">
          <Input
            value={selectedNode.name}
            onChange={(e) => handleNodeNameChange(e.target.value)}
            className="w-full font-medium"
            placeholder="Nombre del nodo"
          />
          
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name={selectedNode.icon} size={16} />
            <span>{selectedNode.type}</span>
            <span>•</span>
            <span>{selectedNode.category}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              selectedNode.status === 'running' ? 'bg-warning' :
              selectedNode.status === 'completed' ? 'bg-success' :
              selectedNode.status === 'failed'? 'bg-destructive' : 'bg-secondary'
            }`} />
            <span className="text-sm text-text-secondary">
              {selectedNode.status === 'running' ? 'Ejecutando' :
               selectedNode.status === 'completed' ? 'Completado' :
               selectedNode.status === 'failed'? 'Error' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b scientific-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 text-sm font-medium scientific-transition
                ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'parameters' && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">
              Configuración de Parámetros
            </h3>
            
            {selectedNode.parameters && Object.keys(selectedNode.parameters).length > 0 ? (
              Object.entries(selectedNode.parameters).map(([key, value]) =>
                renderParameterInput(key, value)
              )
            ) : (
              <div className="text-center py-8">
                <Icon name="Settings" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary">
                  No hay parámetros configurables
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">
              Logs de Ejecución
            </h3>
            
            {selectedNode.logs && selectedNode.logs.length > 0 ? (
              <div className="space-y-2">
                {selectedNode.logs.map((log, index) => (
                  <div key={index} className="text-xs font-mono p-2 bg-muted rounded">
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="FileText" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary">
                  No hay logs disponibles
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'outputs' && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">
              Resultados de Salida
            </h3>
            
            {selectedNode.outputs && Object.keys(selectedNode.outputs).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(selectedNode.outputs).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => {
                          // Handle download
                          console.log('Downloading:', key, value);
                        }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Download" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary">
                  No hay resultados disponibles
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t scientific-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>ID: {selectedNode.id}</span>
          <span>Tipo: {selectedNode.type}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;