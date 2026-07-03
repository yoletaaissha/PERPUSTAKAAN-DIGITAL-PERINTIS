# Sistem Informasi Perpustakaan Sekolah Berbasis Hybrid

Frontend prototype untuk perpustakaan sekolah hybrid (fisik & digital) menggunakan React + Vite + localStorage.

## Persyaratan Sistem

- Node.js 18.x atau lebih baru
- npm 9.x atau lebih baru

## Instalasi & Menjalankan

```bash
npm install
npm run dev
```

Buka browser di `http://localhost:5173`.

## Build Produksi

```bash
npm run build
npm run preview
```

## Akun Demo

| Role | Username | Password |
|------|----------|----------|
| Siswa | `siswa01` | `siswa123` |
| Guru | `guru01` | `guru123` |
| Kepala Sekolah | `kepsek01` | `kepsek123` |
| Admin | `admin01` | `admin123` |

## Cara Test Semua Fitur

### 1. Login (UC-001)

Coba login dengan setiap akun di atas. Verifikasi:
- Login berhasil → redirect ke dashboard sesuai role
- Password salah → tampilkan error "Password salah"
- Username tidak ditemukan → error "Username tidak ditemukan"

### 2. Siswa

Login sebagai `siswa01 / siswa123`:

- **Katalog Buku** (`/siswa/katalog`): Cari buku via judul/penulis, filter kategori & jenis, klik buku untuk detail
- **Detail Buku** (`/siswa/katalog/:idBuku`): Lihat info, rating, ulasan. Klik "Baca E-book" untuk buku digital
- **E-book** (`/siswa/ebook/:idBuku`): PDF viewer via iframe, tombol "Buka di Tab Baru"
- **Peminjaman Saya** (`/siswa/pinjaman-saya`): Lihat peminjaman aktif dengan sisa hari
- **Riwayat** (`/siswa/riwayat`): Riwayat peminjaman dengan pagination
- **Notifikasi** (`/siswa/notifikasi`): Notifikasi jatuh tempo dan keterlambatan auto-generated
- **Review**: Di halaman detail buku yang sudah dikembalikan, klik "Beri Ulasan" → pilih rating 1-5 + komentar

### 3. Guru

Login sebagai `guru01 / guru123`:

- **Kelola Buku** (`/guru/kelola-buku`): Tambah / edit / hapus buku fisik & digital
- **Tambah Buku** (`/guru/kelola-buku/tambah`): Isi form, pilih jenis fisik (isi stok) atau digital (isi URL PDF)
- **Upload Digital** (`/guru/upload-digital`): Upload e-book (URL PDF + metadata)
- **Catat Peminjaman** (`/guru/peminjaman/baru`): Pilih siswa → pilih buku (stok > 0) → auto-set batas 7 hari
- **Proses Pengembalian** (`/guru/pengembalian/proses/:id`): Pilih tanggal kembali → denda auto-calculate (Rp500/hari)
- **Laporan** (`/guru/laporan`): Filter tanggal & status → klik "Cetak Laporan" untuk print

### 4. Kepala Sekolah

Login sebagai `kepsek01 / kepsek123`:

- **Data Buku** (`/kepsek/data-buku`): Lihat koleksi (read-only) dengan search
- **Data Peminjaman** (`/kepsek/data-peminjaman`): Semua transaksi dengan pagination
- **Grafik** (`/kepsek/grafik`): Bar chart peminjaman bulanan + line chart tren per kategori
- **Minat Baca** (`/kepsek/minat-baca`): Pie chart distribusi kategori + top-5 tabel + insight

### 5. Admin

Login sebagai `admin01 / admin123`:

- **Kelola User** (`/admin/kelola-user`): Lihat semua akun (guru/kepsek/admin/siswa), tambah/edit/hapus
- **Tambah User** (`/admin/kelola-user/tambah`): Buat akun baru dengan role pilihan
- **Edit User** (`/admin/kelola-user/edit/:id`): Edit data, toggle aktif/nonaktif (konfirmasi warning)
- **Pengaturan Sistem** (`/admin/data-sistem`): Ubah nama perpustakaan, denda/hari, batas pinjam, maks buku
- **Backup** (`/admin/backup`): Export data (download JSON), Import (upload JSON), Reset data (ketik "RESET")
- **Log Aktivitas** (`/admin/log-aktivitas`): Lihat semua aktivitas dengan timestamp

## Reset Data

Untuk mereset semua data ke default:

1. Login sebagai admin → menu Backup Data → klik "Reset Semua Data"
2. Atau hapus localStorage via DevTools: `localStorage.clear(); location.reload()`

Data akan di-reseed otomatis saat pertama kali aplikasi dimuat.

## Teknologi

- React 18 + Vite
- Tailwind CSS
- React Router v6
- React Context API
- Recharts (grafik)
- Lucide React (icon)
- localStorage (persistensi data)
