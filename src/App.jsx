import React, { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'

function App() {
  // State für die aktuelle Seite
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Funktion um die richtige Seite zu zeigen
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'clients':
        return <Clients />
      case 'projects':
        return (
          <div>
            <h1 className="mb-6 text-3xl font-bold">Projekte</h1>
            <div className="p-8 text-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Projekte-Seite wird in Phase 2.2 implementiert</p>
            </div>
          </div>
        )
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
        return <Dashboard />
    }
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App