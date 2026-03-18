import { useState } from 'react'
import './App.css'
import PacientesList from './components/PacientesList'
import MedicosList from './components/MedicosList'

function App() {
  const [activeTab, setActiveTab] = useState('pacientes')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Fala Doutor!
          </h1>
          <p className="text-gray-300 text-lg">Gerenciamento de Pacientes e Médicos</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 border-b-2 border-gray-700">
          <button
            onClick={() => setActiveTab('pacientes')}
            className={`px-6 py-3 font-semibold text-lg transition-all duration-300 relative ${
              activeTab === 'pacientes'
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            👥 Pacientes
            {activeTab === 'pacientes' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-t"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('medicos')}
            className={`px-6 py-3 font-semibold text-lg transition-all duration-300 relative ${
              activeTab === 'medicos'
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            🏥 Médicos
            {activeTab === 'medicos' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-t"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'pacientes' && <PacientesList />}
          {activeTab === 'medicos' && <MedicosList />}
        </div>
      </div>
    </div>
  )
}

export default App
