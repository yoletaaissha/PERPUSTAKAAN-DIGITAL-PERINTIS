# UCIC (Use Case Integration Contract)

# Sistem Informasi Perpustakaan Perintis

**Versi:** 1.0  
**Tanggal:** 2026

---

# Tentang Dokumen

Folder ini berisi **Use Case Integration Contract (UCIC)** untuk setiap Use Case utama pada Sistem Informasi Perpustakaan Perintis.

UCIC menjadi acuan implementasi antara frontend dan backend dengan mendefinisikan:

- Use Case Reference
- Related Screens
- Related Entities
- Sequence Diagram
- API Contract
- Request Payload
- Response Payload
- Status Codes
- Validation Rules
- Error Handling
- Data Mapping

---

# Daftar UCIC

| Kode UC | Nama Use Case | File |
|----------|---------------|------|
| UC-001 | Login Pengguna | `ucic_uc001_login.md` |
| UC-006 | Beri Review & Rating Buku | `ucic_uc006_review.md` |
| UC-011 | Catat Peminjaman Baru | `ucic_uc011_peminjaman.md` |
| UC-012 | Proses Pengembalian Buku | `ucic_uc012_pengembalian.md` |

---

# Sequence Diagram

Dokumen berikut berisi sequence diagram yang digunakan sebagai pendukung UCIC.

- `sequence-diagrams.md`

---

# Hubungan Dokumen

```
Validated User Flow
        │
        ▼
Validated Class Diagram
        │
        ▼
Use Case Integration Contract (UCIC)
        │
        ▼
Frontend Implementation
        │
        ▼
Backend Implementation
        │
        ▼
Integration Testing
```

---

# Catatan

- Setiap UCIC mengacu pada User Flow yang telah divalidasi.
- Setiap API menggunakan struktur data yang mengacu pada Class Diagram.
- Seluruh endpoint pada prototype menggunakan data yang disimpan di **localStorage**.
- Dokumen ini menjadi acuan implementasi frontend, backend, serta pengujian integrasi.