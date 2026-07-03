import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardBody } from '../../components/ui/Card'
import ErrorState from '../../components/ui/ErrorState'

export default function EbookPage() {
  const { idBuku } = useParams()
  const navigate = useNavigate()
  const buku = storage.getBuku().find(b => b.idBuku === idBuku)

  const [iframeError, setIframeError] = useState(false)

  if (!buku) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate('/siswa/katalog')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
        <ErrorState title="Buku tidak ditemukan" message="Mungkin buku ini telah dihapus dari koleksi." />
      </div>
    )
  }

  if (buku.jenis !== 'digital' || !buku.pdfUrl) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate('/siswa/katalog')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
        <ErrorState title="Buku Fisik" message="Buku ini adalah buku fisik. Silakan pinjam di perpustakaan." />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(`/siswa/katalog/${idBuku}`)}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
        <a href={buku.pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4" /> Buka di Tab Baru</Button>
        </a>
      </div>

      <div>
        <h2 className="text-[22px] font-semibold text-neutral-900">{buku.judul}</h2>
        <p className="text-sm text-neutral-500">{buku.penulis}</p>
      </div>

      <Card>
        <CardBody className="p-0">
          {iframeError ? (
            <div className="p-12">
              <ErrorState
                title="Gagal Memuat PDF"
                message="PDF tidak dapat ditampilkan. Coba buka di tab baru menggunakan tombol di atas."
              />
            </div>
          ) : (
            <div className="relative w-full" style={{ height: 'calc(100vh - 280px)' }}>
              <iframe
                src={buku.pdfUrl}
                className="w-full h-full rounded-b-md"
                title={buku.judul}
                onError={() => setIframeError(true)}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
