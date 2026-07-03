# design_system.md — Design System
# Sistem Informasi Perpustakaan Sekolah Berbasis Hybrid

**Versi:** 1.0  
**Tanggal:** 2026

---

## 1. Filosofi Desain

Antarmuka sistem ini harus terasa **bersih, mudah dibaca, dan profesional** — mencerminkan lingkungan akademik sekolah. Gunakan warna yang tenang dan tipografi yang jelas. Hindari elemen visual yang terlalu ramai. Prioritaskan keterbacaan data (tabel, daftar) dan kemudahan navigasi bagi pengguna yang tidak terbiasa dengan teknologi (guru/karyawan yang bertugas bergantian).

---

## 2. Color Palette

| Nama | Variabel CSS | Kode HEX | Penggunaan |
|---|---|---|---|
| Primary | `--color-primary` | `#1D4ED8` | Tombol utama, link aktif, highlight |
| Primary Dark | `--color-primary-dark` | `#1E3A8A` | Hover state tombol primary |
| Primary Light | `--color-primary-light` | `#DBEAFE` | Background badge, highlighted row |
| Secondary | `--color-secondary` | `#0891B2` | Elemen sekunder, tombol kedua |
| Success | `--color-success` | `#16A34A` | Status "dikembalikan", stok tersedia, notifikasi sukses |
| Warning | `--color-warning` | `#D97706` | Status "jatuh tempo dekat", stok menipis |
| Danger | `--color-danger` | `#DC2626` | Status "terlambat", stok kosong, error, hapus |
| Neutral 50 | `--color-neutral-50` | `#F8FAFC` | Background halaman |
| Neutral 100 | `--color-neutral-100` | `#F1F5F9` | Background sidebar |
| Neutral 200 | `--color-neutral-200` | `#E2E8F0` | Border, divider |
| Neutral 500 | `--color-neutral-500` | `#64748B` | Teks placeholder, label sekunder |
| Neutral 700 | `--color-neutral-700` | `#334155` | Teks body utama |
| Neutral 900 | `--color-neutral-900` | `#0F172A` | Heading, teks penting |
| White | `--color-white` | `#FFFFFF` | Background card, modal, topbar |

### Warna Status Peminjaman
| Status | Warna Background | Warna Teks |
|---|---|---|
| `dipinjam` | `#DBEAFE` (blue-100) | `#1D4ED8` (blue-700) |
| `dikembalikan` | `#DCFCE7` (green-100) | `#16A34A` (green-700) |
| `terlambat` | `#FEE2E2` (red-100) | `#DC2626` (red-700) |

---

## 3. Tipografi

| Elemen | Font Family | Ukuran | Font Weight | Keterangan |
|---|---|---|---|---|
| Font Global | `Inter, sans-serif` | — | — | Semua teks menggunakan Inter |
| H1 (Page Title) | Inter | 28px / 1.75rem | 700 (Bold) | Judul halaman utama |
| H2 (Section Title) | Inter | 22px / 1.375rem | 600 (SemiBold) | Judul seksi/bagian |
| H3 (Card Title) | Inter | 18px / 1.125rem | 600 (SemiBold) | Judul card atau tabel |
| H4 (Sub-section) | Inter | 16px / 1rem | 600 (SemiBold) | Sub-judul dalam konten |
| Body Regular | Inter | 14px / 0.875rem | 400 (Regular) | Teks konten utama |
| Body Small | Inter | 12px / 0.75rem | 400 (Regular) | Label, keterangan tambahan |
| Label Form | Inter | 14px / 0.875rem | 500 (Medium) | Label input form |
| Data Tabel | Inter | 13px / 0.8125rem | 400 (Regular) | Isi sel tabel |
| Heading Tabel | Inter | 12px / 0.75rem | 600 (SemiBold) | Header kolom tabel, uppercase |

---

## 4. Spacing & Layout

| Token | Nilai | Penggunaan |
|---|---|---|
| Spacing XS | 4px | Jarak elemen dalam satu komponen |
| Spacing SM | 8px | Jarak antar label dan input |
| Spacing MD | 16px | Padding konten dalam card |
| Spacing LG | 24px | Padding halaman, jarak antar seksi |
| Spacing XL | 32px | Jarak antar card besar |
| Border Radius SM | 6px | Input, badge, chip |
| Border Radius MD | 8px | Card, modal |
| Border Radius LG | 12px | Card besar, panel |
| Shadow SM | `0 1px 3px rgba(0,0,0,0.1)` | Card standar |
| Shadow MD | `0 4px 6px rgba(0,0,0,0.1)` | Modal, dropdown |
| Shadow LG | `0 10px 15px rgba(0,0,0,0.1)` | Modal besar |

---

## 5. Komponen UI

### 5.1 Button

| Varian | Background | Teks | Border | Penggunaan |
|---|---|---|---|---|
| Primary | `--color-primary` | White | Tidak ada | Aksi utama (Simpan, Proses, Pinjam) |
| Secondary | `--color-secondary` | White | Tidak ada | Aksi sekunder (Lihat Detail, Unduh) |
| Outline | Transparan | `--color-primary` | 1px `--color-primary` | Aksi alternatif (Batal, Kembali) |
| Danger | `--color-danger` | White | Tidak ada | Aksi berbahaya (Hapus) |
| Ghost | Transparan | `--color-neutral-700` | Tidak ada | Aksi ringan dalam tabel (Edit) |

**Aturan Button:**
- Semua button menggunakan `border-radius: 6px`
- Padding: `8px 16px` (ukuran default), `6px 12px` (ukuran small untuk dalam tabel)
- Hover: Gelap 10% dari warna asli
- Disabled state: opacity 0.5, cursor not-allowed
- Loading state: tampilkan spinner putih berputar di dalam button; text diganti "Memproses..."

### 5.2 Input Form

- Border: `1px solid --color-neutral-200`
- Border saat fokus: `2px solid --color-primary`
- Border saat error: `1px solid --color-danger`
- Border radius: `6px`
- Background: `white`
- Padding: `10px 12px`
- Font size: `14px`
- Placeholder text: warna `--color-neutral-500`
- Pesan error muncul di bawah input dengan warna `--color-danger`, font size `12px`
- Field wajib ditandai dengan asterisk merah (*) di sebelah label

### 5.3 Card

- Background: `white`
- Border: `1px solid --color-neutral-200`
- Border radius: `8px`
- Shadow: `shadow-sm`
- Padding: `16px 20px`
- Header card (jika ada): font H3, border-bottom `1px solid --color-neutral-200`, padding-bottom `12px`

### 5.4 Tabel Data

- Header kolom: Background `--color-neutral-100`, teks uppercase, font size 12px, semibold, warna `--color-neutral-500`
- Baris data: background white; hover background `--color-neutral-50`
- Baris bergantian (striped): opsional, baris genap pakai `--color-neutral-50`
- Border: border bawah setiap baris `1px solid --color-neutral-200`
- Sel kosong: tampilkan tanda `-` (strip)
- Kolom aksi (Edit/Hapus/Proses): selalu di kolom paling kanan, rata kanan
- Tabel wajib memiliki fitur pagination jika data > 10 baris

### 5.5 Badge / Chip Status

- Tampilan: Teks pendek dengan background berwarna dan border radius `9999px` (pill shape)
- Padding: `2px 8px`
- Font size: `12px`, semibold

### 5.6 Modal / Dialog

- Overlay background: `rgba(0, 0, 0, 0.5)`
- Modal box: background white, border-radius `12px`, shadow LG
- Lebar: 480px default, 600px untuk form besar
- Header modal: judul (H3) di kiri, tombol close (×) di kanan
- Footer modal: tombol aksi di kanan (Batal kiri, Konfirmasi/Simpan kanan)
- Animasi: fade-in + scale dari 95% ke 100%

### 5.7 Komponen Rating Bintang

- Tampilkan 5 bintang (★)
- Bintang terisi: warna `#F59E0B` (kuning/amber)
- Bintang kosong: warna `--color-neutral-200`
- Klik bintang saat input review: interaktif, hover efek
- Tampilan rata-rata: tampilkan angka di sebelah bintang (misal: ★★★★☆ 4.0)

### 5.8 PDF Viewer

- Gunakan komponen `<iframe>` atau library `react-pdf`
- Ukuran: lebar penuh area konten, tinggi minimal `600px`
- Tampilkan loader saat PDF sedang dimuat
- Jika PDF gagal dimuat, tampilkan pesan error dengan link alternatif

---

## 6. State Management Visual

### 6.1 Empty State (Data Kosong)
- Tampilkan ilustrasi ikon besar (SVG) di tengah area konten
- Teks judul: "Belum Ada Data" (H3, `--color-neutral-700`)
- Teks deskripsi: kalimat kontekstual sesuai halaman, font size 14px, `--color-neutral-500`
- Contoh: Halaman Katalog kosong → "Belum ada buku dalam koleksi. Silakan tambahkan buku baru."
- Jika relevan, sertakan tombol CTA (misal: tombol "Tambah Buku Pertama")

### 6.2 Loading State (Sedang Memuat)
- Tampilkan skeleton loader (kotak abu-abu beranimasi pulse) sebagai placeholder konten yang sedang dimuat
- Untuk tabel: tampilkan 5 baris skeleton dengan kolom-kolom abu-abu
- Untuk card: tampilkan placeholder card dengan baris abu-abu
- Jangan tampilkan konten lama saat memuat ulang (ganti dengan skeleton)

### 6.3 Error State (Terjadi Kesalahan)
- Tampilkan pesan error dalam kotak merah (background `#FEE2E2`, border `#DC2626`)
- Sertakan ikon ⚠️ di sebelah kiri pesan
- Teks error harus spesifik (bukan "Terjadi kesalahan", melainkan "Stok buku habis, tidak dapat diproses")
- Sertakan tombol "Coba Lagi" jika error dapat di-retry

### 6.4 Success State (Aksi Berhasil)
- Tampilkan toast notification di pojok kanan atas
- Background: `--color-success`, teks putih
- Sertakan ikon ✓ di sebelah kiri pesan
- Toast otomatis hilang setelah 3 detik
- Contoh pesan: "Buku berhasil ditambahkan!", "Peminjaman berhasil dicatat!"

### 6.5 Confirmation Dialog (Konfirmasi Aksi Berbahaya)
- Tampilkan modal konfirmasi sebelum aksi hapus atau proses pengembalian
- Judul modal: "Konfirmasi Hapus" atau "Konfirmasi Pengembalian"
- Isi: deskripsi konsekuensi aksi secara jelas
- Tombol: "Batal" (outline) dan "Ya, Hapus" / "Ya, Proses" (danger/primary)

---

## 7. Responsif

- Layout utama menggunakan breakpoint **min-width: 768px** sebagai batas tablet
- Di bawah 768px, sidebar di-collapse otomatis menjadi drawer (slide-in dari kiri)
- Tabel di layar kecil menggunakan horizontal scroll
- Prototype diprioritaskan untuk tampilan desktop (1024px+)
