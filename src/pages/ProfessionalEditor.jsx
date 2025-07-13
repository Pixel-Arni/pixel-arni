import React, { useState, useRef, useEffect } from 'react'

const ProfessionalEditor = ({ onExit }) => {
  // Basis State
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('elements')
  const [viewMode, setViewMode] = useState('desktop')
  const [showGrid, setShowGrid] = useState(true)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const canvasRef = useRef(null)

  // Komponenten-Bibliothek
  const componentCategories = {
    basic: {
      name: 'Grundlagen',
      icon: '🔧',
      components: [
        { type: 'text', name: 'Text', icon: '📝', description: 'Einfacher Text-Block' },
        { type: 'heading', name: 'Überschrift', icon: '📋', description: 'H1-H6 Überschriften' },
        { type: 'button', name: 'Button', icon: '🔘', description: 'Klickbarer Button' },
        { type: 'image', name: 'Bild', icon: '🖼️', description: 'Bilder & Grafiken' },
        { type: 'spacer', name: 'Abstand', icon: '📏', description: 'Vertikaler Abstand' },
        { type: 'divider', name: 'Trennlinie', icon: '➖', description: 'Horizontale Linie' }
      ]
    },
    content: {
      name: 'Inhalt',
      icon: '📄',
      components: [
        { type: 'hero', name: 'Hero Section', icon: '🚀', description: 'Große Kopfzeile' },
        { type: 'card', name: 'Karte', icon: '🃏', description: 'Inhaltskarte' },
        { type: 'testimonial', name: 'Testimonial', icon: '💬', description: 'Kundenbewertung' },
        { type: 'features', name: 'Features', icon: '⭐', description: 'Feature-Liste' }
      ]
    }
  }

// Undo/Redo System
  const saveState = () => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(elements))])
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      setRedoStack(prev => [...prev, JSON.parse(JSON.stringify(elements))])
      setElements(previousState)
      setUndoStack(prev => prev.slice(0, -1))
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(elements))])
      setElements(nextState)
      setRedoStack(prev => prev.slice(0, -1))
    }
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault()
          undo()
        } else if (e.key === 'z' && e.shiftKey) {
          e.preventDefault()
          redo()
        } else if (e.key === 'y') {
          e.preventDefault()
          redo()
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          deleteElement(selectedElement)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement, undoStack, redoStack])

  // Standard-Inhalte für Komponenten
  const getDefaultContent = (type) => {
    const defaults = {
      text: 'Hier steht Ihr Text. Klicken Sie zum Bearbeiten.',
      heading: 'Ihre Überschrift',
      button: 'Klicken Sie hier',
      image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Ihr+Bild',
      hero: {
        title: 'Willkommen auf unserer Website',
        subtitle: 'Hier beginnt Ihre Reise zu Erfolg',
        description: 'Entdecken Sie unsere einzigartigen Lösungen',
        buttonText: 'Jetzt starten'
      },
      card: {
        title: 'Karten-Titel',
        description: 'Hier steht die Beschreibung der Karte.',
        buttonText: 'Mehr erfahren',
        image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Karte'
      },
      testimonial: {
        text: 'Das ist ein großartiger Service! Sehr zu empfehlen.',
        author: 'Max Mustermann',
        position: 'CEO, Beispiel GmbH',
        rating: 5,
        image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=MM'
      },
      features: {
        title: 'Unsere Features',
        features: [
          { icon: '⚡', title: 'Schnell', description: 'Blitzschnelle Performance' },
          { icon: '🔒', title: 'Sicher', description: 'Höchste Sicherheitsstandards' },
          { icon: '📱', title: 'Responsive', description: 'Optimiert für alle Geräte' }
        ]
      }
    }
    return defaults[type] || `Inhalt für ${type}`
  }

  // Standard-Styles für Komponenten
  const getDefaultStyles = (type) => {
    const baseStyles = {
      position: 'relative',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }

    const styles = {
      text: {
        ...baseStyles,
        fontSize: '16px',
        lineHeight: '1.7',
        color: '#374151',
        padding: '20px'
      },
      heading: {
        ...baseStyles,
        fontSize: '36px',
        fontWeight: '700',
        color: '#1f2937',
        lineHeight: '1.2',
        padding: '20px',
        textAlign: 'center'
      },
      button: {
        ...baseStyles,
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '14px 28px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-block',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
        margin: '10px'
      },
      image: {
        ...baseStyles,
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        borderRadius: '12px',
        margin: '20px auto',
        display: 'block'
      },
      hero: {
        ...baseStyles,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: '100px 40px',
        textAlign: 'center',
        borderRadius: '16px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      card: {
        ...baseStyles,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        margin: '20px 0'
      },
      spacer: {
        ...baseStyles,
        height: '40px',
        backgroundColor: 'transparent'
      },
      divider: {
        ...baseStyles,
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '30px 0'
      }
    }

    return styles[type] || baseStyles
  }

  // Drag & Drop Funktionen
  const handleDragStart = (e, componentType) => {
    e.dataTransfer.setData('componentType', componentType)
    setIsDragging(true)
  }

  const findComponentByType = (type) => {
    for (const category of Object.values(componentCategories)) {
      if (category.components) {
        const component = category.components.find(c => c.type === type)
        if (component) return component
      }
    }
    return null
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const y = e.clientY - rect.top
      showDropIndicator(y)
    }
  }

  const showDropIndicator = (y) => {
    const existingIndicator = document.querySelector('.drop-indicator')
    if (existingIndicator) {
      existingIndicator.remove()
    }
    
    const indicator = document.createElement('div')
    indicator.className = 'drop-indicator'
    indicator.style.cssText = `
      position: absolute;
      left: 20px;
      right: 20px;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      z-index: 1000;
      top: ${y}px;
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    `
    canvasRef.current.appendChild(indicator)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData('componentType')
    
    const indicator = document.querySelector('.drop-indicator')
    if (indicator) indicator.remove()
    
    if (componentType) {
      saveState()
      
      const newElement = {
        id: `element_${Date.now()}`,
        type: componentType,
        content: getDefaultContent(componentType),
        styles: getDefaultStyles(componentType)
      }
      
      setElements(prev => [...prev, newElement])
      setSelectedElement(newElement.id)
    }
    setIsDragging(false)
  }

  // Element-Aktionen
  const selectElement = (elementId) => {
    setSelectedElement(elementId)
    setActiveTab('design')
  }

  const deleteElement = (elementId) => {
    saveState()
    setElements(elements.filter(el => el.id !== elementId))
    setSelectedElement(null)
  }

  const duplicateElement = (elementId) => {
    saveState()
    const element = elements.find(el => el.id === elementId)
    if (element) {
      const newElement = {
        ...element,
        id: `element_${Date.now()}`,
      }
      const index = elements.findIndex(el => el.id === elementId)
      const newElements = [...elements]
      newElements.splice(index + 1, 0, newElement)
      setElements(newElements)
      setSelectedElement(newElement.id)
    }
  }

  const moveElement = (elementId, direction) => {
    saveState()
    const index = elements.findIndex(el => el.id === elementId)
    if (index === -1) return
    
    const newElements = [...elements]
    const [element] = newElements.splice(index, 1)
    
    const newIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(elements.length - 1, index + 1)
    newElements.splice(newIndex, 0, element)
    setElements(newElements)
  }

  const updateElement = (elementId, updates) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ))
  }

  // Responsive Ansichten
  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'tablet': return '768px'
      case 'mobile': return '375px'
      default: return '100%'
    }
  }

  const getCanvasMaxWidth = () => {
    switch (viewMode) {
      case 'tablet': return '768px'
      case 'mobile': return '375px'
      default: return '1200px'
    }
  }

  const showPreview = () => {
    setIsPreviewMode(true)
  }

  return (
    <div className="relative flex h-screen bg-gray-50">
      {/* Linke Sidebar */}
      <div className="flex flex-col bg-white border-r border-gray-200 shadow-lg w-80">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Professional Editor</h2>
            <button
              onClick={onExit}
              className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
            <button
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'elements' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('elements')}
            >
              <span className="mr-2">🔧</span>
              Elemente
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'design' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('design')}
            >
              <span className="mr-2">🎨</span>
              Design
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'elements' ? (
            <ElementsPanel 
              categories={componentCategories}
              onDragStart={handleDragStart}
            />
          ) : (
            <DesignPanel 
              selectedElement={selectedElement}
              elements={elements}
              onUpdateElement={updateElement}
            />
          )}
        </div>
      </div>

      {/* Hauptbereich */}
      <div className="flex flex-col flex-1">
        {/* Toolbar */}
        <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Landing Page Editor</h1>
            
            {/* Undo/Redo */}
            <div className="flex items-center space-x-1">
              <button
                onClick={undo}
                disabled={undoStack.length === 0}
                className={`p-2 rounded-lg ${undoStack.length > 0 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'}`}
                title="Rückgängig (Ctrl+Z)"
              >
                ↶
              </button>
              <button
                onClick={redo}
                disabled={redoStack.length === 0}
                className={`p-2 rounded-lg ${redoStack.length > 0 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'}`}
                title="Wiederholen (Ctrl+Y)"
              >
                ↷
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
                className="p-1 text-gray-600 rounded hover:bg-gray-100"
              >
                ➖
              </button>
              <span className="text-sm text-center text-gray-600 min-w-12">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                className="p-1 text-gray-600 rounded hover:bg-gray-100"
              >
                ➕
              </button>
            </div>

            {/* Grid Toggle */}
            <button
              className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setShowGrid(!showGrid)}
              title="Raster ein/aus"
            >
              📏
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Responsive Controls */}
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('desktop')}
              >
                🖥️
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'tablet' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('tablet')}
              >
                📱
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('mobile')}
              >
                📲
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={showPreview}
                className="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                👁️ Vorschau
              </button>
              <button className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                💾 Speichern
              </button>
            </div>
          </div>
        </div>

{/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="flex justify-center p-6">
            <div 
              className="relative transition-all duration-300 bg-white shadow-xl"
              style={{ 
                width: getCanvasWidth(),
                maxWidth: getCanvasMaxWidth(),
                minHeight: '100vh',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center'
              }}
            >
              <div
                ref={canvasRef}
                className={`relative min-h-full ${isDragging ? 'bg-blue-50' : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ 
                  backgroundImage: showGrid ? 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto'
                }}
              >
                {elements.length === 0 ? (
                  <div className="flex items-center justify-center text-gray-400 h-96">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">🎨</div>
                      <p className="mb-2 text-xl font-medium">Willkommen im Professional Editor</p>
                      <p className="text-sm">Ziehen Sie Elemente aus dem linken Panel hierher</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {elements.map((element, index) => (
                      <ElementWrapper
                        key={element.id}
                        element={element}
                        isSelected={selectedElement === element.id}
                        onSelect={selectElement}
                        onDelete={deleteElement}
                        onDuplicate={duplicateElement}
                        onMove={moveElement}
                        canMoveUp={index > 0}
                        canMoveDown={index < elements.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Mode */}
      {isPreviewMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-lg overflow-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <h3 className="text-lg font-semibold">Live-Vorschau</h3>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Schließen
              </button>
            </div>
            <div className="p-6">
              {elements.map((element) => (
                <div key={element.id} style={element.styles}>
                  {renderElementContent(element)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Komponente für das Elemente-Panel
const ElementsPanel = ({ categories, onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState('basic')
  const [searchTerm, setSearchTerm] = useState('')

  const category = categories[activeCategory]
  const filteredComponents = searchTerm && category?.components
    ? category.components.filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : category?.components || []

  return (
    <div className="p-4">
      {/* Suche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Komponenten suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Kategorien */}
      {!searchTerm && (
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                className={`p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  activeCategory === key 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(key)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Komponenten */}
      <div className="space-y-2">
        {filteredComponents.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => onDragStart(e, component.type)}
            className="p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md hover:border-blue-300"
          >
            <div className="flex items-center mb-2">
              <span className="mr-3 text-2xl">{component.icon}</span>
              <span className="font-semibold text-gray-900">{component.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">{component.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Design-Panel Komponente
const DesignPanel = ({ selectedElement, elements, onUpdateElement }) => {
  const element = elements.find(el => el.id === selectedElement)
  
  if (!element) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="mb-4 text-6xl">🎨</div>
        <p className="mb-2 text-lg font-medium">Design-Panel</p>
        <p className="text-sm">Wählen Sie ein Element aus, um es zu bearbeiten</p>
      </div>
    )
  }

  const updateContent = (newContent) => {
    onUpdateElement(element.id, { content: newContent })
  }

  const updateStyle = (property, value) => {
    onUpdateElement(element.id, {
      styles: { ...element.styles, [property]: value }
    })
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {element.type.charAt(0).toUpperCase() + element.type.slice(1)} bearbeiten
        </h3>
        
        {/* Content Editor */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Inhalt
            </label>
            {element.type === 'text' || element.type === 'heading' ? (
              <textarea
                value={element.content}
                onChange={(e) => updateContent(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            ) : element.type === 'button' ? (
              <input
                type="text"
                value={element.content}
                onChange={(e) => updateContent(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : element.type === 'image' ? (
              <input
                type="url"
                value={element.content}
                onChange={(e) => updateContent(e.target.value)}
                placeholder="Bild-URL eingeben..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : element.type === 'hero' ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={element.content.title}
                  onChange={(e) => updateContent({ ...element.content, title: e.target.value })}
                  placeholder="Titel"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={element.content.subtitle}
                  onChange={(e) => updateContent({ ...element.content, subtitle: e.target.value })}
                  placeholder="Untertitel"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={element.content.description}
                  onChange={(e) => updateContent({ ...element.content, description: e.target.value })}
                  placeholder="Beschreibung"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
                <input
                  type="text"
                  value={element.content.buttonText}
                  onChange={(e) => updateContent({ ...element.content, buttonText: e.target.value })}
                  placeholder="Button Text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Content-Editor für {element.type} wird entwickelt...
              </div>
            )}
          </div>
          
          {/* Style Editor */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="mb-3 text-sm font-medium text-gray-700">Styling</h4>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Textfarbe</label>
                <input
                  type="color"
                  value={element.styles.color || '#000000'}
                  onChange={(e) => updateStyle('color', e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Hintergrundfarbe</label>
                <input
                  type="color"
                  value={element.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded"
                />
              </div>
              {['text', 'heading', 'button'].includes(element.type) && (
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Schriftgröße: {parseInt(element.styles.fontSize) || 16}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="72"
                    value={parseInt(element.styles.fontSize) || 16}
                    onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
                    className="w-full"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Innenabstand: {parseInt(element.styles.padding) || 20}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={parseInt(element.styles.padding) || 20}
                  onChange={(e) => updateStyle('padding', `${e.target.value}px`)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Element Wrapper Komponente
const ElementWrapper = ({ 
  element, 
  isSelected, 
  onSelect, 
  onDelete, 
  onDuplicate, 
  onMove, 
  canMoveUp, 
  canMoveDown 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      data-element-id={element.id}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onSelect(element.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={element.styles}
    >
      {/* Element Content */}
      {renderElementContent(element)}
      
      {/* Controls */}
      {(isHovered || isSelected) && (
        <div className="absolute left-0 right-0 flex items-center justify-between px-4 py-2 text-xs text-white rounded-t-lg shadow-lg -top-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMove(element.id, 'up')
              }}
              disabled={!canMoveUp}
              className="p-1 transition-colors rounded hover:bg-white/20 disabled:opacity-50"
              title="Nach oben"
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMove(element.id, 'down')
              }}
              disabled={!canMoveDown}
              className="p-1 transition-colors rounded hover:bg-white/20 disabled:opacity-50"
              title="Nach unten"
            >
              ↓
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDuplicate(element.id)
              }}
              className="p-1 transition-colors rounded hover:bg-white/20"
              title="Duplizieren"
            >
              📋
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(element.id)
              }}
              className="p-1 transition-colors rounded hover:bg-red-500"
              title="Löschen"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Element Content Renderer
const renderElementContent = (element) => {
  switch (element.type) {
    case 'text':
      return <p>{element.content}</p>
    
    case 'heading':
      return <h2>{element.content}</h2>
    
    case 'button':
      return (
        <button className="transition-opacity hover:opacity-80">
          {element.content}
        </button>
      )
    
    case 'image':
      return (
        <img 
          src={element.content} 
          alt="Element" 
          className="h-auto max-w-full"
        />
      )
    
    case 'hero':
      return (
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
            {element.content.title}
          </h1>
          <h2 className="mb-8 text-xl lg:text-2xl opacity-90">
            {element.content.subtitle}
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg lg:text-xl opacity-80">
            {element.content.description}
          </p>
          <button className="px-8 py-4 text-lg font-semibold text-blue-600 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-100">
            {element.content.buttonText}
          </button>
        </div>
      )
    
    case 'card':
      return (
        <div className="transition-shadow hover:shadow-lg">
          <img 
            src={element.content.image} 
            alt={element.content.title} 
            className="object-cover w-full h-48 mb-4 rounded-lg"
          />
          <h3 className="mb-2 text-xl font-semibold">
            {element.content.title}
          </h3>
          <p className="mb-4 leading-relaxed text-gray-600">
            {element.content.description}
          </p>
          <button className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            {element.content.buttonText}
          </button>
        </div>
      )
    
    case 'testimonial':
      return (
        <div className="p-8 bg-white rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <img 
              src={element.content.image} 
              alt={element.content.author} 
              className="w-16 h-16 mr-4 rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold">{element.content.author}</h4>
              <p className="text-gray-600">{element.content.position}</p>
            </div>
          </div>
          <p className="mb-4 text-lg italic leading-relaxed text-gray-700">
            "{element.content.text}"
          </p>
          <div className="flex">
            {[...Array(element.content.rating)].map((_, i) => (
              <span key={i} className="text-xl text-yellow-400">⭐</span>
            ))}
          </div>
        </div>
      )
    
    case 'features':
      return (
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">{element.content.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {element.content.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    
    case 'spacer':
      return (
        <div className="flex items-center justify-center text-sm text-gray-400 border-2 border-gray-300 border-dashed rounded">
          Abstand ({element.styles.height || '40px'})
        </div>
      )
    
    case 'divider':
      return <hr className="border-gray-300" />
    
    default:
      return (
        <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
          <div className="mb-2 text-2xl">📦</div>
          <p>Element: {element.type}</p>
        </div>
      )
  }
}

export default ProfessionalEditor