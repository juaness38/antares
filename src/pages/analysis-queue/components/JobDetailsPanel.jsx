import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import JobStatusBadge from './JobStatusBadge';
import JobProgressBar from './JobProgressBar';

const JobDetailsPanel = ({ job, onClose, onJobAction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!job) return null;

  const tabs = [
    { key: 'overview', label: 'Resumen', icon: 'Info' },
    { key: 'parameters', label: 'Parámetros', icon: 'Settings' },
    { key: 'logs', label: 'Logs', icon: 'FileText' },
    { key: 'results', label: 'Resultados', icon: 'BarChart3' }
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Información General</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">ID del Trabajo</label>
            <p className="text-text-primary">{job.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Tipo de Análisis</label>
            <p className="text-text-primary">{job.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Usuario</label>
            <p className="text-text-primary">{job.user}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Prioridad</label>
            <p className="text-text-primary capitalize">{job.priority}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Enviado</label>
            <p className="text-text-primary">{formatDate(job.submittedAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Tiempo Estimado</label>
            <p className="text-text-primary">{job.estimatedCompletion || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-text-primary mb-3">Progreso</h4>
        <JobProgressBar
          progress={job.progress}
          status={job.status}
          estimatedTime={job.estimatedTime}
        />
      </div>

      <div>
        <h4 className="text-md font-medium text-text-primary mb-3">Recursos Asignados</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Cpu" size={16} className="text-primary" />
              <span className="text-sm font-medium">CPU</span>
            </div>
            <p className="text-lg font-semibold">{job.cpuCores} cores</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="HardDrive" size={16} className="text-primary" />
              <span className="text-sm font-medium">Memoria</span>
            </div>
            <p className="text-lg font-semibold">{job.memory || '8GB'}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium">Tiempo</span>
            </div>
            <p className="text-lg font-semibold">{job.runtime || '0h 0m'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderParameters = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Parámetros de Entrada</h3>
      <div className="bg-muted rounded-lg p-4">
        <pre className="text-sm text-text-primary whitespace-pre-wrap">
          {job.parameters || `{
  "sequence_file": "protein_sequence.fasta",
  "database": "nr",
  "e_value": 0.001,
  "max_target_seqs": 100,
  "word_size": 6,
  "matrix": "BLOSUM62",
  "gap_costs": "11,1",
  "compositional_adjustments": 2
}`}
        </pre>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Logs de Ejecución</h3>
      <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
        <pre className="text-sm text-green-400 font-mono">
          {job.logs || `[2025-01-17 14:58:46] INFO: Iniciando análisis BLAST
[2025-01-17 14:58:47] INFO: Cargando secuencia de entrada (1,234 aminoácidos)
[2025-01-17 14:58:48] INFO: Conectando a base de datos nr
[2025-01-17 14:58:49] INFO: Configurando parámetros de búsqueda
[2025-01-17 14:58:50] INFO: Iniciando búsqueda de homología
[2025-01-17 14:59:15] INFO: Procesando resultados (45% completado)
[2025-01-17 14:59:32] INFO: Generando alineamientos
[2025-01-17 14:59:45] INFO: Calculando estadísticas
[2025-01-17 14:59:58] INFO: Análisis completado exitosamente`}
        </pre>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Resultados del Análisis</h3>
      
      {job.status === 'completed' ? (
        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="font-medium text-success">Análisis Completado</span>
            </div>
            <p className="text-sm text-text-secondary">
              Se encontraron 127 secuencias homólogas con E-value &lt; 0.001
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Estadísticas</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>Hits encontrados: 127</li>
                <li>Mejor E-value: 2.3e-89</li>
                <li>Cobertura promedio: 78%</li>
                <li>Identidad promedio: 65%</li>
              </ul>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Archivos Generados</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>blast_results.xml</li>
                <li>alignments.txt</li>
                <li>summary_report.pdf</li>
                <li>statistics.json</li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="primary" iconName="Download" iconPosition="left">
              Descargar Resultados
            </Button>
            <Button variant="outline" iconName="Eye" iconPosition="left">
              Ver Visualización
            </Button>
          </div>
        </div>
      ) : job.status === 'failed' ? (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="XCircle" size={20} className="text-error" />
            <span className="font-medium text-error">Error en el Análisis</span>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            El análisis falló debido a un error en la configuración de parámetros
          </p>
          <Button variant="outline" size="sm" iconName="RotateCcw">
            Reintentar Análisis
          </Button>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">Los resultados estarán disponibles cuando el análisis se complete</p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'parameters': return renderParameters();
      case 'logs': return renderLogs();
      case 'results': return renderResults();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-card border-l scientific-border shadow-scientific-lg z-40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b scientific-border">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{job.name}</h2>
          <div className="flex items-center space-x-3 mt-2">
            <JobStatusBadge status={job.status} />
            <span className="text-sm text-text-secondary">{job.type}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b scientific-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium scientific-transition ${
              activeTab === tab.key
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default JobDetailsPanel;