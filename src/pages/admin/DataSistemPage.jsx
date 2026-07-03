import { useState } from 'react'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { Save, Settings } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'

export default function DataSistemPage() {
  const konfig = storage.getKonfig()
  const { addToast } = useToast()

  const [form, setForm] = useState({
    namaPerpustakaan: konfig.namaPerpustakaan || '',
    dendaPerHari: konfig.dendaPerHari?.toString() || '500',
    batasHariPinjam: konfig.batasHariPinjam?.toString() || '7',
    maxBukuPerSiswa: konfig.maxBukuPerSiswa?.toString() || '3',
  })

  const [saving, setSaving] = useState(false)

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    storage.saveKonfig({
      namaPerpustakaan: form.namaPerpustakaan.trim(),
      dendaPerHari: parseInt(form.dendaPerHari, 10) || 500,
      batasHariPinjam: parseInt(form.batasHariPinjam, 10) || 7,
      maxBukuPerSiswa: parseInt(form.maxBukuPerSiswa, 10) || 3,
    })
    storage.addLog({ aksi: 'Perbarui konfigurasi sistem', pelaku: 'Admin' })
    setSaving(false)
    addToast('Konfigurasi berhasil disimpan!', 'success')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Pengaturan Sistem</h2>

      <Card>
        <CardHeader><h3 className="flex items-center gap-2 text-[16px]"><Settings className="w-5 h-5" /> Konfigurasi Perpustakaan</h3></CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nama Perpustakaan" required value={form.namaPerpustakaan} onChange={e => set('namaPerpustakaan', e.target.value)} />
            <Input label="Denda per Hari (Rp)" type="number" required value={form.dendaPerHari} onChange={e => set('dendaPerHari', e.target.value)} min="0" />
            <Input label="Batas Hari Pinjam" type="number" required value={form.batasHariPinjam} onChange={e => set('batasHariPinjam', e.target.value)} min="1" />
            <Input label="Maks Buku per Siswa" type="number" required value={form.maxBukuPerSiswa} onChange={e => set('maxBukuPerSiswa', e.target.value)} min="1" />

            <Button type="submit" loading={saving}><Save className="w-4 h-4" /> Simpan Konfigurasi</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
