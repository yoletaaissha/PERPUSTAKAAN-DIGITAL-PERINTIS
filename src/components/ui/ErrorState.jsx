import { AlertCircle, RotateCcw } from 'lucide-react'

export default function ErrorState({ message = 'Terjadi kesalahan.', onRetry }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
      <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-danger">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-danger hover:text-red-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Coba Lagi
          </button>
        )}
      </div>
    </div>
  )
}
