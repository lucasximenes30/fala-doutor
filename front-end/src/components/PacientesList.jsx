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
    <div className="space-y-8 flex flex-col items-center">
      {/* Form Section */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700 w-full max-w-2xl">
        {!showForm && !editingId && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center"
          >
            + Adicionar Novo Paciente
          </button>
        )}

        {(showForm || editingId) && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center">
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
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-600 rounded-xl p-4 text-red-300">
          Erro: {error}
        </div>
      )}

      {/* Cards Grid */}
      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700">
          <p className="text-gray-400 text-lg">Nenhum paciente cadastrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
