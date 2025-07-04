import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Aktive Kunden</h3>
          <p className="text-2xl font-bold text-blue-400">12</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Laufende Projekte</h3>
          <p className="text-2xl font-bold text-green-400">8</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Fertige Landing Pages</h3>
          <p className="text-2xl font-bold text-purple-400">24</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Monatsumsatz</h3>
          <p className="text-2xl font-bold text-yellow-400">€4,800</p>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Letzte Projekte</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Max Mustermann - Fitness Studio</h3>
              <p className="text-gray-400 text-sm">Erstellt vor 2 Tagen</p>
            </div>
            <span className="px-3 py-1 bg-green-600 text-white text-sm rounded">Fertig</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Anna Schmidt - Restaurant</h3>
              <p className="text-gray-400 text-sm">Erstellt vor 5 Tagen</p>
            </div>
            <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded">In Arbeit</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Tech Startup - SaaS Landing</h3>
              <p className="text-gray-400 text-sm">Erstellt vor 1 Woche</p>
            </div>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">Review</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard