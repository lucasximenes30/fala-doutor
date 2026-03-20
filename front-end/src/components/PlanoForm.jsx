import { useState, useEffect } from 'react'

export default function PlanoForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        valor: initialData.valor,
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
      valor: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Nome do Plano</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300"
            placeholder="ex: Hapvida"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Valor</label>
          <input
            type="number"
            name="valor"
            step="0.01"
            value={formData.valor}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex gap-6 pt-6 w-full sm:w-2/3 justify-center">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-emerald-500/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
