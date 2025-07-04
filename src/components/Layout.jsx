import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">Pixel Arni</h1>
          <p className="text-gray-400 text-sm">Landing Page Builder</p>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2 rounded bg-blue-600 text-white">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300">
            Kunden
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300">
            Projekte
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300">
            Editor
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300">
            Templates
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300">
            Rechnungen
          </a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}

export default Layout