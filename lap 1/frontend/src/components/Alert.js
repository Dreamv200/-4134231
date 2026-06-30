export default function Alert({ type = 'info', message }) {
  const bgColor = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
  }[type]

  const icon = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🔴',
    success: '✓',
  }[type]

  return (
    <div className={`${bgColor} px-4 py-3 rounded-lg flex items-center gap-3 mb-4`}>
      <span className="text-xl">{icon}</span>
      <p>{message}</p>
    </div>
  )
}
