import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { BookOpen, ClipboardList, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import KpiCard from '../../components/ui/KpiCard'

export default function DashboardKepsek() {
  const { user } = useAuth()
  const buku = storage.getBuku()
  const pinjaman = storage.getPeminjaman()
  const pengembalian = storage.getPengembalian()

  const now = new Date()
  const bulanIni = now.getMonth()
  const tahunIni = now.getFullYear()

  const pinjamanBulanIni = pinjaman.filter(p => {
    const d = new Date(p.tanggalPinjam)
    return d.getMonth() === bulanIni && d.getFullYear() === tahunIni
  })

  const totalDenda = pengembalian.reduce((sum, p) => sum + p.denda, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold text-neutral-900">Dashboard Kepala Sekolah</h2>
        <p className="text-sm text-neutral-500 mt-1">Selamat datang, {user.nama}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard icon={BookOpen} value={buku.length} label="Total Koleksi Buku" color="primary" />
        <KpiCard icon={ClipboardList} value={pinjamanBulanIni.length} label="Peminjaman Bulan Ini" color="blue" />
        <KpiCard icon={TrendingUp} value={pinjaman.length} label="Total Transaksi" color="green" />
        <KpiCard icon={DollarSign} value={`Rp${totalDenda.toLocaleString('id-ID')}`} label="Total Denda Terkumpul" color="warning" />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-[16px]">Ringkasan</h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-500">
            Gunakan menu Data Buku untuk melihat koleksi, Data Peminjaman untuk transaksi, atau Grafik untuk visualisasi data.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
