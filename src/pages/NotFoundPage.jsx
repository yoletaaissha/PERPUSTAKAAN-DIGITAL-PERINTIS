import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Home } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const dashboardPath = user
    ? { siswa: '/siswa/dashboard', guru: '/guru/dashboard', kepala_sekolah: '/kepsek/dashboard', admin: '/admin/dashboard' }[user.peran]
    : '/login'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary-light mb-4">404</div>
        <h2 className="text-[22px] font-semibold text-neutral-900 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-neutral-500 mb-6">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
          <Link to={dashboardPath}>
            <Button>
              <Home className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
