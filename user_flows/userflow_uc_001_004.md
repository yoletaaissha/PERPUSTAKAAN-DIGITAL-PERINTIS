# userflow_uc_001.md — Login Pengguna

**Kode UC:** UC-001  
**Nama:** Login Pengguna  
**Aktor:** Semua Aktor (Siswa, Guru/Karyawan, Kepala Sekolah, Admin)  
**Halaman:** `/login`

---

## Pre-condition
- Pengguna belum terautentikasi (belum login)
- Data akun pengguna sudah tersimpan di localStorage

## Main Flow (Alur Utama)
1. Pengguna mengakses aplikasi (URL `/` atau `/login`)
2. Sistem menampilkan halaman login dengan form: field **Username** dan **Password**, serta tombol **"Masuk"**
3. Pengguna mengisi field Username dengan username yang terdaftar
4. Pengguna mengisi field Password
5. Pengguna menekan tombol **"Masuk"**
6. Sistem memvalidasi username dan password terhadap data di localStorage
7. Sistem membaca nilai `peran` dari akun yang cocok
8. Sistem menyimpan data sesi pengguna ke localStorage (key: `currentUser`)
9. Sistem melakukan redirect sesuai peran:
   - `siswa` → `/siswa/dashboard`
   - `guru` → `/guru/dashboard`
   - `kepala_sekolah` → `/kepsek/dashboard`
   - `admin` → `/admin/dashboard`
10. Halaman dashboard tampil dengan nama pengguna di topbar

## Alternative Flow
- **A1 — Username tidak ditemukan:** Sistem menampilkan pesan error di bawah form: "Username tidak ditemukan. Periksa kembali username Anda." Pengguna tidak diarahkan kemana-mana.
- **A2 — Password salah:** Sistem menampilkan pesan error: "Password salah. Silakan coba lagi." Field password dikosongkan otomatis.
- **A3 — Akun dinonaktifkan (isActive: false):** Sistem menampilkan pesan error: "Akun Anda telah dinonaktifkan. Hubungi Admin."
- **A4 — Pengguna sudah login (sesi aktif):** Jika pengguna mengakses `/login` saat sudah login, sistem langsung redirect ke dashboard sesuai perannya.

## Post-condition
- Data sesi tersimpan di localStorage key `currentUser` berisi: `{idUser, nama, peran, username}`
- Pengguna berada di halaman dashboard sesuai perannya

## Dummy Credentials untuk Demo
| Username | Password | Peran |
|---|---|---|
| `siswa01` | `siswa123` | siswa |
| `guru01` | `guru123` | guru |
| `kepsek01` | `kepsek123` | kepala_sekolah |
| `admin01` | `admin123` | admin |

---

# userflow_uc_002.md — Logout Pengguna

**Kode UC:** UC-002  
**Nama:** Logout Pengguna  
**Aktor:** Semua Aktor  
**Halaman:** Topbar (semua halaman authenticated)

---

## Pre-condition
- Pengguna sudah terautentikasi (sudah login)

## Main Flow
1. Pengguna menekan tombol **"Keluar"** atau nama pengguna di topbar kanan atas
2. Sistem menampilkan dropdown atau konfirmasi singkat: "Apakah Anda yakin ingin keluar?"
3. Pengguna memilih **"Ya, Keluar"**
4. Sistem menghapus data sesi dari localStorage (key: `currentUser`)
5. Sistem melakukan redirect ke `/login`
6. Halaman login ditampilkan dalam kondisi kosong (form username dan password kosong)

## Alternative Flow
- **A1 — Pengguna menekan "Batal":** Modal/dropdown ditutup, pengguna tetap di halaman yang sama

## Post-condition
- localStorage key `currentUser` sudah terhapus
- Pengguna berada di halaman `/login`
- Akses ke halaman protected akan di-redirect ke `/login`

---

# userflow_uc_003.md — Cari & Lihat Katalog Buku

**Kode UC:** UC-003  
**Nama:** Cari & Lihat Katalog Buku  
**Aktor:** Siswa (ACTOR-01)  
**Halaman:** `/siswa/katalog`, `/siswa/katalog/:idBuku`

---

## Pre-condition
- Siswa sudah login
- Data buku tersedia di localStorage

