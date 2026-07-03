import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Save, ToggleLeft, ToggleRight } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function EditUserPage() {
  const { idUser } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const { addToast } = useToast()

  const tipe = searchParams.get('tipe') || 'user'
  const existing = tipe === 'siswa' ? storage.getSiswa().find(s => s.idSiswa === idUser) : storage.getUser().find(u => u.idUser === idUser)

  const [form, setForm] = useState({ nama: '', username: '', password: '', peran: 'guru', jabatan: '', kelas: '', isActive: true })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (existing) {
      setForm({
        nama: existing.nama || '',
        username: existing.username || '',
        password: '',
        peran: existing.peran || 'guru',
        jabatan: existing.jabatan || '',
        kelas: existing.kelas || '',
        isActive: existing.isActive !== false,
      })
    }
  }, [existing])

  if (!existing) {
    return <div className="text-center py-12"><p className="text-neutral-500">User tidak ditemukan.</p></div>
  }

  const isSelf = currentUser.id === idUser && !tipe
  const set = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const validate = () => {
    const errs = {}
    if (!form.nama.trim()) errs.nama = 'Nama wajib diisi'
    if (!form.username.trim()) errs.username = 'Username wajib diisi'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSelf && !form.isActive) {
      addToast('Anda tidak dapat menonaktifkan akun Anda sendiri.', 'error')
      return
    }

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    if (tipe === 'siswa') {
      const all = storage.getSiswa()
      const idx = all.findIndex(s => s.idSiswa === idUser)
      if (idx !== -1) {
        all[idx].nama = form.nama.trim()
        all[idx].username = form.username.trim()
        all[idx].kelas = form.kelas.trim()
        all[idx].isActive = form.isActive
        if (form.password.trim()) all[idx].password = form.password.trim()
        storage.saveSiswa(all)
      }
    } else {
      const all = storage.getUser()
      const idx = all.findIndex(u => u.idUser === idUser)
      if (idx !== -1) {
        all[idx].nama = form.nama.trim()
        all[idx].username = form.username.trim()
        all[idx].peran = form.peran
        all[idx].jabatan = form.jabatan.trim()
        all[idx].isActive = form.isActive
        if (form.password.trim()) all[idx].password = form.password.trim()
        storage.saveUser(all)
      }
    }
    storage.addLog({ aksi: `Edit user: ${form.nama}`, pelaku: 'Admin' })
    setSaving(false)
    addToast('Akun berhasil diperbarui!', 'success')
    navigate('/admin/kelola-user')
  }

  const toggleActive = () => {
    if (isSelf && form.isActive) {
      addToast('Anda tidak dapat menonaktifkan akun Anda sendiri.', 'error')
      return
    }
    if (form.isActive) {
      setConfirmOpen(true)
    } else {
      set('isActive', true)
    }
  }

  const confirmDeactivate = () => {
    set('isActive', false)
    setConfirmOpen(false)
  }

  const isSiswa = tipe === 'siswa'

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/admin/kelola-user')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Edit User</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nama Lengkap" required value={form.nama} onChange={e => set('nama', e.target.value)} error={errors.nama} />
            <Input label="Username" required value={form.username} onChange={e => set('username', e.target.value)} error={errors.username} />
            <Input label="Password Baru" type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Kosongkan jika tidak ingin mengubah" />

            {!isSiswa && (
              <div className="space-y-1">
                <label className="label-form required">Role</label>
                <select className="input-field" value={form.peran} onChange={e => set('peran', e.target.value)}>
                  <option value="guru">Guru / Karyawan</option>
                  <option value="kepala_sekolah">Kepala Sekolah</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {!isSiswa && form.peran === 'guru' && <Input label="Jabatan" value={form.jabatan} onChange={e => set('jabatan', e.target.value)} />}
            {isSiswa && <Input label="Kelas" required value={form.kelas} onChange={e => set('kelas', e.target.value)} error={errors.kelas} />}

            <div className="space-y-1">
              <label className="label-form">Status Akun</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={toggleActive} className="flex items-center gap-2 text-sm">
                  {form.isActive ? <ToggleRight className="w-6 h-6 text-success" /> : <ToggleLeft className="w-6 h-6 text-neutral-400" />}
                  <span className={form.isActive ? 'badge-green' : 'badge-red'}>{form.isActive ? 'Aktif' : 'Nonaktif'}</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}><Save className="w-4 h-4" /> Simpan Perubahan</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/kelola-user')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDeactivate}
        title="Nonaktifkan Akun"
        message={`Apakah Anda yakin ingin menonaktifkan akun "${existing.nama}"? Pengguna ini tidak akan bisa login.`}
        confirmText="Ya, Nonaktifkan"
        variant="danger"
      />
    </div>
  )
}
