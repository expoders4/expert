import type { Metadata } from 'next'
import Link from 'next/link'
import {
    FolderOpen, FileText, Star, Award, MessageSquare,
    Newspaper, TrendingUp, ArrowRight, Clock, AlertCircle
} from 'lucide-react'
import { formatDate } from '../../../../../lib/utils'

export const metadata: Metadata = { title: 'Dashboard' }

/* =========================
   STATIC DATA
========================= */

const projects = [
    {
        id: '1',
        title: 'Luxury Villa Design',
        category: 'Residential',
        published: true,
        slug: 'luxury-villa',
        createdAt: new Date('2026-05-01'),
    },
    {
        id: '2',
        title: 'Corporate Office',
        category: 'Commercial',
        published: false,
        slug: 'corporate-office',
        createdAt: new Date('2026-05-03'),
    },
    {
        id: '3',
        title: 'Modern Apartment',
        category: 'Interior',
        published: true,
        slug: 'modern-apartment',
        createdAt: new Date('2026-05-04'),
    },
]

const blogs = [
    { id: '1', published: true },
    { id: '2', published: true },
    { id: '3', published: false },
]

const testimonials = [
    { id: '1', published: true },
    { id: '2', published: true },
]

const awards = [
    { id: '1', published: true },
    { id: '2', published: true },
]

const features = [
    { id: '1', published: true },
    { id: '2', published: true },
]

const messages = [
    {
        id: '1',
        name: 'John Smith',
        subject: 'Villa consultation',
        status: 'UNREAD',
        createdAt: new Date('2026-05-04'),
    },
    {
        id: '2',
        name: 'Emma Wilson',
        subject: 'Interior project',
        status: 'READ',
        createdAt: new Date('2026-05-03'),
    },
    {
        id: '3',
        name: 'Michael Brown',
        subject: 'Commercial planning',
        status: 'UNREAD',
        createdAt: new Date('2026-05-02'),
    },
]

export default async function DashboardPage() {
     /* Counts */

  const projectCount = projects.length

    const publishedProjects = projects.filter(
        item => item.published
    ).length

    const blogCount = blogs.length

    const publishedBlogs = blogs.filter(
        item => item.published
    ).length

    const testimonialCount = testimonials.filter(
        item => item.published
    ).length

    const awardCount = awards.filter(
        item => item.published
    ).length

    const messageCount = messages.length

    const unreadCount = messages.filter(
        item => item.status === 'UNREAD'
    ).length

    const featureCount = features.filter(
        item => item.published
    ).length


    const recentMessages = messages.slice(0, 5)

    const recentProjects = projects.slice(0, 5)


    const stats = [
        {
            label: 'Total Projects',
            value: projectCount,
            sub: `${publishedProjects} published`,
            icon: FolderOpen,
            href: '/admin/projects',
            color: 'bg-blue-50 text-blue-600',
        },

        {
            label: 'Blog Articles',
            value: blogCount,
            sub: `${publishedBlogs} published`,
            icon: FileText,
            href: '/admin/blogs',
            color: 'bg-purple-50 text-purple-600',
        },

        {
            label: 'Testimonials',
            value: testimonialCount,
            sub: 'Published',
            icon: Star,
            href: '/admin/testimonials',
            color: 'bg-yellow-50 text-yellow-600',
        },

        {
            label: 'Awards',
            value: awardCount,
            sub: 'Published',
            icon: Award,
            href: '/admin/awards',
            color: 'bg-green-50 text-green-600',
        },

        {
            label: 'Messages',
            value: messageCount,
            sub: `${unreadCount} unread`,
            icon: MessageSquare,
            href: '/admin/contact',
            color: 'bg-red-50 text-red-600',
        },

        {
            label: 'Press Features',
            value: featureCount,
            sub: 'Published',
            icon: Newspaper,
            href: '/admin/features',
            color: 'bg-brand-50 text-brand-600',
        },
    ]


    const quickActions = [
        {
            label: 'New Project',
            href: '/admin/projects/new',
            icon: FolderOpen,
        },

        {
            label: 'New Blog Post',
            href: '/admin/blogs/new',
            icon: FileText,
        },

        {
            label: 'Add Testimonial',
            href: '/admin/testimonials/new',
            icon: Star,
        },

        {
            label: 'Add Award',
            href: '/admin/awards/new',
            icon: Award,
        },
    ]


    return (
        <div className="space-y-8">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-medium text-stone-900">Dashboard</h1>
                <p className="text-stone-500 text-sm mt-1">Overview of your website content and activity.</p>
            </div>

            {/* Unread messages alert */}
            {unreadCount > 0 && (
                <Link href="/admin/contact"
                    className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg hover:bg-red-100 transition-colors">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">
                        You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map(({ label, value, sub, icon: Icon, href, color }) => (
                    <Link key={label} href={href}
                        className="admin-card p-6 hover:shadow-md hover:border-brand-200 transition-all duration-200 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-stone-300 group-hover:text-brand-400 transition-colors" />
                        </div>
                        <p className="text-3xl font-light text-stone-900 mb-1">{value}</p>
                        <p className="text-sm font-medium text-stone-700">{label}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent messages */}
                <div className="admin-card">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                        <h2 className="text-sm font-medium text-stone-900">Recent Messages</h2>
                        <Link href="/admin/contact" className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-stone-50">
                        {recentMessages.length > 0 ? recentMessages.map((msg: any) => (
                            <Link key={msg.id} href={`/admin/contact/${msg.id}`}
                                className="flex items-start gap-4 px-6 py-4 hover:bg-stone-50 transition-colors">
                                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-brand-600 text-xs font-medium">{msg.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <p className="text-sm font-medium text-stone-900 truncate">{msg.name}</p>
                                        {msg.status === 'UNREAD' && (
                                            <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-stone-500 truncate">{msg.subject}</p>
                                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                                        <Clock className="w-3 h-3" /> {formatDate(msg.createdAt)}
                                    </p>
                                </div>
                            </Link>
                        )) : (
                            <p className="text-center py-8 text-stone-400 text-sm">No messages yet</p>
                        )}
                    </div>
                </div>

                {/* Recent projects */}
                <div className="admin-card">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                        <h2 className="text-sm font-medium text-stone-900">Recent Projects</h2>
                        <Link href="/admin/projects" className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-stone-50">
                        {recentProjects.length > 0 ? recentProjects.map((p: any) => (
                            <Link key={p.id} href={`/admin/projects/${p.id}`}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors">
                                <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center shrink-0">
                                    <FolderOpen className="w-4 h-4 text-stone-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-stone-900 truncate">{p.title}</p>
                                    <p className="text-xs text-stone-400">{p.category} · {formatDate(p.createdAt)}</p>
                                </div>
                                <span className={`text-[10px] tracking-wider uppercase px-2 py-1 rounded-full ${p.published ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'
                                    }`}>
                                    {p.published ? 'Live' : 'Draft'}
                                </span>
                            </Link>
                        )) : (
                            <p className="text-center py-8 text-stone-400 text-sm">No projects yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div>
                <h2 className="text-sm font-medium text-stone-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickActions.map(({ label, href, icon: Icon }) => (
                        <Link key={label} href={href}
                            className="admin-card p-4 flex flex-col items-center gap-3 text-center
                             hover:shadow-md hover:border-brand-200 transition-all duration-200 group">
                            <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center
                              group-hover:bg-brand-100 transition-colors">
                                <Icon className="w-5 h-5 text-brand-600" />
                            </div>
                            <span className="text-xs font-medium text-stone-700 group-hover:text-brand-700">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}