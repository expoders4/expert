import type { Metadata } from 'next'
import AdminHeader from '../../../../components/admin/component/adminHeader'
import AdminSidebar from '../../../../components/admin/component/adminSidebar'
import AdminAuthGuard from '../../../../components/admin/adminAuthGuard'

export const metadata: Metadata = {
  title: { template: '%s | Admin — Archform Studio', default: 'Admin Panel' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <AdminAuthGuard>
      <div className="flex h-screen !bg-red overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}