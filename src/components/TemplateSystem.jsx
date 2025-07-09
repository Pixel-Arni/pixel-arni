import React, { useState } from 'react'

// Template-System
export const TemplateLibrary = ({ onApplyTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('business')
  const [searchTerm, setSearchTerm] = useState('')

  const templateCategories = {
    business: {
      name: 'Business',
      icon: '💼',
      templates: [
        {
          id: 'business-hero',
          name: 'Business Hero',
          description: 'Professionelle Unternehmensseite',
          preview: '/api/placeholder/300/200',
          elements: [
            {
              id: 'hero-1',
              type: 'hero',
              content: {
                title: 'Willkommen bei unserem Unternehmen',
                subtitle: 'Innovative Lösungen für Ihren Erfolg',
                description: 'Wir bieten erstklassige Dienstleistungen und Produkte',
                buttonText: 'Mehr erfahren'
              },
              styles: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                padding: '80px 40px',
                textAlign: 'center',
                minHeight: '500px'
              }
            },
            {
              id: 'features-1',
              type: 'features',
              content: {
                title: 'Unsere Leistungen',
                features: [
                  { icon: '🚀', title: 'Innovation', description: 'Modernste Technologien' },
                  { icon: '🎯', title: 'Präzision', description: 'Exakte Lösungen' },
                  { icon: '🔧', title: 'Service', description: '24/7 Support' }
                ]
              },
              styles: {
                padding: '60px 40px',
                backgroundColor: '#f8fafc'
              }
            }
          ]
        },
        {
          id: 'corporate-clean',
          name: 'Corporate Clean',
          description: 'Sauberes Corporate Design',
          preview: '/api/placeholder/300/200',
          elements: [
            {
              id: 'header-1',
              type: 'heading',
              content: 'Ihr Unternehmen im Mittelpunkt',
              styles: {
                fontSize: '48px',
                fontWeight: '700',
                color: '#1f2937',
                textAlign: 'center',
                padding: '40px 20px'
              }
            },
            {
              id: 'text-1',
              type: 'text',
              content: 'Wir verstehen die Herausforderungen moderner Unternehmen und bieten maßgeschneiderte Lösungen.',
              styles: {
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#4b5563',
                textAlign: 'center',
                padding: '0 20px 40px'
              }
            }
          ]
        }
      ]
    },
    ecommerce: {
      name: 'E-Commerce',
      icon: '🛒',
      templates: [
        {
          id: 'product-showcase',
          name: 'Product Showcase',
          description: 'Produktpräsentation',
          preview: '/api/placeholder/300/200',
          elements: [
            {
              id: 'hero-product',
              type: 'hero',
              content: {
                title: 'Entdecken Sie unser Sortiment',
                subtitle: 'Qualität, die überzeugt',
                description: 'Hochwertige Produkte zu fairen Preisen',
                buttonText: 'Jetzt kaufen'
              },
              styles: {
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#ffffff',
                padding: '80px 40px',
                textAlign: 'center'
              }
            },
            {
              id: 'pricing-1',
              type: 'pricing',
              content: {
                title: 'Unsere Preise',
                plans: [
                  { name: 'Starter', price: '29.99', features: ['Grundfunktionen', 'E-Mail Support'] },
                  { name: 'Professional', price: '59.99', features: ['Alle Funktionen', 'Prioritäts-Support', 'Analytics'] },
                  { name: 'Enterprise', price: '99.99', features: ['Unlimited', 'Dedicated Support', 'Custom Features'] }
                ]
              },
              styles: {
                padding: '60px 40px',
                backgroundColor: '#ffffff'
              }
            }
          ]
        }
      ]
    },
    portfolio: {
      name: 'Portfolio',
      icon: '🎨',
      templates: [
        {
          id: 'creative-portfolio',
          name: 'Creative Portfolio',
          description: 'Kreatives Portfolio',
          preview: '/api/placeholder/300/200',
          elements: [
            {
              id: 'hero-portfolio',
              type: 'hero',
              content: {
                title: 'Kreative Lösungen',
                subtitle: 'Portfolio & Werke',
                description: 'Einblick in meine kreativen Projekte',
                buttonText: 'Portfolio ansehen'
              },
              styles: {
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: '#ffffff',
                padding: '80px 40px',
                textAlign: 'center'
              }
            },
            {
              id: 'gallery-1',
              type: 'gallery',
              content: {
                title: 'Meine Arbeiten',
                images: [
                  'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Projekt+1',
                  'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Projekt+2',
                  'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Projekt+3'
                ]
              },
              styles: {
                padding: '60px 40px',
                backgroundColor: '#f8fafc'
              }
            }
          ]
        }
      ]
    },
    restaurant: {
      name: 'Restaurant',
      icon: '🍽️',
      templates: [
        {
          id: 'restaurant-hero',
          name: 'Restaurant Hero',
          description: 'Elegante Restaurant-Seite',
          preview: '/api/placeholder/300/200',
          elements: [
            {
              id: 'hero-restaurant',
              type: 'hero',
              content: {
                title: 'Kulinarische Erlebnisse',
                subtitle: 'Restaurant Gourmet',
                description: 'Genießen Sie unsere exquisiten Gerichte',
                buttonText: 'Tisch reservieren'
              },
              styles: {
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: '#ffffff',
                padding: '80px 40px',
                textAlign: 'center'
              }
            },
            {
              id: 'features-restaurant',
              type: 'features',
              content: {
                title: 'Unsere Spezialitäten',
                features: [
                  { icon: '🍜', title: 'Frische Zutaten', description: 'Täglich frisch vom Markt' },
                  { icon: '👨‍🍳', title: 'Erfahrene Köche', description: 'Meisterköche mit Leidenschaft' },
                  { icon: '🌟', title: 'Exzellenter Service', description: 'Aufmerksamer Service' }
                ]
              },
              styles: {
                padding: '60px 40px',
                backgroundColor: '#fffbf0'
              }
            }
          ]
        }
      ]
    }
  }

  const filteredTemplates = searchTerm 
    ? Object.values(templateCategories).flatMap(cat => cat.templates).filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : templateCategories[activeCategory]?.templates || []

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Template-Bibliothek</h3>
        <p className="text-sm text-gray-600">Wählen Sie ein professionelles Template als Ausgangspunkt</p>
      </div>

      {/* Suche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Templates suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Kategorien */}
      {!searchTerm && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(templateCategories).map(([key, category]) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === key 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(key)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Templates */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md">
            <div className="relative">
              <img 
                src={template.preview} 
                alt={template.name}
                className="object-cover w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-4">
              <h4 className="mb-1 font-semibold text-gray-900">{template.name}</h4>
              <p className="mb-3 text-sm text-gray-600">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {template.elements.length} Elemente
                </div>
                <button
                  onClick={() => onApplyTemplate(template)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                >
                  Verwenden
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          <div className="mb-4 text-4xl">🔍</div>
          <p>Keine Templates gefunden</p>
          <p className="mt-2 text-sm">Versuchen Sie andere Suchbegriffe</p>
        </div>
      )}
    </div>
  )
}

// Erweiterte Vorschau-Komponente
export const TemplatePreview = ({ template, onClose, onApply }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        
        <div className="flex">
          <div className="flex-1">
            <div className="p-6 overflow-auto bg-gray-50 h-96">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h4 className="mb-4 font-medium text-gray-900">Vorschau</h4>
                <div className="space-y-4">
                  {template.elements.map((element, index) => (
                    <div key={element.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="mb-2 text-sm text-gray-600">
                        {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {typeof element.content === 'string' 
                          ? element.content.substring(0, 100) + (element.content.length > 100 ? '...' : '')
                          : JSON.stringify(element.content).substring(0, 100) + '...'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-l border-gray-200 w-80">
            <h4 className="mb-4 font-medium text-gray-900">Template Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Elemente
                </label>
                <div className="text-sm text-gray-600">
                  {template.elements.length} Komponenten
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Enthält
                </label>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(template.elements.map(el => el.type))].map(type => (
                    <span key={type} className="px-2 py-1 text-xs bg-gray-100 rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Schwierigkeitsgrad
                </label>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-yellow-400">
                        {star <= 2 ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Einfach</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => onApply(template)}
                className="w-full px-4 py-2 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Template verwenden
              </button>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 mt-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Layout-Assistent
export const LayoutAssistant = ({ onApplyLayout }) => {
  const [selectedLayout, setSelectedLayout] = useState('single-column')

  const layouts = {
    'single-column': {
      name: 'Eine Spalte',
      icon: '📄',
      description: 'Einfaches einspaltig Layout',
      structure: [
        { type: 'hero', width: '100%' },
        { type: 'text', width: '100%' },
        { type: 'button', width: '100%' }
      ]
    },
    'two-column': {
      name: 'Zwei Spalten',
      icon: '📊',
      description: 'Zweispaltiges Layout',
      structure: [
        { type: 'hero', width: '100%' },
        { type: 'text', width: '50%' },
        { type: 'image', width: '50%' }
      ]
    },
    'three-column': {
      name: 'Drei Spalten',
      icon: '📋',
      description: 'Dreispaltiges Layout',
      structure: [
        { type: 'hero', width: '100%' },
        { type: 'card', width: '33%' },
        { type: 'card', width: '33%' },
        { type: 'card', width: '33%' }
      ]
    },
    'sidebar': {
      name: 'Mit Seitenleiste',
      icon: '📚',
      description: 'Haupt-Inhalt mit Seitenleiste',
      structure: [
        { type: 'hero', width: '100%' },
        { type: 'text', width: '70%' },
        { type: 'card', width: '30%' }
      ]
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Layout-Assistent</h3>
        <p className="text-sm text-gray-600">Wählen Sie ein Layout-Schema für Ihre Seite</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(layouts).map(([key, layout]) => (
          <div
            key={key}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedLayout === key 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedLayout(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">{layout.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{layout.name}</h4>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedLayout === key ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`} />
            </div>
            
            <div className="flex mt-3 space-x-1">
              {layout.structure.map((item, index) => (
                <div
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-200 rounded"
                  style={{ width: item.width }}
                >
                  {item.type}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onApplyLayout(layouts[selectedLayout])}
        className="w-full px-4 py-2 mt-6 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Layout anwenden
      </button>
    </div>
  )
}

// Erweiterte Export-Optionen
export const ExportOptions = ({ elements, onExport }) => {
  const [exportFormat, setExportFormat] = useState('html')
  const [includeStyles, setIncludeStyles] = useState(true)
  const [optimizeImages, setOptimizeImages] = useState(true)
  const [minifyCode, setMinifyCode] = useState(false)

  const exportFormats = {
    html: { name: 'HTML + CSS', extension: '.html', icon: '🌐' },
    react: { name: 'React Component', extension: '.jsx', icon: '⚛️' },
    vue: { name: 'Vue Component', extension: '.vue', icon: '💚' },
    wordpress: { name: 'WordPress Theme', extension: '.php', icon: '📝' }
  }

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      elements: elements,
      options: {
        includeStyles,
        optimizeImages,
        minifyCode
      }
    }
    onExport(exportData)
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Export-Optionen</h3>
        <p className="text-sm text-gray-600">Wählen Sie das Format und die Optionen für den Export</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Export-Format</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(exportFormats).map(([key, format]) => (
              <div
                key={key}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  exportFormat === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setExportFormat(key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-3 text-xl">{format.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{format.name}</h4>
                      <p className="text-sm text-gray-600">{format.extension}</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    exportFormat === key ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Export-Einstellungen</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeStyles}
                onChange={(e) => setIncludeStyles(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Styles einbetten</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={optimizeImages}
                onChange={(e) => setOptimizeImages(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Bilder optimieren</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={minifyCode}
                onChange={(e) => setMinifyCode(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Code minifizieren</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="w-full px-4 py-2 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Jetzt exportieren
        </button>
      </div>
    </div>
  )
}