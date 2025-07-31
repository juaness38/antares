import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import MonitoringToolbar from './components/MonitoringToolbar';
import LiveDataCharts from './components/LiveDataCharts';
import DeviceStatusPanel from './components/DeviceStatusPanel';
import ExperimentTimeline from './components/ExperimentTimeline';
import AIDecisionLogs from './components/AIDecisionLogs';
import AlertsPanel from './components/AlertsPanel';

const RealTimeMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [layoutMode, setLayoutMode] = useState('grid'); // grid, split, focus
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState('A-2024-001');

  // Mock experiments data
  const experiments = [
    {
      id: 'A-2024-001',
      name: 'Optimización de Proteína Recombinante',
      status: 'running',
      progress: 65,
      startTime: new Date(Date.now() - 6600000), // 1h 50m ago
      estimatedEnd: new Date(Date.now() + 3600000) // 1h from now
    },
    {
      id: 'B-2024-002',
      name: 'Análisis de Metabolitos Secundarios',
      status: 'paused',
      progress: 40,
      startTime: new Date(Date.now() - 3600000),
      estimatedEnd: new Date(Date.now() + 7200000)
    },
    {
      id: 'C-2024-003',
      name: 'Caracterización Enzimática',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 14400000),
      estimatedEnd: new Date(Date.now() - 1800000)
    }
  ];

  const currentExperiment = experiments.find(exp => exp.id === selectedExperiment);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            setIsFullscreen(!isFullscreen);
            break;
          case 'e':
            e.preventDefault();
            handleDataExport();
            break;
          case '1':
            e.preventDefault();
            setActiveTab('overview');
            break;
          case '2':
            e.preventDefault();
            setActiveTab('devices');
            break;
          case '3':
            e.preventDefault();
            setActiveTab('ai-logs');
            break;
          case '4':
            e.preventDefault();
            setActiveTab('alerts');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const handleEmergencyStop = () => {
    console.log('Emergency stop activated');
    // Implement emergency stop logic
  };

  const handleDataExport = (format = 'csv') => {
    console.log(`Exporting data in ${format} format`);
    // Implement data export logic
  };

  const handleParameterAdjust = () => {
    console.log('Opening parameter adjustment panel');
    // Implement parameter adjustment logic
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-success bg-success/10 border-success/20';
      case 'paused':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'completed':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'running':
        return 'En Ejecución';
      case 'paused':
        return 'Pausado';
      case 'completed':
        return 'Completado';
      default:
        return 'Desconocido';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vista General', icon: 'LayoutDashboard' },
    { id: 'devices', label: 'Dispositivos', icon: 'HardDrive' },
    { id: 'ai-logs', label: 'IA Decisiones', icon: 'Brain' },
    { id: 'alerts', label: 'Alertas', icon: 'Bell' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <LiveDataCharts />
            </div>
            <ExperimentTimeline experiment={currentExperiment} />
            <DeviceStatusPanel />
          </div>
        );
      case 'devices':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <DeviceStatusPanel />
            </div>
            <div>
              <ExperimentTimeline experiment={currentExperiment} />
            </div>
          </div>
        );
      case 'ai-logs':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <AIDecisionLogs />
            </div>
            <div className="space-y-6">
              <LiveDataCharts />
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <AlertsPanel />
            </div>
            <div className="space-y-6">
              <DeviceStatusPanel />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <Helmet>
        <title>Monitoreo en Tiempo Real - Antares</title>
        <meta name="description" content="Monitoreo en tiempo real de experimentos científicos y dispositivos de laboratorio" />
      </Helmet>

      {!isFullscreen && <Header />}
      
      <div className={`${!isFullscreen ? 'pt-16' : ''}`}>
        <MonitoringToolbar
          onEmergencyStop={handleEmergencyStop}
          onDataExport={handleDataExport}
          onParameterAdjust={handleParameterAdjust}
        />

        <div className="p-6">
          {!isFullscreen && <Breadcrumb />}

          {/* Experiment selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-text-primary">
                Monitoreo en Tiempo Real
              </h1>
              
              <select
                value={selectedExperiment}
                onChange={(e) => setSelectedExperiment(e.target.value)}
                className="px-3 py-2 bg-card border scientific-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {experiments.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.name} ({exp.id})
                  </option>
                ))}
              </select>

              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentExperiment?.status)}`}>
                {getStatusLabel(currentExperiment?.status)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Layout controls */}
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-2 rounded-md scientific-transition ${
                    layoutMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Vista en cuadrícula"
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setLayoutMode('split')}
                  className={`p-2 rounded-md scientific-transition ${
                    layoutMode === 'split' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Vista dividida"
                >
                  <Icon name="Columns" size={16} />
                </button>
                <button
                  onClick={() => setLayoutMode('focus')}
                  className={`p-2 rounded-md scientific-transition ${
                    layoutMode === 'focus' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Vista enfocada"
                >
                  <Icon name="Maximize" size={16} />
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                iconName={isFullscreen ? "Minimize" : "Maximize"}
                iconPosition="left"
              >
                {isFullscreen ? 'Salir' : 'Pantalla completa'}
              </Button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md scientific-transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-scientific'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Keyboard shortcuts help */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-medium text-text-primary mb-2">Atajos de teclado:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-text-secondary">
              <div><kbd className="px-1 py-0.5 bg-card rounded">Ctrl+F</kbd> Pantalla completa</div>
              <div><kbd className="px-1 py-0.5 bg-card rounded">Ctrl+E</kbd> Exportar datos</div>
              <div><kbd className="px-1 py-0.5 bg-card rounded">Ctrl+1-4</kbd> Cambiar pestaña</div>
              <div><kbd className="px-1 py-0.5 bg-card rounded">Esc</kbd> Salir pantalla completa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;