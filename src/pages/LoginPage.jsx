import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Card, CardBody } from '../components/ui/Card'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    const redirectMap = { siswa: '/siswa/dashboard', guru: '/guru/dashboard', kepala_sekolah: '/kepsek/dashboard', admin: '/admin/dashboard' }
    navigate(redirectMap[user.peran] || '/login', { replace: true })
    return null
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-[22px] font-semibold text-neutral-900">Perpustakaan Sekolah</h1>
            <p className="text-sm text-neutral-500 mt-1">Sistem Informasi Perpustakaan Berbasis Hybrid</p>
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
