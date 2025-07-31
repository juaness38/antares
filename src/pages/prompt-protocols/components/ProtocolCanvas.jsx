import React, { useRef, useCallback, useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProtocolCanvas = ({ 
  nodes, 
  connections, 
  onNodeAdd, 
  onNodeSelect, 
  onNodeMove, 
  onConnectionAdd, 
  selectedNode,
  protocolStatus 
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connectionMode, setConnectionMode] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      onNodeAdd({ ...componentData, x, y });
    } catch (error) {
      console.error('Error parsing dropped component:', error);
    }
  }, [onNodeAdd]);

  const handleMouseDown = useCallback((e, node) => {
    if (connectionMode) {
      setConnectionStart(node);
      return;
    }
    
    const rect = canvasRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    });
    onNodeSelect(node);
  }, [connectionMode, onNodeSelect]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    if (isDragging && selectedNode) {
      onNodeMove(selectedNode.id, {
        x: x - dragOffset.x,
        y: y - dragOffset.y
      });
    }
  }, [isDragging, selectedNode, dragOffset, onNodeMove]);

  const handleMouseUp = useCallback((e, node) => {
    if (connectionMode && connectionStart && node && connectionStart.id !== node.id) {
      onConnectionAdd(connectionStart.id, node.id);
      setConnectionStart(null);
      setConnectionMode(false);
    }
    setIsDragging(false);
  }, [connectionMode, connectionStart, onConnectionAdd]);

  const handleCanvasClick = useCallback((e) => {
    if (e.target === canvasRef.current) {
      onNodeSelect(null);
      setConnectionMode(false);
      setConnectionStart(null);
    }
  }, [onNodeSelect]);

  const getNodeStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'border-warning bg-warning/10';
      case 'completed':
        return 'border-success bg-success/10';
      case 'failed':
        return 'border-destructive bg-destructive/10';
      default:
        return 'border-border bg-card';
    }
  };

  const getNodeCategoryColor = (category) => {
    switch (category) {
      case 'sequence-analysis':
        return 'bg-blue-500';
      case 'structure':
        return 'bg-green-500';
      case 'annotation':
        return 'bg-purple-500';
      case 'expression':
        return 'bg-orange-500';
      case 'drug-discovery':
        return 'bg-red-500';
      case 'temperature':
        return 'bg-red-400';
      case 'ph':
        return 'bg-blue-400';
      case 'atmosphere':
        return 'bg-green-400';
      case 'mechanical':
        return 'bg-purple-400';
      case 'monitoring':
        return 'bg-yellow-400';
      case 'decision':
        return 'bg-purple-600';
      case 'optimization':
        return 'bg-green-600';
      case 'prediction':
        return 'bg-blue-600';
      case 'adaptation':
        return 'bg-orange-600';
      case 'learning':
        return 'bg-pink-600';
      default:
        return 'bg-secondary';
    }
  };

  const renderConnection = (connection) => {
    const fromNode = nodes.find(n => n.id === connection.from);
    const toNode = nodes.find(n => n.id === connection.to);
    
    if (!fromNode || !toNode) return null;
    
    const fromX = fromNode.x + fromNode.width;
    const fromY = fromNode.y + fromNode.height / 2;
    const toX = toNode.x;
    const toY = toNode.y + toNode.height / 2;
    
    const midX = (fromX + toX) / 2;
    
    return (
      <g key={connection.id}>
        <path
          d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
          stroke={connection.status === 'active' ? '#3b82f6' : '#6b7280'}
          strokeWidth="2"
          fill="none"
          className={connection.status === 'active' ? 'animate-pulse' : ''}
        />
        <circle
          cx={toX}
          cy={toY}
          r="4"
          fill={connection.status === 'active' ? '#3b82f6' : '#6b7280'}
        />
      </g>
    );
  };

  const renderNode = (node) => {
    const isSelected = selectedNode?.id === node.id;
    const statusColor = getNodeStatusColor(node.status);
    const categoryColor = getNodeCategoryColor(node.category);
    
    return (
      <div
        key={node.id}
        className={`
          absolute rounded-lg shadow-lg cursor-move scientific-transition
          ${statusColor}
          ${isSelected ? 'ring-2 ring-primary' : ''}
          ${protocolStatus === 'running' && node.status === 'running' ? 'animate-pulse' : ''}
        `}
        style={{
          left: node.x,
          top: node.y,
          width: node.width || 200,
          height: node.height || 120,
          zIndex: isSelected ? 10 : 1
        }}
        onMouseDown={(e) => handleMouseDown(e, node)}
        onMouseUp={(e) => handleMouseUp(e, node)}
      >
        {/* Header */}
        <div className={`p-3 rounded-t-lg ${categoryColor} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name={node.icon} size={16} />
              <span className="text-sm font-medium truncate">{node.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              {node.status === 'running' && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
              {node.status === 'completed' && (
                <Icon name="Check" size={12} className="text-white" />
              )}
              {node.status === 'failed' && (
                <Icon name="X" size={12} className="text-white" />
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 flex-1">
          <div className="text-xs text-text-secondary mb-2">
            {node.type === 'bioinformatics' && node.sleepingSlaveType}
            {node.type === 'microenvironment' && 'hardware-controller'}
            {node.type === 'ai-orchestration' && 'ai-module'}
          </div>
          
          {/* Progress Bar */}
          {node.status === 'running' && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-text-secondary">Progreso</span>
                <span className="text-primary font-medium">{node.progress || 0}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="h-1 bg-primary rounded-full scientific-transition"
                  style={{ width: `${node.progress || 0}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Estado:</span>
            <span className={`font-medium ${
              node.status === 'running' ? 'text-warning' :
              node.status === 'completed' ? 'text-success' :
              node.status === 'failed'? 'text-destructive' : 'text-text-secondary'
            }`}>
              {node.status === 'running' ? 'Ejecutando' :
               node.status === 'completed' ? 'Completado' :
               node.status === 'failed'? 'Error' : 'Inactivo'}
            </span>
          </div>
        </div>
        
        {/* Connection Points */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white" />
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white" />
      </div>
    );
  };

  return (
    <div className="flex-1 relative bg-muted/20 overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <button
          onClick={() => setConnectionMode(!connectionMode)}
          className={`
            px-3 py-2 rounded-lg scientific-transition text-sm font-medium
            ${connectionMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-white text-text-primary border scientific-border'
            }
          `}
        >
          <Icon name="Link" size={16} className="mr-2" />
          {connectionMode ? 'Cancelar Conexión' : 'Conectar Nodos'}
        </button>
        
        <div className="px-3 py-2 bg-white rounded-lg border scientific-border">
          <span className="text-sm text-text-secondary">
            Nodos: {nodes.length} | Conexiones: {connections.length}
          </span>
        </div>
      </div>
      
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onClick={handleCanvasClick}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(renderConnection)}
          
          {/* Temporary connection line */}
          {connectionMode && connectionStart && (
            <line
              x1={connectionStart.x + connectionStart.width}
              y1={connectionStart.y + connectionStart.height / 2}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Nodes */}
        {nodes.map(renderNode)}
        
        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="GitBranch" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Canvas de Protocolo Vacío
              </h3>
              <p className="text-text-secondary">
                Arrastra componentes desde la biblioteca para comenzar a diseñar tu protocolo
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocolCanvas;