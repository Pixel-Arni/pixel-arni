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

  // Status-Farben
  const getStatusColor = (status) => {
    switch (status) {
      case 'Entwurf': return 'bg-gray-600'
      case 'Versendet': return 'bg-blue-600'
      case 'Offen': return 'bg-yellow-600'
      case 'Bezahlt': return 'bg-green-600'
      case 'Überfällig': return 'bg-red-600'
      case 'Storniert': return 'bg-gray-500'
      default: return 'bg-gray-600'
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rechnungen verwalten</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Neue Rechnung
        </button>
      </div>

      {/* Rechnungsstatistiken */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamt Rechnungen</h3>
          <p className="text-2xl font-bold text-blue-400">{invoices.length}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Offene Rechnungen</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {invoices.filter(i => i.status === 'Offen').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Überfällige</h3>
          <p className="text-2xl font-bold text-red-400">
            {invoices.filter(i => i.status === 'Überfällig').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamt Umsatz</h3>
          <p className="text-2xl font-bold text-green-400">
            €{invoices.filter(i => i.status === 'Bezahlt').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Rechnungstabelle */}
      <div className="overflow-hidden bg-gray-800 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Rechnungsnummer
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Kunde
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Projekt
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Betrag
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Fälligkeitsdatum
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{invoice.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{invoice.projectName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">€{invoice.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Details
                      </button>
                      <select
                        value={invoice.status}
                        onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                        className="px-2 py-1 text-xs text-white bg-gray-700 rounded"
                      >
                        <option value="Entwurf">Entwurf</option>
                        <option value="Versendet">Versendet</option>
                        <option value="Offen">Offen</option>
                        <option value="Bezahlt">Bezahlt</option>
                        <option value="Überfällig">Überfällig</option>
                        <option value="Storniert">Storniert</option>
                      </select>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
                        className="text-red-400 hover:text-red-300"
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

      {/* Modal für neue Rechnung */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">Neue Rechnung erstellen</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Kunde *
                  </label>
                  <select
                    value={newInvoice.clientId}
                    onChange={(e) => setNewInvoice({...newInvoice, clientId: e.target.value, projectId: ''})}
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
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Projekt *
                  </label>
                  <select
                    value={newInvoice.projectId}
                    onChange={(e) => setNewInvoice({...newInvoice, projectId: e.target.value})}
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
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
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Fälligkeitsdatum *
                </label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Beschreibung
                </label>
                <textarea
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  rows="2"
                  placeholder="Kurze Beschreibung der Rechnung..."
                />
              </div>
              
              {/* Artikel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Artikel *
                  </label>
                  <button
                    onClick={addItem}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    + Artikel hinzufügen
                  </button>
                </div>
                
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                        placeholder="Artikel-Name"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                        min="1"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-gray-300">€{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                    <div className="col-span-1">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300"
                        disabled={newInvoice.items.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-2 text-right">
                  <span className="text-lg font-semibold text-white">
                    Gesamt: €{calculateTotal(newInvoice.items).toFixed(2)}
                  </span>
                </div>
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
                onClick={createInvoice}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Rechnung erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rechnungsdetails Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedInvoice.invoiceNumber}</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-300">Rechnungsdetails</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rechnungsnummer:</span>
                      <span className="text-white">{selectedInvoice.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ausstellungsdatum:</span>
                      <span className="text-white">{selectedInvoice.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fälligkeitsdatum:</span>
                      <span className="text-white">{selectedInvoice.dueDate}</span>
                    </div>
                    {selectedInvoice.paymentDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Zahlungsdatum:</span>
                        <span className="text-white">{selectedInvoice.paymentDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 font-semibold text-gray-300">Kunde & Projekt</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kunde:</span>
                      <span className="text-white">{selectedInvoice.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Projekt:</span>
                      <span className="text-white">{selectedInvoice.projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(selectedInvoice.status)}`}>
                        {selectedInvoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedInvoice.description && (
                <div>
                  <h3 className="mb-2 font-semibold text-gray-300">Beschreibung</h3>
                  <p className="text-sm text-gray-300">{selectedInvoice.description}</p>
                </div>
              )}
              
              <div>
                <h3 className="mb-2 font-semibold text-gray-300">Artikel</h3>
                <div className="p-4 bg-gray-700 rounded-lg">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0">
                      <span className="text-white">{item.name}</span>
                      <span className="text-gray-300">{item.quantity} × €{item.price.toFixed(2)}</span>
                      <span className="font-medium text-white">€{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-600">
                    <span className="text-lg font-semibold text-white">Gesamt:</span>
                    <span className="text-lg font-bold text-white">€{selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Schließen
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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