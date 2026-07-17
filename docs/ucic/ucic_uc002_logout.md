# UCIC-002 — Logout Pengguna

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-002 |
| Nama | Logout Pengguna |
| Aktor | Semua Aktor |
| Halaman | Topbar (Semua Halaman) |
| Prioritas | High |
| Status | Validated |

---

# Tujuan

Memungkinkan pengguna keluar dari sistem dengan menghapus sesi login dan mengarahkan kembali ke halaman login.

---

# Related User Flow

- UC-002 Logout Pengguna

---

# Related Data Model

- User

---

# Related Screen

- Topbar
- Login Page

---

# Endpoint

```
POST /auth/logout
```

---

# Request Payload

```json
{
  "token": "dummy-token"
}
```

---

# Validation Rules

| Field | Rule |
|--------|------|
| token | wajib tersedia |

---

# Success Response

Status Code

```
200 OK
```

Response

```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

# Failed Response

### Session tidak ditemukan

```
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Session tidak valid"
}
```

---

# Sequence

```
User
 │
 │ Klik Logout
 ▼
Frontend
 │
 │ Hapus session
 ▼
POST /auth/logout
 │
 ▼
Backend
 │
 │ Invalidasi session
 ▼
Frontend
 │
 ▼
Redirect ke Login
```

---

# Business Rules

- Logout hanya dapat dilakukan jika pengguna sudah login.
- Session pengguna dihapus.
- Token login dihapus.
- localStorage dibersihkan.
- Sistem mengarahkan pengguna ke halaman Login.

---

# Local Storage

| Key | Aksi |
|-----|------|
| authUser | Remove |
| authToken | Remove |

---

# Acceptance Criteria

- Logout berhasil menghapus session.
- Pengguna diarahkan ke halaman Login.
- Halaman dashboard tidak dapat diakses kembali tanpa login.