import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 60000),
      severity: 'critical',
      category: 'device',
      title: 'ESP32 Controller Desconectado',
      message: 'El controlador ESP32-001 ha perdido conexión con el sistema principal. Última comunicación hace 5 minutos.',
      device: 'ESP32-001',
      acknowledged: false,
      autoResolve: false,
      actions: ['reconnect', 'restart', 'ignore']
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 180000),
      severity: 'warning',
      category: 'parameter',
      title: 'pH Fuera de Rango Óptimo',
      message: 'El valor de pH (7.6) está por encima del rango objetivo (7.4 ± 0.2). Sistema de control automático activado.',
      device: 'Sensor-pH-001',
      acknowledged: true,
      autoResolve: true,
      actions: ['calibrate', 'manual_adjust', 'acknowledge']
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 300000),
      severity: 'info',
      category: 'system',
      title: 'Calibración Programada',
      message: 'El espectrómetro UV-Vis requiere calibración rutinaria en las próximas 2 horas según el cronograma de mantenimiento.',
      device: 'Spectrometer-001',
      acknowledged: false,
      autoResolve: false,
      actions: ['schedule', 'postpone', 'acknowledge']
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 450000),
      severity: 'warning',
      category: 'experiment',
      title: 'Desviación en Crecimiento Celular',
      message: 'La tasa de crecimiento celular está 15% por debajo de lo esperado. Revisar condiciones de cultivo.',
      device: 'Bioreactor-001',
      acknowledged: false,
      autoResolve: false,
      actions: ['investigate', 'adjust_parameters', 'acknowledge']
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 600000),
      severity: 'success',
      category: 'system',
      title: 'Optimización Completada',
      message: 'El algoritmo de control adaptativo ha optimizado exitosamente los parámetros de temperatura y agitación.',
      device: 'System',
      acknowledged: true,
      autoResolve: true,
      actions: ['view_report', 'acknowledge']
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        timestamp: new Date(),
        severity: ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)],
        category: ['device', 'parameter', 'system', 'experiment'][Math.floor(Math.random() * 4)],
        title: 'Nueva Alerta del Sistema',
        message: 'El sistema ha detectado una condición que requiere atención.',
        device: 'Sistema',
        acknowledged: false,
        autoResolve: false,
        actions: ['acknowledge']
      };

      setAlerts(prev => [newAlert, ...prev]);
      
      // Play sound if enabled
      if (soundEnabled && newAlert.severity === 'critical') {
        // In a real app, you would play an actual sound
        console.log('🔊 Critical alert sound');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'device':
        return 'HardDrive';
      case 'parameter':
        return 'TrendingUp';
      case 'system':
        return 'Settings';
      case 'experiment':
        return 'FlaskConical';
      default:
        return 'Bell';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical':
        return 'Crítico';
      case 'warning':
        return 'Advertencia';
      case 'info':
        return 'Información';
      case 'success':
        return 'Éxito';
      default:
        return 'Desconocido';
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.severity === filter);
  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical').length;

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAction = (alertId, action) => {
    console.log(`Acción ${action} en alerta ${alertId}`);
    // Implement specific actions based on alert type
    if (action === 'acknowledge') {
      handleAcknowledge(alertId);
    }
  };

  const handleClearAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h`;
  };

  return (
    <div className="bg-card rounded-lg scientific-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">
            Centro de Alertas
          </h3>
          {unacknowledgedCount > 0 && (
            <span className="px-2 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
              {unacknowledgedCount} sin revisar
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm scientific-transition ${
              soundEnabled 
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-text-secondary border scientific-border'
            }`}
          >
            <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={14} />
            <span>Sonido</span>
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            iconName="Check"
            iconPosition="left"
          >
            Marcar todas
          </Button>
        </div>
      </div>

      {/* Alert stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
          <div className="text-sm text-text-secondary">Críticas</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-warning">
            {alerts.filter(a => a.severity === 'warning').length}
          </div>
          <div className="text-sm text-text-secondary">Advertencias</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">
            {alerts.filter(a => a.severity === 'info').length}
          </div>
          <div className="text-sm text-text-secondary">Información</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-text-primary">{unacknowledgedCount}</div>
          <div className="text-sm text-text-secondary">Sin revisar</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center space-x-2 mb-6">
        {['all', 'critical', 'warning', 'info', 'success'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-lg text-sm font-medium scientific-transition ${
              filter === filterType
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:text-text-primary'
            }`}
          >
            {filterType === 'all' ? 'Todas' : getSeverityLabel(filterType)}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Bell" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No hay alertas para mostrar</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-4 scientific-transition ${
                alert.acknowledged 
                  ? 'border-border bg-muted/30 opacity-75' :'border-border bg-card hover:bg-muted/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getSeverityIcon(alert.severity)} size={20} className={
                      alert.severity === 'critical' ? 'text-destructive' :
                      alert.severity === 'warning' ? 'text-warning' :
                      alert.severity === 'success' ? 'text-success' : 'text-primary'
                    } />
                    <Icon name={getCategoryIcon(alert.category)} size={16} className="text-text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{alert.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {getSeverityLabel(alert.severity)}
                      </span>
                      {alert.acknowledged && (
                        <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/20">
                          Revisada
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>Dispositivo: {alert.device}</span>
                      <span>{formatTime(alert.timestamp)}</span>
                      <span>{getTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert actions */}
              {!alert.acknowledged && (
                <div className="flex items-center space-x-2 pt-3 border-t scientific-border">
                  {alert.actions.map((action) => (
                    <Button
                      key={action}
                      variant={action === 'acknowledge' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAction(alert.id, action)}
                      className="text-xs"
                    >
                      {action === 'acknowledge' && 'Revisar'}
                      {action === 'reconnect' && 'Reconectar'}
                      {action === 'restart' && 'Reiniciar'}
                      {action === 'calibrate' && 'Calibrar'}
                      {action === 'investigate' && 'Investigar'}
                      {action === 'schedule' && 'Programar'}
                      {action === 'postpone' && 'Posponer'}
                      {action === 'manual_adjust' && 'Ajuste Manual'}
                      {action === 'adjust_parameters' && 'Ajustar Parámetros'}
                      {action === 'view_report' && 'Ver Reporte'}
                      {action === 'ignore' && 'Ignorar'}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;