import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShareModal = ({ isOpen, onClose, visualizationData }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [permissions, setPermissions] = useState('view');
  const [includeData, setIncludeData] = useState(true);
  const [expirationDate, setExpirationDate] = useState('');

  const shareMethodOptions = [
    { value: 'link', label: 'Enlace Compartido' },
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'export', label: 'Exportar Archivo' },
    { value: 'embed', label: 'Código de Inserción' }
  ];

  const permissionOptions = [
    { value: 'view', label: 'Solo Visualización' },
    { value: 'comment', label: 'Visualización y Comentarios' },
    { value: 'edit', label: 'Edición Completa' }
  ];

  const teamMembers = [
    { id: 1, name: 'Dr. María García', email: 'maria.garcia@lab.com', role: 'Investigadora Principal' },
    { id: 2, name: 'Dr. Carlos Rodríguez', email: 'carlos.rodriguez@lab.com', role: 'Bioinformático' },
    { id: 3, name: 'Dra. Ana López', email: 'ana.lopez@lab.com', role: 'Analista de Datos' },
    { id: 4, name: 'Técnico Juan Pérez', email: 'juan.perez@lab.com', role: 'Técnico de Laboratorio' }
  ];

  const handleShare = () => {
    // Mock sharing logic
    console.log('Sharing visualization:', {
      method: shareMethod,
      recipients,
      message,
      permissions,
      includeData,
      expirationDate
    });
    
    // Show success message and close modal
    onClose();
  };

  const generateShareLink = () => {
    return `https://antares.lab.com/shared/visualization/${Date.now()}`;
  };

  const generateEmbedCode = () => {
    return `<iframe src="${generateShareLink()}" width="800" height="600" frameborder="0"></iframe>`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-scientific-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b scientific-border">
          <div className="flex items-center space-x-3">
            <Icon name="Share2" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Compartir Visualización</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share Method Selection */}
          <div>
            <Select
              label="Método de Compartir"
              options={shareMethodOptions}
              value={shareMethod}
              onChange={setShareMethod}
            />
          </div>

          {/* Share Link */}
          {shareMethod === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Enlace Compartido
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={generateShareLink()}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(generateShareLink())}
                    iconName="Copy"
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Permisos"
                  options={permissionOptions}
                  value={permissions}
                  onChange={setPermissions}
                />
                <Input
                  label="Fecha de Expiración"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>

              <Checkbox
                label="Incluir datos experimentales"
                checked={includeData}
                onChange={(e) => setIncludeData(e.target.checked)}
              />
            </div>
          )}

          {/* Email Sharing */}
          {shareMethod === 'email' && (
            <div className="space-y-4">
              <Input
                label="Destinatarios"
                type="email"
                placeholder="correo1@ejemplo.com, correo2@ejemplo.com"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                description="Separa múltiples correos con comas"
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Miembros del Equipo
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto border scientific-border rounded-lg p-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRecipients(prev => 
                              prev ? `${prev}, ${member.email}` : member.email
                            );
                          } else {
                            setRecipients(prev => 
                              prev.replace(new RegExp(`,?\\s*${member.email}`, 'g'), '')
                                .replace(/^,\s*/, '')
                            );
                          }
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{member.name}</p>
                        <p className="text-xs text-text-secondary">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  className="w-full p-3 border scientific-border rounded-lg resize-none"
                  rows={4}
                  placeholder="Agregar un mensaje personalizado..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Select
                label="Permisos"
                options={permissionOptions}
                value={permissions}
                onChange={setPermissions}
              />
            </div>
          )}

          {/* Export Options */}
          {shareMethod === 'export' && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Icon name="Download" size={48} className="text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary mb-4">
                  Exportar visualización como archivo
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" iconName="Image">
                    PNG/JPG
                  </Button>
                  <Button variant="outline" iconName="FileText">
                    PDF
                  </Button>
                  <Button variant="outline" iconName="Code">
                    SVG
                  </Button>
                  <Button variant="outline" iconName="Database">
                    CSV/JSON
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Embed Code */}
          {shareMethod === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Código de Inserción
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-3 border scientific-border rounded-lg font-mono text-sm resize-none"
                    rows={4}
                    value={generateEmbedCode()}
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => navigator.clipboard.writeText(generateEmbedCode())}
                    iconName="Copy"
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-text-primary mb-2">Vista Previa</h4>
                <div className="bg-white border scientific-border rounded p-4 text-center">
                  <Icon name="BarChart3" size={32} className="text-text-secondary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">Visualización Integrada</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Shares */}
          <div className="border-t scientific-border pt-6">
            <h4 className="font-medium text-text-primary mb-3">Compartidos Recientemente</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Link" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Análisis Biorreactor A-001</p>
                    <p className="text-xs text-text-secondary">Compartido hace 2 horas</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  Ver
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Resultados Proteicos</p>
                    <p className="text-xs text-text-secondary">Enviado a 3 colaboradores</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  Opciones
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t scientific-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} />
            <span>Los datos compartidos están protegidos por cifrado</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleShare} iconName="Share2" iconPosition="left">
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;