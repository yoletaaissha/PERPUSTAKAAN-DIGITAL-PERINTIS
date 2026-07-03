# userflow_uc_009.md — Edit Data Buku

**Kode UC:** UC-009  
**Nama:** Edit Data Buku  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/kelola-buku/edit/:idBuku`

---

## Pre-condition
- Guru/Karyawan sudah login
- Buku dengan `idBuku` yang dimaksud sudah ada di sistem

## Main Flow
1. Guru/Karyawan menekan tombol **"Edit"** (ikon pensil) pada baris buku di tabel daftar buku
2. Sistem menampilkan halaman form edit di `/guru/kelola-buku/edit/:idBuku`
3. Form ditampilkan dengan data buku yang sudah ada **pra-terisi** di semua field
4. Guru/Karyawan mengubah field yang diinginkan
5. Guru/Karyawan menekan tombol **"Simpan Perubahan"**
6. Sistem memvalidasi field wajib (sama seperti UC-008)
7. Sistem memperbarui data buku di localStorage
8. Toast success: "Data buku berhasil diperbarui!"
9. Sistem redirect ke `/guru/kelola-buku`

## Alternative Flow
- **A1 — Validasi gagal:** Sama seperti UC-008 A1
- **A2 — Buku sedang dipinjam & guru mengubah stok:** Sistem menampilkan peringatan: "Buku ini sedang dalam status dipinjam. Perubahan stok akan berlaku setelah buku dikembalikan." Guru tetap dapat menyimpan perubahan.
- **A3 — Guru membatalkan:** Kembali ke `/guru/kelola-buku` tanpa menyimpan perubahan

## Post-condition
- Data buku yang diperbarui tersimpan di localStorage

---

# userflow_uc_010.md — Hapus Data Buku

**Kode UC:** UC-010  
**Nama:** Hapus Data Buku  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/kelola-buku`

---

## Pre-condition
- Guru/Karyawan sudah login
- Buku yang akan dihapus ada di sistem

## Main Flow
1. Guru/Karyawan menekan tombol **"Hapus"** (ikon tempat sampah) pada baris buku di tabel
2. Sistem menampilkan modal konfirmasi: "Apakah Anda yakin ingin menghapus buku '[Judul Buku]'? Aksi ini tidak dapat dibatalkan."
3. Modal menampilkan dua tombol: **"Batal"** dan **"Ya, Hapus"** (warna merah)
4. Guru/Karyawan menekan **"Ya, Hapus"**
5. Sistem menghapus data buku dari localStorage
6. Modal tertutup; toast success: "Buku berhasil dihapus dari koleksi."
7. Baris buku hilang dari tabel

## Alternative Flow
- **A1 — Buku masih dalam status dipinjam:** Sistem menampilkan modal peringatan yang berbeda: "Buku ini tidak dapat dihapus karena sedang dipinjam oleh siswa. Selesaikan proses pengembalian terlebih dahulu." Tombol hapus tidak diproses.
- **A2 — Guru menekan "Batal" di modal konfirmasi:** Modal ditutup, tidak ada data yang dihapus

## Post-condition
- Data buku terhapus dari localStorage
- Tabel diperbarui tanpa buku tersebut

---

# userflow_uc_011.md — Catat Peminjaman Buku Baru

