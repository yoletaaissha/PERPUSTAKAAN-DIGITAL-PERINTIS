import { useState, useMemo } from 'react'
import { storage } from '../../services/storage'
import { Printer } from 'lucide-react'
import { formatDateShort, formatDate } from '../../lib/utils'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'

export default function LaporanPage() {
  const pinjaman = storage.getPeminjaman()
  const pengembalian = storage.getPengembalian()
  const siswa = storage.getSiswa()
  const buku = storage.getBuku()

  const [tglMulai, setTglMulai] = useState('')
  const [tglAkhir, setTglAkhir] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const getNama = (id) => siswa.find(s => s.idSiswa === id)?.nama || '-'
  const getKelas = (id) => siswa.find(s => s.idSiswa === id)?.kelas || '-'
  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'
  const getTglKembali = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k ? formatDateShort(k.tanggalKembali) : '-'
  }
  const getDenda = (idPinjam) => {
    const k = pengembalian.find(p => p.idPinjam === idPinjam)
    return k ? k.denda : 0
  }

  const filtered = useMemo(() => {
    if (!submitted) return []
    let data = [...pinjaman]
    if (tglMulai) data = data.filter(p => new Date(p.tanggalPinjam) >= new Date(tglMulai))
    if (tglAkhir) data = data.filter(p => new Date(p.tanggalPinjam) <= new Date(tglAkhir + 'T23:59:59'))
    if (filterStatus !== 'semua') data = data.filter(p => p.status === filterStatus)
    return data.sort((a, b) => new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam))
  }, [pinjaman, tglMulai, tglAkhir, filterStatus, submitted])

  const totalDenda = filtered.reduce((s, p) => s + getDenda(p.idPinjam), 0)

  const handleShow = () => {
    if (tglMulai && tglAkhir && new Date(tglMulai) > new Date(tglAkhir)) {
      setError('Tanggal mulai tidak boleh melebihi tanggal akhir.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  const handlePrint = () => window.print()

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Generate Laporan Peminjaman</h2>

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[150px]">
              <label className="label-form">Tanggal Mulai</label>
              <input type="date" className="input-field" value={tglMulai} onChange={e => { setTglMulai(e.target.value); setSubmitted(false) }} />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="label-form">Tanggal Akhir</label>
              <input type="date" className="input-field" value={tglAkhir} onChange={e => { setTglAkhir(e.target.value); setSubmitted(false) }} />
            </div>
            <div className="w-36">
              <label className="label-form">Status</label>
              <select className="input-field" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setSubmitted(false) }}>
                <option value="semua">Semua</option>
                <option value="dipinjam">Dipinjam</option>
                <option value="dikembalikan">Dikembalikan</option>
                <option value="terlambat">Terlambat</option>
              </select>
            </div>
            <Button onClick={handleShow}>Tampilkan Laporan</Button>
          </div>
          {error && <p className="field-error mt-2">{error}</p>}
        </CardBody>
      </Card>

      {submitted && (
        <>
          {filtered.length === 0 ? (
            <EmptyState title="Tidak ada data" description="Tidak ada transaksi dalam periode yang dipilih." />
          ) : (
            <>
              <div className="print-only">
                <h3 className="text-[18px] font-semibold mb-2">Laporan Peminjaman Perpustakaan</h3>
                <p className="text-sm text-neutral-500 mb-4">
                  Periode: {tglMulai ? formatDate(tglMulai) : 'Awal'} – {tglAkhir ? formatDate(tglAkhir) : 'Sekarang'}
                </p>
              </div>

              <Card>
                <div className="card-header flex items-center justify-between no-print">
                  <h3 className="text-[16px]">Hasil Laporan ({filtered.length} transaksi)</h3>
                  <Button variant="outline" onClick={handlePrint}><Printer className="w-4 h-4" /> Cetak Laporan</Button>
                </div>
                <CardBody className="p-0 overflow-x-auto">
                  <table className="table-data">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Siswa</th>
                        <th>Kelas</th>
                        <th>Buku</th>
                        <th>Tanggal Pinjam</th>
                        <th>Batas Kembali</th>
                        <th>Tanggal Kembali</th>
                        <th>Status</th>
                        <th>Denda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p, i) => (
                        <tr key={p.idPinjam}>
                          <td>{i + 1}</td>
                          <td className="font-medium">{getNama(p.idSiswa)}</td>
                          <td>{getKelas(p.idSiswa)}</td>
                          <td>{getJudul(p.idBuku)}</td>
                          <td>{formatDateShort(p.tanggalPinjam)}</td>
                          <td>{formatDateShort(p.batasKembali)}</td>
                          <td>{getTglKembali(p.idPinjam)}</td>
                          <td><StatusBadge status={p.status} /></td>
                          <td>{getDenda(p.idPinjam) > 0 ? `Rp${getDenda(p.idPinjam).toLocaleString('id-ID')}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>

              <div className="flex gap-4 text-sm">
                <div className="card px-4 py-3">
                  <span className="text-neutral-500">Total Transaksi:</span>
                  <span className="font-bold text-neutral-900 ml-2">{filtered.length}</span>
                </div>
                <div className="card px-4 py-3">
                  <span className="text-neutral-500">Total Denda:</span>
                  <span className="font-bold text-danger ml-2">Rp{totalDenda.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
