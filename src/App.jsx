import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import RoleLayout from './components/layouts/RoleLayout'
import SplashScreen from './components/common/SplashScreen'
import { seedInitialData } from './services/seedData'

import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'

// Siswa pages
import DashboardSiswa from './pages/siswa/DashboardSiswa'
import KatalogPage from './pages/siswa/KatalogPage'
import DetailBukuPage from './pages/siswa/DetailBukuPage'
import PinjamanSayaPage from './pages/siswa/PinjamanSayaPage'
import RiwayatPage from './pages/siswa/RiwayatPage'
import EbookPage from './pages/siswa/EbookPage'
import NotifikasiPage from './pages/siswa/NotifikasiPage'

// Guru pages
import DashboardGuru from './pages/guru/DashboardGuru'
import KelolaBukuPage from './pages/guru/KelolaBukuPage'
import TambahBukuPage from './pages/guru/TambahBukuPage'
import EditBukuPage from './pages/guru/EditBukuPage'
import PeminjamanPage from './pages/guru/PeminjamanPage'
import PeminjamanBaruPage from './pages/guru/PeminjamanBaruPage'
import PengembalianPage from './pages/guru/PengembalianPage'
import ProsesPengembalianPage from './pages/guru/ProsesPengembalianPage'
import LaporanPage from './pages/guru/LaporanPage'
import UploadDigitalPage from './pages/guru/UploadDigitalPage'

// Kepsek pages
import DashboardKepsek from './pages/kepsek/DashboardKepsek'
import DataBukuPage from './pages/kepsek/DataBukuPage'
import DataPeminjamanPage from './pages/kepsek/DataPeminjamanPage'
import GrafikPage from './pages/kepsek/GrafikPage'
import MinatBacaPage from './pages/kepsek/MinatBacaPage'

// Admin pages
import DashboardAdmin from './pages/admin/DashboardAdmin'
import KelolaUserPage from './pages/admin/KelolaUserPage'
import TambahUserPage from './pages/admin/TambahUserPage'
import EditUserPage from './pages/admin/EditUserPage'
import DataSistemPage from './pages/admin/DataSistemPage'
import BackupPage from './pages/admin/BackupPage'
import LogAktivitasPage from './pages/admin/LogAktivitasPage'

export default function App() {
  const [initState, setInitState] = useState('loading')

  useEffect(() => {
    seedInitialData()
    const timer = setTimeout(() => setInitState('ready'), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    setInitState('fading')
    setTimeout(() => setInitState('done'), 500)
  }

  if (initState !== 'done') {
    return <SplashScreen fading={initState === 'fading'} ready={initState === 'ready'} onStart={handleStart} />
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/siswa"
            element={
              <ProtectedRoute allowedRoles={['siswa']}>
                <RoleLayout title="Perpustakaan Siswa" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardSiswa />} />
            <Route path="katalog" element={<KatalogPage />} />
            <Route path="katalog/:idBuku" element={<DetailBukuPage />} />
            <Route path="pinjaman-saya" element={<PinjamanSayaPage />} />
            <Route path="riwayat" element={<RiwayatPage />} />
            <Route path="ebook/:idBuku" element={<EbookPage />} />
            <Route path="notifikasi" element={<NotifikasiPage />} />
            <Route path="profil" element={<ProfilePage />} />
          </Route>

          <Route
            path="/guru"
            element={
              <ProtectedRoute allowedRoles={['guru']}>
                <RoleLayout title="Perpustakaan Guru" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardGuru />} />
            <Route path="kelola-buku" element={<KelolaBukuPage />} />
            <Route path="kelola-buku/tambah" element={<TambahBukuPage />} />
            <Route path="kelola-buku/edit/:idBuku" element={<EditBukuPage />} />
            <Route path="peminjaman" element={<PeminjamanPage />} />
            <Route path="peminjaman/baru" element={<PeminjamanBaruPage />} />
            <Route path="pengembalian" element={<PengembalianPage />} />
            <Route path="pengembalian/proses/:idPinjam" element={<ProsesPengembalianPage />} />
            <Route path="laporan" element={<LaporanPage />} />
            <Route path="upload-digital" element={<UploadDigitalPage />} />
            <Route path="profil" element={<ProfilePage />} />
          </Route>

          <Route
            path="/kepsek"
            element={
              <ProtectedRoute allowedRoles={['kepala_sekolah']}>
                <RoleLayout title="Perpustakaan - Kepala Sekolah" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardKepsek />} />
            <Route path="data-buku" element={<DataBukuPage />} />
            <Route path="data-peminjaman" element={<DataPeminjamanPage />} />
            <Route path="grafik" element={<GrafikPage />} />
            <Route path="minat-baca" element={<MinatBacaPage />} />
            <Route path="profil" element={<ProfilePage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RoleLayout title="Admin Perpustakaan" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="kelola-user" element={<KelolaUserPage />} />
            <Route path="kelola-user/tambah" element={<TambahUserPage />} />
            <Route path="kelola-user/edit/:idUser" element={<EditUserPage />} />
            <Route path="data-sistem" element={<DataSistemPage />} />
            <Route path="backup" element={<BackupPage />} />
            <Route path="log-aktivitas" element={<LogAktivitasPage />} />
            <Route path="profil" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
