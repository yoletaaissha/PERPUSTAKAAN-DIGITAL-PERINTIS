import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { BookOpen, Clock, AlertTriangle, Bell, Star } from 'lucide-react'
import { daysUntil, formatDateShort } from '../../lib/utils'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import KpiCard from '../../components/ui/KpiCard'
import EmptyState from '../../components/ui/EmptyState'

export default function DashboardSiswa() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const pinjaman = storage.getPeminjaman().filter(p => p.idSiswa === user.id)
  const notifikasi = storage.getNotifikasi().filter(n => n.idSiswa === user.id && !n.isRead)
  const buku = storage.getBuku()
  const review = storage.getReview()

  const activePinjaman = pinjaman.filter(p => p.status === 'dipinjam' || p.status === 'terlambat')
  const terlambat = pinjaman.filter(p => p.status === 'terlambat')

  const getJudul = (id) => buku.find(b => b.idBuku === id)?.judul || '-'

  // UC-007: Rekomendasi
  const displayRecs = useMemo(() => {
    const history = pinjaman.filter(p => p.status === 'dikembalikan')
    if (history.length === 0) return { books: [], label: '' }
    const catCount = {}
    history.forEach(p => {
      const b = buku.find(bk => bk.idBuku === p.idBuku)
      if (b) catCount[b.kategori] = (catCount[b.kategori] || 0) + 1
    })
    const sorted = Object.entries(catCount).sort((a, b) => b[1] - a[1])
    const topCat = sorted[0]?.[0]
    if (!topCat) return { books: [], label: '' }
    const borrowedIds = new Set(pinjaman.map(p => p.idBuku))
    let recs = buku.filter(b => b.kategori === topCat && !borrowedIds.has(b.idBuku)).slice(0, 4)
    if (recs.length < 4) {
      const topCat2 = sorted[1]?.[0]
      if (topCat2) {
        const more = buku.filter(b => b.kategori === topCat2 && !borrowedIds.has(b.idBuku) && !recs.find(r => r.idBuku === b.idBuku)).slice(0, 4 - recs.length)
        recs = [...recs, ...more]
      }
    }
    if (recs.length < 4) {
      const topRated = buku.filter(b => !borrowedIds.has(b.idBuku) && !recs.find(r => r.idBuku === b.idBuku))
        .sort((a, b) => {
          const ra = review.filter(r => r.idBuku === a.idBuku).reduce((s, r) => s + r.rating, 0) / Math.max(1, review.filter(r => r.idBuku === a.idBuku).length)
          const rb = review.filter(r => r.idBuku === b.idBuku).reduce((s, r) => s + r.rating, 0) / Math.max(1, review.filter(r => r.idBuku === b.idBuku).length)
          return rb - ra
        }).slice(0, 4 - recs.length)
      recs = [...recs, ...topRated]
    }
    return { books: recs, label: `Karena Anda menyukai ${topCat}` }
  }, [pinjaman, buku, review])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold text-neutral-900">Selamat datang, {user.nama}!</h2>
        <p className="text-sm text-neutral-500 mt-1">Kelola peminjaman buku Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard icon={BookOpen} value={activePinjaman.length} label="Peminjaman Aktif" color="primary" />
        <KpiCard icon={Clock} value={notifikasi.length} label="Notifikasi Baru" color="warning" />
        <KpiCard icon={AlertTriangle} value={terlambat.length} label="Terlambat" color="danger" />
      </div>

      {notifikasi.length > 0 && (
        <Card>
          <CardHeader><h3 className="flex items-center gap-2 text-[16px]"><Bell className="w-5 h-5 text-warning" /> Notifikasi</h3></CardHeader>
          <CardBody className="space-y-2">
            {notifikasi.slice(0, 3).map(n => (
              <div key={n.idNotifikasi} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${n.tipeNotifikasi === 'terlambat' ? 'bg-red-50' : 'bg-amber-50'}`}>
                {n.tipeNotifikasi === 'terlambat' ? <AlertTriangle className="w-4 h-4 text-danger mt-0.5 shrink-0" /> : <Clock className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
                <p className="text-neutral-700">{n.pesan}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {displayRecs.books.length > 0 && (
        <Card>
          <CardHeader><h3 className="flex items-center gap-2 text-[16px]"><Star className="w-5 h-5 text-amber-400" /> Rekomendasi untuk Anda</h3></CardHeader>
          <CardBody>
            <p className="text-xs text-neutral-500 mb-3">{displayRecs.label}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {displayRecs.books.map(b => (
                <div key={b.idBuku} className="cursor-pointer group" onClick={() => navigate(`/siswa/katalog/${b.idBuku}`)}>
                  <img src={b.coverUrl} alt={b.judul} className="w-full h-32 object-cover rounded-md bg-neutral-100 mb-2"
                    onError={(e) => { e.target.src = 'https://placehold.co/150x200?text=No+Cover' }} />
                  <p className="text-xs font-medium text-neutral-900 truncate group-hover:text-primary">{b.judul}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{b.penulis}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader><h3 className="text-[16px]">Peminjaman Aktif</h3></CardHeader>
        <CardBody className="p-0">
          {activePinjaman.length === 0 ? (
            <div className="p-5 text-center text-sm text-neutral-500">Tidak ada peminjaman aktif.</div>
          ) : (
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
                {activePinjaman.map(p => {
                  const sisa = daysUntil(p.batasKembali)
                  return (
                    <tr key={p.idPinjam}>
                      <td className="font-medium">{getJudul(p.idBuku)}</td>
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
          )}
        </CardBody>
      </Card>
    </div>
  )
}
