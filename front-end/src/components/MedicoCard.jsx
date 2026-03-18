export default function MedicoCard({ medico, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700">
      <div className="space-y-3 mb-6 text-center">
        <div>
          <p className="text-gray-400 text-sm font-semibold">Nome</p>
          <p className="text-cyan-300 text-lg font-bold">{medico.nome}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm font-semibold">CPF</p>
            <p className="text-gray-200 text-sm">{medico.cpf}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">CRM</p>
            <p className="text-gray-200 text-sm font-mono">{medico.crm}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm font-semibold">Data Nasc.</p>
            <p className="text-gray-200 text-sm">{medico.dataNascimento}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">Plano</p>
            <p className="text-gray-200 text-sm font-bold">{medico.plano}</p>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-700">
          <p className="text-gray-500 text-xs">Criado em: {medico.createdAt}</p>
          <p className="text-gray-500 text-xs">Atualizado em: {medico.updatedAt}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(medico)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(medico.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
