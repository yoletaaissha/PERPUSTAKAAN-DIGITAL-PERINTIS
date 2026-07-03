export function generateId(prefix, existing = []) {
  const nums = existing.map(id => {
    const n = parseInt(id.replace(/^\w+-/, ''), 10)
    return isNaN(n) ? 0 : n
  })
  const max = nums.length > 0 ? Math.max(...nums) : 0
  return `${prefix}-${String(max + 1).padStart(3, '0')}`
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function formatDateShort(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export function daysUntil(date) {
  const now = new Date()
  const target = new Date(date)
  const diff = target - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function calculateFine(lateDays, ratePerDay = 500) {
  return Math.max(0, lateDays) * ratePerDay
}
