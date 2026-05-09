import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import CommonTable from '../../../../../components/admin/component/commonTable';
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton';
import { formatDate } from '../../../../../lib/utils';
import prisma from '../../../../../lib/prisma';

export const metadata: Metadata = {
  title: 'Contact Messages',
}

interface PageProps {
  searchParams: {
    page?: string
    status?: string
  }
}

export default async function AdminContactPage({
  searchParams,
}: PageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const limit = 20
  const status = searchParams.status

  const where = status
    ? { status: status as any }
    : {}

  /* DATA */
  const [messages, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.inquiry.count({ where }),
  ])
  
  const unreadCount = await prisma.inquiry.count({
    where: { status: 'UNREAD' },
  })

  /* TABLE COLUMNS */
  const columns = [
    {
      key: 'sender',
      label: 'Sender',
      render: (row: any) => (
        <div>
          <p className="font-medium text-stone-900">
            {row.senderName}
          </p>
          <p className="text-xs text-stone-400">
            {row.senderEmail}
          </p>
          {row.phone && (
            <p className="text-xs text-stone-400">
              {row.phone}
            </p>
          )}
        </div>
      ),
    },

    {
      key: 'subject',
      label: 'Subject',
    },

    {
      key: 'createdAt',
      label: 'Date',
      render: (row: any) => formatDate(row.createdAt),
    },

    {
      key: 'status',
      label: 'Status',
      render: (row: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase font-medium ${
            row.status === 'UNREAD'
              ? 'bg-red-50 text-red-700'
              : row.status === 'READ'
              ? 'bg-blue-50 text-blue-700'
              : row.status === 'REPLIED'
              ? 'bg-green-50 text-green-700'
              : 'bg-stone-100 text-stone-500'
          }`}
        >
          {row.status}
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
            Contact Messages
          </h1>

          <p className="text-stone-500 text-sm mt-1">
            {total} total ·{' '}
            <span className="text-red-600 font-medium">
              {unreadCount} unread
            </span>
          </p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 border-b border-stone-200">
        {['', 'UNREAD', 'READ', 'REPLIED', 'ARCHIVED'].map(
          (s) => (
            <a
              key={s || 'all'}
              href={`/admin/contact${
                s ? `?status=${s}` : ''
              }`}
              className={`px-4 py-2 text-sm border-b-2 -mb-px ${
                status === s ||
                (!status && !s)
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-stone-500'
              }`}
            >
              {s || 'All'}
            </a>
          )
        )}
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <CommonTable
          data={messages}
          columns={columns}
          resource="contact-inquiries"
          viewPath={(row) =>
            `/admin/contact/${row.id}`
          }
          editPath={() => ''}
          deleteComponent={(row) => (
            <AdminDeleteButton
              id={row.id}
              resource="contact-inquiries"
              label={row.senderName}
            />
          )}
          currentPage={page}
          totalPages={Math.ceil(
            total / limit
          )}
        />
      </div>
    </div>
  )
}