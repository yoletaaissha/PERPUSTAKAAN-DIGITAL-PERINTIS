# userflow_uc_005.md — Lihat Notifikasi Pengembalian

**Kode UC:** UC-005  
**Nama:** Lihat Notifikasi Pengembalian Buku  
**Aktor:** Siswa (ACTOR-01)  
**Halaman:** `/siswa/dashboard`, `/siswa/notifikasi`

---

## Pre-condition
- Siswa sudah login
- Siswa memiliki setidaknya satu transaksi peminjaman yang masih berstatus `dipinjam`

## Main Flow — Notifikasi di Dashboard
1. Siswa berhasil login dan diarahkan ke `/siswa/dashboard`
2. Sistem memeriksa semua transaksi peminjaman aktif milik siswa tersebut
3. Untuk setiap transaksi, sistem menghitung selisih antara `batasKembali` dan tanggal hari ini
4. Jika selisih ≤ 2 hari, sistem membuat entri notifikasi otomatis (tipe: `jatuh_tempo`) dan menyimpannya di localStorage
5. Jika `batasKembali` sudah lewat (hari ini > batasKembali), sistem membuat notifikasi tipe `terlambat`
6. Dashboard menampilkan kartu notifikasi di bagian atas dengan warna kuning (jatuh tempo) atau merah (terlambat)
7. Badge angka pada ikon notifikasi di sidebar diperbarui sesuai jumlah notifikasi belum dibaca

## Main Flow — Halaman Notifikasi
8. Siswa menekan ikon notifikasi atau menu **"Notifikasi"** di sidebar
9. Sistem menampilkan halaman `/siswa/notifikasi` berisi daftar semua notifikasi
10. Setiap item notifikasi menampilkan:
    - Judul buku yang terkait
    - Pesan notifikasi (mis. "Buku 'Matematika Dasar' harus dikembalikan dalam 1 hari!")
    - Tanggal batas kembali
    - Status: belum dibaca (background lebih terang) atau sudah dibaca
11. Saat siswa melihat halaman notifikasi, semua notifikasi ditandai sebagai sudah dibaca (`isRead: true`)
12. Badge angka di sidebar berubah menjadi 0

## Alternative Flow
- **A1 — Tidak ada notifikasi:** Tampilkan Empty State: "Tidak ada notifikasi saat ini. Semua buku Anda dalam keadaan aman!"
- **A2 — Semua buku sudah dikembalikan:** Tidak ada notifikasi aktif; badge tidak ditampilkan

## Post-condition
- Notifikasi yang relevan tersimpan di localStorage
- Siswa mengetahui buku mana yang mendekati atau sudah melewati batas pengembalian

---

# userflow_uc_006.md — Beri Review & Rating Buku

**Kode UC:** UC-006  
**Nama:** Memberikan Ulasan (Review) dan Rating Buku  
**Aktor:** Siswa (ACTOR-01)  
**Halaman:** `/siswa/katalog/:idBuku`

---

## Pre-condition
- Siswa sudah login
- Siswa memiliki riwayat peminjaman buku tersebut dengan status `dikembalikan`
- Siswa belum pernah memberikan review pada buku yang sama (satu siswa satu review per buku)

## Main Flow
1. Siswa membuka halaman detail buku yang pernah ia pinjam dan sudah dikembalikan
2. Sistem memeriksa kondisi: apakah siswa memiliki transaksi `dikembalikan` untuk buku ini? Dan belum ada review dari siswa ini untuk buku ini?
3. Tombol **"Beri Review"** ditampilkan di halaman detail buku
4. Siswa menekan tombol **"Beri Review"**
5. Sistem menampilkan modal form review dengan:
   - Komponen rating bintang (1–5, interaktif, klik untuk memilih)
   - Field textarea untuk komentar (opsional, placeholder: "Tulis ulasan Anda tentang buku ini...")
   - Tombol **"Kirim Review"** dan **"Batal"**
6. Siswa memilih rating bintang (wajib)
7. Siswa menuliskan komentar (opsional)
8. Siswa menekan tombol **"Kirim Review"**
9. Sistem memvalidasi bahwa rating sudah dipilih (nilai 1–5)
10. Sistem menyimpan objek Review baru ke localStorage
11. Modal tertutup; tampilkan toast success: "Review Anda berhasil dikirim!"
12. Halaman detail buku diperbarui: review baru muncul di daftar ulasan; rating rata-rata buku diperbarui

## Alternative Flow
- **A1 — Rating belum dipilih:** Sistem menampilkan pesan error di bawah komponen bintang: "Silakan pilih rating bintang terlebih dahulu."
- **A2 — Siswa belum pernah meminjam buku ini:** Tombol "Beri Review" tidak ditampilkan sama sekali; halaman hanya menampilkan review dari pengguna lain
- **A3 — Siswa sudah pernah memberi review buku ini:** Tombol "Beri Review" diganti dengan tombol **"Edit Review"** (opsional, jika diimplementasikan)

