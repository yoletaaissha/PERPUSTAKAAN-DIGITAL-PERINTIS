# Sistem Informasi Perpustakaan Perintis

## Deskripsi Singkat

Frontend prototype untuk perpustakaan sekolah hybrid (fisik & digital) menggunakan React + Vite + localStorage. Aplikasi ini mendukung 4 peran pengguna (Siswa, Guru, Kepala Sekolah, Admin) dengan fitur katalog buku, e-book reader, peminjaman, pengembalian, laporan, grafik minat baca, hingga manajemen user dan backup data.

## Anggota Tim

1. Dyah Amarruli (2400016071)
2. Varsi Karuniawati (2400016074)
3. Rifa Ananda Wahyuri (2400016083)
4. Yoleta Aisha Setyorini (2400016084)
5. Zakwan Diaul Ikhsan (2400016091)

## Pembagian Peran

| Nama | Peran |
|------|-------|
| Dyah Amarruli |Implementasi frontend dan integrasi fitur |
| Varsi Karuniawati |Analisis kebutuhan sistem, dokumentasi proyek |
| Rifa Ananda Wahyuri |Perancangan database dan penyusunan desain basis data |
| Yoleta Aisha Setyorini |Implementasi frontend dan integrasi fitur|
| Zakwan Diaul Ikhsan |Perancangan dan penyusunan Class Diagram sistem |

## Teknologi yang Digunakan

- React 18 + Vite
- Tailwind CSS
- React Router v6
- React Context API
- Recharts (grafik)
- Lucide React (icon)
- localStorage (persistensi data)

## Persyaratan Sistem

- Node.js 18.x atau lebih baru
- npm 9.x atau lebih baru

## Cara Menjalankan Aplikasi

```bash
npm install
npm run dev
```

Buka browser di `http://localhost:5173`.

### Build Produksi

```bash
npm run build
npm run preview
```

### Akun Demo

| Role | Username | Password |
|------|----------|----------|
| Siswa | `siswa01` | `siswa123` |
| Guru | `guru01` | `guru123` |
| Kepala Sekolah | `kepsek01` | `kepsek123` |
| Admin | `admin01` | `admin123` |

## URL Aplikasi (Deployed)



## URL Repository GitHub

https://github.com/yoletaaissha/PERPUSTAKAAN-DIGITAL-PERINTIS

## Reset Data

Untuk mereset semua data ke default:

1. Login sebagai admin → menu Backup Data → klik "Reset Semua Data"
2. Atau hapus localStorage via DevTools: `localStorage.clear(); location.reload()`

Data akan di-reseed otomatis saat pertama kali aplikasi dimuat.