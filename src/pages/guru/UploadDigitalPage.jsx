import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, Upload } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import { generateId } from '../../lib/utils'

const categories = ['Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Sastra', 'Referensi']

export default function UploadDigitalPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [judul, setJudul] = useState('')
  const [penulis, setPenulis] = useState('')
  const [kategori, setKategori] = useState('Fiksi')
  const [deskripsi, setDeskripsi] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const errs = {}
    if (!judul.trim()) errs.judul = 'Judul wajib diisi'
    if (!penulis.trim()) errs.penulis = 'Penulis wajib diisi'
    if (!pdfUrl.trim()) errs.pdfUrl = 'URL PDF wajib diisi'
    else if (!pdfUrl.startsWith('https://')) errs.pdfUrl = 'URL PDF tampaknya tidak valid. Pastikan URL diawali https:// dan mengarah ke file PDF.'
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
      judul: judul.trim(), penulis: penulis.trim(), kategori, jenis: 'digital',
      stok: 0, pdfUrl: pdfUrl.trim(),
      coverUrl: coverUrl.trim() || 'https://placehold.co/150x200?text=E-book',
      tahunTerbit: new Date().getFullYear(), penerbit: '',
      deskripsi: deskripsi.trim(),
      createdAt: new Date().toISOString(),
    }
    storage.saveBuku([...existing, newBook])
    storage.addLog({ aksi: `Upload e-book: ${newBook.judul}`, pelaku: 'Guru' })
    setSaving(false)
    addToast('E-book berhasil ditambahkan ke koleksi digital!', 'success')
    navigate('/guru/kelola-buku')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/guru/kelola-buku')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Upload Materi Digital</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Judul E-book" required value={judul} onChange={e => setJudul(e.target.value)} error={errors.judul} placeholder="Masukkan judul e-book" />
            <Input label="Penulis" required value={penulis} onChange={e => setPenulis(e.target.value)} error={errors.penulis} placeholder="Nama penulis" />
            <div className="space-y-1">
              <label className="label-form required">Kategori</label>
              <select className="input-field" value={kategori} onChange={e => setKategori(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Input label="URL File PDF" required value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} error={errors.pdfUrl} placeholder="https://example.com/buku.pdf" />
            <Input label="URL Gambar Sampul" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="https://placehold.co/150x200?text=E-book" />
            <div className="space-y-1">
              <label className="label-form">Deskripsi</label>
              <textarea className="input-field min-h-[80px]" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} placeholder="Deskripsi e-book (opsional)" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}><Upload className="w-4 h-4" /> Upload & Simpan</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/guru/kelola-buku')}>Batal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
