import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import prisma from '../../../../../lib/prisma'
import CommonTable from '../../../../../components/admin/component/commonTable'
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton'

export const metadata: Metadata = {
    title: 'Features',
}

export default async function AdminFeaturesPage({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    const page = Number(searchParams.page || 1)
    const limit = 15

    const total = await prisma.feature.count()

    const features = await prisma.feature.findMany({
        orderBy: { sortOrder: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
    })

    const columns = [
        {
            key: 'title',
            label: 'Feature',
            render: (row: any) => (
                <div>
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-stone-400">{row.slug}</p>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
        },
        {
            key: 'published',
            label: 'Status',
            render: (row: any) => (
                <span
                    className={`text-xs px-2 py-1 rounded-full ${row.published
                        ? 'bg-green-50 text-green-700'
                        : 'bg-stone-100 text-stone-600'
                        }`}
                >
                    {row.published ? 'Published' : 'Draft'}
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
                        Features
                    </h1>

                    <p className="text-stone-500 text-sm mt-1">
                        {total} total features
                    </p>
                </div>

                <Link
                    href="/admin/features/add"
                    className="btn-primary text-sm px-5 py-2.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Features</span>
                </Link>
            </div>

            {/* Table */}
            <CommonTable
                data={features}
                columns={columns}
                resource="features"
                viewPath={(row) => `/features/${row.slug}`}
                editPath={(row) => `/admin/features/${row.id}`}

                deleteComponent={(row) => (
                    <AdminDeleteButton
                        id={row.id}
                        resource="feature"
                        label={row.title}
                    />
                )}

                currentPage={page}
                totalPages={Math.ceil(total / limit)}
            />
        </div>
    )
}