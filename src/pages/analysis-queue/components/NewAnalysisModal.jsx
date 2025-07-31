import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NewAnalysisModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    priority: 'medium',
    description: '',
    inputFile: null,
    parameters: {},
    notifications: true
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const analysisTypes = [
    { 
      value: 'blast', 
      label: 'BLAST Search',
      description: 'Búsqueda de secuencias homólogas en bases de datos',
      icon: 'Search'
    },
    { 
      value: 'protein_function', 
      label: 'Análisis de Función Proteica',
      description: 'Predicción de función y dominios proteicos',
      icon: 'Zap'
    },
    { 
      value: 'molecular_docking', 
      label: 'Acoplamiento Molecular',
      description: 'Simulación de interacciones proteína-ligando',
      icon: 'Atom'
    },
    { 
      value: 'homology_search', 
      label: 'Búsqueda de Homología',
      description: 'Identificación de secuencias evolutivamente relacionadas',
      icon: 'GitBranch'
    },
    { 
      value: 'phylogenetic', 
      label: 'Análisis Filogenético',
      description: 'Construcción de árboles evolutivos',
      icon: 'TreePine'
    },
    { 
      value: 'structure_prediction', 
      label: 'Predicción de Estructura',
      description: 'Modelado de estructura tridimensional',
      icon: 'Box'
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleParameterChange = (param, value) => {
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [param]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    setFormData({
      name: '',
      type: '',
      priority: 'medium',
      description: '',
      inputFile: null,
      parameters: {},
      notifications: true
    });
    setCurrentStep(1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-text-secondary'
          }`}>
            {step < currentStep ? <Icon name="Check" size={16} /> : step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Seleccionar Tipo de Análisis</h3>
        <div className="grid grid-cols-1 gap-3">
          {analysisTypes.map((type) => (
            <div
              key={type.value}
              onClick={() => handleInputChange('type', type.value)}
              className={`p-4 border rounded-lg cursor-pointer scientific-transition ${
                formData.type === type.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  formData.type === type.value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon name={type.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{type.label}</h4>
                  <p className="text-sm text-text-secondary mt-1">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Configuración del Análisis</h3>
        
        <div className="space-y-4">
          <Input
            label="Nombre del Análisis"
            type="text"
            placeholder="Ej: Análisis BLAST - Proteína X"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />

          <Input
            label="Descripción"
            type="text"
            placeholder="Descripción opcional del análisis"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />

          <Select
            label="Prioridad"
            options={priorityOptions}
            value={formData.priority}
            onChange={(value) => handleInputChange('priority', value)}
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Archivo de Entrada
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
              <p className="text-sm text-text-secondary mb-2">
                Arrastra tu archivo aquí o haz clic para seleccionar
              </p>
              <Button variant="outline" size="sm">
                Seleccionar Archivo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Parámetros Avanzados</h3>
        
        {formData.type === 'blast' && (
          <div className="space-y-4">
            <Select
              label="Base de Datos"
              options={[
                { value: 'nr', label: 'Non-redundant protein sequences (nr)' },
                { value: 'swissprot', label: 'Swiss-Prot' },
                { value: 'pdb', label: 'Protein Data Bank (PDB)' }
              ]}
              value={formData.parameters.database || 'nr'}
              onChange={(value) => handleParameterChange('database', value)}
            />

            <Input
              label="E-value"
              type="number"
              placeholder="0.001"
              value={formData.parameters.evalue || ''}
              onChange={(e) => handleParameterChange('evalue', e.target.value)}
            />

            <Input
              label="Máximo de Secuencias"
              type="number"
              placeholder="100"
              value={formData.parameters.maxSeqs || ''}
              onChange={(e) => handleParameterChange('maxSeqs', e.target.value)}
            />
          </div>
        )}

        {formData.type === 'molecular_docking' && (
          <div className="space-y-4">
            <Select
              label="Algoritmo"
              options={[
                { value: 'autodock', label: 'AutoDock Vina' },
                { value: 'glide', label: 'Glide' },
                { value: 'gold', label: 'GOLD' }
              ]}
              value={formData.parameters.algorithm || 'autodock'}
              onChange={(value) => handleParameterChange('algorithm', value)}
            />

            <Input
              label="Número de Poses"
              type="number"
              placeholder="10"
              value={formData.parameters.poses || ''}
              onChange={(e) => handleParameterChange('poses', e.target.value)}
            />
          </div>
        )}

        <div className="pt-4 border-t scientific-border">
          <Checkbox
            label="Recibir notificaciones por email"
            checked={formData.notifications}
            onChange={(e) => handleInputChange('notifications', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.type !== '';
      case 2: return formData.name.trim() !== '';
      case 3: return true;
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-scientific-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b scientific-border">
          <h2 className="text-xl font-semibold text-text-primary">Nuevo Análisis</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderStepIndicator()}
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t scientific-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Anterior
          </Button>

          <div className="flex space-x-2">
            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                Enviar Análisis
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysisModal;