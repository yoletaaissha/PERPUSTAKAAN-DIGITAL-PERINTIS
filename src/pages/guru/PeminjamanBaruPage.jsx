import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Save } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import { generateId } from '../../lib/utils'

export default function PeminjamanBaruPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const konfig = storage.getKonfig()
  const siswa = storage.getSiswa().filter(s => s.isActive)
  const bukuFisik = storage.getBuku().filter(b => b.jenis === 'fisik' && b.stok > 0)
  const pinjaman = storage.getPeminjaman()

  const batasHariPinjam = konfig.batasHariPinjam || 7
  const maxBukuPerSiswa = konfig.maxBukuPerSiswa || 3

  const today = new Date().toISOString().split('T')[0]
  const defaultBatas = new Date(Date.now() + batasHariPinjam * 86400000).toISOString().split('T')[0]

  const [idSiswa, setIdSiswa] = useState('')
  const [idBuku, setIdBuku] = useState('')
  const [tanggalPinjam, setTanggalPinjam] = useState(today)
  const [batasKembali, setBatasKembali] = useState(defaultBatas)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const activeCount = useMemo(() => {
    if (!idSiswa) return 0
    return pinjaman.filter(p => p.idSiswa === idSiswa && (p.status === 'dipinjam' || p.status === 'terlambat')).length
  }, [idSiswa, pinjaman])

  const siswaMaxReached = activeCount >= maxBukuPerSiswa

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!idSiswa) errs.siswa = 'Pilih siswa'
    if (!idBuku) errs.buku = 'Pilih buku'
    if (!tanggalPinjam) errs.tanggal = 'Pilih tanggal pinjam'
    if (siswaMaxReached) errs.siswa = `Siswa ini sudah mencapai batas maksimal peminjaman (${maxBukuPerSiswa} buku). Minta siswa mengembalikan buku terlebih dahulu.`
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    const buku = storage.getBuku().find(b => b.idBuku === idBuku)
    if (!buku || buku.stok <= 0) {
      addToast('Maaf, stok buku ini baru saja habis. Silakan pilih buku lain.', 'error')
      setSaving(false)
      return
    }

    const all = storage.getPeminjaman()
    const newP = {
      idPinjam: generateId('PJ', all.map(p => p.idPinjam)),
      idSiswa, idBuku,
      tanggalPinjam: new Date(tanggalPinjam).toISOString(),
      batasKembali: new Date(batasKembali).toISOString(),
      status: 'dipinjam',
      createdAt: new Date().toISOString(),
    }
    storage.savePeminjaman([...all, newP])

    // Reduce stock
    const allBuku = storage.getBuku()
    const bIdx = allBuku.findIndex(b => b.idBuku === idBuku)
    allBuku[bIdx].stok -= 1
    storage.saveBuku(allBuku)
    storage.addLog({ aksi: `Catat peminjaman: ${buku.judul}`, pelaku: 'Guru' })
    setSaving(false)
    addToast('Peminjaman berhasil dicatat!', 'success')
    navigate('/guru/peminjaman')
  }

  const handleBatasChange = (e) => {
    setBatasKembali(e.target.value)
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/guru/peminjaman')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Catat Peminjaman Baru</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="label-form required">Pilih Siswa</label>
              <select className={`input-field ${errors.siswa ? 'input-error' : ''}`} value={idSiswa} onChange={e => { setIdSiswa(e.target.value); setErrors(f => ({ ...f, siswa: '' })) }}>
                <option value="">-- Pilih Siswa --</option>
                {siswa.map(s => <option key={s.idSiswa} value={s.idSiswa}>{s.nama} ({s.kelas})</option>)}
              </select>
              {errors.siswa && <p className="field-error">{errors.siswa}</p>}
              {idSiswa && (
                <p className={`text-xs ${siswaMaxReached ? 'text-danger font-semibold' : 'text-neutral-500'}`}>
                  Peminjaman aktif siswa ini: {activeCount}/{maxBukuPerSiswa}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="label-form required">Pilih Buku (Fisik)</label>
              <select className={`input-field ${errors.buku ? 'input-error' : ''}`} value={idBuku} onChange={e => setIdBuku(e.target.value)} disabled={siswaMaxReached}>
                <option value="">-- Pilih Buku --</option>
                {bukuFisik.map(b => <option key={b.idBuku} value={b.idBuku}>{b.judul} (Stok: {b.stok})</option>)}
              </select>
              {errors.buku && <p className="field-error">{errors.buku}</p>}
            </div>

            <Input label="Tanggal Pinjam" type="date" required value={tanggalPinjam} onChange={e => {
              setTanggalPinjam(e.target.value)
              const d = new Date(e.target.value)
              d.setDate(d.getDate() + batasHariPinjam)
              setBatasKembali(d.toISOString().split('T')[0])
            }} />

            <Input label="Batas Kembali" type="date" required value={batasKembali} onChange={handleBatasChange} />

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving} disabled={siswaMaxReached}><Save className="w-4 h-4" /> Simpan Peminjaman</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/guru/peminjaman')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
