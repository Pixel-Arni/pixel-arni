import React, { useState } from 'react'

const Projects = ({ clients, projects, setProjects }) => {
  const [newProject, setNewProject] = useState({
    name: '',
    clientId: '',
    status: 'Geplant',
    priority: 'Mittel',
    deadline: '',
    budget: '',
    description: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Standardkunden falls keine übergeben werden
  const defaultClients = [
    { id: 1, name: "Max Mustermann" },
    { id: 2, name: "Anna Schmidt" },
    { id: 3, name: "Tech Startup" }
  ]

  const clientList = clients || defaultClients

  // Status-Badge-Klassen
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Geplant': return 'badge'
      case 'In Arbeit': return 'badge-active'
      case 'Review': return 'badge-review'
      case 'Fertig': return 'badge-active'
      case 'Pausiert': return 'badge-danger'
      default: return 'badge'
    }
  }

  // Prioritäts-Farben
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Hoch': return '#ef4444'
      case 'Mittel': return 'var(--accent)'
      case 'Niedrig': return '#22c55e'
      default: return 'var(--text-secondary)'
    }
  }

  // Neues Projekt hinzufügen
  const addProject = () => {
    if (newProject.name && newProject.clientId && newProject.deadline) {
      const selectedClient = clientList.find(c => c.id === parseInt(newProject.clientId))
      const project = {
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        ...newProject,
        clientId: parseInt(newProject.clientId),
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

  const stats = [
    { label: 'Gesamt Projekte', value: projects.length.toString() },
    { label: 'In Arbeit', value: projects.filter(p => p.status === 'In Arbeit').length.toString() },
    { label: 'Fertig', value: projects.filter(p => p.status === 'Fertig').length.toString() },
    { label: 'Gesamt Budget', value: `€${projects.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString()}` }
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Projekte verwalten</h1>
          <p className="page-description">Übersicht aller Projekte und deren Status</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Neues Projekt
        </button>
      </div>

      {/* Stats */}
      <div className="section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="card stat-card">
              <div className="stat-number">{stat.value}</div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="section">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', margin: '0' }}>
                  {project.name}
                </h3>
                <span className={getStatusBadge(project.status)}>
                  {project.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Kunde:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{project.client}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Priorität:</span>
                  <span style={{ color: getPriorityColor(project.priority), fontWeight: '600' }}>
                    {project.priority}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Deadline:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{project.deadline}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Budget:</span>
                  <span style={{ color: 'var(--text-primary)' }}>€{project.budget?.toLocaleString()}</span>
                </div>
              </div>

              {/* Fortschrittsbalken */}
              <div className="progress-container">
                <div className="progress-label">
                  <span>Fortschritt</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Aktionen */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => showProjectDetails(project)}
                  className="btn btn-primary"
                  style={{ flex: '1', fontSize: '12px', padding: '8px 12px' }}
                >
                  Details
                </button>
                <select
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  style={{
                    flex: '1',
                    fontSize: '12px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="Geplant">Geplant</option>
                  <option value="In Arbeit">In Arbeit</option>
                  <option value="Review">Review</option>
                  <option value="Fertig">Fertig</option>
                  <option value="Pausiert">Pausiert</option>
                </select>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="btn"
                  style={{
                    fontSize: '12px',
                    padding: '8px 12px',
                    backgroundColor: '#ef4444',
                    color: 'white'
                  }}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal für neues Projekt */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '32px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid var(--border)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
              Neues Projekt erstellen
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Projektname *
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="Landing Page für..."
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Kunde *
                </label>
                <select
                  value={newProject.clientId}
                  onChange={(e) => setNewProject({...newProject, clientId: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Kunde auswählen</option>
                  {clientList.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                  >
                    <option value="Geplant">Geplant</option>
                    <option value="In Arbeit">In Arbeit</option>
                    <option value="Review">Review</option>
                    <option value="Fertig">Fertig</option>
                    <option value="Pausiert">Pausiert</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Priorität
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                  >
                    <option value="Niedrig">Niedrig</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Hoch">Hoch</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Budget (€)
                  </label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="2500"
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Beschreibung
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                  placeholder="Kurze Beschreibung des Projekts..."
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Abbrechen
              </button>
              <button
                onClick={addProject}
                className="btn btn-primary"
              >
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projekt-Details Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '32px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0' }}>
                {selectedProject.name}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Projektdetails
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Kunde:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{selectedProject.client}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                    <span className={getStatusBadge(selectedProject.status)}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Priorität:</span>
                    <span style={{ color: getPriorityColor(selectedProject.priority), fontWeight: '600' }}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Deadline:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{selectedProject.deadline}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Budget:</span>
                    <span style={{ color: 'var(--text-primary)' }}>€{selectedProject.budget?.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Erstellt:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{selectedProject.createdDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Aktualisiert:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{selectedProject.updatedDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Fortschritt
                </h3>
                <div className="progress-container">
                  <div className="progress-label">
                    <span>Abgeschlossen</span>
                    <span>{selectedProject.progress}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: '12px' }}>
                    <div 
                      className="progress-fill"
                      style={{ width: `${selectedProject.progress}%`, height: '12px' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {selectedProject.description && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Beschreibung
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {selectedProject.description}
                  </p>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn btn-secondary"
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