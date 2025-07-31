import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AIDecisionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Mock AI decision logs
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 30000),
      type: 'optimization',
      severity: 'info',
      decision: 'Ajuste de velocidad de agitación',
      reasoning: `Análisis de datos de oxígeno disuelto indica necesidad de incrementar agitación.\nValor actual: 180 RPM → Nuevo valor: 200 RPM\nConfianza: 94%`,
      parameters: {
        before: { stirring: 180 },
        after: { stirring: 200 },
        confidence: 0.94
      },
      impact: 'Mejora esperada en transferencia de oxígeno del 12%'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 120000),
      type: 'alert',
      severity: 'warning',
      decision: 'Detección de anomalía en pH',
      reasoning: `Tendencia descendente detectada en pH durante los últimos 5 minutos.\nValor actual: 7.2 (objetivo: 7.4 ± 0.2)\nRecomendación: Activar sistema de control automático`,
      parameters: {
        current: { ph: 7.2 },
        target: { ph: 7.4 },
        deviation: -0.2
      },
      impact: 'Activación automática de bomba de NaOH programada'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 300000),
      type: 'prediction',
      severity: 'info',
      decision: 'Predicción de fase de crecimiento',
      reasoning: `Modelo predictivo indica transición a fase exponencial en 15 minutos.\nBasado en: densidad óptica, consumo de glucosa, producción de CO2\nPrecisión del modelo: 89%`,
      parameters: {
        currentPhase: 'lag',
        predictedPhase: 'exponential',
        timeToTransition: 15,
        accuracy: 0.89
      },
      impact: 'Preparación automática de protocolos de muestreo'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 450000),
      type: 'control',
      severity: 'success',
      decision: 'Optimización de temperatura completada',
      reasoning: `Algoritmo de control adaptativo ha estabilizado temperatura.\nVariación reducida de ±0.8°C a ±0.2°C\nTiempo de estabilización: 3.2 minutos`,
      parameters: {
        variationBefore: 0.8,
        variationAfter: 0.2,
        stabilizationTime: 3.2
      },
      impact: 'Condiciones óptimas de crecimiento establecidas'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 600000),
      type: 'analysis',
      severity: 'info',
      decision: 'Análisis de metabolitos completado',
      reasoning: `Espectrometría de masas detecta 15 metabolitos principales.\nConcentración de producto objetivo: 145 mg/L (+8% vs anterior)\nCalidad del análisis: Excelente`,
      parameters: {
        metabolitesDetected: 15,
        targetConcentration: 145,
        improvement: 0.08
      },
      impact: 'Datos integrados en modelo de optimización'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setLogs(mockLogs);

    // Simulate real-time log updates
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date(),
        type: ['optimization', 'alert', 'prediction', 'control', 'analysis'][Math.floor(Math.random() * 5)],
        severity: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)],
        decision: 'Nueva decisión del sistema IA',
        reasoning: `Análisis automático del sistema detecta nueva condición.\nAcción recomendada basada en datos históricos\nConfianza: ${(Math.random() * 20 + 80).toFixed(0)}%`,
        parameters: {
          confidence: Math.random() * 0.2 + 0.8
        },
        impact: 'Optimización continua del proceso'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'optimization':
        return 'TrendingUp';
      case 'alert':
        return 'AlertTriangle';
      case 'prediction':
        return 'Brain';
      case 'control':
        return 'Settings';
      case 'analysis':
        return 'BarChart3';
      default:
        return 'Info';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'optimization':
        return 'Optimización';
      case 'alert':
        return 'Alerta';
      case 'prediction':
        return 'Predicción';
      case 'control':
        return 'Control';
      case 'analysis':
        return 'Análisis';
      default:
        return 'Info';
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleExportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Type', 'Severity', 'Decision', 'Reasoning', 'Impact'].join(','),
      ...logs.map(log => [
        log.timestamp.toISOString(),
        log.type,
        log.severity,
        log.decision,
        log.reasoning.replace(/\n/g, ' '),
        log.impact
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_decisions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg scientific-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">
            Decisiones del Driver IA
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full scientific-pulse" />
            <span className="text-sm text-text-secondary">En tiempo real</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm scientific-transition ${
              isAutoScroll 
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-text-secondary border scientific-border'
            }`}
          >
            <Icon name="ArrowDown" size={14} />
            <span>Auto-scroll</span>
          </button>
          <button
            onClick={handleExportLogs}
            className="flex items-center space-x-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm scientific-transition"
          >
            <Icon name="Download" size={14} />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleClearLogs}
            className="flex items-center space-x-2 px-3 py-1 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-sm scientific-transition"
          >
            <Icon name="Trash2" size={14} />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center space-x-2 mb-6">
        {['all', 'optimization', 'alert', 'prediction', 'control', 'analysis'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-lg text-sm font-medium scientific-transition ${
              filter === filterType
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:text-text-primary'
            }`}
          >
            {filterType === 'all' ? 'Todos' : getTypeLabel(filterType)}
          </button>
        ))}
      </div>

      {/* Logs list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Brain" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No hay decisiones registradas</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="border scientific-border rounded-lg p-4 hover:bg-muted/30 scientific-transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(log.type)} size={16} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{log.decision}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {getTypeLabel(log.type)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {formatTime(log.timestamp)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                <h5 className="text-sm font-medium text-text-primary mb-2">Razonamiento:</h5>
                <pre className="text-sm text-text-secondary whitespace-pre-wrap font-mono">
                  {log.reasoning}
                </pre>
              </div>

              {log.parameters && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  {Object.entries(log.parameters).map(([key, value]) => (
                    <div key={key} className="bg-muted/30 rounded p-2">
                      <div className="text-xs text-text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm font-medium text-text-primary">
                        {typeof value === 'number' 
                          ? (value < 1 ? `${(value * 100).toFixed(0)}%` : value.toFixed(1))
                          : value
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Target" size={14} className="text-text-secondary" />
                <span className="text-text-secondary">Impacto:</span>
                <span className="text-text-primary font-medium">{log.impact}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats footer */}
      <div className="mt-6 pt-4 border-t scientific-border">
        <div className="grid grid-cols-5 gap-4 text-center">
          {['optimization', 'alert', 'prediction', 'control', 'analysis'].map((type) => (
            <div key={type}>
              <div className="text-lg font-bold text-text-primary">
                {logs.filter(log => log.type === type).length}
              </div>
              <div className="text-xs text-text-secondary">
                {getTypeLabel(type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIDecisionLogs;