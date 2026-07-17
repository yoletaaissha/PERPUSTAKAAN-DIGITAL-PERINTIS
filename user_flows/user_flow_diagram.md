# User Flow Diagram

Dokumen ini menggambarkan alur navigasi utama setiap aktor pada Sistem Informasi Perpustakaan Perintis. Diagram disusun berdasarkan Use Case UC-001 sampai UC-017 dan menjadi acuan dalam perancangan antarmuka, class diagram, serta implementasi sistem.

---

# Overview User Flow

```mermaid
flowchart LR

A([Login])

A --> B[Siswa]
A --> C[Guru/Karyawan]
A --> D[Kepala Sekolah]
A --> E[Admin]

B --> F([Logout])
C --> F
D --> F
E --> F
```

---

# 1. User Flow Siswa

```mermaid
flowchart TD

A([Start])
--> B[Halaman Login]

B --> C[Masukkan Username & Password]

C --> D{Login Berhasil?}

D -- Tidak --> E[Tampilkan Pesan Error]
E --> B

D -- Ya --> F[Dashboard Siswa]

F --> G[Katalog Buku]
F --> H[Peminjaman Saya]
F --> I[Riwayat Peminjaman]
F --> J[Notifikasi]
F --> K[Profil]
F --> L[Logout]

%% Katalog
G --> G1[Cari Buku]
G1 --> G2[Filter Buku]
G2 --> G3[Detail Buku]

G3 --> G4{Jenis Buku?}

G4 -- Buku Digital --> G5[Baca E-book PDF]

G4 -- Buku Fisik --> G6[Lihat Informasi Buku]

G3 --> G7{Pernah Meminjam?}

G7 -- Ya --> G8[Beri Review & Rating]
G7 -- Tidak --> G3

G5 --> F
G6 --> F
G8 --> F

%% Halaman lainnya
H --> F
I --> F
J --> F
K --> F

L --> M([Selesai])
```

---

# 2. User Flow Guru / Karyawan

```mermaid
flowchart TD

A([Start])
--> B[Halaman Login]

B --> C[Masukkan Username & Password]

C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Guru]

F --> G[Kelola Buku]
F --> H[Upload E-book]
F --> I[Peminjaman]
F --> J[Pengembalian]
F --> K[Generate Laporan]
F --> L[Profil]
F --> M[Logout]

%% Kelola Buku

G --> G1[Tambah Buku]
G --> G2[Edit Buku]
G --> G3[Hapus Buku]

G1 --> G
G2 --> G
G3 --> G

%% Upload Ebook

H --> H1[Input Data E-book]
H1 --> H2[Upload File PDF]
H2 --> H3[Simpan]
H3 --> F

%% Peminjaman

I --> I1[Pilih Siswa]
I1 --> I2[Pilih Buku]
I2 --> I3[Simpan Peminjaman]
I3 --> F

%% Pengembalian

J --> J1[Pilih Transaksi]
J1 --> J2[Hitung Denda]
J2 --> J3[Konfirmasi Pengembalian]
J3 --> F

%% Laporan

K --> K1[Pilih Periode]
K1 --> K2[Tampilkan Laporan]
K2 --> K3[Cetak / Export]
K3 --> F

L --> F

M --> N([Selesai])
```

---

# 3. User Flow Kepala Sekolah

```mermaid
flowchart TD

A([Start])
--> B[Halaman Login]

B --> C[Masukkan Username & Password]

C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Kepala Sekolah]

F --> G[Data Buku]
F --> H[Data Peminjaman]
F --> I[Grafik Peminjaman]
F --> J[Analisis Minat Baca]
F --> K[Profil]
F --> L[Logout]

%% Data Buku

G --> G1[Lihat Daftar Buku]
G1 --> F

%% Data Peminjaman

H --> H1[Lihat Data Peminjaman]
H1 --> F

%% Grafik

I --> I1[Pilih Tahun]
I1 --> I2[Tampilkan Grafik]
I2 --> F

%% Analisis

J --> J1[Lihat Statistik]
J --> J2[Lihat Buku Terfavorit]
J --> J3[Lihat Minat Baca]

J1 --> F
J2 --> F
J3 --> F

%% Profil

K --> F

L --> M([Selesai])
```

---

# 4. User Flow Admin

```mermaid
flowchart TD

A([Start])
--> B[Halaman Login]

B --> C[Masukkan Username & Password]

C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Admin]

F --> G[Kelola User]
F --> H[Pengaturan Sistem]
F --> I[Backup Data]
F --> J[Log Aktivitas]
F --> K[Profil]
F --> L[Logout]

%% Kelola User

G --> G1[Tambah User]
G --> G2[Edit User]
G --> G3[Hapus User]

G1 --> G
G2 --> G
G3 --> G

%% Pengaturan

H --> H1[Ubah Konfigurasi]
H1 --> H2[Simpan Pengaturan]
H2 --> F

%% Backup

I --> I1[Backup Data]
I1 --> I2[Download File]
I2 --> F

%% Log Aktivitas

J --> J1[Lihat Riwayat Aktivitas]
J1 --> F

%% Profil

K --> F

L --> M([Selesai])
```

---

# Keterangan

- Seluruh aktor harus melakukan login sebelum mengakses sistem.
- Semua alur mengacu pada Use Case UC-001 sampai UC-017.
- Diagram ini menjadi dasar penyusunan Sequence Diagram, Class Diagram, UCIC, dan implementasi aplikasi.
- Data pada prototype disimpan menggunakan **localStorage** sehingga seluruh alur dapat langsung diuji menggunakan dummy data.