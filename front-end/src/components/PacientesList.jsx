import { useState, useEffect } from 'react'
import { useAPI } from '../hooks/useAPI'
import PacienteCard from './PacienteCard'
import PacienteForm from './PacienteForm'

export default function PacientesList() {
  const { data, loading, error, fetchData, createItem, updateItem, deleteItem } = useAPI('/pacientes')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingData, setEditingData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCreate = async (formData) => {
    try {
      await createItem(formData)
      setShowForm(false)
    } catch (err) {
      console.error('Erro ao criar paciente:', err)
    }
  }

  const handleUpdate = async (formData) => {
    try {
      await updateItem(editingId, formData)
      setEditingId(null)
      setEditingData(null)
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este paciente?')) {
      try {
        await deleteItem(id)
      } catch (err) {
        console.error('Erro ao deletar paciente:', err)
      }
    }
  }

  const handleEdit = (paciente) => {
    setEditingData(paciente)
    setEditingId(paciente.id)
  }

  if (loading && data.length === 0) {
    return <div className="text-center py-8 text-gray-400">Carregando pacientes...</div>
  }

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4 gap-6 py-8">
      {/* Form Section */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {!showForm && !editingId && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-2/3 md:w-1/2 mb-8 py-4 px-8 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1"
          >
            + Adicionar Novo Paciente
          </button>
        )}

        {(showForm || editingId) && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-extrabold mb-10 text-cyan-400 text-center tracking-wide">
              {editingId ? 'Editar Paciente' : 'Novo Paciente'}
            </h2>
            <PacienteForm
              onSubmit={editingId ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false)
                setEditingId(null)
                setEditingData(null)
              }}
              initialData={editingData}
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-600 rounded-xl p-6 text-red-100 text-lg font-semibold w-full max-w-4xl text-center">
          Erro: {error}
        </div>
      )}

      {/* Cards Grid */}
      {data.length === 0 ? (
        <div className="text-center bg-gray-800/50 rounded-3xl border border-gray-700 w-full max-w-lg mt-12">
          <p className="text-gray-400 text-xl font-medium tracking-wide">Nenhum paciente cadastrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 w-full max-w-7xl mt-12">
          {data.map((paciente) => (
            <PacienteCard
              key={paciente.id}
              paciente={paciente}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}