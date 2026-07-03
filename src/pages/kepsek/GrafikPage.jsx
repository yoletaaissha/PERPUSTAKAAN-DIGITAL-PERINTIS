import { useState, useMemo } from 'react'
import { storage } from '../../services/storage'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export default function GrafikPage() {
  const pinjaman = storage.getPeminjaman()
  const buku = storage.getBuku()

  const tahunList = useMemo(() => {
    const set = new Set(pinjaman.map(p => new Date(p.tanggalPinjam).getFullYear()))
    return Array.from(set).sort()
  }, [pinjaman])

  const [tahun, setTahun] = useState(tahunList[tahunList.length - 1] || new Date().getFullYear())

  const dataBulanan = useMemo(() => {
    const counts = Array(12).fill(0)
    pinjaman.forEach(p => {
      const d = new Date(p.tanggalPinjam)
      if (d.getFullYear() === tahun) counts[d.getMonth()]++
    })
    return counts.map((v, i) => ({ name: months[i], jumlah: v }))
  }, [pinjaman, tahun])

  const categories = ['Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Sastra', 'Referensi']

  const dataKategori = useMemo(() => {
    const now = new Date()
    const result = []
    for (let i = 5; i >= 0; i--) {
      const bulan = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const entry = { bulan: months[bulan.getMonth()] }
      categories.forEach(cat => {
        entry[cat] = pinjaman.filter(p => {
          const d = new Date(p.tanggalPinjam)
          const b = buku.find(bk => bk.idBuku === p.idBuku)
          return d.getMonth() === bulan.getMonth() && d.getFullYear() === bulan.getFullYear() && b?.kategori === cat
        }).length
      })
      result.push(entry)
    }
    return result
  }, [pinjaman, buku])

  const colors = ['#1D4ED8', '#16A34A', '#D97706', '#DC2626', '#8B5CF6', '#EC4899', '#06B6D4']

  if (pinjaman.length === 0) {
    return <EmptyState title="Belum ada data" description="Grafik akan tersedia setelah ada transaksi peminjaman." />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-[22px] font-semibold text-neutral-900">Grafik Peminjaman</h2>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-[16px]">Peminjaman Bulanan ({tahun})</h3>
            <select className="input-field w-32" value={tahun} onChange={e => setTahun(parseInt(e.target.value))}>
              {tahunList.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBulanan} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-[16px]">Tren Peminjaman per Kategori (6 Bulan)</h3></CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dataKategori} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              {categories.map((cat, i) => (
                <Line key={cat} type="monotone" dataKey={cat} stroke={colors[i % colors.length]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
