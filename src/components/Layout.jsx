import React from 'react'

const Layout = ({ children, currentPage, setCurrentPage }) => {
  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Kunden', icon: '👥' },
    { id: 'projects', label: 'Projekte', icon: '🚀' },
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'invoices', label: 'Rechnungen', icon: '💰' }
  ]

  return (
    <div className="flex h-screen text-white bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 p-6 bg-gray-800">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">Pixel Arni</h1>
          <p className="text-sm text-gray-400">Landing Page Builder</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer der Sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Version 1.0.0
            </div>
            <div className="mt-1 text-xs text-gray-400">
              © 2024 Pixel Arni
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout