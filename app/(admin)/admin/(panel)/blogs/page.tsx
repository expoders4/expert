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
    title: 'Blogs',
}

interface PageProps {
    searchParams: {
        page?: string
        q?: string
        status?: string
    }
}

export default async function AdminBlogsPage({
    searchParams,
}: PageProps) {
    const page = Math.max(
        1,
        Number(searchParams.page) || 1
    )

    const limit = 15

    const q = searchParams.q
    const status = searchParams.status

    const where: any = {}

    /* Status filter */
    if (status === 'published') {
        where.published = true
    }

    if (status === 'draft') {
        where.published = false
    }

    /* Search */
    if (q) {
        where.OR = [
            {
                title: {
                    contains: q,
                    mode: 'insensitive',
                },
            },

            {
                slug: {
                    contains: q,
                    mode: 'insensitive',
                },
            },
        ]
    }

    /* Total */
    const total =
        await prisma.blog.count({
            where,
        })

    const totalPages = Math.ceil(
        total / limit
    )

    /* Blogs */
    const blogs =
        await prisma.blog.findMany({
            where,

            orderBy: {
                createdAt: 'desc',
            },

            skip:
                (page - 1) * limit,

            take: limit,
        })
    /* Table columns */
    const columns = [
        {
            key: 'title',
            label: 'Title',

            type: 'blog-title',
        },

        {
            key: 'authorId',
            label: 'Author',
        },

        {
            key: 'tags',
            label: 'Tags',

            type: 'tags',
        },

        {
            key: 'publishedAt',
            label: 'Published',

            type: 'date',
        },

        {
            key: 'published',
            label: 'Status',

            type: 'status',
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-stone-900">
                        Blog Articles
                    </h1>

                    <p className="text-stone-500 text-sm mt-1">
                        {total} total articles
                    </p>
                </div>

                <Link
                    href="/admin/blogs/add"
                    className="btn-primary text-sm px-5 py-2.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>
                        New Article
                    </span>
                </Link>
            </div>

            {/* Filters */}
            <div className="admin-card p-4">
                <form
                    method="GET"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                        <input
                            type="text"
                            name="q"
                            defaultValue={q}
                            placeholder="Search articles..."
                            className="admin-input !pl-9"
                        />
                    </div>

                    <select
                        name="status"
                        defaultValue={status || ''}
                        className="admin-input"
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
                </form>
            </div>

            {/* Table */}
            <CommonTable
                data={blogs}
                columns={columns}
                resource="blogs"

                viewPath={(row) =>
                    `/blogs/${row.slug}`
                }

                editPath={(row) =>
                    `/admin/blogs/${row.id}`
                }

                deleteComponent={(
                    row
                ) => (
                    <AdminDeleteButton
                        id={row.id}
                        resource="blogs"
                        label={row.title}
                    />
                )}

                currentPage={page}

                totalPages={
                    totalPages
                }

                queryParams={{
                    q: q || '',
                    status:
                        status || '',
                }}
            />
        </div>
    )
}