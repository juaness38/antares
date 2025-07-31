import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeviceRegistrationWizard = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    model: '',
    serialNumber: '',
    location: '',
    ipAddress: '',
    port: '80',
    protocol: 'HTTP',
    description: '',
    calibrationDate: '',
    maintenanceSchedule: 'monthly'
  });

  const deviceTypes = [
    { value: 'bioreactor', label: 'Biorreactor' },
    { value: 'sensor', label: 'Sensor' },
    { value: 'esp32', label: 'ESP32 Controller' },
    { value: 'spectrometer', label: 'Espectrómetro' },
    { value: 'ph_meter', label: 'Medidor de pH' },
    { value: 'temperature_sensor', label: 'Sensor de Temperatura' },
    { value: 'pressure_sensor', label: 'Sensor de Presión' }
  ];

  const protocolOptions = [
    { value: 'HTTP', label: 'HTTP' },
    { value: 'HTTPS', label: 'HTTPS' },
    { value: 'MQTT', label: 'MQTT' },
    { value: 'WebSocket', label: 'WebSocket' }
  ];

  const maintenanceOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  const steps = [
    { number: 1, title: 'Información Básica', icon: 'Info' },
    { number: 2, title: 'Configuración de Red', icon: 'Wifi' },
    { number: 3, title: 'Calibración y Mantenimiento', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newDevice = {
      id: Date.now(),
      ...formData,
      status: 'disconnected',
      lastCommunication: null,
      signalStrength: 0,
      assignedExperiments: [],
      registrationDate: new Date().toISOString()
    };
    onSubmit(newDevice);
    onClose();
    setCurrentStep(1);
    setFormData({
      name: '',
      type: '',
      model: '',
      serialNumber: '',
      location: '',
      ipAddress: '',
      port: '80',
      protocol: 'HTTP',
      description: '',
      calibrationDate: '',
      maintenanceSchedule: 'monthly'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-scientific-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b scientific-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Registrar Nuevo Dispositivo</h2>
            <p className="text-sm text-text-secondary mt-1">Paso {currentStep} de 3</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b scientific-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 scientific-transition
                  ${currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-text-secondary'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Nombre del Dispositivo"
                type="text"
                placeholder="Ej: Biorreactor-Lab-01"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              
              <Select
                label="Tipo de Dispositivo"
                options={deviceTypes}
                value={formData.type}
                onChange={(value) => handleInputChange('type', value)}
                placeholder="Seleccionar tipo"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Modelo"
                  type="text"
                  placeholder="Ej: ESP32-WROOM-32"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                />
                
                <Input
                  label="Número de Serie"
                  type="text"
                  placeholder="Ej: SN123456789"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                />
              </div>

              <Input
                label="Ubicación"
                type="text"
                placeholder="Ej: Laboratorio A - Mesa 3"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />

              <Input
                label="Descripción"
                type="text"
                placeholder="Descripción opcional del dispositivo"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Dirección IP"
                  type="text"
                  placeholder="192.168.1.100"
                  value={formData.ipAddress}
                  onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                  required
                />
                
                <Input
                  label="Puerto"
                  type="number"
                  placeholder="80"
                  value={formData.port}
                  onChange={(e) => handleInputChange('port', e.target.value)}
                />
              </div>

              <Select
                label="Protocolo de Comunicación"
                options={protocolOptions}
                value={formData.protocol}
                onChange={(value) => handleInputChange('protocol', value)}
                placeholder="Seleccionar protocolo"
              />

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">Configuración de Red</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Asegúrate de que el dispositivo esté conectado a la misma red que el servidor Antares. 
                  La configuración de red se puede modificar después del registro.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Input
                label="Fecha de Última Calibración"
                type="date"
                value={formData.calibrationDate}
                onChange={(e) => handleInputChange('calibrationDate', e.target.value)}
              />

              <Select
                label="Programa de Mantenimiento"
                options={maintenanceOptions}
                value={formData.maintenanceSchedule}
                onChange={(value) => handleInputChange('maintenanceSchedule', value)}
                placeholder="Seleccionar frecuencia"
              />

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">Programación Automática</span>
                </div>
                <p className="text-sm text-text-secondary">
                  El sistema programará automáticamente recordatorios de mantenimiento y calibración 
                  basados en la frecuencia seleccionada.
                </p>
              </div>

              <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Listo para Registro</span>
                </div>
                <p className="text-sm text-success/80">
                  El dispositivo será registrado en el sistema y estará disponible para asignación a experimentos.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t scientific-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <Icon name="ChevronLeft" size={16} />
            Anterior
          </Button>

          <div className="flex space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Siguiente
                <Icon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Icon name="Plus" size={16} />
                Registrar Dispositivo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistrationWizard;