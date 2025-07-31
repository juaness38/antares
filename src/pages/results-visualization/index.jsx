import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import VisualizationToolbar from './components/VisualizationToolbar';
import DataSourcePanel from './components/DataSourcePanel';
import AnalysisPanel from './components/AnalysisPanel';
import VisualizationWorkspace from './components/VisualizationWorkspace';
import ShareModal from './components/ShareModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResultsVisualization = () => {
  const [currentView, setCurrentView] = useState('line-chart');
  const [selectedExperiments, setSelectedExperiments] = useState(['exp-001']);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [analysisData, setAnalysisData] = useState({});

  useEffect(() => {
    // Initialize with default experiment selection
    setSelectedExperiments(['exp-001']);
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleDataSourceChange = (experiments) => {
    setSelectedExperiments(experiments);
  };

  const handleAnalysisChange = (data) => {
    setAnalysisData(prev => ({
      ...prev,
      [data.type]: data.data
    }));
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting visualization as ${format}`);
    
    // Create mock download
    const element = document.createElement('a');
    const file = new Blob(['Mock visualization data'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `visualization_${Date.now()}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleAnnotationAdd = (dataPoint) => {
    console.log('Adding annotation for data point:', dataPoint);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleShare();
            break;
          case 'e':
            e.preventDefault();
            handleExport('png');
            break;
          case 'f':
            e.preventDefault();
            handleFullscreen();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {!isFullscreen && (
          <>
            {/* Page Header */}
            <div className="bg-surface border-b scientific-border">
              <div className="px-6 py-4">
                <Breadcrumb />
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                      Visualización de Resultados
                    </h1>
                    <p className="text-text-secondary">
                      Explora y analiza datos experimentales con herramientas interactivas de visualización
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Panel Toggle Controls */}
                    <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                      <Button
                        variant={leftPanelCollapsed ? "ghost" : "default"}
                        size="sm"
                        onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                        title="Panel de datos"
                      >
                        <Icon name="PanelLeft" size={16} />
                      </Button>
                      <Button
                        variant={rightPanelCollapsed ? "ghost" : "default"}
                        size="sm"
                        onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                        title="Panel de análisis"
                      >
                        <Icon name="PanelRight" size={16} />
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <Button
                      variant="outline"
                      onClick={() => handleExport('png')}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Exportar
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={handleShare}
                      iconName="Share2"
                      iconPosition="left"
                    >
                      Compartir
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Toolbar */}
            <VisualizationToolbar
              currentView={currentView}
              onViewChange={handleViewChange}
              onExport={handleExport}
              onShare={handleShare}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
            />
          </>
        )}

        {/* Main Content Area */}
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Left Panel - Data Sources */}
          {!leftPanelCollapsed && (
            <DataSourcePanel
              onDataSourceChange={handleDataSourceChange}
              selectedExperiments={selectedExperiments}
            />
          )}

          {/* Collapsed Left Panel Toggle */}
          {leftPanelCollapsed && (
            <div className="w-12 bg-surface border-r scientific-border flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftPanelCollapsed(false)}
                title="Mostrar panel de datos"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          )}

          {/* Central Workspace */}
          <VisualizationWorkspace
            currentView={currentView}
            selectedExperiments={selectedExperiments}
            isFullscreen={isFullscreen}
            onAnnotationAdd={handleAnnotationAdd}
          />

          {/* Collapsed Right Panel Toggle */}
          {rightPanelCollapsed && (
            <div className="w-12 bg-surface border-l scientific-border flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightPanelCollapsed(false)}
                title="Mostrar panel de análisis"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
            </div>
          )}

          {/* Right Panel - Analysis Tools */}
          {!rightPanelCollapsed && (
            <AnalysisPanel
              selectedData={selectedExperiments}
              onAnalysisChange={handleAnalysisChange}
            />
          )}
        </div>

        {/* Fullscreen Exit Button */}
        {isFullscreen && (
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="default"
              onClick={handleFullscreen}
              iconName="Minimize2"
              iconPosition="left"
            >
              Salir de Pantalla Completa
            </Button>
          </div>
        )}

        {/* Share Modal */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          visualizationData={{
            view: currentView,
            experiments: selectedExperiments,
            analysis: analysisData
          }}
        />

        {/* Status Bar */}
        {!isFullscreen && (
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t scientific-border px-6 py-2">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span>
                  {selectedExperiments.length} experimento{selectedExperiments.length !== 1 ? 's' : ''} seleccionado{selectedExperiments.length !== 1 ? 's' : ''}
                </span>
                <span>Vista: {currentView}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Datos actualizados</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>Última actualización: {new Date().toLocaleTimeString('es-ES')}</span>
                <div className="flex items-center space-x-2">
                  <Icon name="Keyboard" size={14} />
                  <span>Ctrl+S: Compartir | Ctrl+E: Exportar | Ctrl+F: Pantalla completa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsVisualization;