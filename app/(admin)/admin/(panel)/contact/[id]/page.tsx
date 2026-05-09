import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Clock, User } from 'lucide-react'
import prisma from '../../../../../../lib/prisma'
import { formatDate } from '../../../../../../lib/utils'

export const metadata: Metadata = {
  title: 'Message Detail',
}

interface PageProps {
  params: { id: string }
}

export default async function ContactDetailPage({
  params,
}: PageProps) {
  const msg = await prisma.inquiry.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!msg) {
    notFound()
  }

  // OPTIONAL: auto mark as READ if UNREAD
  if (msg.status === 'UNREAD') {
    await prisma.inquiry.update({
      where: { id: params.id },
      data: { status: 'READ' },
    })
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/contact"
          className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div>
          <h1 className="text-xl font-medium text-stone-900">
            Message Detail
          </h1>

          <p className="text-stone-500 text-sm">
            Received {formatDate(msg.createdAt)}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="admin-card p-6">
        {/* Sender info */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-700">
              <User className="w-4 h-4 text-stone-400" />
              <span className="font-medium">
                {msg.senderName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-stone-600 text-sm">
              <Mail className="w-4 h-4 text-stone-400" />
              <a
                href={`mailto:${msg.senderEmail}`}
                className="hover:text-brand-600 transition-colors"
              >
                {msg.senderEmail}
              </a>
            </div>

            {msg.phone && (
              <div className="flex items-center gap-2 text-stone-600 text-sm">
                <Phone className="w-4 h-4 text-stone-400" />
                <a
                  href={`tel:${msg.phone}`}
                  className="hover:text-brand-600 transition-colors"
                >
                  {msg.phone}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(msg.createdAt)}
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full uppercase font-medium ${
              msg.status === 'UNREAD'
                ? 'bg-red-50 text-red-700'
                : msg.status === 'READ'
                ? 'bg-blue-50 text-blue-700'
                : msg.status === 'REPLIED'
                ? 'bg-green-50 text-green-700'
                : 'bg-stone-100 text-stone-500'
            }`}
          >
            {msg.status}
          </span>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
            Subject
          </p>

          <p className="text-lg font-medium text-stone-900">
            {msg.subject}
          </p>
        </div>

        {/* Project Type (optional field from model) */}
        {msg.projectType && (
          <div className="mb-4">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
              Project Type
            </p>
            <p className="text-stone-700">{msg.projectType}</p>
          </div>
        )}

        {/* Message */}
        <div>
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">
            Message
          </p>

          <div className="bg-stone-50 border border-stone-100 rounded-lg p-5">
            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        
      </div>
      <div className="mt-6 pt-6 border-t border-stone-100 flex gap-3">
          <a
            href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(
              msg.subject
            )}`}
            className="btn-primary text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Reply via Email</span>
          </a>

          <Link
            href="/admin/contact"
            className="btn-outline text-sm"
          >
            <span>Back to Messages</span>
          </Link>
        </div>
    </div>
  )
}