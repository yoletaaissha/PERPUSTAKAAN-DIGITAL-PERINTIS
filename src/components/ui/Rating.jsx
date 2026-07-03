import { useState } from 'react'
import { Star } from 'lucide-react'

export function RatingDisplay({ rating = 0, count = 0 }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= full
                ? 'fill-amber-400 text-amber-400'
                : star === full + 1 && hasHalf
                ? 'fill-amber-400/50 text-amber-400'
                : 'fill-neutral-200 text-neutral-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-neutral-700">{rating.toFixed(1)}</span>
      {count > 0 && <span className="text-xs text-neutral-500">({count})</span>}
    </div>
  )
}

export function RatingInput({ value = 0, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || value)
        return (
          <button
            key={star}
            type="button"
            className="p-0.5 transition-transform hover:scale-110"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange?.(star)}
          >
            <Star
              className={`w-6 h-6 ${
                active
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-neutral-200 text-neutral-200'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
