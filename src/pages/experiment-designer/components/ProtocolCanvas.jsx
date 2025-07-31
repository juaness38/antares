import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProtocolCanvas = ({ nodes, connections, onNodeAdd, onNodeSelect, onNodeMove, onConnectionAdd, selectedNode }) => {
  const canvasRef = useRef(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    try {
      const rawData = e.dataTransfer.getData('application/json');
      
      // Validate that we have data before trying to parse
      if (!rawData || rawData.trim() === '') {
        console.warn('No data received from drag operation');
        return;
      }
      
      const componentData = JSON.parse(rawData);
      
      // Validate that the parsed data has required properties
      if (!componentData || typeof componentData !== 'object') {
        console.warn('Invalid component data received:', componentData);
        return;
      }
      
      const newNode = {
        id: `node-${Date.now()}`,
        ...componentData,
        x: Math.max(0, x - 75), // Center the node
        y: Math.max(0, y - 40),
        width: 150,
        height: 80
      };
      
      onNodeAdd(newNode);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
      // Optionally show user-friendly error message
      console.warn('Failed to add component. Please try dragging the component again.');
    }
  };

  const handleNodeMouseDown = (e, node) => {
    e.stopPropagation();
    setDraggedNode(node);
    onNodeSelect(node);
  };

  const handleMouseMove = useCallback((e) => {
    if (draggedNode) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - draggedNode.width / 2;
      const y = e.clientY - rect.top - draggedNode.height / 2;
      onNodeMove(draggedNode.id, { x: Math.max(0, x), y: Math.max(0, y) });
    }
    
    if (isConnecting) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [draggedNode, isConnecting, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
    }
  }, [isConnecting]);

  React.useEffect(() => {
    if (draggedNode || isConnecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, isConnecting, handleMouseMove, handleMouseUp]);

  const handleConnectionStart = (e, nodeId) => {
    e.stopPropagation();
    setIsConnecting(true);
    setConnectionStart(nodeId);
  };

  const handleConnectionEnd = (e, nodeId) => {
    e.stopPropagation();
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      onConnectionAdd(connectionStart, nodeId);
    }
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'preparation': return 'bg-blue-100 border-blue-300';
      case 'analysis': return 'bg-green-100 border-green-300';
      case 'decision': return 'bg-yellow-100 border-yellow-300';
      case 'ai': return 'bg-purple-100 border-purple-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const renderConnection = (connection) => {
    const startNode = nodes.find(n => n.id === connection.from);
    const endNode = nodes.find(n => n.id === connection.to);
    
    if (!startNode || !endNode) return null;

    const startX = startNode.x + startNode.width;
    const startY = startNode.y + startNode.height / 2;
    const endX = endNode.x;
    const endY = endNode.y + endNode.height / 2;

    return (
      <line
        key={`${connection.from}-${connection.to}`}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#64748B"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    );
  };

  return (
    <div className="flex-1 bg-muted relative overflow-hidden">
      {/* Canvas Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => onNodeSelect(null)}
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#64748B"
              />
            </marker>
          </defs>
          
          {/* Render existing connections */}
          {connections.map(renderConnection)}
          
          {/* Render temporary connection line */}
          {isConnecting && connectionStart && (
            <line
              x1={nodes.find(n => n.id === connectionStart)?.x + 150}
              y1={nodes.find(n => n.id === connectionStart)?.y + 40}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>

        {/* Render nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`
              absolute border-2 rounded-lg p-3 cursor-move scientific-transition
              ${getNodeColor(node.type)}
              ${selectedNode?.id === node.id ? 'ring-2 ring-primary shadow-scientific-lg' : 'shadow-scientific'}
              hover:shadow-scientific-lg
            `}
            style={{
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height
            }}
            onMouseDown={(e) => handleNodeMouseDown(e, node)}
          >
            {/* Node Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={node.icon} size={16} className="text-text-primary" />
                <span className="text-xs font-medium text-text-primary truncate">
                  {node.name}
                </span>
              </div>
              
              {/* Connection points */}
              <div className="flex space-x-1">
                <button
                  className="w-3 h-3 bg-primary rounded-full hover:bg-primary/80 scientific-transition"
                  onMouseDown={(e) => handleConnectionStart(e, node.id)}
                  onMouseUp={(e) => handleConnectionEnd(e, node.id)}
                  title="Conectar"
                />
              </div>
            </div>

            {/* Node Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {node.type === 'ai' ? 'IA Ready' : 'Configurado'}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs text-success">Activo</span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MousePointer2" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Arrastra componentes aquí
              </h3>
              <p className="text-text-secondary max-w-md">
                Selecciona componentes de la biblioteca y arrástralos al canvas para construir tu protocolo experimental
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button className="p-2 bg-surface border scientific-border rounded-lg shadow-scientific hover:shadow-scientific-lg scientific-transition">
          <Icon name="ZoomIn" size={16} />
        </button>
        <button className="p-2 bg-surface border scientific-border rounded-lg shadow-scientific hover:shadow-scientific-lg scientific-transition">
          <Icon name="ZoomOut" size={16} />
        </button>
        <button className="p-2 bg-surface border scientific-border rounded-lg shadow-scientific hover:shadow-scientific-lg scientific-transition">
          <Icon name="Maximize" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProtocolCanvas;