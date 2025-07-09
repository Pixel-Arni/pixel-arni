import React, { useState } from 'react'

const Clients = () => {
  // State für Clients verwalten
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Max Mustermann",
      email: "max@example.com",
      phone: "+49 123 456789",
      company: "Mustermann GmbH",
      status: "Aktiv",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Anna Schmidt",
      email: "anna@restaurant.de",
      phone: "+49 987 654321",
      company: "Restaurant Schmidt",
      status: "Aktiv",
      createdDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Tech Startup",
      email: "info@techstartup.com",
      phone: "+49 555 123456",
      company: "TechStart Solutions",
      status: "Inaktiv",
      createdDate: "2024-03-10"
    }
  ])

  // State für neuen Client
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  // State für Modal (Popup zum Hinzufügen)
  const [showModal, setShowModal] = useState(false)

  // Funktion zum Hinzufügen eines neuen Clients
  const addClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: clients.length + 1,
        ...newClient,
        status: "Aktiv",
        createdDate: new Date().toISOString().split('T')[0]
      }
      setClients([...clients, client])
      setNewClient({ name: '', email: '', phone: '', company: '' })
      setShowModal(false)
    }
  }

  // Funktion zum Löschen eines Clients
  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Kunden verwalten</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Neuer Kunde
        </button>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Gesamtkunden</h3>
          <p className="text-2xl font-bold text-blue-400">{clients.length}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Aktive Kunden</h3>
          <p className="text-2xl font-bold text-green-400">
            {clients.filter(c => c.status === 'Aktiv').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-sm text-gray-400">Neue diese Woche</h3>
          <p className="text-2xl font-bold text-purple-400">2</p>
        </div>
      </div>

      {/* Kunden-Tabelle */}
      <div className="overflow-hidden bg-gray-800 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Unternehmen
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Kontakt
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Erstellt
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{client.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{client.email}</div>
                    <div className="text-xs text-gray-400">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      client.status === 'Aktiv' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    {client.createdDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="ml-2 text-red-400 hover:text-red-300"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal zum Hinzufügen neuer Kunden */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Neuen Kunden hinzufügen</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Name *
                </label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Kundenname"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="kunde@example.com"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="+49 123 456789"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Unternehmen
                </label>
                <input
                  type="text"
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  placeholder="Firmenname"
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
                onClick={addClient}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients