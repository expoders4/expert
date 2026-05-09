import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Trophy } from 'lucide-react'

import prisma from '../../../../../lib/prisma'
import CommonTable from '../../../../../components/admin/component/commonTable'
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton'

export const metadata: Metadata = {
  title: 'Awards',
}

interface PageProps {
  searchParams: {
    page?: string
    q?: string
    status?: string
  }
}

export default async function AdminAwardsPage({
  searchParams,
}: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const limit = 15

  const q = searchParams.q?.toLowerCase()
  const status = searchParams.status

  const where: any = {}

  if (status === 'published') where.published = true
  if (status === 'draft') where.published = false

  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { organization: { contains: q, mode: 'insensitive' } },
    ]
  }

  const total = await prisma.award.count({ where })

  const awards = await prisma.award.findMany({
    where,
    orderBy: { year: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })

  const columns = [
    {
      key: 'title',
      label: 'Award',
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Trophy className="w-4 h-4 text-brand-400" />
          <p className="font-medium text-stone-900">{row.title}</p>
        </div>
      ),
    },
    {
      key: 'slug',
      label: 'Slug',
      render: (row: any) => row.slug || '—',
    },
    {
      key: 'organization',
      label: 'Organization',
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
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase font-medium ${row.published
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
            Awards
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {total} total awards
          </p>
        </div>

        <Link
          href="/admin/awards/add"
          className="btn-primary text-sm px-5 py-2.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Award</span>
        </Link>
      </div>

      {/* Table */}
      <CommonTable
        data={awards}
        columns={columns}
        resource="awards"
        viewPath={(row) => `/awards/${row.id}`}
        editPath={(row) => `/admin/awards/${row.id}`}
        deleteComponent={(row) => (
          <AdminDeleteButton
            id={row.id}
            resource="awards"
            label={row.title}
          />
        )}
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        queryParams={{
          q: q || '',
          status: status || '',
        }}
      />
    </div>
  )
}