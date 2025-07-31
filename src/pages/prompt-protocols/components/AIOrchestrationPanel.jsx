import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIOrchestrationPanel = () => {
  const [activeCategory, setActiveCategory] = useState('decision');
  const [searchTerm, setSearchTerm] = useState('');

  const aiOrchestrationCategories = [
    {
      id: 'decision',
      name: 'Decisión Inteligente',
      icon: 'Brain',
      components: [
        {
          id: 'ai-decision-node',
          name: 'Nodo de Decisión IA',
          icon: 'Brain',
          description: 'Decisiones basadas en machine learning',
          color: 'bg-purple-100 border-purple-300',
          type: 'ai-orchestration',
          category: 'decision',
          parameters: {
            model_type: 'random_forest',
            confidence_threshold: 0.85,
            decision_criteria: 'multi_objective',
            learning_mode: 'online'
          }
        },
        {
          id: 'pattern-recognition',
          name: 'Reconocimiento de Patrones',
          icon: 'Eye',
          description: 'Identificación automática de patrones',
          color: 'bg-purple-100 border-purple-300',
          type: 'ai-orchestration',
          category: 'decision',
          parameters: {
            algorithm: 'cnn',
            pattern_types: ['structural', 'temporal'],
            sensitivity: 0.8
          }
        },
        {
          id: 'anomaly-detection',
          name: 'Detección de Anomalías',
          icon: 'AlertTriangle',
          description: 'Identificación de comportamientos anómalos',
          color: 'bg-purple-100 border-purple-300',
          type: 'ai-orchestration',
          category: 'decision',
          parameters: {
            method: 'isolation_forest',
            contamination: 0.1,
            real_time: true
          }
        }
      ]
    },
    {
      id: 'optimization',
      name: 'Optimización',
      icon: 'Target',
      components: [
        {
          id: 'parameter-optimization',
          name: 'Optimización de Parámetros',
          icon: 'Target',
          description: 'Optimización automática de parámetros',
          color: 'bg-green-100 border-green-300',
          type: 'ai-orchestration',
          category: 'optimization',
          parameters: {
            algorithm: 'genetic_algorithm',
            population_size: 100,
            generations: 50,
            mutation_rate: 0.1
          }
        },
        {
          id: 'resource-allocation',
          name: 'Asignación de Recursos',
          icon: 'Cpu',
          description: 'Gestión inteligente de recursos',
          color: 'bg-green-100 border-green-300',
          type: 'ai-orchestration',
          category: 'optimization',
          parameters: {
            strategy: 'load_balancing',
            priority_queue: 'weighted',
            resource_limits: 'dynamic'
          }
        },
        {
          id: 'workflow-optimization',
          name: 'Optimización de Flujo',
          icon: 'Workflow',
          description: 'Optimización de flujos de trabajo',
          color: 'bg-green-100 border-green-300',
          type: 'ai-orchestration',
          category: 'optimization',
          parameters: {
            metric: 'throughput',
            constraints: 'time_budget',
            adaptation: 'continuous'
          }
        }
      ]
    },
    {
      id: 'prediction',
      name: 'Predicción',
      icon: 'TrendingUp',
      components: [
        {
          id: 'outcome-prediction',
          name: 'Predicción de Resultados',
          icon: 'TrendingUp',
          description: 'Predicción de resultados experimentales',
          color: 'bg-blue-100 border-blue-300',
          type: 'ai-orchestration',
          category: 'prediction',
          parameters: {
            model: 'neural_network',
            horizon: 24,
            confidence_interval: 0.95
          }
        },
        {
          id: 'time-series-forecast',
          name: 'Pronóstico de Series Temporales',
          icon: 'Clock',
          description: 'Predicción de tendencias temporales',
          color: 'bg-blue-100 border-blue-300',
          type: 'ai-orchestration',
          category: 'prediction',
          parameters: {
            method: 'lstm',
            lookback_window: 168,
            forecast_horizon: 48
          }
        },
        {
          id: 'failure-prediction',
          name: 'Predicción de Fallos',
          icon: 'AlertCircle',
          description: 'Predicción de fallos en equipos',
          color: 'bg-blue-100 border-blue-300',
          type: 'ai-orchestration',
          category: 'prediction',
          parameters: {
            maintenance_strategy: 'predictive',
            warning_threshold: 0.7,
            lead_time: 'auto'
          }
        }
      ]
    },
    {
      id: 'adaptation',
      name: 'Adaptación',
      icon: 'RefreshCw',
      components: [
        {
          id: 'adaptive-protocol',
          name: 'Protocolo Adaptativo',
          icon: 'RefreshCw',
          description: 'Adaptación automática de protocolos',
          color: 'bg-orange-100 border-orange-300',
          type: 'ai-orchestration',
          category: 'adaptation',
          parameters: {
            adaptation_rate: 'moderate',
            learning_speed: 'fast',
            stability_factor: 0.8
          }
        },
        {
          id: 'self-healing',
          name: 'Auto-reparación',
          icon: 'Shield',
          description: 'Sistema de auto-reparación',
          color: 'bg-orange-100 border-orange-300',
          type: 'ai-orchestration',
          category: 'adaptation',
          parameters: {
            recovery_strategy: 'graceful',
            fallback_mode: 'safe',
            intervention_threshold: 'medium'
          }
        },
        {
          id: 'dynamic-scaling',
          name: 'Escalado Dinámico',
          icon: 'ArrowUpDown',
          description: 'Escalado automático de recursos',
          color: 'bg-orange-100 border-orange-300',
          type: 'ai-orchestration',
          category: 'adaptation',
          parameters: {
            scaling_metric: 'cpu_utilization',
            min_instances: 2,
            max_instances: 20,
            cooldown_period: 300
          }
        }
      ]
    },
    {
      id: 'learning',
      name: 'Aprendizaje',
      icon: 'BookOpen',
      components: [
        {
          id: 'reinforcement-learning',
          name: 'Aprendizaje por Refuerzo',
          icon: 'BookOpen',
          description: 'Aprendizaje basado en recompensas',
          color: 'bg-pink-100 border-pink-300',
          type: 'ai-orchestration',
          category: 'learning',
          parameters: {
            algorithm: 'q_learning',
            exploration_rate: 0.1,
            discount_factor: 0.95,
            learning_rate: 0.01
          }
        },
        {
          id: 'transfer-learning',
          name: 'Aprendizaje por Transferencia',
          icon: 'ArrowRightLeft',
          description: 'Transferencia de conocimiento entre tareas',
          color: 'bg-pink-100 border-pink-300',
          type: 'ai-orchestration',
          category: 'learning',
          parameters: {
            source_domain: 'general',
            adaptation_method: 'fine_tuning',
            similarity_threshold: 0.7
          }
        },
        {
          id: 'meta-learning',
          name: 'Meta-aprendizaje',
          icon: 'Layers',
          description: 'Aprender a aprender',
          color: 'bg-pink-100 border-pink-300',
          type: 'ai-orchestration',
          category: 'learning',
          parameters: {
            meta_algorithm: 'maml',
            inner_steps: 5,
            outer_steps: 100,
            meta_lr: 0.001
          }
        }
      ]
    }
  ];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  const filteredComponents = aiOrchestrationCategories
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
          <Icon name="Brain" size={20} className="mr-2" />
          Driver IA - Orquestación
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Inteligencia artificial para experimentación
        </p>
      </div>

      {/* AI Status */}
      <div className="p-4 border-b scientific-border bg-primary/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full scientific-pulse" />
            <span className="text-sm font-medium text-text-primary">Driver IA Activo</span>
          </div>
          <span className="text-xs text-text-secondary">v2.1.0</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-text-secondary">Modelos Cargados:</span>
            <span className="ml-1 text-primary font-medium">8/12</span>
          </div>
          <div>
            <span className="text-text-secondary">Procesamiento:</span>
            <span className="ml-1 text-success font-medium">45%</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b scientific-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar componentes IA..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b scientific-border overflow-x-auto">
        <div className="flex min-w-max">
          {aiOrchestrationCategories.map((category) => (
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
              hover:scale-[1.02] transform relative
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
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-xs text-text-secondary">
                      ai-module
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {Object.keys(component.parameters).length} parámetros
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Indicator */}
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full scientific-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* AI Status Footer */}
      <div className="p-4 border-t scientific-border bg-muted/30">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Orquestador Inteligente</span>
            <span className="text-primary font-medium">Activo</span>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>GPU Utilization</span>
            <span className="text-success font-medium">78%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Decisiones/min</span>
            <span className="text-primary font-medium">124</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOrchestrationPanel;