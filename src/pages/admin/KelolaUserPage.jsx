import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { Plus, Edit3, Trash2, Shield, User, Users } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'

export default function KelolaUserPage() {
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const { addToast } = useToast()
  const [users, setUsers] = useState(storage.getUser())
  const [siswa] = useState(storage.getSiswa())
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const roleMap = { admin: 'Admin', guru: 'Guru/Karyawan', kepala_sekolah: 'Kepala Sekolah', siswa: 'Siswa' }

  const allAccounts = [
    ...users.map(u => ({ ...u, tipe: 'user' })),
    ...siswa.map(s => ({ ...s, idUser: s.idSiswa, peran: 'siswa', tipe: 'siswa' })),
  ].sort((a, b) => a.nama.localeCompare(b.nama))

  const handleDelete = () => {
    if (deleteTarget.idUser === currentUser.id) {
      addToast('Anda tidak dapat menghapus akun Anda sendiri.', 'error')
      setDeleteTarget(null)
      return
    }
    setDeleting(true)
    if (deleteTarget.tipe === 'siswa') {
      const updated = siswa.filter(s => s.idSiswa !== deleteTarget.idUser)
      storage.saveSiswa(updated)
    } else {
      const updated = users.filter(u => u.idUser !== deleteTarget.idUser)
      storage.saveUser(updated)
      setUsers(updated)
    }
    setDeleteTarget(null)
    setDeleting(false)
    addToast('Akun berhasil dihapus.', 'success')
    navigate('.', { replace: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[22px] font-semibold text-neutral-900">Kelola User</h2>
        <Button onClick={() => navigate('/admin/kelola-user/tambah')}>
          <Plus className="w-4 h-4" /> Tambah User
        </Button>
      </div>

      {allAccounts.length === 0 ? (
        <EmptyState title="Belum ada pengguna" description="Silakan tambah pengguna baru." />
      ) : (
        <Card>
          <CardBody className="p-0 overflow-x-auto">
            <table className="table-data">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {allAccounts.map(a => (
                  <tr key={a.idUser}>
                    <td className="font-medium">{a.nama}</td>
                    <td className="text-neutral-500">{a.username}</td>
                    <td><Badge variant={a.peran === 'admin' ? 'red' : a.peran === 'guru' ? 'blue' : a.peran === 'kepala_sekolah' ? 'yellow' : 'green'}>{roleMap[a.peran]}</Badge></td>
                    <td>{a.isActive ? <span className="badge-green">Aktif</span> : <span className="badge-red">Nonaktif</span>}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="btn-ghost btn-sm" onClick={() => navigate(`/admin/kelola-user/edit/${a.idUser}${a.tipe === 'siswa' ? '?tipe=siswa' : ''}`)} title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="btn-ghost btn-sm text-danger hover:bg-red-50" onClick={() => setDeleteTarget(a)} title="Hapus" disabled={a.idUser === currentUser.id}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Akun"
        message={`Apakah Anda yakin ingin menghapus akun "${deleteTarget?.nama}"? Semua data terkait akan ikut terhapus.`}
        confirmText="Ya, Hapus"
        loading={deleting}
      />
    </div>
  )
}
