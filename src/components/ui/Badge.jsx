const colorMap = {
  blue: 'badge-blue',
  green: 'badge-green',
  red: 'badge-red',
  yellow: 'badge-yellow',
}

export default function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span className={`${colorMap[variant] || colorMap.blue} ${className}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const config = {
    dipinjam: { label: 'Dipinjam', variant: 'blue' },
    dikembalikan: { label: 'Dikembalikan', variant: 'green' },
    terlambat: { label: 'Terlambat', variant: 'red' },
  }
  const c = config[status] || { label: status, variant: 'blue' }
  return <Badge variant={c.variant}>{c.label}</Badge>
}
