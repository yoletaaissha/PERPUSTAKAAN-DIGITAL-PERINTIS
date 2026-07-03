const colorConfig = {
  primary: { bg: 'bg-primary-light', icon: 'text-primary' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  green: { bg: 'bg-green-50', icon: 'text-success' },
  warning: { bg: 'bg-amber-50', icon: 'text-warning' },
  danger: { bg: 'bg-red-50', icon: 'text-danger' },
}

export default function KpiCard({ icon: Icon, value, label, color = 'primary' }) {
  const cfg = colorConfig[color] || colorConfig.primary

  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${cfg.bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${cfg.icon}`} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-neutral-900 leading-tight">{value}</p>
        <p className="text-sm text-neutral-500 truncate">{label}</p>
      </div>
    </div>
  )
}
