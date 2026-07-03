import { useState } from 'react'
import { storage } from '../../services/storage'
import { formatDateShort } from '../../lib/utils'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import EmptyState from '../../components/ui/EmptyState'

export default function DataPeminjamanPage() {
  const [page, setPage] = useState(1)
  const perPage = 10

  const pinjaman = storage.getPeminjaman()
    .sort((a, b) => new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam))
  const siswa = storage.getSiswa()
  const buku = storage.getBuku()
  const pengembalian = storage.getPengembalian()

  const getNama = (id) => siswa.find(s => s.idSiswa === id)?.nama || '-'
  const getKelas = (id) => siswa.find(s => s.idSiswa === id)?.kelas || '-'
  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'
  const getTglKembali = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k ? formatDateShort(k.tanggalKembali) : '-'
  }
  const getDenda = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k?.denda || 0
  }

  if (pinjaman.length === 0) {
    return <EmptyState title="Belum ada data transaksi" description="Data peminjaman akan muncul setelah ada transaksi." />
  }

  const paged = pinjaman.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Data Peminjaman</h2>
      <Card>
        <CardHeader><h3 className="text-[16px]">Semua Transaksi ({pinjaman.length})</h3></CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Siswa</th>
                <th>Kelas</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Tgl Kembali</th>
                <th>Denda</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(p => (
                <tr key={p.idPinjam}>
                  <td className="font-medium">{getNama(p.idSiswa)}</td>
                  <td>{getKelas(p.idSiswa)}</td>
                  <td>{getJudul(p.idBuku)}</td>
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
