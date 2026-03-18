export default function AlertBox({ type = 'error', message, onClose }) {
  if (!message) return null

  const bgColor = type === 'error' ? 'bg-red-900 border-red-700 text-red-300' : 'bg-green-900 border-green-700 text-green-300'
  const icon = type === 'error' ? '❌' : '✅'

  return (
    <div className={`${bgColor} border rounded-xl p-4 flex items-start gap-3 animate-fadeIn`}>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="font-semibold">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}
