import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Experiment #A-2024-001 completed successfully', type: 'success', time: '2 min ago' },
    { id: 2, message: 'Device calibration required for Spectrometer-01', type: 'warning', time: '15 min ago' },
    { id: 3, message: 'Analysis queue processing 3 pending jobs', type: 'info', time: '1 hour ago' }
  ]);

  const navigationTabs = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: 'LayoutDashboard',
      description: 'Central command center'
    },
    { 
      path: '/experiment-designer', 
      label: 'Experimentos', 
      icon: 'FlaskConical',
      description: 'Experiment design and management',
      subPaths: ['/experiment-designer', '/device-management']
    },
    { 
      path: '/real-time-monitoring', 
      label: 'Monitoreo', 
      icon: 'Activity',
      description: 'Real-time system monitoring'
    },
    { 
      path: '/analysis-queue', 
      label: 'Análisis', 
      icon: 'BarChart3',
      description: 'Data analysis and visualization',
      subPaths: ['/analysis-queue', '/results-visualization']
    }
  ];

  const isActiveTab = (tab) => {
    if (tab.subPaths) {
      return tab.subPaths.some(path => location.pathname.startsWith(path));
    }
    return location.pathname.startsWith(tab.path);
  };

  const getActiveExperimentCount = () => 3; // Mock active experiments
  const getSystemHealth = () => 'healthy'; // Mock system status

  const handleNotificationClick = () => {
    // Handle notification center toggle
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b scientific-border h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-3 scientific-transition scientific-hover">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground">
                <path
                  fill="currentColor"
                  d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-text-primary">Antares</span>
          </Link>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          {navigationTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg scientific-transition
                ${isActiveTab(tab) 
                  ? 'bg-primary text-primary-foreground shadow-scientific' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              title={tab.description}
            >
              <Icon name={tab.icon} size={18} />
              <span className="font-medium">{tab.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section - Status & User */}
        <div className="flex items-center space-x-4">
          {/* Real-time Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <div className={`w-2 h-2 rounded-full scientific-pulse ${
                getSystemHealth() === 'healthy' ? 'bg-success' : 'bg-warning'
              }`} />
              <span className="text-sm font-medium text-text-secondary">
                {getActiveExperimentCount()} activos
              </span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {notifications.length}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="text-sm font-medium text-text-primary">Dr. García</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border scientific-border rounded-lg shadow-scientific-lg z-50">
                <div className="p-4 border-b scientific-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Dr. María García</p>
                      <p className="text-sm text-text-secondary">Investigadora Principal</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md scientific-transition">
                    <Icon name="Settings" size={16} />
                    <span className="text-sm">Configuración</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md scientific-transition">
                    <Icon name="HelpCircle" size={16} />
                    <span className="text-sm">Ayuda</span>
                  </button>
                  <hr className="my-2 scientific-border" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-destructive/10 text-destructive rounded-md scientific-transition"
                  >
                    <Icon name="LogOut" size={16} />
                    <span className="text-sm">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;