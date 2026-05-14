'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, FileText, Star, Award,
  Newspaper, MessageSquare, LogOut, ChevronRight
} from 'lucide-react'
import { cn } from '../../../utils/cn'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Awards', href: '/admin/awards', icon: Award },
  { label: 'Features', href: '/admin/features', icon: Newspaper },
  { label: 'Messages', href: '/admin/contact', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-stone-950 flex flex-col shadow-2xl shrink-0 h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-500 flex items-center justify-center">
            <span className="text-brand-400 text-xs font-bold tracking-wider">AS</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium tracking-wider">Archform Studio</p>
            <p className="text-stone-500 text-[10px] tracking-wider uppercase">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-stone-600 text-[10px] tracking-[0.2em] uppercase px-3 mb-3">Main Menu</p>
        <ul className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </span>
                  {isActive && <ChevronRight className="w-3 h-3" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-stone-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-400
                     hover:text-red-400 hover:bg-red-950 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}