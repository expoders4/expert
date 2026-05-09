import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Star, Edit2 } from 'lucide-react'
import prisma from '../../../../../lib/prisma'
import AdminDeleteButton from '../../../../../components/admin/component/admindeletebutton'

export const metadata: Metadata = {
  title: 'Testimonials',
}

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  })

  const sortedTestimonials = testimonials

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-stone-900">
            Testimonials
          </h1>

          <p className="text-stone-500 text-sm mt-1">
            {sortedTestimonials.length} total
          </p>
        </div>

        <Link
          href="/admin/testimonials/add"
          className="btn-primary text-sm px-5 py-2.5"
        >
          <Plus className="w-4 h-4" /> <span>Add Testimonial</span>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedTestimonials.map((t:any) => (
          <div
            key={t.id}
            className={`admin-card p-5 flex flex-col ${
              t.featured
                ? 'border-brand-200 bg-brand-50/30'
                : ''
            }`}
          >
            {/* Rating + badges */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < t.rating
                        ? 'fill-brand-400 text-brand-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                {t.featured && (
                  <span className="text-[10px] tracking-wider uppercase bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}

                <span
                  className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full ${
                    t.published
                      ? 'bg-green-50 text-green-700'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {t.published ? 'Live' : 'Hidden'}
                </span>
              </div>
            </div>

            {/* Message */}
            <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-4 italic line-clamp-4">
              “{t.content}”
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-stone-100 pt-3">
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {t.name}
                </p>

                <p className="text-xs text-stone-500">
                  {t.role}
                  {t.company ? `, ${t.company}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="p-1.5 text-stone-400 hover:text-brand-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>

                <AdminDeleteButton
                  id={t.id}
                  resource="testimonials"
                  label={t.name}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {sortedTestimonials.length === 0 && (
          <div className="col-span-3 text-center py-20 text-stone-400">
            No testimonials yet.{' '}
            <Link
              href="/admin/testimonials/add"
              className="text-brand-600 hover:underline"
            >
              Add one?
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}