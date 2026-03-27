export default function ConfirmPlanModal({ 
  isOpen, 
  planoMedico, 
  planoPaciente, 
  medicoNome, 
  pacienteNome,
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-3xl border-2 border-yellow-500/50 p-8 sm:p-12 max-w-md w-full shadow-2xl">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-6 tracking-wide">
          Planos Diferentes!
        </h2>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-cyan-500/30">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-2">Médico</p>
            <p className="text-cyan-400 text-lg font-bold">{medicoNome}</p>
            <p className="text-emerald-400 text-sm font-semibold mt-2">Plano: {planoMedico}</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="border-t-2 border-yellow-500/50 flex-1"></div>
            <span className="text-yellow-500 font-bold mx-3 text-xl">VS</span>
            <div className="border-t-2 border-yellow-500/50 flex-1"></div>
          </div>

          <div className="bg-gray-900/60 rounded-2xl p-4 border border-purple-500/30">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-2">Paciente</p>
            <p className="text-purple-400 text-lg font-bold">{pacienteNome}</p>
            <p className="text-yellow-400 text-sm font-semibold mt-2">Plano: {planoPaciente}</p>
          </div>
        </div>

        <p className="text-gray-300 text-center mb-8 text-sm leading-relaxed">
          O paciente precisa ter o <strong className="text-yellow-400">mesmo plano que o médico</strong> para agendar a consulta.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 font-bold rounded-xl transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-600/40"
          >
            OK, Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
