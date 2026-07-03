import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Save } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import { generateId } from '../../lib/utils'

const categories = ['Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Sastra', 'Referensi']

export default function TambahBukuPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [form, setForm] = useState({ judul: '', penulis: '', penerbit: '', tahunTerbit: '', kategori: 'Fiksi', jenis: 'fisik', stok: '', pdfUrl: '', coverUrl: '', deskripsi: '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const validate = () => {
    const errs = {}
    if (!form.judul.trim()) errs.judul = 'Judul tidak boleh kosong'
    else if (form.judul.length > 200) errs.judul = 'Maksimal 200 karakter'
    if (!form.penulis.trim()) errs.penulis = 'Penulis tidak boleh kosong'
    else if (form.penulis.length > 100) errs.penulis = 'Maksimal 100 karakter'
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
    const existing = storage.getBuku()
    const newBook = {
      idBuku: generateId('BK', existing.map(b => b.idBuku)),
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
      createdAt: new Date().toISOString(),
    }
    storage.saveBuku([...existing, newBook])
    storage.addLog({ aksi: `Tambah buku: ${newBook.judul}`, pelaku: 'Guru' })
    setSaving(false)
    addToast('Buku berhasil ditambahkan ke koleksi!', 'success')
    navigate('/guru/kelola-buku')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/guru/kelola-buku')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Tambah Buku Baru</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Judul Buku" required value={form.judul} onChange={e => set('judul', e.target.value)} error={errors.judul} placeholder="Masukkan judul buku" />
            <Input label="Penulis" required value={form.penulis} onChange={e => set('penulis', e.target.value)} error={errors.penulis} placeholder="Nama penulis" />
            <Input label="Penerbit" value={form.penerbit} onChange={e => set('penerbit', e.target.value)} placeholder="Nama penerbit" />
            <Input label="Tahun Terbit" type="number" value={form.tahunTerbit} onChange={e => set('tahunTerbit', e.target.value)} placeholder="2026" />

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
              <Input label="Stok" type="number" required value={form.stok} onChange={e => set('stok', e.target.value)} error={errors.stok} placeholder="Jumlah stok" min="0" />
            )}

            {form.jenis === 'digital' && (
              <Input label="URL File PDF" required value={form.pdfUrl} onChange={e => set('pdfUrl', e.target.value)} error={errors.pdfUrl} placeholder="https://example.com/buku.pdf" />
            )}

            <Input label="URL Gambar Sampul" value={form.coverUrl} onChange={e => set('coverUrl', e.target.value)} placeholder="https://placehold.co/150x200?text=Cover" />

            <div className="space-y-1">
              <label className="label-form">Deskripsi</label>
              <textarea className="input-field min-h-[80px]" value={form.deskripsi} onChange={e => set('deskripsi', e.target.value)} placeholder="Deskripsi buku (opsional)" />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}><Save className="w-4 h-4" /> Simpan Buku</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/guru/kelola-buku')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
