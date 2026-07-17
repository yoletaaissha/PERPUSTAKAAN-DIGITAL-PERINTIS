# user_flows/index.md — Peta Alur Pengguna (Use Case Index)

# Sistem Informasi Perpustakaan Perintis

**Versi:** 1.0  
**Tanggal:** 2026

---

# Dokumen User Flow

Dokumen pada folder ini berisi spesifikasi Use Case dan User Flow Diagram untuk setiap aktor pada Sistem Informasi Perpustakaan Perintis.

## User Flow Diagram

Diagram berikut menggambarkan alur navigasi utama setiap aktor dalam sistem.

| Aktor | Diagram |
|--------|---------|
| Siswa | [User Flow Siswa](./user_flow_diagram.md#1-user-flow-siswa) |
| Guru/Karyawan | [User Flow Guru/Karyawan](./user_flow_diagram.md#2-user-flow-guru--karyawan) |
| Kepala Sekolah | [User Flow Kepala Sekolah](./user_flow_diagram.md#3-user-flow-kepala-sekolah) |
| Admin | [User Flow Admin](./user_flow_diagram.md#4-user-flow-admin) |

---

# Daftar Use Case

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

# Catatan Umum

- Semua Use Case selain **UC-001 (Login Pengguna)** mengharuskan pengguna telah terautentikasi.
- Jika sesi login tidak valid, sistem akan mengarahkan pengguna kembali ke halaman `/login`.
- Seluruh data pada prototype disimpan menggunakan **localStorage**.
- Dummy data awal disediakan agar seluruh fitur dapat langsung diuji tanpa melakukan input data dari awal.

---

# Hubungan Dokumen

```
SRS
   │
   ▼
Use Case Diagram
   │
   ▼
User Flow Diagram
   │
   ▼
Use Case Specification (UC-001 s.d. UC-017)
   │
   ▼
Sequence Diagram
   │
   ▼
Class Diagram
   │
   ▼
Implementation
```