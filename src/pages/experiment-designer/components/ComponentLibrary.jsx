import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComponentLibrary = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState('bioinformatics');

  const componentCategories = [
    {
      id: 'bioinformatics',
      name: 'Bioinformática',
      icon: 'Dna',
      components: [
        {
          id: 'blast-analysis',
          name: 'Análisis BLAST',
          icon: 'Search',
          description: 'Búsqueda de homología de secuencias',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics'
        },
        {
          id: 'structure-prediction',
          name: 'Predicción de Estructura',
          icon: 'Cube',
          description: 'AlphaFold y modelado molecular',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics'
        },
        {
          id: 'protein-annotation',
          name: 'Anotación Proteica',
          icon: 'FileText',
          description: 'UniProt y análisis funcional',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics'
        }
      ]
    },
    {
      id: 'preparation',
      name: 'Preparación',
      icon: 'TestTube',
      components: [
        {
          id: 'sample-prep',
          name: 'Preparación de Muestra',
          icon: 'Beaker',
          description: 'Configurar parámetros de preparación',
          color: 'bg-green-100 border-green-300',
          type: 'preparation'
        },
        {
          id: 'buffer-mix',
          name: 'Mezcla de Buffer',
          icon: 'FlaskConical',
          description: 'Configurar soluciones buffer',
          color: 'bg-green-100 border-green-300',
          type: 'preparation'
        },
        {
          id: 'dilution',
          name: 'Dilución',
          icon: 'Droplets',
          description: 'Configurar diluciones seriadas',
          color: 'bg-green-100 border-green-300',
          type: 'preparation'
        }
      ]
    },
    {
      id: 'microenvironment',
      name: 'Microambiente',
      icon: 'Thermometer',
      components: [
        {
          id: 'temperature-control',
          name: 'Control de Temperatura',
          icon: 'Thermometer',
          description: 'Regulación térmica precisa',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment'
        },
        {
          id: 'ph-control',
          name: 'Control de pH',
          icon: 'Droplet',
          description: 'Regulación automática de pH',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment'
        },
        {
          id: 'gas-control',
          name: 'Control de Gases',
          icon: 'Wind',
          description: 'Atmósfera controlada',
          color: 'bg-red-100 border-red-300',
          type: 'microenvironment'
        }
      ]
    },
    {
      id: 'analysis',
      name: 'Análisis',
      icon: 'BarChart3',
      components: [
        {
          id: 'spectroscopy',
          name: 'Espectroscopía',
          icon: 'Zap',
          description: 'Análisis espectroscópico',
          color: 'bg-purple-100 border-purple-300',
          type: 'analysis'
        },
        {
          id: 'chromatography',
          name: 'Cromatografía',
          icon: 'TrendingUp',
          description: 'Separación cromatográfica',
          color: 'bg-purple-100 border-purple-300',
          type: 'analysis'
        },
        {
          id: 'pcr',
          name: 'PCR',
          icon: 'Dna',
          description: 'Reacción en cadena de polimerasa',
          color: 'bg-purple-100 border-purple-300',
          type: 'analysis'
        }
      ]
    },
    {
      id: 'decision',
      name: 'Decisión',
      icon: 'GitBranch',
      components: [
        {
          id: 'condition',
          name: 'Condición',
          icon: 'Diamond',
          description: 'Punto de decisión condicional',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'decision'
        },
        {
          id: 'loop',
          name: 'Bucle',
          icon: 'RotateCcw',
          description: 'Repetir hasta condición',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'decision'
        },
        {
          id: 'parallel',
          name: 'Paralelo',
          icon: 'Split',
          description: 'Ejecutar en paralelo',
          color: 'bg-yellow-100 border-yellow-300',
          type: 'decision'
        }
      ]
    },
    {
      id: 'ai',
      name: 'IA Orquestación',
      icon: 'Brain',
      components: [
        {
          id: 'ai-decision',
          name: 'Decisión IA',
          icon: 'Cpu',
          description: 'Decisión basada en IA',
          color: 'bg-indigo-100 border-indigo-300',
          type: 'ai'
        },
        {
          id: 'optimization',
          name: 'Optimización',
          icon: 'Target',
          description: 'Optimización automática',
          color: 'bg-indigo-100 border-indigo-300',
          type: 'ai'
        },
        {
          id: 'prediction',
          name: 'Predicción',
          icon: 'TrendingUp',
          description: 'Modelo predictivo',
          color: 'bg-indigo-100 border-indigo-300',
          type: 'ai'
        }
      ]
    }
  ];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
    onDragStart(component);
  };

  return (
    <div className="w-80 bg-surface border-r scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <h2 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Package" size={20} className="mr-2" />
          Biblioteca de Componentes
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Herramientas para diseño experimental
        </p>
      </div>

      {/* Category Tabs */}
      <div className="border-b scientific-border overflow-x-auto">
        <div className="flex min-w-max">
          {componentCategories.map((category) => (
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
        {componentCategories
          .find(cat => cat.id === activeCategory)
          ?.components.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className={`
                ${component.color} border-2 border-dashed rounded-lg p-3 mb-3 cursor-grab
                hover:shadow-scientific scientific-transition active:cursor-grabbing
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={component.icon} size={20} className="text-text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary">
                    {component.name}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {component.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Search */}
      <div className="p-4 border-t scientific-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar componentes..."
            className="w-full pl-10 pr-4 py-2 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;