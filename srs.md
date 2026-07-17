# srs.md — Software Requirements Specification
# Sistem Informasi Perpustakaan Perintis
**Versi:** 1.0  
**Tanggal:** 2026  
**Tim:** Kelompok 12 — Program Studi Sistem Informasi, UAD Yogyakarta

---

## 1. Tujuan Sistem

Sistem Informasi Perpustakaan Perintis dirancang untuk menggantikan pengelolaan perpustakaan yang selama ini dilakukan secara manual dan tidak terintegrasi. Sistem ini menangani dua jenis koleksi secara bersamaan: **buku fisik** (tersimpan di rak perpustakaan) dan **buku digital / e-book** (berformat PDF yang dapat diakses online). Masalah utama yang diselesaikan meliputi: ketidakkonsistenan data akibat tidak adanya sistem pencatatan terpusat, keterbatasan akses informasi ketersediaan buku secara real-time, ketergantungan pada kunjungan fisik ke perpustakaan, tidak adanya analisis minat baca siswa, serta tidak adanya notifikasi otomatis untuk pengembalian buku yang jatuh tempo.

Sistem ini wajib menyediakan antarmuka berbasis web yang dapat diakses oleh empat kelompok aktor: Siswa (pengguna utama peminjam), Guru/Karyawan (operator pengelola koleksi dan transaksi), Kepala Sekolah (pemantau laporan dan analisis), dan Admin (pengelola sistem secara keseluruhan).

---

## 2. Aktor Pengguna

| Aktor | Kode | Deskripsi |
|---|---|---|
| Siswa | ACTOR-01 | Pengguna akhir yang mencari, meminjam, dan mengakses buku fisik maupun digital |
| Guru/Karyawan | ACTOR-02 | Petugas perpustakaan yang mengelola data buku, transaksi peminjaman, dan pengembalian |
| Kepala Sekolah | ACTOR-03 | Pemangku kepentingan yang memantau laporan dan analisis minat baca |
| Admin | ACTOR-04 | Pengelola sistem yang mengatur akun pengguna, backup data, dan maintenance |

---

## 3. Tech Stack

| Layer | Teknologi | Keterangan |
|---|---|---|
| Frontend | React + Vite | Framework utama antarmuka |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Routing | React Router v6 | Navigasi antar halaman |
| State Management | React Context API | Manajemen state global (auth, notifikasi) |
| Penyimpanan Sementara | localStorage | Pengganti backend untuk prototype |
| PDF Viewer | iframe | Untuk akses e-book PDF (dipilih karena ringan; react-pdf tidak dipasang) |
| Grafik | Recharts | Visualisasi data laporan |
| Icons | Lucide React | Set ikon konsisten |

---

## 4. In-Scope Features (Fitur yang WAJIB Dibuat)

### 4.1 Fitur Siswa (ACTOR-01)
- **F-01** Pencarian buku fisik berdasarkan judul, penulis, atau kategori
- **F-02** Pencarian e-book berdasarkan judul, penulis, atau kategori
- **F-03** Melihat ketersediaan buku (stok sisa buku fisik yang dapat dipinjam)
- **F-04** Akses e-book sederhana dalam format PDF melalui tampilan PDF viewer terintegrasi
- **F-05** Menerima notifikasi pengembalian buku yang mendekati jatuh tempo (tampil di dashboard siswa)
- **F-06** Memberikan ulasan (review) dan rating buku (bintang 1–5 disertai komentar teks)
- **F-07** Mendapatkan rekomendasi buku sederhana berdasarkan riwayat kategori buku yang pernah dipinjam

### 4.2 Fitur Guru/Karyawan (ACTOR-02)
- **F-08** Input data buku baru (fisik dan digital) ke sistem
- **F-09** Ubah data buku yang sudah ada
- **F-10** Hapus data buku dari sistem
- **F-11** Cek stok ketersediaan buku fisik secara real-time
- **F-12** Mengelola transaksi peminjaman buku (mencatat peminjaman baru)
- **F-13** Mengelola transaksi pengembalian buku (mencatat pengembalian dan menghitung denda)
- **F-14** Generate laporan peminjaman dalam tampilan tabel yang dapat dicetak
- **F-15** Upload file PDF sebagai materi/buku digital pendukung

### 4.3 Fitur Kepala Sekolah (ACTOR-03)
- **F-16** Melihat data seluruh koleksi buku (fisik dan digital)
- **F-17** Melihat data seluruh transaksi peminjaman (dengan filter tanggal)
- **F-18** Melihat grafik sederhana tren peminjaman per bulan (bar chart atau line chart)
- **F-19** Melihat analisis minat baca siswa (kategori buku paling banyak dipinjam)

### 4.4 Fitur Admin (ACTOR-04)
- **F-20** Mengelola akun pengguna: tambah, ubah, nonaktifkan akun Siswa, Guru/Karyawan, dan Kepala Sekolah
- **F-21** Mengelola data sistem (konfigurasi dasar seperti nama perpustakaan, aturan denda per hari)
- **F-22** Backup data sistem (ekspor seluruh data ke format JSON)
- **F-23** Maintenance sistem (reset data dummy, melihat log aktivitas sederhana)

### 4.5 Fitur Umum (Semua Aktor)
- **F-24** Login menggunakan username dan password
- **F-25** Logout dari sistem
- **F-26** Melihat profil akun sendiri

---

## 5. Out-of-Scope Features (Fitur yang DILARANG Dibuat)

- ❌ Integrasi payment gateway nyata untuk pembayaran denda
- ❌ Fitur lupa password / reset password via email
- ❌ Sistem rekomendasi berbasis machine learning atau AI
- ❌ Scan QR Code buku (disebutkan sebagai opsional dalam use case — tidak diimplementasikan)
- ❌ Integrasi dengan sistem akademik sekolah (SIS/SIAK)
- ❌ Notifikasi via SMS atau email eksternal
- ❌ Fitur multi-cabang perpustakaan
- ❌ Fitur keanggotaan berbayar atau langganan
- ❌ Backend server nyata atau koneksi database eksternal (prototype hanya menggunakan localStorage)
- ❌ Unggah gambar sampul buku secara langsung (gunakan URL gambar sebagai string)

---

## 6. Business Rules (Aturan Bisnis)

| Kode | Aturan | Detail |
|---|---|---|
| BR-01 | Batas peminjaman per siswa | Satu siswa hanya boleh meminjam maksimal **3 buku fisik** secara bersamaan |
| BR-02 | Durasi peminjaman default | Batas pengembalian adalah **7 hari** sejak tanggal peminjaman |
| BR-03 | Denda keterlambatan | Denda dihitung per hari keterlambatan sejak tanggal batas kembali. **Default Rp 500/hari**, dapat dikonfigurasi oleh Admin melalui Pengaturan Sistem |
| BR-04 | Stok tidak boleh minus | Sistem wajib menolak transaksi peminjaman jika stok buku fisik = 0 |
| BR-05 | Status peminjaman | Status peminjaman hanya boleh bernilai: `dipinjam`, `dikembalikan`, atau `terlambat` |
| BR-06 | Notifikasi jatuh tempo | Notifikasi wajib muncul jika sisa hari pengembalian ≤ 2 hari |
| BR-07 | Review hanya untuk buku yang pernah dipinjam | Siswa hanya dapat memberikan review pada buku yang pernah ia pinjam dan sudah dikembalikan |
| BR-08 | Rating buku | Rating menggunakan skala bintang 1–5; rata-rata dihitung otomatis dari semua review |
| BR-09 | Akses e-book | E-book dapat diakses oleh semua siswa tanpa perlu transaksi peminjaman fisik |
| BR-10 | Rekomendasi buku | Rekomendasi ditampilkan berdasarkan kategori buku yang paling sering dipinjam oleh siswa tersebut |
| BR-11 | Hak akses berbasis peran | Setiap aktor hanya boleh mengakses halaman dan fitur sesuai perannya; akses lintas peran harus diblokir sistem |
| BR-12 | Data wajib pada input buku | Field `judul`, `penulis`, `kategori`, dan `jenis` (fisik/digital) wajib diisi; sistem menolak input jika kosong |
| BR-13 | Denda dibayar sebelum kembali | Sistem wajib menampilkan jumlah denda yang harus dibayar sebelum transaksi pengembalian disimpan |

---

## 7. Data Objects

### 7.1 Objek Siswa
```
idSiswa: String (unik, format: "SW-001")
nama: String
kelas: String
username: String (unik)
password: String
createdAt: Date
isActive: Boolean
```

### 7.2 Objek Buku
```
idBuku: String (unik, format: "BK-001")
judul: String
penulis: String
kategori: String (enum: "Fiksi" | "Non-Fiksi" | "Sains" | "Sejarah" | "Teknologi" | "Sastra" | "Referensi")
jenis: String (enum: "fisik" | "digital")
stok: Integer (hanya untuk jenis "fisik"; minimal 0)
pdfUrl: String (hanya untuk jenis "digital"; URL atau path file)
coverUrl: String (URL gambar sampul)
tahunTerbit: Integer
penerbit: String
deskripsi: String
createdAt: Date
```

### 7.3 Objek Peminjaman
```
idPinjam: String (unik, format: "PJ-001")
idSiswa: String (referensi ke Siswa)
idBuku: String (referensi ke Buku)
tanggalPinjam: Date
batasKembali: Date (= tanggalPinjam + 7 hari)
status: String (enum: "dipinjam" | "dikembalikan" | "terlambat")
createdAt: Date
```

### 7.4 Objek Pengembalian
```
idKembali: String (unik, format: "KB-001")
idPinjam: String (referensi ke Peminjaman)
tanggalKembali: Date
jumlahHariTerlambat: Integer (0 jika tepat waktu)
denda: Integer (= jumlahHariTerlambat × 500)
statusDenda: String (enum: "lunas" | "belum_bayar")
catatan: String (opsional)
```

### 7.5 Objek Review Buku
```
idReview: String (unik, format: "RV-001")
idBuku: String (referensi ke Buku)
idSiswa: String (referensi ke Siswa)
rating: Integer (1–5)
komentar: String
createdAt: Date
```

### 7.6 Objek Notifikasi
```
idNotifikasi: String (unik, format: "NT-001")
idSiswa: String (referensi ke Siswa)
idPinjam: String (referensi ke Peminjaman)
pesan: String
tipeNotifikasi: String (enum: "jatuh_tempo" | "terlambat")
isRead: Boolean
createdAt: Date
```

### 7.7 Objek Pengguna (Admin & Guru)
```
idUser: String (unik, format: "USR-001")
nama: String
username: String (unik)
password: String
peran: String (enum: "admin" | "guru" | "kepala_sekolah")
jabatan: String (hanya untuk peran "guru")
isActive: Boolean
createdAt: Date
```

---

## 8. Validasi Input

| Field | Aturan Validasi |
|---|---|
| username | Tidak boleh kosong; minimal 4 karakter; hanya alfanumerik dan underscore |
| password | Tidak boleh kosong; minimal 6 karakter |
| judul buku | Tidak boleh kosong; maksimal 200 karakter |
| penulis | Tidak boleh kosong; maksimal 100 karakter |
| stok | Harus berupa angka bulat positif atau nol; tidak boleh negatif |
| rating | Harus berupa angka bulat antara 1 dan 5 |
| tanggalPinjam | Tidak boleh tanggal di masa depan |
| komentar review | Opsional; jika diisi, maksimal 500 karakter |

---

## 9. Antarmuka Luar (External Interfaces)

Sistem ini berjalan sepenuhnya di browser sebagai prototipe front-end. Tidak ada integrasi dengan layanan eksternal.

| Interface | Tipe | Keterangan |
|---|---|---|
| localStorage | Browser API | Penyimpanan utama seluruh data (buku, siswa, peminjaman, pengembalian, notifikasi, konfigurasi, log, review). Batas kapasitas ≈ 5–10 MB per domain. |
| iframe PDF | HTML | Embed e-book PDF dari URL eksternal (contoh: W3C dummy PDF). Tidak ada integrasi backend. |
| window.print() | Browser API | Digunakan untuk cetak laporan peminjaman (di halaman Guru Laporan). |

---

## 10. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| ID | Aspek | Keterangan |
|---|---|---|
| NFR-01 | Performa | Semua halaman harus dimuat dalam waktu < 2 detik pada koneksi normal (localhost). |
| NFR-02 | Ukuran bundle | Total ukuran bundle JS ≤ 800 KB (uncompressed); CSS ≤ 50 KB. |
| NFR-03 | Responsivitas | Semua halaman harus dapat digunakan pada layar lebar ≥ 320px (mobile) hingga ≥ 1440px (desktop). |
| NFR-04 | Konsistensi UI | Seluruh komponen mengikuti design system yang terdokumentasi (warna, tipografi, border-radius, spasi). |
| NFR-05 | Keamanan data lokal | Sistem tidak menyimpan kredensial dalam format plain-text tanpa pertimbangan; session disimpan sebagai JSON pada localStorage. Password hanya untuk prototipe (bukan production-ready). |
| NFR-06 | Portabilitas | Dapat dijalankan pada browser modern: Chrome, Firefox, Edge, Safari (dua versi terakhir). |
| NFR-07 | Maintainability | Kode terstruktur dengan pemisahan yang jelas: components, pages, services, contexts, lib. Setiap file < 300 baris. |
| NFR-08 | Accessibility (dasar) | Form input memiliki label, tombol memiliki teks/ikon, kontras warna memenuhi standar dasar WCAG AA. |

---

## 11. Hak Akses dan Peran (Permissions & Access Control)

| Halaman / Fitur | Siswa | Guru/Karyawan | Kepala Sekolah | Admin |
|---|---|---|---|---|
| Login/Logout | ✅ | ✅ | ✅ | ✅ |
| Dashboard | `/siswa/dashboard` | `/guru/dashboard` | `/kepsek/dashboard` | `/admin/dashboard` |
| Profil Saya | ✅ | ✅ | ✅ | ✅ |
| Katalog Buku | ✅ | ✅ | ✅ | ✅ |
| Detail Buku | ✅ | ✅ | ✅ | ✅ |
| E-book Viewer | ✅ | ❌ | ❌ | ❌ |
| Notifikasi | ✅ | ❌ | ❌ | ❌ |
| Tulis Review | ✅ | ❌ | ❌ | ❌ |
| Rekomendasi Buku | ✅ | ❌ | ❌ | ❌ |
| Data Buku (CRUD) | ❌ | ✅ | ❌ | ❌ |
| Upload PDF | ❌ | ✅ | ❌ | ❌ |
| Peminjaman (list/baru) | ❌ | ✅ | ❌ | ❌ |
| Pengembalian (list/proses) | ❌ | ✅ | ❌ | ❌ |
| Laporan Peminjaman | ❌ | ✅ | ❌ | ❌ |
| Grafik Peminjaman | ❌ | ❌ | ✅ | ❌ |
| Analisis Minat Baca | ❌ | ❌ | ✅ | ❌ |
| Kelola User | ❌ | ❌ | ❌ | ✅ |
| Pengaturan Sistem | ❌ | ❌ | ❌ | ✅ |
| Backup & Reset | ❌ | ❌ | ❌ | ✅ |
| Log Aktivitas | ❌ | ❌ | ❌ | ✅ |

Akses lintas peran diblokir oleh komponen `ProtectedRoute` yang memeriksa `user.peran` pada setiap rute. Jika pengguna mengakses halaman yang bukan perannya, sistem akan mengarahkan ke halaman 404.

---

## 12. Pertanyaan Terbuka (Open Questions)

| No | Pertanyaan | Dampak | Status |
|---|---|---|---|
| 1 | Apakah diperlukan batasan jumlah review per siswa per buku? | Mempengaruhi keaslian data review. Saat ini: satu review per siswa per buku (enforce di frontend). | Ditutup — satu review per siswa per buku |
| 2 | Bagaimana menangani buku digital yang PDF-nya tidak tersedia? | Saat ini: tampilkan pesan error di iframe viewer. | Ditutup — error handling sudah ada |
| 3 | Apakah notifikasi harus persisten (muncul kembali setelah logout/login)? | Saat ini: notifikasi disimpan di localStorage sehingga persisten selama data tidak di-reset. | Ditutup |

---

## 13. Pertimbangan Masa Depan (Future Considerations)

Fitur-fitur berikut **tidak diimplementasikan** pada prototipe ini, namun dapat ditambahkan pada pengembangan selanjutnya:

- **Integrasi backend nyata** (Node.js/Express atau Laravel) dengan database relasional (MySQL/PostgreSQL).
- **Autentikasi JWT** dengan refresh token dan enkripsi password (bcrypt).
- **Sistem notifikasi push** via WebSocket atau Service Worker untuk pengingat jatuh tempo secara real-time.
- **QR Code** pada buku fisik untuk mempercepat pencarian dan pencatatan.
- **Integrasi payment gateway** untuk pembayaran denda secara online.
- **Machine Learning** untuk rekomendasi buku yang lebih akurat berdasarkan pola baca.
- **Multi-cabang** perpustakaan dengan data terpusat.
- **Aplikasi mobile** (React Native atau Flutter) untuk akses dari smartphone.
- **Manajemen anggota** dengan kartu anggota digital dan riwayat baca lengkap.
- **Export laporan** ke format PDF atau Excel (menggunakan library seperti jsPDF atau SheetJS).
- **Audit trail** yang lebih lengkap untuk setiap perubahan data.

---

## 14. Riwayat Revisi (Revision History)

| Versi | Tanggal | Perubahan | Penulis |
|---|---|---|---|
| 1.0 | 2026 | Dokumen awal — 13 BR, 7 DO, 4 VR, 23 fitur | Tim Kelompok 12 |
| 1.1 | 2026 | Penambahan: Section 9 (Antarmuka Luar), Section 10 (NFR), Section 11 (Hak Akses), Section 12 (Open Questions), Section 13 (Future), Section 14 (Revisi). Perbaikan: BR-03 (configurable denda), Tech Stack (iframe only). | Tim Kelompok 12 |
