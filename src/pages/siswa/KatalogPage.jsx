import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../services/storage'
import { Search } from 'lucide-react'
import { Card, CardBody } from '../../components/ui/Card'
import Pagination from '../../components/ui/Pagination'

const categories = ['Semua', 'Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Sastra', 'Referensi']
const jenis = ['Semua', 'fisik', 'digital']

export default function KatalogPage() {
  const navigate = useNavigate()
  const [buku] = useState(storage.getBuku())
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [filterJenis, setFilterJenis] = useState('Semua')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = useMemo(() => {
    let data = [...buku]
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(b => b.judul.toLowerCase().includes(q) || b.penulis.toLowerCase().includes(q))
    }
    if (kategori !== 'Semua') data = data.filter(b => b.kategori === kategori)
    if (filterJenis !== 'Semua') data = data.filter(b => b.jenis === filterJenis)
    return data
  }, [buku, search, kategori, filterJenis])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Katalog Buku</h2>

      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="label-form">Cari Buku</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input className="input-field pl-9" placeholder="Cari judul atau penulis..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
              </div>
            </div>
            <div>
              <label className="label-form">Kategori</label>
              <select className="input-field" value={kategori} onChange={e => { setKategori(e.target.value); setPage(1) }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-form">Jenis</label>
              <select className="input-field" value={filterJenis} onChange={e => { setFilterJenis(e.target.value); setPage(1) }}>
                {jenis.map(j => <option key={j} value={j}>{j === 'fisik' ? 'Fisik' : j === 'digital' ? 'Digital' : 'Semua'}</option>)}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {paged.length === 0 ? (
        <div className="text-center py-12 text-sm text-neutral-500">Buku tidak ditemukan.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {paged.map(b => (
              <div key={b.idBuku} className="card cursor-pointer group hover:shadow-md transition-shadow" onClick={() => navigate(`/siswa/katalog/${b.idBuku}`)}>
                <div className="aspect-[3/4] bg-neutral-100 rounded-t-md overflow-hidden">
                  <img src={b.coverUrl} alt={b.judul} className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/150x200?text=No+Cover' }} />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-900 truncate group-hover:text-primary">{b.judul}</p>
                  <p className="text-xs text-neutral-500 truncate">{b.penulis}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded ${b.jenis === 'fisik' ? 'badge-blue' : 'badge-green'}`}>
                      {b.jenis === 'fisik' ? 'Fisik' : 'Digital'}
                    </span>
                    <span className="text-[11px] text-neutral-400">{b.kategori}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination current={page} total={filtered.length} pageSize={perPage} onChange={setPage} />
        </>
      )}
    </div>
  )
}
