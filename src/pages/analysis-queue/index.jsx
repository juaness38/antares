import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';

import QueueStatsCard from './components/QueueStatsCard';
import JobFilters from './components/JobFilters';
import JobTable from './components/JobTable';
import JobDetailsPanel from './components/JobDetailsPanel';
import NewAnalysisModal from './components/NewAnalysisModal';

const AnalysisQueue = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showNewAnalysisModal, setShowNewAnalysisModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'submittedAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    priority: 'all',
    user: 'all',
    search: '',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data for analysis jobs
  const [jobs] = useState([
    {
      id: 'JOB-2025-001',
      name: 'Análisis BLAST - Proteína Spike SARS-CoV-2',
      type: 'BLAST Search',
      status: 'running',
      priority: 'high',
      progress: 67,
      user: 'Dr. García',
      submittedAt: new Date('2025-01-17T14:30:00'),
      estimatedCompletion: '15 min',
      estimatedTime: '8 min',
      cpuCores: 4,
      memory: '8GB',
      runtime: '12m 34s',
      parameters: `{
  "sequence_file": "spike_protein.fasta",
  "database": "nr",
  "e_value": 0.001,
  "max_target_seqs": 100,
  "word_size": 6,
  "matrix": "BLOSUM62"
}`,
      logs: `[2025-01-17 14:30:15] INFO: Iniciando análisis BLAST
[2025-01-17 14:30:16] INFO: Cargando secuencia spike protein (1,273 aminoácidos)
[2025-01-17 14:30:17] INFO: Conectando a base de datos nr
[2025-01-17 14:30:18] INFO: Configurando parámetros de búsqueda
[2025-01-17 14:30:19] INFO: Iniciando búsqueda de homología
[2025-01-17 14:35:42] INFO: Procesando resultados (67% completado)
[2025-01-17 14:38:15] INFO: Generando alineamientos...`
    },
    {
      id: 'JOB-2025-002',
      name: 'Acoplamiento Molecular - Remdesivir vs RdRp',
      type: 'Acoplamiento Molecular',
      status: 'queued',
      priority: 'medium',
      progress: 0,
      user: 'Dr. Martínez',
      submittedAt: new Date('2025-01-17T14:45:00'),
      estimatedCompletion: '45 min',
      cpuCores: 8,
      memory: '16GB',
      runtime: '0h 0m'
    },
    {
      id: 'JOB-2025-003',
      name: 'Predicción de Estructura - Proteína NSP1',
      type: 'Predicción de Estructura',
      status: 'completed',
      priority: 'low',
      progress: 100,
      user: 'Dr. López',
      submittedAt: new Date('2025-01-17T13:15:00'),
      estimatedCompletion: 'Completado',
      cpuCores: 2,
      memory: '4GB',
      runtime: '1h 23m'
    },
    {
      id: 'JOB-2025-004',
      name: 'Análisis Filogenético - Coronavirus',
      type: 'Análisis Filogenético',
      status: 'failed',
      priority: 'medium',
      progress: 45,
      user: 'Dr. Rodríguez',
      submittedAt: new Date('2025-01-17T12:30:00'),
      estimatedCompletion: 'Error',
      cpuCores: 4,
      memory: '8GB',
      runtime: '25m 12s'
    },
    {
      id: 'JOB-2025-005',
      name: 'Búsqueda de Homología - Proteínas Virales',
      type: 'Búsqueda de Homología',
      status: 'paused',
      priority: 'low',
      user: 'Dr. García',
      submittedAt: new Date('2025-01-17T11:45:00'),
      estimatedCompletion: 'Pausado',
      cpuCores: 2,
      memory: '4GB',
      runtime: '45m 8s'
    },
    {
      id: 'JOB-2025-006',
      name: 'Análisis de Función Proteica - Enzimas Metabólicas',
      type: 'Análisis de Función Proteica',
      status: 'running',
      priority: 'high',
      progress: 23,
      user: 'Dr. Martínez',
      submittedAt: new Date('2025-01-17T14:00:00'),
      estimatedCompletion: '32 min',
      estimatedTime: '25 min',
      cpuCores: 6,
      memory: '12GB',
      runtime: '58m 42s'
    }
  ]);

  // Queue statistics
  const queueStats = {
    totalJobs: jobs.length,
    runningJobs: jobs.filter(job => job.status === 'running').length,
    queuedJobs: jobs.filter(job => job.status === 'queued').length,
    completedJobs: jobs.filter(job => job.status === 'completed').length,
    failedJobs: jobs.filter(job => job.status === 'failed').length,
    systemLoad: 67,
    availableResources: 24,
    avgWaitTime: '12 min'
  };

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    if (filters.type !== 'all' && job.type !== filters.type) return false;
    if (filters.status !== 'all' && job.status !== filters.status) return false;
    if (filters.priority !== 'all' && job.priority !== filters.priority) return false;
    if (filters.user !== 'all' && job.user !== filters.user) return false;
    if (filters.search && !job.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !job.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.dateFrom && new Date(job.submittedAt) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(job.submittedAt) > new Date(filters.dateTo)) return false;
    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      priority: 'all',
      user: 'all',
      search: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleJobSelect = (jobId, selected) => {
    if (selected) {
      setSelectedJobs(prev => [...prev, jobId]);
    } else {
      setSelectedJobs(prev => prev.filter(id => id !== jobId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedJobs(sortedJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleJobAction = (jobId, action) => {
    console.log(`Performing action ${action} on job ${jobId}`);
    // Implement job actions (pause, resume, cancel, etc.)
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action ${action} on jobs:`, selectedJobs);
    // Implement bulk actions
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleNewAnalysis = (analysisData) => {
    console.log('New analysis submitted:', analysisData);
    // Implement new analysis submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Cola de Análisis</h1>
              <p className="text-text-secondary mt-2">
                Gestiona y monitorea trabajos de análisis bioinformático
              </p>
            </div>
            
            <Button
              variant="primary"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowNewAnalysisModal(true)}
            >
              Nuevo Análisis
            </Button>
          </div>

          {/* Queue Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QueueStatsCard
              title="Trabajos Totales"
              value={queueStats.totalJobs}
              subtitle="En el sistema"
              icon="BarChart3"
              color="primary"
            />
            
            <QueueStatsCard
              title="En Ejecución"
              value={queueStats.runningJobs}
              subtitle="Procesando actualmente"
              icon="Play"
              color="success"
              trend={{ direction: 'up', value: '+2' }}
            />
            
            <QueueStatsCard
              title="En Cola"
              value={queueStats.queuedJobs}
              subtitle={`Tiempo promedio: ${queueStats.avgWaitTime}`}
              icon="Clock"
              color="warning"
            />
            
            <QueueStatsCard
              title="Recursos Disponibles"
              value={`${queueStats.availableResources} cores`}
              subtitle={`Carga del sistema: ${queueStats.systemLoad}%`}
              icon="Cpu"
              color="secondary"
            />
          </div>

          {/* System Status */}
          <div className="bg-card border scientific-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Estado del Sistema</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full scientific-pulse" />
                <span className="text-sm text-success font-medium">Sistema Operativo</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Carga del Sistema</span>
                  <span className="text-sm font-medium text-text-primary">{queueStats.systemLoad}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full scientific-transition"
                    style={{ width: `${queueStats.systemLoad}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Sleeping Slaves Activos</span>
                  <span className="text-sm font-medium text-text-primary">8/12</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-success rounded-full scientific-transition"
                    style={{ width: '67%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Memoria Utilizada</span>
                  <span className="text-sm font-medium text-text-primary">45/128 GB</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-warning rounded-full scientific-transition"
                    style={{ width: '35%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <JobFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            selectedJobs={selectedJobs}
            onBulkAction={handleBulkAction}
            totalJobs={filteredJobs.length}
          />

          {/* Jobs Table */}
          <JobTable
            jobs={sortedJobs}
            selectedJobs={selectedJobs}
            onJobSelect={handleJobSelect}
            onSelectAll={handleSelectAll}
            onJobAction={handleJobAction}
            onJobClick={handleJobClick}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </main>

      {/* Job Details Panel */}
      {selectedJob && (
        <JobDetailsPanel
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onJobAction={handleJobAction}
        />
      )}

      {/* New Analysis Modal */}
      <NewAnalysisModal
        isOpen={showNewAnalysisModal}
        onClose={() => setShowNewAnalysisModal(false)}
        onSubmit={handleNewAnalysis}
      />
    </div>
  );
};

export default AnalysisQueue;