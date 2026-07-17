# UCIC-003 — Cari & Lihat Katalog Buku

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-003 |
| Nama | Cari & Lihat Katalog Buku |
| Aktor | Siswa |
| Halaman | `/siswa/katalog` |
| Prioritas | High |
| Status | Validated |

---

# Tujuan

Memungkinkan siswa mencari, memfilter, dan melihat informasi buku yang tersedia di perpustakaan.

---

# Related User Flow

- UC-003 Cari & Lihat Katalog Buku

---

# Related Data Model

- Buku
- Kategori

---

# Related Screen

- Dashboard Siswa
- Halaman Katalog
- Detail Buku

---

# Endpoint

```
GET /books
```

```
GET /books/{id}
```

---

# Request Parameter

```json
{
  "keyword": "Matematika",
  "kategori": "Pelajaran"
}
```

---

# Validation Rules

| Field | Rule |
|--------|------|
| keyword | opsional |
| kategori | opsional |

---

# Success Response

Status Code

```
200 OK
```

```json
{
  "success": true,
  "data": [
    {
      "id": "BK001",
      "judul": "Matematika Kelas IX",
      "penulis": "Budi Santoso",
      "kategori": "Pelajaran",
      "stok": 4
    }
  ]
}
```

---

# Failed Response

```
404 Not Found
```

```json
{
  "success": false,
  "message": "Data buku tidak ditemukan"
}
```

---

# Sequence

```
Siswa
 │
 │ Membuka katalog
 ▼
Frontend
 │
 │ GET /books
 ▼
Backend
 │
 │ Ambil data buku
 ▼
Database
 │
 ▼
Backend
 │
 ▼
Frontend
 │
 ▼
Daftar Buku Ditampilkan
```

---

# Business Rules

- Hanya buku aktif yang ditampilkan.
- Pencarian berdasarkan judul, penulis, atau kategori.
- Buku yang stoknya habis tetap tampil dengan status "Tidak tersedia".
- Detail buku dapat dibuka.

---

# Acceptance Criteria

- Daftar buku tampil.
- Fitur pencarian berjalan.
- Filter kategori berjalan.
- Detail buku dapat dibuka.