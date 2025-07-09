import React, { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Invoices from './pages/Invoices'
import ProfessionalEditor from './pages/ProfessionalEditor'

function App() {
  // State für die aktuelle Seite
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isEditorMode, setIsEditorMode] = useState(false)

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

  // Globaler State für Projekte (wird zwischen Seiten geteilt)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Fitness Studio Website",
      clientId: 1,
      client: "Max Mustermann",
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
      clientId: 2,
      client: "Anna Schmidt",
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
      clientId: 3,
      client: "Tech Startup",
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

  // Editor öffnen
  const openEditor = () => {
    setIsEditorMode(true)
  }

  // Editor schließen
  const closeEditor = () => {
    setIsEditorMode(false)
  }

  // Funktion um die richtige Seite zu zeigen
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard clients={clients} projects={projects} onOpenEditor={openEditor} />
      case 'clients':
        return <Clients clients={clients} setClients={setClients} />
      case 'projects':
        return <Projects clients={clients} projects={projects} setProjects={setProjects} onOpenEditor={openEditor} />
      case 'invoices':
        return <Invoices clients={clients} projects={projects} />
      case 'editor':
        return openEditor()
      case 'templates':
        return (
          <div>
            <h1 className="mb-6 text-3xl font-bold">Templates</h1>
            <div className="p-8 text-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Templates sind jetzt im Editor verfügbar!</p>
              <button
                onClick={openEditor}
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Editor öffnen
              </button>
            </div>
          </div>
        )
      default:
        return <Dashboard clients={clients} projects={projects} onOpenEditor={openEditor} />
    }
  }

  // Wenn Editor-Modus aktiv ist, zeige nur den Editor
  if (isEditorMode) {
    return <ProfessionalEditor onExit={closeEditor} />
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App