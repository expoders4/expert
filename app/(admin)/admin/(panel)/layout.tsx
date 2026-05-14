import type { Metadata } from 'next'
import AdminAuthGuard from '../../../../components/admin/adminAuthGuard'
import LayoutWrapper from './layoutWrapper'

export const metadata: Metadata = {
  title: { template: '%s | Admin — Archform Studio', default: 'Admin Panel' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <AdminAuthGuard>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </AdminAuthGuard>
    //   <div className="flex h-screen !bg-red overflow-hidden">
    //     <AdminSidebar />
    //     <div className="flex flex-col flex-1 overflow-hidden">
    //       <AdminHeader />
    //       <main className="flex-1 overflow-y-auto p-6 lg:p-8">
    //         {children}
    //       </main>
    //     </div>
    //   </div>
    // 
  )
}