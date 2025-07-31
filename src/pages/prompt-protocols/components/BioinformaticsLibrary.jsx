import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BioinformaticsLibrary = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState('sequence-analysis');
  const [searchTerm, setSearchTerm] = useState('');

  const bioinformaticsCategories = [
    {
      id: 'sequence-analysis',
      name: 'Análisis de Secuencia',
      icon: 'Dna',
      components: [
        {
          id: 'blast-search',
          name: 'BLAST Search',
          icon: 'Search',
          description: 'Basic Local Alignment Search Tool',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics',
          category: 'sequence-analysis',
          sleepingSlaveType: 'blast-slave',
          parameters: {
            database: 'nr',
            e_value: 0.001,
            max_targets: 100,
            word_size: 6,
            matrix: 'BLOSUM62'
          }
        },
        {
          id: 'multiple-alignment',
          name: 'Alineamiento Múltiple',
          icon: 'AlignJustify',
          description: 'ClustalW/MUSCLE alignment',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics',
          category: 'sequence-analysis',
          sleepingSlaveType: 'alignment-slave',
          parameters: {
            algorithm: 'clustalw',
            gap_penalty: 10,
            extension_penalty: 0.2
          }
        },
        {
          id: 'phylogenetic-analysis',
          name: 'Análisis Filogenético',
          icon: 'GitBranch',
          description: 'Construcción de árboles filogenéticos',
          color: 'bg-blue-100 border-blue-300',
          type: 'bioinformatics',
          category: 'sequence-analysis',
          sleepingSlaveType: 'phylo-slave',
          parameters: {
            method: 'neighbor-joining',
            bootstrap: 1000,
            substitution_model: 'JTT'
          }
        }
      ]
    },
    {
      id: 'structure',
      name: 'Estructura Proteica',
      icon: 'Cube',
      components: [
        {
          id: 'pdb-search',
          name: 'PDB Structure Search',
          icon: 'Database',
          description: 'Búsqueda en Protein Data Bank',
          color: 'bg-green-100 border-green-300',
          type: 'bioinformatics',
          category: 'structure',
          sleepingSlaveType: 'pdb-slave',
          parameters: {
            resolution: '2.5',
            method: 'X-ray',
            organism: 'Homo sapiens'
          }
        },
        {
          id: 'alphafold-prediction',
          name: 'AlphaFold Prediction',
          icon: 'Brain',
          description: 'Predicción de estructura con AlphaFold',
          color: 'bg-green-100 border-green-300',
          type: 'bioinformatics',
          category: 'structure',
          sleepingSlaveType: 'alphafold-slave',
          parameters: {
            confidence_threshold: 70,
            model_version: 'v2.0'
          }
        },
        {
          id: 'molecular-docking',
          name: 'Acoplamiento Molecular',
          icon: 'Link',
          description: 'AutoDock/Vina docking simulation',
          color: 'bg-green-100 border-green-300',
          type: 'bioinformatics',
          category: 'structure',
          sleepingSlaveType: 'docking-slave',
          parameters: {
            exhaustiveness: 8,
            num_modes: 9,
            energy_range: 3
          }
        }
      ]
    },
    {
      id: 'annotation',
      name: 'Anotación Funcional',
      icon: 'FileText',
      components: [
        {
          id: 'uniprot-annotation',
          name: 'UniProt Annotation',
          icon: 'Book',
          description: 'Anotación funcional con UniProt',
          color: 'bg-purple-100 border-purple-300',
          type: 'bioinformatics',
          category: 'annotation',
          sleepingSlaveType: 'uniprot-slave',
          parameters: {
            organism: 'human',
            evidence_level: 'experimental',
            reviewed: true
          }
        },
        {
          id: 'go-enrichment',
          name: 'GO Enrichment',
          icon: 'Target',
          description: 'Gene Ontology enrichment analysis',
          color: 'bg-purple-100 border-purple-300',
          type: 'bioinformatics',
          category: 'annotation',
          sleepingSlaveType: 'go-slave',
          parameters: {
            p_value: 0.05,
            correction_method: 'bonferroni',
            ontology: 'biological_process'
          }
        },
        {
          id: 'domain-analysis',
          name: 'Análisis de Dominios',
          icon: 'Layers',
          description: 'InterPro/Pfam domain analysis',
          color: 'bg-purple-100 border-purple-300',
          type: 'bioinformatics',
          category: 'annotation',
          sleepingSlaveType: 'domain-slave',
          parameters: {
            database: 'pfam',
            e_value: 0.01,
            include_signal_peptide: true
          }
        }
      ]
    },
    {
      id: 'expression',
      name: 'Expresión Génica',
      icon: 'BarChart3',
      components: [
        {
          id: 'rnaseq-analysis',
          name: 'RNA-seq Analysis',
          icon: 'TrendingUp',
          description: 'Análisis de expresión diferencial',
          color: 'bg-orange-100 border-orange-300',
          type: 'bioinformatics',
          category: 'expression',
          sleepingSlaveType: 'rnaseq-slave',
          parameters: {
            fold_change_threshold: 2,
            p_value: 0.05,
            normalization: 'TPM'
          }
        },
        {
          id: 'microarray-analysis',
          name: 'Microarray Analysis',
          icon: 'Grid',
          description: 'Análisis de microarrays',
          color: 'bg-orange-100 border-orange-300',
          type: 'bioinformatics',
          category: 'expression',
          sleepingSlaveType: 'microarray-slave',
          parameters: {
            platform: 'agilent',
            background_correction: 'normexp',
            normalization: 'quantile'
          }
        }
      ]
    },
    {
      id: 'drug-discovery',
      name: 'Descubrimiento de Fármacos',
      icon: 'Pill',
      components: [
        {
          id: 'virtual-screening',
          name: 'Virtual Screening',
          icon: 'Filter',
          description: 'Cribado virtual de compuestos',
          color: 'bg-red-100 border-red-300',
          type: 'bioinformatics',
          category: 'drug-discovery',
          sleepingSlaveType: 'screening-slave',
          parameters: {
            library: 'drugbank',
            similarity_threshold: 0.7,
            pharmacophore_filter: true
          }
        },
        {
          id: 'admet-prediction',
          name: 'ADMET Prediction',
          icon: 'Activity',
          description: 'Predicción de propiedades ADMET',
          color: 'bg-red-100 border-red-300',
          type: 'bioinformatics',
          category: 'drug-discovery',
          sleepingSlaveType: 'admet-slave',
          parameters: {
            models: ['solubility', 'permeability', 'toxicity'],
            confidence_threshold: 0.8
          }
        }
      ]
    }
  ];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
    onDragStart(component);
  };

  const filteredComponents = bioinformaticsCategories
    .find(cat => cat.id === activeCategory)
    ?.components.filter(comp => 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="w-96 bg-surface border-r scientific-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b scientific-border">
        <h2 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Dna" size={20} className="mr-2" />
          Herramientas Bioinformáticas
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Sleeping Slaves para análisis in-silico
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b scientific-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar herramientas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border scientific-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b scientific-border overflow-x-auto">
        <div className="flex min-w-max">
          {bioinformaticsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 text-sm font-medium scientific-transition whitespace-nowrap
                ${activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            className={`
              ${component.color} border-2 border-dashed rounded-lg p-4 mb-4 cursor-grab
              hover:shadow-scientific scientific-transition active:cursor-grabbing
              hover:scale-[1.02] transform
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={component.icon} size={20} className="text-text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  {component.name}
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  {component.description}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-xs text-text-secondary">
                      {component.sleepingSlaveType}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {Object.keys(component.parameters).length} parámetros
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Footer */}
      <div className="p-4 border-t scientific-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Sleeping Slaves Activos</span>
          <span className="text-success font-medium">8/12</span>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Capacidad del Sistema</span>
            <span>67%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="h-1 bg-primary rounded-full scientific-transition"
              style={{ width: '67%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioinformaticsLibrary;