import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Save } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'

const categories = ['Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Sastra', 'Referensi']

export default function EditBukuPage() {
  const { idBuku } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const existing = storage.getBuku().find(b => b.idBuku === idBuku)
  const [form, setForm] = useState({ judul: '', penulis: '', penerbit: '', tahunTerbit: '', kategori: 'Fiksi', jenis: 'fisik', stok: '', pdfUrl: '', coverUrl: '', deskripsi: '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (existing) {
      setForm({
        judul: existing.judul || '',
        penulis: existing.penulis || '',
        penerbit: existing.penerbit || '',
        tahunTerbit: existing.tahunTerbit?.toString() || '',
        kategori: existing.kategori || 'Fiksi',
        jenis: existing.jenis || 'fisik',
        stok: existing.stok?.toString() || '',
        pdfUrl: existing.pdfUrl || '',
        coverUrl: existing.coverUrl || '',
        deskripsi: existing.deskripsi || '',
      })
    }
  }, [existing])

  if (!existing) {
    return <div className="text-center py-12"><p className="text-neutral-500">Buku tidak ditemukan.</p></div>
  }

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const validate = () => {
    const errs = {}
    if (!form.judul.trim()) errs.judul = 'Judul tidak boleh kosong'
    if (!form.penulis.trim()) errs.penulis = 'Penulis tidak boleh kosong'
    if (form.jenis === 'fisik') {
      const stok = parseInt(form.stok, 10)
      if (isNaN(stok) || stok < 0) errs.stok = 'Stok harus angka positif atau nol'
    }
    if (form.jenis === 'digital' && !form.pdfUrl.trim()) errs.pdfUrl = 'URL PDF wajib diisi'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    const all = storage.getBuku()
    const idx = all.findIndex(b => b.idBuku === idBuku)
    if (idx === -1) return

    const pinjamanAktif = storage.getPeminjaman().some(p => p.idBuku === idBuku && (p.status === 'dipinjam' || p.status === 'terlambat'))

    all[idx] = {
      ...all[idx],
      judul: form.judul.trim(),
      penulis: form.penulis.trim(),
      kategori: form.kategori,
      jenis: form.jenis,
      stok: form.jenis === 'fisik' ? parseInt(form.stok, 10) : 0,
      pdfUrl: form.jenis === 'digital' ? form.pdfUrl.trim() : '',
      coverUrl: form.coverUrl.trim() || 'https://placehold.co/150x200?text=Buku',
      tahunTerbit: form.tahunTerbit ? parseInt(form.tahunTerbit, 10) : new Date().getFullYear(),
      penerbit: form.penerbit.trim(),
      deskripsi: form.deskripsi.trim(),
    }
    storage.saveBuku(all)
    storage.addLog({ aksi: `Edit buku: ${form.judul}`, pelaku: 'Guru' })
    setSaving(false)
    if (pinjamanAktif) {
      addToast('Data buku berhasil diperbarui! Perhatian: Buku sedang dipinjam, perubahan stok berlaku setelah dikembalikan.', 'success')
    } else {
      addToast('Data buku berhasil diperbarui!', 'success')
    }
    navigate('/guru/kelola-buku')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/guru/kelola-buku')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Edit Buku</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Judul Buku" required value={form.judul} onChange={e => set('judul', e.target.value)} error={errors.judul} />
            <Input label="Penulis" required value={form.penulis} onChange={e => set('penulis', e.target.value)} error={errors.penulis} />
            <Input label="Penerbit" value={form.penerbit} onChange={e => set('penerbit', e.target.value)} />
            <Input label="Tahun Terbit" type="number" value={form.tahunTerbit} onChange={e => set('tahunTerbit', e.target.value)} />
            <div className="space-y-1">
              <label className="label-form required">Kategori</label>
              <select className="input-field" value={form.kategori} onChange={e => set('kategori', e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="label-form required">Jenis Buku</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="jenis" value="fisik" checked={form.jenis === 'fisik'} onChange={e => set('jenis', e.target.value)} className="text-primary" /> Fisik
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="jenis" value="digital" checked={form.jenis === 'digital'} onChange={e => set('jenis', e.target.value)} className="text-primary" /> Digital
                </label>
              </div>
            </div>
            {form.jenis === 'fisik' && (
              <Input label="Stok" type="number" required value={form.stok} onChange={e => set('stok', e.target.value)} error={errors.stok} min="0" />
            )}
            {form.jenis === 'digital' && (
              <Input label="URL File PDF" required value={form.pdfUrl} onChange={e => set('pdfUrl', e.target.value)} error={errors.pdfUrl} placeholder="https://example.com/buku.pdf" />
            )}
            <Input label="URL Gambar Sampul" value={form.coverUrl} onChange={e => set('coverUrl', e.target.value)} />
            <div className="space-y-1">
              <label className="label-form">Deskripsi</label>
              <textarea className="input-field min-h-[80px]" value={form.deskripsi} onChange={e => set('deskripsi', e.target.value)} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}><Save className="w-4 h-4" /> Simpan Perubahan</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/guru/kelola-buku')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
