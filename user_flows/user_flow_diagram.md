# User Flow Diagram

Dokumen ini menggambarkan alur navigasi pengguna pada Sistem Informasi Perpustakaan Perintis berdasarkan masing-masing aktor.

---

# 1. User Flow Siswa

```mermaid
flowchart TD

A([Start]) --> B[Halaman Login]
B --> C[Masukkan Username & Password]
C --> D{Login Berhasil?}

D -- Tidak --> E[Tampilkan Pesan Error]
E --> B

D -- Ya --> F[Dashboard Siswa]

F --> G[Katalog Buku]
F --> H[Notifikasi]
F --> I[Rekomendasi Buku]
F --> O[Logout]

G --> J[Pencarian / Filter Buku]
J --> K[Detail Buku]

K --> L{Jenis Buku?}

L -- Digital --> M[Baca E-book PDF]
L -- Fisik --> N[Lihat Informasi Buku]

K --> P{Pernah Meminjam?}

P -- Ya --> Q[Beri Review & Rating]
P -- Tidak --> K

M --> F
N --> F
H --> F
I --> K
Q --> F
O --> R([Selesai])
```

---

# 2. User Flow Guru / Karyawan

```mermaid
flowchart TD

A([Start]) --> B[Halaman Login]
B --> C[Masukkan Username & Password]
C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Guru]

F --> G[Kelola Buku]
F --> H[Kelola Peminjaman]
F --> I[Kelola Pengembalian]
F --> J[Generate Laporan]
F --> K[Upload E-book]
F --> T[Logout]

%% Kelola Buku
G --> G1[Tambah Buku]
G --> G2[Edit Buku]
G --> G3[Hapus Buku]

G1 --> G
G2 --> G
G3 --> G

%% Peminjaman
H --> H1[Pilih Siswa]
H1 --> H2[Pilih Buku]
H2 --> H3[Simpan Peminjaman]
H3 --> H

%% Pengembalian
I --> I1[Pilih Transaksi]
I1 --> I2[Hitung Denda]
I2 --> I3[Konfirmasi Pengembalian]
I3 --> I

%% Laporan
J --> J1[Pilih Filter]
J1 --> J2[Tampilkan Laporan]
J2 --> J3[Cetak Laporan]
J3 --> J

%% Upload
K --> K1[Input Data E-book]
K1 --> K2[Simpan]
K2 --> K

T --> U([Selesai])
```

---

# 3. User Flow Kepala Sekolah

```mermaid
flowchart TD

A([Start]) --> B[Halaman Login]
B --> C[Masukkan Username & Password]
C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Kepala Sekolah]

F --> G[Lihat KPI]
F --> H[Grafik Peminjaman]
F --> I[Analisis Minat Baca]
F --> J[Logout]

G --> F
H --> H1[Pilih Tahun]
H1 --> H2[Tampilkan Grafik]
H2 --> F

I --> I1[Lihat Pie Chart]
I --> I2[Lihat Top 10 Buku]
I --> I3[Lihat Statistik per Kelas]

I1 --> F
I2 --> F
I3 --> F

J --> K([Selesai])
```

---

# 4. User Flow Admin

```mermaid
flowchart TD

A([Start]) --> B[Halaman Login]
B --> C[Masukkan Username & Password]
C --> D{Login Berhasil?}

D -- Tidak --> E[Pesan Error]
E --> B

D -- Ya --> F[Dashboard Admin]

F --> G[Kelola User]
F --> H[Backup Data]
F --> I[Log Aktivitas]
F --> J[Pengaturan Sistem]
F --> K[Reset Data]
F --> L[Logout]

%% Kelola User
G --> G1[Tambah User]
G --> G2[Edit User]
G --> G3[Nonaktifkan User]

G1 --> G
G2 --> G
G3 --> G

%% Backup
H --> H1[Download JSON]
H1 --> H

%% Log
I --> I1[Lihat Aktivitas]
I1 --> I

%% Pengaturan
J --> J1[Ubah Konfigurasi]
J1 --> J2[Simpan Pengaturan]
J2 --> J

%% Reset
K --> K1[Konfirmasi RESET]
K1 --> K2[Reset Data]
K2 --> F

L --> M([Selesai])
```

---

## Keterangan

Diagram di atas menggambarkan alur navigasi utama setiap aktor dalam menggunakan Sistem Informasi Perpustakaan Perintis. Diagram ini disusun berdasarkan Use Case UC-001 sampai UC-017 dan menjadi penghubung antara Use Case Specification dengan Sequence Diagram pada tahap perancangan sistem.