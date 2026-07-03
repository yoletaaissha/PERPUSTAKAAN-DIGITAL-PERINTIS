import { useMemo } from 'react'
import { storage } from '../../services/storage'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#1D4ED8', '#16A34A', '#D97706', '#DC2626', '#8B5CF6', '#EC4899', '#06B6D4']

export default function MinatBacaPage() {
  const pinjaman = storage.getPeminjaman()
  const buku = storage.getBuku()

  const dataKategori = useMemo(() => {
    const count = {}
    pinjaman.forEach(p => {
      const b = buku.find(bk => bk.idBuku === p.idBuku)
      if (b) count[b.kategori] = (count[b.kategori] || 0) + 1
    })
    return Object.entries(count)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [pinjaman, buku])

  const totalPinjaman = pinjaman.length

  const topCategories = useMemo(() => {
    return [...dataKategori].slice(0, 5)
  }, [dataKategori])

  const insight = useMemo(() => {
    if (dataKategori.length === 0) return ''
    const top = dataKategori[0]
    const pct = ((top.value / totalPinjaman) * 100).toFixed(1)
    const bottom = dataKategori[dataKategori.length - 1]
    return `Kategori "${top.name}" paling banyak dipinjam (${pct}% dari total). Kategori "${bottom.name}" paling sedikit dipinjam. Pertimbangkan untuk menambah koleksi di kategori yang populer dan mempromosikan kategori yang kurang diminati.`
  }, [dataKategori, totalPinjaman])

  if (pinjaman.length === 0) {
    return <EmptyState title="Belum ada data" description="Analisis akan tersedia setelah ada transaksi peminjaman." />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-[22px] font-semibold text-neutral-900">Analisis Minat Baca</h2>

      <Card>
        <CardHeader><h3 className="text-[16px]">Distribusi Peminjaman per Kategori</h3></CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={dataKategori} cx="50%" cy="50%" innerRadius={80} outerRadius={130} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {dataKategori.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-[16px]">Kategori Terpopuler (Top 5)</h3></CardHeader>
        <CardBody>
          <table className="table-data">
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Kategori</th>
                <th>Jumlah Pinjaman</th>
                <th>Persentase</th>
              </tr>
            </thead>
            <tbody>
              {topCategories.map((cat, i) => (
                <tr key={cat.name}>
                  <td className="text-center font-bold text-lg">{i + 1}</td>
                  <td className="font-medium">{cat.name}</td>
                  <td>{cat.value}</td>
                  <td>{((cat.value / totalPinjaman) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-[16px]">Insight</h3></CardHeader>
        <CardBody>
          <div className="p-4 rounded-lg bg-primary-light border border-primary/20">
            <p className="text-sm text-neutral-700 leading-relaxed">{insight}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
