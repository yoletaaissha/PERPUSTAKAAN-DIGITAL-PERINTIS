import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { BookOpen, ClipboardList, RotateCcw, Users } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import KpiCard from '../../components/ui/KpiCard'

export default function DashboardGuru() {
  const { user } = useAuth()
  const buku = storage.getBuku()
  const pinjaman = storage.getPeminjaman()
  const siswa = storage.getSiswa()

  const totalBuku = buku.length
  const totalFisik = buku.filter(b => b.jenis === 'fisik').length
  const totalDigital = buku.filter(b => b.jenis === 'digital').length
  const peminjamanAktif = pinjaman.filter(p => p.status === 'dipinjam').length
  const totalSiswa = siswa.filter(s => s.isActive).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold text-neutral-900">Dashboard Guru</h2>
        <p className="text-sm text-neutral-500 mt-1">Selamat datang, {user.nama}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard icon={BookOpen} value={totalBuku} label={`Total Buku (${totalFisik} fisik, ${totalDigital} digital)`} color="primary" />
        <KpiCard icon={ClipboardList} value={peminjamanAktif} label="Peminjaman Aktif" color="blue" />
        <KpiCard icon={RotateCcw} value={pinjaman.filter(p => p.status === 'dikembalikan').length} label="Selesai" color="green" />
        <KpiCard icon={Users} value={totalSiswa} label="Siswa Aktif" color="warning" />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-[16px]">Aktivitas Terbaru</h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-500">
            Gunakan menu Kelola Buku untuk mengelola koleksi, atau menu Peminjaman untuk mencatat transaksi.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
