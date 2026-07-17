# Database Design

## 1. Deskripsi

Database Design ini merupakan rancangan struktur database untuk Sistem Informasi Perpustakaan Perintis. Saat ini aplikasi masih menggunakan **localStorage** sebagai media penyimpanan data, sehingga database relasional belum diimplementasikan. Dokumen ini dibuat sebagai acuan apabila sistem dikembangkan menggunakan DBMS seperti MySQL, PostgreSQL, atau Firebase Firestore.

---

# Entity Relationship Diagram (ERD)

## Entitas

1. User
2. Buku
3. Ebook
4. Peminjaman
5. Pengembalian
6. Review
7. Notifikasi

---

# Struktur Tabel

## Tabel User

| Field | Tipe Data | Key | Keterangan |
|--------|-----------|-----|------------|
| id_user | INT | PK | ID pengguna |
| nama | VARCHAR(100) | | Nama pengguna |
| username | VARCHAR(50) | UNIQUE | Username |
| password | VARCHAR(255) | | Password |
| role | ENUM('Admin','Siswa','Guru','Kepala Sekolah') | | Hak akses |

---

## Tabel Buku

| Field | Tipe Data | Key | Keterangan |
|--------|-----------|-----|------------|
| id_buku | INT | PK | ID buku |
| judul | VARCHAR(200) | | Judul buku |
| penulis | VARCHAR(100) | | Penulis |
| penerbit | VARCHAR(100) | | Penerbit |
| kategori | VARCHAR(50) | | Kategori |
| tahun_terbit | YEAR | | Tahun terbit |
| stok | INT | | Jumlah buku |

---

## Tabel Ebook

| Field | Tipe Data | Key |
|--------|-----------|-----|
| id_ebook | INT | PK |
| id_buku | INT | FK |
| file_pdf | VARCHAR(255) | |
| ukuran_file | VARCHAR(20) | |

---

## Tabel Peminjaman

| Field | Tipe Data | Key |
|--------|-----------|-----|
| id_pinjam | INT | PK |
| id_user | INT | FK |
| id_buku | INT | FK |
| tanggal_pinjam | DATE | |
| batas_pengembalian | DATE | |
| status | ENUM('Dipinjam','Dikembalikan') | |

---

## Tabel Pengembalian

| Field | Tipe Data | Key |
|--------|-----------|-----|
| id_pengembalian | INT | PK |
| id_pinjam | INT | FK |
| tanggal_kembali | DATE | |
| denda | DECIMAL(10,2) | |

---

## Tabel Review

| Field | Tipe Data | Key |
|--------|-----------|-----|
| id_review | INT | PK |
| id_user | INT | FK |
| id_buku | INT | FK |
| rating | INT | |
| komentar | TEXT | |

---

## Tabel Notifikasi

| Field | Tipe Data | Key |
|--------|-----------|-----|
| id_notifikasi | INT | PK |
| id_user | INT | FK |
| pesan | TEXT | |
| tanggal | DATETIME | |
| status_baca | BOOLEAN | |

---

# Relasi Database

- User (1) —— (N) Peminjaman
- Buku (1) —— (N) Peminjaman
- Peminjaman (1) —— (1) Pengembalian
- User (1) —— (N) Review
- Buku (1) —— (N) Review
- User (1) —— (N) Notifikasi
- Buku (1) —— (1) Ebook

---

# Kesimpulan

Rancangan database ini dibuat sebagai dokumentasi **Source of Truth (SoT)**. Walaupun implementasi saat ini masih menggunakan **localStorage**, struktur database telah dirancang agar sistem dapat dengan mudah dikembangkan menggunakan database relasional di masa mendatang.