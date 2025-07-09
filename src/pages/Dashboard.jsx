import React from 'react'

const Dashboard = ({ clients = [] }) => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Aktive Kunden</h3>
          <p className="text-2xl font-bold text-blue-400">
            {clients.filter(c => c.status === 'Aktiv').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Laufende Projekte</h3>
          <p className="text-2xl font-bold text-green-400">8</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Fertige Landing Pages</h3>
          <p className="text-2xl font-bold text-purple-400">24</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Monatsumsatz</h3>
          <p className="text-2xl font-bold text-yellow-400">€4,800</p>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Letzte Projekte</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Max Mustermann - Fitness Studio</h3>
              <p className="text-sm text-gray-400">Erstellt vor 2 Tagen</p>
            </div>
            <span className="px-3 py-1 text-sm text-white bg-green-600 rounded">Fertig</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Anna Schmidt - Restaurant</h3>
              <p className="text-sm text-gray-400">Erstellt vor 5 Tagen</p>
            </div>
            <span className="px-3 py-1 text-sm text-white bg-yellow-600 rounded">In Arbeit</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div>
              <h3 className="font-medium">Tech Startup - SaaS Landing</h3>
              <p className="text-sm text-gray-400">Erstellt vor 1 Woche</p>
            </div>
            <span className="px-3 py-1 text-sm text-white bg-blue-600 rounded">Review</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard