# Sequence Diagrams — Sistem Informasi Perpustakaan Perintis

Diagram sekuens berikut menggambarkan alur interaksi antara Actor, Sistem, dan komponen lain untuk empat alur utama. Semua diagram menggunakan format **Mermaid `sequenceDiagram`**.

## Legenda Elemen Mermaid

| Elemen | Keterangan | Contoh |
|---|---|---|
| `participant X as Nama` | Mendefinisikan peserta (Actor / Sistem / komponen) | `participant User as Guru/Karyawan` |
| `User->>Sistem: pesan` | Pesan synchronous (panah solid `->>`) | `User->>Sistem: 1. Buka form` |
| `Sistem-->>User: pesan` | Pesan response/asinkron (panah putus `-->>`) | `Sistem-->>User: Tampilkan form` |
| `activate Sistem` / `deactivate Sistem` | Menandai Sistem sedang memproses | Aktif saat hitung/validasi, deactive setelah response |
| `alt` ... `else` ... `end` | Percabangan kondisional | `alt ditemukan` / `else tidak ditemukan` / `end` |
| `loop` ... `end` | Pengulangan | `loop Untuk setiap pinjaman aktif` |
| `Note over X: teks` | Anotasi pada satu peserta | `Note over Sistem: denda = hari × Rp500` |

**Cara membaca:**
- Urutan pesan dari atas ke bawah = urutan waktu
- Blok `alt`/`else` menunjukkan kondisi berbeda dalam satu langkah
- Setiap cabang `alt`/`else` punya `activate`/`deactivate`-nya sendiri
- `Note` berisi anotasi singkat; detail teknis ada di "### Implementasi" di bawah tiap diagram

---

## 1. Login (UC-001)

```mermaid
sequenceDiagram
    participant User as Semua Pengguna
    participant Sistem
    participant Store as localStorage

    User->>Sistem: 1. Buka halaman login
    Sistem-->>User: 2. Tampilkan form login
    User->>Sistem: 3. Isi credentials
    User->>Sistem: 4. Klik "Masuk"

    alt Username tidak ditemukan
        activate Sistem
        Sistem->>Store: 5a. Cari di storage.getSiswa()
        Sistem->>Store: 5b. Cari di storage.getUser()
        Sistem-->>User: 6a. Error: "Username tidak ditemukan"
        deactivate Sistem
    else Username ditemukan tapi akun nonaktif
        activate Sistem
        Sistem->>Store: 5a. Cari di storage.getSiswa()
        Sistem->>Store: 5b. Cari di storage.getUser()
        Sistem-->>User: 6b. Error: "Akun dinonaktifkan"
        deactivate Sistem
    else Password salah
        activate Sistem
        Sistem->>Store: 5a. Cari di storage.getSiswa()
        Sistem->>Store: 5b. Cari di storage.getUser()
        Sistem-->>User: 6c. Error: "Password salah"
        deactivate Sistem
    else Login valid
        activate Sistem
        Sistem->>Store: 5a. Cari di storage.getSiswa()
        Sistem->>Store: 5b. Cari di storage.getUser()
        Note over Sistem: 7. Buat session, simpan, redirect
        Sistem->>Store: 7b. Set perpustakaan_session
        Sistem->>Sistem: 7c. Set user state + log
        deactivate Sistem
        Sistem-->>User: 8. Redirect sesuai peran
        Note right of User: siswa → /siswa/dashboard<br/>guru → /guru/dashboard<br/>kepsek → /kepsek/...<br/>admin → /admin/dashboard
        Sistem-->>User: 9. Dashboard tampil
    end
```

### Implementasi
- **File:** `src/contexts/AuthContext.jsx` (baris 23–70)
- **Session object:** `{id, nama, username, peran, extra}` → `localStorage.setItem('perpustakaan_session', JSON.stringify(session))`
- **Redirect:** Berdasarkan `roleMap` pada baris 55

---

## 2. Proses Peminjaman Buku (UC-011)

