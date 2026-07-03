import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, User, BookOpen, Bell, Menu } from 'lucide-react'
import { storage } from '../../services/storage'

const roleLabels = {
  siswa: 'Siswa',
  guru: 'Guru/Karyawan',
  kepala_sekolah: 'Kepala Sekolah',
  admin: 'Admin',
}

export default function Topbar({ title, onToggleSidebar, unreadNotifCount = 0 }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isSiswa = user?.peran === 'siswa'

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-20 relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
          title="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <BookOpen className="w-6 h-6 text-primary shrink-0 hidden sm:block" />
        <span className="font-semibold text-neutral-900 text-base md:text-lg truncate max-w-[160px] md:max-w-none">
          {title || 'Perpustakaan Sekolah'}
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {isSiswa && (
          <button
            onClick={() => navigate('/siswa/notifikasi')}
            className="relative p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
              </span>
            )}
          </button>
        )}

        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-medium text-neutral-900 leading-tight">{user?.nama}</p>
            <p className="text-xs text-neutral-500">{roleLabels[user?.peran] || ''}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-ghost btn-sm text-neutral-500"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
