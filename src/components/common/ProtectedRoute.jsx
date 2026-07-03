import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-neutral-500">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user.peran)) {
    const redirectMap = {
      siswa: '/siswa/dashboard',
      guru: '/guru/dashboard',
      kepala_sekolah: '/kepsek/dashboard',
      admin: '/admin/dashboard',
    }
    return <Navigate to={redirectMap[user.peran] || '/login'} replace />
  }

  return children
}
