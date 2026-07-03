import { useAuth } from '../contexts/AuthContext'
import { User, Shield, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { storage } from '../services/storage'
import { Card, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const roleLabels = {
  siswa: 'Siswa',
  guru: 'Guru/Karyawan',
  kepala_sekolah: 'Kepala Sekolah',
  admin: 'Admin',
}

export default function ProfilePage() {
  const { user } = useAuth()

  const fullData = (() => {
    if (user.peran === 'siswa') {
      return storage.getSiswa().find(s => s.idSiswa === user.id)
    }
    return storage.getUser().find(u => u.idUser === user.id)
  })()

  if (!fullData) {
    return <p className="text-sm text-neutral-500">Data tidak ditemukan.</p>
  }

  const isSiswa = user.peran === 'siswa'

  return (
    <div className="max-w-2xl">
      <Card>
        <CardBody className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-neutral-900">{fullData.nama}</h3>
              <p className="text-sm text-neutral-500">{roleLabels[user.peran]}</p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-3">
            <Field icon={User} label="Username" value={fullData.username} />
            {isSiswa && <Field icon={User} label="Kelas" value={fullData.kelas} />}
            {!isSiswa && fullData.jabatan && <Field icon={Shield} label="Jabatan" value={fullData.jabatan} />}
            <Field icon={Shield} label="Peran" value={<Badge variant="blue">{roleLabels[user.peran]}</Badge>} />
            <Field
              icon={Calendar}
              label="Bergabung"
              value={new Date(fullData.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            />
            <Field
              icon={fullData.isActive ? CheckCircle : XCircle}
              label="Status"
              value={
                <span className={fullData.isActive ? 'badge-green' : 'badge-red'}>
                  {fullData.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              }
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="w-4 h-4 text-neutral-500 shrink-0" />
      <span className="text-neutral-500 w-28 shrink-0">{label}</span>
      <span className="text-neutral-900">{value}</span>
    </div>
  )
}
