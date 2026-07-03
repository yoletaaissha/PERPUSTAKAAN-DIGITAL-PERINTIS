import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { Plus, Edit3, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'

export default function KelolaBukuPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [buku, setBuku] = useState(storage.getBuku())
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const pinjaman = storage.getPeminjaman()

  const handleDelete = () => {
    const isBorrowed = pinjaman.some(p => p.idBuku === deleteTarget.idBuku && (p.status === 'dipinjam' || p.status === 'terlambat'))
    if (isBorrowed) {
      setDeleteError('Buku ini tidak dapat dihapus karena sedang dipinjam oleh siswa. Selesaikan proses pengembalian terlebih dahulu.')
      return
    }
    setDeleting(true)
    const updated = buku.filter(b => b.idBuku !== deleteTarget.idBuku)
    storage.saveBuku(updated)
    setBuku(updated)
    setDeleteTarget(null)
    setDeleteError('')
    setDeleting(false)
    addToast('Buku berhasil dihapus dari koleksi.', 'success')
  }

  if (buku.length === 0) {
    return <EmptyState icon={() => null} title="Belum ada buku" description="Silakan tambah buku baru."
      actionLabel="+ Tambah Buku" onAction={() => navigate('/guru/kelola-buku/tambah')} />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[22px] font-semibold text-neutral-900">Kelola Buku</h2>
        <Button onClick={() => navigate('/guru/kelola-buku/tambah')}>
          <Plus className="w-4 h-4" /> Tambah Buku
        </Button>
      </div>

      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Jenis</th>
                <th>Stok</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {buku.map(b => (
                <tr key={b.idBuku}>
                  <td className="font-medium">{b.judul}</td>
                  <td>{b.penulis}</td>
                  <td><span className="badge-blue">{b.kategori}</span></td>
                  <td><StatusBadge status={b.jenis === 'fisik' ? 'dipinjam' : 'digital'} /></td>
                  <td>{b.jenis === 'fisik' ? (b.stok > 0 ? <span className="badge-green">{b.stok}</span> : <span className="badge-red">0</span>) : '-'}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="btn-ghost btn-sm" onClick={() => navigate(`/guru/kelola-buku/edit/${b.idBuku}`)} title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost btn-sm text-danger hover:bg-red-50" onClick={() => { setDeleteTarget(b); setDeleteError('') }} title="Hapus">
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

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => { setDeleteTarget(null); setDeleteError('') }}
        onConfirm={handleDelete}
        title="Konfirmasi Hapus"
        message={deleteError || `Apakah Anda yakin ingin menghapus buku "${deleteTarget?.judul}"? Aksi ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        variant="danger"
        loading={deleting}
      />
    </div>
  )
}
