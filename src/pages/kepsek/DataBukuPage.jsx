import { useState } from 'react'
import { storage } from '../../services/storage'
import { Search } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'

export default function DataBukuPage() {
  const [buku] = useState(storage.getBuku())
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = search.trim()
    ? buku.filter(b => b.judul.toLowerCase().includes(search.toLowerCase()) || b.penulis.toLowerCase().includes(search.toLowerCase()))
    : buku

  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Data Buku</h2>
      <Card>
        <CardHeader><h3 className="text-[16px]">Koleksi Perpustakaan ({filtered.length} buku)</h3></CardHeader>
        <CardBody>
          <div className="relative mb-4 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input className="input-field pl-9" placeholder="Cari judul atau penulis..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="overflow-x-auto">
            <table className="table-data">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Kategori</th>
                  <th>Jenis</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(b => (
                  <tr key={b.idBuku}>
                    <td className="font-medium">{b.judul}</td>
                    <td>{b.penulis}</td>
                    <td><span className="badge-blue">{b.kategori}</span></td>
                    <td><StatusBadge status={b.jenis === 'fisik' ? 'dipinjam' : 'digital'} /></td>
                    <td>{b.jenis === 'fisik' ? (b.stok > 0 ? <span className="badge-green">{b.stok}</span> : <span className="badge-red">0</span>) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
        <Pagination current={page} total={filtered.length} pageSize={perPage} onChange={setPage} />
      </Card>
    </div>
  )
}
