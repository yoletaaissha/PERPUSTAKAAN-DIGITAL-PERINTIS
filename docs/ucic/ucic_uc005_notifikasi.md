# UCIC-005 — Lihat Notifikasi Pengembalian

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-005 |
| Nama | Lihat Notifikasi Pengembalian |
| Aktor | Siswa |
| Halaman | `/siswa/notifikasi` |
| Prioritas | Medium |
| Status | Validated |

---

# Tujuan

Menampilkan notifikasi mengenai batas waktu pengembalian buku dan keterlambatan.

---

# Related User Flow

- UC-005 Notifikasi

---

# Related Data Model

- Notifikasi
- Peminjaman

---

# Related Screen

- Dashboard Siswa
- Halaman Notifikasi

---

# Endpoint

```
GET /notifications
```

---

# Request

```json
{
  "idSiswa": "SW001"
}
```

---

# Success Response

```json
{
  "success": true,
  "data": [
    {
      "judul": "Pengembalian Buku",
      "pesan": "Batas pengembalian tinggal 2 hari"
    }
  ]
}
```

---

# Failed Response

```json
{
  "success": false,
  "message": "Tidak ada notifikasi"
}
```

---

# Sequence

```
Siswa
 │
 ▼
Buka Halaman Notifikasi
 │
 ▼
Frontend
 │
GET Notification
 ▼
Storage
 │
Ambil Data
 ▼
Frontend
 │
Tampilkan Notifikasi
```

---

# Business Rules

- Notifikasi dibuat otomatis.
- Notifikasi jatuh tempo muncul maksimal H-2.
- Notifikasi terlambat muncul jika melewati batas pengembalian.
- Setelah dibuka status menjadi telah dibaca.

---

# Acceptance Criteria

- Notifikasi tampil.
- Status berubah menjadi dibaca.
- Tidak ada data kosong yang menyebabkan error.