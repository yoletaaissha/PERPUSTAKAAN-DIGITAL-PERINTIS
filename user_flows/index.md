# user_flows/index.md — Peta Alur Pengguna (Use Case Index)
# Sistem Informasi Perpustakaan Sekolah Berbasis Hybrid

**Versi:** 1.0  
**Tanggal:** 2026

---

## Daftar Use Case

| Kode UC | Nama Use Case | Aktor | Halaman Terkait | Dependensi | File Detail |
|---|---|---|---|---|---|
| UC-001 | Login Pengguna | Semua Aktor | `/login` | — | `userflow_uc_001.md` |
| UC-002 | Logout Pengguna | Semua Aktor | Topbar (semua halaman) | UC-001 | `userflow_uc_002.md` |
| UC-003 | Cari & Lihat Katalog Buku | Siswa | `/siswa/katalog` | UC-001 | `userflow_uc_003.md` |
| UC-004 | Akses E-book (PDF) | Siswa | `/siswa/ebook/:idBuku` | UC-001, UC-003 | `userflow_uc_004.md` |
| UC-005 | Lihat Notifikasi Pengembalian | Siswa | `/siswa/notifikasi`, `/siswa/dashboard` | UC-001 | `userflow_uc_005.md` |
| UC-006 | Beri Review & Rating Buku | Siswa | `/siswa/katalog/:idBuku` | UC-001, Riwayat pinjam ada | `userflow_uc_006.md` |
| UC-007 | Lihat Rekomendasi Buku | Siswa | `/siswa/dashboard` | UC-001, Riwayat pinjam ada | `userflow_uc_007.md` |
| UC-008 | Input Data Buku Baru | Guru/Karyawan | `/guru/kelola-buku/tambah` | UC-001 | `userflow_uc_008.md` |
| UC-009 | Edit Data Buku | Guru/Karyawan | `/guru/kelola-buku/edit/:idBuku` | UC-001, Buku ada | `userflow_uc_009.md` |
| UC-010 | Hapus Data Buku | Guru/Karyawan | `/guru/kelola-buku` | UC-001, Buku ada | `userflow_uc_010.md` |
| UC-011 | Catat Peminjaman Baru | Guru/Karyawan | `/guru/peminjaman/baru` | UC-001, Buku tersedia | `userflow_uc_011.md` |
| UC-012 | Proses Pengembalian Buku | Guru/Karyawan | `/guru/pengembalian/proses/:idPinjam` | UC-001, UC-011 | `userflow_uc_012.md` |
| UC-013 | Generate Laporan Peminjaman | Guru/Karyawan | `/guru/laporan` | UC-001 | `userflow_uc_013.md` |
| UC-014 | Upload Materi Digital (E-book) | Guru/Karyawan | `/guru/upload-digital` | UC-001 | `userflow_uc_014.md` |
| UC-015 | Lihat Grafik & Analisis (Kepsek) | Kepala Sekolah | `/kepsek/grafik`, `/kepsek/minat-baca` | UC-001 | `userflow_uc_015.md` |
| UC-016 | Kelola Akun Pengguna | Admin | `/admin/kelola-user` | UC-001 | `userflow_uc_016.md` |
| UC-017 | Backup & Maintenance Sistem | Admin | `/admin/backup`, `/admin/log-aktivitas` | UC-001 | `userflow_uc_017.md` |

---

## Catatan Umum

- Semua UC kecuali UC-001 membutuhkan pengguna sudah dalam kondisi terautentikasi
- Jika sesi login tidak valid, sistem wajib redirect ke `/login` sebelum UC dijalankan
- Untuk prototype, semua data persisten disimpan di **localStorage** dengan key yang terdefinisi per objek data
- Dummy data awal wajib disertakan agar alur utama dapat langsung didemonstrasikan tanpa perlu input manual
