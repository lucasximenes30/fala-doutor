export default function PlanoCard({ plano, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-10 hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300 border border-gray-700 flex flex-col justify-between h-full group">
      <div className="space-y-6 mb-8 text-center flex-1 flex flex-col items-center justify-center">
        <div className="w-full border-b border-gray-700/60 pb-6 shrink-0">
          <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-bold mb-2">Nome</p>
          <p className="text-cyan-400 text-2xl sm:text-3xl font-extrabold group-hover:text-cyan-300 transition-colors">{plano.nome}</p>
        </div>
        
        <div className="w-full flex-1 flex flex-col justify-center gap-4">
          <div className="bg-gray-900/60 rounded-2xl p-4 border border-emerald-900/30 transform transition-all group-hover:scale-[1.02]">
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Valor</p>
            <p className="text-emerald-400 text-2xl font-bold tracking-wide">R$ {parseFloat(plano.valor).toFixed(2)}</p>
          </div>
        </div>

        <div className="pt-6 shrink-0 w-full flex flex-col gap-2">
          <p className="text-gray-600 text-xs font-medium">Criado em: <span className="text-gray-400">{plano.createdAt}</span></p>
          <p className="text-gray-600 text-xs font-medium">Atualizado em: <span className="text-gray-400">{plano.updatedAt}</span></p>
        </div>
      </div>

      <div className="flex gap-4 mt-auto pt-2 shrink-0">
        <button
          onClick={() => onEdit(plano)}
          className="flex-1 bg-gray-700/50 hover:bg-blue-600 border border-gray-600 hover:border-blue-500 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-blue-500/20"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(plano.id)}
          className="flex-1 bg-gray-700/50 hover:bg-red-600 border border-gray-600 hover:border-red-500 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-red-500/20"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
