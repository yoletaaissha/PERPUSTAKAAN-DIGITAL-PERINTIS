import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { Plus } from 'lucide-react'
import { formatDateShort } from '../../lib/utils'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'

export default function PeminjamanPage() {
  const navigate = useNavigate()
  const [pinjaman] = useState(storage.getPeminjaman())
  const [siswa] = useState(storage.getSiswa())
  const [buku] = useState(storage.getBuku())

  const getNama = (id) => siswa.find(s => s.idSiswa === id)?.nama || '-'
  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'

  if (pinjaman.length === 0) {
    return <EmptyState title="Belum ada transaksi peminjaman" description="Catat peminjaman baru untuk memulai."
      actionLabel="+ Catat Peminjaman Baru" onAction={() => navigate('/guru/peminjaman/baru')} />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[22px] font-semibold text-neutral-900">Kelola Peminjaman</h2>
        <Button onClick={() => navigate('/guru/peminjaman/baru')}>
          <Plus className="w-4 h-4" /> Catat Peminjaman Baru
        </Button>
      </div>

      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Siswa</th>
                <th>Kelas</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pinjaman.map(p => (
                <tr key={p.idPinjam}>
                  <td className="font-medium">{getNama(p.idSiswa)}</td>
                  <td>{siswa.find(s => s.idSiswa === p.idSiswa)?.kelas || '-'}</td>
                  <td>{getJudul(p.idBuku)}</td>
                  <td>{formatDateShort(p.tanggalPinjam)}</td>
                  <td>{formatDateShort(p.batasKembali)}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}
