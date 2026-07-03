import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { formatDateShort } from '../../lib/utils'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'

export default function PengembalianPage() {
  const navigate = useNavigate()
  const pinjaman = storage.getPeminjaman().filter(p => p.status === 'dipinjam' || p.status === 'terlambat')
  const siswa = storage.getSiswa()
  const buku = storage.getBuku()

  const getNama = (id) => siswa.find(s => s.idSiswa === id)?.nama || '-'
  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'

  if (pinjaman.length === 0) {
    return <EmptyState title="Tidak ada peminjaman aktif" description="Semua buku sudah dikembalikan." />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Kelola Pengembalian</h2>
      <Card>
        <CardHeader><h3 className="text-[16px]">Peminjaman Belum Dikembalikan</h3></CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Siswa</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pinjaman.map(p => (
                <tr key={p.idPinjam}>
                  <td className="font-medium">{getNama(p.idSiswa)}</td>
                  <td>{getJudul(p.idBuku)}</td>
                  <td>{formatDateShort(p.tanggalPinjam)}</td>
                  <td>{formatDateShort(p.batasKembali)}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td className="text-right">
                    <Button size="sm" onClick={() => navigate(`/guru/pengembalian/proses/${p.idPinjam}`)}>
                      Proses Pengembalian
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}
