export function validateUsername(value) {
  if (!value || !value.trim()) return 'Username tidak boleh kosong'
  if (value.length < 4) return 'Username minimal 4 karakter'
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Hanya alfanumerik dan underscore'
  return ''
}

export function validatePassword(value) {
  if (!value || !value.trim()) return 'Password tidak boleh kosong'
  if (value.length < 6) return 'Password minimal 6 karakter'
  return ''
}

export function validateJudul(value) {
  if (!value || !value.trim()) return 'Judul tidak boleh kosong'
  if (value.length > 200) return 'Maksimal 200 karakter'
  return ''
}

export function validatePenulis(value) {
  if (!value || !value.trim()) return 'Penulis tidak boleh kosong'
  if (value.length > 100) return 'Maksimal 100 karakter'
  return ''
}

export function validateStok(value) {
  const num = parseInt(value, 10)
  if (isNaN(num) || num < 0) return 'Harus angka bulat positif atau nol'
  return ''
}

export function validateRating(value) {
  const num = parseInt(value, 10)
  if (isNaN(num) || num < 1 || num > 5) return 'Rating harus antara 1 dan 5'
  return ''
}

export function validateKomentar(value) {
  if (value && value.length > 500) return 'Maksimal 500 karakter'
  return ''
}
