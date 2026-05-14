'use client'

import { useState } from "react"
import AdminAuthGuard from "../../../../components/admin/adminAuthGuard"
import AdminSidebar from "../../../../components/admin/component/adminSidebar"
import AdminHeader from "../../../../components/admin/component/adminHeader"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar - Desktop */}
            <div className="hidden lg:block h-screen">
                <AdminSidebar />
            </div>

            {/* Sidebar - Mobile Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute left-0 top-0 h-full bg-stone-900 shadow-xl">
                        <AdminSidebar />
                    </div>
                </div>
            )}

            {/* Main Area */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Header with toggle */}
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>

            </div>
        </div>
    )
}