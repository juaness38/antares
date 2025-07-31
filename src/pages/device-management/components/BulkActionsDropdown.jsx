import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsDropdown = ({ selectedDevices, onBulkAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const bulkActions = [
    { 
      id: 'calibrate', 
      label: 'Calibrar Seleccionados', 
      icon: 'Target',
      description: 'Iniciar calibración en dispositivos seleccionados'
    },
    { 
      id: 'restart', 
      label: 'Reiniciar Seleccionados', 
      icon: 'RotateCcw',
      description: 'Reiniciar dispositivos seleccionados'
    },
    { 
      id: 'update_firmware', 
      label: 'Actualizar Firmware', 
      icon: 'Download',
      description: 'Actualizar firmware en dispositivos compatibles'
    },
    { 
      id: 'export_config', 
      label: 'Exportar Configuración', 
      icon: 'FileDown',
      description: 'Exportar configuración de dispositivos'
    },
    { 
      id: 'assign_experiment', 
      label: 'Asignar a Experimento', 
      icon: 'FlaskConical',
      description: 'Asignar dispositivos a un experimento'
    },
    { 
      id: 'schedule_maintenance', 
      label: 'Programar Mantenimiento', 
      icon: 'Calendar',
      description: 'Programar mantenimiento para dispositivos'
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId, selectedDevices);
    setIsOpen(false);
  };

  if (selectedDevices.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="ChevronDown"
        iconPosition="right"
      >
        Acciones ({selectedDevices.length})
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-popover border scientific-border rounded-lg shadow-scientific-lg z-20">
            <div className="p-3 border-b scientific-border">
              <div className="flex items-center space-x-2">
                <Icon name="CheckSquare" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {selectedDevices.length} dispositivo{selectedDevices.length > 1 ? 's' : ''} seleccionado{selectedDevices.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="py-2">
              {bulkActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className="w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-muted scientific-transition"
                >
                  <Icon name={action.icon} size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{action.label}</div>
                    <div className="text-xs text-text-secondary mt-1">{action.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t scientific-border">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkActionsDropdown;