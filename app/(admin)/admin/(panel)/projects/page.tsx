import type { Metadata } from 'next'
import Link from 'next/link'

import prisma from '../../../../../lib/prisma'

import {
    Plus,
    Search,
} from 'lucide-react'
import CommonTable from '../../../../../components/admin/component/commonTable'
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton'


export const metadata: Metadata = {
    title: 'Projects',
}

interface PageProps {
    searchParams: {
        page?: string
        cat?: string
        q?: string
        status?: string
    }
}

export default async function AdminProjectsPage({
    searchParams,
}: PageProps) {
    const page = Math.max(
        1,
        Number(searchParams.page) || 1
    )

    const limit = 15

    const cat = searchParams.cat
    const q = searchParams.q
    const status = searchParams.status

    /* Filters */
    const where: any = {}

    if (cat) {
        where.category = cat
    }

    if (status === 'published') {
        where.published = true
    }

    if (status === 'draft') {
        where.published = false
    }

    if (q) {
        where.OR = [
            {
                title: {
                    contains: q,
                    mode: 'insensitive',
                },
            },

            {
                location: {
                    contains: q,
                    mode: 'insensitive',
                },
            },
        ]
    }

    /* Total count */
    const total = await prisma.project.count({
        where,
    })

    const totalPages = Math.ceil(
        total / limit
    )

    /* Projects */
    const projects =
        await prisma.project.findMany({
            where,

            orderBy: {
                createdAt: 'desc',
            },

            skip: (page - 1) * limit,

            take: limit,
        })

    /* Table Columns */
    const columns = [
        {
            key: 'title',
            label: 'Project',

            render: (row: any) => (
                <div>
                    <p className="font-medium text-stone-900">
                        {row.title}
                    </p>

                    {row.featured && (
                        <span className="text-[10px] text-brand-600 tracking-wider">
                            ★ Featured
                        </span>
                    )}
                </div>
            ),
        },

        {
            key: 'category',
            label: 'Category',
        },

        {
            key: 'location',
            label: 'Location',
        },

        {
            key: 'year',
            label: 'Year',
        },

        {
            key: 'published',
            label: 'Status',

            render: (row: any) => (
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium ${row.published
                        ? 'bg-green-50 text-green-700'
                        : 'bg-stone-100 text-stone-600'
                        }`}
                >
                    {row.published
                        ? 'Published'
                        : 'Draft'}
                </span>
            ),
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-stone-900">
                        Projects
                    </h1>

                    <p className="text-stone-500 text-sm mt-1">
                        {total} total projects
                    </p>
                </div>

                <Link
                    href="/admin/projects/add"
                    className="btn-primary text-sm px-5 py-2.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </Link>
            </div>

            {/* Filters */}
            {/* Filters */}
            <div className="admin-card p-4">
                <form
                    method="GET"
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                        <input
                            type="text"
                            name="q"
                            defaultValue={q || ''}
                            placeholder="Search projects..."
                            className="admin-input !pl-9 py-2 text-sm w-full"
                        />
                    </div>

                    {/* Category */}
                    <select
                        name="cat"
                        defaultValue={cat || ''}
                        className="admin-input py-2 text-sm w-full"
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="RESIDENTIAL">
                            Residential
                        </option>

                        <option value="COMMERCIAL">
                            Commercial
                        </option>

                        <option value="INTERIOR">
                            Interior
                        </option>

                        <option value="HOSPITALITY">
                            Hospitality
                        </option>

                        <option value="URBAN">
                            Urban
                        </option>

                        <option value="LANDSCAPE">
                            Landscape
                        </option>
                    </select>

                    {/* Status */}
                    <select
                        name="status"
                        defaultValue={status || ''}
                        className="admin-input py-2 text-sm w-full"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="published">
                            Published
                        </option>

                        <option value="draft">
                            Draft
                        </option>
                    </select>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            <span>Filter</span>
                        </button>

                        <Link
                            href="/admin/projects"
                            className="px-4 py-2 text-sm border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors"
                        >
                            Reset
                        </Link>
                    </div>
                </form>
            </div>

            {/* Table */}
            <CommonTable
                data={projects}
                columns={columns}
                resource="projects"
                viewPath={(row) => `/projects/${row.slug}`}
                editPath={(row) => `/admin/projects/${row.id}`}

                deleteComponent={(row) => (
                    <AdminDeleteButton
                        id={row.id}
                        resource="projects"
                        label={row.title}
                    />
                )}

                currentPage={page}
                totalPages={totalPages}
                queryParams={{
                    q: q || '',
                    cat: cat || '',
                    status: status || '',
                }}
            />
        </div>
    )
}