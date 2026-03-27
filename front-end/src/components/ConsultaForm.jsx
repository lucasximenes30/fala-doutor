import { useState, useEffect } from 'react'
import axios from 'axios'
import ConfirmPlanModal from './ConfirmPlanModal'

const API_BASE_URL = 'http://localhost:3000'

export default function ConsultaForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    data: '',
    medico: '',
    paciente: '',
  })
  
  const [medicos, setMedicos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [loadingMedicos, setLoadingMedicos] = useState(false)
  const [loadingPacientes, setLoadingPacientes] = useState(false)
  
  const [selectedMedicoPlano, setSelectedMedicoPlano] = useState(null)
  const [selectedPacientePlano, setSelectedPacientePlano] = useState(null)
  const [valorConsulta, setValorConsulta] = useState(null)
  
  const [showModal, setShowModal] = useState(false)
  const [planoDiferente, setPlanoDiferente] = useState(false)
  const [dataInvalida, setDataInvalida] = useState(false)

  // Carrega médicos e pacientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMedicos(true)
        setLoadingPacientes(true)
        
        const [medicoRes, pacienteRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/medicos`),
          axios.get(`${API_BASE_URL}/pacientes`)
        ])

        let medicosData = []
        let pacientesData = []

        if (medicoRes.data?.dados) {
          medicosData = Array.isArray(medicoRes.data.dados) 
            ? medicoRes.data.dados 
            : medicoRes.data.dados.medicos || []
        }

        if (pacienteRes.data?.dados) {
          pacientesData = Array.isArray(pacienteRes.data.dados) 
            ? pacienteRes.data.dados 
            : pacienteRes.data.dados.pacientes || []
        }

        setMedicos(medicosData)
        setPacientes(pacientesData)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoadingMedicos(false)
        setLoadingPacientes(false)
      }
    }
    
    fetchData()
  }, [])

  // Pré-preenche com initialData se fornecido
  useEffect(() => {
    if (initialData) {
      setFormData({
        data: initialData.data,
        medico: initialData.medico?.id || '',
        paciente: initialData.paciente?.id || '',
      })
      
      if (initialData.medico) {
        setSelectedMedicoPlano(initialData.medico.plano)
        setValorConsulta(initialData.valor)
      }
      
      if (initialData.paciente) {
        setSelectedPacientePlano(initialData.paciente.plano)
      }
    }
  }, [initialData])

  const handleMedicoChange = (e) => {
    const medicoId = e.target.value
    setFormData(prev => ({
      ...prev,
      medico: medicoId,
    }))

    // Encontra o médico e pega seu plano
    const medico = medicos.find(m => m.id === medicoId)
    if (medico) {
      setSelectedMedicoPlano(medico.plano)
      setValorConsulta(medico.plano.valor)
      
      // Verifica se o paciente já está selecionado e tem plano diferente
      if (formData.paciente && selectedPacientePlano) {
        if (medico.plano.id !== selectedPacientePlano.id) {
          setPlanoDiferente(true)
          setShowModal(true)
        } else {
          setPlanoDiferente(false)
        }
      }
    }
  }

  const handlePacienteChange = (e) => {
    const pacienteId = e.target.value
    setFormData(prev => ({
      ...prev,
      paciente: pacienteId,
    }))

    // Encontra o paciente e pega seu plano
    const paciente = pacientes.find(p => p.id === pacienteId)
    if (paciente) {
      setSelectedPacientePlano(paciente.plano)
      
      // Verifica se o médico já está selecionado e tem plano diferente
      if (formData.medico && selectedMedicoPlano) {
        if (selectedMedicoPlano.id !== paciente.plano.id) {
          setPlanoDiferente(true)
          setShowModal(true)
        } else {
          setPlanoDiferente(false)
        }
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Valida data se for campo de data
    if (name === 'data' && value) {
      const dataSelecionada = new Date(value)
      const agora = new Date()

      if (dataSelecionada <= agora) {
        setDataInvalida(true)
      } else {
        setDataInvalida(false)
      }
    }
  }

  const handleModalConfirm = () => {
    setShowModal(false)
    // Mantém os dados preenchidos, apenas fecha o modal
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Valida se tem plano diferente na hora de submeter
    if (planoDiferente) {
      alert('Não é possível criar consulta com planos diferentes!')
      return
    }

    // Valida se data é anterior ou igual a hoje
    if (formData.data) {
      const dataSelecionada = new Date(formData.data)
      const agora = new Date()

      if (dataSelecionada <= agora) {
        alert('Consulta deve ser agendada para uma hora futura!')
        return
      }
    }

    onSubmit(formData)
    setFormData({
      data: '',
      medico: '',
      paciente: '',
    })
    setSelectedMedicoPlano(null)
    setSelectedPacientePlano(null)
    setValorConsulta(null)
    setPlanoDiferente(false)
    setDataInvalida(false)
  }

  return (
    <>
      <ConfirmPlanModal
        isOpen={showModal}
        planoMedico={selectedMedicoPlano?.nome || ''}
        planoPaciente={selectedPacientePlano?.nome || ''}
        medicoNome={medicos.find(m => m.id === formData.medico)?.nome || ''}
        pacienteNome={pacientes.find(p => p.id === formData.paciente)?.nome || ''}
        onConfirm={handleModalConfirm}
        onCancel={() => {
          setShowModal(false)
          setPlanoDiferente(false)
        }}
      />

      <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Data e Hora */}
          <div className="flex flex-col items-center w-full">
            <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Data & Hora</label>
            <input
              type="datetime-local"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className={`w-full px-5 py-4 text-center bg-gray-900 border-2 rounded-xl text-white text-lg focus:bg-gray-800 outline-none transition-all duration-300 ${
                dataInvalida 
                  ? 'border-red-600 focus:border-red-400' 
                  : 'border-gray-600 focus:border-cyan-400'
              }`}
            />
            {dataInvalida && (
              <p className="text-red-400 text-sm mt-2 font-semibold">Consulta deve ser para data futura!</p>
            )}
          </div>

          {/* Valor da Consulta (somente leitura) */}
          <div className="flex flex-col items-center w-full">
            <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Valor (Auto)</label>
            <input
              type="text"
              value={valorConsulta ? `R$ ${parseFloat(valorConsulta).toFixed(2)}` : 'Selecione um médico'}
              disabled
              className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-yellow-600/50 rounded-xl text-yellow-400 text-lg font-bold focus:border-yellow-400 focus:bg-gray-800 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Médico */}
          <div className="flex flex-col items-center w-full">
            <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Médico</label>
            <select
              name="medico"
              value={formData.medico}
              onChange={handleMedicoChange}
              required
              disabled={loadingMedicos}
              className="w-full px-5 py-4 text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-gray-300 text-lg focus:border-cyan-400 focus:bg-gray-800 outline-none transition-all duration-300 appearance-none disabled:opacity-50"
            >
              <option value="">
                {loadingMedicos ? 'Carregando...' : 'Selecione um médico'}
              </option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Paciente */}
          <div className="flex flex-col items-center w-full">
            <label className="block text-gray-400 text-sm tracking-widest uppercase font-bold mb-3">Paciente</label>
            <select
              name="paciente"
              value={formData.paciente}
              onChange={handlePacienteChange}
              required
              disabled={loadingPacientes}
              className={`w-full px-5 py-4 text-center bg-gray-900 border-2 rounded-xl text-gray-300 text-lg focus:bg-gray-800 outline-none transition-all duration-300 appearance-none disabled:opacity-50 ${
                planoDiferente 
                  ? 'border-red-600 focus:border-red-400' 
                  : 'border-gray-600 focus:border-cyan-400'
              }`}
            >
              <option value="">
                {loadingPacientes ? 'Carregando...' : 'Selecione um paciente'}
              </option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Aviso de Plano Diferente */}
        {planoDiferente && (
          <div className="w-full bg-red-900/20 border-2 border-red-600 rounded-2xl p-4 text-red-300 text-center font-semibold">
            Paciente tem plano diferente do médico! Isso não será permitido.
          </div>
        )}

        {/* Info de Planos */}
        {selectedMedicoPlano && selectedPacientePlano && (
          <div className="w-full bg-gray-900/40 border-2 border-gray-700 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Plano Médico:</span>
              <span className="text-emerald-400 font-bold">{selectedMedicoPlano.nome}</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-700 pt-3">
              <span className="text-gray-400">Plano Paciente:</span>
              <span className="text-emerald-400 font-bold">{selectedPacientePlano.nome}</span>
            </div>
            {!planoDiferente && (
              <div className="flex items-center justify-center mt-3 pt-3 border-t border-green-700/30 bg-green-900/20 rounded-lg py-2">
                <span className="text-green-400 font-bold">Planos compatíveis!</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 w-full md:w-1/2 justify-center">
          <button
            type="submit"
            disabled={planoDiferente}
            className={`flex-1 py-4 px-8 text-lg font-bold rounded-xl transition-all duration-300 ${
              planoDiferente
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/20 hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {initialData ? 'Atualizar Consulta' : 'Agendar Consulta'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 px-8 text-lg font-bold bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}
