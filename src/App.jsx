import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Invoices from './pages/Invoices'
import ProfessionalEditor from './pages/ProfessionalEditor'
// import TemplateSystem from './components/TemplateSystem' ← DIESE ZEILE AUSKOMMENTIEREN

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  // State für Kunden (später in Datenbank)
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Max Mustermann',
      email: 'max@mustermann.de',
      phone: '+49 123 456789',
      company: 'Mustermann GmbH',
      status: 'Aktiv',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      email: 'anna@schmidt.de',
      phone: '+49 987 654321',
      company: 'Schmidt & Co',
      status: 'Aktiv',
      createdDate: '2024-02-20'
    }
  ])

  // State für Projekte (später in Datenbank)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Relaunch',
      client: 'Max Mustermann',
      clientId: 1,
      status: 'In Arbeit',
      priority: 'Hoch',
      deadline: '2024-03-15',
      budget: 5000,
      progress: 65,
      description: 'Kompletter Relaunch der Firmenwebsite',
      createdDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'Landing Page Kampagne',
      client: 'Anna Schmidt',
      clientId: 2,
      status: 'Review',
      priority: 'Mittel',
      deadline: '2024-02-28',
      budget: 2500,
      progress: 90,
      description: 'Landing Page für neue Produktkampagne',
      createdDate: '2024-02-01'
    }
  ])

  // State für Rechnungen (später in Datenbank)
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      number: 'RE-2024-001',
      client: 'Max Mustermann',
      clientId: 1,
      project: 'Website Relaunch',
      projectId: 1,
      amount: 2500,
      status: 'Bezahlt',
      date: '2024-01-25',
      dueDate: '2024-02-25'
    }
  ])

  // CRUD Funktionen für Kunden
  const addClient = (client) => {
    setClients([...clients, { ...client, id: Date.now(), createdDate: new Date().toISOString().split('T')[0] }])
  }

  const updateClient = (id, updatedClient) => {
    setClients(clients.map(client => client.id === id ? { ...client, ...updatedClient } : client))
  }

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id))
    // Auch zugehörige Projekte löschen
    setProjects(projects.filter(project => project.clientId !== id))
  }

  // CRUD Funktionen für Projekte
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now(), createdDate: new Date().toISOString().split('T')[0] }])
  }

  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(project => project.id === id ? { ...project, ...updatedProject } : project))
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  // CRUD Funktionen für Rechnungen
  const addInvoice = (invoice) => {
    setInvoices([...invoices, { ...invoice, id: Date.now() }])
  }

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices(invoices.map(invoice => invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice))
  }

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id))
  }

  // Seiten-Rendering
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            clients={clients}
            projects={projects}
            invoices={invoices}
            onOpenEditor={() => setCurrentPage('editor')}
          />
        )
      case 'clients':
        return (
          <Clients 
            clients={clients}
            onAdd={addClient}
            onUpdate={updateClient}
            onDelete={deleteClient}
          />
        )
      case 'projects':
        return (
          <Projects 
            projects={projects}
            clients={clients}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
          />
        )
      case 'invoices':
        return (
          <Invoices 
            invoices={invoices}
            clients={clients}
            projects={projects}
            onAdd={addInvoice}
            onUpdate={updateInvoice}
            onDelete={deleteInvoice}
          />
        )
      case 'editor':
        return <ProfessionalEditor onExit={() => setCurrentPage('dashboard')} />
      case 'templates':
        return (
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Templates</h1>
            <p className="text-gray-600">Template-System wird noch entwickelt...</p>
          </div>
        )
      default:
        return (
          <Dashboard 
            clients={clients}
            projects={projects}
            invoices={invoices}
            onOpenEditor={() => setCurrentPage('editor')}
          />
        )
    }
  }

  return (
    // DND Provider umschließt die gesamte App für Drag & Drop
    <DndProvider backend={HTML5Backend}>
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>
    </DndProvider>
  )
}

export default App