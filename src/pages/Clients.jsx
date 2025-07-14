import React, { useState } from 'react'

const Clients = ({ clients, setClients }) => {
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const addClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: Math.max(...clients.map(c => c.id), 0) + 1,
        ...newClient,
        status: "Aktiv",
        createdDate: new Date().toISOString().split('T')[0]
      }
      setClients([...clients, client])
      setNewClient({ name: '', email: '', phone: '', company: '' })
      setShowModal(false)
    }
  }

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id))
  }

  const startEditClient = (client) => {
    setEditingClient({...client})
    setShowEditModal(true)
  }

  const updateClient = () => {
    if (editingClient.name && editingClient.email) {
      setClients(clients.map(client => 
        client.id === editingClient.id ? editingClient : client
      ))
      setEditingClient(null)
      setShowEditModal(false)
    }
  }

  const stats = [
    { label: 'Gesamtkunden', value: clients.length.toString() },
    { label: 'Aktive Kunden', value: clients.filter(c => c.status === 'Aktiv').length.toString() },
    { label: 'Neue diese Woche', value: '2' }
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Kunden verwalten</h1>
          <p className="page-description">Übersicht aller Kunden und deren Informationen</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Neuer Kunde
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

      {/* Clients Table */}
      <div className="section">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 0 24px' }}>
            <h2 className="section-title" style={{ margin: '0 0 24px 0' }}>Kundenliste</h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    NAME
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    UNTERNEHMEN
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    KONTAKT
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    STATUS
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    ERSTELLT
                  </th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    AKTIONEN
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {client.name}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {client.company}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                        {client.email}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {client.phone}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span className="badge badge-active">{client.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {client.createdDate}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => startEditClient(client)}
                        >
                          Bearbeiten
                        </button>
                        <button 
                          className="btn" 
                          style={{ 
                            fontSize: '12px', 
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white'
                          }}
                          onClick={() => deleteClient(client.id)}
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

      {/* Modal zum Hinzufügen neuer Kunden */}
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
            border: '1px solid var(--border)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
              Neuen Kunden hinzufügen
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="Kundenname"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="kunde@example.com"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="+49 123 456789"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Unternehmen
                </label>
                <input
                  type="text"
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="Firmenname"
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
                onClick={addClient}
                className="btn btn-primary"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal zum Bearbeiten von Kunden */}
      {showEditModal && editingClient && (
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
            border: '1px solid var(--border)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
              Kunde bearbeiten
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="Kundenname"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="kunde@example.com"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="+49 123 456789"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Unternehmen
                </label>
                <input
                  type="text"
                  value={editingClient.company}
                  onChange={(e) => setEditingClient({...editingClient, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                  placeholder="Firmenname"
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingClient(null)
                }}
                className="btn btn-secondary"
              >
                Abbrechen
              </button>
              <button
                onClick={updateClient}
                className="btn btn-primary"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients