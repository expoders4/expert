'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialSchema, type TestimonialInput } from '../../../lib/validations'
import { Loader2, Save, ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../../utils/cn'

interface Props {
  testimonial?: TestimonialInput & { id?: string }
  mode: 'create' | 'edit'
}

export default function TestimonialForm({ testimonial, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TestimonialInput>({
    resolver:      zodResolver(testimonialSchema),
    defaultValues: testimonial || { rating: 5, published: false, featured: false },
  })

  const watchRating    = watch('rating')
  const watchPublished = watch('published')
  const watchFeatured  = watch('featured')

  const onSubmit = async (data: TestimonialInput) => {
    setSaving(true)
    setServerError('')
    try {
      const url    = mode === 'edit' ? `/api/testimonials/${testimonial?.id}` : '/api/testimonials'
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const json   = await res.json()
      if (!json.success) { setServerError(json.message || 'Save failed'); return }
      router.push('/admin/testimonials')
      router.refresh()
    } catch { setServerError('Network error.') }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials" className="p-2 text-stone-400 hover:text-stone-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-medium text-stone-900">
          {mode === 'create' ? 'New Testimonial' : 'Edit Testimonial'}
        </h1>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">{serverError}</div>
      )}

      <div className="admin-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="admin-label">Client Name *</label>
            <input {...register('name')} className={cn('admin-input', errors.name && 'border-red-300')} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="admin-label">Designation</label>
            <input {...register('designation')} className="admin-input" placeholder="CEO" />
          </div>
          <div>
            <label className="admin-label">Company</label>
            <input {...register('company')} className="admin-input" placeholder="Acme Corp" />
          </div>
          <div>
            <label className="admin-label">Avatar URL</label>
            <input {...register('avatar')} className="admin-input" placeholder="/uploads/avatar.jpg" />
          </div>
        </div>

        <div>
          <label className="admin-label">Review *</label>
          <textarea {...register('content')} rows={5} className={cn('admin-input resize-none', errors.content && 'border-red-300')}
                    placeholder="What did the client say about their experience?" />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        {/* Star rating */}
        <div>
          <label className="admin-label">Rating</label>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <button
                key={star} type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setValue('rating', star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star className={`w-6 h-6 transition-colors ${
                  star <= (hoverRating || watchRating) ? 'fill-brand-400 text-brand-400' : 'text-stone-300'
                }`} />
              </button>
            ))}
            <span className="text-sm text-stone-500 ml-2">{watchRating}/5</span>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-stone-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={watchPublished} onChange={(e) => setValue('published', e.target.checked)}
                   className="w-4 h-4 accent-brand-600 rounded" />
            <span className="text-sm text-stone-700">Published (visible on site)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={watchFeatured} onChange={(e) => setValue('featured', e.target.checked)}
                   className="w-4 h-4 accent-brand-600 rounded" />
            <span className="text-sm text-stone-700">Featured (homepage)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /><span> Saving...</span></> : <><Save className="w-4 h-4" /> <span>Save Testimonial</span></>}
        </button>
        <Link href="/admin/testimonials" className="btn-outline"><span>Cancel</span></Link>
      </div>
    </form>
  )
}