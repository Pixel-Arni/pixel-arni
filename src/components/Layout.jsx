import React from 'react'

const Layout = ({ children, currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Kunden', icon: '👥' },
    { id: 'projects', label: 'Projekte', icon: '🚀' },
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'invoices', label: 'Rechnungen', icon: '💰' }
  ]

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <h1 className="sidebar-title">Pixel Arni</h1>
          <p className="sidebar-subtitle">Landing Page Builder</p>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Footer */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Version 1.0.0
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            © 2024 Pixel Arni
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  )
}

export default Layout