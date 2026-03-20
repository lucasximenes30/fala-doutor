import { useState, useEffect } from 'react'
import { useAPI } from '../hooks/useAPI'
import PlanoCard from './PlanoCard'
import PlanoForm from './PlanoForm'

export default function PlanosList() {
  const { data, loading, error, fetchData, createItem, updateItem, deleteItem } = useAPI('/planos')
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
      console.error('Erro ao criar plano:', err)
    }
  }

  const handleUpdate = async (formData) => {
    try {
      await updateItem(editingId, formData)
      setEditingId(null)
      setEditingData(null)
    } catch (err) {
      console.error('Erro ao atualizar plano:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este plano?')) {
      try {
        await deleteItem(id)
      } catch (err) {
        console.error('Erro ao deletar plano:', err)
      }
    }
  }

  const handleEdit = (plano) => {
    setEditingData(plano)
    setEditingId(plano.id)
  }

  if (loading && data.length === 0) {
    return <div className="text-center py-8 text-gray-400">Carregando planos...</div>
  }

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4 gap-6 py-8">
      {/* Form Section */}
      <div className="p-8 sm:p-12 w-full max-w-4xl flex flex-col items-center">
        {!showForm && !editingId && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-2/3 md:w-1/2 py-4 px-8 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-cyan-500/20 hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1"
          >
            + Adicionar Novo Plano
          </button>
        )}

        {(showForm || editingId) && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-extrabold mb-10 text-cyan-400 text-center tracking-wide">
              {editingId ? 'Editar Plano' : 'Novo Plano'}
            </h2>
            <PlanoForm
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
        <div className="text-center py-16 bg-gray-800/50 rounded-3xl border border-gray-700 w-full max-w-lg">
          <p className="text-gray-400 text-xl font-medium tracking-wide">Nenhum plano cadastrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 w-full max-w-7xl">
          {data.map((plano) => (
            <PlanoCard
              key={plano.id}
              plano={plano}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
