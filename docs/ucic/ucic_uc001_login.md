# UCIC-001 — Login Pengguna

## Informasi Umum

| Item | Keterangan |
|------|------------|
| Use Case | UC-001 |
| Nama | Login Pengguna |
| Aktor | Semua Aktor |
| Halaman | `/login` |
| Prioritas | High |
| Status | Validated |

---

# Tujuan

Memungkinkan pengguna melakukan autentikasi menggunakan username dan password sehingga dapat mengakses sistem sesuai hak akses masing-masing.

---

# Related User Flow

- UC-001 Login Pengguna

---

# Related Data Model

- User

---

# Related Screen

- Login Page

---

# Endpoint

```
POST /auth/login
```

---

# Request Payload

```json
{
  "username": "admin01",
  "password": "admin123"
}
```

---

# Validation Rules

| Field | Rule |
|--------|------|
| username | wajib diisi |
| password | wajib diisi |
| username | harus terdaftar |
| password | harus sesuai |

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
  "message": "Login berhasil",
  "token": "dummy-token",
  "user": {
    "id": "USR001",
    "nama": "Administrator",
    "username": "admin01",
    "role": "admin"
  }
}
```

---

# Failed Response

### Username tidak ditemukan

```
404 Not Found
```

```json
{
    "success": false,
    "message": "Username tidak ditemukan"
}
```

---

### Password salah

```
401 Unauthorized
```

```json
{
    "success": false,
    "message": "Password salah"
}
```

---

### Data kosong

```
400 Bad Request
```

```json
{
    "success": false,
    "message": "Username dan password wajib diisi"
}
```

---

# Sequence

```
User
 │
 │ Input username & password
 ▼
Frontend
 │
 │ Validasi form
 ▼
POST /auth/login
 │
 ▼
Backend
 │
 │ Cek username
 │ Cek password
 ▼
Database
 │
 ▼
Backend
 │
 │ Generate Session
 ▼
Frontend
 │
 ▼
Dashboard sesuai Role
```

---

# Business Rules

- Username harus terdaftar.
- Password harus sesuai.
- Setiap role diarahkan ke dashboard masing-masing.
- Session disimpan pada localStorage.
- Jika login gagal maka pesan error ditampilkan.
- Password tidak disimpan dalam bentuk plain text pada implementasi nyata.

---

# Local Storage

| Key | Isi |
|-----|-----|
| authUser | Data pengguna login |
| authToken | Token login |

---

# Acceptance Criteria

- Pengguna berhasil login menggunakan akun valid.
- Sistem menolak username yang tidak terdaftar.
- Sistem menolak password yang salah.
- Dashboard yang ditampilkan sesuai role.
- Session tersimpan setelah login berhasil.
