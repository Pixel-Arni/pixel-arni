import React from 'react'

const Dashboard = ({ clients, projects, onOpenEditor }) => {
  // Berechnungen für Statistiken
  const totalClients = clients.length
  const activeProjects = projects.filter(p => p.status === 'In Arbeit').length
  const completedProjects = projects.filter(p => p.status === 'Fertig').length
  const totalRevenue = projects.reduce((sum, p) => sum + p.budget, 0)

  // Neueste Projekte
  const recentProjects = projects.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={onOpenEditor}
          className="px-6 py-3 font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          🎨 Neues Design erstellen
        </button>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamtkunden</h3>
          <p className="text-2xl font-bold text-blue-400">{totalClients}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Aktive Projekte</h3>
          <p className="text-2xl font-bold text-green-400">{activeProjects}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Abgeschlossene Projekte</h3>
          <p className="text-2xl font-bold text-purple-400">{completedProjects}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamtumsatz</h3>
          <p className="text-2xl font-bold text-yellow-400">{totalRevenue.toLocaleString()}€</p>
        </div>
      </div>

      {/* Schnellaktionen */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Schnellaktionen</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={onOpenEditor}
            className="p-4 text-left transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <div className="mb-2 text-2xl">🎨</div>
            <div className="font-medium">Landing Page erstellen</div>
            <div className="text-sm opacity-75">Neues Design im Editor</div>
          </button>
          <button className="p-4 text-left transition-colors bg-green-600 rounded-lg hover:bg-green-700">
            <div className="mb-2 text-2xl">👥</div>
            <div className="font-medium">Neuer Kunde</div>
            <div className="text-sm opacity-75">Kunde hinzufügen</div>
          </button>
          <button className="p-4 text-left transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
            <div className="mb-2 text-2xl">📊</div>
            <div className="font-medium">Neues Projekt</div>
            <div className="text-sm opacity-75">Projekt erstellen</div>
          </button>
          <button className="p-4 text-left transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700">
            <div className="mb-2 text-2xl">🧾</div>
            <div className="font-medium">Rechnung erstellen</div>
            <div className="text-sm opacity-75">Neue Rechnung</div>
          </button>
        </div>
      </div>

      {/* Neueste Projekte */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Neueste Projekte</h2>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.client}</p>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs text-white ${
                  project.status === 'In Arbeit' ? 'bg-blue-600' :
                  project.status === 'Review' ? 'bg-yellow-600' :
                  project.status === 'Fertig' ? 'bg-green-600' :
                  'bg-gray-600'
                }`}>
                  {project.status}
                </div>
                <p className="mt-1 text-sm text-gray-400">{project.budget}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Teaser */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-blue-800 to-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-xl font-bold">🚀 Neuer Landing Page Editor</h2>
            <p className="mb-4 text-gray-200">
              Erstellen Sie professionelle Landing Pages mit unserem neuen Drag & Drop Editor.
              Einfach, schnell und ohne Programmierung!
            </p>
            <div className="flex space-x-4 text-sm text-gray-300">
              <span>✨ Drag & Drop</span>
              <span>🎨 Vorgefertigte Komponenten</span>
              <span>📱 Responsive Design</span>
              <span>⚡ Live Vorschau</span>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={onOpenEditor}
              className="px-6 py-3 font-medium text-blue-800 transition-colors bg-white rounded-lg hover:bg-gray-100"
            >
              Jetzt ausprobieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard