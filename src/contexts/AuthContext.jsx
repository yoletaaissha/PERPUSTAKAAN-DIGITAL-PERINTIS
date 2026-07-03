import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('perpustakaan_session')
    if (raw) {
      try {
        const session = JSON.parse(raw)
        setUser(session)
      } catch {
        localStorage.removeItem('perpustakaan_session')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback((username, password) => {
    const siswaList = storage.getSiswa()
    const foundSiswa = siswaList.find(s => s.username === username)
    if (foundSiswa) {
      if (!foundSiswa.isActive) {
        return { success: false, error: 'Akun Anda telah dinonaktifkan. Hubungi Admin.' }
      }
      if (foundSiswa.password !== password) {
        return { success: false, error: 'Password salah. Silakan coba lagi.' }
      }
      const session = {
        id: foundSiswa.idSiswa,
        nama: foundSiswa.nama,
        username: foundSiswa.username,
        peran: 'siswa',
        extra: { kelas: foundSiswa.kelas },
      }
      localStorage.setItem('perpustakaan_session', JSON.stringify(session))
      setUser(session)
      storage.addLog({ aksi: `Login: ${foundSiswa.nama} (siswa)`, pelaku: foundSiswa.nama })
      return { success: true, redirect: '/siswa/dashboard' }
    }

    const userList = storage.getUser()
    const foundUser = userList.find(u => u.username === username)
    if (foundUser) {
      if (!foundUser.isActive) {
        return { success: false, error: 'Akun Anda telah dinonaktifkan. Hubungi Admin.' }
      }
      if (foundUser.password !== password) {
        return { success: false, error: 'Password salah. Silakan coba lagi.' }
      }
      const roleMap = { admin: '/admin/dashboard', guru: '/guru/dashboard', kepala_sekolah: '/kepsek/dashboard' }
      const session = {
        id: foundUser.idUser,
        nama: foundUser.nama,
        username: foundUser.username,
        peran: foundUser.peran,
        extra: { jabatan: foundUser.jabatan || '' },
      }
      localStorage.setItem('perpustakaan_session', JSON.stringify(session))
      setUser(session)
      storage.addLog({ aksi: `Login: ${foundUser.nama} (${foundUser.peran})`, pelaku: foundUser.nama })
      return { success: true, redirect: roleMap[foundUser.peran] }
    }

    return { success: false, error: 'Username tidak ditemukan. Periksa kembali username Anda.' }
  }, [])

  const logout = useCallback(() => {
    if (user) storage.addLog({ aksi: `Logout: ${user.nama}`, pelaku: user.nama })
    localStorage.removeItem('perpustakaan_session')
    setUser(null)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
