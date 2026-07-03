import { useState } from 'react'
import { storage } from '../../services/storage'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { ShieldAlert } from 'lucide-react'
import Pagination from '../../components/ui/Pagination'
import EmptyState from '../../components/ui/EmptyState'
import { formatDateShort } from '../../lib/utils'

export default function LogAktivitasPage() {
  const [page, setPage] = useState(1)
  const perPage = 15
  const logs = storage.getLog()

  if (logs.length === 0) {
    return <EmptyState title="Belum ada aktivitas" description="Log akan tercatat saat ada aktivitas di sistem." />
  }

  const paged = logs.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold text-neutral-900">Log Aktivitas</h2>
      <Card>
        <CardHeader><h3 className="flex items-center gap-2 text-[16px]"><ShieldAlert className="w-5 h-5" /> Semua Aktivitas ({logs.length})</h3></CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          <table className="table-data">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Aksi</th>
                <th>Pelaku</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((log, i) => (
                <tr key={i}>
                  <td className="text-sm text-neutral-500 whitespace-nowrap">{formatDateShort(log.timestamp)}</td>
                  <td className="font-medium">{log.aksi}</td>
                  <td className="text-neutral-500">{log.pelaku}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <Pagination current={page} total={logs.length} pageSize={perPage} onChange={setPage} />
      </Card>
    </div>
  )
}
