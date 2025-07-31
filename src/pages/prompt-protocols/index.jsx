import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import BioinformaticsLibrary from './components/BioinformaticsLibrary';
import ProtocolCanvas from './components/ProtocolCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import ProtocolToolbar from './components/ProtocolToolbar';
import MicroenvironmentPanel from './components/MicroenvironmentPanel';
import AIOrchestrationPanel from './components/AIOrchestrationPanel';

const PromptProtocols = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [validationStatus, setValidationStatus] = useState('pending');
  const [activeMode, setActiveMode] = useState('bioinformatics'); // 'bioinformatics', 'microenvironment', 'ai-orchestration'
  const [protocolStatus, setProtocolStatus] = useState('design'); // 'design', 'running', 'completed'

  const handleNodeAdd = useCallback((node) => {
    const newNode = {
      ...node,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      width: 200,
      height: 120,
      status: 'idle',
      progress: 0,
      parameters: {},
      outputs: {},
      logs: []
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeMove = useCallback((nodeId, position) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...position } : node
    ));
  }, []);

  const handleNodeUpdate = useCallback((nodeId, updates) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
    
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => ({ ...prev, ...updates }));
    }
  }, [selectedNode]);

  const handleNodeDelete = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ));
    
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const handleConnectionAdd = useCallback((fromId, toId) => {
    const newConnection = { 
      id: `conn-${Date.now()}`,
      from: fromId, 
      to: toId,
      type: 'data-flow',
      status: 'idle'
    };
    setConnections(prev => [...prev, newConnection]);
  }, []);

  const handleProtocolRun = useCallback(async () => {
    if (nodes.length === 0) {
      alert('Agrega componentes al protocolo antes de ejecutar');
      return;
    }
    
    setProtocolStatus('running');
    setValidationStatus('running');
    
    // Simulate protocol execution
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Update node status to running
      handleNodeUpdate(node.id, { 
        status: 'running', 
        progress: 0,
        logs: [`[${new Date().toISOString()}] Iniciando ${node.name}...`]
      });
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update progress
      for (let progress = 0; progress <= 100; progress += 10) {
        handleNodeUpdate(node.id, { 
          progress,
          logs: [
            `[${new Date().toISOString()}] Iniciando ${node.name}...`,
            `[${new Date().toISOString()}] Procesando... ${progress}%`
          ]
        });
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Complete node
      handleNodeUpdate(node.id, { 
        status: 'completed',
        progress: 100,
        logs: [
          `[${new Date().toISOString()}] Iniciando ${node.name}...`,
          `[${new Date().toISOString()}] Procesando... 100%`,
          `[${new Date().toISOString()}] Completado exitosamente`
        ]
      });
    }
    
    setProtocolStatus('completed');
    setValidationStatus('completed');
  }, [nodes, handleNodeUpdate]);

  const handleProtocolStop = useCallback(() => {
    setProtocolStatus('design');
    setValidationStatus('pending');
    setNodes(prev => prev.map(node => ({
      ...node,
      status: 'idle',
      progress: 0,
      logs: []
    })));
  }, []);

  const handleSave = useCallback(() => {
    const protocolData = {
      nodes,
      connections,
      metadata: {
        name: 'Protocolo_Descubrimiento_Proteinas_v1.0',
        created: new Date().toISOString(),
        version: '1.0',
        type: 'in-silico-protein-discovery'
      }
    };
    
    console.log('Saving protocol:', protocolData);
    alert('Protocolo de descubrimiento de proteínas guardado exitosamente');
  }, [nodes, connections]);

  const handleLoad = useCallback((templateId) => {
    if (templateId === 'new') {
      setNodes([]);
      setConnections([]);
      setSelectedNode(null);
      setValidationStatus('pending');
      return;
    }

    const mockTemplates = {
      'protein-discovery': {
        nodes: [
          {
            id: 'node-1',
            name: 'Análisis BLAST',
            icon: 'Search',
            type: 'bioinformatics',
            category: 'sequence-analysis',
            x: 100,
            y: 100,
            width: 200,
            height: 120,
            status: 'idle',
            progress: 0,
            parameters: {
              database: 'nr',
              e_value: 0.001,
              max_targets: 100
            }
          },
          {
            id: 'node-2',
            name: 'UniProt Annotation',
            icon: 'FileText',
            type: 'bioinformatics',
            category: 'annotation',
            x: 350,
            y: 100,
            width: 200,
            height: 120,
            status: 'idle',
            progress: 0,
            parameters: {
              organism: 'human',
              evidence_level: 'experimental'
            }
          },
          {
            id: 'node-3',
            name: 'PDB Structure',
            icon: 'Cube',
            type: 'bioinformatics',
            category: 'structure',
            x: 600,
            y: 100,
            width: 200,
            height: 120,
            status: 'idle',
            progress: 0,
            parameters: {
              resolution: '2.5',
              method: 'X-ray'
            }
          }
        ],
        connections: [
          { id: 'conn-1', from: 'node-1', to: 'node-2', type: 'data-flow', status: 'idle' },
          { id: 'conn-2', from: 'node-2', to: 'node-3', type: 'data-flow', status: 'idle' }
        ]
      }
    };

    const template = mockTemplates[templateId];
    if (template) {
      setNodes(template.nodes);
      setConnections(template.connections);
      setSelectedNode(null);
      setValidationStatus('valid');
    }
  }, []);

  const handleValidate = useCallback(() => {
    let status = 'valid';
    
    if (nodes.length === 0) {
      status = 'error';
    } else if (nodes.some(node => !node.name || node.name.trim() === '')) {
      status = 'warning';
    }
    
    setValidationStatus(status);
    
    const messages = {
      valid: 'Protocolo de descubrimiento de proteínas validado correctamente.',
      warning: 'Protocolo válido con advertencias. Revisa las configuraciones.',
      error: 'Errores encontrados en el protocolo. Corrígelos antes de continuar.'
    };
    
    alert(messages[status]);
  }, [nodes]);

  const modeButtons = [
    { id: 'bioinformatics', label: 'Bioinformática', icon: 'Dna' },
    { id: 'microenvironment', label: 'Microambiente', icon: 'Thermometer' },
    { id: 'ai-orchestration', label: 'IA Orquestación', icon: 'Brain' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Protocolos de Descubrimiento In-Silico
                </h1>
                <p className="text-text-secondary">
                  Orquestación inteligente para el descubrimiento de función de proteínas
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full scientific-pulse"></div>
                  <span className="text-sm font-medium text-primary">
                    Driver IA Activo
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                  <Icon name="Server" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    8/12 Sleeping Slaves
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="bg-card border scientific-border rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-text-secondary">Modo:</span>
              <div className="flex space-x-2">
                {modeButtons.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg scientific-transition
                      ${activeMode === mode.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary hover:bg-muted/80'
                      }
                    `}
                  >
                    <Icon name={mode.icon} size={16} />
                    <span className="text-sm font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-card border scientific-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    protocolStatus === 'design' ? 'bg-secondary' :
                    protocolStatus === 'running' ? 'bg-warning scientific-pulse' :
                    'bg-success'
                  }`} />
                  <span className="text-sm font-medium text-text-primary">
                    {protocolStatus === 'design' ? 'Diseño' :
                     protocolStatus === 'running' ? 'Ejecutando' :
                     'Completado'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="GitBranch" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {nodes.length} nodos, {connections.length} conexiones
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Tiempo estimado: {Math.max(1, Math.ceil(nodes.length * 0.5))} min
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {protocolStatus === 'running' ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Square"
                    iconPosition="left"
                    onClick={handleProtocolStop}
                  >
                    Detener
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    onClick={handleProtocolRun}
                    disabled={nodes.length === 0}
                  >
                    Ejecutar Protocolo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ProtocolToolbar
          onSave={handleSave}
          onLoad={handleLoad}
          onValidate={handleValidate}
          validationStatus={validationStatus}
          protocolStatus={protocolStatus}
        />

        <div className="flex h-[calc(100vh-350px)]">
          {activeMode === 'bioinformatics' && (
            <BioinformaticsLibrary onDragStart={() => {}} />
          )}
          
          {activeMode === 'microenvironment' && (
            <MicroenvironmentPanel />
          )}
          
          {activeMode === 'ai-orchestration' && (
            <AIOrchestrationPanel />
          )}
          
          <ProtocolCanvas
            nodes={nodes}
            connections={connections}
            onNodeAdd={handleNodeAdd}
            onNodeSelect={handleNodeSelect}
            onNodeMove={handleNodeMove}
            onConnectionAdd={handleConnectionAdd}
            selectedNode={selectedNode}
            protocolStatus={protocolStatus}
          />
          
          <PropertiesPanel
            selectedNode={selectedNode}
            onNodeUpdate={handleNodeUpdate}
            onNodeDelete={handleNodeDelete}
          />
        </div>
      </main>
    </div>
  );
};

export default PromptProtocols;