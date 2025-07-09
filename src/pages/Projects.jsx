import React, { useState } from 'react'

const Projects = ({ clients }) => {
  // State für Projekte
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Fitness Studio Website",
      client: "Max Mustermann",
      clientId: 1,
      status: "In Arbeit",
      priority: "Hoch",
      deadline: "2024-12-31",
      budget: 2500,
      progress: 65,
      description: "Moderne Landing Page für Fitness Studio mit Terminbuchung",
      createdDate: "2024-01-15",
      updatedDate: "2024-01-20"
    },
    {
      id: 2,
      name: "Restaurant Landing Page",
      client: "Anna Schmidt",
      clientId: 2,
      status: "Review",
      priority: "Mittel",
      deadline: "2024-12-15",
      budget: 1800,
      progress: 90,
      description: "Elegante Website für Restaurant mit Online-Reservierung",
      createdDate: "2024-02-01",
      updatedDate: "2024-02-10"
    },
    {
      id: 3,
      name: "SaaS Landing Page",
      client: "Tech Startup",
      clientId: 3,
      status: "Fertig",
      priority: "Niedrig",
      deadline: "2024-11-30",
      budget: 3200,
      progress: 100,
      description: "Professionelle SaaS Landing Page mit Pricing-Sektion",
      createdDate: "2024-03-01",
      updatedDate: "2024-03-15"
    }
  ])

  // State für neues Projekt
  const [newProject, setNewProject] = useState({
    name: '',
    clientId: '',
    status: 'Geplant',
    priority: 'Mittel',
    deadline: '',
    budget: '',
    description: ''
  })

  // State für Modal
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Standardkunden falls keine übergeben werden
  const defaultClients = [
    { id: 1, name: "Max Mustermann" },
    { id: 2, name: "Anna Schmidt" },
    { id: 3, name: "Tech Startup" }
  ]

  const clientList = clients || defaultClients

  // Status-Farben
  const getStatusColor = (status) => {
    switch (status) {
      case 'Geplant': return 'bg-gray-600'
      case 'In Arbeit': return 'bg-blue-600'
      case 'Review': return 'bg-yellow-600'
      case 'Fertig': return 'bg-green-600'
      case 'Pausiert': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  // Prioritäts-Farben
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Hoch': return 'text-red-400'
      case 'Mittel': return 'text-yellow-400'
      case 'Niedrig': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  // Neues Projekt hinzufügen
  const addProject = () => {
    if (newProject.name && newProject.clientId && newProject.deadline) {
      const selectedClient = clientList.find(c => c.id === parseInt(newProject.clientId))
      const project = {
        id: projects.length + 1,
        ...newProject,
        client: selectedClient?.name || 'Unbekannt',
        progress: 0,
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0]
      }
      setProjects([...projects, project])
      setNewProject({
        name: '',
        clientId: '',
        status: 'Geplant',
        priority: 'Mittel',
        deadline: '',
        budget: '',
        description: ''
      })
      setShowModal(false)
    }
  }

  // Projekt löschen
  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  // Projekt-Status ändern
  const updateProjectStatus = (id, newStatus) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, status: newStatus, updatedDate: new Date().toISOString().split('T')[0] }
        : project
    ))
  }

  // Projekt-Details anzeigen
  const showProjectDetails = (project) => {
    setSelectedProject(project)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projekte verwalten</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Neues Projekt
        </button>
      </div>

      {/* Projekt-Statistiken */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamt Projekte</h3>
          <p className="text-2xl font-bold text-blue-400">{projects.length}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">In Arbeit</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {projects.filter(p => p.status === 'In Arbeit').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Fertig</h3>
          <p className="text-2xl font-bold text-green-400">
            {projects.filter(p => p.status === 'Fertig').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamt Budget</h3>
          <p className="text-2xl font-bold text-purple-400">
            €{projects.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Projekt-Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="p-6 bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Kunde:</span>
                <span className="text-white">{project.client}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Priorität:</span>
                <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Deadline:</span>
                <span className="text-white">{project.deadline}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Budget:</span>
                <span className="text-white">€{project.budget?.toLocaleString()}</span>
              </div>
              
              {/* Fortschrittsbalken */}
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-gray-400">Fortschritt</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-2 transition-all duration-300 bg-blue-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Aktionen */}
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => showProjectDetails(project)}
                className="flex-1 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Details
              </button>
              <select
                value={project.status}
                onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                className="flex-1 px-2 py-1 text-sm text-white bg-gray-700 rounded"
              >
                <option value="Geplant">Geplant</option>
                <option value="In Arbeit">In Arbeit</option>
                <option value="Review">Review</option>
                <option value="Fertig">Fertig</option>
                <option value="Pausiert">Pausiert</option>
              </select>
              <button
                onClick={() => deleteProject(project.id)}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal für neues Projekt */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">Neues Projekt erstellen</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Projektname *
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Landing Page für..."
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Kunde *
                </label>
                <select
                  value={newProject.clientId}
                  onChange={(e) => setNewProject({...newProject, clientId: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                >
                  <option value="">Kunde auswählen</option>
                  {clientList.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <option value="Geplant">Geplant</option>
                    <option value="In Arbeit">In Arbeit</option>
                    <option value="Review">Review</option>
                    <option value="Fertig">Fertig</option>
                    <option value="Pausiert">Pausiert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Priorität
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <option value="Niedrig">Niedrig</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Hoch">Hoch</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Budget (€)
                  </label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                    placeholder="2500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Beschreibung
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  rows="3"
                  placeholder="Kurze Beschreibung des Projekts..."
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={addProject}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projekt-Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedProject.name}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-300">Projektdetails</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kunde:</span>
                    <span className="text-white">{selectedProject.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priorität:</span>
                    <span className={`font-medium ${getPriorityColor(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="text-white">{selectedProject.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget:</span>
                    <span className="text-white">€{selectedProject.budget?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Erstellt:</span>
                    <span className="text-white">{selectedProject.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aktualisiert:</span>
                    <span className="text-white">{selectedProject.updatedDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 font-semibold text-gray-300">Fortschritt</h3>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-gray-400">Abgeschlossen</span>
                  <span className="text-white">{selectedProject.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full">
                  <div 
                    className="h-3 transition-all duration-300 bg-blue-600 rounded-full"
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {selectedProject.description && (
                <div>
                  <h3 className="mb-2 font-semibold text-gray-300">Beschreibung</h3>
                  <p className="text-sm text-gray-300">{selectedProject.description}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects