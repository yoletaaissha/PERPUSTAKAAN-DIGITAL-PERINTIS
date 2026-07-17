# UCIC-004 — Akses E-book (PDF)

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-004 |
| Nama | Akses E-book (PDF) |
| Aktor | Siswa |
| Halaman | `/siswa/ebook/:idBuku` |
| Prioritas | Medium |
| Status | Validated |

---

# Tujuan

Memungkinkan siswa membaca atau mengunduh e-book yang tersedia pada koleksi digital perpustakaan.

---

# Related User Flow

- UC-004 Akses E-book

---

# Related Data Model

- Buku

---

# Related Screen

- Detail Buku
- Halaman E-book

---

# Endpoint

```
GET /ebook/{idBuku}
```

---

# Request Parameter

```json
{
  "idBuku": "BK001"
}
```

---

# Validation Rules

| Field | Rule |
|--------|------|
| idBuku | wajib tersedia |

---

# Success Response

```json
{
  "success": true,
  "ebook": {
    "judul": "Matematika Kelas IX",
    "file": "ebook.pdf"
  }
}
```

---

# Failed Response

```json
{
  "success": false,
  "message": "File e-book tidak ditemukan"
}
```

---

# Sequence

```
Siswa
   │
   ▼
Pilih E-book
   │
   ▼
Frontend
   │
GET /ebook/{id}
   ▼
Storage
   │
Ambil file PDF
   ▼
Frontend
   │
Tampilkan PDF Viewer
```

---

# Business Rules

- Hanya buku yang memiliki file PDF yang dapat dibuka.
- File PDF ditampilkan menggunakan PDF Viewer.
- Jika file tidak tersedia maka tampilkan pesan kesalahan.

---

# Acceptance Criteria

- PDF berhasil ditampilkan.
- PDF dapat dibaca.
- Error muncul jika file tidak tersedia.