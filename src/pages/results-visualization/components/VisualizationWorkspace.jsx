import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VisualizationWorkspace = ({ 
  currentView, 
  selectedExperiments, 
  isFullscreen,
  onAnnotationAdd 
}) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  // Mock data for different visualization types
  const mockTimeSeriesData = [
    { time: '00:00', pH: 7.2, temperatura: 37.5, oxigeno: 85, biomasa: 2.1 },
    { time: '02:00', pH: 7.1, temperatura: 37.8, oxigeno: 82, biomasa: 2.3 },
    { time: '04:00', pH: 7.0, temperatura: 38.1, oxigeno: 79, biomasa: 2.6 },
    { time: '06:00', pH: 6.9, temperatura: 38.3, oxigeno: 76, biomasa: 2.9 },
    { time: '08:00', pH: 6.8, temperatura: 38.5, oxigeno: 73, biomasa: 3.2 },
    { time: '10:00', pH: 6.7, temperatura: 38.7, oxigeno: 70, biomasa: 3.6 },
    { time: '12:00', pH: 6.6, temperatura: 38.9, oxigeno: 67, biomasa: 4.1 },
    { time: '14:00', pH: 6.5, temperatura: 39.1, oxigeno: 64, biomasa: 4.7 },
    { time: '16:00', pH: 6.4, temperatura: 39.3, oxigeno: 61, biomasa: 5.3 },
    { time: '18:00', pH: 6.3, temperatura: 39.5, oxigeno: 58, biomasa: 6.0 },
    { time: '20:00', pH: 6.2, temperatura: 39.7, oxigeno: 55, biomasa: 6.8 },
    { time: '22:00', pH: 6.1, temperatura: 39.9, oxigeno: 52, biomasa: 7.7 }
  ];

  const mockScatterData = [
    { x: 37.5, y: 2.1, z: 7.2, name: 'Punto 1' },
    { x: 37.8, y: 2.3, z: 7.1, name: 'Punto 2' },
    { x: 38.1, y: 2.6, z: 7.0, name: 'Punto 3' },
    { x: 38.3, y: 2.9, z: 6.9, name: 'Punto 4' },
    { x: 38.5, y: 3.2, z: 6.8, name: 'Punto 5' },
    { x: 38.7, y: 3.6, z: 6.7, name: 'Punto 6' },
    { x: 38.9, y: 4.1, z: 6.6, name: 'Punto 7' },
    { x: 39.1, y: 4.7, z: 6.5, name: 'Punto 8' },
    { x: 39.3, y: 5.3, z: 6.4, name: 'Punto 9' },
    { x: 39.5, y: 6.0, z: 6.3, name: 'Punto 10' }
  ];

  const mockBarData = [
    { name: 'Exp-001', biomasa: 7.7, proteina: 4.2, metabolitos: 3.8 },
    { name: 'Exp-002', biomasa: 6.9, proteina: 3.9, metabolitos: 4.1 },
    { name: 'Exp-003', biomasa: 8.1, proteina: 4.5, metabolitos: 3.6 },
    { name: 'Exp-004', biomasa: 7.3, proteina: 4.0, metabolitos: 3.9 },
    { name: 'Exp-005', biomasa: 7.8, proteina: 4.3, metabolitos: 4.0 }
  ];

  const mockHeatmapData = [
    ['pH', 'Temp', 'O2', 'Biomasa'],
    [1.0, 0.87, -0.65, 0.92],
    [0.87, 1.0, -0.72, 0.89],
    [-0.65, -0.72, 1.0, -0.78],
    [0.92, 0.89, -0.78, 1.0]
  ];

  const mockMolecularData = {
    structure: "Proteína de ejemplo",
    sequence: "MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG",
    properties: {
      weight: "7.2 kDa",
      isoelectric: "pH 8.4",
      hydrophobicity: "0.32",
      stability: "Estable"
    }
  };

  const handleDataPointClick = (data) => {
    setSelectedDataPoint(data);
    if (onAnnotationAdd) {
      onAnnotationAdd(data);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockTimeSeriesData} onClick={handleDataPointClick}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="time" 
          stroke="#64748B"
          fontSize={12}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="pH" 
          stroke="#2563EB" 
          strokeWidth={2}
          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="temperatura" 
          stroke="#DC2626" 
          strokeWidth={2}
          dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="biomasa" 
          stroke="#059669" 
          strokeWidth={2}
          dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderScatterPlot = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={mockScatterData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Temperatura (°C)"
          stroke="#64748B"
          fontSize={12}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Biomasa (g/L)"
          stroke="#64748B"
          fontSize={12}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <Scatter 
          name="Datos Experimentales" 
          dataKey="y" 
          fill="#2563EB"
          onClick={handleDataPointClick}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockBarData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
          stroke="#64748B"
          fontSize={12}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Bar dataKey="biomasa" fill="#2563EB" name="Biomasa (g/L)" />
        <Bar dataKey="proteina" fill="#DC2626" name="Proteína (g/L)" />
        <Bar dataKey="metabolitos" fill="#059669" name="Metabolitos (g/L)" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderHeatmap = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-scientific">
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
          Matriz de Correlación
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {mockHeatmapData.map((row, i) => 
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  w-16 h-16 flex items-center justify-center text-xs font-medium rounded
                  ${i === 0 || j === 0 
                    ? 'bg-muted text-text-primary' 
                    : `bg-primary text-white`
                  }
                `}
                style={{
                  opacity: i === 0 || j === 0 ? 1 : Math.abs(cell)
                }}
              >
                {i === 0 || j === 0 ? cell : cell.toFixed(2)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderMolecular3D = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="w-64 h-64 bg-white rounded-lg shadow-scientific mb-6 flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Atom" size={64} className="text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3D</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-scientific max-w-md">
          <h3 className="font-semibold text-text-primary mb-3">{mockMolecularData.structure}</h3>
          <div className="text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Peso Molecular:</span>
              <span className="font-medium">{mockMolecularData.properties.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Punto Isoeléctrico:</span>
              <span className="font-medium">{mockMolecularData.properties.isoelectric}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Hidrofobicidad:</span>
              <span className="font-medium">{mockMolecularData.properties.hydrophobicity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Estabilidad:</span>
              <span className="font-medium text-success">{mockMolecularData.properties.stability}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTable = () => (
    <div className="w-full h-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border scientific-border p-3 text-left font-semibold">Tiempo</th>
            <th className="border scientific-border p-3 text-left font-semibold">pH</th>
            <th className="border scientific-border p-3 text-left font-semibold">Temperatura (°C)</th>
            <th className="border scientific-border p-3 text-left font-semibold">Oxígeno (%)</th>
            <th className="border scientific-border p-3 text-left font-semibold">Biomasa (g/L)</th>
          </tr>
        </thead>
        <tbody>
          {mockTimeSeriesData.map((row, index) => (
            <tr 
              key={index} 
              className="hover:bg-muted/50 scientific-transition cursor-pointer"
              onClick={() => handleDataPointClick(row)}
            >
              <td className="border scientific-border p-3">{row.time}</td>
              <td className="border scientific-border p-3 font-mono">{row.pH}</td>
              <td className="border scientific-border p-3 font-mono">{row.temperatura}</td>
              <td className="border scientific-border p-3 font-mono">{row.oxigeno}</td>
              <td className="border scientific-border p-3 font-mono">{row.biomasa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderVisualization = () => {
    switch (currentView) {
      case 'line-chart':
        return renderLineChart();
      case 'scatter-plot':
        return renderScatterPlot();
      case 'bar-chart':
        return renderBarChart();
      case 'heatmap':
        return renderHeatmap();
      case 'molecular-3d':
        return renderMolecular3D();
      case 'data-table':
        return renderDataTable();
      default:
        return renderLineChart();
    }
  };

  return (
    <div className="flex-1 bg-background relative">
      {/* Visualization Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-surface border scientific-border rounded-lg p-2 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            title="Alejar"
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          
          <span className="text-sm font-mono text-text-secondary px-2">
            {Math.round(zoomLevel * 100)}%
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            title="Acercar"
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleResetView}
            title="Restablecer vista"
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div 
        className="w-full h-full p-6"
        style={{
          transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`
        }}
      >
        {selectedExperiments.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart3" size={64} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Selecciona Experimentos para Visualizar
              </h3>
              <p className="text-text-secondary">
                Elige uno o más experimentos del panel izquierdo para comenzar el análisis
              </p>
            </div>
          </div>
        ) : (
          renderVisualization()
        )}
      </div>

      {/* Selected Data Point Info */}
      {selectedDataPoint && (
        <div className="absolute bottom-4 left-4 bg-surface border scientific-border rounded-lg p-4 shadow-scientific-lg max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-text-primary">Punto Seleccionado</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDataPoint(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(selectedDataPoint).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-text-secondary capitalize">{key}:</span>
                <span className="font-mono text-text-primary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationWorkspace;