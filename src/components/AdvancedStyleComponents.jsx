import React, { useState } from 'react'

// Erweiterte Styling-Komponenten
export const ColorPicker = ({ label, value, onChange, showOpacity = false }) => {
  const [showPicker, setShowPicker] = useState(false)
  const [opacity, setOpacity] = useState(100)

  const presetColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280',
    '#1f2937', '#ffffff', '#000000'
  ]

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center space-x-2">
        <div
          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>
      
      {showPicker && (
        <div className="absolute z-10 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {presetColors.map((color) => (
              <div
                key={color}
                className="w-6 h-6 border border-gray-200 rounded cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color)
                  setShowPicker(false)
                }}
              />
            ))}
          </div>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 border border-gray-300 rounded"
          />
          {showOpacity && (
            <div className="mt-2">
              <label className="block mb-1 text-xs text-gray-500">Opazität</label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                className="w-full"
              />
              <div className="mt-1 text-xs text-gray-500">{opacity}%</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const GradientPicker = ({ label, value, onChange }) => {
  const [gradientType, setGradientType] = useState('linear')
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#8b5cf6')
  const [angle, setAngle] = useState(135)

  const presetGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  ]

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      
      {/* Preset Gradients */}
      <div className="grid grid-cols-4 gap-2">
        {presetGradients.map((gradient, index) => (
          <div
            key={index}
            className="w-full h-8 border border-gray-200 rounded cursor-pointer"
            style={{ background: gradient }}
            onClick={() => onChange(gradient)}
          />
        ))}
      </div>
      
      {/* Custom Gradient */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-xs rounded ${gradientType === 'linear' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setGradientType('linear')}
          >
            Linear
          </button>
          <button
            className={`px-3 py-1 text-xs rounded ${gradientType === 'radial' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setGradientType('radial')}
          >
            Radial
          </button>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block mb-1 text-xs text-gray-500">Farbe 1</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-8 border border-gray-300 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-xs text-gray-500">Farbe 2</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-8 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        {gradientType === 'linear' && (
          <div>
            <label className="block mb-1 text-xs text-gray-500">Winkel: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full"
            />
          </div>
        )}
        
        <button
          className="w-full px-3 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            const gradient = gradientType === 'linear' 
              ? `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`
              : `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`
            onChange(gradient)
          }}
        >
          Gradient anwenden
        </button>
      </div>
    </div>
  )
}

export const SpacingControl = ({ label, value, onChange, sides = ['top', 'right', 'bottom', 'left'] }) => {
  const [isLinked, setIsLinked] = useState(true)
  const [values, setValues] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  const handleChange = (side, newValue) => {
    if (isLinked) {
      const newValues = { top: newValue, right: newValue, bottom: newValue, left: newValue }
      setValues(newValues)
      onChange(`${newValue}px`)
    } else {
      const newValues = { ...values, [side]: newValue }
      setValues(newValues)
      onChange(`${newValues.top}px ${newValues.right}px ${newValues.bottom}px ${newValues.left}px`)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-600">{label}</label>
        <button
          className={`text-xs px-2 py-1 rounded ${isLinked ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsLinked(!isLinked)}
        >
          🔗
        </button>
      </div>
      
      {isLinked ? (
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={values.top}
            onChange={(e) => handleChange('top', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 text-xs text-gray-500">{values.top}px</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {sides.map((side) => (
            <div key={side}>
              <label className="block mb-1 text-xs text-gray-500 capitalize">{side}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={values[side]}
                onChange={(e) => handleChange(side, parseInt(e.target.value))}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const BorderControl = ({ value, onChange }) => {
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderWidth, setBorderWidth] = useState(1)
  const [borderColor, setBorderColor] = useState('#e5e7eb')

  const borderStyles = [
    'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'
  ]

  const updateBorder = () => {
    onChange(`${borderWidth}px ${borderStyle} ${borderColor}`)
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">Rahmen</label>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs text-gray-500">Stil</label>
          <select
            value={borderStyle}
            onChange={(e) => setBorderStyle(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {borderStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-xs text-gray-500">Breite</label>
          <input
            type="number"
            min="0"
            max="20"
            value={borderWidth}
            onChange={(e) => setBorderWidth(parseInt(e.target.value))}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1 text-xs text-gray-500">Farbe</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <button
        onClick={updateBorder}
        className="w-full px-3 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Rahmen anwenden
      </button>
    </div>
  )
}

export const ShadowControl = ({ value, onChange }) => {
  const [shadowType, setShadowType] = useState('box')
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(4)
  const [blur, setBlur] = useState(6)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(10)

  const presetShadows = [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.1)',
    '0 4px 6px rgba(0, 0, 0, 0.1)',
    '0 10px 25px rgba(0, 0, 0, 0.1)',
    '0 20px 40px rgba(0, 0, 0, 0.1)',
    '0 0 20px rgba(59, 130, 246, 0.3)',
    'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  ]

  const updateShadow = () => {
    const shadowColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100})`
    const shadow = shadowType === 'inset' 
      ? `inset ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`
      : `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`
    onChange(shadow)
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">Schatten</label>
      
      {/* Preset Shadows */}
      <div className="grid grid-cols-2 gap-2">
        {presetShadows.map((shadow, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full h-8 text-xs bg-white border border-gray-200 rounded cursor-pointer"
            style={{ boxShadow: shadow }}
            onClick={() => onChange(shadow)}
          >
            {shadow === 'none' ? 'Kein Schatten' : `Preset ${index}`}
          </div>
        ))}
      </div>
      
      {/* Custom Shadow */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-xs rounded ${shadowType === 'box' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShadowType('box')}
          >
            Außen
          </button>
          <button
            className={`px-3 py-1 text-xs rounded ${shadowType === 'inset' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShadowType('inset')}
          >
            Innen
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 text-xs text-gray-500">X-Offset</label>
            <input
              type="range"
              min="-20"
              max="20"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{offsetX}px</div>
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-500">Y-Offset</label>
            <input
              type="range"
              min="-20"
              max="20"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{offsetY}px</div>
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-500">Blur</label>
            <input
              type="range"
              min="0"
              max="50"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{blur}px</div>
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-500">Spread</label>
            <input
              type="range"
              min="-20"
              max="20"
              value={spread}
              onChange={(e) => setSpread(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{spread}px</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <div className="flex-1">
            <label className="block mb-1 text-xs text-gray-500">Opazität: {opacity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <button
          onClick={updateShadow}
          className="w-full px-3 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Schatten anwenden
        </button>
      </div>
    </div>
  )
}

export const AnimationControl = ({ value, onChange }) => {
  const [animationType, setAnimationType] = useState('none')
  const [duration, setDuration] = useState(0.6)
  const [delay, setDelay] = useState(0)
  const [easing, setEasing] = useState('ease')

  const animations = [
    { value: 'none', label: 'Keine Animation' },
    { value: 'fadeIn', label: 'Einblenden' },
    { value: 'fadeInUp', label: 'Von unten einblenden' },
    { value: 'fadeInDown', label: 'Von oben einblenden' },
    { value: 'fadeInLeft', label: 'Von links einblenden' },
    { value: 'fadeInRight', label: 'Von rechts einblenden' },
    { value: 'slideUp', label: 'Nach oben gleiten' },
    { value: 'slideDown', label: 'Nach unten gleiten' },
    { value: 'slideLeft', label: 'Nach links gleiten' },
    { value: 'slideRight', label: 'Nach rechts gleiten' },
    { value: 'zoomIn', label: 'Hineinzoomen' },
    { value: 'zoomOut', label: 'Herauszoomen' },
    { value: 'bounce', label: 'Hüpfen' },
    { value: 'pulse', label: 'Pulsieren' },
    { value: 'shake', label: 'Schütteln' },
    { value: 'rotate', label: 'Rotieren' }
  ]

  const easingTypes = [
    'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'
  ]

  const updateAnimation = () => {
    if (animationType === 'none') {
      onChange({ type: 'none' })
    } else {
      onChange({
        type: animationType,
        duration: duration,
        delay: delay,
        easing: easing
      })
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">Animation</label>
      
      <div>
        <label className="block mb-1 text-xs text-gray-500">Animationstyp</label>
        <select
          value={animationType}
          onChange={(e) => setAnimationType(e.target.value)}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {animations.map((anim) => (
            <option key={anim.value} value={anim.value}>{anim.label}</option>
          ))}
        </select>
      </div>
      
      {animationType !== 'none' && (
        <>
          <div>
            <label className="block mb-1 text-xs text-gray-500">Dauer: {duration}s</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-xs text-gray-500">Verzögerung: {delay}s</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={delay}
              onChange={(e) => setDelay(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-xs text-gray-500">Timing</label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {easingTypes.map((ease) => (
                <option key={ease} value={ease}>{ease}</option>
              ))}
            </select>
          </div>
        </>
      )}
      
      <button
        onClick={updateAnimation}
        className="w-full px-3 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Animation anwenden
      </button>
    </div>
  )
}

export const TypographyControl = ({ value, onChange }) => {
  const [fontFamily, setFontFamily] = useState('Inter')
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState(400)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [textAlign, setTextAlign] = useState('left')
  const [textTransform, setTextTransform] = useState('none')
  const [textDecoration, setTextDecoration] = useState('none')

  const fontFamilies = [
    'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
    'Verdana', 'Tahoma', 'Trebuchet MS', 'Courier New', 'Palatino'
  ]

  const fontWeights = [
    { value: 100, label: 'Thin' },
    { value: 200, label: 'Extra Light' },
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 600, label: 'Semi Bold' },
    { value: 700, label: 'Bold' },
    { value: 800, label: 'Extra Bold' },
    { value: 900, label: 'Black' }
  ]

  const textAlignments = ['left', 'center', 'right', 'justify']
  const textTransforms = ['none', 'uppercase', 'lowercase', 'capitalize']
  const textDecorations = ['none', 'underline', 'overline', 'line-through']

  const updateTypography = () => {
    onChange({
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
      textAlign: textAlign,
      textTransform: textTransform,
      textDecoration: textDecoration
    })
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">Typografie</label>
      
      <div>
        <label className="block mb-1 text-xs text-gray-500">Schriftart</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs text-gray-500">Größe: {fontSize}px</label>
          <input
            type="range"
            min="8"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-xs text-gray-500">Gewicht</label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(parseInt(e.target.value))}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {fontWeights.map((weight) => (
              <option key={weight.value} value={weight.value}>{weight.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs text-gray-500">Zeilenhöhe: {lineHeight}</label>
          <input
            type="range"
            min="0.8"
            max="3"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-xs text-gray-500">Buchstabenabstand: {letterSpacing}px</label>
          <input
            type="range"
            min="-2"
            max="5"
            step="0.1"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs text-gray-500">Ausrichtung</label>
          <select
            value={textAlign}
            onChange={(e) => setTextAlign(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {textAlignments.map((align) => (
              <option key={align} value={align}>{align}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-xs text-gray-500">Transformation</label>
          <select
            value={textTransform}
            onChange={(e) => setTextTransform(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {textTransforms.map((transform) => (
              <option key={transform} value={transform}>{transform}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block mb-1 text-xs text-gray-500">Dekoration</label>
        <select
          value={textDecoration}
          onChange={(e) => setTextDecoration(e.target.value)}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {textDecorations.map((decoration) => (
            <option key={decoration} value={decoration}>{decoration}</option>
          ))}
        </select>
      </div>
      
      <button
        onClick={updateTypography}
        className="w-full px-3 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Typografie anwenden
      </button>
    </div>
  )
}