## Post-condition
- Data review tersimpan di localStorage dengan `idReview` unik
- Rating rata-rata buku diperbarui secara otomatis
- Tombol "Beri Review" tidak lagi ditampilkan untuk kombinasi siswa + buku yang sama

---

# userflow_uc_007.md — Lihat Rekomendasi Buku

**Kode UC:** UC-007  
**Nama:** Melihat Rekomendasi Buku Sederhana  
**Aktor:** Siswa (ACTOR-01)  
**Halaman:** `/siswa/dashboard`

---

## Pre-condition
- Siswa sudah login
- Siswa memiliki setidaknya satu riwayat peminjaman

## Main Flow
1. Siswa membuka `/siswa/dashboard`
2. Sistem mengambil seluruh riwayat peminjaman siswa dari localStorage
3. Sistem menghitung frekuensi kategori buku yang pernah dipinjam (mis. "Sains" → 3 kali, "Fiksi" → 1 kali)
4. Sistem menentukan kategori paling sering dipinjam (dalam contoh: "Sains")
5. Sistem mengambil maksimal 4 buku dari kategori tersebut yang **belum pernah dipinjam** oleh siswa ini
6. Sistem menampilkan seksi "Rekomendasi untuk Anda" di dashboard berisi card-card buku rekomendasi (cover, judul, penulis)
7. Siswa dapat menekan card rekomendasi untuk menuju halaman detail buku

## Alternative Flow
- **A1 — Tidak ada riwayat peminjaman:** Seksi rekomendasi diganti dengan pesan: "Mulai pinjam buku pertama Anda untuk mendapatkan rekomendasi yang dipersonalisasi!"
- **A2 — Semua buku dari kategori favorit sudah pernah dipinjam:** Sistem menggunakan kategori favorit kedua; jika tidak ada → tampilkan buku dengan rating tertinggi

## Post-condition
- Siswa melihat rekomendasi buku yang relevan dengan minat baca mereka
- Tidak ada perubahan data

---

# userflow_uc_008.md — Input Data Buku Baru

**Kode UC:** UC-008  
**Nama:** Input Data Buku Baru  
**Aktor:** Guru/Karyawan (ACTOR-02)  
**Halaman:** `/guru/kelola-buku/tambah`

---

## Pre-condition
- Guru/Karyawan sudah login
- Guru/Karyawan berada di halaman daftar buku (`/guru/kelola-buku`)

## Main Flow
1. Guru/Karyawan menekan tombol **"+ Tambah Buku"** di halaman daftar buku
2. Sistem menampilkan halaman form tambah buku di `/guru/kelola-buku/tambah`
3. Form menampilkan field-field berikut:
   - **Judul Buku** (input teks, wajib)
   - **Penulis** (input teks, wajib)
   - **Penerbit** (input teks, opsional)
   - **Tahun Terbit** (input angka, opsional)
   - **Kategori** (dropdown: Fiksi | Non-Fiksi | Sains | Sejarah | Teknologi | Sastra | Referensi, wajib)
   - **Jenis Buku** (radio button: "Fisik" atau "Digital", wajib)
   - **Stok** (input angka, hanya muncul jika Jenis = Fisik, wajib jika Fisik)
   - **URL File PDF** (input teks, hanya muncul jika Jenis = Digital, wajib jika Digital)
   - **URL Gambar Sampul** (input teks, opsional)
   - **Deskripsi** (textarea, opsional)
4. Guru/Karyawan mengisi semua field yang wajib
5. Guru/Karyawan menekan tombol **"Simpan Buku"**
6. Sistem memvalidasi semua field wajib (tidak boleh kosong)
7. Sistem menghasilkan `idBuku` unik (format: "BK-XXX")
8. Sistem menyimpan data buku baru ke localStorage
9. Sistem menampilkan toast success: "Buku berhasil ditambahkan ke koleksi!"
10. Sistem mengarahkan pengguna kembali ke halaman `/guru/kelola-buku`
11. Buku baru muncul di tabel daftar buku

## Alternative Flow
- **A1 — Field wajib tidak diisi:** Sistem menampilkan pesan error merah di bawah setiap field yang kosong; tombol Simpan tidak memproses data; scroll halaman ke field error pertama
- **A2 — Stok diisi angka negatif:** Sistem menampilkan error: "Stok tidak boleh bernilai negatif."
- **A3 — Guru membatalkan:** Guru menekan tombol "Batal" → kembali ke `/guru/kelola-buku` tanpa menyimpan data

## Post-condition
- Data buku baru tersimpan di localStorage
- Buku langsung muncul di katalog siswa
