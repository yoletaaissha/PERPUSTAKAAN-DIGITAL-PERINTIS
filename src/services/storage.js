const KEYS = {
  SISWA: 'perpustakaan_siswa',
  BUKU: 'perpustakaan_buku',
  PEMINJAMAN: 'perpustakaan_peminjaman',
  PENGEMBALIAN: 'perpustakaan_pengembalian',
  REVIEW: 'perpustakaan_review',
  NOTIFIKASI: 'perpustakaan_notifikasi',
  USER: 'perpustakaan_user',
  KONFIG: 'perpustakaan_konfig',
  LOG: 'perpustakaan_log',
}

function getAll(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

function saveAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export const storage = {
  // -- Siswa --
  getSiswa: () => getAll(KEYS.SISWA),
  saveSiswa: (data) => saveAll(KEYS.SISWA, data),

  // -- Buku --
  getBuku: () => getAll(KEYS.BUKU),
  saveBuku: (data) => saveAll(KEYS.BUKU, data),

  // -- Peminjaman --
  getPeminjaman: () => getAll(KEYS.PEMINJAMAN),
  savePeminjaman: (data) => saveAll(KEYS.PEMINJAMAN, data),

  // -- Pengembalian --
  getPengembalian: () => getAll(KEYS.PENGEMBALIAN),
  savePengembalian: (data) => saveAll(KEYS.PENGEMBALIAN, data),

  // -- Review --
  getReview: () => getAll(KEYS.REVIEW),
  saveReview: (data) => saveAll(KEYS.REVIEW, data),

  // -- Notifikasi --
  getNotifikasi: () => getAll(KEYS.NOTIFIKASI),
  saveNotifikasi: (data) => saveAll(KEYS.NOTIFIKASI, data),

  // -- User (admin/guru/kepsek) --
  getUser: () => getAll(KEYS.USER),
  saveUser: (data) => saveAll(KEYS.USER, data),

  // -- Konfigurasi --
  getKonfig: () => {
    const def = { namaPerpustakaan: 'Perpustakaan Perintis', dendaPerHari: 500, batasHariPinjam: 7 }
    try {
      return JSON.parse(localStorage.getItem(KEYS.KONFIG)) || def
    } catch {
      return def
    }
  },
  saveKonfig: (data) => localStorage.setItem(KEYS.KONFIG, JSON.stringify(data)),

  // -- Log Aktivitas --
  getLog: () => getAll(KEYS.LOG),
  saveLog: (data) => saveAll(KEYS.LOG, data),
  addLog: (entry) => {
    const logs = getAll(KEYS.LOG)
    logs.unshift({ ...entry, timestamp: new Date().toISOString() })
    saveAll(KEYS.LOG, logs)
  },

  // -- Reset --
  resetAll: (seedFn) => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
    if (seedFn) seedFn()
  },

  // -- Backup / Restore --
  exportAll: () => {
    const data = {}
    Object.entries(KEYS).forEach(([, key]) => {
      data[key] = getAll(key)
    })
    return data
  },
  importAll: (data) => {
    Object.entries(data).forEach(([key, val]) => {
      localStorage.setItem(key, JSON.stringify(val))
    })
  },
}
