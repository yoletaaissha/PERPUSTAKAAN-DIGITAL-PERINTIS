import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import { formatDateShort, generateId } from '../../lib/utils'

export default function ProsesPengembalianPage() {
  const { idPinjam } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const pinjaman = storage.getPeminjaman().find(p => p.idPinjam === idPinjam)
  const siswa = storage.getSiswa()
  const buku = storage.getBuku()
  const konfig = storage.getKonfig()

  const today = new Date().toISOString().split('T')[0]
  const [tglKembali, setTglKembali] = useState(today)
  const [catatan, setCatatan] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const siswaNama = siswa.find(s => s.idSiswa === pinjaman?.idSiswa)?.nama || '-'
  const bukuJudul = buku.find(b => b.idBuku === pinjaman?.idBuku)?.judul || '-'

  const { hariTerlambat, denda } = useMemo(() => {
    if (!pinjaman) return { hariTerlambat: 0, denda: 0 }
    const tglKembaliDate = new Date(tglKembali)
    const batasDate = new Date(pinjaman.batasKembali)
    const diff = Math.floor((tglKembaliDate - batasDate) / (1000 * 60 * 60 * 24))
    const hari = Math.max(0, diff)
    return { hariTerlambat: hari, denda: hari * (konfig.dendaPerHari || 500) }
  }, [tglKembali, pinjaman, konfig])

  if (!pinjaman) {
    return <div className="text-center py-12"><p className="text-neutral-500">Transaksi tidak ditemukan.</p></div>
  }

  const handleSubmit = () => {
    const tglPinjam = new Date(pinjaman.tanggalPinjam)
    const tglKembaliDate = new Date(tglKembali)
    if (tglKembaliDate < tglPinjam) {
      setError('Tanggal pengembalian tidak boleh lebih awal dari tanggal peminjaman.')
      return
    }
    setError('')
    setSaving(true)

    const allKembali = storage.getPengembalian()
    const newK = {
      idKembali: generateId('KB', allKembali.map(k => k.idKembali)),
      idPinjam, tanggalKembali: tglKembaliDate.toISOString(),
      jumlahHariTerlambat: hariTerlambat, denda, statusDenda: denda > 0 ? 'belum_bayar' : 'lunas',
      catatan: catatan.trim(),
    }
    storage.savePengembalian([...allKembali, newK])

    // Update status peminjaman
    const allP = storage.getPeminjaman()
    const pIdx = allP.findIndex(p => p.idPinjam === idPinjam)
    allP[pIdx].status = 'dikembalikan'
    storage.savePeminjaman(allP)

    // Restore stock
    const allBuku = storage.getBuku()
    const bIdx = allBuku.findIndex(b => b.idBuku === pinjaman.idBuku)
    if (bIdx !== -1) allBuku[bIdx].stok += 1
    storage.saveBuku(allBuku)

    storage.addLog({ aksi: `Proses pengembalian: ${bukuJudul}`, pelaku: 'Guru' })
    setSaving(false)
    addToast('Pengembalian berhasil diproses!', 'success')
    navigate('/guru/pengembalian')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button variant="ghost" onClick={() => navigate('/guru/pengembalian')}><ArrowLeft className="w-4 h-4" /> Kembali</Button>
      <h2 className="text-[22px] font-semibold text-neutral-900">Proses Pengembalian</h2>

      <Card>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-neutral-500">Siswa:</span> <span className="font-medium">{siswaNama}</span></div>
            <div><span className="text-neutral-500">Buku:</span> <span className="font-medium">{bukuJudul}</span></div>
            <div><span className="text-neutral-500">Tanggal Pinjam:</span> {formatDateShort(pinjaman.tanggalPinjam)}</div>
            <div><span className="text-neutral-500">Batas Kembali:</span> {formatDateShort(pinjaman.batasKembali)}</div>
            <div><span className="text-neutral-500">Status:</span> <StatusBadge status={pinjaman.status} /></div>
          </div>

          <hr className="border-neutral-200" />

          <Input label="Tanggal Kembali Aktual" type="date" required value={tglKembali} onChange={e => { setTglKembali(e.target.value); setError('') }} />

          <div className="p-4 rounded-lg bg-neutral-50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Hari Terlambat</span>
              <span className="font-semibold">{hariTerlambat} hari</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Denda (Rp {konfig.dendaPerHari || 500}/hari)</span>
              {denda > 0 ? (
                <span className="font-semibold text-danger">Rp{denda.toLocaleString('id-ID')}</span>
              ) : (
                <span className="font-semibold text-success">Tidak ada denda</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="label-form">Catatan <span className="text-neutral-500 text-xs">(opsional)</span></label>
            <textarea className="input-field min-h-[60px]" value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Catatan pengembalian..." />
          </div>

          {error && <p className="field-error">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} loading={saving}><CheckCircle className="w-4 h-4" /> Konfirmasi Pengembalian</Button>
            <Button variant="outline" onClick={() => navigate('/guru/pengembalian')}>Batal</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
