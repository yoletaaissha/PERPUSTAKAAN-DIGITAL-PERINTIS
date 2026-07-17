# Testing Documentation

# Sistem Informasi Perpustakaan Perintis

**Versi:** 1.0  
**Tanggal:** 2026

---

# Pendahuluan

Dokumen ini berisi hasil pengujian (Testing & Validation) terhadap fitur-fitur utama pada Sistem Informasi Perpustakaan Perintis.

Pengujian dilakukan untuk memastikan setiap fitur telah berjalan sesuai dengan User Flow, Use Case, dan UCIC yang telah disusun pada fase sebelumnya.

Metode pengujian yang digunakan adalah **Functional Testing** dengan pendekatan **Black Box Testing**, yaitu menguji fungsi sistem berdasarkan masukan (input) dan keluaran (output) tanpa melihat implementasi kode program.

---

# Daftar Test Case

| ID | Use Case | Skenario Pengujian | Hasil |
|----|----------|--------------------|-------|
| TC-001 | UC-001 Login Pengguna | Login menggunakan username dan password yang valid | ✅ PASS |
| TC-002 | UC-001 Login Pengguna | Login menggunakan password yang salah | ✅ PASS |
| TC-003 | UC-003 Cari Katalog Buku | Mencari buku berdasarkan judul | ✅ PASS |
| TC-004 | UC-004 Akses E-book | Membuka file PDF e-book | ✅ PASS |
| TC-005 | UC-005 Notifikasi Pengembalian | Menampilkan notifikasi buku yang mendekati jatuh tempo | ✅ PASS |
| TC-006 | UC-006 Review Buku | Memberikan rating dan ulasan setelah buku dikembalikan | ✅ PASS |
| TC-007 | UC-008 Tambah Buku | Guru menambahkan data buku baru | ✅ PASS |
| TC-008 | UC-009 Edit Buku | Guru mengubah informasi buku | ✅ PASS |
| TC-009 | UC-010 Hapus Buku | Guru menghapus data buku | ✅ PASS |
| TC-010 | UC-011 Peminjaman Buku | Guru mencatat transaksi peminjaman | ✅ PASS |
| TC-011 | UC-012 Pengembalian Buku | Guru memproses pengembalian dan menghitung denda | ✅ PASS |
| TC-012 | UC-013 Generate Laporan | Guru menghasilkan laporan peminjaman | ✅ PASS |
| TC-013 | UC-014 Upload E-book | Guru mengunggah file digital buku | ✅ PASS |
| TC-014 | UC-015 Grafik & Analisis | Kepala sekolah melihat grafik statistik perpustakaan | ✅ PASS |
| TC-015 | UC-016 Kelola User | Admin menambah, mengubah, dan menghapus akun pengguna | ✅ PASS |
| TC-016 | UC-017 Backup Sistem | Admin melakukan backup data | ✅ PASS |
| TC-017 | UC-017 Log Aktivitas | Admin melihat riwayat aktivitas sistem | ✅ PASS |

---

# Ringkasan Pengujian

| Jenis Pengujian | Status |
|-----------------|--------|
| Functional Testing | ✅ Lulus |
| Navigation Testing | ✅ Lulus |
| Form Validation | ✅ Lulus |
| Role Based Access | ✅ Lulus |
| CRUD Testing | ✅ Lulus |
| localStorage Testing | ✅ Lulus |

---

# Hasil Pengujian

Berdasarkan hasil pengujian, seluruh fitur utama pada Sistem Informasi Perpustakaan Perintis dapat berjalan sesuai dengan spesifikasi kebutuhan yang telah didefinisikan pada dokumen Software Requirements Specification (SRS), User Flow, Sequence Diagram, Class Diagram, serta Use Case Integration Contract (UCIC).

Tidak ditemukan kegagalan fungsi pada proses autentikasi, pengelolaan buku, transaksi peminjaman dan pengembalian, pengelolaan pengguna, maupun penyajian laporan.

---

# Kesimpulan

Seluruh fitur utama sistem berhasil diimplementasikan dan telah memenuhi kebutuhan fungsional sesuai dengan dokumen perancangan.

Dengan demikian, prototype Sistem Informasi Perpustakaan Perintis dinyatakan **layak digunakan sebagai implementasi project mata kuliah**.