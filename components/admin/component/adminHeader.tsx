'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, ExternalLink, Menu, User } from 'lucide-react'

interface AdminUser { name: string; email: string; role: string }

export default function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    // Fetch current user
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => d.success && setUser(d.data.user))
      .catch(() => { })

    // Fetch unread message count
    fetch('/api/contact?status=UNREAD&limit=1')
      .then((r) => r.json())
      .then((d) => d.success && setUnread(d.data.meta?.total || 0))
      .catch(() => { })
  }, [])

  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex align-center gap-3">
        <button
          className="lg:hidden text-stone-300"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-sm font-medium text-stone-900">Archform Studio</h1>
          <p className="text-xs text-stone-400 hidden sm:block">Content Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live site link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-brand-600 transition-colors hidden sm:block"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>

        {/* Notifications */}
        <Link href="/admin/contact" className="relative p-2 text-stone-400 hover:text-stone-700 transition-colors">
          <Bell className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </Link>

        {/* User */}
        {user && (
          <div className="flex items-center gap-2 pl-4 border-l border-stone-200">
            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
              <span className="text-brand-600 text-xs font-semibold">{user.name.charAt(0)}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-stone-900">{user.name}</p>
              <p className="text-[10px] text-stone-400 capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}