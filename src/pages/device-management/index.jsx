import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import DeviceRegistrationWizard from './components/DeviceRegistrationWizard';
import DeviceTable from './components/DeviceTable';
import DeviceFilters from './components/DeviceFilters';
import DeviceDetailsPanel from './components/DeviceDetailsPanel';
import BulkActionsDropdown from './components/BulkActionsDropdown';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isRegistrationWizardOpen, setIsRegistrationWizardOpen] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    location: ''
  });

  // Mock devices data
  const mockDevices = [
    {
      id: 1,
      name: "Biorreactor-Lab-A-01",
      type: "bioreactor",
      model: "BioReactor Pro 3000",
      serialNumber: "BR-2024-001",
      location: "Laboratorio A",
      status: "connected",
      lastCommunication: new Date(Date.now() - 120000).toISOString(),
      ipAddress: "192.168.1.101",
      port: "80",
      protocol: "HTTP",
      signalStrength: 85,
      assignedExperiments: ["EXP-2024-001", "EXP-2024-003"],
      registrationDate: "2024-01-15T10:30:00Z",
      description: "Biorreactor principal para cultivos bacterianos",
      calibrationDate: "2024-07-10",
      maintenanceSchedule: "monthly"
    },
    {
      id: 2,
      name: "ESP32-Sensor-Hub-02",
      type: "esp32",
      model: "ESP32-WROOM-32",
      serialNumber: "ESP-2024-002",
      location: "Laboratorio B",
      status: "connected",
      lastCommunication: new Date(Date.now() - 30000).toISOString(),
      ipAddress: "192.168.1.102",
      port: "80",
      protocol: "MQTT",
      signalStrength: 92,
      assignedExperiments: ["EXP-2024-002"],
      registrationDate: "2024-02-20T14:15:00Z",
      description: "Hub de sensores para monitoreo ambiental",
      calibrationDate: "2024-07-12",
      maintenanceSchedule: "weekly"
    },
    {
      id: 3,
      name: "pH-Meter-03",
      type: "ph_meter",
      model: "pHMeter Digital Pro",
      serialNumber: "PH-2024-003",
      location: "Sala de Cultivo",
      status: "warning",
      lastCommunication: new Date(Date.now() - 900000).toISOString(),
      ipAddress: "192.168.1.103",
      port: "443",
      protocol: "HTTPS",
      signalStrength: 67,
      assignedExperiments: [],
      registrationDate: "2024-03-10T09:45:00Z",
      description: "Medidor de pH de alta precisión",
      calibrationDate: "2024-06-15",
      maintenanceSchedule: "monthly"
    },
    {
      id: 4,
      name: "Temp-Sensor-Array-04",
      type: "temperature_sensor",
      model: "TempSense Multi-Point",
      serialNumber: "TS-2024-004",
      location: "Laboratorio A",
      status: "connected",
      lastCommunication: new Date(Date.now() - 60000).toISOString(),
      ipAddress: "192.168.1.104",
      port: "80",
      protocol: "HTTP",
      signalStrength: 78,
      assignedExperiments: ["EXP-2024-001"],
      registrationDate: "2024-04-05T16:20:00Z",
      description: "Array de sensores de temperatura distribuidos",
      calibrationDate: "2024-07-08",
      maintenanceSchedule: "quarterly"
    },
    {
      id: 5,
      name: "Spectrometer-05",
      type: "spectrometer",
      model: "SpectraMax Pro",
      serialNumber: "SM-2024-005",
      location: "Área de Análisis",
      status: "disconnected",
      lastCommunication: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: "192.168.1.105",
      port: "8080",
      protocol: "WebSocket",
      signalStrength: 0,
      assignedExperiments: [],
      registrationDate: "2024-05-12T11:30:00Z",
      description: "Espectrómetro para análisis molecular",
      calibrationDate: "2024-06-20",
      maintenanceSchedule: "monthly"
    },
    {
      id: 6,
      name: "Pressure-Monitor-06",
      type: "pressure_sensor",
      model: "PressureGuard 2000",
      serialNumber: "PM-2024-006",
      location: "Laboratorio C",
      status: "connected",
      lastCommunication: new Date(Date.now() - 180000).toISOString(),
      ipAddress: "192.168.1.106",
      port: "80",
      protocol: "HTTP",
      signalStrength: 88,
      assignedExperiments: ["EXP-2024-004"],
      registrationDate: "2024-06-01T13:45:00Z",
      description: "Monitor de presión para sistemas cerrados",
      calibrationDate: "2024-07-05",
      maintenanceSchedule: "monthly"
    }
  ];

  useEffect(() => {
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  useEffect(() => {
    let filtered = devices;

    if (filters.search) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        device.model.toLowerCase().includes(filters.search.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(device => device.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter(device => device.status === filters.status);
    }

    if (filters.location) {
      filtered = filtered.filter(device => device.location === filters.location);
    }

    setFilteredDevices(filtered);
  }, [devices, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      status: '',
      location: ''
    });
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setIsDetailsPanelOpen(true);
  };

  const handleDeviceAction = (action, device) => {
    console.log(`Performing ${action} on device:`, device);
    // Implement device actions here
  };

  const handleBulkAction = (action, devices) => {
    console.log(`Performing bulk ${action} on devices:`, devices);
    // Implement bulk actions here
  };

  const handleAddDevice = (newDevice) => {
    setDevices(prev => [...prev, newDevice]);
  };

  const getDeviceCounts = () => {
    return {
      total: devices.length,
      connected: devices.filter(d => d.status === 'connected').length,
      disconnected: devices.filter(d => d.status === 'disconnected').length,
      warning: devices.filter(d => d.status === 'warning').length
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 pt-16 ${isDetailsPanelOpen ? 'mr-96' : ''} scientific-transition-layout`}>
          <div className="p-6">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Gestión de Dispositivos</h1>
                <p className="text-text-secondary mt-1">
                  Administra y monitorea los dispositivos IoT del laboratorio
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <BulkActionsDropdown
                  selectedDevices={selectedDevices}
                  onBulkAction={handleBulkAction}
                />
                
                <Button
                  onClick={() => setIsRegistrationWizardOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Agregar Dispositivo
                </Button>
              </div>
            </div>

            {/* Filters */}
            <DeviceFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              deviceCounts={getDeviceCounts()}
            />

            {/* Device Table */}
            <DeviceTable
              devices={filteredDevices}
              onDeviceSelect={handleDeviceSelect}
              selectedDevice={selectedDevice}
              onDeviceAction={handleDeviceAction}
            />
          </div>
        </div>

        {/* Device Details Panel */}
        {isDetailsPanelOpen && (
          <div className="fixed right-0 top-16 bottom-0 z-30">
            <DeviceDetailsPanel
              device={selectedDevice}
              onClose={() => setIsDetailsPanelOpen(false)}
              onDeviceAction={handleDeviceAction}
            />
          </div>
        )}
      </div>

      {/* Device Registration Wizard */}
      <DeviceRegistrationWizard
        isOpen={isRegistrationWizardOpen}
        onClose={() => setIsRegistrationWizardOpen(false)}
        onSubmit={handleAddDevice}
      />
    </div>
  );
};

export default DeviceManagement;