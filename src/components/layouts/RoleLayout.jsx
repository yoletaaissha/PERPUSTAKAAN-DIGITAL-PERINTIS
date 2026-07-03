import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Topbar from '../common/Topbar'
import Sidebar from '../common/Sidebar'
import Breadcrumb from '../common/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { storage } from '../../services/storage'

export default function RoleLayout({ title }) {
  const { user } = useAuth()
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  const toggleCollapse = useCallback(() => setSidebarCollapsed(prev => !prev), [])
  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  const unreadNotifCount = (() => {
    if (user?.peran !== 'siswa') return 0
    try {
      const notifs = storage.getNotifikasi()
      return notifs.filter(n => n.idSiswa === user.id && !n.isRead).length
    } catch { return 0 }
  })()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar
        title={title}
        onToggleSidebar={toggleMobile}
        unreadNotifCount={unreadNotifCount}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-60
            md:hidden
            transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar
            peran={user?.peran}
            collapsed={false}
            onClose={() => setMobileOpen(false)}
            unreadNotifCount={unreadNotifCount}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex shrink-0 transition-all duration-300 ease-in-out">
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-60'} transition-all duration-300 ease-in-out`}>
            <Sidebar
              peran={user?.peran}
              collapsed={sidebarCollapsed}
              onToggleCollapse={toggleCollapse}
              unreadNotifCount={unreadNotifCount}
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
