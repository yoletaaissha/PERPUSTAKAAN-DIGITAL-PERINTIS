# userflow_uc_015.md — Lihat Grafik & Analisis (Kepala Sekolah)

**Kode UC:** UC-015  
**Nama:** Melihat Grafik Peminjaman & Analisis Minat Baca  
**Aktor:** Kepala Sekolah (ACTOR-03)  
**Halaman:** `/kepsek/dashboard`, `/kepsek/grafik`, `/kepsek/minat-baca`

---

## Pre-condition
- Kepala Sekolah sudah login
- Terdapat data transaksi peminjaman di sistem

## Main Flow — Dashboard Kepala Sekolah
1. Kepala Sekolah berhasil login, diarahkan ke `/kepsek/dashboard`
2. Sistem menampilkan kartu KPI (Key Performance Indicator) di bagian atas:
   - **Total Koleksi Buku**: jumlah total buku (fisik + digital)
   - **Total Peminjaman Bulan Ini**: jumlah transaksi di bulan berjalan
   - **Peminjaman Aktif**: jumlah transaksi dengan status `dipinjam`
   - **Total Denda Terkumpul**: total denda dari semua transaksi yang sudah dikembalikan
3. Di bawah KPI, tampilkan bar chart ringkasan: 6 bulan terakhir peminjaman

## Main Flow — Halaman Grafik Peminjaman
4. Kepala Sekolah menekan menu **"Grafik Peminjaman"**
5. Sistem menampilkan halaman `/kepsek/grafik` dengan:
   - **Filter Tahun** (dropdown pilih tahun, default: tahun berjalan)
   - **Bar Chart Bulanan**: sumbu X = bulan (Jan–Des), sumbu Y = jumlah peminjaman; batang berwarna `--color-primary`
   - **Line Chart per Kategori**: menampilkan tren setiap kategori buku selama 6 bulan terakhir (setiap kategori satu warna berbeda)
6. Kepala Sekolah memilih tahun yang berbeda dari dropdown
7. Sistem memfilter data dan memperbarui kedua chart secara otomatis

## Main Flow — Halaman Analisis Minat Baca
8. Kepala Sekolah menekan menu **"Analisis Minat Baca"**
9. Sistem menampilkan halaman `/kepsek/minat-baca` dengan:
   - **Pie Chart Kategori Terpopuler**: proporsi peminjaman per kategori buku
   - **Tabel Top 10 Buku Paling Sering Dipinjam**: kolom (Peringkat, Judul, Penulis, Kategori, Jumlah Dipinjam)
   - **Bar Chart Peminjaman per Kelas**: jumlah peminjaman yang dilakukan oleh siswa per kelas (mis. Kelas X, XI, XII)
10. Semua visualisasi bersifat **read-only** — tidak ada tombol aksi

## Alternative Flow
- **A1 — Tidak ada data transaksi:** Semua chart menampilkan Empty State dengan teks "Belum ada data peminjaman untuk divisualisasikan."
- **A2 — Data tidak cukup untuk chart tertentu:** Jika hanya ada data 1 bulan, line chart tetap ditampilkan dengan titik tunggal

## Post-condition
- Kepala Sekolah mendapatkan gambaran tren peminjaman dan minat baca siswa
- Tidak ada perubahan data (semua halaman read-only)

---

# userflow_uc_016.md — Kelola Akun Pengguna (Admin)

**Kode UC:** UC-016  
**Nama:** Mengelola Akun Pengguna Sistem  
**Aktor:** Admin (ACTOR-04)  
**Halaman:** `/admin/kelola-user`, `/admin/kelola-user/tambah`, `/admin/kelola-user/edit/:idUser`

---

## Pre-condition
- Admin sudah login

## Main Flow — Melihat Daftar User
1. Admin membuka menu **"Kelola User"**
2. Sistem menampilkan tabel semua pengguna dengan kolom: Nama, Username, Peran, Status (Aktif/Nonaktif), Tanggal Dibuat, Aksi (Edit | Nonaktifkan)
3. Di atas tabel terdapat filter: dropdown **Peran** (Semua | Siswa | Guru | Kepala Sekolah) dan input **Cari Nama/Username**
4. Admin dapat memfilter dan mencari pengguna

## Main Flow — Tambah User Baru
5. Admin menekan tombol **"+ Tambah User"**
6. Sistem menampilkan halaman form di `/admin/kelola-user/tambah`
7. Form berisi field:
   - **Nama Lengkap** (input teks, wajib)
   - **Username** (input teks, wajib, unik)
   - **Password** (input password, wajib, minimal 6 karakter)
   - **Peran** (dropdown: Siswa | Guru/Karyawan | Kepala Sekolah, wajib)
   - **Kelas** (input teks, hanya muncul jika Peran = Siswa, wajib jika Siswa)
   - **Jabatan** (input teks, hanya muncul jika Peran = Guru, opsional)
8. Admin mengisi form dan menekan **"Simpan User"**
9. Sistem memvalidasi field dan memeriksa keunikan username
10. Sistem membuat akun baru dengan `isActive: true`
11. Toast success: "Akun pengguna berhasil dibuat!"
12. Redirect ke `/admin/kelola-user`

## Main Flow — Nonaktifkan User
13. Admin menekan tombol **"Nonaktifkan"** pada baris pengguna
14. Modal konfirmasi: "Nonaktifkan akun [Nama Pengguna]? Pengguna tidak akan bisa login setelah ini."
15. Admin menekan **"Ya, Nonaktifkan"**
16. Sistem mengubah `isActive` menjadi `false`
17. Status di tabel berubah menjadi badge "Nonaktif" berwarna abu-abu
18. Toast: "Akun berhasil dinonaktifkan."

## Main Flow — Edit User
19. Admin menekan tombol **"Edit"** pada baris pengguna
20. Sistem menampilkan form edit dengan data pengguna pra-terisi
21. Admin mengubah data dan menekan **"Simpan Perubahan"**
22. Sistem menyimpan perubahan; toast success ditampilkan

## Alternative Flow
- **A1 — Username sudah digunakan:** Error: "Username sudah digunakan oleh pengguna lain. Gunakan username yang berbeda."
- **A2 — Admin mencoba menonaktifkan akun admin lain:** Sistem menampilkan peringatan: "Anda tidak dapat menonaktifkan akun Admin."
- **A3 — Admin mencoba menonaktifkan akunnya sendiri:** Sistem menampilkan peringatan: "Anda tidak dapat menonaktifkan akun Anda sendiri."

## Post-condition
- Data akun pengguna tersimpan di localStorage
- Pengguna yang dinonaktifkan tidak dapat login

---

# userflow_uc_017.md — Backup & Maintenance Sistem

**Kode UC:** UC-017  
**Nama:** Backup Data dan Maintenance Sistem  
**Aktor:** Admin (ACTOR-04)  
**Halaman:** `/admin/backup`, `/admin/log-aktivitas`, `/admin/data-sistem`

---

## Pre-condition
- Admin sudah login

## Main Flow — Backup Data
1. Admin membuka menu **"Backup & Maintenance"** → sub-menu **"Backup Data"**
2. Sistem menampilkan halaman `/admin/backup` dengan informasi:
   - Ringkasan data: jumlah buku, pengguna, transaksi peminjaman, transaksi pengembalian, review
   - Tanggal backup terakhir (dari localStorage)
   - Tombol **"Download Backup (JSON)"**
   - Tombol **"Reset ke Data Awal"** (danger, merah)
3. Admin menekan tombol **"Download Backup (JSON)"**
4. Sistem mengambil seluruh data dari localStorage (semua key data)
5. Sistem mengompilasi data menjadi satu objek JSON
6. Sistem memicu download file `backup_perpustakaan_[YYYY-MM-DD].json` ke perangkat Admin
7. Tanggal backup terakhir diperbarui di layar

## Main Flow — Reset ke Data Awal
8. Admin menekan tombol **"Reset ke Data Awal"**
9. Modal konfirmasi muncul dengan peringatan keras: "⚠️ PERINGATAN: Tindakan ini akan menghapus SEMUA data yang ada dan menggantinya dengan data dummy awal. Aksi ini TIDAK DAPAT dibatalkan."
10. Admin diminta mengetik ulang teks konfirmasi: `RESET` di field khusus
11. Tombol **"Ya, Reset Sekarang"** hanya aktif jika teks yang diketik === "RESET"
12. Admin menekan tombol konfirmasi
13. Sistem menghapus semua data dari localStorage dan mengganti dengan data dummy awal
14. Toast: "Sistem berhasil direset ke data awal."

## Main Flow — Log Aktivitas
15. Admin membuka sub-menu **"Log Aktivitas"**
16. Sistem menampilkan tabel log dengan kolom: Waktu, Pengguna, Aksi, Detail
17. Setiap aksi penting dalam sistem tercatat (login, tambah buku, catat peminjaman, proses pengembalian, tambah user)
18. Admin dapat memfilter log berdasarkan rentang tanggal atau nama pengguna

## Main Flow — Pengaturan Sistem
19. Admin membuka menu **"Pengaturan Sistem"**
20. Sistem menampilkan form konfigurasi:
    - **Nama Perpustakaan** (input teks)
    - **Denda per Hari** (input angka, dalam Rupiah)
    - **Batas Hari Peminjaman** (input angka, default 7)
    - **Maksimal Buku Dipinjam per Siswa** (input angka, default 3)
21. Admin mengubah nilai dan menekan **"Simpan Pengaturan"**
22. Sistem menyimpan konfigurasi ke localStorage
23. Toast: "Pengaturan sistem berhasil disimpan!"

## Alternative Flow
- **A1 — Teks konfirmasi reset tidak cocok:** Tombol "Ya, Reset" tetap disabled; tidak ada aksi
- **A2 — Tidak ada data untuk di-backup:** Sistem tetap memperbolehkan download, hasilnya adalah file JSON dengan objek kosong

## Post-condition
- Data backup tersimpan sebagai file JSON di perangkat Admin
- Konfigurasi sistem diperbarui dan digunakan oleh seluruh fitur
- Log aktivitas mencatat semua aksi admin
