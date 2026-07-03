# Implementation Notes

## Arsitektur

- **State Management**: React Context API untuk auth (`AuthContext`), global toast (`ToastContext`). Semua data bisnis disimpan di localStorage.
- **Routing**: React Router v6 dengan nested routes per role. `ProtectedRoute` component memeriksa role sebelum render.
- **Layout**: `RoleLayout` component dengan collapsible sidebar (240px → 64px) dan mobile drawer (<768px). Topbar dengan breadcrumb dan notification bell.

## Keputusan Implementasi

### Umum

1. **Data Persistence**: Semua data disimpan di localStorage dengan prefix `perpustakaan_`. Tidak ada real backend.
2. **Session**: Session disimpan di `localStorage` key `perpustakaan_session` sebagai JSON `{id, nama, username, peran, extra}`.
3. **Seed Data**: Hanya dijalankan sekali saat pertama kali aplikasi dimuat. Cek `existingSiswa.length > 0` untuk skip.
4. **Role Route Protection**: `ProtectedRoute` menggunakan whitelist `allowedRoles` array. Jika role tidak sesuai, redirect ke dashboard masing-masing.

### Login (UC-001)

- Login memeriksa 2 sumber: tabel `siswa` (untuk akun siswa) dan tabel `user` (untuk guru/kepsek/admin).
- Error messages dibedakan: "Username tidak ditemukan" (jika username tidak ada), "Password salah" (jika password salah), "Akun dinonaktifkan" (jika `isActive === false`).

### Katalog & E-book (UC-003, UC-004)

- Pencarian menggunakan `String.includes()` case-insensitive pada judul dan penulis.
- Filter kategori menggunakan dropdown, filter jenis (fisik/digital) juga dropdown.
- E-book menggunakan `<iframe>` untuk menampilkan PDF. Tidak ada library `react-pdf`. Fallback ke error state jika URL tidak bisa dimuat.
- Cover gambar menggunakan placeholder `placehold.co` dengan fallback ke "No Cover" jika gagal load.

### Notifikasi (UC-005)

- Notifikasi digenerate otomatis saat halaman NotifikasiPage dimuat.
- Logika: Pinjaman dengan sisa ≤ 2 hari → `jatuh_tempo`, pinjaman lewat → `terlambat`.
- Hanya membuat notifikasi baru jika belum ada notifikasi dengan tipe yang sama untuk pinjaman tersebut.
- Semua notifikasi ditandai `isRead: true` saat halaman dimuat.
- Jumlah notifikasi unread ditampilkan sebagai badge di sidebar (ikon Bell) dan topbar.

### Review (UC-006)

- Review hanya bisa diberikan oleh siswa yang sudah mengembalikan buku tersebut (`status === 'dikembalikan'`).
- Satu siswa hanya bisa memberi satu review per buku.
- Rating menggunakan komponen `RatingInput` (1-5 bintang) + textarea untuk komentar.
- Average rating ditampilkan menggunakan `RatingDisplay`.

### Rekomendasi (UC-007)

- Algoritma: 1) Cari kategori yang paling sering dipinjam siswa → tampilkan buku dari kategori tersebut yang belum pernah dipinjam. 2) Jika kurang dari 4, tambah dari kategori kedua terpopuler. 3) Jika masih kurang, tambah dari buku dengan rating tertinggi yang belum dibaca.
- Maksimal 4 rekomendasi ditampilkan di dashboard siswa.

### Kelola Buku (UC-008, UC-009, UC-010)

- Form tambah/edit buku dengan radio button untuk jenis fisik/digital.
- Conditional fields: Stok untuk fisik, URL PDF untuk digital.
- Validasi: Judul & penulis wajib, stok ≥ 0, URL PDF wajib untuk digital.
- Peringatan saat edit buku yang sedang dipinjam.
- Hapus buku diblokir jika buku sedang dipinjam.

### Peminjaman (UC-011)

- Maksimal 3 buku per siswa (dicek sebelum simpan).
- Stock otomatis berkurang 1 saat peminjaman dicatat.
- Tanggal pinjam default hari ini, batas kembali default hari ini + 7 hari.

### Pengembalian (UC-012)

- Denda dihitung real-time saat tanggal kembali diubah: `terlambatDays × dendaPerHari`.
- Konfigurasi denda bisa diubah admin di halaman Pengaturan Sistem.
- Stock buku otomatis bertambah 1 setelah pengembalian.

### Laporan (UC-013)

- Filter: rentang tanggal + status peminjaman.
- Tabel dengan nomor urut, data siswa, buku, tanggal, status, denda.
- Tombol Cetak menggunakan `window.print()` dengan CSS `print:hidden` pada sidebar.
- Total transaksi dan total denda ditampilkan di bawah tabel.

### Grafik (UC-015)

- Menggunakan Recharts library.
- Bar Chart: peminjaman per bulan dalam tahun yang dipilih.
- Line Chart: tren per kategori dalam 6 bulan terakhir.
- Pie Chart (Minat Baca): distribusi peminjaman per kategori.
- Insight: teks dinamis berdasarkan kategori terpopuler dan paling sedikit.

### Kelola User (UC-016)

- Menampilkan gabungan data dari tabel `user` (guru/kepsek/admin) dan `siswa`.
- Tidak bisa menghapus atau menonaktifkan akun sendiri.
- Konfirmasi sebelum menonaktifkan akun.
- Form tambah/edit user menampilkan field sesuai role.

### Backup (UC-017)

- Export: semua localStorage keys diexport ke file JSON dan di-download.
- Import: upload file JSON → data ditimpa.
- Reset: semua localStorage dibersihkan, session dihapus, halaman di-reload.
- Konfirmasi reset: harus mengetik "RESET" (huruf besar) di ConfirmDialog.

## Asumsi & Trade-offs

1. **Tidak ada real backend**: Semua data di localStorage, tidak ada auth server atau API.
2. **Password disimpan plaintext**: Untuk kebutuhan demo, password tidak di-hash.
3. **CSS framework**: Tidak menggunakan komponen library seperti daisyUI atau Headless UI. Semua komponen custom dengan Tailwind.
4. **PDF Viewer**: Menggunakan `<iframe>` karena `react-pdf` tidak terinstall dan menambah bundle size signifikan.
5. **Tidak ada pagination server-side**: Pagination dilakukan di client-side karena semua data di localStorage.
6. **Notifikasi auto-generate on view**: Notifikasi di-generate saat halaman Notifikasi dibuka, bukan via background job atau interval.
7. **Review tidak bisa diedit**: Setelah review dikirim, tidak bisa diubah/dihapus oleh siswa.
8. **Denda per hari default**: Rp500/hari, bisa diubah admin.
9. **Max buku per siswa**: 3, bisa diubah admin.

## Struktur Direktori

```
src/
├── App.jsx                    # Root app dengan routing
├── index.css                  # Tailwind + custom styles
├── main.jsx                   # Entry point
├── components/
│   ├── common/                # ProtectedRoute, Sidebar, Topbar
│   ├── layouts/               # RoleLayout
│   └── ui/                    # Button, Input, Card, Badge, Modal, dll
├── contexts/                  # AuthContext, ToastContext
├── lib/                       # utils.js, validators.js
├── pages/
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProfilePage.jsx
│   ├── siswa/                 # 7 pages
│   ├── guru/                  # 10 pages
│   ├── kepsek/                # 5 pages
│   └── admin/                 # 7 pages
└── services/
    ├── storage.js             # CRUD localStorage
    └── seedData.js            # Initial dummy data
```

## Total Source Files

- 58 file di direktori `src/`
- 32 halaman (pages)
- 12 komponen UI
- 3 komponen umum/layout
- 2 contexts
- 2 services
- 2 lib utilities
- App.jsx + main.jsx + index.css
