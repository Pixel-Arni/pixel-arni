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

const AdvancedDesignPanel = ({ selectedElement, elements, onUpdateElement }) => {
  const [activeStyleTab, setActiveStyleTab] = useState('content')
  const element = elements.find(el => el.id === selectedElement)
  
  if (!element) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="mb-4 text-6xl">🎨</div>
        <p className="mb-2 text-lg font-medium">Design-Panel</p>
        <p className="text-sm">Wählen Sie ein Element aus, um es zu bearbeiten</p>
        <div className="p-3 mt-4 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-600">
            💡 Tipp: Klicken Sie auf ein Element im Canvas, um dessen Eigenschaften zu bearbeiten
          </p>
        </div>
      </div>
    )
  }

  const styleTabs = [
    { id: 'content', label: 'Inhalt', icon: '📝' },
    { id: 'style', label: 'Stil', icon: '🎨' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'effects', label: 'Effekte', icon: '✨' },
    { id: 'animation', label: 'Animation', icon: '🎬' }
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Element Info */}
      <div className="p-4 border-b border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900">
              {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
            </h3>
            <p className="text-sm text-blue-700">Element bearbeiten</p>
          </div>
          <div className="text-2xl">
            {findComponentByType(element.type)?.icon || '📦'}
          </div>
        </div>
      </div>

      {/* Style Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {styleTabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeStyleTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveStyleTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-auto">
        {activeStyleTab === 'content' && (
          <ContentEditor element={element} onUpdateElement={onUpdateElement} />
        )}
        {activeStyleTab === 'style' && (
          <StyleEditor element={element} onUpdateElement={onUpdateElement} />
        )}
        {activeStyleTab === 'layout' && (
          <LayoutEditor element={element} onUpdateElement={onUpdateElement} />
        )}
        {activeStyleTab === 'effects' && (
          <EffectsEditor element={element} onUpdateElement={onUpdateElement} />
        )}
        {activeStyleTab === 'animation' && (
          <AnimationEditor element={element} onUpdateElement={onUpdateElement} />
        )}
      </div>
    </div>
  )
}

const ContentEditor = ({ element, onUpdateElement }) => {
  const updateContent = (newContent) => {
    onUpdateElement(element.id, { content: newContent })
  }

  switch (element.type) {
    case 'text':
    case 'heading':
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Text-Inhalt
            </label>
            <textarea
              value={element.content}
              onChange={(e) => updateContent(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Geben Sie Ihren Text ein..."
            />
          </div>
        </div>
      )
    
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Button-Text
            </label>
            <input
              type="text"
              value={element.content}
              onChange={(e) => updateContent(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Button-Text eingeben..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Link-Ziel
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    
    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bild-URL
            </label>
            <input
              type="url"
              value={element.content}
              onChange={(e) => updateContent(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Alt-Text
            </label>
            <input
              type="text"
              placeholder="Beschreibung des Bildes"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Haupt-Titel
            </label>
            <input
              type="text"
              value={element.content.title}
              onChange={(e) => updateContent({ ...element.content, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Untertitel
            </label>
            <input
              type="text"
              value={element.content.subtitle}
              onChange={(e) => updateContent({ ...element.content, subtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Beschreibung
            </label>
            <textarea
              value={element.content.description}
              onChange={(e) => updateContent({ ...element.content, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Button-Text
            </label>
            <input
              type="text"
              value={element.content.buttonText}
              onChange={(e) => updateContent({ ...element.content, buttonText: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    
    default:
      return (
        <div className="py-8 text-center text-gray-500">
          <div className="mb-4 text-4xl">🔧</div>
          <p>Content-Editor für {element.type} wird entwickelt...</p>
        </div>
      )
  }
}

const StyleEditor = ({ element, onUpdateElement }) => {
  const updateStyle = (property, value) => {
    onUpdateElement(element.id, {
      styles: { ...element.styles, [property]: value }
    })
  }

  return (
    <div className="space-y-6">
      {/* Typografie */}
      {['text', 'heading', 'button'].includes(element.type) && (
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">Typografie</h4>
          <TypographyControl
            value={element.styles}
            onChange={(typography) => {
              Object.entries(typography).forEach(([key, value]) => {
                updateStyle(key, value)
              })
            }}
          />
        </div>
      )}

      {/* Farben */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Farben</h4>
        <div className="space-y-3">
          <ColorPicker
            label="Textfarbe"
            value={element.styles.color || '#000000'}
            onChange={(color) => updateStyle('color', color)}
          />
          <ColorPicker
            label="Hintergrundfarbe"
            value={element.styles.backgroundColor || '#ffffff'}
            onChange={(color) => updateStyle('backgroundColor', color)}
          />
        </div>
      </div>

      {/* Hintergrund */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Hintergrund</h4>
        <GradientPicker
          label="Hintergrund-Gradient"
          value={element.styles.background || ''}
          onChange={(gradient) => updateStyle('background', gradient)}
        />
      </div>

      {/* Abstände */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Abstände</h4>
        <div className="space-y-3">
          <SpacingControl
            label="Innenabstand"
            value={element.styles.padding || '20px'}
            onChange={(padding) => updateStyle('padding', padding)}
          />
          <SpacingControl
            label="Außenabstand"
            value={element.styles.margin || '10px 0'}
            onChange={(margin) => updateStyle('margin', margin)}
          />
        </div>
      </div>

      {/* Rahmen */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Rahmen</h4>
        <BorderControl
          value={element.styles.border || 'none'}
          onChange={(border) => updateStyle('border', border)}
        />
      </div>
    </div>
  )
}

const LayoutEditor = ({ element, onUpdateElement }) => {
  const updateStyle = (property, value) => {
    onUpdateElement(element.id, {
      styles: { ...element.styles, [property]: value }
    })
  }

  return (
    <div className="space-y-6">
      {/* Größe */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Größe</h4>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Breite</label>
            <select
              value={element.styles.width || '100%'}
              onChange={(e) => updateStyle('width', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="100%">Vollbreite</option>
              <option value="75%">75%</option>
              <option value="50%">50%</option>
              <option value="25%">25%</option>
              <option value="auto">Automatisch</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Höhe</label>
            <select
              value={element.styles.height || 'auto'}
              onChange={(e) => updateStyle('height', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Automatisch</option>
              <option value="200px">200px</option>
              <option value="400px">400px</option>
              <option value="600px">600px</option>
              <option value="100vh">Vollhöhe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ausrichtung */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Ausrichtung</h4>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Textausrichtung</label>
            <div className="flex space-x-2">
              {['left', 'center', 'right', 'justify'].map((align) => (
                <button
                  key={align}
                  onClick={() => updateStyle('textAlign', align)}
                  className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                    element.styles.textAlign === align
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {align === 'left' && '⬅️'}
                  {align === 'center' && '➡️⬅️'}
                  {align === 'right' && '➡️'}
                  {align === 'justify' && '📐'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Position */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Position</h4>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Position</label>
            <select
              value={element.styles.position || 'relative'}
              onChange={(e) => updateStyle('position', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relative">Relativ</option>
              <option value="absolute">Absolut</option>
              <option value="fixed">Fixiert</option>
              <option value="sticky">Sticky</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

const EffectsEditor = ({ element, onUpdateElement }) => {
  const updateStyle = (property, value) => {
    onUpdateElement(element.id, {
      styles: { ...element.styles, [property]: value }
    })
  }

  return (
    <div className="space-y-6">
      {/* Schatten */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Schatten</h4>
        <ShadowControl
          value={element.styles.boxShadow || 'none'}
          onChange={(shadow) => updateStyle('boxShadow', shadow)}
        />
      </div>

      {/* Transformationen */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Transformationen</h4>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Rotation: 0°</label>
            <input
              type="range"
              min="-180"
              max="180"
              defaultValue="0"
              onChange={(e) => updateStyle('transform', `rotate(${e.target.value}deg)`)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Skalierung: 1</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              onChange={(e) => updateStyle('transform', `scale(${e.target.value})`)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Opazität */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Opazität</h4>
        <div>
          <label className="block mb-1 text-sm text-gray-600">Transparenz: 100%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={(e) => updateStyle('opacity', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

const AnimationEditor = ({ element, onUpdateElement }) => {
  const updateSettings = (property, value) => {
    onUpdateElement(element.id, {
      settings: { ...element.settings, [property]: value }
    })
  }

  return (
    <div className="space-y-6">
      <AnimationControl
        value={element.settings?.animation || { type: 'none' }}
        onChange={(animation) => updateSettings('animation', animation)}
      />

      {/* Hover-Effekte */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Hover-Effekte</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => updateSettings('hoverEffect', e.target.checked)}
            />
            <span className="text-sm text-gray-700">Hover-Effekt aktivieren</span>
          </label>
          <div className="pl-6">
            <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="lift">Anheben</option>
              <option value="scale">Vergrößern</option>
              <option value="glow">Leuchten</option>
              <option value="rotate">Drehen</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

const EnhancedElementWrapper = ({ 
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
      
      {/* Enhanced Controls */}
      {(isHovered || isSelected) && (
        <div className="absolute left-0 right-0 flex items-center justify-between px-4 py-2 text-xs text-white rounded-t-lg shadow-lg -top-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
            </span>
            <span className="text-blue-200">#{element.id.slice(-4)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMove(element.id, 'up')
              }}
              disabled={!canMoveUp}
              className="p-1 transition-colors rounded hover:bg-white/20 disabled:opacity-50"
              title="Nach oben verschieben"
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
              title="Nach unten verschieben"
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

// Element Content Renderer (erweitert)
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
            {element.content.subtitle && (
              <p className="text-xl text-gray-600">{element.content.subtitle}</p>
            )}
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

// Hilfsfunktion für Component-Suche
const findComponentByType = (type) => {
  // Diese Funktion sollte die Komponente nach Typ finden
  const allComponents = [
    { type: 'text', name: 'Text', icon: '📝' },
    { type: 'heading', name: 'Überschrift', icon: '📋' },
    { type: 'button', name: 'Button', icon: '🔘' },
    { type: 'image', name: 'Bild', icon: '🖼️' },
    { type: 'hero', name: 'Hero Section', icon: '🚀' },
    { type: 'card', name: 'Karte', icon: '🃏' },
    { type: 'testimonial', name: 'Testimonial', icon: '💬' },
    { type: 'features', name: 'Features', icon: '⭐' },
    { type: 'pricing', name: 'Preise', icon: '💰' },
    { type: 'gallery', name: 'Galerie', icon: '🖼️' },
    { type: 'form', name: 'Formular', icon: '📋' },
    { type: 'video', name: 'Video', icon: '🎥' },
    { type: 'spacer', name: 'Abstand', icon: '📏' },
    { type: 'divider', name: 'Trennlinie', icon: '➖' }
  ]
  
  return allComponents.find(comp => comp.type === type)
}

export default ProfessionalEditor      testimonial: {
        text: 'Das ist ein großartiger Service! Sehr zu empfehlen. Die Qualität und der Support sind hervorragend.',
        author: 'Max Mustermann',
        position: 'CEO, Beispiel GmbH',
        rating: 5,
        image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=MM'
      },
      features: {
        title: 'Unsere Features',
        subtitle: 'Warum Sie uns wählen sollten',
        features: [
          { icon: '⚡', title: 'Schnell', description: 'Blitzschnelle Performance für optimale Nutzererfahrung' },
          { icon: '🔒', title: 'Sicher', description: 'Höchste Sicherheitsstandards und Datenschutz' },
          { icon: '📱', title: 'Responsive', description: 'Perfekt optimiert für alle Geräte und Bildschirme' }
        ]
      },
      pricing: {
        title: 'Unsere Preise',
        subtitle: 'Wählen Sie den perfekten Plan',
        plans: [
          { 
            name: 'Starter', 
            price: '29.99', 
            period: 'Monat',
            features: ['Grundfunktionen', 'E-Mail Support', '5 Projekte'],
            highlighted: false
          },
          { 
            name: 'Professional', 
            price: '59.99', 
            period: 'Monat',
            features: ['Alle Funktionen', 'Prioritäts-Support', 'Unbegrenzte Projekte', 'Analytics'],
            highlighted: true
          },
          { 
            name: 'Enterprise', 
            price: '99.99', 
            period: 'Monat',
            features: ['Alle Pro Features', 'Dedicated Support', 'Custom Features', 'White Label'],
            highlighted: false
          }
        ]
      },
      form: {
        title: 'Kontakt aufnehmen',
        subtitle: 'Wir freuen uns auf Ihre Nachricht',
        fields: [
          { type: 'text', name: 'name', label: 'Name', required: true, placeholder: 'Ihr Name' },
          { type: 'email', name: 'email', label: 'E-Mail', required: true, placeholder: 'ihre@email.de' },
          { type: 'text', name: 'subject', label: 'Betreff', required: false, placeholder: 'Betreff' },
          { type: 'textarea', name: 'message', label: 'Nachricht', required: true, placeholder: 'Ihre Nachricht...' }
        ],
        buttonText: 'Nachricht senden'
      },
      gallery: {
        title: 'Unsere Galerie',
        subtitle: 'Eindrücke unserer Arbeit',
        images: [
          'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Projekt+1',
          'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Projekt+2',
          'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Projekt+3',
          'https://via.placeholder.com/400x300/96ceb4/ffffff?text=Projekt+4'
        ]
      },
      video: {
        title: 'Video-Präsentation',
        subtitle: 'Sehen Sie unser Unternehmen in Aktion',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Video+Thumbnail',
        autoplay: false
      },
      countdown: {
        title: 'Limitiertes Angebot',
        subtitle: 'Nur noch wenige Tage verfügbar',
        endDate: '2024-12-31T23:59:59',
        labels: { days: 'Tage', hours: 'Stunden', minutes: 'Minuten', seconds: 'Sekunden' }
      },
      social: {
        title: 'Folgen Sie uns',
        platforms: [
          { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
          { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
          { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
          { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
        ]
      }
    }
    return defaults[type] || `Inhalt für ${type}`
  }

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
        padding: '20px',
        backgroundColor: 'transparent'
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
        textDecoration: 'none',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
        transform: 'translateY(0)',
        margin: '10px'
      },
      image: {
        ...baseStyles,
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 0 40px 0'
      },
      card: {
        ...baseStyles,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        margin: '20px 0',
        textAlign: 'center'
      },
      testimonial: {
        ...baseStyles,
        backgroundColor: '#f8fafc',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '8px',
        padding: '32px',
        margin: '30px 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      },
      features: {
        ...baseStyles,
        padding: '60px 40px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        margin: '40px 0'
      },
      pricing: {
        ...baseStyles,
        padding: '60px 40px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        margin: '40px 0'
      },
      form: {
        ...baseStyles,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '40px',
        margin: '40px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      },
      gallery: {
        ...baseStyles,
        padding: '60px 40px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        margin: '40px 0'
      },
      video: {
        ...baseStyles,
        padding: '40px',
        backgroundColor: '#000000',
        borderRadius: '16px',
        margin: '40px 0',
        textAlign: 'center'
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
        margin: '30px 0',
        border: 'none'
      }
    }

    return styles[type] || baseStyles
  }

  const getDefaultSettings = (type) => {
    const settings = {
      text: {
        typography: { fontSize: 16, fontWeight: 400, lineHeight: 1.7 },
        spacing: { margin: { top: 0, bottom: 20 } },
        animation: { type: 'fadeIn', duration: 0.6 }
      },
      heading: {
        typography: { fontSize: 36, fontWeight: 700, lineHeight: 1.2 },
        spacing: { margin: { top: 0, bottom: 30 } },
        animation: { type: 'slideUp', duration: 0.8 }
      },
      button: {
        typography: { fontSize: 16, fontWeight: 600 },
        spacing: { padding: { top: 14, bottom: 14, left: 28, right: 28 } },
        effects: { hover: true, shadow: true },
        animation: { type: 'pulse', duration: 0.3 }
      },
      hero: {
        layout: { alignment: 'center', minHeight: 500 },
        background: { type: 'gradient', overlay: true },
        animation: { type: 'slideDown', duration: 1.2 }
      }
    }
    return settings[type] || {}
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
    saveState()
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

  // Vorschau und Export
  const showPreview = () => {
    setIsPreviewMode(true)
  }

  const exportProject = (exportData) => {
    // Export-Logik implementieren
    console.log('Exportiere:', exportData)
    
    // Beispiel HTML-Export
    if (exportData.format === 'html') {
      const htmlContent = generateHTML(exportData.elements, exportData.options)
      downloadFile(htmlContent, 'landing-page.html', 'text/html')
    }
  }

  const generateHTML = (elements, options) => {
    const elementsHTML = elements.map(element => {
      const styleString = Object.entries(element.styles || {})
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ')
      
      return `<div style="${styleString}">${renderElementHTML(element)}</div>`
    }).join('\n')

    return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        ${options.includeStyles ? `
        .hover-effect:hover { transform: translateY(-2px); }
        .fade-in { opacity: 0; animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        ` : ''}
    </style>
</head>
<body>
    <div class="container">
        ${elementsHTML}
    </div>
    ${options.includeStyles ? `
    <script>
        // Scroll-Animationen
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    </script>
    ` : ''}
</body>
</html>`
  }

  const renderElementHTML = (element) => {
    switch (element.type) {
      case 'text':
        return `<p>${element.content}</p>`
      case 'heading':
        return `<h2>${element.content}</h2>`
      case 'button':
        return `<button class="hover-effect">${element.content}</button>`
      case 'image':
        return `<img src="${element.content}" alt="Bild" style="max-width: 100%; height: auto;" />`
      case 'hero':
        return `
          <div data-animate="true">
            <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: 700;">${element.content.title}</h1>
            <h2 style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">${element.content.subtitle}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8;">${element.content.description}</p>
            <button style="background: #fff; color: #3b82f6; padding: 1rem 2rem; border: none; border-radius: 2rem; font-size: 1rem; font-weight: 600; cursor: pointer;">
              ${element.content.buttonText}
            </button>
          </div>
        `
      case 'card':
        return `
          <div data-animate="true">
            <img src="${element.content.image}" alt="${element.content.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;" />
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">${element.content.title}</h3>
            <p style="margin-bottom: 1.5rem; color: #666;">${element.content.description}</p>
            <button style="background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer;">
              ${element.content.buttonText}
            </button>
          </div>
        `
      default:
        return `<div>Element: ${element.type}</div>`
    }
  }

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
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
          
          {/* Erweiterte Tabs */}
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
              onApplyTemplate={applyTemplate}
              onApplyLayout={applyLayout}
            />
          ) : (
            <AdvancedDesignPanel 
              selectedElement={selectedElement}
              elements={elements}
              onUpdateElement={updateElement}
            />
          )}
        </div>
      </div>

      {/* Hauptbereich */}
      <div className="flex flex-col flex-1">
        {/* Erweiterte Toolbar */}
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
                title="Desktop-Ansicht"
              >
                🖥️
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'tablet' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('tablet')}
                title="Tablet-Ansicht"
              >
                📱
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('mobile')}
                title="Mobile-Ansicht"
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
              <button 
                onClick={() => setActiveTab('export')}
                className="px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
              >
                📤 Export
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
                      <p className="mt-2 text-xs text-gray-500">Oder wählen Sie ein Template aus der Bibliothek</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {elements.map((element, index) => (
                      <EnhancedElementWrapper
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

      {/* Rechte Sidebar für Export */}
      {activeTab === 'export' && (
        <div className="bg-white border-l border-gray-200 shadow-lg w-80">
          <ExportOptions 
            elements={elements}
            onExport={exportProject}
          />
        </div>
      )}

      {/* Template Preview Modal */}
      {showTemplatePreview && (
        <TemplatePreview
          template={showTemplatePreview}
          onClose={() => setShowTemplatePreview(null)}
          onApply={applyTemplate}
        />
      )}

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

// Erweiterte Komponenten (werden in separaten Dateien implementiert)
const ElementsPanel = ({ categories, onDragStart, onApplyTemplate, onApplyLayout }) => {
  const [activeCategory, setActiveCategory] = useState('templates')
  const [searchTerm, setSearchTerm] = useState('')

  // Template-Auswahl
  if (activeCategory === 'templates') {
    return <TemplateLibrary onApplyTemplate={onApplyTemplate} />
  }

  // Layout-Assistent
  if (activeCategory === 'layout') {
    return <LayoutAssistant onApplyLayout={onApplyLayout} />
  }

  // Normale Komponenten
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
          className="w-full px-3 py-2import React, { useState, useRef, useEffect } from 'react'
import { TemplateLibrary, TemplatePreview, LayoutAssistant, ExportOptions } from './TemplateSystem'
import { 
  ColorPicker, 
  GradientPicker, 
  SpacingControl, 
  BorderControl, 
  ShadowControl, 
  AnimationControl,
  TypographyControl 
} from './AdvancedStyleComponents'

const ProfessionalEditor = ({ onExit }) => {
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('elements')
  const [viewMode, setViewMode] = useState('desktop')
  const [showGrid, setShowGrid] = useState(true)
  const [showTemplatePreview, setShowTemplatePreview] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const canvasRef = useRef(null)

  // Erweiterte Komponenten-Bibliothek
  const componentCategories = {
    templates: {
      name: 'Templates',
      icon: '📋',
      component: TemplateLibrary
    },
    layout: {
      name: 'Layout',
      icon: '📐',
      component: LayoutAssistant
    },
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
        { type: 'features', name: 'Features', icon: '⭐', description: 'Feature-Liste' },
        { type: 'pricing', name: 'Preise', icon: '💰', description: 'Preis-Tabelle' },
        { type: 'gallery', name: 'Galerie', icon: '🖼️', description: 'Bilder-Galerie' },
        { type: 'video', name: 'Video', icon: '🎥', description: 'Video-Player' },
        { type: 'map', name: 'Karte', icon: '🗺️', description: 'Interaktive Karte' }
      ]
    },
    forms: {
      name: 'Formulare',
      icon: '📝',
      components: [
        { type: 'form', name: 'Formular', icon: '📋', description: 'Kontakt-Formular' },
        { type: 'input', name: 'Eingabe', icon: '✏️', description: 'Text-Eingabe' },
        { type: 'textarea', name: 'Textbereich', icon: '📄', description: 'Mehrzeiliger Text' },
        { type: 'checkbox', name: 'Checkbox', icon: '☑️', description: 'Ankreuzfeld' },
        { type: 'radio', name: 'Radio', icon: '🔘', description: 'Auswahlfeld' },
        { type: 'select', name: 'Dropdown', icon: '📋', description: 'Dropdown-Menü' }
      ]
    },
    advanced: {
      name: 'Erweitert',
      icon: '⚡',
      components: [
        { type: 'countdown', name: 'Countdown', icon: '⏰', description: 'Countdown-Timer' },
        { type: 'social', name: 'Social Media', icon: '📱', description: 'Social-Icons' },
        { type: 'accordion', name: 'Akkordeon', icon: '🎵', description: 'Klappbarer Inhalt' },
        { type: 'tabs', name: 'Tabs', icon: '📑', description: 'Tab-Navigation' },
        { type: 'progress', name: 'Fortschritt', icon: '📊', description: 'Fortschritts-Balken' },
        { type: 'timeline', name: 'Timeline', icon: '📅', description: 'Zeitleiste' }
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
        } else if (e.key === 'd') {
          e.preventDefault()
          if (selectedElement) {
            duplicateElement(selectedElement)
          }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault()
          if (selectedElement) {
            deleteElement(selectedElement)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement, undoStack, redoStack])

  // Template anwenden
  const applyTemplate = (template) => {
    saveState()
    setElements(template.elements)
    setSelectedElement(null)
    setShowTemplatePreview(null)
  }

  // Layout anwenden
  const applyLayout = (layout) => {
    saveState()
    const newElements = layout.structure.map((item, index) => ({
      id: `element_${Date.now()}_${index}`,
      type: item.type,
      content: getDefaultContent(item.type),
      styles: {
        ...getDefaultStyles(item.type),
        width: item.width
      },
      settings: getDefaultSettings(item.type)
    }))
    setElements(newElements)
    setSelectedElement(null)
  }

  // Drag & Drop Funktionen
  const handleDragStart = (e, componentType) => {
    e.dataTransfer.setData('componentType', componentType)
    setIsDragging(true)
    
    // Erweiterte Drag-Vorschau
    const dragPreview = document.createElement('div')
    dragPreview.style.cssText = `
      padding: 12px 16px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
      position: absolute;
      top: -1000px;
      left: -1000px;
      z-index: 1000;
      border: 2px solid rgba(255, 255, 255, 0.3);
    `
    const component = findComponentByType(componentType)
    dragPreview.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 8px; font-size: 16px;">${component?.icon || '📦'}</span>
        <span>${component?.name || 'Element'}</span>
      </div>
    `
    document.body.appendChild(dragPreview)
    e.dataTransfer.setDragImage(dragPreview, 0, 0)
    
    setTimeout(() => document.body.removeChild(dragPreview), 0)
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
    
    // Erweiterte Drop-Indikator
    const rect = canvasRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    showDropIndicator(y)
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
      animation: pulse 1s infinite;
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
      const rect = canvasRef.current.getBoundingClientRect()
      const dropY = e.clientY - rect.top
      
      const newElement = {
        id: `element_${Date.now()}`,
        type: componentType,
        content: getDefaultContent(componentType),
        styles: getDefaultStyles(componentType),
        settings: getDefaultSettings(componentType),
        position: dropY,
        width: '100%',
        margin: { top: 0, right: 0, bottom: 20, left: 0 },
        padding: { top: 20, right: 20, bottom: 20, left: 20 }
      }
      
      const insertIndex = getInsertIndex(dropY)
      const newElements = [...elements]
      newElements.splice(insertIndex, 0, newElement)
      setElements(newElements)
      setSelectedElement(newElement.id)
    }
    setIsDragging(false)
  }

  const getInsertIndex = (dropY) => {
    let insertIndex = elements.length
    for (let i = 0; i < elements.length; i++) {
      const elementDiv = document.querySelector(`[data-element-id="${elements[i].id}"]`)
      if (elementDiv) {
        const rect = elementDiv.getBoundingClientRect()
        const canvasRect = canvasRef.current.getBoundingClientRect()
        const elementY = rect.top - canvasRect.top
        if (dropY < elementY + rect.height / 2) {
          insertIndex = i
          break
        }
      }
    }
    return insertIndex
  }

  // Standard-Inhalte und Styles (gleich wie vorher)
  const getDefaultContent = (type) => {
    const defaults = {
      text: 'Hier steht Ihr Text. Klicken Sie zum Bearbeiten.',
      heading: 'Ihre Überschrift',
      button: 'Klicken Sie hier',
      image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Ihr+Bild',
      hero: {
        title: 'Willkommen auf unserer Website',
        subtitle: 'Hier beginnt Ihre Reise zu Erfolg',
        description: 'Entdecken Sie unsere einzigartigen Lösungen und Services',
        buttonText: 'Jetzt starten',
        backgroundImage: 'https://via.placeholder.com/1200x600/667eea/ffffff?text=Hero+Background'
      },
      card: {
        title: 'Karten-Titel',
        description: 'Hier steht die Beschreibung der Karte mit weiteren Details.',
        buttonText: 'Mehr erfahren',
        image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Karte'
      },
      testimonial