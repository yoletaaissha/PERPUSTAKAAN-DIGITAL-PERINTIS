import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { formatDateShort, daysUntil } from '../../lib/utils'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'

export default function PinjamanSayaPage() {
  const { user } = useAuth()
  const pinjaman = storage.getPeminjaman().filter(p => p.idSiswa === user.id && (p.status === 'dipinjam' || p.status === 'terlambat'))
  const buku = storage.getBuku()

  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'
  const getCover = (id) => buku.find(b => b.idBuku === id)?.coverUrl || ''

  if (pinjaman.length === 0) {
    return <EmptyState title="Tidak ada peminjaman aktif" description="Anda belum meminjam buku apa pun. Kunjungi katalog untuk memulai." />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Peminjaman Saya</h2>
      <Card>
        <CardHeader><h3 className="text-[16px]">Peminjaman Aktif ({pinjaman.length})</h3></CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Sisa Hari</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pinjaman.map(p => {
                const sisa = daysUntil(p.batasKembali)
                return (
                  <tr key={p.idPinjam}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={getCover(p.idBuku)} alt="" className="w-10 h-14 object-cover rounded bg-neutral-100" />
                        <span className="font-medium">{getJudul(p.idBuku)}</span>
                      </div>
                    </td>
                    <td>{formatDateShort(p.tanggalPinjam)}</td>
                    <td>{formatDateShort(p.batasKembali)}</td>
                    <td>
                      <span className={sisa <= 0 ? 'text-danger font-semibold' : sisa <= 2 ? 'text-warning font-semibold' : ''}>
                        {sisa <= 0 ? `${Math.abs(sisa)} hari terlambat` : `${sisa} hari`}
                      </span>
                    </td>
                    <td><StatusBadge status={p.status} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}