```mermaid
sequenceDiagram
    participant Guru as Guru/Karyawan
    participant Sistem
    participant Store as localStorage

    Guru->>Sistem: 1. Buka form peminjaman baru
    activate Sistem
    Sistem->>Store: 2. getSiswa(), getBuku(), getPeminjaman(), getKonfig()
    deactivate Sistem
    Sistem-->>Guru: 3. Tampilkan form

    Guru->>Sistem: 4. Pilih siswa
    activate Sistem
    Sistem->>Store: 5. getPeminjaman() → hitung aktif
    Note over Sistem: Tampilkan "X/{maxBuku}"<br/>Jika X ≥ max: disable form
    deactivate Sistem

    Guru->>Sistem: 6. Pilih buku
    Guru->>Sistem: 7. Set tanggal pinjam
    Guru->>Sistem: 8. Klik "Simpan"

    alt Validasi gagal
        activate Sistem
        Sistem-->>Guru: 9. Error: pesan validasi
        deactivate Sistem
    else Validasi berhasil
        activate Sistem
        Sistem->>Store: 10. savePeminjaman([...]) + kurangi stok buku
        Sistem->>Sistem: 11. Log: "Catat peminjaman"
        deactivate Sistem
        Sistem-->>Guru: 12. Toast "Berhasil!" → navigasi ke /guru/peminjaman
    end
```

### Implementasi
- **File:** `src/pages/guru/PeminjamanBaruPage.jsx`
- **Validasi stok:** Baris 50–55 (re-check sebelum simpan)
- **Pengurangan stok:** Baris 69–72 — `allBuku[idx].stok -= 1`, lalu `saveBuku(allBuku)`
- **Batas peminjaman:** `storage.getKonfig().maxBukuPerSiswa` (default: 3)
- **Durasi default:** `storage.getKonfig().batasHariPinjam` (default: 7 hari)
- **Object peminjaman:** `{idPinjam, idSiswa, idBuku, tanggalPinjam, batasKembali, status: 'dipinjam', createdAt}`

---

## 3. Proses Pengembalian Buku dengan Denda (UC-012)

```mermaid
sequenceDiagram
    participant Guru as Guru/Karyawan
    participant Sistem
    participant Store as localStorage

    Guru->>Sistem: 1. Buka halaman pengembalian (idPinjam)
    activate Sistem
    Sistem->>Store: 2. getPeminjaman() + getBuku() + getKonfig()
    deactivate Sistem
    Sistem-->>Guru: 3. Tampilkan detail (siswa, buku, tanggal, status)

    Guru->>Sistem: 4. Set tanggal kembali aktual
    activate Sistem
    Sistem->>Sistem: 5. Hitung hariTerlambat & denda (useMemo)
    Note over Sistem: denda = max(0, hari) × dendaPerHari
    deactivate Sistem
    Sistem-->>Guru: 6. Tampilkan perhitungan real-time

    Guru->>Sistem: 7. Klik "Konfirmasi"

    alt tglKembali < tglPinjam
        activate Sistem
        Sistem-->>Guru: 8. Error: tanggal tidak valid
        deactivate Sistem
    else Validasi OK
        activate Sistem
        Sistem->>Store: 9. savePengembalian + update status peminjaman
        Sistem->>Store: 10. Tambah stok buku + log
        deactivate Sistem
        Sistem-->>Guru: 11. Toast "Berhasil!" → navigasi ke /guru/pengembalian
    end
```

### Implementasi
- **File:** `src/pages/guru/ProsesPengembalianPage.jsx`
- **Perhitungan denda real-time:** Baris 31–38 (useMemo, re-embed setiap perubahan tanggal)
- **Formula:** `denda = hariTerlambat × (konfig.dendaPerHari || 500)` — configurable
- **Pengembalian stok:** Baris 70–73 — `allBuku[idx].stok += 1`, lalu `saveBuku(allBuku)`
- **statusDenda:** `belum_bayar` jika denda > 0, `lunas` jika denda = 0
- **Object pengembalian:** `{idKembali, idPinjam, tanggalKembali, jumlahHariTerlambat, denda, statusDenda, catatan}`

---

## 4. Menulis Review Buku (UC-006)

