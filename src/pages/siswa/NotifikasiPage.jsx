import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'
import { Bell, Clock, AlertTriangle, CheckCheck } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { formatDateShort, daysUntil, generateId } from '../../lib/utils'

function generateNotifikasi(pinjaman, existingNotif, buku) {
  const now = new Date()
  const newNotifs = []
  pinjaman.forEach(p => {
    const sisa = daysUntil(p.batasKembali)
    const hasJatuhTempo = existingNotif.some(n => n.idPinjam === p.idPinjam && n.tipeNotifikasi === 'jatuh_tempo')
    const hasTerlambat = existingNotif.some(n => n.idPinjam === p.idPinjam && n.tipeNotifikasi === 'terlambat')
    const judul = buku.find(b => b.idBuku === p.idBuku)?.judul || 'Buku'

    if (sisa <= 2 && sisa > 0 && !hasJatuhTempo) {
      newNotifs.push({
        idNotifikasi: generateId('NT', existingNotif.map(n => n.idNotifikasi).concat(newNotifs.map(n => n.idNotifikasi))),
        idSiswa: p.idSiswa, idPinjam: p.idPinjam,
        pesan: `Buku "${judul}" akan jatuh tempo dalam ${sisa} hari. Segera kembalikan.`,
        tipeNotifikasi: 'jatuh_tempo', isRead: false, createdAt: now.toISOString(),
      })
    }

    if (sisa <= 0 && !hasTerlambat) {
      newNotifs.push({
        idNotifikasi: generateId('NT', existingNotif.map(n => n.idNotifikasi).concat(newNotifs.map(n => n.idNotifikasi))),
        idSiswa: p.idSiswa, idPinjam: p.idPinjam,
        pesan: `Buku "${judul}" sudah terlambat ${Math.abs(sisa)} hari! Segera kembalikan dan bayar denda.`,
        tipeNotifikasi: 'terlambat', isRead: false, createdAt: now.toISOString(),
      })
    }
  })
  return newNotifs
}

export default function NotifikasiPage() {
  const { user } = useAuth()
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const pinjaman = storage.getPeminjaman().filter(p => p.idSiswa === user.id && (p.status === 'dipinjam' || p.status === 'terlambat'))
    const existingNotif = storage.getNotifikasi()
    const buku = storage.getBuku()
    const newNotifs = generateNotifikasi(pinjaman, existingNotif, buku)
    if (newNotifs.length > 0) {
      storage.saveNotifikasi([...existingNotif, ...newNotifs])
    }

    const marked = storage.getNotifikasi().map(n => {
      if (n.idSiswa === user.id && !n.isRead) return { ...n, isRead: true }
      return n
    })
    storage.saveNotifikasi(marked)
    forceUpdate(n => n + 1)
  }, [user.id])

  const semuaNotif = storage.getNotifikasi().filter(n => n.idSiswa === user.id)

  const sorted = [...semuaNotif].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  if (sorted.length === 0) {
    return <EmptyState title="Tidak ada notifikasi" description="Notifikasi akan muncul di sini ketika ada informasi penting." />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Notifikasi</h2>
      <Card>
        <CardHeader><h3 className="flex items-center gap-2 text-[16px]"><Bell className="w-5 h-5" /> Semua Notifikasi</h3></CardHeader>
        <CardBody className="space-y-2">
          {sorted.map(n => (
            <div key={n.idNotifikasi} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${n.tipeNotifikasi === 'terlambat' ? 'bg-red-50 border border-red-100' : n.tipeNotifikasi === 'jatuh_tempo' ? 'bg-amber-50 border border-amber-100' : 'bg-neutral-50'}`}>
              <div className={`p-1.5 rounded-full shrink-0 ${n.tipeNotifikasi === 'terlambat' ? 'bg-red-100' : 'bg-amber-100'}`}>
                {n.tipeNotifikasi === 'terlambat' ? <AlertTriangle className="w-4 h-4 text-danger" /> : <Clock className="w-4 h-4 text-warning" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-neutral-700">{n.pesan}</p>
                <p className="text-xs text-neutral-400 mt-1">{formatDateShort(n.createdAt)}</p>
              </div>
              {n.isRead && <CheckCheck className="w-4 h-4 text-success shrink-0" />}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
