import { useState, useRef } from 'react'
import { storage } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { Download, Upload, RefreshCw, AlertTriangle } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function BackupPage() {
  const { addToast } = useToast()
  const fileRef = useRef(null)
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetting, setResetting] = useState(false)

  const handleExport = () => {
    setExporting(true)
    const data = storage.exportAll()
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `backup-perpustakaan-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExporting(false)
    addToast('Backup berhasil diunduh!', 'success')
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        storage.importAll(data)
        addToast('Data berhasil diimpor! Halaman akan dimuat ulang.', 'success')
        setTimeout(() => window.location.reload(), 1500)
      } catch {
        addToast('File tidak valid. Pastikan file JSON backup yang benar.', 'error')
        setImporting(false)
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (resetConfirm !== 'RESET') {
      addToast('Ketik "RESET" untuk konfirmasi.', 'error')
      return
    }
    setResetting(true)
    Object.values({
      SISWA: 'perpustakaan_siswa',
      BUKU: 'perpustakaan_buku',
      PEMINJAMAN: 'perpustakaan_peminjaman',
      PENGEMBALIAN: 'perpustakaan_pengembalian',
      REVIEW: 'perpustakaan_review',
      NOTIFIKASI: 'perpustakaan_notifikasi',
      USER: 'perpustakaan_user',
      KONFIG: 'perpustakaan_konfig',
      LOG: 'perpustakaan_log',
    }).forEach(k => localStorage.removeItem(k))
    localStorage.removeItem('perpustakaan_session')
    addToast('Data berhasil direset. Aplikasi akan dimuat ulang.', 'success')
    setResetting(false)
    setResetOpen(false)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Backup & Restore Data</h2>

      <Card>
        <CardHeader><h3 className="text-[16px]">Ekspor (Backup)</h3></CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-500 mb-4">Unduh seluruh data perpustakaan ke file JSON. Gunakan file ini untuk memulihkan data nanti.</p>
          <Button onClick={handleExport} loading={exporting}><Download className="w-4 h-4" /> Export Data</Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-[16px]">Impor (Restore)</h3></CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-500 mb-4">Pilih file backup JSON untuk memulihkan data. Data yang ada saat ini akan ditimpa.</p>
          <Button variant="outline" loading={importing} onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" /> Pilih File Backup
          </Button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-[16px] text-danger flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Reset Data</h3></CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-500 mb-4">Hapus semua data termasuk koleksi buku, pengguna, dan transaksi. Tindakan ini tidak dapat dibatalkan.</p>
          <Button variant="danger" onClick={() => setResetOpen(true)}><RefreshCw className="w-4 h-4" /> Reset Semua Data</Button>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        onClose={() => { setResetOpen(false); setResetConfirm('') }}
        onConfirm={handleReset}
        title="Reset Semua Data"
        message={
          <div className="space-y-3">
            <p className="text-sm text-neutral-700">Apakah Anda yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan.</p>
            <p className="text-sm text-neutral-700">Ketik <strong>RESET</strong> (huruf besar) untuk konfirmasi.</p>
            <input className="input-field" placeholder="Ketik RESET" value={resetConfirm} onChange={e => setResetConfirm(e.target.value)} autoFocus />
          </div>
        }
        confirmText="Reset Data"
        variant="danger"
        loading={resetting}
      />
    </div>
  )
}
