import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, Search, ClipboardList, History, Bell, User,
  BookPlus, ArrowLeftRight, RotateCcw, FileText, Upload,
  Users, Settings, Database, ShieldAlert, BarChart3, TrendingUp,
  Library, PanelLeftClose, PanelLeft,
} from 'lucide-react'

const menuConfig = {
  siswa: [
    { to: '/siswa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/siswa/katalog', label: 'Katalog Buku', icon: Search },
    { to: '/siswa/pinjaman-saya', label: 'Peminjaman Saya', icon: ClipboardList },
    { to: '/siswa/riwayat', label: 'Riwayat Peminjaman', icon: History },
    { to: '/siswa/notifikasi', label: 'Notifikasi', icon: Bell, badgeKey: 'notif' },
    { to: '/siswa/profil', label: 'Profil', icon: User },
  ],
  guru: [
    { to: '/guru/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/guru/kelola-buku', label: 'Kelola Buku', icon: BookOpen },
    { to: '/guru/kelola-buku/tambah', label: 'Tambah Buku', icon: BookPlus },
    { to: '/guru/upload-digital', label: 'Upload Digital', icon: Upload },
    { to: '/guru/peminjaman', label: 'Peminjaman', icon: ArrowLeftRight },
    { to: '/guru/pengembalian', label: 'Pengembalian', icon: RotateCcw },
    { to: '/guru/laporan', label: 'Generate Laporan', icon: FileText },
    { to: '/guru/profil', label: 'Profil', icon: User },
  ],
  kepala_sekolah: [
    { to: '/kepsek/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/kepsek/data-buku', label: 'Data Buku', icon: BookOpen },
    { to: '/kepsek/data-peminjaman', label: 'Data Peminjaman', icon: ClipboardList },
    { to: '/kepsek/grafik', label: 'Grafik Peminjaman', icon: BarChart3 },
    { to: '/kepsek/minat-baca', label: 'Analisis Minat Baca', icon: TrendingUp },
    { to: '/kepsek/profil', label: 'Profil', icon: User },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/kelola-user', label: 'Kelola User', icon: Users },
    { to: '/admin/data-sistem', label: 'Pengaturan Sistem', icon: Settings },
    { to: '/admin/backup', label: 'Backup Data', icon: Database },
    { to: '/admin/log-aktivitas', label: 'Log Aktivitas', icon: ShieldAlert },
    { to: '/admin/profil', label: 'Profil', icon: User },
  ],
}

export default function Sidebar({ peran, collapsed, onToggleCollapse, onClose, unreadNotifCount = 0 }) {
  const location = useLocation()
  const menuItems = menuConfig[peran] || []

  return (
    <aside className="bg-neutral-100 border-r border-neutral-200 flex flex-col h-full overflow-y-auto">
      <div className={`h-16 flex items-center border-b border-neutral-200 shrink-0 ${collapsed ? 'justify-center px-0' : 'gap-2 px-4'}`}>
        <Library className="w-6 h-6 text-primary shrink-0" />
        {!collapsed && <span className="font-semibold text-sm text-neutral-900">Menu</span>}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
          const showBadge = item.badgeKey === 'notif' && unreadNotifCount > 0

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="relative shrink-0">
                <Icon className="w-5 h-5" />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
                  </span>
                )}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {onToggleCollapse && (
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 transition-colors"
            title={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
      )}
    </aside>
  )
}
