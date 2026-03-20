import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export default function MedicoForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    crm: '',
    dataNascimento: '',
    plano: '',
  })
  const [planos, setPlanos] = useState([])
  const [loadingPlanos, setLoadingPlanos] = useState(false)

  useEffect(() => {
    // Carrega os planos quando o componente monta
    const fetchPlanos = async () => {
      setLoadingPlanos(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/planos`)
        let planosData = []
        if (response.data?.dados) {
          planosData = Array.isArray(response.data.dados) ? response.data.dados : response.data.dados.planos || []
        }
        setPlanos(planosData)
      } catch (err) {
        console.error('Erro ao carregar planos:', err)
      } finally {
        setLoadingPlanos(false)
      }
    }
    
    fetchPlanos()
  }, [])

  useEffect(() => {
    if (initialData) {
      // Converte data ISO (1995-08-25T00:00:00.000Z) para formato de input date (1995-08-25)
      let dataNascimentoFormatada = initialData.dataNascimento
      if (initialData.dataNascimento && initialData.dataNascimento.includes('T')) {
        dataNascimentoFormatada = initialData.dataNascimento.split('T')[0]
      } else if (initialData.dataNascimento && initialData.dataNascimento.includes('/')) {
        // Se já vem em DD/MM/YYYY do backend, converte para YYYY-MM-DD
        const [dia, mes, ano] = initialData.dataNascimento.split('/')
        dataNascimentoFormatada = `${ano}-${mes}-${dia}`
      }
      
      setFormData({
        nome: initialData.nome,
        cpf: initialData.cpf,
        crm: initialData.crm,
        dataNascimento: dataNascimentoFormatada,
        plano: initialData.plano?.id || initialData.plano || '',
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
      crm: '',
      dataNascimento: '',
      plano: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300"
            placeholder="Nome completo"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300"
            placeholder="000.000.000-00"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">CRM</label>
          <input
            type="text"
            name="crm"
            value={formData.crm}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300 font-mono"
            placeholder="Número de registro"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-white text-lg focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/2">
        <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Plano</label>
        <select
          name="plano"
          value={formData.plano}
          onChange={handleChange}
          required
          disabled={loadingPlanos}
          className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-gray-300 text-lg focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300 appearance-none disabled:opacity-50"
        >
          <option value="">
            {loadingPlanos ? 'Carregando planos...' : 'Selecione um plano'}
          </option>
          {planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome} - R$ {parseFloat(plano.valor).toFixed(2)}
            </option>
          ))}
        </select>
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