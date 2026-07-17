import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import logoSekolah from "../assets/logo-sekolah.png";
import { BookOpen, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Card, CardBody } from '../components/ui/Card'

const redirectMap = { siswa: '/siswa/dashboard', guru: '/guru/dashboard', kepala_sekolah: '/kepsek/dashboard', admin: '/admin/dashboard' }

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to={redirectMap[user.peran] || '/login'} replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim()) { setError('Username wajib diisi'); return }
    if (!password.trim()) { setError('Password wajib diisi'); return }
    setLoading(true)
    setTimeout(() => {
      const result = login(username.trim(), password)
      setLoading(false)
      if (result.success) navigate(result.redirect, { replace: true })
      else {
        setError(result.error)
        if (result.error.includes('Password')) setPassword('')
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">

  <img
    src={logoSekolah}
    alt="Logo Sekolah"
    className="w-24 h-24 mx-auto mb-4 object-contain"
  />

  <h1 className="text-[24px] font-bold text-neutral-900">
    Perpustakaan Perintis
  </h1>

  <p className="text-sm text-neutral-500 mt-1">
    Sistem Informasi Perpustakaan Perintis
  </p>

</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-danger">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <Input label="Username" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
            <Input label="Password" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full" loading={loading}>Masuk</Button>
          </form>
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center mb-3">Akun Demo</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500">
              <div className="p-2 rounded bg-neutral-50"><p className="font-medium text-neutral-700">Siswa</p><p>siswa01 / siswa123</p></div>
              <div className="p-2 rounded bg-neutral-50"><p className="font-medium text-neutral-700">Guru</p><p>guru01 / guru123</p></div>
              <div className="p-2 rounded bg-neutral-50"><p className="font-medium text-neutral-700">Kepsek</p><p>kepsek01 / kepsek123</p></div>
              <div className="p-2 rounded bg-neutral-50"><p className="font-medium text-neutral-700">Admin</p><p>admin01 / admin123</p></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
