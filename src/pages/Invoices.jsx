import React, { useState } from 'react'

const Invoices = ({ clients, projects }) => {
  // State für Rechnungen
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      clientId: 1,
      clientName: "Max Mustermann",
      projectId: 1,
      projectName: "Fitness Studio Website",
      amount: 2500,
      status: "Bezahlt",
      dueDate: "2024-01-31",
      issueDate: "2024-01-15",
      paymentDate: "2024-01-25",
      description: "Landing Page Entwicklung - Fitness Studio",
      items: [
        { name: "Design & Entwicklung", quantity: 1, price: 2000 },
        { name: "Responsive Optimierung", quantity: 1, price: 500 }
      ]
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      clientId: 2,
      clientName: "Anna Schmidt",
      projectId: 2,
      projectName: "Restaurant Landing Page",
      amount: 1800,
      status: "Offen",
      dueDate: "2024-02-28",
      issueDate: "2024-02-01",
      paymentDate: null,
      description: "Restaurant Website mit Online-Reservierung",
      items: [
        { name: "Design & Entwicklung", quantity: 1, price: 1500 },
        { name: "Reservierungssystem", quantity: 1, price: 300 }
      ]
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      clientId: 3,
      clientName: "Tech Startup",
      projectId: 3,
      projectName: "SaaS Landing Page",
      amount: 3200,
      status: "Überfällig",
      dueDate: "2024-03-15",
      issueDate: "2024-03-01",
      paymentDate: null,
      description: "SaaS Landing Page mit Pricing-Sektion",
      items: [
        { name: "Design & Entwicklung", quantity: 1, price: 2500 },
        { name: "Pricing-Sektion", quantity: 1, price: 400 },
        { name: "Integration", quantity: 1, price: 300 }
      ]
    }
  ])

  // State für neue Rechnung
  const [newInvoice, setNewInvoice] = useState({
    clientId: '',
    projectId: '',
    amount: '',
    dueDate: '',
    description: '',
    items: [{ name: '', quantity: 1, price: 0 }]
  })

  // State für Modals
  const [showModal, setShowModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  // Standardkunden und Projekte falls keine übergeben werden
  const defaultClients = [
    { id: 1, name: "Max Mustermann" },
    { id: 2, name: "Anna Schmidt" },
    { id: 3, name: "Tech Startup" }
  ]

  const defaultProjects = [
    { id: 1, name: "Fitness Studio Website", clientId: 1 },
    { id: 2, name: "Restaurant Landing Page", clientId: 2 },
    { id: 3, name: "SaaS Landing Page", clientId: 3 }
  ]

  const clientList = clients || defaultClients
  const projectList = projects || defaultProjects

  // Status-Badge-Klassen
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Entwurf': return 'badge'
      case 'Versendet': return 'badge-active'
      case 'Offen': return 'badge-review'
      case 'Bezahlt': return 'badge-active'
      case 'Überfällig': return 'badge-danger'
      case 'Storniert': return 'badge'
      default: return 'badge'
    }
  }

  // Nächste Rechnungsnummer generieren
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear()
    const nextNumber = String(invoices.length + 1).padStart(3, '0')
    return `INV-${year}-${nextNumber}`
  }

  // Artikel hinzufügen
  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { name: '', quantity: 1, price: 0 }]
    })
  }

  // Artikel entfernen
  const removeItem = (index) => {
    if (newInvoice.items.length > 1) {
      const items = newInvoice.items.filter((_, i) => i !== index)
      setNewInvoice({ ...newInvoice, items })
    }
  }

  // Artikel aktualisieren
  const updateItem = (index, field, value) => {
    const items = newInvoice.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
    setNewInvoice({ ...newInvoice, items })
  }

  // Gesamtbetrag berechnen
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  // Neue Rechnung erstellen
  const createInvoice = () => {
    if (newInvoice.clientId && newInvoice.projectId && newInvoice.dueDate) {
      const selectedClient = clientList.find(c => c.id === parseInt(newInvoice.clientId))
      const selectedProject = projectList.find(p => p.id === parseInt(newInvoice.projectId))
      
      const invoice = {
        id: invoices.length + 1,
        invoiceNumber: generateInvoiceNumber(),
        clientId: parseInt(newInvoice.clientId),
        clientName: selectedClient?.name || 'Unbekannt',
        projectId: parseInt(newInvoice.projectId),
        projectName: selectedProject?.name || 'Unbekannt',
        amount: calculateTotal(newInvoice.items),
        status: 'Entwurf',
        dueDate: newInvoice.dueDate,
        issueDate: new Date().toISOString().split('T')[0],
        paymentDate: null,
        description: newInvoice.description,
        items: newInvoice.items
      }
      
      setInvoices([...invoices, invoice])
      setNewInvoice({
        clientId: '',
        projectId: '',
        amount: '',
        dueDate: '',
        description: '',
        items: [{ name: '', quantity: 1, price: 0 }]
      })
      setShowModal(false)
    }
  }

  // Rechnung löschen
  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id))
  }

  // Rechnungsstatus ändern
  const updateInvoiceStatus = (id, newStatus) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id 
        ? { 
            ...invoice, 
            status: newStatus,
            paymentDate: newStatus === 'Bezahlt' ? new Date().toISOString().split('T')[0] : null
          }
        : invoice
    ))
  }

  // Projekte nach Kunde filtern
  const getProjectsByClient = (clientId) => {
    return projectList.filter(project => project.clientId === parseInt(clientId))
  }

  const stats = [
    { label: 'Gesamt Rechnungen', value: invoices.length.toString() },
    { label: 'Offene Rechnungen', value: invoices.filter(i => i.status === 'Offen').length.toString() },
    { label: 'Überfällige', value: invoices.filter(i => i.status === 'Überfällig').length.toString() },
    { label: 'Gesamt Umsatz', value: `€${invoices.filter(i => i.status === 'Bezahlt').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}` }
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Rechnungen verwalten</h1>
          <p className="page-description">Übersicht aller Rechnungen und deren Status</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Neue Rechnung
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

      {/* Invoices Table */}
      <div className="section">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 0 24px' }}>
            <h2 className="section-title" style={{ margin: '0 0 24px 0' }}>Rechnungsübersicht</h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    RECHNUNGSNUMMER
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    KUNDE
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    PROJEKT
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    BETRAG
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    STATUS
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    FÄLLIGKEITSDATUM
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    AKTIONEN
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {invoice.invoiceNumber}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {invoice.clientName}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {invoice.projectName}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        €{invoice.amount.toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span className={`badge ${getStatusBadge(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {invoice.dueDate}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          Details
                        </button>
                        <select
                          value={invoice.status}
                          onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                          style={{
                            fontSize: '12px',
                            padding: '6px 12px',
                            backgroundColor: 'var(--bg-tertiary)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <option value="Entwurf">Entwurf</option>
                          <option value="Versendet">Versendet</option>
                          <option value="Offen">Offen</option>
                          <option value="Bezahlt">Bezahlt</option>
                          <option value="Überfällig">Überfällig</option>
                          <option value="Storniert">Storniert</option>
                        </select>
                        <button 
                          className="btn" 
                          style={{ 
                            fontSize: '12px', 
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white'
                          }}
                          onClick={() => deleteInvoice(invoice.id)}
                        >
                          Löschen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal für neue Rechnung */}
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
            maxWidth: '800px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid var(--border)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
              Neue Rechnung erstellen
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Kunde *
                  </label>
                  <select
                    value={newInvoice.clientId}
                    onChange={(e) => setNewInvoice({...newInvoice, clientId: e.target.value, projectId: ''})}
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
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Projekt *
                  </label>
                  <select
                    value={newInvoice.projectId}
                    onChange={(e) => setNewInvoice({...newInvoice, projectId: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    disabled={!newInvoice.clientId}
                  >
                    <option value="">Projekt auswählen</option>
                    {getProjectsByClient(newInvoice.clientId).map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Fälligkeitsdatum *
                </label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
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
                  Beschreibung
                </label>
                <textarea
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    resize: 'vertical',
                    minHeight: '60px'
                  }}
                  placeholder="Kurze Beschreibung der Rechnung..."
                />
              </div>
              
              {/* Artikel */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Artikel *
                  </label>
                  <button
                    onClick={addItem}
                    className="btn btn-primary"
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    + Artikel hinzufügen
                  </button>
                </div>
                
                {newInvoice.items.map((item, index) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '5fr 2fr 3fr 1fr 1fr', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        fontSize: '14px'
                      }}
                      placeholder="Artikel-Name"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        fontSize: '14px'
                      }}
                      min="1"
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text-primary)',
                        fontSize: '14px'
                      }}
                      step="0.01"
                      min="0"
                    />
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                      €{(item.quantity * item.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: newInvoice.items.length === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                      }}
                      disabled={newInvoice.items.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <div style={{ textAlign: 'right', marginTop: '16px', padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    Gesamt: €{calculateTotal(newInvoice.items).toFixed(2)}
                  </span>
                </div>
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
                onClick={createInvoice}
                className="btn btn-primary"
              >
                Rechnung erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rechnungsdetails Modal */}
      {selectedInvoice && (
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
            maxWidth: '800px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0' }}>
                {selectedInvoice.invoiceNumber}
              </h2>
              <button
                onClick={() => setSelectedInvoice(null)}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Rechnungsdetails
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Rechnungsnummer:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.invoiceNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Ausstellungsdatum:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.issueDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Fälligkeitsdatum:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.dueDate}</span>
                    </div>
                    {selectedInvoice.paymentDate && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Zahlungsdatum:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.paymentDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Kunde & Projekt
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Kunde:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.clientName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Projekt:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedInvoice.projectName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                      <span className={`badge ${getStatusBadge(selectedInvoice.status)}`}>
                        {selectedInvoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedInvoice.description && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Beschreibung
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {selectedInvoice.description}
                  </p>
                </div>
              )}
              
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Artikel
                </h3>
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '8px 0', 
                      borderBottom: index < selectedInvoice.items.length - 1 ? '1px solid var(--border)' : 'none' 
                    }}>
                      <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.quantity} × €{item.price.toFixed(2)}</span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>€{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingTop: '16px', 
                    marginTop: '16px', 
                    borderTop: '1px solid var(--border)' 
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Gesamt:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>€{selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="btn btn-secondary"
              >
                Schließen
              </button>
              <button
                className="btn btn-primary"
              >
                Als PDF exportieren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoices