import React from 'react'

const Dashboard = ({ setCurrentPage }) => {
  const stats = [
    { label: 'Gesamtkunden', value: '2' },
    { label: 'Aktive Projekte', value: '1' },
    { label: 'Abgeschlossene Projekte', value: '0' },
    { label: 'Gesamtumsatz', value: '7.500€' }
  ]

  const quickActions = [
    {
      title: 'Landing Page erstellen',
      description: 'Neues Design im Editor',
      action: () => setCurrentPage('editor')
    },
    {
      title: 'Neuer Kunde',
      description: 'Kunde hinzufügen',
      action: () => setCurrentPage('clients')
    },
    {
      title: 'Neues Projekt',
      description: 'Projekt erstellen',
      action: () => setCurrentPage('projects')
    },
    {
      title: 'Rechnung erstellen',
      description: 'Neue Rechnung',
      action: () => setCurrentPage('invoices')
    }
  ]

  const recentProjects = [
    {
      name: 'Website Relaunch',
      client: 'Max Mustermann',
      status: 'In Arbeit',
      progress: 65,
      budget: '5000€',
      badgeClass: 'badge-active'
    },
    {
      name: 'Landing Page Kampagne',
      client: 'Anna Schmidt',
      status: 'Review',
      progress: 90,
      budget: '2500€',
      badgeClass: 'badge-review'
    }
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Willkommen zurück! Hier ist dein Überblick.</p>
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

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">Schnellaktionen</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="card action-card"
              onClick={action.action}
            >
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="section">
        <h2 className="section-title">Neueste Projekte</h2>
        <div className="projects-grid">
          {recentProjects.map((project, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
                    {project.client}
                  </p>
                </div>
                <span className={`badge ${project.badgeClass}`}>
                  {project.status}
                </span>
              </div>

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

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingTop: '16px', 
                borderTop: '1px solid var(--border)' 
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Budget: {project.budget}
                </span>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="section">
        <div className="card" style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          border: '2px solid var(--accent)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
            Neuer Landing Page Editor
          </h3>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', margin: '0 0 24px 0' }}>
            Erstellen Sie professionelle Landing Pages mit unserem neuen Drag & Drop Editor. 
            Einfach, schnell und ohne Programmierung.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentPage('editor')}
          >
            Jetzt ausprobieren
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard