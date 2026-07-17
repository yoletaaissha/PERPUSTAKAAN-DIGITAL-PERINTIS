import { storage } from './storage'

const SEED_VERSION = 3

export function seedInitialData() {
  const storedVersion = localStorage.getItem('perpustakaan_seed_version')
  if (storedVersion === String(SEED_VERSION)) return

  storage.resetAll()

  const siswa = [
    { idSiswa: 'SW-001', nama: 'Andi Pratama', kelas: 'X-A', username: 'siswa01', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
    { idSiswa: 'SW-002', nama: 'Budi Santoso', kelas: 'X-B', username: 'siswa02', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
    { idSiswa: 'SW-003', nama: 'Citra Dewi', kelas: 'XI-A', username: 'siswa03', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
    { idSiswa: 'SW-004', nama: 'Dwi Lestari', kelas: 'XI-B', username: 'siswa04', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
    { idSiswa: 'SW-005', nama: 'Eko Prasetyo', kelas: 'XII-A', username: 'siswa05', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
    { idSiswa: 'SW-006', nama: 'Fitri Handayani', kelas: 'XII-B', username: 'siswa06', password: 'siswa123', createdAt: '2026-01-01', isActive: true },
  ]
  storage.saveSiswa(siswa)

  const buku = [
    { idBuku: 'BK-001', judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', kategori: 'Fiksi', jenis: 'fisik', stok: 5, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop', tahunTerbit: 2005, penerbit: 'Bentang Pustaka', deskripsi: 'Novel tentang perjuangan anak-anak di Belitung.', createdAt: '2026-01-01' },
    { idBuku: 'BK-002', judul: 'Bumi', penulis: 'Tere Liye', kategori: 'Fiksi', jenis: 'fisik', stok: 3, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop', tahunTerbit: 2014, penerbit: 'Gramedia', deskripsi: 'Petualangan Raib, Seli, dan Ali.', createdAt: '2026-01-01' },
    { idBuku: 'BK-003', judul: 'Sejarah Dunia', penulis: 'J.M. Roberts', kategori: 'Sejarah', jenis: 'fisik', stok: 2, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1723306743407-cb6ac8f19941?w=300&h=400&fit=crop', tahunTerbit: 2010, penerbit: 'Elex Media', deskripsi: 'Kompilasi sejarah dunia.', createdAt: '2026-01-01' },
    { idBuku: 'BK-004', judul: 'Pintar Fisika', penulis: 'Prof. Yohanes Surya', kategori: 'Sains', jenis: 'fisik', stok: 4, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=400&fit=crop', tahunTerbit: 2018, penerbit: 'PT. Gramedia', deskripsi: 'Buku fisika untuk SMA.', createdAt: '2026-01-01' },
    { idBuku: 'BK-005', judul: 'Pemrograman Web', penulis: 'Rudi Hartono', kategori: 'Teknologi', jenis: 'digital', stok: 0, pdfUrl: 'https://github.com/mdn/curriculum/releases/latest/download/MDN-Curriculum.pdf', coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop', tahunTerbit: 2020, penerbit: 'Informatika', deskripsi: 'Panduan belajar web programming.', createdAt: '2026-01-01' },
    { idBuku: 'BK-006', judul: 'Pengantar Sastra Indonesia', penulis: 'Dr. Sapardi Djoko Damono', kategori: 'Sastra', jenis: 'digital', stok: 0, pdfUrl: 'https://repository.uinjkt.ac.id/dspace/bitstream/123456789/50800/1/AHMAD%20BAHTIAR%20-%20Buku%20Sejarah%20Sastra%20Indonesia.pdf', coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', tahunTerbit: 2015, penerbit: 'Balai Pustaka', deskripsi: 'Pengantar sastra Indonesia modern.', createdAt: '2026-01-01' },
    { idBuku: 'BK-007', judul: 'Ensiklopedia Sains', penulis: 'Tim Pustaka', kategori: 'Referensi', jenis: 'fisik', stok: 1, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=400&fit=crop', tahunTerbit: 2019, penerbit: 'Pustaka Ilmu', deskripsi: 'Referensi sains lengkap.', createdAt: '2026-01-01' },
    { idBuku: 'BK-008', judul: 'Matematika Diskrit', penulis: 'Rinaldi Munir', kategori: 'Teknologi', jenis: 'fisik', stok: 0, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=400&fit=crop', tahunTerbit: 2016, penerbit: 'Informatika', deskripsi: 'Buku matematika untuk ilmu komputer.', createdAt: '2026-01-01' },
    { idBuku: 'BK-009', judul: 'Sapiens: Riwayat Singkat Umat Manusia', penulis: 'Yuval Noah Harari', kategori: 'Sejarah', jenis: 'digital', stok: 0, pdfUrl: 'https://a61a085359000702575d-1091780f292ed74c8a63cc6ff151398e.ssl.cf3.rackcdn.com/1/4721/extract_sapiens.pdf', coverUrl: 'https://i.harperapps.com/covers/9780062796233/y648.jpg', tahunTerbit: 2013, penerbit: 'Kepustakaan Populer Gramedia', deskripsi: 'Perjalanan evolusi manusia dari masa purba hingga modern.', createdAt: '2026-01-01' },
    { idBuku: 'BK-010', judul: 'Atomic Habits', penulis: 'James Clear', kategori: 'Non-Fiksi', jenis: 'fisik', stok: 7, pdfUrl: '', coverUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300&h=400&fit=crop', tahunTerbit: 2018, penerbit: 'Penguin Random House', deskripsi: 'Cara membangun kebiasaan baik dan menghentikan kebiasaan buruk.', createdAt: '2026-01-01' },
  ]
  storage.saveBuku(buku)

  const users = [
    { idUser: 'USR-001', nama: 'Administrator', username: 'admin01', password: 'admin123', peran: 'admin', jabatan: '', isActive: true, createdAt: '2026-01-01' },
    { idUser: 'USR-002', nama: 'Siti Rahmawati', username: 'guru01', password: 'guru123', peran: 'guru', jabatan: 'Guru Pustakawan', isActive: true, createdAt: '2026-01-01' },
    { idUser: 'USR-003', nama: 'Budi Hartono', username: 'guru02', password: 'guru123', peran: 'guru', jabatan: 'Guru Bahasa Indonesia', isActive: true, createdAt: '2026-01-01' },
    { idUser: 'USR-004', nama: 'Dr. H. Ahmad Fauzi, M.Pd.', username: 'kepsek01', password: 'kepsek123', peran: 'kepala_sekolah', jabatan: '', isActive: true, createdAt: '2026-01-01' },
  ]
  storage.saveUser(users)

  const now = new Date()
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  const threeDaysAgo = new Date(now); threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  const fiveDaysAgo = new Date(now); fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
  const sevenDaysAgo = new Date(now); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const tenDaysAgo = new Date(now); tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)
  const fourteenDaysAgo = new Date(now); fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
  const dueIn1 = new Date(now); dueIn1.setDate(dueIn1.getDate() + 1)
  const dueIn3 = new Date(now); dueIn3.setDate(dueIn3.getDate() + 3)
  const dueIn7 = new Date(now); dueIn7.setDate(dueIn7.getDate() + 7)
  const dueIn10 = new Date(now); dueIn10.setDate(dueIn10.getDate() + 10)
  const dueIn14 = new Date(now); dueIn14.setDate(dueIn14.getDate() + 14)

  const pinjaman = [
    { idPinjam: 'PJ-001', idSiswa: 'SW-001', idBuku: 'BK-001', tanggalPinjam: sevenDaysAgo.toISOString(), batasKembali: dueIn3.toISOString(), status: 'dipinjam', createdAt: sevenDaysAgo.toISOString() },
    { idPinjam: 'PJ-002', idSiswa: 'SW-001', idBuku: 'BK-002', tanggalPinjam: tenDaysAgo.toISOString(), batasKembali: sevenDaysAgo.toISOString(), status: 'terlambat', createdAt: tenDaysAgo.toISOString() },
    { idPinjam: 'PJ-003', idSiswa: 'SW-002', idBuku: 'BK-003', tanggalPinjam: twoDaysAgo.toISOString(), batasKembali: dueIn7.toISOString(), status: 'dipinjam', createdAt: twoDaysAgo.toISOString() },
    { idPinjam: 'PJ-004', idSiswa: 'SW-003', idBuku: 'BK-001', tanggalPinjam: sevenDaysAgo.toISOString(), batasKembali: dueIn1.toISOString(), status: 'dipinjam', createdAt: sevenDaysAgo.toISOString() },
    { idPinjam: 'PJ-005', idSiswa: 'SW-001', idBuku: 'BK-004', tanggalPinjam: fourteenDaysAgo.toISOString(), batasKembali: sevenDaysAgo.toISOString(), status: 'dikembalikan', createdAt: fourteenDaysAgo.toISOString() },
    { idPinjam: 'PJ-006', idSiswa: 'SW-002', idBuku: 'BK-001', tanggalPinjam: tenDaysAgo.toISOString(), batasKembali: threeDaysAgo.toISOString(), status: 'dikembalikan', createdAt: tenDaysAgo.toISOString() },
    { idPinjam: 'PJ-007', idSiswa: 'SW-004', idBuku: 'BK-010', tanggalPinjam: fiveDaysAgo.toISOString(), batasKembali: dueIn10.toISOString(), status: 'dipinjam', createdAt: fiveDaysAgo.toISOString() },
    { idPinjam: 'PJ-008', idSiswa: 'SW-003', idBuku: 'BK-007', tanggalPinjam: threeDaysAgo.toISOString(), batasKembali: dueIn14.toISOString(), status: 'dipinjam', createdAt: threeDaysAgo.toISOString() },
  ]
  storage.savePeminjaman(pinjaman)

  const pengembalian = [
    { idKembali: 'KB-001', idPinjam: 'PJ-005', tanggalKembali: fiveDaysAgo.toISOString(), jumlahHariTerlambat: 2, denda: 1000, statusDenda: 'lunas', catatan: 'Terlambat 2 hari' },
    { idKembali: 'KB-002', idPinjam: 'PJ-006', tanggalKembali: twoDaysAgo.toISOString(), jumlahHariTerlambat: 1, denda: 500, statusDenda: 'belum_bayar', catatan: 'Terlambat 1 hari, denda belum dibayar' },
  ]
  storage.savePengembalian(pengembalian)

  const review = [
    { idReview: 'RV-001', idBuku: 'BK-001', idSiswa: 'SW-001', rating: 5, komentar: 'Buku sangat inspiratif! Perjuangan anak-anak Belitung luar biasa.', createdAt: '2026-01-10' },
    { idReview: 'RV-002', idBuku: 'BK-002', idSiswa: 'SW-001', rating: 4, komentar: 'Ceritanya seru, sayang bukunya sedikit rusak di bagian tengah.', createdAt: '2026-01-12' },
    { idReview: 'RV-003', idBuku: 'BK-001', idSiswa: 'SW-002', rating: 4, komentar: 'Bagus sekali. Saya suka karakter Bu Muslimah.', createdAt: '2026-01-15' },
    { idReview: 'RV-004', idBuku: 'BK-004', idSiswa: 'SW-001', rating: 5, komentar: 'Materinya lengkap dan mudah dipahami. Sangat membantu belajar fisika.', createdAt: '2026-02-01' },
    { idReview: 'RV-005', idBuku: 'BK-010', idSiswa: 'SW-004', rating: 5, komentar: 'Buku yang mengubah cara pandang saya tentang kebiasaan sehari-hari.', createdAt: '2026-06-01' },
  ]
  storage.saveReview(review)

  const notif = [
    { idNotifikasi: 'NT-001', idSiswa: 'SW-001', idPinjam: 'PJ-001', pesan: `Buku "Laskar Pelangi" akan jatuh tempo dalam 3 hari.`, tipeNotifikasi: 'jatuh_tempo', isRead: false, createdAt: now.toISOString() },
    { idNotifikasi: 'NT-002', idSiswa: 'SW-001', idPinjam: 'PJ-002', pesan: `Buku "Bumi" sudah terlambat! Segera kembalikan dan bayar denda.`, tipeNotifikasi: 'terlambat', isRead: false, createdAt: now.toISOString() },
    { idNotifikasi: 'NT-003', idSiswa: 'SW-003', idPinjam: 'PJ-004', pesan: `Buku "Laskar Pelangi" akan jatuh tempo besok.`, tipeNotifikasi: 'jatuh_tempo', isRead: false, createdAt: now.toISOString() },
    { idNotifikasi: 'NT-004', idSiswa: 'SW-002', idPinjam: 'PJ-006', pesan: `Buku "Laskar Pelangi" sudah dikembalikan dengan denda Rp500.`, tipeNotifikasi: 'jatuh_tempo', isRead: true, createdAt: twoDaysAgo.toISOString() },
  ]
  storage.saveNotifikasi(notif)

  storage.saveKonfig({ namaPerpustakaan: 'Perpustakaan Perintis', dendaPerHari: 500, batasHariPinjam: 7, maxBukuPerSiswa: 3 })

  storage.saveLog([
    { aksi: 'Sistem diinisialisasi dengan data demo', pelaku: 'System', timestamp: now.toISOString() },
  ])

  localStorage.setItem('perpustakaan_seed_version', String(SEED_VERSION))
}
