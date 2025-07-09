import React, { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'

function App() {
  // State für die aktuelle Seite
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Globaler State für Kunden (wird zwischen Seiten geteilt)
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

  // Funktion um die richtige Seite zu zeigen
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard clients={clients} />
      case 'clients':
        return <Clients clients={clients} setClients={setClients} />
      case 'projects':
        return <Projects clients={clients} />
      case 'editor':
        return (
          <div>
            <h1 className="mb-6 text-3xl font-bold">Editor</h1>
            <div className="p-8 text-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Editor wird in Phase 3 implementiert</p>
            </div>
          </div>
        )
      case 'templates':
        return (
          <div>
            <h1 className="mb-6 text-3xl font-bold">Templates</h1>
            <div className="p-8 text-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Templates werden in Phase 4 implementiert</p>
            </div>
          </div>
        )
      case 'invoices':
        return (
          <div>
            <h1 className="mb-6 text-3xl font-bold">Rechnungen</h1>
            <div className="p-8 text-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Rechnungen werden in Phase 2.3 implementiert</p>
            </div>
          </div>
        )
      default:
        return <Dashboard clients={clients} />
    }
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App