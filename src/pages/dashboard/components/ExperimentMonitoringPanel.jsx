import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExperimentMonitoringPanel = () => {
  const [selectedExperiment, setSelectedExperiment] = useState('EXP-2024-001');
  const [realTimeData, setRealTimeData] = useState([]);

  // Mock real-time data generation
  useEffect(() => {
    const generateDataPoint = () => ({
      time: new Date().toLocaleTimeString('es-ES', { hour12: false }),
      temperature: 37 + Math.random() * 2 - 1,
      ph: 7.2 + Math.random() * 0.4 - 0.2,
      oxygen: 85 + Math.random() * 10 - 5,
      biomass: 2.5 + Math.random() * 0.5
    });

    // Initialize with some data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 60000).toLocaleTimeString('es-ES', { hour12: false }),
      temperature: 37 + Math.random() * 2 - 1,
      ph: 7.2 + Math.random() * 0.4 - 0.2,
      oxygen: 85 + Math.random() * 10 - 5,
      biomass: 2.5 + Math.random() * 0.5
    }));
    
    setRealTimeData(initialData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = [...prev.slice(1), generateDataPoint()];
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeExperiments = [
    {
      id: 'EXP-2024-001',
      name: 'Optimización de E. coli BL21',
      status: 'running',
      progress: 65,
      startTime: '09:30',
      estimatedEnd: '18:45'
    },
    {
      id: 'EXP-2024-002',
      name: 'Análisis de Proteínas Recombinantes',
      status: 'paused',
      progress: 40,
      startTime: '11:15',
      estimatedEnd: '20:30'
    },
    {
      id: 'EXP-2024-003',
      name: 'Fermentación Batch Optimizada',
      status: 'running',
      progress: 85,
      startTime: '07:00',
      estimatedEnd: '16:20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-success';
      case 'paused': return 'text-warning';
      case 'completed': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return 'Play';
      case 'paused': return 'Pause';
      case 'completed': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card border scientific-border rounded-lg scientific-shadow">
      {/* Header */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Monitoreo en Tiempo Real</h2>
              <p className="text-sm text-text-secondary">Experimentos activos y datos de sensores</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full scientific-pulse"></div>
            <span className="text-sm text-success font-medium">En vivo</span>
          </div>
        </div>
      </div>

      {/* Experiment Selector */}
      <div className="p-6 border-b scientific-border">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {activeExperiments.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExperiment(exp.id)}
              className={`flex-shrink-0 p-3 rounded-lg border scientific-transition ${
                selectedExperiment === exp.id
                  ? 'bg-primary/10 border-primary/20 text-primary' :'bg-muted border-border hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={getStatusIcon(exp.status)} size={16} className={getStatusColor(exp.status)} />
                <span className="text-sm font-medium">{exp.id}</span>
              </div>
              <p className="text-xs text-text-secondary text-left">{exp.name}</p>
              <div className="mt-2">
                <div className="w-full bg-border rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full scientific-transition" 
                    style={{ width: `${exp.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-secondary mt-1">{exp.progress}% completado</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Charts */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature & pH Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text-primary">Temperatura y pH</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={false}
                    name="Temperatura (°C)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ph" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={false}
                    name="pH"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Oxygen & Biomass Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text-primary">Oxígeno y Biomasa</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="oxygen" 
                    stackId="1"
                    stroke="#F59E0B" 
                    fill="#F59E0B"
                    fillOpacity={0.3}
                    name="Oxígeno (%)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="biomass" 
                    stackId="2"
                    stroke="#DC2626" 
                    fill="#DC2626"
                    fillOpacity={0.3}
                    name="Biomasa (g/L)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Control Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" iconName="Pause" iconPosition="left">
              Pausar Experimento
            </Button>
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Ajustar Parámetros
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>Última actualización: {new Date().toLocaleTimeString('es-ES', { hour12: false })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentMonitoringPanel;