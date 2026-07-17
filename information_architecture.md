# information_architecture.md — Information Architecture
# Sistem Informasi Perpustakaan Perintis

**Versi:** 1.0  
**Tanggal:** 2026

---

## 1. Global Layout

Aplikasi menggunakan layout dua-kolom yang konsisten di seluruh halaman authenticated:

```
┌─────────────────────────────────────────────────────────┐
│  TOPBAR (Logo + Nama Perpustakaan + Info User + Logout) │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│   SIDEBAR    │         AREA KONTEN UTAMA                │
│  (Navigasi   │    (Berubah sesuai halaman aktif)        │
│   berbasis   │                                          │
│   peran)     │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

- **Topbar**: Tinggi 64px. Berisi logo perpustakaan di kiri, nama sistem di tengah, dan di kanan: nama pengguna yang login + tombol Logout.
- **Sidebar**: Lebar 240px. Daftar menu navigasi yang tampil berbeda sesuai peran pengguna (role-based). Sidebar dapat di-collapse menjadi icon-only (lebar 64px) untuk layar kecil.
- **Area Konten**: Mengisi sisa lebar layar. Memiliki padding 24px dari semua sisi. Setiap halaman memiliki breadcrumb di bagian atas konten.

---

## 2. Halaman Unauthenticated (Publik)

| Rute | Nama Halaman | Keterangan |
|---|---|---|
| `/` | Redirect | Redirect otomatis ke `/login` |
| `/login` | Halaman Login | Satu-satunya halaman yang dapat diakses tanpa autentikasi |

---

## 3. Route Map — Siswa (ACTOR-01)

Sidebar Siswa menampilkan menu berikut setelah login:

| Rute | Nama Halaman | Ikon | Keterangan |
|---|---|---|---|
| `/siswa/dashboard` | Dashboard Siswa | 🏠 | Halaman utama: ringkasan peminjaman aktif, notifikasi jatuh tempo, rekomendasi buku |
| `/siswa/katalog` | Katalog Buku | 📚 | Pencarian & daftar semua buku fisik dan digital |
| `/siswa/katalog/:idBuku` | Detail Buku | — | Halaman detail buku: info lengkap, stok, review, tombol akses e-book |
| `/siswa/pinjaman-saya` | Peminjaman Saya | 📋 | Daftar buku yang sedang dipinjam beserta status dan sisa hari |
| `/siswa/riwayat` | Riwayat Peminjaman | 🕐 | Riwayat seluruh transaksi peminjaman yang sudah selesai |
| `/siswa/ebook/:idBuku` | Baca E-book | 📖 | PDF viewer untuk membaca e-book |
| `/siswa/notifikasi` | Notifikasi | 🔔 | Daftar semua notifikasi jatuh tempo dan keterlambatan |
| `/siswa/profil` | Profil Saya | 👤 | Data diri siswa |

---

## 4. Route Map — Guru/Karyawan (ACTOR-02)

Sidebar Guru/Karyawan menampilkan menu berikut:

| Rute | Nama Halaman | Ikon | Keterangan |
|---|---|---|---|
| `/guru/dashboard` | Dashboard Guru | 🏠 | Ringkasan: jumlah buku total, peminjaman aktif, pengembalian hari ini |
| `/guru/kelola-buku` | Kelola Buku | 📚 | Tabel daftar buku dengan fitur tambah, edit, hapus |
| `/guru/kelola-buku/tambah` | Tambah Buku | ➕ | Form input buku baru |
| `/guru/kelola-buku/edit/:idBuku` | Edit Buku | ✏️ | Form edit data buku |
| `/guru/peminjaman` | Kelola Peminjaman | 📋 | Tabel seluruh transaksi peminjaman aktif; tombol catat peminjaman baru |
| `/guru/peminjaman/baru` | Catat Peminjaman | ➕ | Form mencatat transaksi peminjaman baru |
| `/guru/pengembalian` | Kelola Pengembalian | 🔄 | Tabel peminjaman yang belum dikembalikan; tombol proses pengembalian |
| `/guru/pengembalian/proses/:idPinjam` | Proses Pengembalian | ✅ | Form konfirmasi pengembalian: tampilkan denda jika ada |
| `/guru/laporan` | Generate Laporan | 📊 | Filter laporan per rentang tanggal; tampilan tabel yang bisa dicetak |
| `/guru/upload-digital` | Upload Materi Digital | ⬆️ | Form upload file PDF buku digital |
| `/guru/profil` | Profil Saya | 👤 | Data diri guru/karyawan |

---

## 5. Route Map — Kepala Sekolah (ACTOR-03)

Sidebar Kepala Sekolah menampilkan menu berikut:

| Rute | Nama Halaman | Ikon | Keterangan |
|---|---|---|---|
| `/kepsek/dashboard` | Dashboard Kepala Sekolah | 🏠 | KPI utama: total buku, total peminjaman bulan ini, denda terkumpul |
| `/kepsek/data-buku` | Data Buku | 📚 | Tabel read-only seluruh koleksi buku (fisik & digital); hanya bisa melihat |
| `/kepsek/data-peminjaman` | Data Peminjaman | 📋 | Tabel read-only seluruh transaksi peminjaman dengan filter tanggal |
| `/kepsek/grafik` | Grafik Peminjaman | 📈 | Bar chart tren peminjaman per bulan; line chart peminjaman per kategori |
| `/kepsek/minat-baca` | Analisis Minat Baca | 🔍 | Pie chart kategori buku terpopuler; tabel top 10 buku paling sering dipinjam |
| `/kepsek/profil` | Profil Saya | 👤 | Data diri kepala sekolah |

---

## 6. Route Map — Admin (ACTOR-04)

Sidebar Admin menampilkan menu berikut:

| Rute | Nama Halaman | Ikon | Keterangan |
|---|---|---|---|
| `/admin/dashboard` | Dashboard Admin | 🏠 | Ringkasan sistem: jumlah user aktif, total buku, status sistem |
| `/admin/kelola-user` | Kelola User | 👥 | Tabel seluruh pengguna sistem; fitur tambah, edit, nonaktifkan akun |
| `/admin/kelola-user/tambah` | Tambah User | ➕ | Form tambah akun baru (siswa, guru, kepala sekolah) |
| `/admin/kelola-user/edit/:idUser` | Edit User | ✏️ | Form edit data dan peran pengguna |
| `/admin/data-sistem` | Pengaturan Sistem | ⚙️ | Konfigurasi: nama perpustakaan, denda per hari, batas hari pinjam |
| `/admin/backup` | Backup Data | 💾 | Ekspor seluruh data ke file JSON; tombol reset data ke dummy |
| `/admin/log-aktivitas` | Log Aktivitas | 📜 | Riwayat aksi penting dalam sistem (login, tambah buku, dll.) |
| `/admin/profil` | Profil Saya | 👤 | Data diri admin |

---

## 7. Hierarki Navigasi & Entry Points

### Entry Point Utama
- Semua pengguna masuk melalui `/login`
- Setelah login berhasil, sistem membaca `peran` pengguna dan melakukan redirect:
  - Siswa → `/siswa/dashboard`
  - Guru/Karyawan → `/guru/dashboard`
  - Kepala Sekolah → `/kepsek/dashboard`
  - Admin → `/admin/dashboard`

### Proteksi Rute
- Semua rute selain `/login` adalah **Authenticated Routes**
- Pengguna yang belum login wajib di-redirect ke `/login`
- Pengguna yang sudah login dan mengakses rute di luar perannya wajib di-redirect ke dashboard perannya masing-masing (mis. siswa yang mengakses `/guru/...` → redirect ke `/siswa/dashboard`)

### Hierarki Menu Sidebar per Peran

**Siswa:**
```
Dashboard
Katalog Buku
Peminjaman Saya
Riwayat Peminjaman
Notifikasi [badge angka jika ada notifikasi belum dibaca]
Profil
```

**Guru/Karyawan:**
```
Dashboard
Kelola Buku [sub-menu: Daftar Buku, Tambah Buku, Upload Digital]
Kelola Transaksi [sub-menu: Peminjaman, Pengembalian]
Generate Laporan
Profil
```

**Kepala Sekolah:**
```
Dashboard
Data Buku [read-only]
Data Peminjaman [read-only]
Grafik Peminjaman
Analisis Minat Baca
Profil
```

**Admin:**
```
Dashboard
Kelola User
Pengaturan Sistem
Backup & Maintenance [sub-menu: Backup Data, Log Aktivitas]
Profil
```

---

## 8. Komponen Navigasi Khusus

### Badge Notifikasi
- Ikon notifikasi (🔔) di sidebar dan topbar siswa wajib menampilkan badge berisi jumlah notifikasi yang belum dibaca
- Badge hanya tampil jika jumlah > 0

### Breadcrumb
- Setiap halaman wajib menampilkan breadcrumb di bawah topbar
- Format: `Nama Halaman Utama > Nama Sub-Halaman`
- Contoh: `Kelola Buku > Edit Buku`

### Halaman 404
- Jika pengguna mengakses rute yang tidak dikenal, tampilkan halaman "404 - Halaman Tidak Ditemukan" dengan tombol kembali ke dashboard
