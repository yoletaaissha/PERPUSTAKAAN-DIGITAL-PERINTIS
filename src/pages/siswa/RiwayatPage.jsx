import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { formatDateShort } from '../../lib/utils'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import EmptyState from '../../components/ui/EmptyState'

export default function RiwayatPage() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const perPage = 10

  const pinjaman = storage.getPeminjaman()
    .filter(p => p.idSiswa === user.id)
    .sort((a, b) => new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam))
  const buku = storage.getBuku()
  const pengembalian = storage.getPengembalian()

  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'
  const getCover = (id) => buku.find(b => b.idBuku === id)?.coverUrl || ''
  const getTglKembali = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k ? formatDateShort(k.tanggalKembali) : '-'
  }
  const getDenda = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k?.denda || 0
  }

  if (pinjaman.length === 0) {
    return <EmptyState title="Belum ada riwayat" description="Riwayat peminjaman akan muncul di sini setelah Anda meminjam buku." />
  }

  const paged = pinjaman.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Riwayat Peminjaman</h2>
      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Tanggal Kembali</th>
                <th>Denda</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(p => (
                <tr key={p.idPinjam}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={getCover(p.idBuku)} alt="" className="w-10 h-14 object-cover rounded bg-neutral-100" />
                      <span className="font-medium">{getJudul(p.idBuku)}</span>
                    </div>
                  </td>
                  <td>{formatDateShort(p.tanggalPinjam)}</td>
                  <td>{formatDateShort(p.batasKembali)}</td>
                  <td>{getTglKembali(p.idPinjam)}</td>
                  <td>{getDenda(p.idPinjam) > 0 ? `Rp${getDenda(p.idPinjam).toLocaleString('id-ID')}` : '-'}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <Pagination current={page} total={pinjaman.length} pageSize={perPage} onChange={setPage} />
      </Card>
    </div>
  )
}
