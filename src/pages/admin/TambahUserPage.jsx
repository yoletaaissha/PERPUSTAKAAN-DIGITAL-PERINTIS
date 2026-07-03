import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Save } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import { generateId } from '../../lib/utils'

export default function TambahUserPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [form, setForm] = useState({ nama: '', username: '', password: '', peran: 'guru', jabatan: '', kelas: '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const validate = () => {
    const errs = {}
    if (!form.nama.trim()) errs.nama = 'Nama wajib diisi'
    if (!form.username.trim()) errs.username = 'Username wajib diisi'
    else if (form.username.length < 4) errs.username = 'Minimal 4 karakter'
    if (!form.password.trim()) errs.password = 'Password wajib diisi'
    else if (form.password.length < 6) errs.password = 'Minimal 6 karakter'
    if (form.peran === 'siswa' && !form.kelas.trim()) errs.kelas = 'Kelas wajib diisi'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    if (form.peran === 'siswa') {
      const existing = storage.getSiswa()
      const newSiswa = {
        idSiswa: generateId('SW', existing.map(s => s.idSiswa)),
        nama: form.nama.trim(), username: form.username.trim(), password: form.password.trim(),
        kelas: form.kelas.trim(), isActive: true, createdAt: new Date().toISOString(),
      }
      storage.saveSiswa([...existing, newSiswa])
      storage.addLog({ aksi: `Tambah siswa: ${newSiswa.nama}`, pelaku: 'Admin' })
    } else {
      const existing = storage.getUser()
      const newUser = {
        idUser: generateId('USR', existing.map(u => u.idUser)),
        nama: form.nama.trim(), username: form.username.trim(), password: form.password.trim(),
        peran: form.peran, jabatan: form.jabatan.trim(), isActive: true, createdAt: new Date().toISOString(),
      }
      storage.saveUser([...existing, newUser])
      storage.addLog({ aksi: `Tambah user: ${newUser.nama} (${newUser.peran})`, pelaku: 'Admin' })
    }
    setSaving(false)
    addToast('Akun berhasil dibuat!', 'success')
    navigate('/admin/kelola-user')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/admin/kelola-user')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Tambah User Baru</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nama Lengkap" required value={form.nama} onChange={e => set('nama', e.target.value)} error={errors.nama} placeholder="Nama pengguna" />
            <Input label="Username" required value={form.username} onChange={e => set('username', e.target.value)} error={errors.username} placeholder="Username minimal 4 karakter" />
            <Input label="Password" type="password" required value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} placeholder="Minimal 6 karakter" />

            <div className="space-y-1">
              <label className="label-form required">Role</label>
              <select className="input-field" value={form.peran} onChange={e => set('peran', e.target.value)}>
                <option value="guru">Guru / Karyawan</option>
                <option value="kepala_sekolah">Kepala Sekolah</option>
                <option value="admin">Admin</option>
                <option value="siswa">Siswa</option>
              </select>
            </div>

            {form.peran === 'guru' && <Input label="Jabatan" value={form.jabatan} onChange={e => set('jabatan', e.target.value)} placeholder="Jabatan (opsional)" />}

            {form.peran === 'siswa' && <Input label="Kelas" required value={form.kelas} onChange={e => set('kelas', e.target.value)} error={errors.kelas} placeholder="Contoh: X-A" />}

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}><Save className="w-4 h-4" /> Simpan Akun</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/kelola-user')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
