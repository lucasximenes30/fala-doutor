import { useState } from 'react'
import './App.css'
import PacientesList from './components/PacientesList'
import MedicosList from './components/MedicosList'
import PlanosList from './components/PlanosList'

function App() {
  const [activeTab, setActiveTab] = useState('pacientes')

  return (
      <div className="max-w-6xl mx-auto w-full min-h-screen py-10 px-4 flex flex-col items-center justify-start gap-12 sm:gap-16">
        {/* Header */}
        <div className="text-center mt-4 sm:mt-8 space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
            Fala Doutor!
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl font-medium tracking-wide">Gerenciamento de Pacientes e Médicos</p>
        </div>

        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-12">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 border-b border-gray-700 w-full pb-4 sm:pb-5">
            <button
              onClick={() => setActiveTab('pacientes')}
              className={`px-6 sm:px-8 py-3 font-bold text-lg sm:text-xl transition-all duration-300 relative ${
                activeTab === 'pacientes'
                  ? 'text-cyan-400'
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              👥 Pacientes
              {activeTab === 'pacientes' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 to-blue-400 rounded-t"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('medicos')}
              className={`px-6 sm:px-8 py-3 font-bold text-lg sm:text-xl transition-all duration-300 relative ${
                activeTab === 'medicos'
                  ? 'text-cyan-400'
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              🏥 Médicos
              {activeTab === 'medicos' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 to-blue-400 rounded-t"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('planos')}
              className={`px-6 sm:px-8 py-3 font-bold text-lg sm:text-xl transition-all duration-300 relative ${
                activeTab === 'planos'
                  ? 'text-cyan-400'
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              📋 Planos
              {activeTab === 'planos' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 to-blue-400 rounded-t"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="animate-fadeIn w-full mt-6 sm:mt-8">
            {activeTab === 'pacientes' && <PacientesList />}
            {activeTab === 'medicos' && <MedicosList />}
            {activeTab === 'planos' && <PlanosList />}
          </div>
        </div>
      </div>
  )
}

export default App