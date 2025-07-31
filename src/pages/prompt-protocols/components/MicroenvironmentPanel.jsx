import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MicroenvironmentPanel = () => {
  const [activeCategory, setActiveCategory] = useState('temperature');
  const [searchTerm, setSearchTerm] = useState('');

  const microenvironmentCategories = [
    {
      id: 'temperature',
      name: 'Temperatura',
      icon: 'Thermometer',
      components: [
        {
          id: 'temp-controller',
          name: 'Control de Temperatura',
          icon: 'Thermometer',
          description: 'Control preciso de temperatura',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment',
          category: 'temperature',
          parameters: {
            target_temp: 37,
            tolerance: 0.1,
            ramp_rate: 1.0,
            pid_settings: 'auto'
          }
        },
        {
          id: 'temp-gradient',
          name: 'Gradiente Térmico',
          icon: 'TrendingUp',
          description: 'Generación de gradientes térmicos',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment',
          category: 'temperature',
          parameters: {
            min_temp: 25,
            max_temp: 45,
            gradient_type: 'linear',
            duration: 120
          }
        },
        {
          id: 'thermal-cycling',
          name: 'Ciclado Térmico',
          icon: 'RotateCcw',
          description: 'Ciclos de temperatura programables',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment',
          category: 'temperature',
          parameters: {
            cycles: 35,
            denaturation_temp: 95,
            annealing_temp: 60,
            extension_temp: 72
          }
        }
      ]
    },
    {
      id: 'ph',
      name: 'pH y Química',
      icon: 'Droplet',
      components: [
        {
          id: 'ph-controller',
          name: 'Control de pH',
          icon: 'Droplet',
          description: 'Regulación automática de pH',
          color: 'bg-blue-100 border-blue-300',
          type: 'microenvironment',
          category: 'ph',
          parameters: {
            target_ph: 7.4,
            buffer_system: 'bicarbonate',
            tolerance: 0.05,
            correction_rate: 'slow'
          }
        },
        {
          id: 'buffer-system',
          name: 'Sistema Buffer',
          icon: 'FlaskConical',
          description: 'Manejo de sistemas buffer',
          color: 'bg-blue-100 border-blue-300',
          type: 'microenvironment',
          category: 'ph',
          parameters: {
            buffer_type: 'HEPES',
            concentration: 20,
            ionic_strength: 0.15
          }
        },
        {
          id: 'chemical-gradient',
          name: 'Gradiente Químico',
          icon: 'TrendingDown',
          description: 'Generación de gradientes químicos',
          color: 'bg-blue-100 border-blue-300',
          type: 'microenvironment',
          category: 'ph',
          parameters: {
            compound: 'glucose',
            min_conc: 0,
            max_conc: 25,
            gradient_shape: 'exponential'
          }
        }
      ]
    },
    {
      id: 'atmosphere',
      name: 'Atmósfera',
      icon: 'Wind',
      components: [
        {
          id: 'gas-controller',
          name: 'Control de Gases',
          icon: 'Wind',
          description: 'Regulación de atmósfera gaseosa',
          color: 'bg-green-100 border-green-300',
          type: 'microenvironment',
          category: 'atmosphere',
          parameters: {
            co2_percent: 5,
            o2_percent: 21,
            humidity: 85,
            flow_rate: 0.5
          }
        },
        {
          id: 'hypoxia-controller',
          name: 'Control de Hipoxia',
          icon: 'Minus',
          description: 'Generación de condiciones hipóxicas',
          color: 'bg-green-100 border-green-300',
          type: 'microenvironment',
          category: 'atmosphere',
          parameters: {
            o2_target: 2,
            transition_time: 60,
            monitoring_interval: 10
          }
        },
        {
          id: 'pressure-controller',
          name: 'Control de Presión',
          icon: 'Gauge',
          description: 'Regulación de presión atmosférica',
          color: 'bg-green-100 border-green-300',
          type: 'microenvironment',
          category: 'atmosphere',
          parameters: {
            pressure: 1.2,
            pressure_units: 'atm',
            safety_limits: 'enabled'
          }
        }
      ]
    },
    {
      id: 'mechanical',
      name: 'Mecánico',
      icon: 'Cog',
      components: [
        {
          id: 'shaker-controller',
          name: 'Control de Agitación',
          icon: 'RotateCcw',
          description: 'Agitación orbital y lineal',
          color: 'bg-purple-100 border-purple-300',
          type: 'microenvironment',
          category: 'mechanical',
          parameters: {
            speed: 150,
            amplitude: 5,
            pattern: 'orbital',
            acceleration: 'gradual'
          }
        },
        {
          id: 'flow-controller',
          name: 'Control de Flujo',
          icon: 'Waves',
          description: 'Regulación de flujo de medios',
          color: 'bg-purple-100 border-purple-300',
          type: 'microenvironment',
          category: 'mechanical',
          parameters: {
            flow_rate: 0.1,
            direction: 'bidirectional',
            pulse_mode: 'continuous'
          }
        },
        {
          id: 'centrifuge-controller',
          name: 'Control de Centrífuga',
          icon: 'RotateCw',
          description: 'Control de centrifugación',
          color: 'bg-purple-100 border-purple-300',
          type: 'microenvironment',
          category: 'mechanical',
          parameters: {
            speed: 3000,
            time: 10,
            acceleration: 'slow',
            temperature: 4
          }
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoreo',
      icon: 'Activity',
      components: [
        {
          id: 'realtime-monitor',
          name: 'Monitor en Tiempo Real',
          icon: 'Activity',
          description: 'Monitoreo continuo de parámetros',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'microenvironment',
          category: 'monitoring',
          parameters: {
            sampling_rate: 1,
            parameters: ['temperature', 'pH', 'DO'],
            alert_thresholds: 'enabled'
          }
        },
        {
          id: 'imaging-system',
          name: 'Sistema de Imagen',
          icon: 'Camera',
          description: 'Captura de imágenes automatizada',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'microenvironment',
          category: 'monitoring',
          parameters: {
            resolution: '1920x1080',
            frame_rate: 30,
            magnification: '10x',
            illumination: 'LED'
          }
        },
        {
          id: 'data-logger',
          name: 'Registro de Datos',
          icon: 'Database',
          description: 'Almacenamiento de datos experimentales',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'microenvironment',
          category: 'monitoring',
          parameters: {
            storage_format: 'HDF5',
            compression: 'gzip',
            backup_interval: 3600
          }
        }
      ]
    }
  ];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  const filteredComponents = microenvironmentCategories
    .find(cat => cat.id === activeCategory)
    ?.components.filter(comp => 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="w-96 bg-surface border-r scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <h2 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Thermometer" size={20} className="mr-2" />
          Control de Microambiente
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Cámaras de cultivo y biorreactores
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b scientific-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar controles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b scientific-border overflow-x-auto">
        <div className="flex min-w-max">
          {microenvironmentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 text-sm font-medium scientific-transition whitespace-nowrap
                ${activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            className={`
              ${component.color} border-2 border-dashed rounded-lg p-4 mb-4 cursor-grab
              hover:shadow-scientific scientific-transition active:cursor-grabbing
              hover:scale-[1.02] transform
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={component.icon} size={20} className="text-text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  {component.name}
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  {component.description}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-xs text-text-secondary">
                      hardware-controller
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {Object.keys(component.parameters).length} parámetros
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Footer */}
      <div className="p-4 border-t scientific-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>Dispositivos Conectados</span>
          <span className="text-success font-medium">12/15</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Biorreactores</span>
            <span className="text-success">4/4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Cámaras de Cultivo</span>
            <span className="text-success">8/11</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroenvironmentPanel;