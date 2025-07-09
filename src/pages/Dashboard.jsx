import React from 'react'

const Dashboard = ({ clients = [], projects = [] }) => {
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
          <p className="text-2xl font-bold text-green-400">
            {projects.filter(p => p.status === 'In Arbeit').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Fertige Projekte</h3>
          <p className="text-2xl font-bold text-purple-400">
            {projects.filter(p => p.status === 'Fertig').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamt Budget</h3>
          <p className="text-2xl font-bold text-yellow-400">
            €{projects.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Letzte Projekte</h2>
        <div className="space-y-3">
          {projects.slice(-3).reverse().map((project) => (
            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <div>
                <h3 className="font-medium">{project.client} - {project.name}</h3>
                <p className="text-sm text-gray-400">Erstellt am {project.createdDate}</p>
              </div>
              <span className={`px-3 py-1 text-white text-sm rounded ${
                project.status === 'Fertig' ? 'bg-green-600' :
                project.status === 'In Arbeit' ? 'bg-yellow-600' :
                project.status === 'Review' ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                {project.status}
              </span>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="py-4 text-center text-gray-400">Noch keine Projekte vorhanden</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard