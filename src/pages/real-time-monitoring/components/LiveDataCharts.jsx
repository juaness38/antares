import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const LiveDataCharts = () => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [isRecording, setIsRecording] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);

  // Mock real-time data generation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('es-ES', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const newDataPoint = {
        time: timeString,
        timestamp: now.getTime(),
        temperature: 37.2 + (Math.random() - 0.5) * 0.8,
        ph: 7.4 + (Math.random() - 0.5) * 0.3,
        oxygen: 85 + (Math.random() - 0.5) * 10,
        glucose: 2.5 + (Math.random() - 0.5) * 0.5,
        biomass: 0.8 + (Math.random() - 0.5) * 0.1,
        metabolites: 150 + (Math.random() - 0.5) * 20
      };

      setDataPoints(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-50); // Keep last 50 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      key: 'temperature',
      label: 'Temperatura',
      unit: '°C',
      color: '#DC2626',
      icon: 'Thermometer',
      target: 37.0,
      tolerance: 0.5
    },
    {
      key: 'ph',
      label: 'pH',
      unit: '',
      color: '#2563EB',
      icon: 'Droplets',
      target: 7.4,
      tolerance: 0.2
    },
    {
      key: 'oxygen',
      label: 'Oxígeno Disuelto',
      unit: '%',
      color: '#059669',
      icon: 'Wind',
      target: 80,
      tolerance: 10
    },
    {
      key: 'glucose',
      label: 'Glucosa',
      unit: 'g/L',
      color: '#D97706',
      icon: 'Zap',
      target: 2.0,
      tolerance: 0.5
    },
    {
      key: 'biomass',
      label: 'Biomasa (OD600)',
      unit: '',
      color: '#7C3AED',
      icon: 'Activity',
      target: 0.8,
      tolerance: 0.2
    },
    {
      key: 'metabolites',
      label: 'Metabolitos',
      unit: 'mg/L',
      color: '#DB2777',
      icon: 'Beaker',
      target: 150,
      tolerance: 25
    }
  ];

  const currentMetric = metrics.find(m => m.key === selectedMetric);
  const currentValue = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1][selectedMetric] : 0;
  const isInRange = Math.abs(currentValue - currentMetric?.target) <= currentMetric?.tolerance;

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleExportData = () => {
    const csvContent = [
      ['Tiempo', ...metrics.map(m => `${m.label} (${m.unit})`)].join(','),
      ...dataPoints.map(point => [
        point.time,
        ...metrics.map(m => point[m.key].toFixed(2))
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experimento_datos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg scientific-border p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Datos en Tiempo Real
        </h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRecordingToggle}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium scientific-transition ${
              isRecording 
                ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-text-secondary border scientific-border'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              isRecording ? 'bg-success scientific-pulse' : 'bg-text-secondary'
            }`} />
            <span>{isRecording ? 'Grabando' : 'Pausado'}</span>
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center space-x-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm scientific-transition"
          >
            <Icon name="Download" size={16} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Metric selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {metrics.map((metric) => {
          const value = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1][metric.key] : 0;
          const inRange = Math.abs(value - metric.target) <= metric.tolerance;
          
          return (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`p-3 rounded-lg border scientific-transition text-left ${
                selectedMetric === metric.key
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={metric.icon} size={16} style={{ color: metric.color }} />
                <span className="text-xs font-medium text-text-secondary">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-text-primary">
                  {value.toFixed(1)}{metric.unit}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  inRange ? 'bg-success' : 'bg-warning'
                }`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataPoints}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="time" 
              stroke="#64748B"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              domain={['dataMin - 5%', 'dataMax + 5%']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [
                `${value.toFixed(2)} ${currentMetric?.unit}`,
                currentMetric?.label
              ]}
            />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              fill={currentMetric?.color}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Current value and status */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name={currentMetric?.icon} size={20} style={{ color: currentMetric?.color }} />
            <span className="font-medium text-text-primary">
              {currentMetric?.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {currentValue.toFixed(2)} {currentMetric?.unit}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            Objetivo: {currentMetric?.target} ± {currentMetric?.tolerance} {currentMetric?.unit}
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            isInRange 
              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            <Icon name={isInRange ? "CheckCircle" : "AlertTriangle"} size={16} />
            <span>{isInRange ? 'En rango' : 'Fuera de rango'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDataCharts;