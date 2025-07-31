import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIDecisionLogs = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const aiDecisions = [
    {
      id: 1,
      timestamp: '14:52:33',
      experimentId: 'EXP-2024-001',
      decision: 'Ajuste de temperatura',
      reasoning: `Detectada desviación de 0.8°C por encima del rango óptimo.\nRecomendación: Reducir temperatura a 36.5°C para mantener\ncondiciones ideales de crecimiento celular.`,
      confidence: 94,
      action: 'Temperatura ajustada automáticamente',
      impact: 'positive',
      parameters: {
        before: '37.8°C',
        after: '36.5°C',
        expectedImprovement: '+12% eficiencia'
      }
    },
    {
      id: 2,
      timestamp: '14:45:12',
      experimentId: 'EXP-2024-002',
      decision: 'Optimización de pH',
      reasoning: `Análisis de tendencia muestra acidificación gradual.\nPredicción: pH caerá por debajo de 6.8 en 45 minutos.\nAcción preventiva recomendada.`,
      confidence: 87,
      action: 'Buffer añadido automáticamente',
      impact: 'positive',
      parameters: {
        before: 'pH 7.0',
        after: 'pH 7.2',
        expectedImprovement: 'Estabilidad +3h'
      }
    },
    {
      id: 3,
      timestamp: '14:38:45',
      experimentId: 'EXP-2024-001',
      decision: 'Pausa de agitación',
      reasoning: `Detección de formación de espuma excesiva.\nRiesgo de contaminación y pérdida de muestra.\nPausa temporal recomendada.`,
      confidence: 91,
      action: 'Agitación pausada por 15 minutos',
      impact: 'preventive',
      parameters: {
        before: '200 RPM',
        after: '0 RPM',
        expectedImprovement: 'Prevención contaminación'
      }
    },
    {
      id: 4,
      timestamp: '14:25:18',
      experimentId: 'EXP-2024-003',
      decision: 'Incremento de oxigenación',
      reasoning: `Niveles de oxígeno disuelto por debajo del 80%.\nCrecimiento celular subóptimo detectado.\nAumento de flujo de aire requerido.`,
      confidence: 96,
      action: 'Flujo de aire incrementado',
      impact: 'positive',
      parameters: {
        before: '0.5 L/min',
        after: '0.8 L/min',
        expectedImprovement: '+18% crecimiento'
      }
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success bg-success/10 border-success/20';
      case 'preventive': return 'text-warning bg-warning/10 border-warning/20';
      case 'corrective': return 'text-error bg-error/10 border-error/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getImpactLabel = (impact) => {
    switch (impact) {
      case 'positive': return 'Optimización';
      case 'preventive': return 'Preventiva';
      case 'corrective': return 'Correctiva';
      default: return 'Análisis';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border scientific-border rounded-lg scientific-shadow">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Decisiones de IA</h2>
              <p className="text-sm text-text-secondary">Registro de optimizaciones automáticas</p>
            </div>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-2">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border scientific-border rounded-lg px-3 py-1 bg-background"
            >
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Decisions List */}
      <div className="p-6">
        <div className="space-y-4">
          {aiDecisions.map((decision) => (
            <div key={decision.id} className="border scientific-border rounded-lg p-4 hover:bg-muted/50 scientific-transition">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">{decision.decision}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-text-secondary">{decision.experimentId}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{decision.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(decision.impact)}`}>
                    {getImpactLabel(decision.impact)}
                  </div>
                  <div className={`text-xs font-medium ${getConfidenceColor(decision.confidence)}`}>
                    {decision.confidence}%
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="mb-3">
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {decision.reasoning}
                </p>
              </div>

              {/* Parameters */}
              <div className="grid grid-cols-3 gap-4 mb-3 p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Antes</p>
                  <p className="text-sm font-medium text-text-primary">{decision.parameters.before}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Después</p>
                  <p className="text-sm font-medium text-text-primary">{decision.parameters.after}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Mejora esperada</p>
                  <p className="text-sm font-medium text-success">{decision.parameters.expectedImprovement}</p>
                </div>
              </div>

              {/* Action Taken */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-primary">{decision.action}</span>
                </div>
                <button className="text-xs text-primary hover:text-primary/80 scientific-transition">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t scientific-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">12</p>
              <p className="text-sm text-text-secondary">Optimizaciones hoy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">89%</p>
              <p className="text-sm text-text-secondary">Confianza promedio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-text-secondary">Acciones preventivas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionLogs;