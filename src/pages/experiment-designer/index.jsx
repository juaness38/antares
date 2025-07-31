import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ComponentLibrary from './components/ComponentLibrary';
import ProtocolCanvas from './components/ProtocolCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import ProtocolToolbar from './components/ProtocolToolbar';

const ExperimentDesigner = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [validationStatus, setValidationStatus] = useState('pending');

  const handleNodeAdd = useCallback((node) => {
    setNodes(prev => [...prev, node]);
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
    
    // Update selected node if it's the one being updated
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
    const newConnection = { from: fromId, to: toId };
    setConnections(prev => [...prev, newConnection]);
  }, []);

  const handleSave = useCallback(() => {
    const protocolData = {
      nodes,
      connections,
      metadata: {
        name: 'Experimento_PCR_v2.1',
        created: new Date().toISOString(),
        version: '2.1'
      }
    };
    
    // Mock save operation
    console.log('Saving protocol:', protocolData);
    
    // Show success notification (in real app)
    alert('Protocolo guardado exitosamente');
  }, [nodes, connections]);

  const handleLoad = useCallback((templateId) => {
    if (templateId === 'new') {
      setNodes([]);
      setConnections([]);
      setSelectedNode(null);
      setValidationStatus('pending');
      return;
    }

    // Mock template loading
    const mockTemplates = {
      'pcr-basic': {
        nodes: [
          {
            id: 'node-1',
            name: 'Preparación de Muestra',
            icon: 'TestTube',
            type: 'preparation',
            x: 100,
            y: 100,
            width: 150,
            height: 80,
            temperature: '4',
            duration: '5m',
            volume: '50'
          },
          {
            id: 'node-2',
            name: 'PCR Amplificación',
            icon: 'Dna',
            type: 'analysis',
            x: 300,
            y: 100,
            width: 150,
            height: 80,
            method: 'PCR',
            cycles: '35'
          }
        ],
        connections: [
          { from: 'node-1', to: 'node-2' }
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
    // Mock validation logic
    let status = 'valid';
    
    if (nodes.length === 0) {
      status = 'error';
    } else if (nodes.some(node => !node.name || node.name.trim() === '')) {
      status = 'warning';
    }
    
    setValidationStatus(status);
    
    // Show validation results
    const messages = {
      valid: 'Protocolo validado correctamente. Listo para ejecutar.',
      warning: 'Protocolo válido con advertencias. Revisa las configuraciones.',
      error: 'Errores encontrados en el protocolo. Corrígelos antes de continuar.'
    };
    
    alert(messages[status]);
  }, [nodes]);

  const handleSimulate = useCallback(() => {
    if (nodes.length === 0) {
      alert('Agrega componentes al protocolo antes de simular');
      return;
    }
    
    // Mock simulation
    alert(`Iniciando simulación del protocolo con ${nodes.length} componentes.\nDuración estimada: 2h 45m`);
  }, [nodes]);

  const handleDragStart = useCallback((component) => {
    // Handle drag start if needed for additional logic
    console.log('Dragging component:', component);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Diseñador de Experimentos
            </h1>
            <p className="text-text-secondary">
              Crea protocolos experimentales complejos mediante una interfaz visual de arrastrar y soltar
            </p>
          </div>
        </div>

        <ProtocolToolbar
          onSave={handleSave}
          onLoad={handleLoad}
          onValidate={handleValidate}
          onSimulate={handleSimulate}
          validationStatus={validationStatus}
        />

        <div className="flex h-[calc(100vh-200px)]">
          <ComponentLibrary onDragStart={handleDragStart} />
          
          <ProtocolCanvas
            nodes={nodes}
            connections={connections}
            onNodeAdd={handleNodeAdd}
            onNodeSelect={handleNodeSelect}
            onNodeMove={handleNodeMove}
            onConnectionAdd={handleConnectionAdd}
            selectedNode={selectedNode}
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

export default ExperimentDesigner;