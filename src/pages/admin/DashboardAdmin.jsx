import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { Users, BookOpen, ClipboardList, Activity } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import KpiCard from '../../components/ui/KpiCard'

export default function DashboardAdmin() {
  const { user } = useAuth()
  const users = storage.getUser()
  const siswa = storage.getSiswa()
  const buku = storage.getBuku()
  const logs = storage.getLog()

  const totalAkun = users.filter(u => u.isActive).length + siswa.filter(s => s.isActive).length
  const totalBuku = buku.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold text-neutral-900">Dashboard Admin</h2>
        <p className="text-sm text-neutral-500 mt-1">Selamat datang, {user.nama}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard icon={Users} value={totalAkun} label="Total Akun Aktif" color="primary" />
        <KpiCard icon={BookOpen} value={totalBuku} label="Total Buku" color="blue" />
        <KpiCard icon={ClipboardList} value={logs.length} label="Log Aktivitas" color="green" />
        <KpiCard icon={Activity} value="Online" label="Status Sistem" color="warning" />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-[16px]">Informasi Sistem</h3>
        </CardHeader>
        <CardBody className="text-sm text-neutral-500 space-y-2">
          <p>Gunakan menu Kelola User untuk mengelola akun, Pengaturan Sistem untuk konfigurasi, atau Backup untuk maintenance data.</p>
        </CardBody>
      </Card>
    </div>
  )
}
