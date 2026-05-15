import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import type { Prisma } from '@prisma/client'

import prisma from '../../../../../lib/prisma'
import CommonTable from '../../../../../components/admin/component/commonTable'
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton'

export const metadata: Metadata = {
  title: 'Projects',
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    cat?: string
    q?: string
    status?: string
  }>
}

export default async function AdminProjectsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams

  const page = Math.max(1, Number(params.page) || 1)
  const limit = 15

  const where: Prisma.ProjectWhereInput = {}

  if (params.cat) {
    where.subCategory = {
      category: { slug: params.cat },
    }
  }

  if (params.status === 'published') where.published = true
  if (params.status === 'draft') where.published = false

  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: 'insensitive' } },
      { location: { contains: params.q, mode: 'insensitive' } },
    ]
  }

  const [categories, total, projects] = await Promise.all([
    prisma.projectCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      include: {
        subCategory: {
          include: { category: true },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const columns = [
    {
      key: 'title',
      label: 'Project',
      render: (row: any) => (
        <div>
          <p className="font-medium text-stone-900">{row.title}</p>
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
      render: (row: any) => row.subCategory?.category?.name || '—',
    },
    {
      key: 'subcategory',
      label: 'Sub-Category',
      render: (row: any) => row.subCategory?.name || '—',
    },
    {
      key: 'location',
      label: 'Location',
      render: (row: any) => row.location || '—',
    },
    {
      key: 'year',
      label: 'Year',
      render: (row: any) => row.year || '—',
    },
    {
      key: 'published',
      label: 'Status',
      render: (row: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium ${
            row.published
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
          <h1 className="text-2xl font-medium text-stone-900">Projects</h1>
          <p className="text-stone-500 text-sm mt-1">{total} total projects</p>
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
      <div className="admin-card p-4">
        <form
          method="GET"
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              name="q"
              defaultValue={params.q || ''}
              placeholder="Search projects..."
              className="admin-input !pl-9 py-2 text-sm w-full"
            />
          </div>

          <select
            name="cat"
            defaultValue={params.cat || ''}
            className="admin-input py-2 text-sm w-full"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            defaultValue={params.status || ''}
            className="admin-input py-2 text-sm w-full"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

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
          q: params.q || '',
          cat: params.cat || '',
          status: params.status || '',
        }}
      />
    </div>
  )
}
