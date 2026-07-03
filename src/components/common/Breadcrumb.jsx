import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const routeNames = {
  'siswa': { dashboard: 'Dashboard', katalog: 'Katalog Buku', 'pinjaman-saya': 'Peminjaman Saya', riwayat: 'Riwayat Peminjaman', notifikasi: 'Notifikasi', profil: 'Profil' },
  'guru': { dashboard: 'Dashboard', 'kelola-buku': 'Kelola Buku', tambah: 'Tambah Buku', upload: 'Upload Digital', peminjaman: 'Peminjaman', pengembalian: 'Pengembalian', laporan: 'Generate Laporan', profil: 'Profil' },
  'kepsek': { dashboard: 'Dashboard', 'data-buku': 'Data Buku', 'data-peminjaman': 'Data Peminjaman', grafik: 'Grafik Peminjaman', 'minat-baca': 'Analisis Minat Baca', profil: 'Profil' },
  'admin': { dashboard: 'Dashboard', 'kelola-user': 'Kelola User', 'data-sistem': 'Pengaturan Sistem', backup: 'Backup Data', 'log-aktivitas': 'Log Aktivitas', profil: 'Profil' },
}

export default function Breadcrumb() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const role = parts[0]
  const names = routeNames[role] || {}

  const crumbs = parts.map((part, i) => {
    const path = '/' + parts.slice(0, i + 1).join('/')
    const label = (i === 1 && names[part]) ? names[part] : (i === 0 ? '' : names[part] || part)
    return { path, label, isLast: i === parts.length - 1 }
  }).filter(c => c.label)

  return (
    <nav className="flex items-center gap-1 text-sm text-neutral-500 mb-4">
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
          {crumb.isLast ? (
            <span className="text-neutral-900 font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-primary transition-colors">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
