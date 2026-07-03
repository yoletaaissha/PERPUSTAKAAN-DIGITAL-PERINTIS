import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, ExternalLink, BookOpen, Star } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import { RatingDisplay, RatingInput } from '../../components/ui/Rating'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import { generateId } from '../../lib/utils'

export default function DetailBukuPage() {
  const { idBuku } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToast } = useToast()

  const buku = storage.getBuku().find(b => b.idBuku === idBuku)
  const allReview = storage.getReview().filter(r => r.idBuku === idBuku)
  const allSiswa = storage.getSiswa()
  const pinjaman = storage.getPeminjaman()

  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [komentar, setKomentar] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!buku) {
    return <div className="text-center py-12"><p className="text-neutral-500">Buku tidak ditemukan.</p></div>
  }

  const avgRating = allReview.length > 0
    ? allReview.reduce((s, r) => s + r.rating, 0) / allReview.length
    : 0

  const sudahDiReview = allReview.some(r => r.idSiswa === user.id)

  const sudahKembali = pinjaman.some(p => p.idSiswa === user.id && p.idBuku === idBuku && p.status === 'dikembalikan')

  const handleSubmitReview = () => {
    if (rating === 0) { addToast('Pilih rating terlebih dahulu.', 'error'); return }
    setSubmitting(true)
    const existing = storage.getReview()
    const newRv = {
      idReview: generateId('RV', existing.map(r => r.idReview)),
      idBuku, idSiswa: user.id, rating, komentar: komentar.trim(),
      createdAt: new Date().toISOString(),
    }
    storage.saveReview([...existing, newRv])
    setSubmitting(false)
    setReviewOpen(false)
    setRating(0)
    setKomentar('')
    addToast('Ulasan berhasil dikirim!', 'success')
    navigate('.', { replace: true })
  }

  return (
    <div className="max-w-3xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/siswa/katalog')}><ArrowLeft className="w-4 h-4" /> Kembali ke Katalog</Button>

      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 shrink-0">
              <img src={buku.coverUrl} alt={buku.judul} className="w-full aspect-[3/4] object-cover rounded-md bg-neutral-100"
                onError={(e) => { e.target.src = 'https://placehold.co/150x200?text=No+Cover' }} />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-[20px] font-semibold text-neutral-900">{buku.judul}</h3>
              <p className="text-sm text-neutral-500">{buku.penulis}</p>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={buku.jenis === 'fisik' ? 'dipinjam' : 'digital'} />
                <span className="badge-blue">{buku.kategori}</span>
                {buku.tahunTerbit && <span className="badge-blue">{buku.tahunTerbit}</span>}
              </div>
              {avgRating > 0 && <RatingDisplay rating={avgRating} count={allReview.length} />}
              <p className="text-sm text-neutral-700 leading-relaxed">{buku.deskripsi || 'Tidak ada deskripsi.'}</p>
              {buku.jenis === 'fisik' ? (
                <p className="text-sm">Stok: <span className={`font-semibold ${buku.stok > 0 ? 'text-success' : 'text-danger'}`}>{buku.stok > 0 ? `${buku.stok} tersedia` : 'Habis'}</span></p>
              ) : (
                <Button size="sm" onClick={() => navigate(`/siswa/ebook/${buku.idBuku}`)}>
                  <BookOpen className="w-4 h-4" /> Baca E-book
                </Button>
              )}
              {sudahKembali && !sudahDiReview && (
                <Button variant="outline" onClick={() => setReviewOpen(true)}>
                  <Star className="w-4 h-4" /> Beri Ulasan
                </Button>
              )}
              {sudahDiReview && <p className="text-xs text-success">Anda sudah memberi ulasan buku ini.</p>}
            </div>
          </div>
        </CardBody>
      </Card>

      {allReview.length > 0 && (
        <Card>
          <div className="card-header"><h3 className="text-[16px]">Ulasan ({allReview.length})</h3></div>
          <CardBody className="space-y-3">
            {allReview.map(r => (
              <div key={r.idReview} className="flex gap-3 p-3 rounded-lg bg-neutral-50">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">{allSiswa.find(s => s.idSiswa === r.idSiswa)?.nama?.charAt(0) || '?'}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-700">{allSiswa.find(s => s.idSiswa === r.idSiswa)?.nama || '-'}</p>
                  <RatingDisplay rating={r.rating} />
                  {r.komentar && <p className="text-sm text-neutral-600 mt-1">{r.komentar}</p>}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} title="Beri Ulasan" size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>Batal</Button>
            <Button onClick={handleSubmitReview} loading={submitting}>Kirim Ulasan</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-700 mb-2">Rating</p>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <div className="space-y-1">
            <label className="label-form">Komentar</label>
            <textarea className="input-field min-h-[80px]" placeholder="Tulis ulasan Anda..." value={komentar} onChange={e => setKomentar(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
