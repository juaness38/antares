import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import dashboard components
import KPICard from './components/KPICard';
import ExperimentMonitoringPanel from './components/ExperimentMonitoringPanel';
import ActivityFeed from './components/ActivityFeed';
import ScheduledProtocols from './components/ScheduledProtocols';
import DeviceStatusGrid from './components/DeviceStatusGrid';
import AIDecisionLogs from './components/AIDecisionLogs';

const Dashboard = () => {
  // Mock KPI data
  const kpiData = [
    {
      title: 'Protocolos Activos',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: 'Dna',
      color: 'primary'
    },
    {
      title: 'Sleeping Slaves',
      value: '8/12',
      change: '67%',
      changeType: 'neutral',
      icon: 'Server',
      color: 'success'
    },
    {
      title: 'Análisis en Cola',
      value: '12',
      change: '-3',
      changeType: 'decrease',
      icon: 'BarChart3',
      color: 'warning'
    },
    {
      title: 'Driver IA',
      value: 'Activo',
      change: '+15%',
      changeType: 'increase',
      icon: 'Brain',
      color: 'success'
    }
  ];

  const quickActions = [
    {
      title: 'Protocolos In-Silico',
      description: 'Descubrimiento de función proteica',
      icon: 'Dna',
      color: 'primary',
      path: '/prompt-protocols'
    },
    {
      title: 'Análisis Bioinformático',
      description: 'BLAST, UniProt, PDB y más',
      icon: 'Search',
      color: 'success',
      path: '/analysis-queue'
    },
    {
      title: 'Microambiente',
      description: 'Control de cámaras de cultivo',
      icon: 'Thermometer',
      color: 'secondary',
      path: '/device-management'
    },
    {
      title: 'Monitoreo Científico',
      description: 'Datos experimentales en tiempo real',
      icon: 'Activity',
      color: 'accent',
      path: '/real-time-monitoring'
    }
  ];

  const getActionColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Astroflora Antares - Control Central
                </h1>
                <p className="text-text-secondary">
                  Orquestación inteligente para descubrimiento in-silico de función proteica
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full scientific-pulse"></div>
                  <span className="text-sm font-medium text-primary">Driver IA Activo</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full scientific-pulse"></div>
                  <span className="text-sm font-medium text-success">Orquestador Inteligente</span>
                </div>
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Actualizar
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Sleeping Slaves Status */}
          <div className="bg-card border scientific-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Estado de Sleeping Slaves</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full scientific-pulse" />
                <span className="text-sm text-success font-medium">8/12 Activos</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">BLAST Slave</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
                <p className="text-xs text-blue-700">Búsqueda de homología activa</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">UniProt Slave</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <p className="text-xs text-green-700">Anotación funcional</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-900">PDB Slave</span>
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                </div>
                <p className="text-xs text-purple-700">Análisis estructural</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">AlphaFold Slave</span>
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                <p className="text-xs text-orange-700">Predicción de estructura</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Main Monitoring */}
            <div className="lg:col-span-2 space-y-8">
              <ExperimentMonitoringPanel />
              <DeviceStatusGrid />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <ActivityFeed />
              <ScheduledProtocols />
            </div>
          </div>

          {/* AI Decision Logs */}
          <div className="mb-8">
            <AIDecisionLogs />
          </div>

          {/* Quick Actions */}
          <div className="bg-card border scientific-border rounded-lg scientific-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Herramientas Científicas</h2>
                  <p className="text-sm text-text-secondary">Acceso rápido a protocolos bioinformáticos</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`p-4 rounded-lg border scientific-transition ${getActionColorClasses(action.color)}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActionColorClasses(action.color)}`}>
                      <Icon name={action.icon} size={18} />
                    </div>
                    <h3 className="font-medium">{action.title}</h3>
                  </div>
                  <p className="text-sm opacity-80">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* System Status Footer */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Server" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Antares v5.0 - Última sincronización: {new Date().toLocaleTimeString('es-ES', { hour12: false })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Capacidad: 2.8 TB / 5.0 TB
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Brain" size={16} className="text-primary" />
                <span className="text-sm text-primary">Driver IA optimizando protocolos</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;