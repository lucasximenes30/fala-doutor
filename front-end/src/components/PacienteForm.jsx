import { useState, useEffect } from 'react'

export default function PacienteForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    plano: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        cpf: initialData.cpf,
        dataNascimento: initialData.dataNascimento,
        plano: initialData.plano,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      nome: '',
      cpf: '',
      dataNascimento: '',
      plano: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-200 font-semibold mb-2 text-center">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-gray-600 outline-none transition-colors"
            placeholder="Nome completo"
          />
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2 text-center">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-gray-600 outline-none transition-colors"
            placeholder="000.000.000-00"
          />
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2 text-center">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:bg-gray-600 outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2 text-center">Plano</label>
          <select
            name="plano"
            value={formData.plano}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:bg-gray-600 outline-none transition-colors"
          >
            <option value="">Selecione um plano</option>
            <option value="1">Plano 1</option>
            <option value="2">Plano 2</option>
            <option value="3">Plano 3</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4 justify-center">
        <button
          type="submit"
          className="px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