**Kode UC:** UC-011  
**Nama:** Mencatat Transaksi Peminjaman Buku Baru  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/peminjaman/baru`

---

## Pre-condition
- Guru/Karyawan sudah login
- Siswa yang akan meminjam sudah terdaftar di sistem
- Buku fisik yang akan dipinjam memiliki stok > 0
- Siswa belum meminjam 3 buku secara bersamaan (BR-01)

## Main Flow
1. Guru/Karyawan membuka menu **"Kelola Peminjaman"** → menekan tombol **"+ Catat Peminjaman Baru"**
2. Sistem menampilkan halaman form di `/guru/peminjaman/baru`
3. Form menampilkan field:
   - **Pilih Siswa** (dropdown/searchable select, daftar dari data siswa aktif, wajib)
   - **Pilih Buku** (dropdown/searchable select, hanya menampilkan buku dengan `jenis === "fisik"` dan `stok > 0`, wajib)
   - **Tanggal Pinjam** (date picker, default: hari ini, wajib)
   - **Batas Kembali** (date picker, otomatis terisi = tanggalPinjam + 7 hari, dapat diubah manual)
4. Guru/Karyawan memilih siswa dari dropdown
5. Sistem memeriksa: apakah siswa ini sudah meminjam 3 buku? Jika ya, tampilkan peringatan dan blokir pemilihan buku
6. Guru/Karyawan memilih buku dari dropdown
7. Guru/Karyawan memverifikasi tanggal pinjam dan batas kembali
8. Guru/Karyawan menekan tombol **"Simpan Peminjaman"**
9. Sistem memvalidasi semua field
10. Sistem memeriksa kembali stok buku: stok > 0?
11. Sistem membuat objek Peminjaman baru dengan status `dipinjam`
12. Sistem mengurangi `stok` buku sebesar 1
13. Sistem menyimpan data ke localStorage
14. Toast success: "Peminjaman berhasil dicatat!"
15. Sistem redirect ke `/guru/peminjaman`

## Alternative Flow
- **A1 — Stok buku habis saat diproses (race condition):** Pesan error: "Maaf, stok buku ini baru saja habis. Silakan pilih buku lain."
- **A2 — Siswa sudah meminjam 3 buku:** Sistem menampilkan peringatan merah di bawah dropdown siswa: "Siswa ini sudah mencapai batas maksimal peminjaman (3 buku). Minta siswa mengembalikan buku terlebih dahulu."
- **A3 — Field belum diisi:** Validasi standard, pesan error per field

## Post-condition
- Transaksi peminjaman tersimpan di localStorage dengan status `dipinjam`
- Stok buku berkurang 1
- Notifikasi jatuh tempo akan otomatis dibuat oleh sistem saat mendekati `batasKembali`

---

# userflow_uc_012.md — Proses Pengembalian Buku

**Kode UC:** UC-012  
**Nama:** Memproses Pengembalian Buku  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/pengembalian`, `/guru/pengembalian/proses/:idPinjam`

---

## Pre-condition
- Guru/Karyawan sudah login
- Terdapat transaksi peminjaman dengan status `dipinjam` atau `terlambat`

## Main Flow
1. Guru/Karyawan membuka menu **"Kelola Pengembalian"**
2. Sistem menampilkan tabel semua transaksi yang belum dikembalikan (status `dipinjam` atau `terlambat`)
3. Setiap baris tabel menampilkan: nama siswa, judul buku, tanggal pinjam, batas kembali, status, dan tombol **"Proses Pengembalian"**
4. Guru/Karyawan menekan tombol **"Proses Pengembalian"** pada baris yang sesuai
5. Sistem menampilkan halaman konfirmasi di `/guru/pengembalian/proses/:idPinjam`
6. Halaman menampilkan ringkasan transaksi:
   - Nama siswa, judul buku, tanggal pinjam, batas kembali
   - **Tanggal Kembali Aktual**: date picker, default hari ini
   - Sistem menghitung otomatis: jumlah hari terlambat = max(0, (tanggalKembaliAktual - batasKembali) / 1 hari)
   - **Denda**: jumlahHariTerlambat × Rp 500, ditampilkan dalam format Rupiah (mis. "Rp 1.500")
   - Jika tidak terlambat: tampilkan "Tidak ada denda" dengan warna hijau
   - Field **Catatan** (opsional, textarea)
7. Guru/Karyawan memverifikasi tanggal kembali aktual (dapat diubah)
8. Sistem memperbarui kalkulasi denda secara real-time saat tanggal kembali aktual diubah
9. Guru/Karyawan menekan tombol **"Konfirmasi Pengembalian"**
10. Sistem membuat objek Pengembalian baru di localStorage
11. Sistem memperbarui status transaksi Peminjaman menjadi `dikembalikan`
12. Sistem menambah kembali stok buku sebesar 1
13. Toast success: "Pengembalian berhasil diproses!"
14. Sistem redirect ke `/guru/pengembalian`

## Alternative Flow
- **A1 — Tanggal kembali aktual lebih awal dari tanggal pinjam:** Sistem menampilkan error: "Tanggal pengembalian tidak boleh lebih awal dari tanggal peminjaman."
- **A2 — Guru membatalkan:** Kembali ke `/guru/pengembalian` tanpa memproses apapun

## Post-condition
- Transaksi pengembalian tersimpan di localStorage
- Status peminjaman diperbarui menjadi `dikembalikan`
- Stok buku bertambah 1
- Denda tercatat (jika ada)

---

# userflow_uc_013.md — Generate Laporan Peminjaman

**Kode UC:** UC-013  
**Nama:** Generate Laporan Peminjaman  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/laporan`

---

## Pre-condition
- Guru/Karyawan sudah login

## Main Flow
1. Guru/Karyawan membuka menu **"Generate Laporan"**
2. Sistem menampilkan halaman laporan dengan filter di bagian atas:
   - **Tanggal Mulai** (date picker)
   - **Tanggal Akhir** (date picker)
   - **Status** (dropdown: Semua | Dipinjam | Dikembalikan | Terlambat)
   - Tombol **"Tampilkan Laporan"**
3. Guru memilih rentang tanggal dan filter status yang diinginkan
4. Guru menekan tombol **"Tampilkan Laporan"**
5. Sistem memfilter data transaksi peminjaman dari localStorage sesuai parameter
6. Sistem menampilkan tabel laporan berisi kolom: No, Nama Siswa, Kelas, Judul Buku, Tanggal Pinjam, Batas Kembali, Tanggal Kembali, Status, Denda
7. Di bawah tabel: ringkasan statistik (total transaksi, total denda terkumpul)
8. Guru menekan tombol **"Cetak Laporan"**
9. Sistem memicu `window.print()` — browser menampilkan dialog print
10. Halaman yang dicetak hanya menampilkan tabel laporan (sidebar dan tombol disembunyikan via CSS `@media print`)

## Alternative Flow
- **A1 — Tidak ada data dalam rentang tanggal yang dipilih:** Tampilkan Empty State: "Tidak ada transaksi dalam periode yang dipilih."
- **A2 — Tanggal mulai lebih besar dari tanggal akhir:** Sistem menampilkan error: "Tanggal mulai tidak boleh melebihi tanggal akhir."

## Post-condition
- Laporan ditampilkan di layar
- Guru dapat mencetak laporan melalui dialog print browser

---

# userflow_uc_014.md — Upload Materi Digital (E-book)

**Kode UC:** UC-014  
**Nama:** Upload Materi Digital (E-book PDF)  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/upload-digital`

---

## Pre-condition
- Guru/Karyawan sudah login
- File e-book dalam format PDF tersedia

## Main Flow
1. Guru/Karyawan membuka menu **"Upload Digital"**
2. Sistem menampilkan form upload dengan field:
   - **Judul E-book** (input teks, wajib)
   - **Penulis** (input teks, wajib)
   - **Kategori** (dropdown, wajib)
   - **Deskripsi** (textarea, opsional)
   - **URL Gambar Sampul** (input teks, opsional)
   - **URL File PDF** (input teks, wajib) — *catatan: karena ini prototype, tidak ada upload file nyata; gunakan URL publik PDF*
3. Guru mengisi semua field
4. Guru menekan tombol **"Upload & Simpan"**
5. Sistem memvalidasi field wajib
6. Sistem membuat entri buku baru dengan `jenis === "digital"` di localStorage
7. Toast success: "E-book berhasil ditambahkan ke koleksi digital!"
8. Sistem redirect ke `/guru/kelola-buku`

## Alternative Flow
- **A1 — Field wajib kosong:** Pesan validasi standard per field
- **A2 — URL PDF tidak valid format:** Sistem menampilkan peringatan: "URL PDF tampaknya tidak valid. Pastikan URL diawali https:// dan mengarah ke file PDF."

## Post-condition
- E-book tersimpan sebagai entri buku baru dengan jenis "digital"
- Siswa langsung dapat mengakses e-book dari katalog
