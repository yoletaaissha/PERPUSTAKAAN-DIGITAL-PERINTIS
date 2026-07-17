# UCIC-007 — Lihat Rekomendasi Buku

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-007 |
| Nama | Lihat Rekomendasi Buku |
| Aktor | Siswa |
| Halaman | `/siswa/dashboard` |
| Prioritas | Medium |
| Status | Validated |

---

# Tujuan

Memberikan rekomendasi buku kepada siswa berdasarkan riwayat peminjaman dan kategori buku yang sering dibaca.

---

# Related User Flow

- UC-007 Rekomendasi Buku

---

# Related Data Model

- Buku
- Peminjaman
- Review

---

# Related Screen

- Dashboard Siswa

---

# Endpoint

```
GET /recommendations
```

---

# Request

```json
{
  "idSiswa":"SW001"
}
```

---

# Success Response

```json
{
"success":true,
"recommendation":[
{
"id":"BK010",
"judul":"IPA Kelas IX"
}
]
}
```

---

# Failed Response

```json
{
"success":false,
"message":"Belum ada rekomendasi"
}
```

---

# Sequence

```
Siswa
 │
 ▼
Dashboard
 │
 ▼
Frontend
 │
Hitung rekomendasi
 ▼
Storage
 │
Riwayat Pinjam
 ▼
Frontend
 │
Tampilkan Buku
```

---

# Business Rules

- Berdasarkan riwayat pinjam.
- Berdasarkan kategori favorit.
- Jika belum pernah meminjam maka tampilkan buku populer.

---

# Acceptance Criteria

- Buku rekomendasi tampil.
- Tidak terjadi duplikasi data.
- Dashboard tetap dapat dibuka walaupun rekomendasi kosong.