## Main Flow — Melihat Katalog
1. Siswa menekan menu **"Katalog Buku"** di sidebar
2. Sistem menampilkan halaman katalog dengan:
   - Baris filter di atas: dropdown **Kategori**, dropdown **Jenis** (fisik/digital/semua), input **Cari** (teks bebas)
   - Grid/tabel daftar buku (tampilan card: cover, judul, penulis, kategori, jenis, stok/keterangan)
3. Sistem menampilkan semua buku secara default (tidak ada filter aktif)

## Main Flow — Pencarian Buku
4. Siswa mengetik kata kunci di field **Cari** (mis. judul atau nama penulis)
5. Sistem memfilter daftar buku secara real-time (tanpa klik tombol) berdasarkan kata kunci yang cocok dengan field `judul` atau `penulis`
6. Daftar buku diperbarui langsung; jika tidak ada hasil → tampilkan Empty State "Tidak ada buku yang cocok dengan pencarian"

## Main Flow — Filter Kategori & Jenis
7. Siswa memilih nilai di dropdown **Kategori** (mis. "Sains")
8. Sistem memfilter daftar buku yang memiliki `kategori === "Sains"`
9. Siswa dapat mengombinasikan filter teks + kategori + jenis secara bersamaan

## Main Flow — Melihat Detail Buku
10. Siswa menekan salah satu card buku
11. Sistem menampilkan halaman `/siswa/katalog/:idBuku` dengan informasi lengkap:
    - Cover buku (gambar)
    - Judul, Penulis, Penerbit, Tahun Terbit
    - Kategori, Jenis (badge)
    - Stok tersedia (untuk fisik) atau keterangan "Tersedia untuk dibaca" (untuk digital)
    - Deskripsi buku
    - Rating rata-rata (bintang + angka)
    - Daftar review pengguna lain
    - Tombol **"Baca E-book"** (hanya muncul jika jenis = digital)
    - Tombol **"Beri Review"** (hanya muncul jika siswa memiliki riwayat pinjam buku ini yang sudah dikembalikan)

## Alternative Flow
- **A1 — Tidak ada buku dalam sistem:** Tampilkan Empty State dengan ikon buku dan teks "Koleksi perpustakaan masih kosong."
- **A2 — Stok buku fisik = 0:** Tampilkan badge "Stok Habis" berwarna merah pada card; pada halaman detail tampilkan keterangan "Buku sedang tidak tersedia untuk dipinjam"

## Post-condition
- Siswa dapat melihat detail buku yang ingin diakses
- Sistem tidak mengubah data apapun (read-only)

---

# userflow_uc_004.md — Akses E-book (PDF)

**Kode UC:** UC-004  
**Nama:** Akses E-book (Baca Buku Digital PDF)  
**Aktor:** Siswa (ACTOR-01)  
**Halaman:** `/siswa/ebook/:idBuku`

---

## Pre-condition
- Siswa sudah login
- Buku dengan `idBuku` yang diminta memiliki `jenis === "digital"` dan `pdfUrl` terisi

## Main Flow
1. Dari halaman detail buku, siswa menekan tombol **"Baca E-book"**
2. Sistem memeriksa bahwa `jenis` buku adalah "digital" dan `pdfUrl` tidak kosong
3. Sistem menampilkan halaman `/siswa/ebook/:idBuku` dengan:
   - Judul buku di bagian atas sebagai header
   - Komponen PDF viewer yang memuat file dari `pdfUrl`
   - Spinner loading ditampilkan saat PDF sedang dimuat
4. PDF berhasil dimuat dan ditampilkan di dalam viewer
5. Siswa dapat membaca e-book langsung di dalam aplikasi

## Alternative Flow
- **A1 — pdfUrl kosong atau tidak diisi:** Tampilkan pesan error: "File e-book belum tersedia. Hubungi petugas perpustakaan."
- **A2 — File PDF gagal dimuat (URL tidak valid/tidak dapat diakses):** Tampilkan pesan error: "Gagal memuat e-book. Periksa koneksi internet atau hubungi petugas." Sertakan link alternatif jika URL dapat dibuka di tab baru.
- **A3 — Buku bukan jenis digital:** Tombol "Baca E-book" tidak ditampilkan sama sekali di halaman detail buku; jika URL diakses langsung, redirect ke `/siswa/katalog`

## Post-condition
- Siswa dapat membaca e-book
- Tidak ada data transaksi yang dibuat (akses e-book tidak memerlukan peminjaman)
