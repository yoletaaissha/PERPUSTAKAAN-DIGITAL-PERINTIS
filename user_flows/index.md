# user_flows/index.md — Peta Alur Pengguna (Use Case Index)

# Sistem Informasi Perpustakaan Perintis

**Versi:** 1.0  
**Tanggal:** 2026

---

# Deskripsi

Folder **user_flows** merupakan **Source of Truth (SoT #4)** yang mendokumentasikan seluruh alur pengguna (User Flow) pada Sistem Informasi Perpustakaan Perintis.

Setiap Use Case menjelaskan tujuan pengguna, prasyarat, langkah-langkah interaksi dengan sistem, kondisi alternatif, serta kondisi akhir setelah proses selesai.

Dokumen ini menjadi acuan utama dalam penyusunan:

- High Fidelity Prototype
- Sequence Diagram
- Data Model (Class Diagram)
- Use Case Integration Contract (UCIC)
- Implementasi Sistem
- Testing & Validation

---

# Aktor Sistem

Sistem memiliki empat jenis pengguna (aktor):

| Aktor | Deskripsi |
|--------|-----------|
| Siswa | Mengakses katalog buku, meminjam buku, membaca e-book, melihat notifikasi, memberikan review, dan melihat rekomendasi buku. |
| Guru/Karyawan | Mengelola data buku, mencatat peminjaman dan pengembalian, mengunggah e-book, serta menghasilkan laporan peminjaman. |
| Kepala Sekolah | Melihat dashboard, grafik peminjaman, dan analisis minat baca siswa. |
| Admin | Mengelola akun pengguna, pengaturan sistem, backup data, serta log aktivitas. |

---

# User Flow Diagram

Diagram berikut menggambarkan navigasi utama masing-masing aktor.

| Aktor | Diagram |
|--------|---------|
| Siswa | [User Flow Siswa](./user_flow_diagram.md#1-user-flow-siswa) |
| Guru/Karyawan | [User Flow Guru/Karyawan](./user_flow_diagram.md#2-user-flow-guru-karyawan) |
| Kepala Sekolah | [User Flow Kepala Sekolah](./user_flow_diagram.md#3-user-flow-kepala-sekolah) |
| Admin | [User Flow Admin](./user_flow_diagram.md#4-user-flow-admin) |

---

# Daftar Use Case

| Kode UC | Nama Use Case | Aktor | Halaman Terkait | Dependensi | File Detail |
|---|---|---|---|---|---|
| UC-001 | Login Pengguna | Semua Aktor | `/login` | — | `userflow_uc_001.md` |
| UC-002 | Logout Pengguna | Semua Aktor | Seluruh Halaman | UC-001 | `userflow_uc_002.md` |
| UC-003 | Cari & Lihat Katalog Buku | Siswa | `/siswa/katalog` | UC-001 | `userflow_uc_003.md` |
| UC-004 | Akses E-book (PDF) | Siswa | `/siswa/ebook/:idBuku` | UC-001, UC-003 | `userflow_uc_004.md` |
| UC-005 | Lihat Notifikasi Pengembalian | Siswa | `/siswa/notifikasi`, `/siswa/dashboard` | UC-001 | `userflow_uc_005.md` |
| UC-006 | Beri Review & Rating Buku | Siswa | `/siswa/katalog/:idBuku` | UC-001, Riwayat Pinjam | `userflow_uc_006.md` |
| UC-007 | Lihat Rekomendasi Buku | Siswa | `/siswa/dashboard` | UC-001, Riwayat Pinjam | `userflow_uc_007.md` |
| UC-008 | Input Data Buku Baru | Guru/Karyawan | `/guru/kelola-buku/tambah` | UC-001 | `userflow_uc_008.md` |
| UC-009 | Edit Data Buku | Guru/Karyawan | `/guru/kelola-buku/edit/:idBuku` | UC-001, Buku tersedia | `userflow_uc_009.md` |
| UC-010 | Hapus Data Buku | Guru/Karyawan | `/guru/kelola-buku` | UC-001, Buku tersedia | `userflow_uc_010.md` |
| UC-011 | Catat Peminjaman Baru | Guru/Karyawan | `/guru/peminjaman/baru` | UC-001, Buku tersedia | `userflow_uc_011.md` |
| UC-012 | Proses Pengembalian Buku | Guru/Karyawan | `/guru/pengembalian/proses/:idPinjam` | UC-001, UC-011 | `userflow_uc_012.md` |
| UC-013 | Generate Laporan Peminjaman | Guru/Karyawan | `/guru/laporan` | UC-001 | `userflow_uc_013.md` |
| UC-014 | Upload Materi Digital (E-book) | Guru/Karyawan | `/guru/upload-digital` | UC-001 | `userflow_uc_014.md` |
| UC-015 | Lihat Grafik & Analisis Minat Baca | Kepala Sekolah | `/kepsek/dashboard`, `/kepsek/grafik`, `/kepsek/minat-baca` | UC-001 | `userflow_uc_015.md` |
| UC-016 | Kelola Akun Pengguna | Admin | `/admin/kelola-user` | UC-001 | `userflow_uc_016.md` |
| UC-017 | Backup & Maintenance Sistem | Admin | `/admin/backup`, `/admin/log-aktivitas`, `/admin/data-sistem` | UC-001 | `userflow_uc_017.md` |

---

# Ringkasan Use Case Berdasarkan Aktor

## Siswa

- UC-001 Login
- UC-002 Logout
- UC-003 Cari & Lihat Katalog
- UC-004 Membaca E-book
- UC-005 Melihat Notifikasi
- UC-006 Memberikan Review
- UC-007 Melihat Rekomendasi

---

## Guru / Karyawan

- UC-001 Login
- UC-002 Logout
- UC-008 Input Buku
- UC-009 Edit Buku
- UC-010 Hapus Buku
- UC-011 Catat Peminjaman
- UC-012 Proses Pengembalian
- UC-013 Generate Laporan
- UC-014 Upload E-book

---

## Kepala Sekolah

- UC-001 Login
- UC-002 Logout
- UC-015 Dashboard, Grafik dan Analisis Minat Baca

---

## Admin

- UC-001 Login
- UC-002 Logout
- UC-016 Kelola Akun Pengguna
- UC-017 Backup & Maintenance Sistem

---

# Catatan Umum

- Seluruh Use Case selain **UC-001 (Login)** mengharuskan pengguna telah berhasil melakukan autentikasi.
- Jika sesi login tidak ditemukan atau telah berakhir, sistem akan mengarahkan pengguna ke halaman **/login**.
- Seluruh data pada prototype disimpan menggunakan **localStorage**.
- Dummy data awal disediakan agar seluruh fitur dapat langsung digunakan tanpa proses input data dari awal.
- Seluruh User Flow disusun berdasarkan kebutuhan yang telah didefinisikan pada dokumen **Software Requirements Specification (SRS)**.

---

# Hubungan Artefak (Chain of Truth)

```text
Validated SRS (SoT #1)
        │
        ▼
Information Architecture (SoT #2)
        │
        ▼
Design System (SoT #3)
        │
        ▼
User Flow (SoT #4)
        │
        ├───────────────┐
        ▼               ▼
High Fidelity      Data Model
Prototype (SoT #5) (SoT #6)
        │               │
        └───────┬───────┘
                ▼
Use Case Integration Contract (SoT #7)
                │
                ▼
Implementation
                │
                ▼
Testing & Validation
```

---

# Dokumen Terkait

Dokumen yang berhubungan dengan User Flow:

- Software Requirements Specification (SRS)
- Information Architecture
- Design System
- User Flow Diagram
- Sequence Diagram
- Class Diagram (Data Model)
- Use Case Integration Contract (UCIC)
- High Fidelity Prototype
- Source Code Implementation
- Testing & Validation