```mermaid
sequenceDiagram
    participant Siswa
    participant Sistem
    participant Store as localStorage

    Siswa->>Sistem: 1. Buka halaman detail buku
    activate Sistem
    Sistem->>Store: 2. getBuku() + getReview() + getPeminjaman()
    Sistem->>Sistem: 3. Hitung rata-rata rating
    deactivate Sistem
    Sistem-->>Siswa: 4. Tampilkan detail buku, rating, review

    alt Belum pernah mengembalikan buku ini
        activate Sistem
        Sistem->>Store: 5. getPeminjaman() → cek kelayakan
        Sistem-->>Siswa: 6a. Tombol "Tulis Review" disabled
        deactivate Sistem
    else Sudah kembalikan, sudah punya review
        activate Sistem
        Sistem->>Store: 5. getPeminjaman() → cek kelayakan
        Sistem->>Store: 6b. getReview() → cek duplikat
        Sistem-->>Siswa: 6b-i. Tampilkan review (readonly)
        deactivate Sistem
    else Sudah kembalikan, belum punya review
        activate Sistem
        Sistem->>Store: 5. getPeminjaman() → cek kelayakan
        Sistem->>Store: 6b. getReview() → cek duplikat
        Sistem-->>Siswa: 6b-ii. Tampilkan tombol "Tulis Review"
        deactivate Sistem
    end

    Siswa->>Sistem: 7. Klik "Tulis Review"
    activate Sistem
    Sistem-->>Siswa: 8. Modal: Rating (1–5) + Komentar
    deactivate Sistem

    Siswa->>Sistem: 9. Isi & klik "Kirim"

    alt Rating tidak valid
        activate Sistem
        Sistem-->>Siswa: 10. Error: "Pilih rating terlebih dahulu"
        deactivate Sistem
    else Rating valid
        activate Sistem
        Sistem->>Store: 11. saveReview([...]) + log
        deactivate Sistem
        Sistem-->>Siswa: 12. Toast "Review berhasil!" → reload detail
    end
```

### Implementasi
- **File:** `src/pages/siswa/DetailBukuPage.jsx`
- **Cek kelayakan review:** `pinjaman.some(p => p.idBuku === idBuku && p.idSiswa === user.id && p.status === 'dikembalikan')`
- **Cek duplikat:** `review.some(r => r.idBuku === idBuku && r.idSiswa === user.id)`
- **Rating:** Bintang 1–5, diklik langsung (komponen interaktif)
- **Rata-rata:** `Σrating / count` — dihitung ulang otomatis setelah review baru disimpan
- **Object review:** `{idReview, idBuku, idSiswa, rating, komentar, createdAt}`

---

## Catatan Implementasi

### Penyimpanan Data (localStorage Keys)
| Key | Tipe Data | CRUD Methods |
|---|---|---|
| `perpustakaan_siswa` | Array<Siswa> | `getSiswa()`, `saveSiswa()`, `addSiswa()`, `deleteSiswa()` |
| `perpustakaan_buku` | Array<Buku> | `getBuku()`, `saveBuku()` |
| `perpustakaan_pinjaman` | Array<Peminjaman> | `getPeminjaman()`, `savePeminjaman()` |
| `perpustakaan_pengembalian` | Array<Pengembalian> | `getPengembalian()`, `savePengembalian()` |
| `perpustakaan_review` | Array<Review> | `getReview()`, `saveReview()` |
| `perpustakaan_notifikasi` | Array<Notifikasi> | `getNotifikasi()`, `saveNotifikasi()` |
| `perpustakaan_user` | Array<User> | `getUser()`, `saveUser()` |
| `perpustakaan_konfig` | Object<Konfig> | `getKonfig()`, `saveKonfig()` |
| `perpustakaan_log` | Array<Log> | `getLog()`, `saveLog()`, `addLog()` |
| `perpustakaan_session` | Object<Session> | Direct localStorage access (AuthContext) |

### Alur Notifikasi (Otomatis)
Notifikasi dihasilkan secara otomatis saat siswa membuka halaman Notifikasi (`src/pages/siswa/NotifikasiPage.jsx`):

1. Filter peminjaman aktif (status: `dipinjam` atau `terlambat`) milik siswa yang login
2. Untuk setiap pinjaman, hitung `sisa = daysUntil(batasKembali)`
3. Jika `sisa ≤ 2` dan `sisa > 0`: buat notifikasi `jatuh_tempo` (jika belum ada)
4. Jika `sisa ≤ 0`: buat notifikasi `terlambat` (jika belum ada)
5. Tandai semua notifikasi sebagai `isRead: true`
